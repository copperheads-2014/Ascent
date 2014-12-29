var ready = function(){
  var index_of_digit
  $('.show_all_data').click(function(e){
    e.preventDefault();
    $('.all_data').fadeIn(800);
  })

  $('.show_flight_chart').click(function(e){
    e.preventDefault();
    $('.flight_chart').fadeIn(800);
  });
}

$(document).ready(ready);
$(document).on('page:load', ready);
