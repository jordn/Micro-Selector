/*
 * Javascript DOM-Selection Engine
 * Jordan Burgess 2014-05-15
 * Released under the MIT license
 */

var $ = function ( selector, context ) {
  "use strict";

  context = context || document;
  selector = selector.trim();

  var match,
    to_keep = [],
    elements = [],
    id_regex = /(?:#([\w-]+))/,
    tag_regex = /^(\w+)/,
    class_regex = /(?:\.([\w-]+))/,
    currentSelector = selector.split(" ")[0],
    remainingSelector = selector.indexOf(" ") !== -1 ?
                        selector.substr(selector.indexOf(" ")+1) :
                        "";


  var previousSelector = currentSelector;
  while (currentSelector.length !== 0) {

    // #ID
    match = id_regex.exec(currentSelector);
    if (match) {
      currentSelector = currentSelector.replace(match[0], "");

      var element = null;
      if (context === document) {
        element = context.getElementById(match[1]);
      } else {
        if (context.ownerDocument) {
          var test_element = context.ownerDocument.getElementById(match[1]);
          
          // Bitwise AND on bit4 to test if DOCUMENT_POSITION_CONTAINED_BY
          if ((context.compareDocumentPosition(test_element) & 16) === 16) {
            element = test_element;
          }
        }
      }
      if (element) {
        elements.push(element);
      } else {
        return elements;
      }
    }

    // TAG
    match = tag_regex.exec(currentSelector);
    if (match) {
      currentSelector = currentSelector.replace(match[0], "");
      if (elements.length === 0) {
        elements = context.getElementsByTagName(match[1]);
      } else {
        to_keep = [];
        for (var i = 0; i < elements.length; i++) {
          if (elements[i].nodeName === match[1].toUpperCase()) {
            to_keep.push(elements[i]);
          }
        }
        elements = to_keep;
      }
    }

    // .CLASS
    match = class_regex.exec(currentSelector);
    if (match) {
      currentSelector = currentSelector.replace(match[0], "");

      // NB getElementsByClassName doesn't work in < IE9
      if (elements.length === 0 && context.getElementsByClassName) {
        elements = context.getElementsByClassName(match[1]);
      } else {
        to_keep = [];
        for (var i = 0; i < elements.length; i++) {

          // Regexp to check class name exists and is not a substring
          var re = new RegExp("\\b" + match[1] + "\\b", "g");
          if (elements[i].className.search(re) !== -1) {
            to_keep = to_keep.concat([elements[i]]);
          }
        }
        elements = to_keep;
      }
    }
    if (currentSelector === previousSelector) {
    
      // Unable to be parse (potentially valid but beyond this script's scope)
      throw new Error("Syntax error, unrecognized token: " + currentSelector);
    } else {
      previousSelector = currentSelector;
    }
  }

  if (remainingSelector.length !== 0) {
    to_keep = [];
    for (var i = 0; i < elements.length; i++) {
      try {
        to_keep.push.apply(to_keep, $(remainingSelector, elements[i]));
      } catch(error) {
        throw error;
      }
    }
    elements = to_keep;
  }

  return elements.length === 0 ? [] : elements;
};
