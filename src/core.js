/**
 *
 *
 *
 */

;(function(global) {
  var doc = global.document, head = document.getElementsByTagName('head')[0];

  function getEnv() {
    var userAgent = navigator.userAgent, environment = {};
    return (environment.ie = /MSIE|Trident/.test(userAgent)) || (environment.unknown = true);
  }

  function createNode(name, attributes) {
    var node = doc.createElement(name), attribute;

    for (attribute in attributes) {
      if (attributes.hasOwnProperty(attribute)) {
        node.setAttribute(attribute, attributes[attribute]);
      }
    }

    return node;
  }

  function loadModule(url, async, loaded) {
    var environment = getEnv();

    var scriptNode = createNode('script', {
      src : url
    });
    scriptNode.async = async;

    if (environment.ie) {
      scriptNode.onreadystatechange = function() {
        if (/loaded|complete/.test(node.readyState)) {
          scriptNode.onreadystatechange = null;
          loaded(scriptNode);
        }
      };
    } else {
      scriptNode.onload = function() {
        loaded(this);
      };
    }
    head.appendChild(scriptNode);
  }

  function convertArray(o) {
    return Array.prototype.slice.call(o);
  }

  _ = customize = {
    version : '0.0.1'
  };

  _.loadModule = loadModule;

  var scripts = convertArray(document.scripts), bootstrap, neededModule, isAsync;
  for (var i in scripts) {
    var script = scripts[i];
    neededModule = script.getAttribute('data-custom');
    isAsync = script.getAttribute('data-async');
    if (neededModule && isAsync) {
      neededModule = neededModule.split(',');
      bootstrap = script;
      break;
    }
  }

  // 所有模块加载完成后触发的一个回调函数
  function modulesReady() {
    return;
  }

  var moduleNum = neededModule.length, loadedCounter = 0, scriptPath;

  // 脚本的基本路径
  var originalPath = bootstrap.src.split('core.js');
  scriptPath = originalPath[0];
  function scriptLoaded(scriptNode) {
    loadedCounter++;
    scriptNode.parentNode.removeChild(scriptNode);

    if (loadedCounter == moduleNum) {
      modulesReady();
    }
  }

  for (var j in neededModule) {
    loadModule(scriptPath + 'modules/' + neededModule[j] + '.js', false, scriptLoaded);
  }
})(this);

