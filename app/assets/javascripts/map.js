//MAP BOX
var map, polyline;
var setView = 0;

var loadMap = function() {
  L.mapbox.accessToken = 'pk.eyJ1Ijoiam9zaGFkaWszMDciLCJhIjoiSzFib1hNbyJ9.9EvDIk_-qWq5TIf0t4YG7Q';
  map = L.mapbox.map('map', 'joshadik307.kh70onpa');
  var line_points = [];
  var getLatLng = function(element){
    var coordinates = [element.latitude, element.longitude];
    line_points.push(coordinates);
  };
  flight_data.forEach(getLatLng);
  map.setView(line_points[0], 9);
  polyline = L.polyline(line_points, {color: '#fff'}).addTo(map);
};

function slowAdd(pointIndex){
  addPoint(flight_data[pointIndex]);
  if(pointIndex < flight_data.length-1){
    setTimeout(slowAdd, 1, pointIndex+1);
  }
};

function renderPoint(point) {
  return "<dl><dt>latitude:</dt><dd>"+point.latitude+"</dd>"+
  "<dt>longitude:</dt><dd>"+point.longitude+"</dd>"+
  "<dt>altitude:</dt><dd>"+point.y+"</dd>"+
  "<dt>time:</dt><dd>"+point.x+"</dd>"+
  "<dt>temperature:</dt><dd>"+point.temp+"</dd></dl>"
};

function addPoint(point) {
 polyline.addLatLng(
   L.latLng(
     point.latitude,
     point.longitude));
 if (setView === 0) {map.setView([point.latitude, point.longitude])}
  setView++
L.mapbox.featureLayer({
  type: 'Feature',
  geometry: {
    type: 'Point',
    coordinates: [
    point.longitude, point.latitude
    ]
  },
  "properties": {
   description: renderPoint(point)
 }
}).addTo(map)
};


var playMap = function() {
  slowAdd(0);
};
