App = Ember.Application.create();

App.Router.map(function() {
  // put your routes here
  this.route("")
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});
