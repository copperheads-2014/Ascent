function Flight() {
  this.flight = []
}

function DataPoint(args) {
  this.altitude = args[altitude];
  this.temperature = args[temperature];
}

var ready;

ready = function(){}

$(document).ready(ready);
$(document).on('page:load', ready);
