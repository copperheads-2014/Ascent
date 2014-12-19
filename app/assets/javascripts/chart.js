var ready;

ready = function(){
  new Highcharts.Chart({
    chart: {
      zoomType: 'x',
      renderTo: 'chart'
    },
    title: {
      text: 'Fuck you, Timmy.'
    },
    subtitle: {
      text: document.ontouchstart === undefined ?
              'Entirely fuck you all.' :
              'Pinch the chart to zoom in'
    },
    xAxis: {
        type: 'datetime',
        minRange: 60 * 4
    },
    yAxis: {
        title: {
            text: 'Altitute'
        }
    },
    legend: {
        enabled: false,
        backgroundColor: '#E6E6FA'
    },
    plotOptions: {
        area: {
            fillColor: {
                linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1},
                stops: [
                    [0, Highcharts.getOptions().colors[5]],
                    [1, Highcharts.Color(Highcharts.getOptions().colors[7]).setOpacity(0).get('rgba')]
                ]
            },
            marker: {
                radius: 2
            },
            lineWidth: 1,
            states: {
                hover: {
                    lineWidth: 1
                }
            },
            threshold: null
        }
    },
    series: [{
        type: 'area',
        name: 'USD to EUR',
        pointInterval: 24 * 3600 * 1000,
        pointStart: Date.UTC(2006, 0, 1),
        data: [
            0.8446, 0.8445, 0.8444, 0.8451,    0.8418, 0.8264,    0.8258, 0.8232,    0.8233, 0.8258,
            0.8283, 0.8278, 0.8256, 0.8292,    0.8239, 0.8239,    0.8245, 0.8265,    0.8261, 0.8269,
            0.8273, 0.8244, 0.8244, 0.8172,    0.8139, 0.8146,    0.8164, 0.82,    0.8269, 0.8269
        ]
    }]
  });
};

$(document).ready(ready);
$(document).on('page:load', ready);
