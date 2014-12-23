App = Ember.Application.create();

App.Router.map(function() {
  this.route("upload");
  this.resource("flights", function() {
    this.resource("flight", { path: "/:flight_id"});
  });
});

App.FlightsRoute = Ember.Route.extend({
  model: function() {
    return $.getJSON("js/flights.json").then(function(response) {
      return response;
    });
  }
});

App.FlightRoute = Ember.Route.extend({
  model: function(params) {
    return $.getJSON("js/flights.json").then(function(response) {
      var modelId = params.flight_id - 1;
      response.callsign = response[modelId].callsign;
      response.duration = response[modelId].duration;
      response.maxAltitude = response[modelId].maxAltitude;
      response.launchSite = response[modelId].launchSite;
      response.coordinates = response[modelId].coordinates;
      response.elevation = response[modelId].elevation;
      response.data = response[modelId].data;
      return response;
    });
  }
});

App.FlightView = Ember.View.extend({
  didInsertElement : function(){
    this._super();
    Ember.run.scheduleOnce('afterRender', this, function(){
      $display = $('#display')

      chart = new Highcharts.Chart({
        chart: {
          backgroundColor: '#D1DBDD',
          borderColor: "#FFFFFF",
          borderWidth: 5,
          borderRadius: 15,
          zoomType: 'x',
          renderTo: 'chart',
          style: {
            fontFamily: 'Audiowide',
            fontSize: '12px'
          }
        },
        title: {
          text: 'Space Trip',
          style: { "color": 'black'}
        },
        subtitle: {
          text: 'Pinch the chart to zoom in'
        },
        xAxis: {
          type: 'datetime',
          title: {text: 'Time'},
          dateTimeLabelFormats: {second: '%H:%M:%S'}
        },
        yAxis: {
          title: {text: 'Altitute'}
        },
        plotOptions: {
          series: {
            allowPointSelect: true,
              point: {
                events: {
                  select: function() {
                    $('#time').html("Time: " + Highcharts.dateFormat('%H:%M:%S', this.x) + " (H:M:S)");
                    $('#altitude').html("Altitude: " + this.y + " ft.");
                    $('#temp').html("Temperature: " + this.temp + " °F");
                    // $('#longitude').html("Longitude: " this.longitude);
                    // $('#latitude').html("Latitude: " + this.latitude);
                  }
                }
              },
            animation: {duration: 3000}
          },
          area: {
            fillColor: {
              linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
              stops: [
                [0, Highcharts.getOptions().colors[5]],
                [1, Highcharts.Color(Highcharts.getOptions().colors[8]).setOpacity(0).get('rgba')]
              ]
            },
            marker: {
              radius: 2
            },
            lineWidth: 1,
            states: {
              hover: {
                lineWidth: 1
              }
            },
            threshold: null
          }
        },
        legend: {
          enabled: false,
          backgroundColor: '#E6E6FA'
        },
        tooltip: {
          dateTimeLabelFormats: {second: '%H:%M:%S'}
        }
      });

      $("#button-play").click(function(){
        chart.addSeries({
          type: 'area',
          name: 'Altitude',
          pointStart: 0,
          color: '#E6E6FA',
          data: [
            {x: 0, y: 0, temp: 10},
            {x: 160000, y: 70000, temp: 5},
            {x: 240000, y: 77000, temp: -1},
            {x: 302000, y: 80000, temp: -11},
            {x: 320000, y: 99000, temp: -33}
          ]
          // Replace the data above w/ model data
        });
      });

      $("#button-play").click(function(){
        $display.show('slide', {direction: 'left'}, 1200);
      });
    });
  }
});
