/**
 * Chekcs if a value is a primitive value.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}


/**
* Get the raw type string of a value, e.g., [object Object].
*/
function toRawType (value) {
  return  Object.prototype.toString.call(value).slice(8, -1)
}



/**
* Strict object type check. Only returns true
* for plain JavaScript objects.
* https://cdn.jsdelivr.net/npm/vue/dist/vue.js
*/
function isPlainObject (obj) {
  return  Object.prototype.toString.call(obj) === '[object Object]'
}



/**
 * Check if is a "valid" number.
 * Unlike typeof, filters nan and infinity.
 */
function isNum(v) {
  return typeof v === "number" && !isNaN(v) && v !== Infinity  && v !== -Infinity
}



/**
 * Different api dependant version.
 */
function isNum(v) {
  return typeof v === "number" && !isNaN(v) && isFinite()
}



/**
 * True if number is Finite.
 */
function isFinite(v) {
  return v !== Infinity && v !== -Infinity
}



/**
 * Reverse.
 */
function isInfinite(v) {
  return v === Infinity || v === -Infinity
}


/**
 * API reversed wrapper-
 */
function isInfinite(v) {
  return !isFinite()
}



/**
 * True if number is in the range that
 * can be represented/saved by js.
 */
function isSafeNum(v) {
  return v >= Number.MIN_VALUE && v <= Number.MAX_VALUE
}



/**
 * For better inlining.
 */
function isString(v) {
  return typeof v === "string"
}



/**
 * For Better inlining.
 */
function isBool(v) {
  return typeof v === "boolean"
}



/**
 * For Better inlining.
 */
function isSymbol(v) {
  return typeof v === "symbol"
}



/**
 * For Better inlining.
 */
function isFunction(v) {
  return typeof v === "function"
}



/**
 * Returns true if value is instance of RegExp,
 * else false (including for Object).
 */
function isRegExp (v) {
  return Object.prototype.toString.call(v) === '[object RegExp]'
}



/**
 * Ducktype check for promise.
 */
function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}



/**
 * Checks if the value is a Promise object.
 */
function isPromise(v) {
  return v instanceof Promise
}



/**
 * Global isArray.
 */
function isArray(v) {
  return Array.isArray(v)
}



/**
* Array, object, custom.
*/
function isObject(v) {
  return typeof v === "object"
}



/**
* Quick object check - this is primarily used to tell
* Objects from primitive values when we know the value
* is a JSON-compliant type.
* https://cdn.jsdelivr.net/npm/vue/dist/vue.js
*/
function isActualObject (obj) {
  return obj !== null && typeof obj === 'object'
}



/**
* Strict object type check. Only returns true
* for plain JavaScript objects.
* https://cdn.jsdelivr.net/npm/vue/dist/vue.js
*/
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}



/**
 * True for object literals and objects
 * created with fn objects.
 */
function isPureObject() {
  return (
    typeof v === "object" &&
    !v instanceof RegExp  &&
    !Array.isArray(v)     &&
    v !== null
  )
}



/**
 * Sees RegExps as an object and uses more (compatible?)
 * array check.
 */
function isPureObject() {
  return (
    typeof v === "object" &&
    !Object.prototype.toString.call(v).slice(8, -1) &&
    v !== null
  )
}



/**
 * https://cdn.jsdelivr.net/npm/vue/dist/vue.js
 */
function isUndef (v) {
  return v === undefined || v === null
}



/**
 * https://cdn.jsdelivr.net/npm/vue/dist/vue.js
 */
function isDef (v) {
  return v !== undefined && v !== null
}



/**
 * https://cdn.jsdelivr.net/npm/vue/dist/vue.js
 */
function isTrue (v) {
  return v === true
}



/**
 * https://cdn.jsdelivr.net/npm/vue/dist/vue.js
 */
function isFalse (v) {
  return v === false
}



/**
 * True if data object.
 */
function isDate(v) {
  return v instanceof Date
}



/**
 * Checks if an object has a property, removes
 * the ambiguity of whether undefined is
 * referencing the value or the result of the
 * property lookup process.
  */
function exists(obj, prop) {
  return prop in obj
}



/**
 * Returns true ONLY if an existing property,
 * has the explicit value if undefined.
 */
function isUndefValue(obj, prop) {
  return exists(obj, prop) && obj[prop] === undefined
}



/**
 * Returns the value of the given object property. If
 * the property don't exist throws a reference error.
 * Overwrites the defualt JS behaviour which would be
 * to return undefined if property don't exists.
 * Alternative to this fn would be to run two tests
 * separately.
 */
function getValue(obj, prop) {
  if (exists(obj, prop)) return obj[prop]
  else throw new ReferenceError("Property don't exists on " + obj)
}



/**
 * Ensures a values is of a certain data type.
 */
function assert(val, types, checkForCustomType) {
  for (var type of types) {
    var isType = Object.prototype.toString.call(val).slice(8, -1).toLowerCase()
    if (isType === "object" && checkForCustomType && val.constructor && val.constructor.name === type)
      return
    else if (isType === type)
      return
  }
  throw new TypeError("Incorrect value " + toString(val) + ", needs to be " + toHumanizedString(types))
}
