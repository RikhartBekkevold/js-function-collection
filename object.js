/**
 * This allows u to use toString without having to use call. assuming call in diff context works.
 * Allow calling of toString without explictly usiing "call()".
 */
function toString(val) {
  return Object.prototype.toString.call(val)
}


/**
 * True if two objects have the
 * same keys in the same order.
 */
function sameKeys(objA, objB, protoCheck, deepCheck) {
  var keysA = Object.getNestedKeys(objA, protoCheck, !deepCheck)
  var keysB = Object.getNestedKeys(objB, protoCheck, !deepCheck)

  if (keysA.length !== keysB.length)
    return false

  for (var i = 0; i < keysA.length; i++)
    if (keysA[i] !== keysB[i])
      return false

  return true
}



/**
 * Returns true if the value is of type.
 * Custom defined objects returns true only for Object, not e.g. Player.
 * For primitives the string or the function object argument
 * needs to refer to the constructor, not the built in type
 * (Boolean, not boolean).
 * Separates between Obkject and Boolean ()
 * we dont need to separate betweent the Bool and bool since we return true/false and only use for check?
 * only in do we need
 */
function isType(val, type) {
  return Object.prototype.toString.call(val).slice(8, -1) === (typeof type === "string" ? type : type.name)
}


/**
 * Gets the type (fn obj/constructor name) of a value.
 * Converts val to object (tostring does).
 * Custom constructed object will return [object Object].
 * For primitives returns e.g. "Boolean" instead of "boolean".
 */
function getType(val) {
  return Object.prototype.toString.call(val).slice(8, -1)
}



 /**
  * Checks if an object is of a certain type, type
  * essentially meaning constructor. Convert to object
  * if not object. Accepts the type to check against, as
  * a string name or function object reference.
  * Unlike above function primitive values
  * does not return true for both Object and e.g. Boolean.
  */
function isOfType(obj, type) {
 obj = Object(obj)
 return typeof type === "string"
   ? obj.constructor.name === type
   : obj instanceof type
}



/**
 * Same as above except does not return true
 * for both Object and Boolean/String/Array etc.
 */
function isOfType(obj, type) {
 obj = Object(obj)
 return typeof type === "string"
   ? obj.constructor.name === type
   : obj.constructor.name === type.name
}



/**
 * Gets all the objects in an objects prototype
 * chain that has a given property name. If
 * no matches returns an empty array. Works even
 * if don't "inherit" hasOwnProperty.
 */
function getAllProtoInChainWithKey(obj, key, incSource) {
  var protos = []
  var hasOwn = Object.prototype.hasOwnProperty
  if (incSource && hasOwn.call(obj, key)) protos.push(obj)
  var proto = Object.getPrototypeOf(obj)

  while (proto !== null) {
    if (hasOwn.call(proto, key)) protos.push(proto)
    proto = Object.getPrototypeOf(proto)
  }

  return protos
}



/**
 * Gets the first object in an objects prototype chain
 * (exl: src object itself) that has the property named by "key".
 * If no such property if found on any of the object
 * in the chain, returns undefined. Doens't work if have
 * no hasOwnProperty method.
 */
function getFirstProtoInChainWithKey(obj, key) {
  var proto = Object.getPrototypeOf(obj)
  while (proto !== null) {
    if (Object.prototype.hasOwnProperty.call(proto, key)) return proto
    proto = Object.getPrototypeOf(proto)
  }
}



/**
 * Same as above just diff. algo and incldues src obj.
 * Returns the first object in the chain (including src obj)
 * that are found to contain the specificed property
 * (including non-enumerable properties). Can be used to
 * tell you what object owns the fn you called. Works even
 * when dont inherit hasOwnProperty (assuming not deleted on Object.prototype.)
 */
function getPropertyOwner(obj, prop) {
  var chainObj = null
  walkChain(obj, prop)
  return chainObj

  function walkChain(obj, prop) {
    if (Object.prototype.hasOwnProperty.call(obj, prop))
      chainObj = obj
    else if (Object.getPrototypeOf(obj) !== null) {
      walkChain(Object.getPrototypeOf(obj), prop)
    }
  }
}



