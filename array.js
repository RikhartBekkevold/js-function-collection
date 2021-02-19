/**
 * Gets the last item in an array.
 */
Array && Array.prototype && Array.prototype.last || Object.defineProperty(Array.prototype, "last", {
  get: function () {
    return this[this.length-1]
  }
})



/**
 * Gets the first item in the array.
 */
Array.prototype.first || Object.defineProperty(Array.prototype, "first", {
  get: function () {
    return this[0]
  }
})



/**
 * Gets a random item from the array. If filter i provided
 * gets a random item that passes the test.
 * Dependant on getRandomInt.
 */
Array.prototype.getRandomElement = function(filter) {
  return filter
    ? this.filter(filter)[getRandomInt(this.filter(filter).length)]
    : this[getRandomInt(this.length)]
}



/**
 * Returns true if index exists in the array.
 */
Array.prototype.hasIndex = function(i) {
  return i in this
};



/**
 * Gets an arrays last index.
 */
Array.prototype.lastIndex || Object.defineProperty(Array.prototype, "lastIndex", {
  get: function() {
    return this.length-1
  }
})



/**
* Check if the value is a valid array index.
* From. https://cdn.jsdelivr.net/npm/vue/dist/vue.js
*/
function isValidArrayIndex (val) {
  var n = parseFloat(String(val)) // why no new?
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}



/**
 * Remove an item (prim match, or object ref) from an array.
 */
function remove(arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}



/**
 * Extends the keys() function by offering the option
 * to include keys for nested props and prototype chain props.
 * Only gets enumerable properties like keys().
 */
Object.getNestedKeys = function(obj, includeNotOwn, shallow) {
  var all_keys = []
  walk(obj)
  return all_keys

  function walk(obj) {
    for (var key in obj) {
      if (includeNotOwn || obj.hasOwnProperty(key)) {
        all_keys.push(key)
        if (!shallow && typeof obj[key] === "object")
          walk(obj[key])
      }
    }
  }
}



/**
 * Returns the number of properties in object excluding proto chaain and nested
   properties. Approximation of array.length.
 */
(Object.prototype == undefined && Object.prototype.length == undefined) || (
  Object.defineProperty(Object.prototype, "length", {
    get: function() { return Object.keys(this).length }
  })
)



/**
 * From: https://cdn.jsdelivr.net/npm/vue/dist/vue.js
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}



/**
 * Lowercases all strings occurences
 * in the calling array. If upperCase
 * set, uppecases instead.
 */
Array.prototype.toLowerCaseAll = function(upperCase) {
  this.forEach((item, i) => {
    if (typeof item === "string")
      this[i] = upperCase ?
        item.toUpperCase() :
        item.toLowerCase()
  })
}



/**
 * Shuffles the calling array.
 */
Array.prototype.shuffle = function() {
  var m = this.length, t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = this[m];
    this[m] = this[i];
    this[i] = t;
  }
  return this;
}



/**
 * Sorts, in place, strings the way "".sort() does.
 * Allows for descending sort and ignoring "the" and
 * capitalization when sorting.
 */
Array.prototype.sortString = function(descending, ignoreThe, ignoreCaps) {
  return this.sort(function(a, b) {
    if (ignoreCaps) (b = b.toLowerCase(), a = a.toLowerCase())
    if (ignoreThe) (b = b.replace(/^\s*(the)\s+/i, ""), a = a.replace(/^\s*(the)\s+/i, ""))
    return descending
      ? b.localeCompare(a)
      : a.localeCompare(b)
  })
}



/**
 * Sorts an array of numbers ascendingly (highest number value
 * last (not length)) by default, or descendingly.
 * Converts the array values to numbers (- does auto! both
 * Number and a- gives NaN feks consistently like Number would? + does?)
 * has to be minus and not plus since only minus will get 0, 1 or -1.
 */
Array.prototype.sortNum = function(descending) {
  return this.sort((a, b) => descending ? b - a : a - b)
}



/**
 * Sorts array values (asc/desc), based on their length after being converted to strings.
 * JSON.stringify is used for all values except functions and undefined which JSON.stringify does not serialize
 * so we add this by using String convert for those two values.
 * doenst add to strinfy, just creates length of its own
 */
Array.prototype.sortByLength = function(descending) {
  function not_JSON_Serialized(val) {
    return typeof val === "function" || typeof val === "undefined"
  }

  return this.sort(function(a, b) {
    a = not_JSON_Serialized(a) ? String(a) : JSON.stringify(a)
    b = not_JSON_Serialized(b) ? String(b) : JSON.stringify(b)
    return descending ? b.length - a.length : a.length - b.length
  })
}



/**
 * Sorts an array of string by length.
 */
Array.prototype.sortByLength = function(descending) {
  return this.sort(function(a, b) {
    return descending ?
    b.length - a.length : a.length - b.length
  })
}



/**
 * Also sorts by length for other values.
 */
Array.prototype.sortByLength = function(descending) {
  return this.sort(function(a, b) {
    return descending ?
      JSON.stringify(b).length - JSON.stringify(a).length : JSON.stringify(a).length - JSON.stringify(b).length
  })
}



/**
 * Extends array.prototype.sort() by adding options
 * for descending results, ignoring capitilization and the word "the".
 */
Array.prototype.sortString = function(descending, ignoreThe, ignoreCaps) {
  return this.sort(function(a, b) {
    if (ignoreCaps) (b = b.toLowerCase(), a = a.toLowerCase())
    if (ignoreThe) (b = b.replace(/^\s*(the)\s+/i, ""), a = a.replace(/^\s*(the)\s+/i, ""))

    return descending
      ? b.localeCompare(a)
      : a.localeCompare(b)
  })
}



/**
 * [apple, banana, berry].toString() =>  "apple,banana,berry"
 * toHumanizedString(array) =>  "apple, banana and berry"
 */
function toHumanizedString(array, sep, lastsep) {
  var str = ""
  var last = array.length-1
  array.forEach((type, idx) => {
    str +=
    (idx === 0
      ? ""
      : (idx === last
          ? (lastsep || " or ")
          : (sep || ", ")
        )
    )
    + type
  });
  return str
}



/**
 * Pads all strings in an array
 * in place to have equal length.
 */
function padStringArray(keys, longest, prefixSpacing) {
  keys.forEach(function(key, idx) {
    missing = longest - key.length
    keys[idx] += prefixSpacing || ""
    if (missing > 0)
      for (var i = 0; i < missing; i++)
        keys[idx] += " "
  })
}
