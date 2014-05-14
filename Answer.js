var $ = function (selector) {
  ////////////////////
  // Your code here //
  ////////////////////
  var contexts = [document];
  var elements = [];
  console.log('\n\n')

  if ( !selector || typeof selector !== "string" ) {
    return elements;
  }
  console.log("selector: " + selector);

  var splitRegEx = /([.|:|#|\/[|\/]|])+/
  var selectionArray = selector.split(splitRegEx)
  console.log("selection array: " + selectionArray)

  var i = -1; 
  while (i < selectionArray.length -1) {

    currentSelector = selectionArray[++i];

    if (currentSelector === "") {
      continue;
    } 

    for (var context_index = 0; context_index < contexts.length; context_index++) {
      context = contexts[context_index]

      console.log("CONTEXT: " + context)
      console.log("CONTEXT name: " + context.nodeName )
      if (context.nodeName == "INPUT") {
        console.log('BASTARD INPUT   ')
        break;
      }

      if (currentSelector === ".") {
        currentSelector = selectionArray[++i];
        console.log('class: .'+ currentSelector)
        console.log(context)
        selections = context.getElementsByClassName(currentSelector)
        console.log("SELECTIONS " + selections);
        elements.push.apply(elements, selections);

      } else if (currentSelector === "#") {
        currentSelector = selectionArray[++i];
        console.log('id: #'+ currentSelector)
        console.log(context)

        elements.push(context.getElementById(currentSelector));
      } else {
        console.log('tag: '+ currentSelector)
        selections = context.getElementsByTagName(currentSelector)
        // context = selections[selections.length-1];
        contexts = selections;
        elements.push.apply(elements, selections);
      }
    }
    console.log(elements)
  }



  // //regex to get different words (wahay there are none)
  // // regex to separate out the tags, classes and ids  
  //   // "ID": new RegExp( "^#(" + identifier + ")" )
  // // Easily-parseable/retrievable ID or TAG or CLASS selectors
  // regex = /^(?:#([\w-]+)|\.([\w-]+))|(\w+)$/

  // match = regex.exec(selector)
  // console.log(match);

  // if (id_name = match[1]){
  //   console.log("Id: " + id_name)
  //   elements.push(context.getElementById(id_name))

  // }
  // else if (class_name = match[2]){
  //   console.log("Class: " + class_name)
  //   elements.push.apply(elements, context.getElementsByClassName(class_name))

  // } else if (tag_name = match[3]) {
  //   console.log("Tag: " + tag_name)
  //   elements.push.apply(elements, context.getElementsByTagName(tag_name))
  // } 

  console.log(elements)

  // scrap
  // elements = document.getElementsById('')
  // (selector)

  return elements;
}
  
  // https://github.com/jquery/sizzle/blob/master/src/sizzle.js