/**
 * Returns true if the prototype chain of the source
 * object (inc. src object itself) has a duplicate (or more) property names.
 * Can be used to determine if a property is being overriden.
 * It can only have duplicate if the key/name is defined on different objects.
 */
function hasDuplicateKey(obj, prop) {
 var hasOwn = Object.prototype.hasOwnProperty
 var found = hasOwn.call(obj, prop)
 var proto = Object.getPrototypeOf(obj)

 while (proto !== null) {
   if (hasOwn.call(proto, prop) && found) return true
   if (hasOwn.call(proto, prop) && !found) found = true
   proto = Object.getPrototypeOf(proto)
 }

 return false
}



/**
 * True if source object or chain has key.
 * Includes non-enumerable properties.
 * Better inlining.
 */
function has(obj, key) {
  return key in obj
}



/**
 * hasOwnProperty shorthand.
 */
function hasOwn(obj, key) {
  return obj.hasOwnProperty(key)
}



/**
 * hasOwnProperty wrapper that works from anywhere.
 */
function hasOwn(obj, key) {
  return Object.prototype.hasOwnProperty.call(obj, key)
}



/**
 * True if has the property ONLY in the source object.
 * False if has the property only in the
 * protochain, neither or both.
 */
function hasOnlyInSource(obj, prop) {
  return hasOwn(obj, prop) && !hasInProtoChain(obj, prop)
}



/**
 * Reverse of above. True for chain only,
 * false for source only, both or neither.
 */
function hasOnlyInChain(obj, prop) {
  return !hasOwn(obj, prop) && hasInProtoChain(obj, prop)
}



/**
 * Returns true on the condition that a key/prop exists
 * both in the source object and on any of the prototype
 * objects in the proto chain.
 */
function hasKeyInBoth(obj, key) {
  return hasOwn(obj, key) && hasInProtoChain(obj, key)
}



/**
 * Checks if an object's prototype chain contains a specific property,
 * disregarding the source object.
 * Has any proto object?
 * the last line is used for checkin entire chain if need be.
 */
function hasInProtoChain(obj, key) {
  var proto = Object.getPrototypeOf(obj)
  return key in proto
}



/**
 * Essentially converts the prototype chain
 * (excl. src object) into an array.
 */
function getAllProtos(obj) {
  var protos = []
  var proto = Object.getPrototypeOf(obj)
  while (proto !== null) {
    protos.push(proto)
    proto = Object.getPrototypeOf(proto)
  }
  return protos
}



/**
 * Returns a string representing the "path" of
 * constructors used to construct
 * the objects prototype chain.
 */
function stringifyConstructorPath(obj) {
  var chain = obj.constructor.name
  var proto = Object.getPrototypeOf(obj)

  while (proto !== null) {
    chain += " -> " + proto.constructor.name
    proto = Object.getPrototypeOf(proto)
  }

  return chain
}



/**
 * Checks if an object has a prototype.
 */
function hasProto(obj) {
  return Boolean(Object.getPrototypeOf(obj))
}



/**
 * Adds a property to an object
 * only if the property don't already
 * exists anywhere in the entire prototype chain.
 */
function extend(obj, key, val) {
  if (key in obj) obj[key] = val
}



/**
 * Adds a property to an object given
 * that it doens't exists on the src object.
 */
function extendOwn(obj, key, val) {
  if (hasOwn(obj, key)) obj[key] = val
}



/**
 * Naive object property name change. Doesn't copy
 * property configuration.
 * The added prop is added at end of object.
 * But display in log alpabehtically.
 */
function changePropertyName(obj, old, _new) {
  obj[_new] = obj[old];
  delete obj[old];
}



/**
 * Changes a object keys name by copying the
 * properties config. The change changes
 * the position of the prop. Adds new prop at end,
 * order not necessarily mantained.
 */
function changeKey(obj, oldname, newname) {
  Object.defineProperty(
    obj,
    newname,
    Object.getOwnPropertyDescriptor(obj, oldname)
  );
  delete obj[oldname];
}



/**
 * Copies a nested object. Also copies each
 * properties configuration. Unlike the other
 * copy fns i made (since just recreates a new var). Need to filter for null?
 */
