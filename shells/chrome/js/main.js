'use strict';

var panelCreated = false;

function createPanelIfHighchartsLoaded() {
  if (panelCreated) {
    return;
  }
  chrome.devtools.inspectedWindow.eval(`!!(window.Highcharts)`, function (pageHasHC, err) {
    if (!pageHasHC || panelCreated) {
      return;
    }

    clearInterval(loadCheckInterval);
    panelCreated = true;
    chrome.devtools.panels.create('Highcharts', '', 'panel.html', function (panel) {
      var highchartsPanel = null;
      panel.onShown.addListener(function(window) {
        window.focus();
      });
    });
  });
}

chrome.devtools.network.onNavigated.addListener(function() {
  createPanelIfHighchartsLoaded();
});

// Check to see if Highcharts has loaded every few seconds in case Highcharts is added
// after page load
var loadCheckInterval = setInterval(function() {
  createPanelIfHighchartsLoaded();
}, 5000);

createPanelIfHighchartsLoaded();
