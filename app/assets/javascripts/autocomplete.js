$(document).ready(function() {

  $("#autocomplete_username").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "/users/autocomplete_username",
        dataType: "json",
        data: {
          q: request.term
        },
        success: function(data) {
          response(data);
        }
      });
    }
    });
  $("#autocomplete_username2").autocomplete({
    source: function(request, response) {
      $.ajax({
        url: "/users/autocomplete_username",
        dataType: "json",
        data: {
          q: request.term
        },
        success: function(data) {
          response(data);
        }
      });
    }
    });
});
