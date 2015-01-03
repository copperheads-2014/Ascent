var thermometer2;

var loadThermometer2 = function(seriesData){
  thermometer2 = new Highcharts.Chart({
      chart: {
        type: 'solidgauge',
        renderTo: 'gauge_4',
        plotBorderWidth: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        spacingBottom: 0
      },
      title: {
        text: 'Thermometer'
      },
      pane: {
        center: ['50%', '85%'],
        size: '60%',
        startAngle: -90,
        endAngle: 90,
        background: {
          backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
          innerRadius: '60%',
          outerRadius: '100%',
          shape: 'arc'
        }
      },
      tooltip: {
        enabled: false
      },
      yAxis: {
        stops: [
          [0.1, '#DF5353'], // red
          [0.5, '#DDDF0D'], // yellow
          [0.9, '#55BF3B'] // green
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 100,
        tickWidth: 0,
        labels: {
          y: 16
        },
        min: -50,
        max: 50
      },
      plotOptions: {
        solidgauge: {
          dataLabels: {
            y: 5,
            borderWidth: 0,
            useHTML: true
          }
        }
      },
      credits: {
        enabled: false
      },
      series: [{
        name: 'Temperature',
        data: [seriesData],
        dataLabels: {
          format: '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + Math.round(this.y) + '</span><br/>' +
                   '<span style="font-size:14px;color:silver">°C</span></div>'
        }
      }]
  });
};

var playThermometer2 = function() {
  thermometer2.series[0].points[0].update(flight_data[seriesIndex].temp);
};
