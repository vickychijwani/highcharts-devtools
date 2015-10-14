'use strict';

// Create a connection to the background page
var backgroundPageConnection = chrome.runtime.connect({
  name: "highcharts-devtools-page"
});

backgroundPageConnection.onMessage.addListener(function (message) {
  // Handle responses from the background page, if any
});

// Relay the tab ID to the background page
chrome.runtime.sendMessage({
  tabId: chrome.devtools.inspectedWindow.tabId,
  scriptToInject: "content-script.min.js"
});

import React from 'react';
import ChartsTree from '../../../frontend/ChartsTree';
import inject from './inject.js';

inject(chrome.runtime.getURL('build/backend.min.js'), function () {
  chrome.devtools.inspectedWindow.eval('HCDevtools.getChartsOnPage()',
    function (charts, error) {
      if (error) {
        console.error(error);
      }
      React.render(
        <ChartsTree charts={charts} />,
        document.getElementById('container')
      )
    });
});
