/**
 * Sorts each char/idx of a string, asc or desc.
 */
String.prototype.sort = function(descending) {
  return descending ?
    Array.prototype.sort.call(Array.from(this)).reverse().join("") :
    Array.prototype.sort.call(Array.from(this)).join("")
}



/**
 * Passes ignoreCaps to call fn.
 */
String.prototype.sortString = function(descending, ignoreCaps lowercaseComapre treatAllAsLowercase) {
  return Array.prototype.sortString.call(Array.from(this), descending, null, ignoreCaps lowercaseComapre ).join("")
}



/**
 * Non-enum version. Doens't pass ignoreCaps to call fn.
 */
Object.defineProperty(String.prototype, "sortString", {
  enumerable: false,
  value: function(descending, ignoreCaps) {
    return (
      Array.prototype.sortString
      .call(Array.from(ignoreCaps ? this.toLowerCase() : this, descending, null, null)
      .join("")
    )
  }
})



/**
 * Capitalizes a string.
 */
function capitalize(str) {
  if (str && typeof str === "string") // str not nec. since not obj?
    return str.charAt(0).toUpperCase() + str.substring(1)
  return str // to get a str back for fn calls
}



/**
 * Capitalizes a string. Converts
 * to string before conversion.
 */
function capitalize(str) {
  str = String(str)  //custom more useufl toString conversion?. makes sure next stage always can call the fns
  return str.charAt(0).toUpperCase() + str.substring(1)
}



/**
 * Attempts to fix the capitalization of a
 * dot delimited string.
 * Capitalizes every letter after "?.!"
 */
function capitalizeAll(str) {
  str = capitalize(str) //  does it mess up the repalce loop? - removs spacing permantelyt? we dont want that
  return str.replace(/([\.\?\!])(\s*)([a-zA-Z])/g, function(full, punc, space, letter) {
    return punc + space + letter.toUpperCase()
  })
}



/**
 * Same as capitalizeAll but capitalize
 * even if the first letter(s) are space.
 */
function ignoreSpaceCapitalize(str) {
  return str.replace(/^(\s*)([A-Za-z])/, function(_, space, letter) {
    return space + letter.toUpperCase()
  })
}



/**
  * Alternative version with slice.
  * Test if better performance.
  */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});



/**
 * Does the opposite of capitalize.
 */
function decapitalize(str) {
  return str.charAt(0).toLowerCase() + str.slice(1)
}



/**
 * Camelize a underscore-delimited string.
 * https://cdn.jsdelivr.net/npm/vue/dist/vue.js
 */
var hypenizeRE = /_(\w)/g;
function hyphenize(str) {
  return str.replace(hypenizeRE, function (_, c) {
    return console.log(c), c ? (console.log("A"), c.toUpperCase()) : (console.log("B"), ''); })
}



/**
 * Forces a camelcased, or hypenized
 */
function toUnderscore(str) {
  return str.replace(/[A-Z]/g, function (match) { return "_" + match.toLowerCase() })
}



/**
 * Camelize a hyphen-delimited string. Extend: array?  dont force this, so genralized, so make call verison?
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});



/**
 * Inserts a substring at the index.
 */
function insertAt(str, insertStr, pos) {
  return str.slice(0, pos) + insertStr + str.slice(pos)
}



/**
 * Scuffed w3schools version.
 */
function insertAt(str, replaceVal, pos) {
  if(typeof(pos) === "undefined") pos = 0;
  if(typeof(replaceVal) === "undefined") replaceVal = '';
  return str.slice(0, pos) + replaceVal + str.slice(pos);
}



/**
 * Removes all style attributes in a html string.
 * Also those in comments.
 */
function removeStyleAttributes(html) {
  var stylerx = /\s*style=(('([^']*?)')|("([^"]*?)"))/g
  return html.replace(stylerx, "")
}



/**
 * Gets the last character in string.
 */
Object.defineProperty(String.prototype, "last", {
  get: function() { return this[this.length-1] }
})



/**
 * Gets the first character in string.
 */
Object.defineProperty(String.prototype, "first", {
  get: function() { return this[0] }
})



/**
 * Punctates a string, ignoring trailing space.
 */
function punctate(str, punc) {
  return (
    ".?!".indexOf(str[str.trimEnd().length-1].trimEnd()) !== -1
    ? str
    : str.slice(0, str.trimEnd().length)
      + "." +
      str.slice(str.trimEnd().length)
  )
}



/**
 * Punctate using regex. Ignores trailing space.
 */
