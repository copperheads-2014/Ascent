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

    tooltip: {enabled: false},


    pane: {
      size: '100%',
      startAngle: 0,
      endAngle: 360,
      center: ['50%', '50%'],
      background: {
        backgroundColor: '#191919',
        borderWidth: 0,
      }
    },
     credits: {
        enabled: false
    },
    yAxis: [{
      min: 0,
      max: 9999,
      lineColor: '#191919',
      tickColor: '#ffffff',
      minorTickColor: '#878787',
      offset: -25,
      labels: {
        distance: -23,
        rotation: 'auto',
        formatter: function() {
          return this.value / 1000;
        }
      },
      tickLength: 10,
      minorTickLength: 0,
      endOnTick: false
    }],

    series: [{
      name: 'Altitude',
      data: [seriesData],
      dial: {
            backgroundColor: '#999999',
          },
      dataLabels: {
        style: {
            fontSize: '18px'
        },
        y: 5,
        formatter: function () {
          var meters = this.y,
          feet = Math.round(meters * 3.28084);
          return '<br><span style="color:#ffffff">'+ meters + ' m</span><br/>' +
          '<span style="color:#ffffff">' + feet + ' fT</span>';
        },
        backgroundColor: '#191919',
        borderWidth: 0
      },
    },
    {
      data: [seriesData*100],
      dial: {
        radius: '30%',
        baseWidth: 10,
        baseLength: '50%',
        backgroundColor: '#777777'
      },
      dataLabels: {enabled: false},
    },
    {
      data: [seriesData*10],
      dial: {
        radius: '60%',
        baseWidth: 5,
        baseLength: '50%',
        backgroundColor: '#777777'
      },
      dataLabels: {enabled: false},
    },
    {
      data: [seriesData / 10],
      dial: {
        radius: '90%',
        rearLength: '-90%',
        baseWidth: 1,
        baseLength: '50%',
        backgroundColor: '#777777'
      },
      dataLabels: {enabled: false},
    }]
  });
};

var playAltimeter = function(point) {
  altimeter.series[0].points[0].update(point.y);
  altimeter.series[1].points[0].update(point.y*100);
  altimeter.series[2].points[0].update(point.y*10)
  altimeter.series[3].points[0].update(point.y/10);
};

