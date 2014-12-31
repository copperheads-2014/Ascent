// var barometer;

// var loadBarometer = function(){
//   barometer = new Highcharts.Chart({
//     chart: {
//       type: 'solidgauge',
//       renderTo: 'gauge_3'
//     },
//     title: "Barometric Pressure",
//     pane: {
//       center: ['50%', '85%'],
//       size: '140%',
//       startAngle: -90,
//       endAngle: 90,
//       background: {
//         backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
//         innerRadius: '60%',
//         outerRadius: '100%',
//         shape: 'arc'
//       }
//     },
//     tooltip: {
//       enabled: false
//     },
//     // the value axis
//     yAxis: {
//       stops: [
//         [0.1, '#55BF3B'], // green
//         [0.5, '#DDDF0D'], // yellow
//         [0.9, '#DF5353'] // red
//       ],
//       lineWidth: 0,
//       minorTickInterval: null,
//       tickPixelInterval: 400,
//       tickWidth: 0,
//       title: {
//         y: -70
//       },
//       labels: {
//         y: 16
//       }
//     },
//     plotOptions: {
//       solidgauge: {
//         dataLabels: {
//           y: 5,
//           borderWidth: 0,
//           useHTML: true
//         }
//       }
//     }
//   });
// };

// var playBarometer = function(interval_time) {
//   var seriesIndex = 0;
//   setInterval(function() {
//     var point = barometer.series[0].points[0];
//     seriesIndex++;
//     if (seriesIndex < flight_data.length) {
//       point.update(flight_data[seriesIndex].temp);
//     }
//   }, interval_time);
// };
