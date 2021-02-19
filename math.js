/**
 * Gets an integer between min (0 if absent) and max.
 */
function getRandomInt(max, min) {
  return min ?
    Math.round((Math.random() * Math.round(max-min)) + Math.round(min)) :
    Math.round(Math.random() * Math.round(max))
}



/**
 * Inclusive of min, excusive of max.
 * Supposedly a more uniform random selection.
 */
function randomInt(min, max) {
  return Math.floor(min + Math.random() * (max-min))
}



/**
 * Same as randomInt, but inclusive of both.
 * Add + at back to be clearer its last?
 */
function randomIntMaxInclusive(min, max) {
  return Math.floor(min + Math.random() * ((max+1)-min))
}



/**
* Randomly generates a binary value.
*/
function randomBinary() {
  return Math.round(Math.random())
}



/**
 * Claimed to be more uniform than round.
 */
function randomBinary() {
  return Math.floor(Math.random() * 2)
}



/**
 * Returns either true of false.
 */
function randomBoolean() {
  return Boolean(Math.round(Math.random()))
}



/**
 * Alt.
 */
function randomBoolean() {
  return !!Math.round(Math.random())
}



/**
 * Randomly selects between "heads" or "tails".
 */
function headOrTails() {
  return (
    Math.round(Math.random()) === 1
      ? "head"
      : "tails"
  )
}



/**
 * Without unnecessary === 1 check.
 */
function headOrTails() {
  return Math.round(Math.random()) ? "head" : "tails"
}



/**
 * Possibly more accurate version.
 */
function headOrTails() {
  return Math.random() >= 0.5
      ? "head"
      : "tails"
}



/**
 * Creates a range and returns a function that
 * gets a random num in the range, Dissallowing
 * the same number twice.
 */
function makeRange(max, min, gap) {
  if (max === min) return console.error("Range must be more than 1");
  var prev = null
  return function getRandomNonConsecutiveInt() {
    var int = getRandomInt(max, min)
    return (
      prev !== int ?
        prev = int :
        getRandomNonConsecutiveInt()
    )
  }
}



/**
 * Creates a range, and returns a function that
 * gets a random integer in the range that are
 * never the same twice in a row.
 */
function createNonRecRange(max, min) {
  var range = []
  for (var i = Math.round(min); i <= Math.round(max); i++) {
    range.push(i)
  }
  return function() {
    range = shuffle(range)
    int = range.pop()
    return int
  }
}



/**
 * Check if number is an odd number.
 */
function isOdd(n) {
  return n % 2 && n !== 0
}



/**
 * Check if a number is an even number.
 */
function isEven(n) {
  return n % 2 && n === 0
}



/**
 * Makes sure a number never reaches infinity, but
 * rather gets clamped to (-/+)MAX_VALUE.
 * (JS clamps up to a certain point?)
 */
function clampMaxValue(n) {
  if (Math.abs(n) > Number.MAX_VALUE)
    return Math.sign(n) === -1 ? -Number.MAX_VALUE : Number.MAX_VALUE
  return n
}



/**
 * Clamps a value between min and max.
 * Useful for, e.g., keeping the mouse pointer
 * inside the canvas.
 */
Math.clamp = function(num, min, max) {
  if (num < min) num = min
  if (num > max) num = max
  return num
}



/**
 * Global.
 */
function clamp(num, min, max) {
  if (num < min) return min
  if (num > max) return max
  return num
}



/**
 * Checks if a number is in the range of min to max.
 * Including min and max themselves.
 */
function inRange(n, min, max) {
  return n >= min && n <= max
}



/**
  Checks if a number is negative.
  True for negative, false for positive,
  0 for both positive +0 and -0.
 */
function isNegative(n) {
  return n === 0 ? n : Math.sign(n) === -1
}



/**
 * Dont need both - using one will give is both answers.
 * but better to choose for inlining.
 */
function isPositive(n) {
  return n === 0 ? n : Math.sign(n) !== -1
}



/**
 * Converts a number to binary (regardless of src num)
 * so dont need to care ab out src - works for all
 */
function toBinary(num) {
  return Number(num.toString(2))
}



/**
 * Converts a number to hexdecimal.
 * Will convert any num. Hex or Dec feks.
 * Use this to my advantage? since will work for all srces?
 */
function toHexadecimal(num) {
  return Number(num.toString(16))
}



/**
 * Represents a number in the inferior decimal
 * system.
 */
function toDecimal(num) {
  return Number(num.toString(10))
}



/**
 * One way to round a number.
 */
function round(num) {
  num = num.toString()
  var first_decimal = num[num.indexOf(".")+1]
  return first_decimal < 5 ? Math.floor(num) : Math.ceil(num)
}



/**
 * Converts a number in a range to a
 * value between the min and max range.
 */
Math.lerp = function(val, oMin, oMax, nMin, nMax) {
  return (((val - oMin) * (nMax - nMin)) / (oMax - oMin)) + nMin
}



/**
 * Returns a function that converts min and max to a value
 * between 0 - 100.
 */
Math.makeRange = function(oMin, oMax) {
  return function lerp(val) {
    return (((val - oMin) * (100 - 0)) / (oMax - oMin)) + 0
  }
}



/**
 * Fast inverse square root implementation in js.
 */
function inverseSquareRoot(x) {
  var buffer = new ArrayBuffer(4),
      float = new Float32Array(buffer),
      int = new Uint32Array(buffer)

  var x2 = 0.5 * (float[0] = x)
  int[0] = (0x5f3759df - (int[0] >> 1))
  var y = float[0]
  y = y * ( 1.5 - ( x2 * y * y ) )
  return y
}
