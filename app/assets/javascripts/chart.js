var chart;
var clickDetected = false;

var loadChart = function(seriesData, duration) {
  if (typeof seriesData === 'undefined') { seriesData = [0,0]; }
  if (typeof duration === 'undefined') { duration = 1000; }

  chart = new Highcharts.Chart({
    chart: {
      backgroundColor: '#191919',
      zoomType: 'x',
      renderTo: 'chart',
      style: {
        fontFamily: 'Arial',
        fontSize: '12px'
      }
    },
     credits: {
        enabled: false
    },
    title: {
      text: 'The Journey',
      style: {
        "color": 'gray',
        "fontFamily" : 'Codystar'}
    },
    subtitle: {
      text: 'Drag over chart to zoom in',
      style: {"fontFamily" : "Unica One"}
    },
    xAxis: {
      min: 1,
      max: flight_data[flight_data.length -1].x,
      type: 'datetime',
      // title: {text: 'Time'},
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
            click: function() {
              $('#time').html("Time: " + Highcharts.dateFormat('%H:%M:%S', this.x) + " (H:M:S)");
              $('#altitude').html("Altitude: " + this.y + " m");
              $('#temp').html("Temperature: " + this.temp + " °C");
              loadAltimeter(this.y);
              loadThermometer2(this.temp);
              loadBarometer(this.pressure);
              displayDataComment(this.id);
            }

          }
        },
          animation: {duration: duration}
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
        // dateTimeLabelFormats: {second: '%H:%M:%S'},

         formatter: function() {
             return  '<b>' + 'Altitude: ' + this.y + 'm / ' + (Math.round(this.y * 3.28084)) + 'ft</b><br/>' + 'Elapsed Time: ' +
                 Highcharts.dateFormat('%H:%M:%S', new Date(this.x));
         }

      }
    });

};

var playChart = function() {
  loadChart(flight_data.slice(0, seriesIndex));
  chart.series[0].addPoint(flight_data[seriesIndex]);
}
