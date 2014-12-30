//MAP BOX
var map, polyline;

var loadMap = function() {
  L.mapbox.accessToken = 'pk.eyJ1Ijoiam9zaGFkaWszMDciLCJhIjoiSzFib1hNbyJ9.9EvDIk_-qWq5TIf0t4YG7Q';
  map = L.mapbox.map('map', 'joshadik307.kh70onpa').setView([40, -74.50], 6);

  polyline = L.polyline([]).addTo(map);
};

function slowAdd(pointIndex){
  addPoint(flight_data[pointIndex]);
  if(pointIndex < flight_data.length-1){
    setTimeout(slowAdd, 20, pointIndex+1);
  }
};

function renderPoint(point) {
  return "<dl><dt>latitude:</dt><dd>"+point.latitude+"</dd>"+
    "<dt>longitude:</dt><dd>"+point.longitude+"</dd>"+
    "<dt>altitude:</dt><dd>"+point.altitude+"</dd>"+
    "<dt>time:</dt><dd>"+point.time+"</dd>"+
    "<dt>temperature:</dt><dd>"+point.temperature+"</dd></dl>"
};

function addPoint(point) {
       polyline.addLatLng(
         L.latLng(
         point.latitude,
         point.longitude));
  map.setView([point.latitude, point.longitude]);
  L.mapbox.featureLayer({
      type: 'Feature',
      geometry: {
          type: 'Point',
          coordinates: [
            point.longitude, point.latitude
          ]
        },
      "properties": {
           description: renderPoint(point),
           'marker-size': "small",
           'marker-color': '#44036F',
       }
    }).addTo(map)
};


var playMap = function() {
  $("#map").css('visibility', 'initial');
  slowAdd(0);
};
