var chart;

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
      title: {text: 'Altitude'},
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
var displayPointComment = function(comments, i) {

  if(comments.length > i) {
    console.log(comments[i])
    $('#comment_display p').text(comments[i].author + ": " + comments[i].body).fadeIn(3000/comments.length).fadeOut(3000/comments.length, function() {
      displayPointComment(comments, i + 1);
    });
  }
};

var pointComments = function(points) {
  console.log(points);
  for(var i = 0; i < points.length; i++) {
    if(points[i].comments !== undefined) {
      displayPointComment(points[i].comments, 0);
    }
  }
};

var playChart = function(points) {
  var point = points[points.length - 1];

  pointComments(points);
  chart.series[0].addPoint(point);
};
