'use strict';

var HCDevtools = {};

HCDevtools.getChartsOnPage = function () {
  let charts = window.Highcharts.charts.map(function (chart) {
    return chart.options;
  });
  return charts;
}

window.HCDevtools = HCDevtools;
