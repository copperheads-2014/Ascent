var thermometer;

var loadThermometer = function(seriesData){
  thermometer = new Highcharts.Chart({
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      renderTo: 'gauge_2',
      spacingTop: 0,
      spacingLeft: 0,
      spacingRight: 0,
      spacingBottom: 0
    },
    title: {
      text: 'Thermometer'
    },
    pane: {
      startAngle: -125,
      endAngle: 125,
      size: '50%'
    },
    yAxis: [{
      min: -60,
      max: 60,
      lineColor: '#339',
      tickColor: '#339',
      minorTickColor: '#339',
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
      min: (-60 * (9/5)) + 32,
      max: (60 * (9/5)) + 32,
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
      name: 'Thermometer',
      data: [seriesData],
      dataLabels: {
        style: {
            fontSize: '18px'
        },
        formatter: function () {
          var celcius = this.y,
          fahrenheit = Math.round(celcius * (9/5) + 32);
          return '<span style="color:#339">'+ celcius + ' °C</span><br/>' +
          '<span style="color:#933">' + fahrenheit + ' °F</span>';
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
        valueSuffix: ' °C'
      }
    }]
  });

};

var playThermometer = function() {
  thermometer.series[0].points[0].update(flight_data[seriesIndex].temp);
};
