/**
 * Parses json while also converting
 * date strings back to date objects.
 */
function jsonParse(str) {
  return JSON.parse(str, function (key, value) {
    if (typeof value === "string") {
      if (/^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2}(?:\.\d*)?)Z$/.test(value)) {
        return new Date(value)
      }
    }
    return value
  })
}



/**
* Convert a value to a string that is actually rendered.
* toString implementation more usefuly for certain
* current toString implementations?
*/
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}



/**
 * Version that stringifes null and undefined.
 */
function toString (val) {
  return Array.isArray(val) || (isPlainObject(val) && val.toString === Object.prototype.toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}



/**
 * Converts "true" to true.
 */
function parseTrue(str) {
  return str === "true" // false if not?
}



/**
 * Converts "false" to false. Determines? purpsoe is?
 * isFalse makes sense too
 */
function parseFalse(str) {
  return str === "false"
}



/**
 * True if string represent a bool.
 * Aka, isBoolean.
 */
function parseBoolean(str) {
  return str === "true" || str === "false"
}



/**
 * Unlike Boolean(), which converts to true of false
 * based on empty string or not, this converts to
 * true of false based on the string value being
 * "true" of "false"
 */
function toBoolean(str) {
  if (str === "false") return false
  if (str === "true")  return true
}



/**
 * Opinionated forced trim version of above fn.
 * Undefined if neither.
 */
function toBooleanTrim(str) {
  str = str.trim()
  if (str === "false") return false
  if (str === "true")  return true
}



/**
 * CHeck if string represents
 * the boolean true value.
 */
function toBoolean(str) {
  return str === "true"
}



/**
 * Checks if a number is a single digit.
 */
function isNumber(digit) {
  return /[0-9]/.test(digit)
}



/**
 * True if is a single char and the char is
 * a norwegian letter.
 */
function isNorwegianLetter(letter) {
  return /^[a-zA-ZøæåÆØÅ]$/.test(letter)
}



/**
 * True if is a word and contains only norwegian letters.
 */
function isLegalNorwegianWord(word) {
  return /^[a-zA-ZøæåÆØÅ]+$/.test(word.trim())
}



/**
 * Check if a char is an english letter.
 * /[a-zA-Z]/i works too
 */
function isEngLetter(v) {
	return /[a-zA-Z]/.test(v)
}



/**
 * A map for number.
 */
var isNumber = makeMap("0,1,2,3,4,5,6,7,8,9")
