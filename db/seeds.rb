require 'json'

files_habhub = ['UKRHAB-2.json', 'MOD1.json']

urls = ['http://habitat.habhub.org/habitat/_design/ept/_list/json/payload_telemetry/flight_payload_time?include_docs=true&startkey=[%22b8f2b0aa48e958072b9067ab78639777%22,%2240b8857d4c91704027be9d2f26937c29%22]&endkey=[%22b8f2b0aa48e958072b9067ab78639777%22,%2240b8857d4c91704027be9d2f26937c29%22,[]]&fields=_sentence,_receivers,sentence_id,time,latitude,longitude,altitude,temperature_internal,temperature_external,heading,battery', 'http://habitat.habhub.org/habitat/_design/ept/_list/json/payload_telemetry/flight_payload_time?include_docs=true&startkey=[%224fc22bd7fed82b18112088dff81a9727%22,%229265216ad9c8f57203281a6da2ed7aad%22]&endkey=[%224fc22bd7fed82b18112088dff81a9727%22,%229265216ad9c8f57203281a6da2ed7aad%22,[]]&fields=_sentence,_receivers,sentence_id,time,latitude,longitude,altitude,satellites,batterymv,status']

# urls.each do |url|
#   Flight::import_habhub_from_url(url)
# end

  Flight.import_habhub(files_habhub)
