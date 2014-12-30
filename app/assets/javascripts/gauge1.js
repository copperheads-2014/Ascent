var display_gauge1 = function(){
  var gauge_1 = new Highcharts.Chart({
    chart: {
      type: 'gauge',
      plotBackgroundColor: null,
      plotBackgroundImage: null,
      plotBorderWidth: 0,
      plotShadow: false,
      renderTo: 'gauge_1'
    },
    title: {
      text: 'Altometer'
    },
    pane: {
      startAngle: -150,
      endAngle: 150
    },
    yAxis: [{
      min: 0,
      max: 3200,
      lineColor: '#339',
      tickColor: '#339',
      minorTickColor: '#339',
      offset: -25,
      lineWidth: 2,
      labels: {
        distance: -20,
        rotation: 'auto'
      },
      tickLength: 5,
      minorTickLength: 5,
      endOnTick: false
    }, {
      min: 0,
      max: 100000,
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
      name: 'Altitude',
      data: flight_data,
      dataLabels: {
        formatter: function () {
          var meters = this.y,
          feet = Math.round(meters * 3.28084);
          return '<span style="color:#339">'+ meters + ' m</span><br/>' +
          '<span style="color:#933">' + feet + ' ft</span>';
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
        valueSuffix: ' m'
      }
    }],
    plotOptions: {
      gauge: {
        animation:  true
      }
    }

    } //,
    // Add some life
    // function(gauge_1) {
    //     setInterval(function() {
    //         var point = chart.series[0].points[0],
    //             newVal, inc = Math.round((Math.random() - 0.5) * 20);

    //         newVal = point.y + inc;
    //         if (newVal < 0 || newVal > 200) {
    //             newVal = point.y - inc;
    //         }

    //         point.update(newVal);

    //     }, 3000);

    );

  // $("#button-play").click(function(){
  //   gauge_1.addSeries({
  //     name: 'Altitude',
  //     data: flight_data,
  //     dataLabels: {
  //       formatter: function () {
  //       },
  //       backgroundColor: {
  //         linearGradient: {
  //           x1: 0,
  //           y1: 0,
  //           x2: 0,
  //           y2: 1
  //         },
  //         stops: [
  //         [0, '#DDD'],
  //         [1, '#FFF']
  //         ]
  //       }
  //     },
  //     tooltip: {
  //       valueSuffix: ' m'
  //     }
  //   });
  //   gauge_1.redraw();
  // });
};


$(document).ready(display_gauge1);
$(document).on('page:load', display_gauge1);