function copyWithDescriptor(obj) {
  var clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj))
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null && !obj[key] instanceof RegExp)
        clone[key] = copy(obj[key])
      else
        Object.defineProperty(
          clone,
          key,
          Object.getOwnPropertyDescriptor(obj, key)
        )
    }
  }
  return clone
}


/**
 * Copies a nested object (and assigns the same prototype), but not
 * the object properties configuration.
 * Performs a deep copy of an obj (array?)
 */
function copy(obj) {
  var clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj))
  for (var key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null && !obj[key] instanceof RegExp)
        clone[key] = copy(obj[key])
      else
        clone[key] = obj[key]
    }
  }
  return clone
}



/**
 * Copies a nested object using stringify.
 */
function copy(obj) {
  return JSON.parse(JSON.stringify(obj))
}



/**
 * Defines a property.
 * https://cdn.jsdelivr.net/npm/vue/dist/vue.js
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
 * Removes all occurences of a named property in a nested object.
 * Not chain. if just want to remove not nested: use delete.
 * Removes in place. Altering the original object. Must copy before.
 * ps: works for props nested in obj in arrays  arr: [{\nadme: {}, age: 2}] too
 */
function removeProp(prop, object) {
  var prop = prop
  for (var key in object) {
    if (object.hasOwnProperty(key)) {
      if (key === prop) delete object[key]
      else if (typeof object[key] === "object")
        removeProp(prop, object[key])
    }
  }
}



/**
 * Gets the number of own enumerable
 * properties in an object.
 */
(Object.prototype == undefined && Object.prototype.length == undefined) || (
  Object.defineProperty(Object.prototype, "length", {
    get: function() { return Object.keys(this).length }
  })
)



/**
 * Checks if two identifiers refers
 * to the same object in memory.
 */
function sameObject(a, b) {
  return a === b
}



/**
 * Checks if two objects was created
 * by the same constructor (fn object).
 */
function sameType(a, b) {
  return a.constructor.name === b.constructor.name
}



/**
 * Checks if two object have the same
 * own enumerable property names (in the
 * same order, as retrieved by object keys).
 */
function sameKeys(objA, objB, ignoreOrder) {
  var keysA = Object.keys(objA)
  var keysB = Object.keys(objB)

  if (keysA.length !== keysB.length)
    return false

  if (ignoreOrder) keysA.sort(), keysB.sort()

  for (var i = 0; i < keysA.length; i++)
    if (keysA[i] !== keysB[i])
      return false

  return true
}


/**
 * True if has the same keys
 * including for nested objects.
 */
function sameKeysNested(objA, objB, ignoreOrder) {
  var keysA = Object.keys(objA)
  var keysB = Object.keys(objB)

  if (keysA.length !== keysB.length)
    return false

  if (ignoreOrder) keysA.sort(), keysB.sort()

  for (var i = 0; i < keysA.length; i++)
    if (keysA[i] !== keysB[i])
      return false

    if (typeof objA[keysA[i]] === "object")
      sameKeysNested(objA[keysA[i]], objB[keysB[i]], ignoreOrder)

  return true
}



/**
 * Compares two objects (or indexed arrays) for equality
 * based on their own enumerable keys and order
 * of the keys. Doens't compare nested props.
 */
function sameKeys(a, b, ignoreOrder) {
  return JSON.stringify(Object.keys(a)) === JSON.stringify(Object.keys(b))
}



/**
 * Checks if two objects are equal based on
 * their keys, but ignoring the order of the keys.
 * By sorting the keys alphabtically before comparing strings, we can
 * eliminate the order of the keys declaration in the comparison.
 */
function sameKeysIgnoreOrder(a, b) {
  return JSON.stringify(Object.keys(a).sort()) === JSON.stringify(Object.keys(b).sort())
}



/**
 * Checking if two prototype chains are the same
 * is as easy as checking if the first
 * prototype is the same object (by checking
 * if the two references, refer to the same object in memory).
 * If they are. the rest of the chain MUST be the same aswell.
 */
function hasSameChain(a, b) {
  return Object.getPrototypeOf(a) === Object.getPrototypeOf(b)
}



/**
 * Checks if the root object have the same
 * properties (incl. nested) in the same order for
 * non-enum properties. Ignores the proto chain.
 */
