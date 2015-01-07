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
        center: ['50%', '65%'],
        size: '100%',
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
            [0.1, '#555555'],
            [0.5, '#888888'],
            [0.9, '#BBBBBB']
        ],
        lineWidth: 0,
        minorTickInterval: null,
        tickPixelInterval: 100,
        tickWidth: 0,
        labels: {
          y: 16,
          style: {color: '#4d1eb3'}
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
          formatter: function() {
            var degrees = Math.round(this.y)
            return '<div style="text-align:center"><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + degrees + '</span><br/>' +
                   '<span style="font-size:14px;color:silver">°C</span></div>'
        }
      }}]
  });
};


var playThermometer2 = function(point) {
  thermometer2.series[0].points[0].update(point.temp);
};
