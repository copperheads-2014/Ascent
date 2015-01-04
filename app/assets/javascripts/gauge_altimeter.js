var altimeter;

var loadAltimeter = function(seriesData){
  console.log([seriesData*10])
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
      startAngle: 0,
      endAngle: 360,
      size: '90%',
      background: {
        backgroundColor: '#191919',
        borderWidth: 0
      }
    },
     credits: {
        enabled: false
    },
    yAxis: [{
      min: 0,
      max: 9999,
      lineColor: '#191919',
      tickColor: 'purple',
      minorTickColor: '#878787',
      offset: -25,
      labels: {
        distance: -20,
        rotation: 'auto'
      },
      tickLength: 10,
      minorTickLength: 0,
      endOnTick: false
    // }, {
    //   min: 0,
    //   max: 33500 * 3.28084,
    //   tickPosition: 'outside',
    //   lineColor: '#191919',
    //   minorTickPosition: 'outside',
    //   tickColor: 'purple',
    //   minorTickColor: '#878787',
    //   tickLength: 8,
    //   minorTickLength: 0,
    //   labels: {
    //     distance: 12,
    //     rotation: 'auto'
    //   },
    //   offset: -20,
    //   endOnTick: false
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
        formatter: function () {
          var meters = this.y,
          feet = Math.round(meters * 3.28084);
          return '<br><span style="color:#800080">'+ meters + ' m</span><br/>' +
          '<span style="color:#878787">' + feet + ' fT</span>';
        },
        backgroundColor: '#191919',
        borderWidth: 0
      },
      tooltip: {
        valueSuffix: ' m'
      }
    },
    {
      data: [seriesData*100],
      dial: {
        radius: '30%',
        baseWidth: 10,
        baseLength: '30%',
        backgroundColor: '#777777'
      },
      dataLabels: {enabled: false}
    },
    {
      data: [seriesData*10],
      dial: {
        radius: '60%',
        baseWidth: 5,
        baseLength: '50%',
        backgroundColor: '#777777'
      },
      dataLabels: {enabled: false}
    }]
  });
};






var playAltimeter = function() {
  altimeter.series[0].points[0].update(flight_data[seriesIndex].y);
};

