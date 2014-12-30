var altometer;

var loadAltometer = function(){

  altometer = new Highcharts.Chart({
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      renderTo: 'gauge_1'
    },
    title: {
      text: 'Altometer'
    },
    pane: {
      startAngle: -150,
      endAngle: 150
    },
    yAxis: [{
      min: 0,
      max: 5000,
      lineColor: '#339',
      tickColor: '#339',
      minorTickColor: '#339',
      offset: -25,
      lineWidth: 2,
      labels: {
        distance: -20,
        rotation: 'auto'
      },
      tickLength: 5,
      minorTickLength: 5,
      endOnTick: false
    }, {
      min: 0,
      max: 5000 * 3.28084,
      tickPosition: 'outside',
      lineColor: '#933',
      lineWidth: 2,
      minorTickPosition: 'outside',
      tickColor: '#933',
      minorTickColor: '#933',
      tickLength: 5,
      minorTickLength: 5,
      labels: {
        distance: 12,
        rotation: 'auto'
      },
      offset: -20,
      endOnTick: false
    }],

    series: [{
      name: 'Altitude',
      data: [0],
      dataLabels: {
        formatter: function () {
          var meters = this.y,
          feet = Math.round(meters * 3.28084);
          return '<span style="color:#339">'+ meters + ' m</span><br/>' +
          '<span style="color:#933">' + feet + ' ft</span>';
        },
        backgroundColor: {
          linearGradient: {
            x1: 0,
            y1: 0,
            x2: 0,
            y2: 1
          },
          stops: [
          [0, '#DDD'],
          [1, '#FFF']
          ]
        }
      },
      tooltip: {
        valueSuffix: ' m'
      }
    }]
    });

};

var playAltometer = function(interval_time) {
  var seriesIndex = 0;
  setInterval(function() {
    var point = altometer.series[0].points[0];
    seriesIndex++;
    if (seriesIndex < flight_data.length) {
      point.update(flight_data[seriesIndex].y);
    }
  }, interval_time);
};
