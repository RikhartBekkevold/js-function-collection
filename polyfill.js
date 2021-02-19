/**
 * True for any number, or values
 * converted to number that is finite.
 */
function isFinite(n) {
  n = Number(n)
  return n === n && n !== -Infinity && n !== Infinity
}



/**
 * Returns true only for _numbers_ that are finite.
 */
Number.isFinite = function(n) {
  return typeof n === "number" && n === n && n !== -Infinity && n !== Infinity
}



/**
 * Polyfill for global isNaN. True
 * if NaN or converted value is NaN.
 */
function isNaN(n) {
  n = Number(n)
  return n !== n
}



/**
 * True ONLY if specfically the value NaN.
  only NaN in js returns false when checking againt itself
   we need number in isFinite, but i dont think we need it here?
 */
Number.isNaN = function(n) {
  return typeof n !== "number" && n !== n
}