function punctate(str, punctation) {
  return str.replace(/(\w)([\.\!\?]*)(\s*)$/, function(full, letter, punc, space) {
    return punc ? full : (letter + (punctation || ".") + space)
  })
}



/**
 * Removes duplicate spacing.
 */
function removeDuplicateSpacing(str) {
  var array = str.split(" ")
  for (var i = 0; i < array.length; i++) {
    if (array[i] === "") {
      array.removeFromArray(array[i])
      --i
    }
  }
  return array.join(" ")
}



/**
 * Formats "word  word  word"  to -> "word word word"
 */
String.prototype.removeDuplicateSpacing = function(str) {
  return str.split(" ").filter(word => word !== "").join(" ")
}



/**
 * Removes duplicate spacing.
 */
function forceSingleSpace(str) {
  return str.replace(/[ \t]{2,}/, () => " ")
}



/**
 * Removes duplicate spacing.
 */
function normalizeSpacing(str) {
  return str.replace(/[ \t]{2,}/, function(match) {
    return " "
  })
}



/**
 * Getter for last array item. Works callexpr on right side
 */
String.prototype.last || Object.defineProperty(String.prototype, "last", {
  get: function () {
    return this[this.length-1]
  }
})



/**
 * Gets the first item in the array.
 * If first exists with null/0/""/undefiend
 * will also replace?
 */
"first" in String.prototype || Object.defineProperty(String.prototype, "first", {
  get: function () {
    return this[0]
  }
})



/**
* Gets the next letter in the english alphabet.
*/
function next(letter) { // provide num for how much to skip?
  var alpha = "abcdefghijklmnopqrstuvwxyz"
  return alpha[alpha.indexOf(letter.toLowerCase())+1]
}



/**
 * Gets the prev letter in the english alphabet.
 */
function prev(letter) {
  var alpha = "abcdefghijklmnopqrstuvwxyz"
  return alpha[alpha.indexOf(letter.toLowerCase())-1]
}



/**
 * use spread here to not have to pass num?
 * use slice really..
 */
function getNextChars(num, str, start) {
  start = start ? start : 0
  var chars = "";
  for (var i = start; (i < (start + num)) && (i < str.length); i++) {
      chars += str[i]
  }
  return chars
}



/**
 * Checks whether ANY of the substr exists inside the str.
 */
function hasAnyOf(arr, str) {
  for (var i = 0; i < arr.length; i++) {
  	if (str.includes(arr[i]) && arr[i] !== "") {
  		return true
  	}
  }
}



/**
 * Gets the first word of a sentence.
 */
function getFirstWord(sentence) {
  var words = sentence.split(" ")
  return word[0].trim()
}



/**
 * Gets the last word of a str.
 */
function getLastWord(sentence) {
  var words = sentence.split(" ")
  return words[words.length-1].trim()
}



/**
 *  Reverses a string. Robust vers.
 */
function reverse(str) {
  return [...str].reverse().join("")
}



/**
 * More widely supported version.
 */
function reverse(str) {
  return str.split("").reverse().join("");
}



/**
 * Remove last char from str.
 * Can be used to trim on special char.
 */
function removeLastChar(str) {
return str.slice(0, str.length - 1)
}



/**
 * Remove first char of str.
 */
function removeFirstChar(str) {
  return str.slice(1, str.length)
}



/**
 * Finds all substr matches in a str and the index found at.
 aka matchAll - matchAll with g flag, works like this.
 uses match and slice to get next all matches
 */
function findAllMatches(str, substr) {
  // important to prevent browser freeze
  if (substr instanceof RegExp && substr.flags.includes("g"))
    return
  var src_length = str.length
  var rx = substr
  var mustaches = []
  var start_offset = 0;
  var match = str.match(rx)
  while (match !== null) {
    start_offset = (src_length-1) - (str.length-1)
    str = str.substring(match.index + match[0].length)
    match.index = match.index + start_offset
    mustaches.push(match)
    match = str.match(rx)
  }
  return mustaches
}



/**
 * Checks if string has at least one instance of substr.
 * An "includes" wrapper.
 */
function has(str) {
  return str.includes(str)
}



/**
 * Returns true if all substrings occur in the str.
 */
function hasAllOf(arr, str) {
	var list = arr
	for (var i = 0; i < list.length; i++) {
  	if (!str.includes(list[i]))
  		return false
	}
	return true
}



/**
 * Find all indexes of the occurence of a substring.
 */
