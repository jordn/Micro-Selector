/*
 * Javascript Selection Engine
 * Jordan Burgess 2014-05-15
 * Released under the MIT license
 */

var $ = function (selector, context) {
  "use strict";

  context = context || document;
  selector = selector.trim();
  var elements = [];
  var id_regex = /(?:#([\w-]+))/;
  var tag_regex = /^(\w+)/;
  var class_regex = /(?:\.([\w-]+))/;
  var match;

  var selectionHierarchy = selector.split(' ')
  console.log(selectionHierarchy.splice(0,1));
  console.log(selectionHierarchy)

  var previousSelector = selector;
  while (selector.length !== 0) {

    // #ID
    match = id_regex.exec(selector);
    if (match) {
      selector = selector.replace(match[0], '');
      var element = context.getElementById(match[1]);
      if (element) {
        elements.push(element);
      } else {
        return elements;
      }
    }

    // TAG
    match = tag_regex.exec(selector);
    if (match) {
      selector = selector.replace(match[0], '');
      if (elements.length === 0) {
        elements = context.getElementsByTagName(match[1]);
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
      selector = selector.replace(match[0], '');
      if (elements.length === 0) {
        elements = context.getElementsByClassName(match[1]);
      } else {
        var to_keep = [];
        for (var i = 0; i < elements.length; i++) {
          // Regexp to check class name exists and is not a substring
          var re = new RegExp("\\b" + match[1] + "\\b", "g");
          if (elements[i].className.search(re) !== -1) {
            to_keep.push(elements[i]);
          }
        }
        elements = to_keep;
      }
    }
    if (selector === previousSelector) {
      // Unable to be parse (potentially valid but beyond this scope)
      throw new Error( "Syntax error, unrecognized expression: " + selector);
    } else {
      previousSelector = selector;
    }
  }
  return elements;

};
