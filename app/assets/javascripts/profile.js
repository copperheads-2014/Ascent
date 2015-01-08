$(document).ready(function() {
  $( "#autocomplete_username2" ).mouseout(function() {
    $( "#autocomplete_username2" ).css( "color", "black" );
  });

  var changeButtonColor = function(form, response, message) {
    var button = form.find(".button");
    var autocomplete = form.find(".ui-autocomplete-input");

    var previousButtonValue = button.val();
    var previousBackgroundColor = button.css("background-color")
    button.css("background-color", "#5cb85c");

    var woop = button.val(message);
    button.fadeOut(1000, function() {
      button.css("background-color", previousBackgroundColor);
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

  $('#find-friends form').on("submit", function(e) {
    e.preventDefault();
    submitRequest($(this), function(r) {
      changeButtonColor($(this), r, 'Sent!')
    }.bind(this));
  });

  $('#add_users_to_flight form').on("submit", function(e) {
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
