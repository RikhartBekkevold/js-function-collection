/**
 * Converts rgb to hsl.
 */
function rgbToHsl(r, g, b) {
  var min, max, i, l, s, maxcolor, h, rgb = [];
  rgb[0] = r / 255;
  rgb[1] = g / 255;
  rgb[2] = b / 255;
  min = rgb[0];
  max = rgb[0];
  maxcolor = 0;
  for (i = 0; i < rgb.length - 1; i++) {
    if (rgb[i + 1] <= min) {min = rgb[i + 1];}
    if (rgb[i + 1] >= max) {max = rgb[i + 1];maxcolor = i + 1;}
  }
  if (maxcolor == 0) {
    h = (rgb[1] - rgb[2]) / (max - min);
  }
  if (maxcolor == 1) {
    h = 2 + (rgb[2] - rgb[0]) / (max - min);
  }
  if (maxcolor == 2) {
    h = 4 + (rgb[0] - rgb[1]) / (max - min);
  }
  if (isNaN(h)) {h = 0;}
  h = h * 60;
  if (h < 0) {h = h + 360; }
  l = (min + max) / 2;
  if (min == max) {
    s = 0;
  } else {
    if (l < 0.5) {
      s = (max - min) / (max + min);
    } else {
      s = (max - min) / (2 - max - min);
    }
  }
  s = s;
  return {h : h, s : s, l : l};
}



/**
 * Converts hsl to rgb.
 */
function hslToRgb(hue, sat, light) {
  var t1, t2, r, g, b;
  hue = hue / 60;
  if ( light <= 0.5 ) {
    t2 = light * (sat + 1);
  } else {
    t2 = light + sat - (light * sat);
  }
  t1 = light * 2 - t2;
  r = hueToRgb(t1, t2, hue + 2) * 255;
  g = hueToRgb(t1, t2, hue) * 255;
  b = hueToRgb(t1, t2, hue - 2) * 255;
  return {r : r, g : g, b : b};
}



/**
 * Converts rgb to hue.
 */
function hueToRgb(t1, t2, hue) {
  if (hue < 0) hue += 6;
  if (hue >= 6) hue -= 6;
  if (hue < 1) return (t2 - t1) * hue + t1;
  else if(hue < 3) return t2;
  else if(hue < 4) return (t2 - t1) * (4 - hue) + t1;
  else return t1;
}



/**
 * Checks if an rgb string ("2 12 23")
 * is valid RGB color (excl. alpha).
 */
function isValidRGBcolor(rgb) {
  var rgbarr = rgb.trim().split(" ")
  if (rgbarr.length !== 3) return false
  for (var i = 0; i < rgbarr.length; i++) {
    if (rgbarr[i] < 0 || rgbarr[i] > 255) return false
  }
  return true
}



/**
 * Converts RGB to hex.
 */
function RGBtoHEXcolor(r, g, b) {
  var len = arguments.length

  if (len === 1 && typeof r === "string") {
    if (!isValidRGBcolor(r)) return console.error("Invalid rgb values"), false
    var arr = r.split(" ")
    if (arr.length !== 3) return false
    var r = parseInt(arr[0]).toString(16)
    var g = parseInt(arr[1]).toString(16)
    var b = parseInt(arr[2]).toString(16)
    return "#" +
    (r.length === 1 ? "0" + r : r) +
    (g.length === 1 ? "0" + g : g) +
    (b.length === 1 ? "0" + b : b)
  }
  else if (len === 3 && typeof r === "number")
    return "#" +
      (r.toString(16).length === 1 ? "0" + r.toString(16) : r.toString(16)) +
      (g.toString(16).length === 1 ? "0" + g.toString(16) : g.toString(16)) +
      (b.toString(16).length === 1 ? "0" + b.toString(16) : b.toString(16))
  else
    return console.error(
      "Arguments need to be a string, or numbers in the format r, g, b"
    )
}



/**
 * Sets the lightness of an rgb color.
 * Clamped to black (0) or white (1)
 * if values outside 0 - 1.
 */
function setLightness(r, g, b, l) {
  var hsl = rgbToHsl(r, g, b)
  hsl.l = clamp(l, 0, 1)
  var {r, g, b} = hslToRgb(hsl.h, hsl.s, hsl.l)
  return {r: Math.round(r), g: Math.round(g), b: Math.round(b)}
}



/**
 * Lighten an rgb color by a
 * certain (0 - 1) amount.
 */
function lighten(color, l) {
  var hsl = rgbToHsl(r, g, b)
  hsl.l = clamp(hsl.l - l, 0, 1)
  var {r, g, b} = hslToRgb(hsl.h, hsl.s, hsl.l)
  return {r: Math.round(r), g: Math.round(g), b: Math.round(b)}
}



/**
 * Alt.
 */
function lighten(color, l) {
  var hsl = rgbToHsl(r, g, b)
  if        (hsl.l < 0.5)    return hslToRgb(hsl.h, hsl.s, hsl.l += l)
  else if   (hsl.l > 0.5)    return hslToRgb(hsl.h, hsl.s, hsl.l += l)
  else if   (hsl.l === 0.5)  return hslToRgb(hsl.h, hsl.s, hsl.l += l)
}



/**
 * Converts a hex string to its RGB equivalent.
 */
function hexToRGB(hex, sepr) {
  if (!isHex(hex)) return false
  hex = hex.trim()
  val = val.replace("#", "").replace("0x", "")

  if (hasAlpha(hex)) {
    var a = convertDecimalToPercent(parseInt(hex.slice(1,3), 16))
    var r = parseInt(hex.slice(3,5), 16)
    var g = parseInt(hex.slice(5,7), 16)
    var b = parseInt(hex.slice(7,9), 16)
    return sepr ? {r, g, b, a} : r+", "+g+", "+b+", "+a
  }
  var r = parseInt(hex.slice(1,3), 16)
  var g = parseInt(hex.slice(3,5), 16)
  var b = parseInt(hex.slice(5,7), 16)
  return sepr ? {r, g, b} : r+", "+g+", "+b
}



/**
 * True of value is a hex number.
 */
function isHex(val) {
  if (typeof val !== "string") val = val.toString(16)
  return (val.trim()[0] === "#" || (val.trim()[0] + val.trim()[1]) === "0x" || typeof val === "number") ?
  (val = val.replace("#", "").replace("0x", ""), (val.trim().length === 6 || val.trim().length === 8)) : false
}
