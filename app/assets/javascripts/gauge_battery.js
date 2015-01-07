var fullBattery

var setFullBattery = function(point){
  fullBattery = point
}

var loadBattery = function(seriesData){

  battery = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: 'gauge_7'
    },
    title: {
      text: 'Battery Level'
    },
    legend: {enabled: false},
    yAxis: {
         title: {
             text: null
         },
         labels: {
             y: 5
         },
         min: .01,
         max: fullBattery,
         tickInterval: fullBattery/2,
         minorTickInterval: fullBattery/8,
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
     tooltip: {enabled: false},
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
              var batLevel = (this.y);
              var pct = calculatePct(batLevel)
              return '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + pct + '%</span><br/>' +
                     '<span style="font-size:14px;color:silver"of starting power</span></div>'
          }
        }
      }]
  })
}

var calculatePct = function(currentValue){
  console.log(currentValue)
  return Math.round((currentValue / fullBattery) * 100)
}

var playBattery = function(bat) {
  console.log(bat)
  battery.series[0].points[0].update(bat);
};



