var altimeter;

var loadAltimeter = function(seriesData){
  altimeter = new Highcharts.Chart({
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      renderTo: 'gauge_1',
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      spacingBottom: 0
    },
    title: {
      text: 'Altimeter'
    },
    pane: {
      startAngle: -125,
      endAngle: 125,
      size: '90%',
      background: {
        backgroundColor: '#191919'
      }
    },
     credits: {
        enabled: false
    },
    yAxis: [{
      min: 0,
      max: 33500,
      lineColor: 'purple',
      tickColor: 'purple',
      minorTickColor: 'purple',
      offset: -25,
      lineWidth: 4,
      labels: {
        distance: -20,
        rotation: 'auto'
      },
      tickLength: 5,
      minorTickLength: 5,
      endOnTick: false
    }, {
      min: 0,
      max: 33500 * 3.28084,
      tickPosition: 'outside',
      lineColor: 'purple',
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
      data: [seriesData],
      dial: {
            backgroundColor: 'red',
            borderColor: 'red'
          },
      dataLabels: {
        style: {
            fontSize: '18px'
        },
        formatter: function () {
          var meters = this.y,
          feet = Math.round(meters * 3.28084);
          return '<span style="color:#339">'+ meters + ' m</span><br/>' +
          '<span style="color:#933">' + feet + ' ft</span>';
        },
        backgroundColor: '#191919'
      },
      tooltip: {
        valueSuffix: ' m'
      }
    }]
  });
};

var playAltimeter = function() {
  altimeter.series[0].points[0].update(flight_data[seriesIndex].y);
};

