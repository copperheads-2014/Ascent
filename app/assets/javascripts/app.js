var $display;
var index_of_digit;
var flight_id;
var flight_data;

var ready = function() {

  $('.show_all_data').click(function(e){
    e.preventDefault();
    $('.all_data').fadeIn(800);
  })

  $('.show_flight_chart').click(function(e){
    e.preventDefault();
    $('.flight_chart').fadeIn(800);
    $("#map").hide();
  });

  $display = $('#display')

  index_of_digit = (document.URL.search(/\/\d/)) + 1;
  flight_id = window.location.pathname.split('/')[2];

  var request = $.ajax({
    url: "/charts/" + flight_id + ".json",
    method: "get"
  })

  request.done(function(response){
    flight_data = response;
    // var duration = 100 * flight_data.length;
    loadChart(flight_data);
    loadAltimeter(flight_data[0]);
    loadThermometer(flight_data[1]);
    // loadMap();
    loadBarometer();
  });

  $("#button-play").click(function(){
    $display.show('slide', {direction: 'left'}, 400);
    loadChart([0,0])
    playAltimeter(1);
    playThermometer(1);
    // playBarometer(1)
    playChart(1);
    playMap();
  });

  $("#map_button").click(function(){
    $("#chart").hide();
    $("#map").show();
    loadMap();
  })

  $("#chart_button").click(function(){
    $("#map").hide();
    $("#chart").show();
  })
}



$(document).ready(ready);
$(document).on('page:load', ready);
