var ready;
var chart;
var display;
var $display;

ready = function(){

  $display = $('#display')
  display = $('#display p');

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
      type: 'time',
      minRange: 60 * 4,
      title: {text: 'Time'},
      tickInterval: 4 * 3600 * 1000,

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
                display.html("hello");
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
    click: function(e) {
      console.log(
      "hi"
      )
    }
  });

  $("#button-play").click(function(){
    chart.addSeries({
      type: 'area',
      name: 'Altitude',
      pointInterval: 60 * 1000,
      pointStart: 0,
      data: [0.8446, 0.8445, 0.8444, 0.8451, 0.8418, 0.8264, 0.8258, 0.8232, 0.8233, 0.8258, 0.8283, 0.8278, 0.8256, 0.8292, 0.8239, 0.8239, 0.8245, 0.840, 0.844, 0.845],
      color: '#E6E6FA'
    });
  });

  $("#button-play").click(function(){
    $display.show('slide', {direction: 'left'}, 1200);
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
