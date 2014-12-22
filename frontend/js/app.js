App = Ember.Application.create();

App.Router.map(function() {
  this.route("upload");
  this.resource("flights", function() {
    this.resource("flight", { path: "/:flight_id"});
  });
});

App.FlightsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON("localhost:3000/flights").then(function(response) {
      return response;
    });
  }
});

App.FlightRoute = Ember.Route.extend({
  model: function(params) {
    return allFlights.findBy("id", params.flight_id);
  }
});


