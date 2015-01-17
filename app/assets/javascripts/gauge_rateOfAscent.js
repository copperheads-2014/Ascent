
var loadAscent = function(seriesData){
  ascent = new Highcharts.Chart({
    chart: {
      type: 'column',
      renderTo: 'gauge_6',
      width: 100
    },
    title: {
      text: 'Ascent'
    },
    legend: {enabled: false},
    yAxis: {
         title: {
             text: null
         },
         labels: {
             enabled: false
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
            enabled: false,
            formatter: function() {
              var rate = Math.round(this.y * 100) / 100;
              return '<div style="text-align:center"><span style="font-size:25px;color:' +
                  ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black') + '">' + rate + '</span><br/>' +
                     '<span style="font-size:14px;color:silver">Meters / Second</span></div>'
          }
        }
      }]
  })
}

var playAscent = function(point) {
  ascent.series[0].points[0].update(point.y);
};

var rateOfAscent = function(currentPoint, lastPoint){
  meters = (currentPoint.y - lastPoint.y)
  seconds = ((currentPoint.x - lastPoint.x) / 1000)
  return (meters / seconds)
}

var updateAscentInfo = function(point){
  var i = findWithAttr(flight_data, 'x', point.x );
  var point = flight_data[i];
  var previousPoint;
  if(i === 0){
    previousPoint = flight_data[i];
    point = flight_data[i+1]
  }
  else{
    previousPoint = flight_data[(i - 1)];
  };
  var rate = Math.round(rateOfAscent(point, previousPoint) * 10) / 10;
  var spacer = function() {
    if(rate < 0) {
      return '';
    }
    else {
      return '<span style="visibility:hidden">+</span>';
    }
  };

  $('#gauge_6_info').html('<p>' + spacer() +  rate.toFixed(1) + ' m / s</p>');
}

var ascentFormatAndSendPoint = function(point, rate){
  var ratePoint = jQuery.extend({}, point);
  ratePoint.x = point.x;
  ratePoint.y = rate;
  playAscent(ratePoint);
}

var ascentOnClick = function(pointClicked){
  var i = findWithAttr(flight_data, 'x', pointClicked.x );
  var point = flight_data[i];
  var previousPoint = flight_data[(i - 1)];
  var rate = Math.round(rateOfAscent(point, previousPoint) * 10) / 10;
  ascentFormatAndSendPoint(point, rate)
  $('#gauge_6_info').html('<p>' +  rate + ' m / s</p>');

}