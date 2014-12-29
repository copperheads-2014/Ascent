require 'json'

files_habhub = ['UKRHAB-2.json', 'MOD1.json']

urls = ['http://habitat.habhub.org/habitat/_design/ept/_list/json/payload_telemetry/flight_payload_time?include_docs=true&startkey=[%221bcd4ef3e5f5c6bd62c79fe3ce3b928d%22,%223b9b869809e429c37a96d2520d459a2f%22]&endkey=[%221bcd4ef3e5f5c6bd62c79fe3ce3b928d%22,%223b9b869809e429c37a96d2520d459a2f%22,[]]&fields=_sentence,_receivers,sentence_id,time,latitude,longitude,altitude,satellites,battery,pll_loop_volts,xtal_trim,gps_low_power', 'http://habitat.habhub.org/habitat/_design/ept/_list/json/payload_telemetry/flight_payload_time?include_docs=true&startkey=[%22c74f946f61b0b0d38a176f9e14222530%22,%223b9b869809e429c37a96d2520d463bb2%22]&endkey=[%22c74f946f61b0b0d38a176f9e14222530%22,%223b9b869809e429c37a96d2520d463bb2%22,[]]&fields=_sentence,_receivers,sentence_id,time,latitude,longitude,altitude,satellites,battery,pll_loop_volts,xtal_trim,gps_low_power']

urls.each do |url|
  Flight::import_habhub_from_url(url)
end