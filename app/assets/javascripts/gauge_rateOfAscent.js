
var loadAscent = function(seriesData){
  ascent = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: 'gauge_6'
    },
    title: {
      text: 'Rate of Ascent'
    },
    legend: {enabled: false},
    yAxis: {
        stops: [
              [0.1, '#555555'],
              [0.5, '#888888'],
              [0.9, '#BBBBBB']
          ],
         title: {
             text: null
         },
         labels: {
             y: 5
         },
         min: -19.9,
         max: 19.9,
         tickInterval: 20,
         minorTickInterval: 5,
         tickWidth: 1,
         tickLength: 8,
         minorTickLength: 10,
         minorTickWidth: 1,
         minorGridLineWidth: 0
     },
     xAxis: {
         labels: {
             enabled: false
         },
         tickLength: 0
     },
     plotOptions: {
      series: {
        animation: {duration: 500}
      }

     },
     tooltip: {endabled: false},
     credits: {enabled: false},
     series: [{
         borderColor: '#BBBBBB',
         color: '#999999',
         borderRadius: 3,
         borderWidth: 1,
         pointWidth: 50,
         data: [seriesData],
          dataLabels: {
            verticalAlign: 'bottom',
            useHTML: true,
            enabled: true,
            formatter: function() {
              var rate = Math.round(this.y * 100) / 100;
              console.log(rate)
              return '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + rate + '</span><br/>' +
                     '<span style="font-size:14px;color:silver">Meters / Second</span></div>'
          }
        }
      }]
  })
}

var playAscent = function(rate) {
  ascent.series[0].points[0].update(rate);
};

