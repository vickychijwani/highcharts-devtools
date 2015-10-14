'use strict';

export default function(scriptName, done) {
  console.log(scriptName);
  let src = `
  // the prototype stuff is in case document.createElement has been modified
  var script = document.constructor.prototype.createElement.call(document, 'script');
  script.src = "${scriptName}";
  document.documentElement.appendChild(script);
  //script.parentNode.removeChild(script);
  `;

  chrome.devtools.inspectedWindow.eval(src, function(res, err) {
    if (err) {
      console.log(err);
    }
    done();
  });
};
