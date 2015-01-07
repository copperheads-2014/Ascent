var clock;

var loadClock = function(seriesData, maxValue){
  clock = new Highcharts.Chart({
      chart: {
        type: 'solidgauge',
        renderTo: 'gauge_5',
        plotBorderWidth: 0,
        spacingTop: 0,
        spacingLeft: 0,
        spacingRight: 0,
        spacingBottom: 0
      },

      title: {
        text: 'Clock'
      },
      pane: {
        size: '100%',
        startAngle: 0,
        endAngle: 360,
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
        tickPixelInterval: 100,
        minorTickInterval: null,
        tickWidth: 0,
        labels: {
          enabled: false,
          style: {color: '#4d1eb3'}
        },
        min: .001,
        max: maxValue,
      },
      plotOptions: {
        solidgauge: {
          animation: true,
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
        name: 'Time',
        data: [seriesData],
        dataLabels: {
          y: -40,
          useHTML: true,
          formatter: function() {
            var time = (this.y)
            return '<div style="text-align:center"><span style="font-size:14px;color:silver">Time</span><br><span style="font-size:14px;color:silver">Remaining</span><br><span style="font-size:25px;color:' +
                ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'silver') + '">' + Highcharts.dateFormat('%H:%M:%S', time) + '</span><br/>' +
                   '<span style="font-size:14px;color:silver">h:m:s</span></div>'
          }
        }
      }]
  });
};

var playClock = function(point) {
  clock.series[0].points[0].update(point.x);
};
