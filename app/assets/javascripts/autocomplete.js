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
          console.log(data)
          response(data);
        }
      });
    }
    });

});
