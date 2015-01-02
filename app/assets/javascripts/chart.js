var chart;

var loadChart = function(seriesData) {
  if (typeof seriesData === 'undefined') { seriesData = [0,0]; }
  console.log(flight_data)
  chart = new Highcharts.Chart({
    chart: {
      backgroundColor: '#292929',
      borderColor: "gray",
      borderWidth: 10,
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
      min: 0,
      max: flight_data[flight_data.length -1].x,
      type: 'datetime',
      title: {text: 'Time'},
      dateTimeLabelFormats: {second: '%H:%M:%S'}
    },
    yAxis: {
      min: 0,
      max: 40000,
      title: {text: 'Altitude'}
    },
    series: [{
      name: "Altitude",
      type: "area",
      data: seriesData,
      color: '#E6E6FA'
    }],
    plotOptions: {
      series: {
        allowPointSelect: true,
        point: {
          events: {
            select: function() {
              $('#time').html("Time: " + Highcharts.dateFormat('%H:%M:%S', this.x) + " (H:M:S)");
              $('#altitude').html("Altitude: " + this.y + " m");
              $('#temp').html("Temperature: " + this.temp + " °C");
              loadAltimeter(this.y);
              loadThermometer(this.temp);

            }
          }
        },
          animation: false
        },
        area: {
          fillColor: null,
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

};

var playChart = function(interval_time) {
  var seriesIndex = 0;
  setInterval(function() {
    series = chart.series[0];
    seriesIndex++;
    if (seriesIndex < flight_data.length) {
      series.addPoint(flight_data[seriesIndex]);
    }
  }, interval_time);
}

