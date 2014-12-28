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

  index_of_digit = (document.URL.search(/\/\d/)) + 1
  flight_id = (document.URL[index_of_digit])

  $.ajax({
    url: "/charts/" + flight_id + ".json",
    method: "get",
    success: function(response){
      console.log(response);
      flight_data = response
    }
  })

  console.log(flight_data)

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
                $('#time').html("Time: " + Highcharts.dateFormat('%H:%M:%S', flight_data.x - flight_data[0].x) + " (H:M:S)");
                $('#altitude').html("Altitude: " + flight_data.y + " m");
                $('#temp').html("Temperature: " + flight_data.temp + " °C");
              }
            }
          },
        animation: {duration: 3000}
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
    chart.addSeries({
      type: 'area',
      name: 'Altitude',
      pointStart: 0,
      color: '#E6E6FA',
      // data: [
      //   {x: flight_data[0].x, y: flight_data[0].y, temp: null},
      //   {x: flight_data[100].x, y: flight_data[100].y, temp: null},
      //   {x: flight_data[200].x, y: flight_data[200].y, temp: null},
      //   {x: flight_data[300].x, y: flight_data[300].y, temp: null},
      //   {x: flight_data[400].x, y: flight_data[400].y, temp: null}
      // ]
      data: flight_data

    });
  });

  $("#button-play").click(function(){
    $display.show('slide', {direction: 'left'}, 1200);
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
