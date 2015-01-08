$(document).ready(function() {
  $( "#autocomplete_username2" ).mouseout(function() {
    $( "#autocomplete_username2" ).css( "color", "black" );
  });

  var changeButtonColor = function(form, response, message) {
    var button = form.children(".button");
    var autocomplete = form.children(".ui-autocomplete-input");

    var previousButtonValue = button.val();
    button.css("background-color", "#5cb85c");

    var woop = button.val(message);
    button.fadeOut(1000, function() {
      button.css("background-color", "#191919");
      button.val(previousButtonValue);
      button.fadeIn(1000);
    });
    autocomplete.fadeOut(1000, function() {
      autocomplete.val("");
      autocomplete.fadeIn(1000);
    });
  }

  var submitRequest = function(form, callback) {
    $.ajax({
      method: form.attr('method'),
      url: form.attr("action"),
      data: form.serialize(),
      success: callback,
      fail: function(response) {
      }
    })
  }

  $('.friendship_form form').on("submit", function(e) {
    e.preventDefault();
    submitRequest($(this), function(r) {
      changeButtonColor($(this), r, 'Sent!')
    }.bind(this));
  });

  $('.add_friend_to_flight_form form').on("submit", function(e) {
    e.preventDefault();
    var form = $(this);
    submitRequest(form, function(r) {
      changeButtonColor(form, r, 'Added!')
    }.bind(this));
  });

  $('.unfriend a').click(function(event) {
    event.preventDefault();
    var pathUrl = $(this).attr("value")
    console.log(pathUrl)
    var rowID = pathUrl.split("/")[2]

    var request = $.ajax({
      url: pathUrl,
      type: "DELETE"
    });

    request.done(function() {
      console.log(request);
      $(".remove-"+rowID).remove();
    });
  });

  $('#edit').click(function(event) {
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
