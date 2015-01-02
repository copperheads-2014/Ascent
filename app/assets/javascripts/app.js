var $display;
var index_of_digit;
var flight_id;
var flight_data;
var seriesIndex = 0;
var pause;

var advanceIndex = function() {
  if(seriesIndex < flight_data.length) {
    seriesIndex++;
  }
  else {
    pause();
  }
}

var togglePlayPause = function() {
  $("#button-play").toggle();
  $("#button-pause").toggle();
}

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

  flight_id = window.location.pathname.split('/')[2];

  var request = $.ajax({
    url: "/charts/" + flight_id + ".json",
    method: "get"
  })

  request.done(function(response){
    flight_data = response;
    loadChart(flight_data);
    loadAltimeter(flight_data[0].y);
    loadThermometer(flight_data[0].temp);
    loadThermometer2(flight_data[0].temp);
    loadBarometer(flight_data[0].pressure);
    // loadMap();
  });

  var play = function(interval) {
    indexInterval = setInterval(function() {
      advanceIndex();
      playChart();
      playAltimeter();
      playThermometer();
      playThermometer2();
      playBarometer();
      playMap();
    }, interval);
  }

  pause = function() {
    clearInterval(indexInterval);
  }

  $("#button-play").click(function(){
    togglePlayPause();
    $display.show('slide', {direction: 'left'}, 400);
    play(1);
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

  $("#button-pause").click(function() {
    pause();
    togglePlayPause();
  })
}

$(document).ready(ready);
$(document).on('page:load', ready);
