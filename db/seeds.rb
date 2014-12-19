require 'json'

files_habhub = ['UKRHAB-2.json', 'MOD1.json']

SEA_LEVEL_PRESSURE = 1013.25 #mbars

def parse_habhub(json)
  new_hash = {}
  new_hash[:altitude] = json["altitude"]
  new_hash[:latitude] = json["latitude"]
  new_hash[:longitude] = json["longitude"]
  new_hash[:temperature] = json["temperature_external"]
  new_hash[:battery] = json["battery"]
  new_hash[:time] = json["time"]
  new_hash[:humidity] = json["humidity"]
  new_hash[:pressure] = calculate_pressure(json)
  new_hash.to_json
end

def calculate_pressure(json)
  altitude = json["altitude"]
  ((SEA_LEVEL_PRESSURE * 100) * (1 - (2.25577 * 10**(-5) * altitude))**5.25588) / 100
end

def callsign(sentence)
  sentence[2..(sentence.index(',')-1)]
end

def create_data(json_flight_data, flight)
  json_flight_data.each do |point|
    DataPoint.create!(flight_id: flight.id, data: parse_habhub(point))
  end
end

def import_habhub(files)
  files.each do |file|
    json_flight_data = JSON.load File.new(file)
    sentence = json_flight_data.first["_sentence"]
    flight = Flight.create!(callsign: callsign(sentence))
    create_data(json_flight_data, flight)
  end
end

# new_hash = {
#   altitude: ,
#   latitude: ,
#   longitude: ,
#   temperature: ,
#   pressure: ,
# }
import_habhub(files_habhub)
