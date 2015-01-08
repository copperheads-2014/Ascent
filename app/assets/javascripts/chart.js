var chart;
var clickDetected = false;

// var renderAscentInfo = function(rate){
//   $('#gauge_6_info').html('<div style="text-align:center"><span style="font-size:25px;color:' +
//                   ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + rate + '</span><br/>' +
//                      '<span style="font-size:14px;color:silver">Meters / Second</span></div>')

// }

var loadChart = function(seriesData, duration) {
  if (typeof seriesData === 'undefined') { seriesData = [0,0]; }
  if (typeof duration === 'undefined') { duration = 1000; }

  chart = new Highcharts.Chart({
    chart: {
      backgroundColor: '#191919',
      zoomType: 'x',
      renderTo: 'chart',
      style: {
        fontFamily: 'Unica One ',
        fontSize: '12px'
      }
    },
     credits: {
        enabled: false
    },
    title: {
      text: null,
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
      dateTimeLabelFormats: {second: '%H:%M:%S'}
    },
    yAxis: {
      min: 0,
      max: 40000,
    },
    series: [{
      name: "Altitude",
      type: "area",
      data: seriesData,
      color: '#E6E6FA'
    }],
    plotOptions: {
      series: {
        marker: {enabled: false},
        allowPointSelect: true,
        point: {
          events: {
            click: function() {
              playAltimeter(this);
              playThermometer2(this);
              playBarometer(this);
              playClock(flight_data[invertIndex(this)]);
              playAscent(this);
              ascentOnClick(this);
              displayDataComment(this);
              playBattery(this);
              updateBatteryInfo(this);
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
         formatter: function() {
             return  '<b>' + 'Altitude: ' + this.y + 'm / ' + (Math.round(this.y * 3.28084)) + 'ft</b><br/>' + 'Elapsed Time: ' +
                 Highcharts.dateFormat('%H:%M:%S', new Date(this.x));
         }

      }
    });

};
var displayComment = function(point) {
  var comment = point.comments[0]
  url = "/users/" + comment.author_id
  $('#comment_display p').text(comment.author + ": " + comment.body);
  $('#comment_display p').fadeIn(3000).fadeOut(3000);
};

var playChart = function(point) {
  if (point.comments[0] !== undefined) {
    displayComment(point);
  }

  chart.series[0].addPoint(point);
};
