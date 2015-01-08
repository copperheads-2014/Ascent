$(document).ready(function() {
  $( "#autocomplete_username2" ).mouseout(function() {
    $( "#autocomplete_username2" ).css( "color", "black" );
  });

  $('.friendship_form form').on("submit", function(e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
      method: form.attr('method'),
      url: form.attr("action"),
      data: $(".friendship_form form").serialize(),
      success: function(response) {
        $("#send-fr").css("background-color", "palegreen");
        var woop = $("#send-fr").val("Sent!");
        woop.fadeOut(1000, function() {
          $("#send-fr").css("background-color", "#191919");
          $("#send-fr").val("Send another request")
          $("#send-fr").fadeIn(1000)
        });
        $("#autocomplete_username").fadeOut(1000, function() {
          $("#autocomplete_username").val("")
          $("#autocomplete_username").fadeIn(1000)
        });
      },
      fail: function(response) {
      }
    })
  })

  $('.add_friend_to_flight_form form').on("submit", function(e) {
    e.preventDefault();
    var form = $(this);
    $.ajax({
      method: form.attr('method'),
      url: form.attr("action"),
      data: $(".add_friend_to_flight_form form").serialize(),
      success: function(response) {
        $("#add-to-flight").css("background-color", "palegreen");
        var woop = $("#add-to-flight").val("Added!");
        woop.fadeOut(1000, function() {
          $("#add-to-flight").css("background-color", "#191919");
          $("#add-to-flight").val("Send another request")
          $("#add-to-flight").fadeIn(1000)
        });
        $("#autocomplete_username2").fadeOut(1000, function() {
          $("#autocomplete_username2").val("")
          $("#autocomplete_username2").fadeIn(1000)
        });
      },
      fail: function(response) {
      }
    })
  })

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
