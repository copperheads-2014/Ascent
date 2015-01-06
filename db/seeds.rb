require 'json'

# Seed Flights:
files = [
  'alma_2_flight_data.csv',
  'amstg_flight_data.csv',
  'boss_flight_data.csv',
  'd_5_flight_data.csv',
  'doge1_flight_data.csv',
  'edupic10_flight_data.csv',
  'edupic7_flight_data.csv',
  'falcon_flight_data.csv',
  'fokus_1_flight_data.csv',
  'habuino_flight_data.csv',
  'hl1_flight_data.csv',
  'joey_b_flight_data.csv',
  'joey_flight_data.csv',
  'laase_flight_data.csv',
  'max_flight_data.csv'
  # 'meurs_flight_data.csv',
  # 'mm2_flight_data.csv',
  # 'mod1_flight_data.csv',
  # 'mtg002_flight_data.csv',
  # 'mulder_flight_data.csv',
  # 'pi_ce1_flight_data.csv',
  # 'pi_sky_flight_data.csv',
  # 'pi_sky_plus_flight_data.csv',
  # 'pifalcon_flight_data.csv',
  # 'sp_flight_data.csv',
  # 'stella2_flight_data.csv',
  # 'svc_pi_flight_data.csv',
  # 'ubseds2_flight_data.csv',
  # 'vr2sc_flight_data.csv',
  # 'w7qo_flight_data.csv',
  # 'wb8elk_flight_data.csv',
  # 'wg3_flight_data.csv',
  # 'wilkins_flight_data.csv',
  # 'x0_plus_flight_data.csv',
  # 'xaben0_flight_data.csv'
  ].map { |f| File.new('flight_data_seeds/' + f) }

files.each do |file|
  @flight = Flight.new
  @flight.import_from_csv(file)
end

#--------------------
# seed from URLs

# urls = ['http://habitat.habhub.org/habitat/_design/ept/_list/json/payload_telemetry/flight_payload_time?include_docs=true&startkey=[%22b8f2b0aa48e958072b9067ab78639777%22,%2240b8857d4c91704027be9d2f26937c29%22]&endkey=[%22b8f2b0aa48e958072b9067ab78639777%22,%2240b8857d4c91704027be9d2f26937c29%22,[]]&fields=_sentence,_receivers,sentence_id,time,latitude,longitude,altitude,temperature_internal,temperature_external,heading,battery', 'http://habitat.habhub.org/habitat/_design/ept/_list/json/payload_telemetry/flight_payload_time?include_docs=true&startkey=[%224fc22bd7fed82b18112088dff81a9727%22,%229265216ad9c8f57203281a6da2ed7aad%22]&endkey=[%224fc22bd7fed82b18112088dff81a9727%22,%229265216ad9c8f57203281a6da2ed7aad%22,[]]&fields=_sentence,_receivers,sentence_id,time,latitude,longitude,altitude,satellites,batterymv,status', 'http://habitat.habhub.org/habitat/_design/ept/_list/json/payload_telemetry/flight_payload_time?include_docs=true&startkey=[%228929e2830a4e94535e867e7a60615b2b%22,%22a285fda7b9fca16d0cc9170e65ad8604%22]&endkey=[%228929e2830a4e94535e867e7a60615b2b%22,%22a285fda7b9fca16d0cc9170e65ad8604%22,[]]&fields=_sentence,_receivers,sentence_id,time,latitude,longitude,altitude,gps_lock,satellites']

# urls.each do |url|
#   @flight = Flight.new
#   @flight.import_from_habhub(url)
# end

# Seed Users:
User.create!(username: "danielle", password: "password")
User.create!(username: "thomas", password: "1")
User.create!(username: "mak", password: "1")
User.create!(username: "josh", password: "1")
User.create!(username: "cody", password: "1")

80.times do
 User.create!(username: Faker::Name.name, password: "1")
end

counter = 6
10.times do
  Friendship.create!(user_id: counter, friend_id: 1)
  counter += 1
end

10.times do
  Friendship.create!(user_id: counter, friend_id: 2)
  counter += 1
end

10.times do
  Friendship.create!(user_id: counter, friend_id: 3)
  counter += 1
end

10.times do
  Friendship.create!(user_id: counter, friend_id: 4)
  counter += 1
end

10.times do
  Friendship.create!(user_id: counter, friend_id: 5)
  counter += 1
end

# Seed Launches:
counter = 1
2.times do
  Launch.create!(user_id: 1, flight_id: counter)
  counter += 1
end

4.times do
  Launch.create!(user_id: 2, flight_id: counter)
  counter += 1
end

1.times do
  Launch.create!(user_id: 3, flight_id: counter)
  counter += 1
end

3.times do
  Launch.create!(user_id: 4, flight_id: counter)
  counter += 1
end

4.times do
  Launch.create!(user_id: 5, flight_id: counter)
  counter += 1
end

# Seed Flight Images:
# images = ['1.jpg', '2.jpg', '3.jpg', '4.jpg', '5.jpg', '6.jpg', '7.jpg', '8.jpg', '9.jpg', '10.jpg', '11.jpg', '12.jpg', '13.jpg', '14.jpg', '15.jpg', '16.jpg', '17.jpg', '18.jpg', '19.jpg', '20.jpg', '21.jpg', '22.jpg', '23.jpg', '24.jpg', '25.jpg', '26.jpg', '27.jpg', '28.jpg', '29.jpg', '30.jpg', '31.jpg', '32.jpg', '33.jpg', '34.jpg', '35.jpg', '36.jpg', '37.jpg', '38.jpg', '39.jpg', '40.jpg', '41.jpg', '42.jpg', '43.jpg', '44.png', '44.png', '45.png', '46.png', '47.png', '48.png', '49.png', '50.png', '51.png', 'space_balloon_default.jpg', 'space-balloon-1.jpg', 'space-balloon-2.jpg', 'space-balloon-3.jpg', 'space-balloon-4.jpg', 'space-balloon-5.jpg', 'space-balloon-6.jpg', 'space-balloon-7.jpg', 'space-balloon-8.jpg']

# counter = 1
# pic_counter = 1
# 4.times do
#   35.times do
#     Picture.create!(flight_id: counter, image: image.sample.image_url.to_s)
#     counter += 1
#   end
# end

