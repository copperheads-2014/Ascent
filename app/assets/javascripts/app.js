var $display;
var index_of_digit
var flight_id
var flight_data;

var ready = function() {

  $('.show_all_data').click(function(e){
    e.preventDefault();
    $('.all_data').fadeIn(800);
  })

  $('.show_flight_chart').click(function(e){
    e.preventDefault();
    $('.flight_chart').fadeIn(800);
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
    var duration = 100 * flight_data.length;
    loadChart(duration);
    loadAltometer();
    loadMap();
  });

  $("#button-play").click(function(){
    $display.show('slide', {direction: 'left'}, 1200);
    playChart(100);
    playMap();
    playAltometer(100);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
