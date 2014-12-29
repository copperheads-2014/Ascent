var ready;
var chart;
var $display;
var index_of_digit
var flight_id
var flight_data

ready = function(){

  $display = $('#display')

  function setProperTime(integer) {

  }

  index_of_digit = (document.URL.search(/\/\d/)) + 1;
  flight_id = window.location.pathname.split('/')[2];

  var request = $.ajax({
    url: "/charts/" + flight_id + ".json",
    method: "get"
  })

  request.done(function(response){
    flight_data = response;
  });

  chart = new Highcharts.Chart({
    chart: {
      backgroundColor: '#000',
      borderColor: "#FFFFFF",
      borderWidth: 5,
      borderRadius: 15,
      zoomType: 'x',
      renderTo: 'chart',
      style: {
        fontFamily: 'Arial',
        fontSize: '12px'
      }
    },
    title: {
      text: 'The Journey',
      style: { "color": 'gray'}
    },
    subtitle: {
      text: 'Drag over chart to zoom in'
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
                $('#altitude').html("Altitude: " + this.y + " m");
                $('#temp').html("Temperature: " + this.temp + " °C");
              }
            }
          },
        animation: {duration: 10000}
      },
      area: {
        fillColor: 'purple',
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
    $("#map").css('visibility', 'initial');
    slowAdd(0);
    chart.addSeries({

      type: 'area',
      name: 'Altitude',
      pointStart: 0,
      color: '#E6E6FA',
      // data: [
      //   {x: 23232, y: 2000, temp: 232},
      //   {x: 1222, y: 2333, temp: 244}
      // ]
      data: flight_data

    });
    console.log(flight_data)

  });

  $("#button-play").click(function(){
    $display.show('slide', {direction: 'left'}, 1200);
  });

  L.mapbox.accessToken = 'pk.eyJ1Ijoiam9zaGFkaWszMDciLCJhIjoiSzFib1hNbyJ9.9EvDIk_-qWq5TIf0t4YG7Q';
  var map = L.mapbox.map('map', 'joshadik307.kh70onpa').setView([40, -74.50], 6);

  var polyline = L.polyline([]).addTo(map);

  function slowAdd(pointIndex){
    console.log(flight_data)
    addPoint(flight_data[pointIndex]);
    if(pointIndex < flight_data.length-1){
      setTimeout(slowAdd, 20, pointIndex+1);
    }
  }

  function renderPoint(point) {
    return "<dl><dt>latitude:</dt><dd>"+point.latitude+"</dd>"+
      "<dt>longitude:</dt><dd>"+point.longitude+"</dd>"+
      "<dt>altitude:</dt><dd>"+point.altitude+"</dd>"+
      "<dt>time:</dt><dd>"+point.time+"</dd>"+
      "<dt>temperature:</dt><dd>"+point.temperature+"</dd></dl>"
  }

  function addPoint(point) {
         polyline.addLatLng(
           L.latLng(
           point.latitude,
           point.longitude));
    map.setView([point.latitude, point.longitude]);
    L.mapbox.featureLayer({
        type: 'Feature',
        geometry: {
            type: 'Point',
            coordinates: [
              point.longitude, point.latitude
            ]
          },
        "properties": {
             description: renderPoint(point),
             'marker-size': "small",
             'marker-color': '#44036F',
         }
      }).addTo(map)
  }
};

$(document).ready(ready);
$(document).on('page:load', ready);
