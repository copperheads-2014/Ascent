$(document).ready(function() {

  $('.fa-star').click(function(event) {
    event.preventDefault();

    console.log(event);
    var request = $.ajax({
      method: "POST",
      url: "/likes",
      data: {flight_id: event.target.baseURI.split('flights/')[1]}
    });

    request.done(function(response) {
      $('.fa-star').css('color', 'yellow');
      $('.fa-star').attr("id","liked");
    })
  });

  $('#liked.fa-star').css('color', 'yellow');

});
