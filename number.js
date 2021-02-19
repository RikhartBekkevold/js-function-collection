/**
* Convert an input value to a number for persistence.
* If the conversion fails, return original string.
*/
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}



/**
* Gets the number in "idx" position.
*/
function getDigit(num, idx) {
  return Number(num.toString().replace("-", "")[idx])
}



/**
 * Gets the last digit on n.
 */
function getLastDigit(n) {
  return Number(n.toString()[n.toString().length-1])
}



/**
 * Gets the first digit of n.
 */
function getFirstDigit(n) {
  return Number(n.toString().replace("-", "")[0])
}



/**
 * Checks if the last single digit of num is n.
 */
function lastDigitIs(num, n) {
  return num.toString()[num.toString().length-1] === n.toString()
}



/**
 * Checks if the first digit of num is the (single digit) n.
 */
function firstDigitIs(num, n) {
  return num.toString()[0] === n.toString()
}



/**
 * Checks if n digit(s) is the _last_ digit(s) of
 * num. Ignores sign by defualt.
 */
function isLastDigits(num, n, incSign) {
  num = num.toString()
  n = n.toString()
  if (!incSign) // ignoreSign
    n = n.replace("-", ""), num = num.replace("-", "")
  return num.slice((num.length-1) - (n.length-1)) === n
}



/**
 * Checks if n digit(s) is the _first_ digit(s) of
 * num. Ignores sign by defualt.
 */
function isFirstDigits(num, n, incSign) {
  num = num.toString().replace(incSign ? "" : "-", "")
  n = n.toString().replace(incSign ? "" : "-", "")
  return num.slice(0, n.length) === n
}



/**
 * Checks if a number contains a specific digit(s).
 * Has, contains, includes.
 * If string also has fn with the same name, it
 * causes problems when we merge files.
 */
function contains(num, digits) {
  return num.toString().includes(digits)
}



/**
  * Adds include for number. For obj use hasownproperty,
  * array and string their respective includes.
  */
Number.prototype.includes = function(item) {
  return String.prototype.includes.call(this, item)
}



/**
 * Getter returning the number of
 * digits (so excludes sign and dot) in number.
 */
Object.defineProperty(Number.prototype, "length", {
  get: function() {
    return this.toString()
      .replace(".", "")
      .replace("-", "")
      .length
  }
})



/**
 * Number of digits the number consists of.
 * Ignores - (+ auto removed) and decimal point).
 * 0s are removed if useless (before in whole,
 * and after in decimal).
 */
function numOfDigits(n) {
  return n.toString().
    replace(".", "").
    replace("-", "").length
}



/**
 * Number of decimals the number
 * has (save trailing zeroes).
 */
function numOfDecimals(n) {
  var str = n.toString()
  var idx = str.indexOf(".")
  return (
    idx !== -1 ?
      str.slice(idx+1).length : 0 // NaN?
  )
}



/**
 * Number of whole digits.
 */
function numOfWholeNums(n) {
  var str = n.toString()
  var idx = str.indexOf(".")
  return (
    idx !== -1 ?
      str.slice(0, idx).length :
      str.length
  )
}



/**
 * Parses a number into its parts.
 * Typical use-case: var { \decimal, isNegative } = parseNumber(20.2)
 * -0 is treated as 0.
 */
function parseNumber(n) {
  var isFloat = !Number.isInteger(n)
  var str = n.toString()
  var whole = str.split(".")[0]
  var decimal = str.split(".")[1]
  var isNeg = Math.sign(n) === -1

  return {
    whole: Number(whole),
    decimal: isFloat ? Number(decimal) : null,
    wholeLength: whole.length,
    decimalLength: isFloat ? decimal.length : null,
    digitLength: isFloat ? str.length-1 : str.length,
    fullLength: str.length,
    isNegative: isNeg
  }
}



/**
 * Gets a numbers direction/sign.
 */
function getSign(num) {
  num = Number(num)
  if (Number.isNaN(num)) return num
  if (num === 0) return num
  if (num < 0 && !-Infinity) return -1
  if (num > 0 && !Infinity) return 1
  return num
}



/**
 * One way to determine if a number is an integer.
 */
function isInteger(n) {
  return Math.floor(n) === n
}
