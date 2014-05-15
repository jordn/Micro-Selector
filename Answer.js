var $ = function (selector) {

  var elements = [];
  var context = document;
  var context_list = [context];
  // split selector by spaces.
  // parse the strings for ids, tags, classes (that order)
  // if ids. search doc for id, set that as context
  // if tags. search context for tags, set these as new classes
  // if classes search each context for class. set these as new context
  // return context

  // split by spaces for inheritance unnecessary
  // parse the strings for ids, tags, classes (that order)
  console.log("\n\n--> " + selector)
  id_regex = /(?:#([\w-]+))/;
  tag_regex = /^(\w+)/;
  class_regex = /(?:\.([\w-]+))/;


  ids = id_regex.exec(selector)
  if (ids) {
    // chop out ids
    selector = selector.replace(ids[0], '')
    console.log("Id: " + ids[1])
    context_list = [document.getElementById(ids[1])]
  }
  console.log(context_list)

  tags = tag_regex.exec(selector)
  if (tags) {
    // chop out tags
    selector = selector.replace(tags[0], '')
    console.log("Tags: " + tags[1])
    context_list = context.getElementsByTagName(tags[1])
  }
  console.log(context_list)


  classes = class_regex.exec(selector)
  if (classes) {
    // chop out classes
    selector = selector.replace(classes[0], '')
    console.log("Classes: " + classes[1])

    if (context_list[0] == document) {
      return context_list[0].getElementsByClassName(classes[1])
    } else {
      to_keep = []
      console.log(context_list)
      for (var i = 0; i < context_list.length; i++) {

        var re = new RegExp("\\b" + classes[1]+ "\\b", "g");
        if (context_list[i].className.search(re) !== -1) {
          console.log('exists!!')
          to_keep.push(context_list[0])
        }
      };
      context_list = to_keep
    }

  }

  console.log(context_list)


  return context_list




}
  
