// var ready;
// var chart;
// var $display;

// ready = function(){

//   $display = $('#display')

//   function setProperTime(integer) {

//   }

//   chart = new Highcharts.Chart({
//     chart: {
//       backgroundColor: '#D1DBDD',
//       borderColor: "#FFFFFF",
//       borderWidth: 5,
//       borderRadius: 15,
//       zoomType: 'x',
//       renderTo: 'chart',
//       style: {
//         fontFamily: 'Audiowide',
//         fontSize: '12px'
//       }
//     },
//     title: {
//       text: 'Space Trip',
//       style: { "color": 'black'}
//     },
//     subtitle: {
//       text: 'Pinch the chart to zoom in'
//     },
//     xAxis: {
//       type: 'datetime',
//       title: {text: 'Time'},
//       dateTimeLabelFormats: {second: '%H:%M:%S'}
//     },
//     yAxis: {
//       title: {text: 'Altitute'}
//     },
//     plotOptions: {
//       series: {
//         allowPointSelect: true,
//           point: {
//             events: {
//               select: function() {
//                 $('#time').html("Time: " + Highcharts.dateFormat('%H:%M:%S', this.x) + " (H:M:S)");
//                 $('#altitude').html("Altitude: " + this.y + " ft.");
//                 $('#temp').html("Temperature: " + this.temp + " °F");
//               }
//             }
//           },
//         animation: {duration: 3000}
//       },
//       area: {
//         fillColor: {
//           linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
//           stops: [
//             [0, Highcharts.getOptions().colors[5]],
//             [1, Highcharts.Color(Highcharts.getOptions().colors[8]).setOpacity(0).get('rgba')]
//           ]
//         },
//         marker: {
//           radius: 2
//         },
//         lineWidth: 1,
//         states: {
//           hover: {
//             lineWidth: 1
//           }
//         },
//         threshold: null
//       }
//     },
//     legend: {
//       enabled: false,
//       backgroundColor: '#E6E6FA'
//     },
//     tooltip: {
//       dateTimeLabelFormats: {second: '%H:%M:%S'}
//     }
//   });

//   $("#button-play").click(function(){
//     chart.addSeries({
//       type: 'area',
//       name: 'Altitude',
//       pointStart: 0,
//       color: '#E6E6FA',
//       data: [
//         {x: 0, y: 0, temp: 10},
//         {x: 160000, y: 70000, temp: 5},
//         {x: 240000, y: 77000, temp: -1},
//         {x: 302000, y: 80000, temp: -11},
//         {x: 320000, y: 99000, temp: -33}
//       ]
//     });
//   });

//   $("#button-play").click(function(){
//     $display.show('slide', {direction: 'left'}, 1200);
//   });
// };

// $(document).ready(ready);
// $(document).on('page:load', ready);
