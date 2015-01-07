$(document).ready(function() {

  $('.unfriend a').click(function(event) {
    event.preventDefault();
    var pathUrl = $(this).attr("value")
    var rowID = pathUrl.split("/")[2]

    var request = $.ajax({
      url: pathUrl,
      type: "DELETE"
    });

    request.fail(function() {
      console.log(request);
      $(".remove-"+rowID).remove();
    });
  });

  $('#avatar').mouseenter(function() {
    $('.edit').show();
  });

  $('.edit').mouseenter(function() {
    $(this).css('background', 'white');
    $('.edit a').css('color', 'black');
    $(this).css('border', '1px solid black');
  });

  $('.edit').mouseleave(function() {
    $(this).css('background', 'none');
    $('.edit a').css('color', 'white');
    $(this).css('border', '1px solid white');
  });

  $('#avatar').mouseleave(function() {
    $('.edit').hide();
  });

  $('.edit').click(function(event) {
    event.preventDefault();
    $('#avatar').slideUp('slow');
    $('#avatar_form').slideDown('slow');
  });

  $('#avatar-cancel').click(function(e) {
    event.preventDefault();
    $('#avatar_form').slideUp('slow');
    $('#avatar').slideDown('slow');
  });

});
