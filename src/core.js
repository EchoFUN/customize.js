/**
 *
 *
 *
 */

;(function(global) {
  var doc = global.document;

  function getEnv() {
    var ua = navigator.userAgent, env = {};
    return (env.ie = /MSIE|Trident/.test(ua)) || (env.unknown = true);
  }

  function createNode(name, attrs) {
    var node = doc.createElement(name), attr;

    for (attr in attrs) {
      if (attrs.hasOwnProperty(attr)) {
        node.setAttribute(attr, attrs[attr]);
      }
    }

    return node;
  }

  function loadModule(url, async) {
    var env = getEnv();

    var node = createNode('script', {
      src : url
    });
    node.async = async;

    if (evn.ie) {
      node.onreadystatechange = function() {
        if (/loaded|complete/.test(node.readyState)) {
          node.onreadystatechange = null;
          loaded();
        }
      };
    } else {
      node.onload = loaded;
    }
  }
  
  function convertArray(o) {
    return Array.prototype.slice.call(o); 
  }

  _ = customize = {
    version : '0.0.1'
  };
  
  _.loadModule = loadModule;
  
  var scripts = convertArray(document.scripts), bootstrap;
  for(var i in scripts) {
    var script = scripts[i];
    
    
  }

})(this);

