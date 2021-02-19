/**
 * Prints a message in the browser
 * console in cyan.
 */
function printColoured(msg) {
  console.log(
    "\x1b[36m%s\x1b[0m",
    typeof msg === "object" ? JSON.stringify(msg, null, 2) : msg
  )
}



/**
 * Returns a _coloured_ string representation of a JS object.
 * JSON.stringify repalcer fn instead?
 */
function printObjWithColor(obj, colors) {
  obj = JSON.stringify(obj, null, 2)

  var rxes = {
    name: /[a-zA-Z_]/g,
    sep:  /\:/g,
    bool: /true|false/g,
    num:  /\d+/g,
    str:  /".*[^"]/g,
    regexp: /\//g
  }

  var def_colors = {
    name: "#f1f1f1",
    sep:  "cyan",
    bool: "blue",
    num:  "red",
    str:  "green",
    regexp: "purple"
  }

  Object.keys(rxes).forEach((key, i) => {
    obj = obj.replace(obj.rxes[key], function(full) {
      return `<span style="${colors ? colors[key] || def_colors[key] : def_colors[key]}">${full}</span>`
    })
  });

  return obj
}



/**
* Prints an initial message, then a
* different message on subsequent calls.
*/
function print(msg1, msg2) {
  console.log(msg1)
  return function(last) {
    console.log(msg2)
  }
}



/**
 * Prints to the browser console with formatted text.
 * Takes a snapshot of the object before logging counteracting the
 * consoles object live preview.
 */
function print(str) {
  console.log(JSON.stringify(str, null, 2));
}
