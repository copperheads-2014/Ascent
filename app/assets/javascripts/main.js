
function Flight() {
  this.flight = []
}

function DataPoint(args) {
  this.time = args.time;
  this.altitude = args.altitude;
  this.temperature = args.temperature;
}

Flight.prototype.fillFlight = function(dataArray) {
  // Iterate thru JSON object and makes new instances of DataPoint
  // objects and push it through
}

function prepHighchartsSeries(flight) {
  // Iterate over flight array.
  seriesInfo = {
    type: 'area',
    name: 'Altitude',
    pointStart: 0,
    color: '#E6E6FA',
    data: flight_data
  }

  chart.addSeries(seriesInfo);
}

var ready;

ready = function(){}

$(document).ready(ready);
$(document).on('page:load', ready);
