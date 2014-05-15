var $ = function (selector) {

  var elements = [];
  var contexts = [document];
  // split selector by spaces.
  // parse the strings for ids, tags, classes (that order)
  // if ids. search doc for id, set that as elements
  // if tags keep elements of that tag
  // if classes keep elements of that class
  // return elements

  // split by spaces for inheritance unnecessary
  // parse the strings for ids, tags, classes (that order)
  console.log("\n\n--> " + selector)
  id_regex = /(?:#([\w-]+))/;
  tag_regex = /^(\w+)/;
  class_regex = /(?:\.([\w-]+))/;

  // if ids. search doc for id, set that as context
  ids = id_regex.exec(selector)
  if (ids) {
    // chop out ids
    selector = selector.replace(ids[0], '')
    console.log("Id: " + ids[1])
    contexts = [document.getElementById(ids[1])]
  }
  console.log(contexts)

  tags = tag_regex.exec(selector)
  if (tags) {
    // chop out tags
    selector = selector.replace(tags[0], '')
    console.log("Tags: " + tags[1])
    if (contexts[0] == document) {
      contexts = contexts[0].getElementsByTagName(tags[1])
    } else {
      to_keep = []
      for (var i = 0; i < contexts.length; i++) {
        console.log("tagname: " + contexts[i].tagName + "      expecting: " + tags[1].toUpperCase())
        if (contexts[i].tagName == tags[1].toUpperCase()) {
          to_keep.push(contexts[i]);
        }
      };
      contexts = to_keep
    }
  }
  console.log(contexts)


  classes = class_regex.exec(selector)
  if (classes) {
    // chop out classes
    selector = selector.replace(classes[0], '')
    console.log("Classes: " + classes[1])
    if (contexts[0] == document) {
      return contexts[0].getElementsByClassName(classes[1])
    } else {
      to_keep = []
      for (var i = 0; i < contexts.length; i++) {
        // Regexp to check class name exists and is not a substring of a differennt class
        var re = new RegExp("\\b" + classes[1] + "\\b", "g");
        if (contexts[i].className.search(re) !== -1) {
          console.log("classes: " + contexts[i].className + "      expecting: " + classes[1])
          to_keep.push(contexts[i])
        }
      };
      contexts = to_keep
    }
  }
  console.log(contexts)

  return contexts


} 
