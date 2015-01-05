require 'json'

# seed from CSV files

files = ['mod1_flight_data.csv', 'mulder_flight_data.csv', 'meurs_flight_data.csv'].map { |f| File.new('flight_data_seeds/' + f) }

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

User.create(username: "danielle", password: "password")

User.create(username: "thomas", password: "1")
User.create(username: "mak", password: "1")
User.create(username: "josh", password: "1")
User.create(username: "cody", password: "1")
User.create(username: "grant", password: "1")
User.create(username: "ryan", password: "1")
User.create(username: "jordy", password: "1")
User.create(username: "eleni", password: "1")
User.create(username: "dave", password: "1")
User.create(username: "lucas", password: "1")

Friendship.create(user: "2", friend: "1")
Friendship.create(user: "2", friend: "3")
Friendship.create(user: "2", friend: "4")
Friendship.create(user: "2", friend: "5")
Friendship.create(user: "2", friend: "6")
Friendship.create(user: "2", friend: "7")
Friendship.create(user: "2", friend: "8")
Friendship.create(user: "2", friend: "9")

