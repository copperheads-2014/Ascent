App = Ember.Application.create();

App.Router.map(function() {
  this.route('charts')
});

App.IndexRoute = Ember.Route.extend({
  model: function() {
    return ['red', 'yellow', 'blue'];
  }
});

App.ChartsRoute = Ember.Route.extend({
  model: function() {
    return ["orange", "purple", "green"]
  }
})
