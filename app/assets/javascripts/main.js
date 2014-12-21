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
    data: [
      {x: 0, y: 0, temp: 10},
      {x: 160000, y: 70000, temp: 5},
      {x: 240000, y: 77000, temp: -1},
      {x: 302000, y: 80000, temp: -11},
      {x: 320000, y: 99000, temp: -33}
    ]
  }

  chart.addSeries(seriesInfo);
}

var ready;

ready = function(){}

$(document).ready(ready);
$(document).on('page:load', ready);