function findAllIndicesOf(str, substr) {
  var indices = []
  var idx = str.indexOf(substr);

  while (idx != -1) {
    indices.push(idx);
    idx = str.indexOf(substr, idx + 1);
  }

  return indices
}



/**
 * Strips a string of multiline JS comments.
 * Just a wrapper for a specific RegExp, really. Like arr.sort().
 */
function stripMultilineComments(str) {
  var comment_rx = /\/\*(.*?)\*\//gms
  return str.replace(comment_rx, "")
}



/**
 * Strips a string of single line JS comments.
 */
function stripSinglelineComments(str) {
 var comment_rx = /\/\/(.*)/g
 return str.replace(comment_rx, "")
}



/**
 * Strips a string of both types of js comments.
 */
function stripJSComments(str) {
  str = stripMultilineComments(str)
  return stripSinglelineComments(str)
}



/**
 * Strips a string of html style comments.
 */
function stripMultilineComments(str) {
  var comment_rx = /<!--.*?-->/gs // dont need m flag it seems
  return str.replace(comment_rx, "")
}



/**
* Check if a string starts with "$" or "_".
* https://cdn.jsdelivr.net/npm/vue/dist/vue.js
*/
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}



/**
* Returns the number of times the substring was found.
*/
String.prototype.amountOf = function(substr, matchBoth) {
  var str = matchBoth ? this.toUpperCase() : this
  var substr = matchBoth ? substr.toUpperCase() : substr
  let count = 0
  let position = str.indexOf(substr)
  while (position !== -1) {
    count++
    position = str.indexOf(substr, position + 1)
  }
  return count
}



/**
 * True if substring occurences exceed n.
 */
function hasMoreThan(str, substr, n) {
  return str.amountOf(substr) > n
}



/**
 * True if substring occurences does not exceed n.
 */
function hasLessThan(str, substr, n) {
  return str.amountOf(substr) < n
}



/**
 * True if substring occurences equals n.
 */
function hasAmount(str, substr, n) {
  return str.amountOf(substr) === n
}



/**
 * toString() that allows you to decide the delimiter for arrays
 */
function arrayToString(arr, sep) {
  arr = Array(arr)
  return arr.toString().replace(/,/g, sep || ",")
}



/**
 * Removes all whitespaces in string.
 */
function stripWhitespace(str) {
  return str.replace(/[\r\n\s]/g)
}



/**
 * Removes all spaces in a string.
 */
function removeSpace(str) {
  return (
    str.split(" ")
    .filter(item => item !== "")
    .join("")
  )
}



/**
 * Inserts a str _before_ the first occurence of a pattern.
 * If no match, returns passed str.
 */
function insertBeforeFirst(str, pattern, insert) {
  var idx = str.indexOf(pattern)
  return idx !== -1 ?
         str.slice(0, idx) + insert + str.slice(idx) :
         str
}



/**
  * Inserts a str _after_ the first occurence of a pattern.
  * If no match, returns passed str.
 */
function insertAfterFirst(str, pattern, insert) {
  var idx = str.indexOf(pattern)
  return idx !== -1 ?
         str.slice(0, idx + pattern.length) + insert + str.slice(idx + pattern.length) :
         str
}


/**
 * Inserts a str _before_ the last occurence of a pattern.
 * If no match, returns passed str.
 */
function insertBeforeLast(str, pattern, insert) {
  var idx = str.lastIndexOf(pattern)
  return idx !== -1 ?
         str.slice(0, idx) + insert + str.slice(idx) :
         str
}



/**
 * Inserts a str _after_ the last occurence of a pattern.
 * If no match, returns passed str.
 */
function insertAfterLast(str, pattern, insert) {
  var idx = str.lastIndexOf(pattern)
  return idx !== -1 ?
         str.slice(0, idx + pattern.length) + insert + str.slice(idx + pattern.length) :
         str
}



/**
 * Inserts a substr _before_ all occurences of pattern.
 */
function insertBeforeAll(str, pattern, insert) {
  var indices = findAllIndicesOf(str, pattern)
  for (var i = indices.length-1; i >= 0; i--)
    str = str.slice(0, indices[i]) + insert + str.slice(indices[i])
  return str
}



/**
 * Inserts a substr _after_ all occurences of pattern.
 */
function insertAfterAll(str, pattern, insert) {
  var indices = findAllIndicesOf(str, pattern)
  for (var i = indices.length-1; i >= 0; i--)
    str = str.slice(0, indices[i] + pattern.length)
          + insert +
          str.slice(indices[i] + pattern.length)
  return str
}
