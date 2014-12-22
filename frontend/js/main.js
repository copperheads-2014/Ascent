// OO JS Code:
function Flight(args) {
  this.id = id;
  this.callsign = args.callsign;
  this.duration = args.duration;
  this.maxAltitude = args.maxAltitude;
  this.launchSite = args.launchSite;
  this.coordinates = args.coordinates;
  this.elevation = args.elevation;
  this.data = createDataPointArray(args.data); // Array
}

function DataPoint(args) {
  this.id = id;
  this.time = args.time;
  this.altitude = args.altitude;
  this.latitude = args.latitude;
  this.longitude = args.longitude;
  this.temperature = args.temperature;
}

function createDataPointArray(dataPointObject) {
  var dataArray = [];
  dataArray.push(new DataPoint(dataPointObject));
  return dataArray;
}

function loadAllFlights(response) {
  var flightArray = [];
  response.forEach(function(element) {
    flightArray.push(new Flight(element));
  });
  return flightArray;
}

// function prepHighchartsSeries(flight) {
//   // Iterate over flight array.
//   seriesInfo = {
//     type: 'area',
//     name: 'Altitude',
//     pointStart: 0,
//     color: '#E6E6FA',
//     data: [
//       {x: 0, y: 0, temp: 10},
//       {x: 160000, y: 70000, temp: 5},
//       {x: 240000, y: 77000, temp: -1},
//       {x: 302000, y: 80000, temp: -11},
//       {x: 320000, y: 99000, temp: -33}
//     ]
//   }
//   chart.addSeries(seriesInfo);
// }

var ready;
var allFlights;

ready = function(){
  // var request = $.ajax({
  //   type: "GET",
  //   url: "/flights"
  // });
  // request.done(function(response) {
  //   allFlights = loadAllFlights(response);
  // });
};

// Document Ready:
$(document).ready(ready);
$(document).on('page:load', ready);
