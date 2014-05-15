var $ = function (selector) {
  "use strict";

  var elements = [];
  var contexts = [document];
  var id_regex = /(?:#([\w-]+))/;
  var tag_regex = /^(\w+)/;
  var class_regex = /(?:\.([\w-]+))/;
  var match;

  // put the following in a while there exists a selector
  var previousSelector = selector;

  while (selector.length !== 0) {
    // console.log("\n\n--> " + selector);

    // #ID
    match = id_regex.exec(selector);
    if (match) {
      // console.log("id " + match[0]);
      selector = selector.replace(match[0], '');
      var element = document.getElementById(match[1]);
      if (element) {
        elements.push(element);
      } else {
        return elements;
      }
    }

    // TAG
    match = tag_regex.exec(selector);
    if (match) {
      // console.log("tag " + match[0]);
      selector = selector.replace(match[0], '');
      if (elements.length === 0) {
        elements = contexts[0].getElementsByTagName(match[1]);
      } else {
        var to_keep = [];
        for (var i = 0; i < elements.length; i++) {
          if (elements[i].tagName === match[1].toUpperCase()) {
            to_keep.push(elements[i]);
          }
        }
        elements = to_keep;
      }
    }

    // .CLASS
    match = class_regex.exec(selector);
    if (match) {
      // console.log("class " + match[0]);
      selector = selector.replace(match[0], '');
      if (elements.length === 0) {
        elements = contexts[0].getElementsByClassName(match[1]);
      } else {
        var to_keep = [];
        for (var i = 0; i < elements.length; i++) {
          // Regexp to check class name exists && is not a substring
          var re = new RegExp("\\b" + match[1] + "\\b", "g");
          if (elements[i].className.search(re) !== -1) {
            to_keep.push(elements[i]);
          }
        }
        elements = to_keep;
      }
    }
    if (selector === previousSelector) {
      // Unable to be parse (potentially valid but beyond this selection engine's scope)
      throw new Error( "Syntax error, unrecognized expression: " + selector);
    } else {
      previousSelector = selector;
    }
  }
  return elements;

};