function sameShape(a, b) {
  return JSON.stringify(a) === JSON.stringify(b)
}



/**
 * Same as above only also with prototype equality check.
 */
function sameShapeAndProto(a, b) {
  return JSON.stringify(a) === JSON.stringify(b) && hasSamePrototypeChain(a, b)
}



/**
 * True if two object are identical
 * in shape and proto.
 */
function sameSourceKeysAndProto(a, b) {
  return sameExactShape(a, b) && samePrototypeChain(a, b)
}



/**
 * Checks if two object has the same
 * properties (key, value, datatype)
 * in the same order. Doesnt check nested - getNestedKeys?
 * meaning, the keynames, data tyes and order is the same.
 */
function sameProperties(objA, objB) {
  var keysA = Object.keys(objA).sort()
  var keysB = Object.keys(objB).sort()

  if (keysA.length !== keysB.length)
    return false

  for (var i = 0; i < keysA.length; i++)
    if (keysA[i] !== keysB[i] || objA[keysA[i]] !== objB[keysB[i]])
      return false

  return true
}



/**
 * Version that , when assumes ref, it will use the string name of the fn object instead of the fn obj itself
 * in and instanceof check (is this what instaceof does!?)
 * this makes so in the case that the obj was converted
 * this becasue regardless of which check we run, both will give through on String only when checked and not Object too.
 * both check works this way/correctl - hence we dont need to check if we converted, or check the resulting typeof obj against
 * bool etc to determien valid type
 */
function isOfType(obj, type) {
  obj = Object(obj)
  return typeof type === "string"
    ? obj.constructor.name === type
    : obj.constructor.name === type.name
}



/**
 * Gets the raw type. e.g: "Number".
 */
function getType(obj, lowerCase) {
  return lowerCase
    ? Object.prototype.toString.call(obj).slice(8, -1).toLowerCase()
    : Object.prototype.toString.call(obj).slice(8, -1)
}



/**
 * Returns true if the value is of type.
 * Custom defined objects returns true only for Object, not e.g. Player.
 * For primitives the string or the function object argument
 * needs to refer to the constructor, not the built in type
 * (Boolean, not boolean).
 */
function isType(val, type) {
  return Object.prototype.toString.call(val).slice(8, -1) === (typeof type === "string" ? type : type.name)
}



/**
 * Checks if two objects/arrays are exactly the same in shape.
 */
function sameExactShape(a, b) {
	return JSON.stringify(a) === JSON.stringify(b)
}



/**
 * True if same built in type.
 */
function sameType(a, b) {
  return typeof a === typeof b
}



/**
 * True if has same values and datatype.
 */
function sameValue(a, b) {
  return a === b
}



/**
 * True if same value.
 */
function sameValue(a, b) {
  return a == b
}



/**
 * True if the object was constructed
 * by the same function object.
 */
function sameType(objA, objB) {
  return objA.constructor.name === objB.constructor.name
}



/**
 * True if two objects have the same
 * properties in the same order.
 */
function sameProps(objA, objB) {
  var keysA = Object.keys(objA)
  var keysB = Object.keys(objB)

  if (keysA.length !== keysB.length)
    return false

  for (var i = 0; i < keysA.length; i++) {
    if (keysA[i] !== keysB[i])
      return false
  }

  return true
}



/**
* Chcks that name, type and values are the same!
 * Check if two object are the same, by comparing them
 * as strings. Checks if is identical. meaning prop and values.
 */
function same(obj, obj2) {
	return JSON.stringify(obj) === JSON.stringify(obj2)
}



/**
 * True if object constructed by type.
 */
function isType(obj, type) {
  return obj instanceof type
}



/**
 * Formats an object to a printable, human readable format.
 */
function toHumanizedString(obj, withValues) {
  var str = "Name:\n\t" +  obj.constructor.name + "\nProps:"
  var longest = 0
  var keys = Object.keys(obj)
  var oldKeys = keys

  keys.forEach((key) => {
    if (key.length > longest) longest = key.length
  });

  if (withValues)
    padStringArray(keys, longest, ":")

  var old = Object.keys(obj)

  keys.forEach((key, idx) => {
    str += "\n\t" + key + (withValues ? " : " + obj[oldKeys[idx]] : "")
  });

  return str
}
