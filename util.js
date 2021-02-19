/**
 * Generates a random string of a given length out of
 * uppercase and lowercase english letters.
 * last code point needs to be 1 higher becasue of math.random never being 1. (also would create less
 * chance to get it anyway, thats why never 1?)
 */
function randomEnglishString(length, lowerCaseOnly) {
  var str = ""
  var length = length || 1
  for (var i = 0; i < length; i++) {
    Math.round(Math.random()) && !lowerCaseOnly
    ? str += String.fromCharCode(65 + Math.random() * (91-65))
    : str += String.fromCharCode(97 + Math.random() * (123-97))
  }
  return str
}



/**
 * Shuffles an iterable following the Fisher-Yates
 * algorithm (https://bost.ocks.org/mike/shuffle/).
 * Modified by me to support string iterables.
 */
function shuffle(iterable, delimiter) {
  var isStr = typeof iterable === "string"
  delimiter && isStr ?
    iterable = iterable.split(delimiter) :
    iterable = Array.from(iterable)
  var m = iterable.length, t, i
  while (m) {
    i = Math.floor(Math.random() * m--)
    t = iterable[m]
    iterable[m] = iterable[i]
    iterable[i] = t
  }
  return isStr ? iterable.join(delimiter || "") : iterable
}



/**
 * Make a map and return a function for checking if a key
 * is in that map. See use here: https://cdn.jsdelivr.net/npm/vue/dist/vue.js
 */
function makeMap(str, expectsLowerCase) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}



/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null)

  return (function cachedFn (str) {
    var hit = cache[str]
    return hit || (cache[str] = fn(str))
  })
}



/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false
  return function () {
    if (!called) {
      called = true;
      fn.apply(fn, arguments)
    }
  }
}



/**
 *  Calculates whether black or white would
 *  offer the most contrast to the color passed.
 */
function getContrastingColor(color, rgb) {
    var colorsString = JSON.stringify(color).replace('#','');
    var r = parseInt(colorsString.substr(1,2),16);
    var g = parseInt(colorsString.substr(3,2),16);
    var b = parseInt(colorsString.substr(5,2),16);
    var yiq = ((r*299)+(g*587)+(b*114))/1000;
    return rgb ((yiq >= 128) ? '255 255 255' : '0 0 0'); ? : ((yiq >= 128) ? 'black' : 'white');
}



/**
 * Strips a string of JS comments.
 */
function stripJSComments(str) {
  var multi_line_comment = /\/\*(.*?)\*\//gms;
  var single_line_comment = /\/\/.*/g
  str = str.replace(multi_line_comment, "")
  str = str.replace(single_line_comment, "")
  return str
}



/**
 * Removes JS style comments from the json string
 * allowing for json file with comments.
 */
function parseJSON(str) {
  return JSON.parse(stripJSComments(str))
}



/**
 * Show how much time has elapsed since last call.
 */
function startTimer() {
  var last = new Date().getTime()
  return function timeElapsed() {
    now = new Date().getTime()
    var elapsed = now - last
    console.log(elapsed / 1000)
    last = now
    return last
  }
}



/**
 * Starts a timer and then return a fn that can be used to report the time
 * progressed with a custom msg.
 */
function startTimer(msg, view) {
  var view = view
  var started = new Date().getTime()
  if (msg) view ? view.innerHTML = msg : console.log(msg)

  return function(msg) {
    var timepassed =  (new Date().getTime() - started) / 1000
    view ?
    view.innerHTML = (
      msg ?
        msg + " (" + new String(timepassed.toFixed(2)) + "s)" :
        new String(timepassed.toFixed(2)) + "s"
    )
    :
    console.log(
      msg ?
        msg + " (" + new String(timepassed.toFixed(2)) + "s)" :
        new String(timepassed.toFixed(2)) + "s"
    )
  }
}



/**
 * Determines if a variable is a child variable.
 * E.g. person["name"] or person.name.
 */
function isNested(v) {
  return (
    v.indexOf(".") != -1
      ? true : (v.indexOf("[") != -1 && v.indexOf("]") != -1)
      ? true : false
  )
}
