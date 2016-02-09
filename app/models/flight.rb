require 'habhub'

class Flight < ActiveRecord::Base
  include FlightsHelper

  has_many :data_points
  has_many :launches
  has_many :users, through: :launches
  has_many :comments
  has_many :pictures
  has_many :likes
  has_many :likers, through: :likes, source: :user

  SEA_LEVEL_PRESSURE = 1013.25 # m bars

  def self.with_complete_data(headers=nil)
    headers ||= ["altitude", "temperature", "pressure", "battery"]
    all.select {|f| data = f.data_points.first.data; headers.all? {|h| data[h] != nil }}
  end

  def self.callsign(sentence)
    sentence[2..(sentence.index(',')-1)]
  end

  def starting_point
    [data_points.first.data["latitude"], data_points.first.data["longitude"]]
  end

  def ending_point
    [data_points.last.data["latitude"], data_points.last.data["longitude"]]
  end

  def distance_traveled
    rad_per_deg = Math::PI/180.0
    rkm = 6371.0                  # Earth radius in km
    rm = rkm * 1000.0             # Radius in m
    dlon_rad = (ending_point[1] - starting_point[1]) * rad_per_deg  # Delta, converted to rad
    dlat_rad = (ending_point[0] - starting_point[0]) * rad_per_deg
    lat1_rad, lon1_rad = starting_point.map! {|i| i * rad_per_deg }
    lat2_rad, lon2_rad = ending_point.map! {|i| i * rad_per_deg }
    starting_point = Math.sin(dlat_rad/2.0)**2.0 + Math.cos(lat1_rad) * Math.cos(lat2_rad) * Math.sin(dlon_rad/2.0)**2.0
    c = 2.0 * Math::atan2(Math::sqrt(starting_point), Math::sqrt(1.0-starting_point))
    rm * c / 1000 # Delta in km
  end

  def start_time
    data_points.first.data['time']
  end

  def end_time
    data_points.last.data['time']
  end

  def max_altitude_data_point
    data_points.max_by { |point| point.data["altitude"] }
  end

  def max_altitude
    max_altitude_data_point.data["altitude"]
  end

  def max_altitude_time
    max_altitude_data_point.data['time']
  end

  def time_to_burst
    travel_time(start_time, max_altitude_time)
  end

  def time_of_descent
    travel_time(max_altitude_time, end_time)
  end

  def travel_time(start_time, end_time)
    total_seconds = Time.parse(end_time) - Time.parse(start_time)
    seconds = total_seconds % 60
    minutes = (total_seconds / 60) % 60
    hours = total_seconds / (60 * 60)
    format("%02d:%02d:%02d", hours, minutes, seconds)
  end

  def duration
    travel_time(start_time, end_time)
  end

  def import_from_habhub(url)
    json_flight_data = Crack::JSON.parse(RestClient.get(url))
    import(json_flight_data)
  end

  def import_from_csv(file)
    csv_flight_data = CSV.read(file.path, headers: true, converters: :all)
    import(csv_flight_data)
  end

  def import(flight_data)
    sentence = flight_data.first["_sentence"]
    self.update(callsign: self.class.callsign(sentence))
    create_data_points(flight_data)
    self.update(max_altitude: max_altitude, duration: duration, distance_traveled: distance_traveled)
  end

  def create_data_points(flight_data)
    valid_points = flight_data.select {|x| x["altitude"] != 0 && x["latitude"] != 0.0 }
    valid_points.each do |point|
      data_points.create!(data: HabHub.parse(point).to_json)
    end
  end

  def cover_photo
    if pictures.any?
      pictures.sample.image_url(:thumb)
    else
      "space_balloon_default.jpg"
    end
  end

  def liked?(user)
    Like.find_by(user: user, flight: self).present?
  end
end
