/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 347);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var core = __webpack_require__(19);
var hide = __webpack_require__(11);
var redefine = __webpack_require__(12);
var ctx = __webpack_require__(20);
var PROTOTYPE = 'prototype';

var $export = function $export(type, name, source) {
  var IS_FORCED = type & $export.F;
  var IS_GLOBAL = type & $export.G;
  var IS_STATIC = type & $export.S;
  var IS_PROTO = type & $export.P;
  var IS_BIND = type & $export.B;
  var target = IS_GLOBAL ? global : IS_STATIC ? global[name] || (global[name] = {}) : (global[name] || {})[PROTOTYPE];
  var exports = IS_GLOBAL ? core : core[name] || (core[name] = {});
  var expProto = exports[PROTOTYPE] || (exports[PROTOTYPE] = {});
  var key, own, out, exp;
  if (IS_GLOBAL) source = name;
  for (key in source) {
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    // export native or passed
    out = (own ? target : source)[key];
    // bind timers to global for call from export context
    exp = IS_BIND && own ? ctx(out, global) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // extend global
    if (target) redefine(target, key, out, type & $export.U);
    // export
    if (exports[key] != out) hide(exports, key, exp);
    if (IS_PROTO && expProto[key] != out) expProto[key] = out;
  }
};
global.core = core;
// type bitmap
$export.F = 1; // forced
$export.G = 2; // global
$export.S = 4; // static
$export.P = 8; // proto
$export.B = 16; // bind
$export.W = 32; // wrap
$export.U = 64; // safe
$export.R = 128; // real proto method for `library`
module.exports = $export;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
module.exports = function (it) {
  if (!isObject(it)) throw TypeError(it + ' is not an object!');
  return it;
};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math ? window : typeof self != 'undefined' && self.Math == Math ? self
// eslint-disable-next-line no-new-func
: Function('return this')();
if (typeof __g == 'number') __g = global; // eslint-disable-line no-undef

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return !!exec();
  } catch (e) {
    return true;
  }
};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) === 'object' ? it !== null : typeof it === 'function';
};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var store = __webpack_require__(50)('wks');
var uid = __webpack_require__(41);
var _Symbol = __webpack_require__(2).Symbol;
var USE_SYMBOL = typeof _Symbol == 'function';

var $exports = module.exports = function (name) {
  return store[name] || (store[name] = USE_SYMBOL && _Symbol[name] || (USE_SYMBOL ? _Symbol : uid)('Symbol.' + name));
};

$exports.store = store;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.1.15 ToLength
var toInteger = __webpack_require__(22);
var min = Math.min;
module.exports = function (it) {
  return it > 0 ? min(toInteger(it), 0x1fffffffffffff) : 0; // pow(2, 53) - 1 == 9007199254740991
};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(3)(function () {
  return Object.defineProperty({}, 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var IE8_DOM_DEFINE = __webpack_require__(103);
var toPrimitive = __webpack_require__(26);
var dP = Object.defineProperty;

exports.f = __webpack_require__(7) ? Object.defineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return dP(O, P, Attributes);
  } catch (e) {/* empty */}
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported!');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.1.13 ToObject(argument)
var defined = __webpack_require__(24);
module.exports = function (it) {
  return Object(defined(it));
};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it) {
  if (typeof it != 'function') throw TypeError(it + ' is not a function!');
  return it;
};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(8);
var createDesc = __webpack_require__(37);
module.exports = __webpack_require__(7) ? function (object, key, value) {
  return dP.f(object, key, createDesc(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var has = __webpack_require__(14);
var SRC = __webpack_require__(41)('src');
var $toString = __webpack_require__(151);
var TO_STRING = 'toString';
var TPL = ('' + $toString).split(TO_STRING);

__webpack_require__(19).inspectSource = function (it) {
  return $toString.call(it);
};

(module.exports = function (O, key, val, safe) {
  var isFunction = typeof val == 'function';
  if (isFunction) has(val, 'name') || hide(val, 'name', key);
  if (O[key] === val) return;
  if (isFunction) has(val, SRC) || hide(val, SRC, O[key] ? '' + O[key] : TPL.join(String(key)));
  if (O === global) {
    O[key] = val;
  } else if (!safe) {
    delete O[key];
    hide(O, key, val);
  } else if (O[key]) {
    O[key] = val;
  } else {
    hide(O, key, val);
  }
  // add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, TO_STRING, function toString() {
  return typeof this == 'function' && this[SRC] || $toString.call(this);
});

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var quot = /"/g;
// B.2.3.2.1 CreateHTML(string, tag, attribute, value)
var createHTML = function createHTML(string, tag, attribute, value) {
  var S = String(defined(string));
  var p1 = '<' + tag;
  if (attribute !== '') p1 += ' ' + attribute + '="' + String(value).replace(quot, '&quot;') + '"';
  return p1 + '>' + S + '</' + tag + '>';
};
module.exports = function (NAME, exec) {
  var O = {};
  O[NAME] = exec(createHTML);
  $export($export.P + $export.F * fails(function () {
    var test = ''[NAME]('"');
    return test !== test.toLowerCase() || test.split('"').length > 3;
  }), 'String', O);
};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var hasOwnProperty = {}.hasOwnProperty;
module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var pIE = __webpack_require__(49);
var createDesc = __webpack_require__(37);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(26);
var has = __webpack_require__(14);
var IE8_DOM_DEFINE = __webpack_require__(103);
var gOPD = Object.getOwnPropertyDescriptor;

exports.f = __webpack_require__(7) ? gOPD : function getOwnPropertyDescriptor(O, P) {
  O = toIObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return gOPD(O, P);
  } catch (e) {/* empty */}
  if (has(O, P)) return createDesc(!pIE.f.call(O, P), O[P]);
};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.9 / 15.2.3.2 Object.getPrototypeOf(O)
var has = __webpack_require__(14);
var toObject = __webpack_require__(9);
var IE_PROTO = __webpack_require__(84)('IE_PROTO');
var ObjectProto = Object.prototype;

module.exports = Object.getPrototypeOf || function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  }return O instanceof Object ? ObjectProto : null;
};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// to indexed object, toObject with fallback for non-array-like ES3 strings
var IObject = __webpack_require__(48);
var defined = __webpack_require__(24);
module.exports = function (it) {
  return IObject(defined(it));
};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var core = module.exports = { version: '2.6.5' };
if (typeof __e == 'number') __e = core; // eslint-disable-line no-undef

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// optional / simple context binding
var aFunction = __webpack_require__(10);
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 1:
      return function (a) {
        return fn.call(that, a);
      };
    case 2:
      return function (a, b) {
        return fn.call(that, a, b);
      };
    case 3:
      return function (a, b, c) {
        return fn.call(that, a, b, c);
      };
  }
  return function () /* ...args */{
    return fn.apply(that, arguments);
  };
};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__(3);

module.exports = function (method, arg) {
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call
    arg ? method.call(null, function () {/* empty */}, 1) : method.call(null);
  });
};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.1.4 ToInteger
var ceil = Math.ceil;
var floor = Math.floor;
module.exports = function (it) {
  return isNaN(it = +it) ? 0 : (it > 0 ? floor : ceil)(it);
};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 0 -> Array#forEach
// 1 -> Array#map
// 2 -> Array#filter
// 3 -> Array#some
// 4 -> Array#every
// 5 -> Array#find
// 6 -> Array#findIndex
var ctx = __webpack_require__(20);
var IObject = __webpack_require__(48);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var asc = __webpack_require__(68);
module.exports = function (TYPE, $create) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  var create = $create || asc;
  return function ($this, callbackfn, that) {
    var O = toObject($this);
    var self = IObject(O);
    var f = ctx(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var result = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var val, res;
    for (; length > index; index++) {
      if (NO_HOLES || index in self) {
        val = self[index];
        res = f(val, index, O);
        if (TYPE) {
          if (IS_MAP) result[index] = res; // map
          else if (res) switch (TYPE) {
              case 3:
                return true; // some
              case 5:
                return val; // find
              case 6:
                return index; // findIndex
              case 2:
                result.push(val); // filter
            } else if (IS_EVERY) return false; // every
        }
      }
    }return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : result;
  };
};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.2.1 RequireObjectCoercible(argument)
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on  " + it);
  return it;
};

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// most Object methods by ES6 should accept primitives
var $export = __webpack_require__(0);
var core = __webpack_require__(19);
var fails = __webpack_require__(3);
module.exports = function (KEY, exec) {
  var fn = (core.Object || {})[KEY] || Object[KEY];
  var exp = {};
  exp[KEY] = exec(fn);
  $export($export.S + $export.F * fails(function () {
    fn(1);
  }), 'Object', exp);
};

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(4);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (it, S) {
  if (!isObject(it)) return it;
  var fn, val;
  if (S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  if (typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it))) return val;
  if (!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it))) return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var Map = __webpack_require__(125);
var $export = __webpack_require__(0);
var shared = __webpack_require__(50)('metadata');
var store = shared.store || (shared.store = new (__webpack_require__(129))());

var getOrCreateMetadataMap = function getOrCreateMetadataMap(target, targetKey, create) {
  var targetMetadata = store.get(target);
  if (!targetMetadata) {
    if (!create) return undefined;
    store.set(target, targetMetadata = new Map());
  }
  var keyMetadata = targetMetadata.get(targetKey);
  if (!keyMetadata) {
    if (!create) return undefined;
    targetMetadata.set(targetKey, keyMetadata = new Map());
  }return keyMetadata;
};
var ordinaryHasOwnMetadata = function ordinaryHasOwnMetadata(MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? false : metadataMap.has(MetadataKey);
};
var ordinaryGetOwnMetadata = function ordinaryGetOwnMetadata(MetadataKey, O, P) {
  var metadataMap = getOrCreateMetadataMap(O, P, false);
  return metadataMap === undefined ? undefined : metadataMap.get(MetadataKey);
};
var ordinaryDefineOwnMetadata = function ordinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
  getOrCreateMetadataMap(O, P, true).set(MetadataKey, MetadataValue);
};
var ordinaryOwnMetadataKeys = function ordinaryOwnMetadataKeys(target, targetKey) {
  var metadataMap = getOrCreateMetadataMap(target, targetKey, false);
  var keys = [];
  if (metadataMap) metadataMap.forEach(function (_, key) {
    keys.push(key);
  });
  return keys;
};
var toMetaKey = function toMetaKey(it) {
  return it === undefined || (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : String(it);
};
var exp = function exp(O) {
  $export($export.S, 'Reflect', O);
};

module.exports = {
  store: store,
  map: getOrCreateMetadataMap,
  has: ordinaryHasOwnMetadata,
  get: ordinaryGetOwnMetadata,
  set: ordinaryDefineOwnMetadata,
  keys: ordinaryOwnMetadataKeys,
  key: toMetaKey,
  exp: exp
};

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

if (__webpack_require__(7)) {
  var LIBRARY = __webpack_require__(30);
  var global = __webpack_require__(2);
  var fails = __webpack_require__(3);
  var $export = __webpack_require__(0);
  var $typed = __webpack_require__(64);
  var $buffer = __webpack_require__(89);
  var ctx = __webpack_require__(20);
  var anInstance = __webpack_require__(32);
  var propertyDesc = __webpack_require__(37);
  var hide = __webpack_require__(11);
  var redefineAll = __webpack_require__(38);
  var toInteger = __webpack_require__(22);
  var toLength = __webpack_require__(6);
  var toIndex = __webpack_require__(123);
  var toAbsoluteIndex = __webpack_require__(40);
  var toPrimitive = __webpack_require__(26);
  var has = __webpack_require__(14);
  var classof = __webpack_require__(43);
  var isObject = __webpack_require__(4);
  var toObject = __webpack_require__(9);
  var isArrayIter = __webpack_require__(75);
  var create = __webpack_require__(34);
  var getPrototypeOf = __webpack_require__(16);
  var gOPN = __webpack_require__(35).f;
  var getIterFn = __webpack_require__(91);
  var uid = __webpack_require__(41);
  var wks = __webpack_require__(5);
  var createArrayMethod = __webpack_require__(23);
  var createArrayIncludes = __webpack_require__(52);
  var speciesConstructor = __webpack_require__(51);
  var ArrayIterators = __webpack_require__(92);
  var Iterators = __webpack_require__(44);
  var $iterDetect = __webpack_require__(57);
  var setSpecies = __webpack_require__(39);
  var arrayFill = __webpack_require__(67);
  var arrayCopyWithin = __webpack_require__(95);
  var $DP = __webpack_require__(8);
  var $GOPD = __webpack_require__(15);
  var dP = $DP.f;
  var gOPD = $GOPD.f;
  var RangeError = global.RangeError;
  var TypeError = global.TypeError;
  var Uint8Array = global.Uint8Array;
  var ARRAY_BUFFER = 'ArrayBuffer';
  var SHARED_BUFFER = 'Shared' + ARRAY_BUFFER;
  var BYTES_PER_ELEMENT = 'BYTES_PER_ELEMENT';
  var PROTOTYPE = 'prototype';
  var ArrayProto = Array[PROTOTYPE];
  var $ArrayBuffer = $buffer.ArrayBuffer;
  var $DataView = $buffer.DataView;
  var arrayForEach = createArrayMethod(0);
  var arrayFilter = createArrayMethod(2);
  var arraySome = createArrayMethod(3);
  var arrayEvery = createArrayMethod(4);
  var arrayFind = createArrayMethod(5);
  var arrayFindIndex = createArrayMethod(6);
  var arrayIncludes = createArrayIncludes(true);
  var arrayIndexOf = createArrayIncludes(false);
  var arrayValues = ArrayIterators.values;
  var arrayKeys = ArrayIterators.keys;
  var arrayEntries = ArrayIterators.entries;
  var arrayLastIndexOf = ArrayProto.lastIndexOf;
  var arrayReduce = ArrayProto.reduce;
  var arrayReduceRight = ArrayProto.reduceRight;
  var arrayJoin = ArrayProto.join;
  var arraySort = ArrayProto.sort;
  var arraySlice = ArrayProto.slice;
  var arrayToString = ArrayProto.toString;
  var arrayToLocaleString = ArrayProto.toLocaleString;
  var ITERATOR = wks('iterator');
  var TAG = wks('toStringTag');
  var TYPED_CONSTRUCTOR = uid('typed_constructor');
  var DEF_CONSTRUCTOR = uid('def_constructor');
  var ALL_CONSTRUCTORS = $typed.CONSTR;
  var TYPED_ARRAY = $typed.TYPED;
  var VIEW = $typed.VIEW;
  var WRONG_LENGTH = 'Wrong length!';

  var $map = createArrayMethod(1, function (O, length) {
    return allocate(speciesConstructor(O, O[DEF_CONSTRUCTOR]), length);
  });

  var LITTLE_ENDIAN = fails(function () {
    // eslint-disable-next-line no-undef
    return new Uint8Array(new Uint16Array([1]).buffer)[0] === 1;
  });

  var FORCED_SET = !!Uint8Array && !!Uint8Array[PROTOTYPE].set && fails(function () {
    new Uint8Array(1).set({});
  });

  var toOffset = function toOffset(it, BYTES) {
    var offset = toInteger(it);
    if (offset < 0 || offset % BYTES) throw RangeError('Wrong offset!');
    return offset;
  };

  var validate = function validate(it) {
    if (isObject(it) && TYPED_ARRAY in it) return it;
    throw TypeError(it + ' is not a typed array!');
  };

  var allocate = function allocate(C, length) {
    if (!(isObject(C) && TYPED_CONSTRUCTOR in C)) {
      throw TypeError('It is not a typed array constructor!');
    }return new C(length);
  };

  var speciesFromList = function speciesFromList(O, list) {
    return fromList(speciesConstructor(O, O[DEF_CONSTRUCTOR]), list);
  };

  var fromList = function fromList(C, list) {
    var index = 0;
    var length = list.length;
    var result = allocate(C, length);
    while (length > index) {
      result[index] = list[index++];
    }return result;
  };

  var addGetter = function addGetter(it, key, internal) {
    dP(it, key, { get: function get() {
        return this._d[internal];
      } });
  };

  var $from = function from(source /* , mapfn, thisArg */) {
    var O = toObject(source);
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var iterFn = getIterFn(O);
    var i, length, values, result, step, iterator;
    if (iterFn != undefined && !isArrayIter(iterFn)) {
      for (iterator = iterFn.call(O), values = [], i = 0; !(step = iterator.next()).done; i++) {
        values.push(step.value);
      }O = values;
    }
    if (mapping && aLen > 2) mapfn = ctx(mapfn, arguments[2], 2);
    for (i = 0, length = toLength(O.length), result = allocate(this, length); length > i; i++) {
      result[i] = mapping ? mapfn(O[i], i) : O[i];
    }
    return result;
  };

  var $of = function of() /* ...items */{
    var index = 0;
    var length = arguments.length;
    var result = allocate(this, length);
    while (length > index) {
      result[index] = arguments[index++];
    }return result;
  };

  // iOS Safari 6.x fails here
  var TO_LOCALE_BUG = !!Uint8Array && fails(function () {
    arrayToLocaleString.call(new Uint8Array(1));
  });

  var $toLocaleString = function toLocaleString() {
    return arrayToLocaleString.apply(TO_LOCALE_BUG ? arraySlice.call(validate(this)) : validate(this), arguments);
  };

  var proto = {
    copyWithin: function copyWithin(target, start /* , end */) {
      return arrayCopyWithin.call(validate(this), target, start, arguments.length > 2 ? arguments[2] : undefined);
    },
    every: function every(callbackfn /* , thisArg */) {
      return arrayEvery(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    fill: function fill(value /* , start, end */) {
      // eslint-disable-line no-unused-vars
      return arrayFill.apply(validate(this), arguments);
    },
    filter: function filter(callbackfn /* , thisArg */) {
      return speciesFromList(this, arrayFilter(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined));
    },
    find: function find(predicate /* , thisArg */) {
      return arrayFind(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    findIndex: function findIndex(predicate /* , thisArg */) {
      return arrayFindIndex(validate(this), predicate, arguments.length > 1 ? arguments[1] : undefined);
    },
    forEach: function forEach(callbackfn /* , thisArg */) {
      arrayForEach(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    indexOf: function indexOf(searchElement /* , fromIndex */) {
      return arrayIndexOf(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    includes: function includes(searchElement /* , fromIndex */) {
      return arrayIncludes(validate(this), searchElement, arguments.length > 1 ? arguments[1] : undefined);
    },
    join: function join(separator) {
      // eslint-disable-line no-unused-vars
      return arrayJoin.apply(validate(this), arguments);
    },
    lastIndexOf: function lastIndexOf(searchElement /* , fromIndex */) {
      // eslint-disable-line no-unused-vars
      return arrayLastIndexOf.apply(validate(this), arguments);
    },
    map: function map(mapfn /* , thisArg */) {
      return $map(validate(this), mapfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    reduce: function reduce(callbackfn /* , initialValue */) {
      // eslint-disable-line no-unused-vars
      return arrayReduce.apply(validate(this), arguments);
    },
    reduceRight: function reduceRight(callbackfn /* , initialValue */) {
      // eslint-disable-line no-unused-vars
      return arrayReduceRight.apply(validate(this), arguments);
    },
    reverse: function reverse() {
      var that = this;
      var length = validate(that).length;
      var middle = Math.floor(length / 2);
      var index = 0;
      var value;
      while (index < middle) {
        value = that[index];
        that[index++] = that[--length];
        that[length] = value;
      }return that;
    },
    some: function some(callbackfn /* , thisArg */) {
      return arraySome(validate(this), callbackfn, arguments.length > 1 ? arguments[1] : undefined);
    },
    sort: function sort(comparefn) {
      return arraySort.call(validate(this), comparefn);
    },
    subarray: function subarray(begin, end) {
      var O = validate(this);
      var length = O.length;
      var $begin = toAbsoluteIndex(begin, length);
      return new (speciesConstructor(O, O[DEF_CONSTRUCTOR]))(O.buffer, O.byteOffset + $begin * O.BYTES_PER_ELEMENT, toLength((end === undefined ? length : toAbsoluteIndex(end, length)) - $begin));
    }
  };

  var $slice = function slice(start, end) {
    return speciesFromList(this, arraySlice.call(validate(this), start, end));
  };

  var $set = function set(arrayLike /* , offset */) {
    validate(this);
    var offset = toOffset(arguments[1], 1);
    var length = this.length;
    var src = toObject(arrayLike);
    var len = toLength(src.length);
    var index = 0;
    if (len + offset > length) throw RangeError(WRONG_LENGTH);
    while (index < len) {
      this[offset + index] = src[index++];
    }
  };

  var $iterators = {
    entries: function entries() {
      return arrayEntries.call(validate(this));
    },
    keys: function keys() {
      return arrayKeys.call(validate(this));
    },
    values: function values() {
      return arrayValues.call(validate(this));
    }
  };

  var isTAIndex = function isTAIndex(target, key) {
    return isObject(target) && target[TYPED_ARRAY] && (typeof key === 'undefined' ? 'undefined' : _typeof(key)) != 'symbol' && key in target && String(+key) == String(key);
  };
  var $getDesc = function getOwnPropertyDescriptor(target, key) {
    return isTAIndex(target, key = toPrimitive(key, true)) ? propertyDesc(2, target[key]) : gOPD(target, key);
  };
  var $setDesc = function defineProperty(target, key, desc) {
    if (isTAIndex(target, key = toPrimitive(key, true)) && isObject(desc) && has(desc, 'value') && !has(desc, 'get') && !has(desc, 'set')
    // TODO: add validation descriptor w/o calling accessors
    && !desc.configurable && (!has(desc, 'writable') || desc.writable) && (!has(desc, 'enumerable') || desc.enumerable)) {
      target[key] = desc.value;
      return target;
    }return dP(target, key, desc);
  };

  if (!ALL_CONSTRUCTORS) {
    $GOPD.f = $getDesc;
    $DP.f = $setDesc;
  }

  $export($export.S + $export.F * !ALL_CONSTRUCTORS, 'Object', {
    getOwnPropertyDescriptor: $getDesc,
    defineProperty: $setDesc
  });

  if (fails(function () {
    arrayToString.call({});
  })) {
    arrayToString = arrayToLocaleString = function toString() {
      return arrayJoin.call(this);
    };
  }

  var $TypedArrayPrototype$ = redefineAll({}, proto);
  redefineAll($TypedArrayPrototype$, $iterators);
  hide($TypedArrayPrototype$, ITERATOR, $iterators.values);
  redefineAll($TypedArrayPrototype$, {
    slice: $slice,
    set: $set,
    constructor: function constructor() {/* noop */},
    toString: arrayToString,
    toLocaleString: $toLocaleString
  });
  addGetter($TypedArrayPrototype$, 'buffer', 'b');
  addGetter($TypedArrayPrototype$, 'byteOffset', 'o');
  addGetter($TypedArrayPrototype$, 'byteLength', 'l');
  addGetter($TypedArrayPrototype$, 'length', 'e');
  dP($TypedArrayPrototype$, TAG, {
    get: function get() {
      return this[TYPED_ARRAY];
    }
  });

  // eslint-disable-next-line max-statements
  module.exports = function (KEY, BYTES, wrapper, CLAMPED) {
    CLAMPED = !!CLAMPED;
    var NAME = KEY + (CLAMPED ? 'Clamped' : '') + 'Array';
    var GETTER = 'get' + KEY;
    var SETTER = 'set' + KEY;
    var TypedArray = global[NAME];
    var Base = TypedArray || {};
    var TAC = TypedArray && getPrototypeOf(TypedArray);
    var FORCED = !TypedArray || !$typed.ABV;
    var O = {};
    var TypedArrayPrototype = TypedArray && TypedArray[PROTOTYPE];
    var getter = function getter(that, index) {
      var data = that._d;
      return data.v[GETTER](index * BYTES + data.o, LITTLE_ENDIAN);
    };
    var setter = function setter(that, index, value) {
      var data = that._d;
      if (CLAMPED) value = (value = Math.round(value)) < 0 ? 0 : value > 0xff ? 0xff : value & 0xff;
      data.v[SETTER](index * BYTES + data.o, value, LITTLE_ENDIAN);
    };
    var addElement = function addElement(that, index) {
      dP(that, index, {
        get: function get() {
          return getter(this, index);
        },
        set: function set(value) {
          return setter(this, index, value);
        },
        enumerable: true
      });
    };
    if (FORCED) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME, '_d');
        var index = 0;
        var offset = 0;
        var buffer, byteLength, length, klass;
        if (!isObject(data)) {
          length = toIndex(data);
          byteLength = length * BYTES;
          buffer = new $ArrayBuffer(byteLength);
        } else if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          buffer = data;
          offset = toOffset($offset, BYTES);
          var $len = data.byteLength;
          if ($length === undefined) {
            if ($len % BYTES) throw RangeError(WRONG_LENGTH);
            byteLength = $len - offset;
            if (byteLength < 0) throw RangeError(WRONG_LENGTH);
          } else {
            byteLength = toLength($length) * BYTES;
            if (byteLength + offset > $len) throw RangeError(WRONG_LENGTH);
          }
          length = byteLength / BYTES;
        } else if (TYPED_ARRAY in data) {
          return fromList(TypedArray, data);
        } else {
          return $from.call(TypedArray, data);
        }
        hide(that, '_d', {
          b: buffer,
          o: offset,
          l: byteLength,
          e: length,
          v: new $DataView(buffer)
        });
        while (index < length) {
          addElement(that, index++);
        }
      });
      TypedArrayPrototype = TypedArray[PROTOTYPE] = create($TypedArrayPrototype$);
      hide(TypedArrayPrototype, 'constructor', TypedArray);
    } else if (!fails(function () {
      TypedArray(1);
    }) || !fails(function () {
      new TypedArray(-1); // eslint-disable-line no-new
    }) || !$iterDetect(function (iter) {
      new TypedArray(); // eslint-disable-line no-new
      new TypedArray(null); // eslint-disable-line no-new
      new TypedArray(1.5); // eslint-disable-line no-new
      new TypedArray(iter); // eslint-disable-line no-new
    }, true)) {
      TypedArray = wrapper(function (that, data, $offset, $length) {
        anInstance(that, TypedArray, NAME);
        var klass;
        // `ws` module bug, temporarily remove validation length for Uint8Array
        // https://github.com/websockets/ws/pull/645
        if (!isObject(data)) return new Base(toIndex(data));
        if (data instanceof $ArrayBuffer || (klass = classof(data)) == ARRAY_BUFFER || klass == SHARED_BUFFER) {
          return $length !== undefined ? new Base(data, toOffset($offset, BYTES), $length) : $offset !== undefined ? new Base(data, toOffset($offset, BYTES)) : new Base(data);
        }
        if (TYPED_ARRAY in data) return fromList(TypedArray, data);
        return $from.call(TypedArray, data);
      });
      arrayForEach(TAC !== Function.prototype ? gOPN(Base).concat(gOPN(TAC)) : gOPN(Base), function (key) {
        if (!(key in TypedArray)) hide(TypedArray, key, Base[key]);
      });
      TypedArray[PROTOTYPE] = TypedArrayPrototype;
      if (!LIBRARY) TypedArrayPrototype.constructor = TypedArray;
    }
    var $nativeIterator = TypedArrayPrototype[ITERATOR];
    var CORRECT_ITER_NAME = !!$nativeIterator && ($nativeIterator.name == 'values' || $nativeIterator.name == undefined);
    var $iterator = $iterators.values;
    hide(TypedArray, TYPED_CONSTRUCTOR, true);
    hide(TypedArrayPrototype, TYPED_ARRAY, NAME);
    hide(TypedArrayPrototype, VIEW, true);
    hide(TypedArrayPrototype, DEF_CONSTRUCTOR, TypedArray);

    if (CLAMPED ? new TypedArray(1)[TAG] != NAME : !(TAG in TypedArrayPrototype)) {
      dP(TypedArrayPrototype, TAG, {
        get: function get() {
          return NAME;
        }
      });
    }

    O[NAME] = TypedArray;

    $export($export.G + $export.W + $export.F * (TypedArray != Base), O);

    $export($export.S, NAME, {
      BYTES_PER_ELEMENT: BYTES
    });

    $export($export.S + $export.F * fails(function () {
      Base.of.call(TypedArray, 1);
    }), NAME, {
      from: $from,
      of: $of
    });

    if (!(BYTES_PER_ELEMENT in TypedArrayPrototype)) hide(TypedArrayPrototype, BYTES_PER_ELEMENT, BYTES);

    $export($export.P, NAME, proto);

    setSpecies(NAME);

    $export($export.P + $export.F * FORCED_SET, NAME, { set: $set });

    $export($export.P + $export.F * !CORRECT_ITER_NAME, NAME, $iterators);

    if (!LIBRARY && TypedArrayPrototype.toString != arrayToString) TypedArrayPrototype.toString = arrayToString;

    $export($export.P + $export.F * fails(function () {
      new TypedArray(1).slice();
    }), NAME, { slice: $slice });

    $export($export.P + $export.F * (fails(function () {
      return [1, 2].toLocaleString() != new TypedArray([1, 2]).toLocaleString();
    }) || !fails(function () {
      TypedArrayPrototype.toLocaleString.call([1, 2]);
    })), NAME, { toLocaleString: $toLocaleString });

    Iterators[NAME] = CORRECT_ITER_NAME ? $nativeIterator : $iterator;
    if (!LIBRARY && !CORRECT_ITER_NAME) hide(TypedArrayPrototype, ITERATOR, $iterator);
  };
} else module.exports = function () {/* empty */};

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.31 Array.prototype[@@unscopables]
var UNSCOPABLES = __webpack_require__(5)('unscopables');
var ArrayProto = Array.prototype;
if (ArrayProto[UNSCOPABLES] == undefined) __webpack_require__(11)(ArrayProto, UNSCOPABLES, {});
module.exports = function (key) {
  ArrayProto[UNSCOPABLES][key] = true;
};

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = false;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var META = __webpack_require__(41)('meta');
var isObject = __webpack_require__(4);
var has = __webpack_require__(14);
var setDesc = __webpack_require__(8).f;
var id = 0;
var isExtensible = Object.isExtensible || function () {
  return true;
};
var FREEZE = !__webpack_require__(3)(function () {
  return isExtensible(Object.preventExtensions({}));
});
var setMeta = function setMeta(it) {
  setDesc(it, META, { value: {
      i: 'O' + ++id, // object ID
      w: {} // weak collections IDs
    } });
};
var fastKey = function fastKey(it, create) {
  // return primitive with prefix
  if (!isObject(it)) return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol' ? it : (typeof it == 'string' ? 'S' : 'P') + it;
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return 'F';
    // not necessary to add metadata
    if (!create) return 'E';
    // add missing metadata
    setMeta(it);
    // return object ID
  }return it[META].i;
};
var getWeak = function getWeak(it, create) {
  if (!has(it, META)) {
    // can't set metadata to uncaught frozen object
    if (!isExtensible(it)) return true;
    // not necessary to add metadata
    if (!create) return false;
    // add missing metadata
    setMeta(it);
    // return hash weak collections IDs
  }return it[META].w;
};
// add metadata on freeze-family methods calling
var onFreeze = function onFreeze(it) {
  if (FREEZE && meta.NEED && isExtensible(it) && !has(it, META)) setMeta(it);
  return it;
};
var meta = module.exports = {
  KEY: META,
  NEED: false,
  fastKey: fastKey,
  getWeak: getWeak,
  onFreeze: onFreeze
};

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (it, Constructor, name, forbiddenField) {
  if (!(it instanceof Constructor) || forbiddenField !== undefined && forbiddenField in it) {
    throw TypeError(name + ': incorrect invocation!');
  }return it;
};

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(20);
var call = __webpack_require__(106);
var isArrayIter = __webpack_require__(75);
var anObject = __webpack_require__(1);
var toLength = __webpack_require__(6);
var getIterFn = __webpack_require__(91);
var BREAK = {};
var RETURN = {};
var _exports = module.exports = function (iterable, entries, fn, that, ITERATOR) {
  var iterFn = ITERATOR ? function () {
    return iterable;
  } : getIterFn(iterable);
  var f = ctx(fn, that, entries ? 2 : 1);
  var index = 0;
  var length, step, iterator, result;
  if (typeof iterFn != 'function') throw TypeError(iterable + ' is not iterable!');
  // fast case for arrays with default iterator
  if (isArrayIter(iterFn)) for (length = toLength(iterable.length); length > index; index++) {
    result = entries ? f(anObject(step = iterable[index])[0], step[1]) : f(iterable[index]);
    if (result === BREAK || result === RETURN) return result;
  } else for (iterator = iterFn.call(iterable); !(step = iterator.next()).done;) {
    result = call(iterator, f, step.value, entries);
    if (result === BREAK || result === RETURN) return result;
  }
};
_exports.BREAK = BREAK;
_exports.RETURN = RETURN;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
var anObject = __webpack_require__(1);
var dPs = __webpack_require__(112);
var enumBugKeys = __webpack_require__(71);
var IE_PROTO = __webpack_require__(84)('IE_PROTO');
var Empty = function Empty() {/* empty */};
var PROTOTYPE = 'prototype';

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var _createDict = function createDict() {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = __webpack_require__(70)('iframe');
  var i = enumBugKeys.length;
  var lt = '<';
  var gt = '>';
  var iframeDocument;
  iframe.style.display = 'none';
  __webpack_require__(73).appendChild(iframe);
  iframe.src = 'javascript:'; // eslint-disable-line no-script-url
  // createDict = iframe.contentWindow.Object;
  // html.removeChild(iframe);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(lt + 'script' + gt + 'document.F=Object' + lt + '/script' + gt);
  iframeDocument.close();
  _createDict = iframeDocument.F;
  while (i--) {
    delete _createDict[PROTOTYPE][enumBugKeys[i]];
  }return _createDict();
};

module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    Empty[PROTOTYPE] = anObject(O);
    result = new Empty();
    Empty[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = _createDict();
  return Properties === undefined ? result : dPs(result, Properties);
};

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.7 / 15.2.3.4 Object.getOwnPropertyNames(O)
var $keys = __webpack_require__(114);
var hiddenKeys = __webpack_require__(71).concat('length', 'prototype');

exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return $keys(O, hiddenKeys);
};

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 / 15.2.3.14 Object.keys(O)
var $keys = __webpack_require__(114);
var enumBugKeys = __webpack_require__(71);

module.exports = Object.keys || function keys(O) {
  return $keys(O, enumBugKeys);
};

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var redefine = __webpack_require__(12);
module.exports = function (target, src, safe) {
  for (var key in src) {
    redefine(target, key, src[key], safe);
  }return target;
};

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var dP = __webpack_require__(8);
var DESCRIPTORS = __webpack_require__(7);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (KEY) {
  var C = global[KEY];
  if (DESCRIPTORS && C && !C[SPECIES]) dP.f(C, SPECIES, {
    configurable: true,
    get: function get() {
      return this;
    }
  });
};

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(22);
var max = Math.max;
var min = Math.min;
module.exports = function (index, length) {
  index = toInteger(index);
  return index < 0 ? max(index + length, 0) : min(index, length);
};

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var id = 0;
var px = Math.random();
module.exports = function (key) {
  return 'Symbol('.concat(key === undefined ? '' : key, ')_', (++id + px).toString(36));
};

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
module.exports = function (it, TYPE) {
  if (!isObject(it) || it._t !== TYPE) throw TypeError('Incompatible receiver, ' + TYPE + ' required!');
  return it;
};

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// getting tag from 19.1.3.6 Object.prototype.toString()
var cof = __webpack_require__(18);
var TAG = __webpack_require__(5)('toStringTag');
// ES3 wrong here
var ARG = cof(function () {
  return arguments;
}()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function tryGet(it, key) {
  try {
    return it[key];
  } catch (e) {/* empty */}
};

module.exports = function (it) {
  var O, T, B;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
  // @@toStringTag case
  : typeof (T = tryGet(O = Object(it), TAG)) == 'string' ? T
  // builtinTag case
  : ARG ? cof(O)
  // ES3 arguments fallback
  : (B = cof(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : B;
};

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = {};

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var def = __webpack_require__(8).f;
var has = __webpack_require__(14);
var TAG = __webpack_require__(5)('toStringTag');

module.exports = function (it, tag, stat) {
  if (it && !has(it = stat ? it : it.prototype, TAG)) def(it, TAG, { configurable: true, value: tag });
};

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var fails = __webpack_require__(3);
var spaces = __webpack_require__(87);
var space = '[' + spaces + ']';
var non = '\u200B\x85';
var ltrim = RegExp('^' + space + space + '*');
var rtrim = RegExp(space + space + '*$');

var exporter = function exporter(KEY, exec, ALIAS) {
  var exp = {};
  var FORCE = fails(function () {
    return !!spaces[KEY]() || non[KEY]() != non;
  });
  var fn = exp[KEY] = FORCE ? exec(trim) : spaces[KEY];
  if (ALIAS) exp[ALIAS] = fn;
  $export($export.P + $export.F * FORCE, 'String', exp);
};

// 1 -> String#trimLeft
// 2 -> String#trimRight
// 3 -> String#trim
var trim = exporter.trim = function (string, TYPE) {
  string = String(defined(string));
  if (TYPE & 1) string = string.replace(ltrim, '');
  if (TYPE & 2) string = string.replace(rtrim, '');
  return string;
};

module.exports = exporter;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 21.2.5.3 get RegExp.prototype.flags

var anObject = __webpack_require__(1);
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// fallback for non-array-like ES3 and non-enumerable old V8 strings
var cof = __webpack_require__(18);
// eslint-disable-next-line no-prototype-builtins
module.exports = Object('z').propertyIsEnumerable(0) ? Object : function (it) {
  return cof(it) == 'String' ? it.split('') : Object(it);
};

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


exports.f = {}.propertyIsEnumerable;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var core = __webpack_require__(19);
var global = __webpack_require__(2);
var SHARED = '__core-js_shared__';
var store = global[SHARED] || (global[SHARED] = {});

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: core.version,
  mode: __webpack_require__(30) ? 'pure' : 'global',
  copyright: '© 2019 Denis Pushkarev (zloirock.ru)'
});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.3.20 SpeciesConstructor(O, defaultConstructor)
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var SPECIES = __webpack_require__(5)('species');
module.exports = function (O, D) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? D : aFunction(S);
};

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// false -> Array#indexOf
// true  -> Array#includes
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(6);
var toAbsoluteIndex = __webpack_require__(40);
module.exports = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
      // Array#indexOf ignores holes, Array#includes - not
    } else for (; length > index; index++) {
      if (IS_INCLUDES || index in O) {
        if (O[index] === el) return IS_INCLUDES || index || 0;
      }
    }return !IS_INCLUDES && -1;
  };
};

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var redefineAll = __webpack_require__(38);
var meta = __webpack_require__(31);
var forOf = __webpack_require__(33);
var anInstance = __webpack_require__(32);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var $iterDetect = __webpack_require__(57);
var setToStringTag = __webpack_require__(45);
var inheritIfRequired = __webpack_require__(74);

module.exports = function (NAME, wrapper, methods, common, IS_MAP, IS_WEAK) {
  var Base = global[NAME];
  var C = Base;
  var ADDER = IS_MAP ? 'set' : 'add';
  var proto = C && C.prototype;
  var O = {};
  var fixMethod = function fixMethod(KEY) {
    var fn = proto[KEY];
    redefine(proto, KEY, KEY == 'delete' ? function (a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'has' ? function has(a) {
      return IS_WEAK && !isObject(a) ? false : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'get' ? function get(a) {
      return IS_WEAK && !isObject(a) ? undefined : fn.call(this, a === 0 ? 0 : a);
    } : KEY == 'add' ? function add(a) {
      fn.call(this, a === 0 ? 0 : a);return this;
    } : function set(a, b) {
      fn.call(this, a === 0 ? 0 : a, b);return this;
    });
  };
  if (typeof C != 'function' || !(IS_WEAK || proto.forEach && !fails(function () {
    new C().entries().next();
  }))) {
    // create collection constructor
    C = common.getConstructor(wrapper, NAME, IS_MAP, ADDER);
    redefineAll(C.prototype, methods);
    meta.NEED = true;
  } else {
    var instance = new C();
    // early implementations not supports chaining
    var HASNT_CHAINING = instance[ADDER](IS_WEAK ? {} : -0, 1) != instance;
    // V8 ~  Chromium 40- weak-collections throws on primitives, but should return false
    var THROWS_ON_PRIMITIVES = fails(function () {
      instance.has(1);
    });
    // most early implementations doesn't supports iterables, most modern - not close it correctly
    var ACCEPT_ITERABLES = $iterDetect(function (iter) {
      new C(iter);
    }); // eslint-disable-line no-new
    // for early implementations -0 and +0 not the same
    var BUGGY_ZERO = !IS_WEAK && fails(function () {
      // V8 ~ Chromium 42- fails only with 5+ elements
      var $instance = new C();
      var index = 5;
      while (index--) {
        $instance[ADDER](index, index);
      }return !$instance.has(-0);
    });
    if (!ACCEPT_ITERABLES) {
      C = wrapper(function (target, iterable) {
        anInstance(target, C, NAME);
        var that = inheritIfRequired(new Base(), target, C);
        if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
        return that;
      });
      C.prototype = proto;
      proto.constructor = C;
    }
    if (THROWS_ON_PRIMITIVES || BUGGY_ZERO) {
      fixMethod('delete');
      fixMethod('has');
      IS_MAP && fixMethod('get');
    }
    if (BUGGY_ZERO || HASNT_CHAINING) fixMethod(ADDER);
    // weak collections should not contains .clear method
    if (IS_WEAK && proto.clear) delete proto.clear;
  }

  setToStringTag(C, NAME);

  O[NAME] = C;
  $export($export.G + $export.W + $export.F * (C != Base), O);

  if (!IS_WEAK) common.setStrong(C, NAME, IS_MAP);

  return C;
};

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(126);
var redefine = __webpack_require__(12);
var hide = __webpack_require__(11);
var fails = __webpack_require__(3);
var defined = __webpack_require__(24);
var wks = __webpack_require__(5);
var regexpExec = __webpack_require__(82);

var SPECIES = wks('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = function () {
  // Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () {
    return originalExec.apply(this, arguments);
  };
  var result = 'ab'.split(re);
  return result.length === 2 && result[0] === 'a' && result[1] === 'b';
}();

module.exports = function (KEY, length, exec) {
  var SYMBOL = wks(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () {
      return 7;
    };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL ? !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;
    re.exec = function () {
      execCalled = true;return null;
    };
    if (KEY === 'split') {
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () {
        return re;
      };
    }
    re[SYMBOL]('');
    return !execCalled;
  }) : undefined;

  if (!DELEGATES_TO_SYMBOL || !DELEGATES_TO_EXEC || KEY === 'replace' && !REPLACE_SUPPORTS_NAMED_GROUPS || KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC) {
    var nativeRegExpMethod = /./[SYMBOL];
    var fns = exec(defined, SYMBOL, ''[KEY], function maybeCallNative(nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    });
    var strfn = fns[0];
    var rxfn = fns[1];

    redefine(String.prototype, KEY, strfn);
    hide(RegExp.prototype, SYMBOL, length == 2
    // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
    // 21.2.5.11 RegExp.prototype[@@split](string, limit)
    ? function (string, arg) {
      return rxfn.call(string, this, arg);
    }
    // 21.2.5.6 RegExp.prototype[@@match](string)
    // 21.2.5.9 RegExp.prototype[@@search](string)
    : function (string) {
      return rxfn.call(string, this);
    });
  }
};

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.2.2 IsArray(argument)
var cof = __webpack_require__(18);
module.exports = Array.isArray || function isArray(arg) {
  return cof(arg) == 'Array';
};

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.2.8 IsRegExp(argument)
var isObject = __webpack_require__(4);
var cof = __webpack_require__(18);
var MATCH = __webpack_require__(5)('match');
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : cof(it) == 'RegExp');
};

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var ITERATOR = __webpack_require__(5)('iterator');
var SAFE_CLOSING = false;

try {
  var riter = [7][ITERATOR]();
  riter['return'] = function () {
    SAFE_CLOSING = true;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(riter, function () {
    throw 2;
  });
} catch (e) {/* empty */}

module.exports = function (exec, skipClosing) {
  if (!skipClosing && !SAFE_CLOSING) return false;
  var safe = false;
  try {
    var arr = [7];
    var iter = arr[ITERATOR]();
    iter.next = function () {
      return { done: safe = true };
    };
    arr[ITERATOR] = function () {
      return iter;
    };
    exec(arr);
  } catch (e) {/* empty */}
  return safe;
};

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// Forced replacement prototype accessors methods

module.exports = __webpack_require__(30) || !__webpack_require__(3)(function () {
  var K = Math.random();
  // In FF throws only define methods
  // eslint-disable-next-line no-undef, no-useless-call
  __defineSetter__.call(null, K, function () {/* empty */});
  delete __webpack_require__(2)[K];
});

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


exports.f = Object.getOwnPropertySymbols;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var classof = __webpack_require__(43);
var builtinExec = RegExp.prototype.exec;

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if ((typeof result === 'undefined' ? 'undefined' : _typeof(result)) !== 'object') {
      throw new TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }
  if (classof(R) !== 'RegExp') {
    throw new TypeError('RegExp#exec called on incompatible receiver');
  }
  return builtinExec.call(R, S);
};

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/

var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var ctx = __webpack_require__(20);
var forOf = __webpack_require__(33);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { from: function from(source /* , mapFn, thisArg */) {
      var mapFn = arguments[1];
      var mapping, A, n, cb;
      aFunction(this);
      mapping = mapFn !== undefined;
      if (mapping) aFunction(mapFn);
      if (source == undefined) return new this();
      A = [];
      if (mapping) {
        n = 0;
        cb = ctx(mapFn, arguments[2], 2);
        forOf(source, false, function (nextItem) {
          A.push(cb(nextItem, n++));
        });
      } else {
        forOf(source, false, A.push, A);
      }
      return new this(A);
    } });
};

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-setmap-offrom/

var $export = __webpack_require__(0);

module.exports = function (COLLECTION) {
  $export($export.S, COLLECTION, { of: function of() {
      var length = arguments.length;
      var A = new Array(length);
      while (length--) {
        A[length] = arguments[length];
      }return new this(A);
    } });
};

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(22);
var defined = __webpack_require__(24);
// true  -> String#at
// false -> String#codePointAt
module.exports = function (TO_STRING) {
  return function (that, pos) {
    var s = String(defined(that));
    var i = toInteger(pos);
    var l = s.length;
    var a, b;
    if (i < 0 || i >= l) return TO_STRING ? '' : undefined;
    a = s.charCodeAt(i);
    return a < 0xd800 || a > 0xdbff || i + 1 === l || (b = s.charCodeAt(i + 1)) < 0xdc00 || b > 0xdfff ? TO_STRING ? s.charAt(i) : a : TO_STRING ? s.slice(i, i + 2) : (a - 0xd800 << 10) + (b - 0xdc00) + 0x10000;
  };
};

/***/ },
/* 64 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var uid = __webpack_require__(41);
var TYPED = uid('typed_array');
var VIEW = uid('view');
var ABV = !!(global.ArrayBuffer && global.DataView);
var CONSTR = ABV;
var i = 0;
var l = 9;
var Typed;

var TypedArrayConstructors = 'Int8Array,Uint8Array,Uint8ClampedArray,Int16Array,Uint16Array,Int32Array,Uint32Array,Float32Array,Float64Array'.split(',');

while (i < l) {
  if (Typed = global[TypedArrayConstructors[i++]]) {
    hide(Typed.prototype, TYPED, true);
    hide(Typed.prototype, VIEW, true);
  } else CONSTR = false;
}

module.exports = {
  ABV: ABV,
  CONSTR: CONSTR,
  TYPED: TYPED,
  VIEW: VIEW
};

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var navigator = global.navigator;

module.exports = navigator && navigator.userAgent || '';

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var at = __webpack_require__(63)(true);

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? at(S, index).length : 1);
};

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)


var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(40);
var toLength = __webpack_require__(6);
module.exports = function fill(value /* , start = 0, end = @length */) {
  var O = toObject(this);
  var length = toLength(O.length);
  var aLen = arguments.length;
  var index = toAbsoluteIndex(aLen > 1 ? arguments[1] : undefined, length);
  var end = aLen > 2 ? arguments[2] : undefined;
  var endPos = end === undefined ? length : toAbsoluteIndex(end, length);
  while (endPos > index) {
    O[index++] = value;
  }return O;
};

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 9.4.2.3 ArraySpeciesCreate(originalArray, length)
var speciesConstructor = __webpack_require__(147);

module.exports = function (original, length) {
  return new (speciesConstructor(original))(length);
};

/***/ },
/* 69 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $defineProperty = __webpack_require__(8);
var createDesc = __webpack_require__(37);

module.exports = function (object, index, value) {
  if (index in object) $defineProperty.f(object, index, createDesc(0, value));else object[index] = value;
};

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var document = __webpack_require__(2).document;
// typeof document.createElement is 'object' in old IE
var is = isObject(document) && isObject(document.createElement);
module.exports = function (it) {
  return is ? document.createElement(it) : {};
};

/***/ },
/* 71 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// IE 8- don't enum bug keys
module.exports = 'constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf'.split(',');

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var MATCH = __webpack_require__(5)('match');
module.exports = function (KEY) {
  var re = /./;
  try {
    '/./'[KEY](re);
  } catch (e) {
    try {
      re[MATCH] = false;
      return !'/./'[KEY](re);
    } catch (f) {/* empty */}
  }return true;
};

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var document = __webpack_require__(2).document;
module.exports = document && document.documentElement;

/***/ },
/* 74 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var setPrototypeOf = __webpack_require__(83).set;
module.exports = function (that, target, C) {
  var S = target.constructor;
  var P;
  if (S !== C && typeof S == 'function' && (P = S.prototype) !== C.prototype && isObject(P) && setPrototypeOf) {
    setPrototypeOf(that, P);
  }return that;
};

/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// check on default Array iterator
var Iterators = __webpack_require__(44);
var ITERATOR = __webpack_require__(5)('iterator');
var ArrayProto = Array.prototype;

module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayProto[ITERATOR] === it);
};

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var create = __webpack_require__(34);
var descriptor = __webpack_require__(37);
var setToStringTag = __webpack_require__(45);
var IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
__webpack_require__(11)(IteratorPrototype, __webpack_require__(5)('iterator'), function () {
  return this;
});

module.exports = function (Constructor, NAME, next) {
  Constructor.prototype = create(IteratorPrototype, { next: descriptor(1, next) });
  setToStringTag(Constructor, NAME + ' Iterator');
};

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(30);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var $iterCreate = __webpack_require__(76);
var setToStringTag = __webpack_require__(45);
var getPrototypeOf = __webpack_require__(16);
var ITERATOR = __webpack_require__(5)('iterator');
var BUGGY = !([].keys && 'next' in [].keys()); // Safari has buggy iterators w/o `next`
var FF_ITERATOR = '@@iterator';
var KEYS = 'keys';
var VALUES = 'values';

var returnThis = function returnThis() {
  return this;
};

module.exports = function (Base, NAME, Constructor, next, DEFAULT, IS_SET, FORCED) {
  $iterCreate(Constructor, NAME, next);
  var getMethod = function getMethod(kind) {
    if (!BUGGY && kind in proto) return proto[kind];
    switch (kind) {
      case KEYS:
        return function keys() {
          return new Constructor(this, kind);
        };
      case VALUES:
        return function values() {
          return new Constructor(this, kind);
        };
    }return function entries() {
      return new Constructor(this, kind);
    };
  };
  var TAG = NAME + ' Iterator';
  var DEF_VALUES = DEFAULT == VALUES;
  var VALUES_BUG = false;
  var proto = Base.prototype;
  var $native = proto[ITERATOR] || proto[FF_ITERATOR] || DEFAULT && proto[DEFAULT];
  var $default = $native || getMethod(DEFAULT);
  var $entries = DEFAULT ? !DEF_VALUES ? $default : getMethod('entries') : undefined;
  var $anyNative = NAME == 'Array' ? proto.entries || $native : $native;
  var methods, key, IteratorPrototype;
  // Fix native
  if ($anyNative) {
    IteratorPrototype = getPrototypeOf($anyNative.call(new Base()));
    if (IteratorPrototype !== Object.prototype && IteratorPrototype.next) {
      // Set @@toStringTag to native iterators
      setToStringTag(IteratorPrototype, TAG, true);
      // fix for some old engines
      if (!LIBRARY && typeof IteratorPrototype[ITERATOR] != 'function') hide(IteratorPrototype, ITERATOR, returnThis);
    }
  }
  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEF_VALUES && $native && $native.name !== VALUES) {
    VALUES_BUG = true;
    $default = function values() {
      return $native.call(this);
    };
  }
  // Define iterator
  if ((!LIBRARY || FORCED) && (BUGGY || VALUES_BUG || !proto[ITERATOR])) {
    hide(proto, ITERATOR, $default);
  }
  // Plug for library
  Iterators[NAME] = $default;
  Iterators[TAG] = returnThis;
  if (DEFAULT) {
    methods = {
      values: DEF_VALUES ? $default : getMethod(VALUES),
      keys: IS_SET ? $default : getMethod(KEYS),
      entries: $entries
    };
    if (FORCED) for (key in methods) {
      if (!(key in proto)) redefine(proto, key, methods[key]);
    } else $export($export.P + $export.F * (BUGGY || VALUES_BUG), NAME, methods);
  }
  return methods;
};

/***/ },
/* 78 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.14 Math.expm1(x)
var $expm1 = Math.expm1;
module.exports = !$expm1
// Old FF bug
|| $expm1(10) > 22025.465794806719 || $expm1(10) < 22025.4657948067165168
// Tor Browser bug
|| $expm1(-2e-17) != -2e-17 ? function expm1(x) {
  return (x = +x) == 0 ? x : x > -1e-6 && x < 1e-6 ? x + x * x / 2 : Math.exp(x) - 1;
} : $expm1;

/***/ },
/* 79 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.28 Math.sign(x)
module.exports = Math.sign || function sign(x) {
  // eslint-disable-next-line no-self-compare
  return (x = +x) == 0 || x != x ? x : x < 0 ? -1 : 1;
};

/***/ },
/* 80 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var macrotask = __webpack_require__(88).set;
var Observer = global.MutationObserver || global.WebKitMutationObserver;
var process = global.process;
var Promise = global.Promise;
var isNode = __webpack_require__(18)(process) == 'process';

module.exports = function () {
  var head, last, notify;

  var flush = function flush() {
    var parent, fn;
    if (isNode && (parent = process.domain)) parent.exit();
    while (head) {
      fn = head.fn;
      head = head.next;
      try {
        fn();
      } catch (e) {
        if (head) notify();else last = undefined;
        throw e;
      }
    }last = undefined;
    if (parent) parent.enter();
  };

  // Node.js
  if (isNode) {
    notify = function notify() {
      process.nextTick(flush);
    };
    // browsers with MutationObserver, except iOS Safari - https://github.com/zloirock/core-js/issues/339
  } else if (Observer && !(global.navigator && global.navigator.standalone)) {
    var toggle = true;
    var node = document.createTextNode('');
    new Observer(flush).observe(node, { characterData: true }); // eslint-disable-line no-new
    notify = function notify() {
      node.data = toggle = !toggle;
    };
    // environments with maybe non-completely correct, but existent Promise
  } else if (Promise && Promise.resolve) {
    // Promise.resolve without an argument throws an error in LG WebOS 2
    var promise = Promise.resolve(undefined);
    notify = function notify() {
      promise.then(flush);
    };
    // for other environments - macrotask based on:
    // - setImmediate
    // - MessageChannel
    // - window.postMessag
    // - onreadystatechange
    // - setTimeout
  } else {
    notify = function notify() {
      // strange IE + webpack dev server bug - use .call(global)
      macrotask.call(global, flush);
    };
  }

  return function (fn) {
    var task = { fn: fn, next: undefined };
    if (last) last.next = task;
    if (!head) {
      head = task;
      notify();
    }last = task;
  };
};

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 25.4.1.5 NewPromiseCapability(C)

var aFunction = __webpack_require__(10);

function PromiseCapability(C) {
  var resolve, reject;
  this.promise = new C(function ($$resolve, $$reject) {
    if (resolve !== undefined || reject !== undefined) throw TypeError('Bad Promise constructor');
    resolve = $$resolve;
    reject = $$reject;
  });
  this.resolve = aFunction(resolve);
  this.reject = aFunction(reject);
}

module.exports.f = function (C) {
  return new PromiseCapability(C);
};

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var regexpFlags = __webpack_require__(47);

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var LAST_INDEX = 'lastIndex';

var UPDATES_LAST_INDEX_WRONG = function () {
  var re1 = /a/,
      re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1[LAST_INDEX] !== 0 || re2[LAST_INDEX] !== 0;
}();

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + re.source + '$(?!\\s)', regexpFlags.call(re));
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re[LAST_INDEX];

    match = nativeExec.call(re, str);

    if (UPDATES_LAST_INDEX_WRONG && match) {
      re[LAST_INDEX] = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      // eslint-disable-next-line no-loop-func
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);
var check = function check(O, proto) {
  anObject(O);
  if (!isObject(proto) && proto !== null) throw TypeError(proto + ": can't set as prototype!");
};
module.exports = {
  set: Object.setPrototypeOf || ('__proto__' in {} ? // eslint-disable-line
  function (test, buggy, set) {
    try {
      set = __webpack_require__(20)(Function.call, __webpack_require__(15).f(Object.prototype, '__proto__').set, 2);
      set(test, []);
      buggy = !(test instanceof Array);
    } catch (e) {
      buggy = true;
    }
    return function setPrototypeOf(O, proto) {
      check(O, proto);
      if (buggy) O.__proto__ = proto;else set(O, proto);
      return O;
    };
  }({}, false) : undefined),
  check: check
};

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var shared = __webpack_require__(50)('keys');
var uid = __webpack_require__(41);
module.exports = function (key) {
  return shared[key] || (shared[key] = uid(key));
};

/***/ },
/* 85 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// helper for String#{startsWith, endsWith, includes}
var isRegExp = __webpack_require__(56);
var defined = __webpack_require__(24);

module.exports = function (that, searchString, NAME) {
  if (isRegExp(searchString)) throw TypeError('String#' + NAME + " doesn't accept regex!");
  return String(defined(that));
};

/***/ },
/* 86 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var toInteger = __webpack_require__(22);
var defined = __webpack_require__(24);

module.exports = function repeat(count) {
  var str = String(defined(this));
  var res = '';
  var n = toInteger(count);
  if (n < 0 || n == Infinity) throw RangeError("Count can't be negative");
  for (; n > 0; (n >>>= 1) && (str += str)) {
    if (n & 1) res += str;
  }return res;
};

/***/ },
/* 87 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = '\t\n\x0B\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003' + '\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(20);
var invoke = __webpack_require__(104);
var html = __webpack_require__(73);
var cel = __webpack_require__(70);
var global = __webpack_require__(2);
var process = global.process;
var setTask = global.setImmediate;
var clearTask = global.clearImmediate;
var MessageChannel = global.MessageChannel;
var Dispatch = global.Dispatch;
var counter = 0;
var queue = {};
var ONREADYSTATECHANGE = 'onreadystatechange';
var defer, channel, port;
var run = function run() {
  var id = +this;
  // eslint-disable-next-line no-prototype-builtins
  if (queue.hasOwnProperty(id)) {
    var fn = queue[id];
    delete queue[id];
    fn();
  }
};
var listener = function listener(event) {
  run.call(event.data);
};
// Node.js 0.9+ & IE10+ has setImmediate, otherwise:
if (!setTask || !clearTask) {
  setTask = function setImmediate(fn) {
    var args = [];
    var i = 1;
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }queue[++counter] = function () {
      // eslint-disable-next-line no-new-func
      invoke(typeof fn == 'function' ? fn : Function(fn), args);
    };
    defer(counter);
    return counter;
  };
  clearTask = function clearImmediate(id) {
    delete queue[id];
  };
  // Node.js 0.8-
  if (__webpack_require__(18)(process) == 'process') {
    defer = function defer(id) {
      process.nextTick(ctx(run, id, 1));
    };
    // Sphere (JS game engine) Dispatch API
  } else if (Dispatch && Dispatch.now) {
    defer = function defer(id) {
      Dispatch.now(ctx(run, id, 1));
    };
    // Browsers with MessageChannel, includes WebWorkers
  } else if (MessageChannel) {
    channel = new MessageChannel();
    port = channel.port2;
    channel.port1.onmessage = listener;
    defer = ctx(port.postMessage, port, 1);
    // Browsers with postMessage, skip WebWorkers
    // IE8 has postMessage, but it's sync & typeof its postMessage is 'object'
  } else if (global.addEventListener && typeof postMessage == 'function' && !global.importScripts) {
    defer = function defer(id) {
      global.postMessage(id + '', '*');
    };
    global.addEventListener('message', listener, false);
    // IE8-
  } else if (ONREADYSTATECHANGE in cel('script')) {
    defer = function defer(id) {
      html.appendChild(cel('script'))[ONREADYSTATECHANGE] = function () {
        html.removeChild(this);
        run.call(id);
      };
    };
    // Rest old browsers
  } else {
    defer = function defer(id) {
      setTimeout(ctx(run, id, 1), 0);
    };
  }
}
module.exports = {
  set: setTask,
  clear: clearTask
};

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var DESCRIPTORS = __webpack_require__(7);
var LIBRARY = __webpack_require__(30);
var $typed = __webpack_require__(64);
var hide = __webpack_require__(11);
var redefineAll = __webpack_require__(38);
var fails = __webpack_require__(3);
var anInstance = __webpack_require__(32);
var toInteger = __webpack_require__(22);
var toLength = __webpack_require__(6);
var toIndex = __webpack_require__(123);
var gOPN = __webpack_require__(35).f;
var dP = __webpack_require__(8).f;
var arrayFill = __webpack_require__(67);
var setToStringTag = __webpack_require__(45);
var ARRAY_BUFFER = 'ArrayBuffer';
var DATA_VIEW = 'DataView';
var PROTOTYPE = 'prototype';
var WRONG_LENGTH = 'Wrong length!';
var WRONG_INDEX = 'Wrong index!';
var $ArrayBuffer = global[ARRAY_BUFFER];
var $DataView = global[DATA_VIEW];
var Math = global.Math;
var RangeError = global.RangeError;
// eslint-disable-next-line no-shadow-restricted-names
var Infinity = global.Infinity;
var BaseBuffer = $ArrayBuffer;
var abs = Math.abs;
var pow = Math.pow;
var floor = Math.floor;
var log = Math.log;
var LN2 = Math.LN2;
var BUFFER = 'buffer';
var BYTE_LENGTH = 'byteLength';
var BYTE_OFFSET = 'byteOffset';
var $BUFFER = DESCRIPTORS ? '_b' : BUFFER;
var $LENGTH = DESCRIPTORS ? '_l' : BYTE_LENGTH;
var $OFFSET = DESCRIPTORS ? '_o' : BYTE_OFFSET;

// IEEE754 conversions based on https://github.com/feross/ieee754
function packIEEE754(value, mLen, nBytes) {
  var buffer = new Array(nBytes);
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var rt = mLen === 23 ? pow(2, -24) - pow(2, -77) : 0;
  var i = 0;
  var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
  var e, m, c;
  value = abs(value);
  // eslint-disable-next-line no-self-compare
  if (value != value || value === Infinity) {
    // eslint-disable-next-line no-self-compare
    m = value != value ? 1 : 0;
    e = eMax;
  } else {
    e = floor(log(value) / LN2);
    if (value * (c = pow(2, -e)) < 1) {
      e--;
      c *= 2;
    }
    if (e + eBias >= 1) {
      value += rt / c;
    } else {
      value += rt * pow(2, 1 - eBias);
    }
    if (value * c >= 2) {
      e++;
      c /= 2;
    }
    if (e + eBias >= eMax) {
      m = 0;
      e = eMax;
    } else if (e + eBias >= 1) {
      m = (value * c - 1) * pow(2, mLen);
      e = e + eBias;
    } else {
      m = value * pow(2, eBias - 1) * pow(2, mLen);
      e = 0;
    }
  }
  for (; mLen >= 8; buffer[i++] = m & 255, m /= 256, mLen -= 8) {}
  e = e << mLen | m;
  eLen += mLen;
  for (; eLen > 0; buffer[i++] = e & 255, e /= 256, eLen -= 8) {}
  buffer[--i] |= s * 128;
  return buffer;
}
function unpackIEEE754(buffer, mLen, nBytes) {
  var eLen = nBytes * 8 - mLen - 1;
  var eMax = (1 << eLen) - 1;
  var eBias = eMax >> 1;
  var nBits = eLen - 7;
  var i = nBytes - 1;
  var s = buffer[i--];
  var e = s & 127;
  var m;
  s >>= 7;
  for (; nBits > 0; e = e * 256 + buffer[i], i--, nBits -= 8) {}
  m = e & (1 << -nBits) - 1;
  e >>= -nBits;
  nBits += mLen;
  for (; nBits > 0; m = m * 256 + buffer[i], i--, nBits -= 8) {}
  if (e === 0) {
    e = 1 - eBias;
  } else if (e === eMax) {
    return m ? NaN : s ? -Infinity : Infinity;
  } else {
    m = m + pow(2, mLen);
    e = e - eBias;
  }return (s ? -1 : 1) * m * pow(2, e - mLen);
}

function unpackI32(bytes) {
  return bytes[3] << 24 | bytes[2] << 16 | bytes[1] << 8 | bytes[0];
}
function packI8(it) {
  return [it & 0xff];
}
function packI16(it) {
  return [it & 0xff, it >> 8 & 0xff];
}
function packI32(it) {
  return [it & 0xff, it >> 8 & 0xff, it >> 16 & 0xff, it >> 24 & 0xff];
}
function packF64(it) {
  return packIEEE754(it, 52, 8);
}
function packF32(it) {
  return packIEEE754(it, 23, 4);
}

function addGetter(C, key, internal) {
  dP(C[PROTOTYPE], key, { get: function get() {
      return this[internal];
    } });
}

function get(view, bytes, index, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = store.slice(start, start + bytes);
  return isLittleEndian ? pack : pack.reverse();
}
function set(view, bytes, index, conversion, value, isLittleEndian) {
  var numIndex = +index;
  var intIndex = toIndex(numIndex);
  if (intIndex + bytes > view[$LENGTH]) throw RangeError(WRONG_INDEX);
  var store = view[$BUFFER]._b;
  var start = intIndex + view[$OFFSET];
  var pack = conversion(+value);
  for (var i = 0; i < bytes; i++) {
    store[start + i] = pack[isLittleEndian ? i : bytes - i - 1];
  }
}

if (!$typed.ABV) {
  $ArrayBuffer = function ArrayBuffer(length) {
    anInstance(this, $ArrayBuffer, ARRAY_BUFFER);
    var byteLength = toIndex(length);
    this._b = arrayFill.call(new Array(byteLength), 0);
    this[$LENGTH] = byteLength;
  };

  $DataView = function DataView(buffer, byteOffset, byteLength) {
    anInstance(this, $DataView, DATA_VIEW);
    anInstance(buffer, $ArrayBuffer, DATA_VIEW);
    var bufferLength = buffer[$LENGTH];
    var offset = toInteger(byteOffset);
    if (offset < 0 || offset > bufferLength) throw RangeError('Wrong offset!');
    byteLength = byteLength === undefined ? bufferLength - offset : toLength(byteLength);
    if (offset + byteLength > bufferLength) throw RangeError(WRONG_LENGTH);
    this[$BUFFER] = buffer;
    this[$OFFSET] = offset;
    this[$LENGTH] = byteLength;
  };

  if (DESCRIPTORS) {
    addGetter($ArrayBuffer, BYTE_LENGTH, '_l');
    addGetter($DataView, BUFFER, '_b');
    addGetter($DataView, BYTE_LENGTH, '_l');
    addGetter($DataView, BYTE_OFFSET, '_o');
  }

  redefineAll($DataView[PROTOTYPE], {
    getInt8: function getInt8(byteOffset) {
      return get(this, 1, byteOffset)[0] << 24 >> 24;
    },
    getUint8: function getUint8(byteOffset) {
      return get(this, 1, byteOffset)[0];
    },
    getInt16: function getInt16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return (bytes[1] << 8 | bytes[0]) << 16 >> 16;
    },
    getUint16: function getUint16(byteOffset /* , littleEndian */) {
      var bytes = get(this, 2, byteOffset, arguments[1]);
      return bytes[1] << 8 | bytes[0];
    },
    getInt32: function getInt32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1]));
    },
    getUint32: function getUint32(byteOffset /* , littleEndian */) {
      return unpackI32(get(this, 4, byteOffset, arguments[1])) >>> 0;
    },
    getFloat32: function getFloat32(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 4, byteOffset, arguments[1]), 23, 4);
    },
    getFloat64: function getFloat64(byteOffset /* , littleEndian */) {
      return unpackIEEE754(get(this, 8, byteOffset, arguments[1]), 52, 8);
    },
    setInt8: function setInt8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setUint8: function setUint8(byteOffset, value) {
      set(this, 1, byteOffset, packI8, value);
    },
    setInt16: function setInt16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setUint16: function setUint16(byteOffset, value /* , littleEndian */) {
      set(this, 2, byteOffset, packI16, value, arguments[2]);
    },
    setInt32: function setInt32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setUint32: function setUint32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packI32, value, arguments[2]);
    },
    setFloat32: function setFloat32(byteOffset, value /* , littleEndian */) {
      set(this, 4, byteOffset, packF32, value, arguments[2]);
    },
    setFloat64: function setFloat64(byteOffset, value /* , littleEndian */) {
      set(this, 8, byteOffset, packF64, value, arguments[2]);
    }
  });
} else {
  if (!fails(function () {
    $ArrayBuffer(1);
  }) || !fails(function () {
    new $ArrayBuffer(-1); // eslint-disable-line no-new
  }) || fails(function () {
    new $ArrayBuffer(); // eslint-disable-line no-new
    new $ArrayBuffer(1.5); // eslint-disable-line no-new
    new $ArrayBuffer(NaN); // eslint-disable-line no-new
    return $ArrayBuffer.name != ARRAY_BUFFER;
  })) {
    $ArrayBuffer = function ArrayBuffer(length) {
      anInstance(this, $ArrayBuffer);
      return new BaseBuffer(toIndex(length));
    };
    var ArrayBufferProto = $ArrayBuffer[PROTOTYPE] = BaseBuffer[PROTOTYPE];
    for (var keys = gOPN(BaseBuffer), j = 0, key; keys.length > j;) {
      if (!((key = keys[j++]) in $ArrayBuffer)) hide($ArrayBuffer, key, BaseBuffer[key]);
    }
    if (!LIBRARY) ArrayBufferProto.constructor = $ArrayBuffer;
  }
  // iOS Safari 7.x bug
  var view = new $DataView(new $ArrayBuffer(2));
  var $setInt8 = $DataView[PROTOTYPE].setInt8;
  view.setInt8(0, 2147483648);
  view.setInt8(1, 2147483649);
  if (view.getInt8(0) || !view.getInt8(1)) redefineAll($DataView[PROTOTYPE], {
    setInt8: function setInt8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    },
    setUint8: function setUint8(byteOffset, value) {
      $setInt8.call(this, byteOffset, value << 24 >> 24);
    }
  }, true);
}
setToStringTag($ArrayBuffer, ARRAY_BUFFER);
setToStringTag($DataView, DATA_VIEW);
hide($DataView[PROTOTYPE], $typed.VIEW, true);
exports[ARRAY_BUFFER] = $ArrayBuffer;
exports[DATA_VIEW] = $DataView;

/***/ },
/* 90 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var core = __webpack_require__(19);
var LIBRARY = __webpack_require__(30);
var wksExt = __webpack_require__(124);
var defineProperty = __webpack_require__(8).f;
module.exports = function (name) {
  var $Symbol = core.Symbol || (core.Symbol = LIBRARY ? {} : global.Symbol || {});
  if (name.charAt(0) != '_' && !(name in $Symbol)) defineProperty($Symbol, name, { value: wksExt.f(name) });
};

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var classof = __webpack_require__(43);
var ITERATOR = __webpack_require__(5)('iterator');
var Iterators = __webpack_require__(44);
module.exports = __webpack_require__(19).getIteratorMethod = function (it) {
  if (it != undefined) return it[ITERATOR] || it['@@iterator'] || Iterators[classof(it)];
};

/***/ },
/* 92 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var addToUnscopables = __webpack_require__(29);
var step = __webpack_require__(107);
var Iterators = __webpack_require__(44);
var toIObject = __webpack_require__(17);

// 22.1.3.4 Array.prototype.entries()
// 22.1.3.13 Array.prototype.keys()
// 22.1.3.29 Array.prototype.values()
// 22.1.3.30 Array.prototype[@@iterator]()
module.exports = __webpack_require__(77)(Array, 'Array', function (iterated, kind) {
  this._t = toIObject(iterated); // target
  this._i = 0; // next index
  this._k = kind; // kind
  // 22.1.5.2.1 %ArrayIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var kind = this._k;
  var index = this._i++;
  if (!O || index >= O.length) {
    this._t = undefined;
    return step(1);
  }
  if (kind == 'keys') return step(0, index);
  if (kind == 'values') return step(0, O[index]);
  return step(0, [index, O[index]]);
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values% (9.4.4.6, 9.4.4.7)
Iterators.Arguments = Iterators.Array;

addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {

__webpack_require__(345);

__webpack_require__(145);

__webpack_require__(146);

if (global._babelPolyfill) {
  throw new Error("only one instance of babel-polyfill is allowed");
}
global._babelPolyfill = true;

var DEFINE_PROPERTY = "defineProperty";
function define(O, key, value) {
  O[key] || Object[DEFINE_PROPERTY](O, key, {
    writable: true,
    configurable: true,
    value: value
  });
}

define(String.prototype, "padLeft", "".padStart);
define(String.prototype, "padRight", "".padEnd);

"pop,reverse,shift,keys,values,entries,indexOf,every,some,forEach,map,filter,find,findIndex,includes,join,slice,concat,push,splice,unshift,sort,lastIndexOf,reduce,reduceRight,copyWithin,fill".split(",").forEach(function (key) {
  [][key] && define(Array, key, Function.call.bind([][key]));
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(130)))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var cof = __webpack_require__(18);
module.exports = function (it, msg) {
  if (typeof it != 'number' && cof(it) != 'Number') throw TypeError(msg);
  return +it;
};

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)


var toObject = __webpack_require__(9);
var toAbsoluteIndex = __webpack_require__(40);
var toLength = __webpack_require__(6);

module.exports = [].copyWithin || function copyWithin(target /* = 0 */, start /* = 0, end = @length */) {
  var O = toObject(this);
  var len = toLength(O.length);
  var to = toAbsoluteIndex(target, len);
  var from = toAbsoluteIndex(start, len);
  var end = arguments.length > 2 ? arguments[2] : undefined;
  var count = Math.min((end === undefined ? len : toAbsoluteIndex(end, len)) - from, len - to);
  var inc = 1;
  if (from < to && to < from + count) {
    inc = -1;
    from += count - 1;
    to += count - 1;
  }
  while (count-- > 0) {
    if (from in O) O[to] = O[from];else delete O[to];
    to += inc;
    from += inc;
  }return O;
};

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var forOf = __webpack_require__(33);

module.exports = function (iter, ITERATOR) {
  var result = [];
  forOf(iter, false, result.push, result, ITERATOR);
  return result;
};

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(48);
var toLength = __webpack_require__(6);

module.exports = function (that, callbackfn, aLen, memo, isRight) {
  aFunction(callbackfn);
  var O = toObject(that);
  var self = IObject(O);
  var length = toLength(O.length);
  var index = isRight ? length - 1 : 0;
  var i = isRight ? -1 : 1;
  if (aLen < 2) for (;;) {
    if (index in self) {
      memo = self[index];
      index += i;
      break;
    }
    index += i;
    if (isRight ? index < 0 : length <= index) {
      throw TypeError('Reduce of empty array with no initial value');
    }
  }
  for (; isRight ? index >= 0 : length > index; index += i) {
    if (index in self) {
      memo = callbackfn(memo, self[index], index, O);
    }
  }return memo;
};

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var aFunction = __webpack_require__(10);
var isObject = __webpack_require__(4);
var invoke = __webpack_require__(104);
var arraySlice = [].slice;
var factories = {};

var construct = function construct(F, len, args) {
  if (!(len in factories)) {
    for (var n = [], i = 0; i < len; i++) {
      n[i] = 'a[' + i + ']';
    } // eslint-disable-next-line no-new-func
    factories[len] = Function('F,a', 'return new F(' + n.join(',') + ')');
  }return factories[len](F, args);
};

module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = arraySlice.call(arguments, 1);
  var bound = function bound() /* args... */{
    var args = partArgs.concat(arraySlice.call(arguments));
    return this instanceof bound ? construct(fn, args.length, args) : invoke(fn, args, that);
  };
  if (isObject(fn.prototype)) bound.prototype = fn.prototype;
  return bound;
};

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(8).f;
var create = __webpack_require__(34);
var redefineAll = __webpack_require__(38);
var ctx = __webpack_require__(20);
var anInstance = __webpack_require__(32);
var forOf = __webpack_require__(33);
var $iterDefine = __webpack_require__(77);
var step = __webpack_require__(107);
var setSpecies = __webpack_require__(39);
var DESCRIPTORS = __webpack_require__(7);
var fastKey = __webpack_require__(31).fastKey;
var validate = __webpack_require__(42);
var SIZE = DESCRIPTORS ? '_s' : 'size';

var getEntry = function getEntry(that, key) {
  // fast case
  var index = fastKey(key);
  var entry;
  if (index !== 'F') return that._i[index];
  // frozen object case
  for (entry = that._f; entry; entry = entry.n) {
    if (entry.k == key) return entry;
  }
};

module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = create(null); // index
      that._f = undefined; // first entry
      that._l = undefined; // last entry
      that[SIZE] = 0; // size
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.1.3.1 Map.prototype.clear()
      // 23.2.3.2 Set.prototype.clear()
      clear: function clear() {
        for (var that = validate(this, NAME), data = that._i, entry = that._f; entry; entry = entry.n) {
          entry.r = true;
          if (entry.p) entry.p = entry.p.n = undefined;
          delete data[entry.i];
        }
        that._f = that._l = undefined;
        that[SIZE] = 0;
      },
      // 23.1.3.3 Map.prototype.delete(key)
      // 23.2.3.4 Set.prototype.delete(value)
      'delete': function _delete(key) {
        var that = validate(this, NAME);
        var entry = getEntry(that, key);
        if (entry) {
          var next = entry.n;
          var prev = entry.p;
          delete that._i[entry.i];
          entry.r = true;
          if (prev) prev.n = next;
          if (next) next.p = prev;
          if (that._f == entry) that._f = next;
          if (that._l == entry) that._l = prev;
          that[SIZE]--;
        }return !!entry;
      },
      // 23.2.3.6 Set.prototype.forEach(callbackfn, thisArg = undefined)
      // 23.1.3.5 Map.prototype.forEach(callbackfn, thisArg = undefined)
      forEach: function forEach(callbackfn /* , that = undefined */) {
        validate(this, NAME);
        var f = ctx(callbackfn, arguments.length > 1 ? arguments[1] : undefined, 3);
        var entry;
        while (entry = entry ? entry.n : this._f) {
          f(entry.v, entry.k, this);
          // revert to the last existing entry
          while (entry && entry.r) {
            entry = entry.p;
          }
        }
      },
      // 23.1.3.7 Map.prototype.has(key)
      // 23.2.3.7 Set.prototype.has(value)
      has: function has(key) {
        return !!getEntry(validate(this, NAME), key);
      }
    });
    if (DESCRIPTORS) dP(C.prototype, 'size', {
      get: function get() {
        return validate(this, NAME)[SIZE];
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var entry = getEntry(that, key);
    var prev, index;
    // change existing entry
    if (entry) {
      entry.v = value;
      // create new entry
    } else {
      that._l = entry = {
        i: index = fastKey(key, true), // <- index
        k: key, // <- key
        v: value, // <- value
        p: prev = that._l, // <- previous entry
        n: undefined, // <- next entry
        r: false // <- removed
      };
      if (!that._f) that._f = entry;
      if (prev) prev.n = entry;
      that[SIZE]++;
      // add to index
      if (index !== 'F') that._i[index] = entry;
    }return that;
  },
  getEntry: getEntry,
  setStrong: function setStrong(C, NAME, IS_MAP) {
    // add .keys, .values, .entries, [@@iterator]
    // 23.1.3.4, 23.1.3.8, 23.1.3.11, 23.1.3.12, 23.2.3.5, 23.2.3.8, 23.2.3.10, 23.2.3.11
    $iterDefine(C, NAME, function (iterated, kind) {
      this._t = validate(iterated, NAME); // target
      this._k = kind; // kind
      this._l = undefined; // previous
    }, function () {
      var that = this;
      var kind = that._k;
      var entry = that._l;
      // revert to the last existing entry
      while (entry && entry.r) {
        entry = entry.p;
      } // get next entry
      if (!that._t || !(that._l = entry = entry ? entry.n : that._t._f)) {
        // or finish the iteration
        that._t = undefined;
        return step(1);
      }
      // return step by kind
      if (kind == 'keys') return step(0, entry.k);
      if (kind == 'values') return step(0, entry.v);
      return step(0, [entry.k, entry.v]);
    }, IS_MAP ? 'entries' : 'values', !IS_MAP, true);

    // add [@@species], 23.1.2.2, 23.2.2.2
    setSpecies(NAME);
  }
};

/***/ },
/* 100 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var classof = __webpack_require__(43);
var from = __webpack_require__(96);
module.exports = function (NAME) {
  return function toJSON() {
    if (classof(this) != NAME) throw TypeError(NAME + "#toJSON isn't generic");
    return from(this);
  };
};

/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var redefineAll = __webpack_require__(38);
var getWeak = __webpack_require__(31).getWeak;
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var anInstance = __webpack_require__(32);
var forOf = __webpack_require__(33);
var createArrayMethod = __webpack_require__(23);
var $has = __webpack_require__(14);
var validate = __webpack_require__(42);
var arrayFind = createArrayMethod(5);
var arrayFindIndex = createArrayMethod(6);
var id = 0;

// fallback for uncaught frozen keys
var uncaughtFrozenStore = function uncaughtFrozenStore(that) {
  return that._l || (that._l = new UncaughtFrozenStore());
};
var UncaughtFrozenStore = function UncaughtFrozenStore() {
  this.a = [];
};
var findUncaughtFrozen = function findUncaughtFrozen(store, key) {
  return arrayFind(store.a, function (it) {
    return it[0] === key;
  });
};
UncaughtFrozenStore.prototype = {
  get: function get(key) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) return entry[1];
  },
  has: function has(key) {
    return !!findUncaughtFrozen(this, key);
  },
  set: function set(key, value) {
    var entry = findUncaughtFrozen(this, key);
    if (entry) entry[1] = value;else this.a.push([key, value]);
  },
  'delete': function _delete(key) {
    var index = arrayFindIndex(this.a, function (it) {
      return it[0] === key;
    });
    if (~index) this.a.splice(index, 1);
    return !!~index;
  }
};

module.exports = {
  getConstructor: function getConstructor(wrapper, NAME, IS_MAP, ADDER) {
    var C = wrapper(function (that, iterable) {
      anInstance(that, C, NAME, '_i');
      that._t = NAME; // collection type
      that._i = id++; // collection id
      that._l = undefined; // leak store for uncaught frozen objects
      if (iterable != undefined) forOf(iterable, IS_MAP, that[ADDER], that);
    });
    redefineAll(C.prototype, {
      // 23.3.3.2 WeakMap.prototype.delete(key)
      // 23.4.3.3 WeakSet.prototype.delete(value)
      'delete': function _delete(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME))['delete'](key);
        return data && $has(data, this._i) && delete data[this._i];
      },
      // 23.3.3.4 WeakMap.prototype.has(key)
      // 23.4.3.4 WeakSet.prototype.has(value)
      has: function has(key) {
        if (!isObject(key)) return false;
        var data = getWeak(key);
        if (data === true) return uncaughtFrozenStore(validate(this, NAME)).has(key);
        return data && $has(data, this._i);
      }
    });
    return C;
  },
  def: function def(that, key, value) {
    var data = getWeak(anObject(key), true);
    if (data === true) uncaughtFrozenStore(that).set(key, value);else data[that._i] = value;
    return that;
  },
  ufstore: uncaughtFrozenStore
};

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-FlattenIntoArray

var isArray = __webpack_require__(55);
var isObject = __webpack_require__(4);
var toLength = __webpack_require__(6);
var ctx = __webpack_require__(20);
var IS_CONCAT_SPREADABLE = __webpack_require__(5)('isConcatSpreadable');

function flattenIntoArray(target, original, source, sourceLen, start, depth, mapper, thisArg) {
  var targetIndex = start;
  var sourceIndex = 0;
  var mapFn = mapper ? ctx(mapper, thisArg, 3) : false;
  var element, spreadable;

  while (sourceIndex < sourceLen) {
    if (sourceIndex in source) {
      element = mapFn ? mapFn(source[sourceIndex], sourceIndex, original) : source[sourceIndex];

      spreadable = false;
      if (isObject(element)) {
        spreadable = element[IS_CONCAT_SPREADABLE];
        spreadable = spreadable !== undefined ? !!spreadable : isArray(element);
      }

      if (spreadable && depth > 0) {
        targetIndex = flattenIntoArray(target, original, element, toLength(element.length), targetIndex, depth - 1) - 1;
      } else {
        if (targetIndex >= 0x1fffffffffffff) throw TypeError();
        target[targetIndex] = element;
      }

      targetIndex++;
    }
    sourceIndex++;
  }
  return targetIndex;
}

module.exports = flattenIntoArray;

/***/ },
/* 103 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = !__webpack_require__(7) && !__webpack_require__(3)(function () {
  return Object.defineProperty(__webpack_require__(70)('div'), 'a', { get: function get() {
      return 7;
    } }).a != 7;
});

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// fast apply, http://jsperf.lnkit.com/fast-apply/5
module.exports = function (fn, args, that) {
                  var un = that === undefined;
                  switch (args.length) {
                                    case 0:
                                                      return un ? fn() : fn.call(that);
                                    case 1:
                                                      return un ? fn(args[0]) : fn.call(that, args[0]);
                                    case 2:
                                                      return un ? fn(args[0], args[1]) : fn.call(that, args[0], args[1]);
                                    case 3:
                                                      return un ? fn(args[0], args[1], args[2]) : fn.call(that, args[0], args[1], args[2]);
                                    case 4:
                                                      return un ? fn(args[0], args[1], args[2], args[3]) : fn.call(that, args[0], args[1], args[2], args[3]);
                  }return fn.apply(that, args);
};

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.3 Number.isInteger(number)
var isObject = __webpack_require__(4);
var floor = Math.floor;
module.exports = function isInteger(it) {
  return !isObject(it) && isFinite(it) && floor(it) === it;
};

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// call something on iterator step with safe closing on error
var anObject = __webpack_require__(1);
module.exports = function (iterator, fn, value, entries) {
  try {
    return entries ? fn(anObject(value)[0], value[1]) : fn(value);
    // 7.4.6 IteratorClose(iterator, completion)
  } catch (e) {
    var ret = iterator['return'];
    if (ret !== undefined) anObject(ret.call(iterator));
    throw e;
  }
};

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (done, value) {
  return { value: value, done: !!done };
};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.16 Math.fround(x)
var sign = __webpack_require__(79);
var pow = Math.pow;
var EPSILON = pow(2, -52);
var EPSILON32 = pow(2, -23);
var MAX32 = pow(2, 127) * (2 - EPSILON32);
var MIN32 = pow(2, -126);

var roundTiesToEven = function roundTiesToEven(n) {
  return n + 1 / EPSILON - 1 / EPSILON;
};

module.exports = Math.fround || function fround(x) {
  var $abs = Math.abs(x);
  var $sign = sign(x);
  var a, result;
  if ($abs < MIN32) return $sign * roundTiesToEven($abs / MIN32 / EPSILON32) * MIN32 * EPSILON32;
  a = (1 + EPSILON32 / EPSILON) * $abs;
  result = a - (a - $abs);
  // eslint-disable-next-line no-self-compare
  if (result > MAX32 || result != result) return $sign * Infinity;
  return $sign * result;
};

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.20 Math.log1p(x)
module.exports = Math.log1p || function log1p(x) {
  return (x = +x) > -1e-8 && x < 1e-8 ? x - x * x / 2 : Math.log(1 + x);
};

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
module.exports = Math.scale || function scale(x, inLow, inHigh, outLow, outHigh) {
  if (arguments.length === 0
  // eslint-disable-next-line no-self-compare
  || x != x
  // eslint-disable-next-line no-self-compare
  || inLow != inLow
  // eslint-disable-next-line no-self-compare
  || inHigh != inHigh
  // eslint-disable-next-line no-self-compare
  || outLow != outLow
  // eslint-disable-next-line no-self-compare
  || outHigh != outHigh) return NaN;
  if (x === Infinity || x === -Infinity) return x;
  return (x - inLow) * (outHigh - outLow) / (inHigh - inLow) + outLow;
};

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 19.1.2.1 Object.assign(target, source, ...)

var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(49);
var toObject = __webpack_require__(9);
var IObject = __webpack_require__(48);
var $assign = Object.assign;

// should work with symbols and should have deterministic property order (V8 bug)
module.exports = !$assign || __webpack_require__(3)(function () {
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var S = Symbol();
  var K = 'abcdefghijklmnopqrst';
  A[S] = 7;
  K.split('').forEach(function (k) {
    B[k] = k;
  });
  return $assign({}, A)[S] != 7 || Object.keys($assign({}, B)).join('') != K;
}) ? function assign(target, source) {
  // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var aLen = arguments.length;
  var index = 1;
  var getSymbols = gOPS.f;
  var isEnum = pIE.f;
  while (aLen > index) {
    var S = IObject(arguments[index++]);
    var keys = getSymbols ? getKeys(S).concat(getSymbols(S)) : getKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      if (isEnum.call(S, key = keys[j++])) T[key] = S[key];
    }
  }return T;
} : $assign;

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(8);
var anObject = __webpack_require__(1);
var getKeys = __webpack_require__(36);

module.exports = __webpack_require__(7) ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = getKeys(Properties);
  var length = keys.length;
  var i = 0;
  var P;
  while (length > i) {
    dP.f(O, P = keys[i++], Properties[P]);
  }return O;
};

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
var toIObject = __webpack_require__(17);
var gOPN = __webpack_require__(35).f;
var toString = {}.toString;

var windowNames = (typeof window === 'undefined' ? 'undefined' : _typeof(window)) == 'object' && window && Object.getOwnPropertyNames ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function getWindowNames(it) {
  try {
    return gOPN(it);
  } catch (e) {
    return windowNames.slice();
  }
};

module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]' ? getWindowNames(it) : gOPN(toIObject(it));
};

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var has = __webpack_require__(14);
var toIObject = __webpack_require__(17);
var arrayIndexOf = __webpack_require__(52)(false);
var IE_PROTO = __webpack_require__(84)('IE_PROTO');

module.exports = function (object, names) {
  var O = toIObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) {
    if (key != IE_PROTO) has(O, key) && result.push(key);
  } // Don't enum bug & hidden keys
  while (names.length > i) {
    if (has(O, key = names[i++])) {
      ~arrayIndexOf(result, key) || result.push(key);
    }
  }return result;
};

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var getKeys = __webpack_require__(36);
var toIObject = __webpack_require__(17);
var isEnum = __webpack_require__(49).f;
module.exports = function (isEntries) {
  return function (it) {
    var O = toIObject(it);
    var keys = getKeys(O);
    var length = keys.length;
    var i = 0;
    var result = [];
    var key;
    while (length > i) {
      if (isEnum.call(O, key = keys[i++])) {
        result.push(isEntries ? [key, O[key]] : O[key]);
      }
    }return result;
  };
};

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// all object keys, includes non-enumerable and symbols
var gOPN = __webpack_require__(35);
var gOPS = __webpack_require__(59);
var anObject = __webpack_require__(1);
var Reflect = __webpack_require__(2).Reflect;
module.exports = Reflect && Reflect.ownKeys || function ownKeys(it) {
  var keys = gOPN.f(anObject(it));
  var getSymbols = gOPS.f;
  return getSymbols ? keys.concat(getSymbols(it)) : keys;
};

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $parseFloat = __webpack_require__(2).parseFloat;
var $trim = __webpack_require__(46).trim;

module.exports = 1 / $parseFloat(__webpack_require__(87) + '-0') !== -Infinity ? function parseFloat(str) {
  var string = $trim(String(str), 3);
  var result = $parseFloat(string);
  return result === 0 && string.charAt(0) == '-' ? -0 : result;
} : $parseFloat;

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $parseInt = __webpack_require__(2).parseInt;
var $trim = __webpack_require__(46).trim;
var ws = __webpack_require__(87);
var hex = /^[-+]?0[xX]/;

module.exports = $parseInt(ws + '08') !== 8 || $parseInt(ws + '0x16') !== 22 ? function parseInt(str, radix) {
  var string = $trim(String(str), 3);
  return $parseInt(string, radix >>> 0 || (hex.test(string) ? 16 : 10));
} : $parseInt;

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (exec) {
  try {
    return { e: false, v: exec() };
  } catch (e) {
    return { e: true, v: e };
  }
};

/***/ },
/* 120 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var newPromiseCapability = __webpack_require__(81);

module.exports = function (C, x) {
  anObject(C);
  if (isObject(x) && x.constructor === C) return x;
  var promiseCapability = newPromiseCapability.f(C);
  var resolve = promiseCapability.resolve;
  resolve(x);
  return promiseCapability.promise;
};

/***/ },
/* 121 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 7.2.9 SameValue(x, y)
module.exports = Object.is || function is(x, y) {
  // eslint-disable-next-line no-self-compare
  return x === y ? x !== 0 || 1 / x === 1 / y : x != x && y != y;
};

/***/ },
/* 122 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-string-pad-start-end
var toLength = __webpack_require__(6);
var repeat = __webpack_require__(86);
var defined = __webpack_require__(24);

module.exports = function (that, maxLength, fillString, left) {
  var S = String(defined(that));
  var stringLength = S.length;
  var fillStr = fillString === undefined ? ' ' : String(fillString);
  var intMaxLength = toLength(maxLength);
  if (intMaxLength <= stringLength || fillStr == '') return S;
  var fillLen = intMaxLength - stringLength;
  var stringFiller = repeat.call(fillStr, Math.ceil(fillLen / fillStr.length));
  if (stringFiller.length > fillLen) stringFiller = stringFiller.slice(0, fillLen);
  return left ? stringFiller + S : S + stringFiller;
};

/***/ },
/* 123 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/ecma262/#sec-toindex
var toInteger = __webpack_require__(22);
var toLength = __webpack_require__(6);
module.exports = function (it) {
  if (it === undefined) return 0;
  var number = toInteger(it);
  var length = toLength(number);
  if (number !== length) throw RangeError('Wrong length!');
  return length;
};

/***/ },
/* 124 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


exports.f = __webpack_require__(5);

/***/ },
/* 125 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(99);
var validate = __webpack_require__(42);
var MAP = 'Map';

// 23.1 Map Objects
module.exports = __webpack_require__(53)(MAP, function (get) {
  return function Map() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.1.3.6 Map.prototype.get(key)
  get: function get(key) {
    var entry = strong.getEntry(validate(this, MAP), key);
    return entry && entry.v;
  },
  // 23.1.3.9 Map.prototype.set(key, value)
  set: function set(key, value) {
    return strong.def(validate(this, MAP), key === 0 ? 0 : key, value);
  }
}, strong, true);

/***/ },
/* 126 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var regexpExec = __webpack_require__(82);
__webpack_require__(0)({
  target: 'RegExp',
  proto: true,
  forced: regexpExec !== /./.exec
}, {
  exec: regexpExec
});

/***/ },
/* 127 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 21.2.5.3 get RegExp.prototype.flags()
if (__webpack_require__(7) && /./g.flags != 'g') __webpack_require__(8).f(RegExp.prototype, 'flags', {
  configurable: true,
  get: __webpack_require__(47)
});

/***/ },
/* 128 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var strong = __webpack_require__(99);
var validate = __webpack_require__(42);
var SET = 'Set';

// 23.2 Set Objects
module.exports = __webpack_require__(53)(SET, function (get) {
  return function Set() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.2.3.1 Set.prototype.add(value)
  add: function add(value) {
    return strong.def(validate(this, SET), value = value === 0 ? 0 : value, value);
  }
}, strong);

/***/ },
/* 129 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var each = __webpack_require__(23)(0);
var redefine = __webpack_require__(12);
var meta = __webpack_require__(31);
var assign = __webpack_require__(111);
var weak = __webpack_require__(101);
var isObject = __webpack_require__(4);
var validate = __webpack_require__(42);
var NATIVE_WEAK_MAP = __webpack_require__(42);
var IS_IE11 = !global.ActiveXObject && 'ActiveXObject' in global;
var WEAK_MAP = 'WeakMap';
var getWeak = meta.getWeak;
var isExtensible = Object.isExtensible;
var uncaughtFrozenStore = weak.ufstore;
var InternalMap;

var wrapper = function wrapper(get) {
  return function WeakMap() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
};

var methods = {
  // 23.3.3.3 WeakMap.prototype.get(key)
  get: function get(key) {
    if (isObject(key)) {
      var data = getWeak(key);
      if (data === true) return uncaughtFrozenStore(validate(this, WEAK_MAP)).get(key);
      return data ? data[this._i] : undefined;
    }
  },
  // 23.3.3.5 WeakMap.prototype.set(key, value)
  set: function set(key, value) {
    return weak.def(validate(this, WEAK_MAP), key, value);
  }
};

// 23.3 WeakMap Objects
var $WeakMap = module.exports = __webpack_require__(53)(WEAK_MAP, wrapper, methods, weak, true, true);

// IE11 WeakMap frozen keys fix
if (NATIVE_WEAK_MAP && IS_IE11) {
  InternalMap = weak.getConstructor(wrapper, WEAK_MAP);
  assign(InternalMap.prototype, methods);
  meta.NEED = true;
  each(['delete', 'has', 'get', 'set'], function (key) {
    var proto = $WeakMap.prototype;
    var method = proto[key];
    redefine(proto, key, function (a, b) {
      // store frozen objects on internal weakmap shim
      if (isObject(a) && !isExtensible(a)) {
        if (!this._f) this._f = new InternalMap();
        var result = this._f[key](a, b);
        return key == 'set' ? this : result;
        // store all the rest on native weakmap
      }return method.call(this, a, b);
    });
  });
}

/***/ },
/* 130 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var g;

// This works in non-strict mode
g = function () {
	return this;
}();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1, eval)("this");
} catch (e) {
	// This works if the window reference is available
	if ((typeof window === "undefined" ? "undefined" : _typeof(window)) === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;

/***/ },
/* 131 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(settings, helpTextArray, whoClickTheLine, level1, level2, level3, level4, level5, level6, level7, level8, level9, level10) {

var _window$gametask;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

__webpack_require__(93);

'use strict';

window.soundEffects = {
  play: function play(path) {
    var audio = new Audio('./soundEffects/voices/' + path);
    // const audio = new Audio('./soundEffects/voices/jasmin/i see u.m4a');
    // audio.volume = settings.hasMutedSound ? 0 : 1;
    audio.play();
  },
  playExplosionSound: function playExplosionSound() {
    var audio = new Audio('./soundEffects/purchased/Mine Explosion 1.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
    audio.play();
  },
  playShowBombSound: function playShowBombSound() {
    var audio = new Audio('./soundEffects/showBomb.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
    audio.play();
  },
  playLineClickSound: function playLineClickSound() {
    var audio = new Audio('./soundEffects/purchased/Balloon_Pop-by_YIO.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.1;
    audio.play();
  },
  playEraseBombSound: function playEraseBombSound() {
    var audio = new Audio('./soundEffects/eraseBomb.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.4;
    audio.play();
  },
  playScoreSound: function playScoreSound() {
    var audio = new Audio('./soundEffects/purchased/Button Menu Application SFX 57.mp3');
    audio.volume = settings.hasMutedSound ? 0 : 0.03;
    audio.play();
  },
  playWrongSound: function playWrongSound() {
    var audio = new Audio('./soundEffects/purchased/Wrong.wav');
    audio.volume = settings.hasMutedSound ? 0 : 0.2;
    audio.play();
  },
  runSpeaker: function runSpeaker(audio) {
    var hasCancelledMusic = false;
    var speaker = function speaker() {
      if (settings.hasMutedMusic) {
        hasCancelledMusic = true;
        return;
      };
      if (!hasCancelledMusic) {
        gametask.addClassByQuerySelector(".title img", "big");
        setTimeout(function () {
          gametask.removeClassByQuerySelector(".title img", "big");
        }, 200);
      }
    };
    var timeOuts = [0, 434, 869, 1303, 1737, 1986, 2256];
    var count = 1;
    var run = function run() {
      count++;
      if (count <= 17 && !on_game_board) {
        timeOuts.forEach(function (time) {
          setTimeout(function () {
            speaker();
          }, time);
        });
        setTimeout(function () {
          run();
        }, 4340);
      }
    };
    run();
  },
  playBoardMusic: function playBoardMusic() {
    if (settings.hasMutedMusic) return null;
    var audio = new Audio('./soundEffects/Song_Beat/Zazah beat 22.mp3');
    audio.volume = settings.hasMutedMusic ? 0 : 0.08;
    $(document).on("click", ".boardBackButton", function () {
      audio.currentTime = 0;
      audio.pause();
    });
    audio.play().then(function () {
      // playing music
      soundEffects.replayWhenDone(audio);
    }).catch(function (e) {
      return console.log(e);
    });
  },
  replayWhenDone: function replayWhenDone(audio) {
    audio.addEventListener('ended', function () {
      var _this = this;

      setTimeout(function () {
        _this.currentTime = 0;
        _this.play();
      }, 1000);
    }, false);
  },
  playMusicClicked: false,
  playGameMusic: function playGameMusic() {
    var clickFunction = function clickFunction(playSong) {
      if (soundEffects.playMusicClicked) return null;

      var playVolume = 0.4;
      var audio = new Audio('./soundEffects/Song_Beat/ZazahBeatSlow.mp3');
      soundEffects.runSpeaker(audio);
      audio.volume = settings.hasMutedMusic ? 0 : playVolume;
      audio.play().then(function () {
        soundEffects.replayWhenDone(audio);
        // Video playback started ;)
        document.getElementById("gameScreen").removeEventListener("click", clickFunction);
        $(document).on("click", ".mOptions.off", function () {
          audio.pause();
        });
        $(document).on("click", ".mOptions.on", function () {
          if (!settings.hasMutedMusic) {
            audio.currentTime = 0;
            audio.volume = playVolume;
            soundEffects.runSpeaker();
            audio.play();
          }
        });
        // adjust volume on game play
        $(document).on("click", ".tipsText", function () {
          audio.pause();
          soundEffects.playBoardMusic();
        });
        $(document).on("click", ".tipsImages", function () {
          audio.pause();
          soundEffects.playBoardMusic();
        });
        $(document).on("click", ".boardBackButton", function () {
          audio.currentTime = 0;
          if (!settings.hasMutedMusic) audio.play();
        });
      }).catch(function (e) {
        // Video playback failed ;(
        console.log(e);
      });
    };
    document.getElementById("gameScreen").addEventListener("click", clickFunction);
  }
};

window.lineClickAction = {
  highlightClickedBorder: function highlightClickedBorder(offsetX, offsetY, boxNumber, board) {
    lineClickAction.removeLineClickHighlights();

    var height = gametask.getHeightWithClassName("box");
    var upperOutOfBoundsNumber = height - lineClickOffset;
    var lowerOutOfBoundsNumber = lineClickOffset;
    var meetsBombLayingConditions = gametask.isSelected() && !boxInfo.isALockBox(boxNumber) && !boxInfo.isABomb(boxNumber);
    var hasMadeMove = false;
    // check to see if a line is clicked
    var isALineClicked = lineClickAction.isALineClick(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber);
    if (isALineClicked) {
      // the line thats clicked
      var lineClicked = lineClickAction.getLineClicked(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber);
      // are we following the training rules
      var followingTrainingRulesIfAny = gametask.hasPassedTrainingRestriction(boxNumber, lineClicked);
      // prevent multiple click to the same border
      var lineIsAlreadyClick = boxInfo.hasClickBorderPreviously(boxNumber, lineClicked);
      // is the line click part of a lock box
      var isLockBoxLineClick = lineClickAction.isALockedBoxClick(boxNumber, lineClicked);
      hasMadeMove = true;
      // prevent the line if these conditions are met
      if (!followingTrainingRulesIfAny) {
        return gametask.incorrectClick();
      }

      if (lineIsAlreadyClick) {
        ui.showText("line is taken! chose another..");
        return gametask.incorrectClick();
      }

      if (isLockBoxLineClick) {
        ui.showText("destroy the item to click this line!");
        return gametask.incorrectClick(boxNumber, lineClicked);
      }

      lineClickAction.clickOnBorder(boxNumber, lineClicked);
    } else if (meetsBombLayingConditions) {
      // are we following the training rules
      var _followingTrainingRulesIfAny = gametask.hasPassedTrainingRestriction(boxNumber, null);
      if (!_followingTrainingRulesIfAny) return gametask.incorrectClick();
      // takeAnotherTurn = true;
      hasMadeMove = true;
      layedBomb = true;
      // show smoke when help enters the field
      ui.animateBombMovement(boxNumber);
      soundEffects.playShowBombSound();
      bomb.showSpriteSmoke(boxNumber);
      ui.showHelper(boxNumber);
      ui.populateTheUI();
      gametask.endTurnTasks();
      var highlightDropBox = gametask.shouldHighlightLayedBomb();
      if (highlightDropBox) {
        ui.addHighlightToClickBox(boxNumber);
      }
    } else if (bomb.isExplosionBox(boxNumber)) {
      if (!gametask.hasPassedTrainingRestriction(boxNumber, null)) return null;
      clickedExplosion = true;
      bomb.explodeBoxes(boxNumber);
      gametask.endTurnTasks();
    } else if (!gametask.onRestrictionTurn()) {
      soundEffects.playWrongSound();
      var help = settings.level_data[gameLevel].help;
      if (help && !help.helpTurns.includes(track.turn)) {
        ui.showText("Tap directly between the dots!");
        setTimeout(function () {
          ui.showText("");
        }, 4000);
      }
    } else {
      soundEffects.playWrongSound();
    }
  },
  setEdgeBoxClickEvent: function setEdgeBoxClickEvent() {
    document.getElementById("gameBoardPage").addEventListener("click", function (e) {
      var board = document.getElementById("board");
      var gameBoardPosition = board.getBoundingClientRect();
      var pageClickPositionY = e.pageY;
      var pageClickPositionX = e.pageX;
      var clickedGameBoard = pageClickPositionY >= gameBoardPosition.y;
      if (clickedGameBoard && currentPage === "gameBoardPage" && isFirstPlayerTurn) {
        var heightOfBoxes = gametask.getHeightWithClassName("box13");
        var positionFromTopOfGameBoard = pageClickPositionY - gameBoardPosition.y;
        var rowInformation = boxInfo.getEdgeBoxClickPosition(positionFromTopOfGameBoard, heightOfBoxes);
        var edgeBoxClicked = boxInfo.getEdgeBoxClicked(rowInformation, pageClickPositionX, pageClickPositionY);
        if (edgeBoxClicked.boxClicked && edgeBoxClicked.sideClicked) {
          var hasClickBorderPreviously = gameBoard[edgeBoxClicked.boxClicked].borders[edgeBoxClicked.sideClicked] === true;
          if (!hasClickBorderPreviously) {
            var boxClicked = edgeBoxClicked.boxClicked,
                sideClicked = edgeBoxClicked.sideClicked;


            var hasPassed = gametask.hasPassedTrainingRestriction(boxClicked, sideClicked);
            if (hasPassed) {
              lineClickAction.clickOnBorder(boxClicked, sideClicked);
              ui.populateTheUI();
            }
          }
        }
      }
    });
  },
  clickOnBorder: function clickOnBorder(boxNumber, lineClicked) {
    var _track;

    var adjacentBox = null;
    var adjBoxNumber = null;

    bomb.bombPopulation();
    boxInfo.setLineAsClicked(boxNumber, lineClicked);

    boxInfo.setLineColor(boxNumber, lineClicked);
    boxInfo.highlightBoxIfScored(boxNumber);

    var hasAdjacentBox = gameBoard[boxNumber].surroundingBoxes[lineClicked + 'Box'] !== null && gameBoard[boxNumber].surroundingBoxes[lineClicked + 'Box'] !== undefined;
    if (hasAdjacentBox) {
      adjacentBox = gameBoard[boxNumber].surroundingBoxes[lineClicked + 'Box'].boxNumber;
      gameBoard['box' + adjacentBox].borders[boxInfo.complementBorder['' + lineClicked]] = true;
      boxInfo.highlightBoxIfScored('box' + adjacentBox);
      adjBoxNumber = 'box' + adjacentBox;
      boxInfo.setLineColor(adjBoxNumber, boxInfo.complementBorder['' + lineClicked]);
    }

    if (adjacentBox) {
      boxInfo.setLineAsClicked(boxNumber, lineClicked);
    }
    ui.closeTheBoxConnection({
      boxNumber: boxNumber,
      adjacentBox: adjBoxNumber,
      boxNumberClosedBorder: lineClicked,
      adjacentBoxClosedBorder: boxInfo.complementBorder['' + lineClicked]
    });
    var scoreParams = [boxNumber, 'box' + adjacentBox].filter(function (data) {
      return data !== "boxnull";
    });
    (_track = track).adjustScore.apply(_track, _toConsumableArray(scoreParams)); // adjust the score
    lineClickAction.changeLineColorOfLastClickedBox(boxNumber, lineClicked, adjBoxNumber, boxInfo.complementBorder['' + lineClicked]);
    gametask.endTurnTasks();
  },
  removeLineClickHighlights: function removeLineClickHighlights() {
    gametask.removeClassByClassName("box", "topLineClicked");
    gametask.removeClassByClassName("box", "rightLineClicked");
    gametask.removeClassByClassName("box", "bottomLineClicked");
    gametask.removeClassByClassName("box", "leftLineClicked");
  },
  changeLineColorOfLastClickedBox: function changeLineColorOfLastClickedBox(boxNumber, lineClicked, adjBoxNumber, adjBoxLine) {
    if (!isFirstPlayerTurn) {
      setTimeout(function () {
        gametask.addClassByClassName(boxNumber, lineClicked + 'LineClicked');
        if (adjBoxNumber) {
          gametask.addClassByClassName(adjBoxNumber, adjBoxLine + 'LineClicked');
        }
      }, 500);
    }
  },
  isALockedBoxClick: function isALockedBoxClick(box, lineClicked) {
    var adjBox = boxInfo.getAdjBoxBySide(box, lineClicked);
    var includesLocked = boxInfo.isALockBox(box) || boxInfo.isALockBox(adjBox);
    return includesLocked;
  },
  isALineClick: function isALineClick(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber) {
    var inUpperOutOfBounds = offsetX > upperOutOfBoundsNumber || offsetY > upperOutOfBoundsNumber;
    var inLowerOutOfBounds = offsetX < lowerOutOfBoundsNumber || offsetY < lowerOutOfBoundsNumber;
    var inTopLeftCorner = offsetX < lowerOutOfBoundsNumber && offsetY < lowerOutOfBoundsNumber;
    var inBottomLeftCorner = offsetX < lowerOutOfBoundsNumber && offsetY > upperOutOfBoundsNumber;
    var inTopRightCorner = offsetX > upperOutOfBoundsNumber && offsetY < lowerOutOfBoundsNumber;
    var inBottomRightCorner = offsetX > upperOutOfBoundsNumber && offsetY > upperOutOfBoundsNumber;
    var hasClickedACorner = inTopLeftCorner || inBottomLeftCorner || inTopRightCorner || inBottomRightCorner;
    return (inUpperOutOfBounds || inLowerOutOfBounds) && !hasClickedACorner;
  },
  getLineClicked: function getLineClicked(offsetX, offsetY, upperOutOfBoundsNumber, lowerOutOfBoundsNumber) {
    if (offsetX > upperOutOfBoundsNumber) return "right";
    if (offsetX < lowerOutOfBoundsNumber) return "left";
    if (offsetY > upperOutOfBoundsNumber) return "bottom";
    if (offsetY < lowerOutOfBoundsNumber) return "top";
  },
  removeBorders: function removeBorders(box, borders) {
    borders.forEach(function (border) {
      gameBoard[box].borders[border] = null;
    });
    ui.populateTheUI();
  }
};

window.computerMove = {
  computerMoveSetter: 0,
  setMakeComputerMove: function setMakeComputerMove() {
    clearTimeout(computerMove.computerMoveSetter);
    computerMove.computerMoveSetter = setTimeout(function () {
      computerMove.makeComputerMove();
    });
  },
  makeComputerMove: function makeComputerMove() {
    var hasAPreMadeMove = gametask.hasAPreMadeMove();
    if (hasAPreMadeMove.hasPreMadeMove) {
      var _hasAPreMadeMove$move = hasAPreMadeMove.moveToMake,
          box = _hasAPreMadeMove$move.box,
          line = _hasAPreMadeMove$move.line;

      setTimeout(function () {
        lineClickAction.clickOnBorder(box, line);
      }, settings.level_data[gameLevel].computerSpeed || 500);
      return null;
    }

    pointsInArow = 0;
    explodingBoxes = [];
    // logic to make computer move
    setTimeout(function () {
      // makes the computer delay before making a move
      //wait for explosions to stop before making computer move
      if (bomb.isExploding.length === 0) {
        var existsTwoBorderBoxes = twoBorderBoxes.length !== 0;
        var noThreeBorderBoxes = !(threeBorderBoxes.length > 0);
        if (existsTwoBorderBoxes && noThreeBorderBoxes && computerMove.giveAWayABox()) {
          computerMove.clickInATwoBorderBox();
          ui.populateTheUI();
        } else {
          computerMove.makeMoveInSafeBox();
        }
      } else {
        computerMove.setMakeComputerMove();
      }
    }, settings.level_data[gameLevel].computerSpeed || 500);
  },
  makeMoveInSafeBox: function makeMoveInSafeBox() {
    // make a computer move that doesn't allow opponent the score
    if (threeBorderBoxes.length !== 0) computerMove.getAFreeBox();else if (noBorders.length !== 0) computerMove.clickInANoBorderBox();else if (oneBorderBoxes.length !== 0) computerMove.clickInAOneBorderBox();else if (twoBorderBoxes.length !== 0) computerMove.clickInATwoBorderBox();
    ui.populateTheUI();
  },
  getAFreeBox: function getAFreeBox() {
    var clickBox = gametask.getRandomIndexInArray(threeBorderBoxes);
    Object.keys(boxInfo.getGameBoardClickBox(clickBox).borders).forEach(function (data) {
      if (!bomb.allExplodingBoxes.length > 0) {
        var borderCanBeClicked = !boxInfo.getGameBoardClickBox(clickBox).borders[data];
        if (borderCanBeClicked && !isFirstPlayerTurn) {
          if (boxInfo.isAdjBoxALockBox(clickBox, data)) {
            threeBorderBoxes.splice(threeBorderBoxes.indexOf(clickBox), 1);
            computerMove.makeMoveInSafeBox();
          } else {
            if (noBorders.length > 0 && !showTextUsed) {
              track.screenText();
              // show text on board
              boardText.showText("bad");
            }
            computerHasScored = true;
            lineClickAction.clickOnBorder(clickBox, data);
          }
        }
      }
    });
  },
  clickInANoBorderBox: function clickInANoBorderBox() {
    var keepGoing = true;
    while (keepGoing) {
      // choose a randon box in the array containing box with no border
      var clickBox = gametask.getRandomIndexInArray(noBorders);
      //remove that box from that array to avoid checking it multiple times
      noBorders.splice(noBorders.indexOf(clickBox), 1);
      // get the boxes around it that only has one or less borders already selected
      var oneOrLessBorderSurroundingBoxes = boxInfo.getLessThanOneBorderNonConnectedSurroundingBoxes(clickBox);
      // choose a random box of the potential boxes to click
      var selectedBox = gametask.getRandomIndexInArray(oneOrLessBorderSurroundingBoxes);
      // cache the line between the two boxes to use when clicking
      var lineBetweenBoxes = boxInfo.getLineBetweenBoxes(clickBox, selectedBox);
      // is the box on the edge of the gameboard and has no adjcent box
      var edgeBox = boxInfo.edgeBox(clickBox);
      // if the noBorders array is empty all avaible chooses are not safe to click
      if (noBorders.length === 0) {
        keepGoing = false;
      }

      var isClickBoxALockBox = boxInfo.isALockBox(clickBox);
      var isAdjBoxALockBox = lineBetweenBoxes ? boxInfo.isAdjBoxALockBox(clickBox, lineBetweenBoxes.replace("Box", "")) : false;
      // if the clicked box or the box that shares the line is a locked box make computer move again
      if (isClickBoxALockBox || isAdjBoxALockBox) {
        keepGoing = false;
        computerMove.makeMoveInSafeBox();
      } else if (selectedBox && lineBetweenBoxes) {
        // if we found a safe box to click move the move
        keepGoing = false;
        var line = lineBetweenBoxes.replace("Box", "");
        lineClickAction.clickOnBorder(clickBox, line);
      } else {
        // if the box is an edge box you can click the edge as a safe move
        if (edgeBox.hasEdgeBox) {
          keepGoing = false;
          lineClickAction.clickOnBorder(clickBox, edgeBox.clickSide);
          break;
        }
        // if not, rethink what kind of box we want to potentially click
        computerMove.makeMoveInSafeBox();
      }
    }
  },
  clickInAOneBorderBox: function clickInAOneBorderBox() {
    var safeClickBoxWithSide = boxInfo.getSafeBoxes();
    if (safeClickBoxWithSide.length !== 0) {
      var clickBoxObj = gametask.getRandomIndexInArray(safeClickBoxWithSide);
      lineClickAction.clickOnBorder(clickBoxObj.clickBox, clickBoxObj.clickSide);
    } else {
      computerMove.makeMoveInSafeBox();
    }
  },
  clickInATwoBorderBox: function clickInATwoBorderBox() {
    var connectedBoxCombinations = computerMove.getPathBoxes();
    // choose a box to click
    computerMove.chooseBoxToClickInEndGame(connectedBoxCombinations);
  },
  getPathBoxes: function getPathBoxes() {
    // all possible connected box combinations
    var connectedBoxCombinations = [];
    // inspected boxes
    var inspectedBoxes = [];
    var allConnectedBoxes = [];
    // filter for two line boxes
    var twoLineBoxes = Object.keys(gameBoard).filter(function (boxNumber) {
      return boxInfo.getBorderCount(boxNumber) === 2;
    });
    // stops the while loop
    var keepGoing = true;
    // number of boxes inpecting
    var numberOfBoxesInspecting = twoLineBoxes.length;

    var _loop = function _loop() {
      var calledFunction = false;
      // cache inspecting box
      var inspectingBox = twoLineBoxes[0];
      var recordConnectedBoxes = function recordConnectedBoxes(boxNumber) {
        // push into allConnectedBoxes and inspectedBoxes
        allConnectedBoxes.push(boxNumber);
        inspectedBoxes.push(boxNumber);
        // remove it from the uninspected
        twoLineBoxes.splice(twoLineBoxes.indexOf(boxNumber), 1);
        // get the connected boxes
        var surroundingBoxes = boxInfo.getSurroundingBoxes(boxNumber);
        // filter for connected boxes
        var connectedBoxes = surroundingBoxes.filter(function (box) {
          return boxInfo.isAdjacentBoxesConnected(box, boxNumber).isConnected;
        });
        // filter out for 2 line boxes
        var filterBoxesForTwoLineConnectedBoxes = connectedBoxes.filter(function (data) {
          return twoLineBoxes.includes(data);
        }).map(function (box) {
          return box;
        });
        filterBoxesForTwoLineConnectedBoxes.forEach(function (box) {
          if (!allConnectedBoxes.includes(box)) recordConnectedBoxes(box);
        });
      };
      if (!calledFunction && inspectingBox) {
        calledFunction = true;
        recordConnectedBoxes(inspectingBox);
      }
      connectedBoxCombinations.push([].concat(allConnectedBoxes));
      allConnectedBoxes.length = 0;
      // stop the while loop once all twoLineBoxes are inspected
      if (inspectedBoxes.length === numberOfBoxesInspecting) keepGoing = false;
    };

    while (keepGoing) {
      _loop();
    }
    var replacements = computerMove.combineCircleAndStraigthPathCombinations(connectedBoxCombinations);
    if (replacements.length) {
      replacements.map(function (replace) {
        connectedBoxCombinations[replace.index] = replace.array;
      });
    }
    return connectedBoxCombinations;
  },
  combineCircleAndStraigthPathCombinations: function combineCircleAndStraigthPathCombinations(connectedBoxCombinations) {
    var replacements = [];
    boxInfo.adjustBorderCountArrays();
    if (oneBorderBoxes.length !== 0) {
      oneBorderBoxes.forEach(function (box) {
        var connectedBoxes = boxInfo.getConnectedBoxes(box);
        connectedBoxCombinations.forEach(function (paths, index) {
          if (gametask.hasTwoInArray(connectedBoxes, paths)) {
            var allPathsHere = [];
            connectedBoxes.forEach(function (eachBox) {
              connectedBoxCombinations.forEach(function (pathsToGetPathsFrom) {
                if (pathsToGetPathsFrom.includes(eachBox)) {
                  allPathsHere = [].concat(_toConsumableArray(allPathsHere), _toConsumableArray(pathsToGetPathsFrom));
                }
              });
            });
            var withRemovedDoubles = gametask.removedDoublesFromArray(allPathsHere);
            replacements.push({
              array: withRemovedDoubles,
              index: index
            });
          }
        });
      });
    }
    return replacements;
  },
  chooseBoxToClickInEndGame: function chooseBoxToClickInEndGame(multiScoreBoxPaths) {
    var keepGoing = true;
    var arrayIndex = 0;
    var length = multiScoreBoxPaths.length;
    var pathsToClickABox = multiScoreBoxPaths.sort(function (a, b) {
      return a.length - b.length;
    });

    var _loop2 = function _loop2() {
      var boxToClick = gametask.getRandomIndexInArray(pathsToClickABox[arrayIndex]);
      var lineClick = void 0;
      var borders = boxInfo.getGameBoardClickBox(boxToClick).borders;
      Object.keys(borders).forEach(function (data, index) {
        var noBorderClicked = borders[data] === null;
        var isClickBoxALockBox = boxInfo.isALockBox(boxToClick);
        var isAdjBoxALockBox = boxInfo.isAdjBoxALockBox(boxToClick, data);
        if (noBorderClicked && !isClickBoxALockBox && !isAdjBoxALockBox) {
          lineClick = data;
        }
      });
      if (lineClick === null || lineClick === undefined) {
        var atLastPath = arrayIndex - 1 === length;
        if (atLastPath) {
          keepGoing = false;
          console.log("game over");
        }
        arrayIndex++;
      } else {
        keepGoing = false;
        lineClickAction.clickOnBorder(boxToClick, lineClick);
      }
    };

    while (keepGoing) {
      _loop2();
    }
  },
  shouldLetHaveBox: function shouldLetHaveBox() {
    var onePathHasTwoBoxes = false;
    var pathsToClickABox = computerMove.getPathBoxes();
    if (pathsToClickABox.length === 2 && threeBorderBoxes.length === 1) {
      pathsToClickABox.forEach(function (path) {
        if (path.length === 1) {
          onePathHasTwoBoxes = !onePathHasTwoBoxes;
        }
      });
    }

    var clickBoxInfo = onePathHasTwoBoxes ? computerMove.chooseLineAndBoxThatDoesNotScore(pathsToClickABox, onePathHasTwoBoxes) : null;
    return clickBoxInfo;
  },
  chooseLineAndBoxThatDoesNotScore: function chooseLineAndBoxThatDoesNotScore(pathsToClickABox, onePathHasTwoBoxes) {
    var sideToClick = void 0;
    var orderedPaths = pathsToClickABox.sort(function (a, b) {
      return a.length - b.length;
    });
    var boxToClick = orderedPaths[0][0];
    var boxHasTwoBorders = boxInfo.getBorderCount(boxToClick);
    if (boxHasTwoBorders) {
      // click the edge box
      sideToClick = boxInfo.edgeBox(boxToClick).clickSide;
    } else {
      // take the box
      onePathHasTwoBoxes = false;
    }
    return {
      boxToClick: boxToClick,
      sideToClick: sideToClick
    };
  },
  giveAWayABox: function giveAWayABox() {
    return Math.random() < chanceToGiveAWayPoint;
  }
};

window.gametask = (_window$gametask = {
  endTurnTasks: function endTurnTasks() {
    setTimeout(function () {
      gametask.setTurnPlayer();
    });
  },
  endGameChecker: 0,
  startEndGameInterval: function startEndGameInterval() {
    clearInterval(gametask.endGameChecker);
    gametask.endGameChecker = setInterval(function () {
      gametask.isGameOver();
    }, 1000);
  },
  setTurnPlayer: function setTurnPlayer() {
    setTimeout(function () {
      var noMoreLinesToClick = twoBorderBoxes.length === 0 && noBorders.length === 0 && oneBorderBoxes.length === 0 && threeBorderBoxes.length !== 0;
      var hasLockedBoxes = lockBombLocations.length > 0;
      if (noMoreLinesToClick && hasLockedBoxes) {
        console.log("game over");
      }
    });

    gametask.resetAllRestrictions();

    var incrementTurn = true;;
    if (takeAnotherTurn && isFirstPlayerTurn) {
      takeAnotherTurn = false;
    } else if (takeAnotherTurn && !isFirstPlayerTurn) {
      takeAnotherTurn = false;
    } else if (layedBomb) {
      layedBomb = false;
      incrementTurn = false;
    } else if (clickedExplosion) {
      clickedExplosion = false;
      isFirstPlayerTurn = !isFirstPlayerTurn;
    } else if (!takeAnotherTurn) {
      isFirstPlayerTurn = !isFirstPlayerTurn;
      soundEffects.playLineClickSound();
    }

    gametask.setTurnIndicator();

    setTimeout(function () {
      if (incrementTurn) {
        track.incrementTurn();
      }
      ui.populateTheUI();
      ui.startLevelText();
      setTimeout(function () {
        if (!isFirstPlayerTurn) {
          computerMove.makeComputerMove();
        }
      }, 100);
    });
  },
  isGameOver: function isGameOver() {
    totalPointsScored = 0;
    Object.keys(gameBoard).forEach(function (box) {
      var firstPlayerScored = gametask.hasClassByQuerySelector('.' + box, "firstPlayerScored");
      var secondPlayerScored = gametask.hasClassByQuerySelector('.' + box, "secondPlayerScored");
      if (firstPlayerScored || secondPlayerScored) totalPointsScored++;
    });
    if (totalPointsScored === gameBoardLength) {
      clearInterval(gametask.endGameChecker);
      settings.endGame = true;
      setTimeout(function () {
        settings.endGame = false;
      }, 4000);
      if (playerOneScore > playerTwoScore) {
        ui.showCompleteScreen();
      } else if (playerOneScore === playerTwoScore) {
        boardText.showOnBoard("DRAW", 5000);
        isFirstPlayerTurn = true;
      } else {
        boardText.showOnBoard("Aint nobody got time for that!", 5000);
        isFirstPlayerTurn = true;
      }
    } else {
      var hasNoBorderBoxes = noBorders.length === 0;
      var hasTwoBorderBoxes = twoBorderBoxes.length === 0;
      var hasThreeBorderBoxes = threeBorderBoxes.length === 0;
      var noBoxesLeft = hasNoBorderBoxes && hasTwoBorderBoxes && hasThreeBorderBoxes;
      if (noBoxesLeft) {

        settings.endGame = true;
        setTimeout(function () {
          settings.endGame = false;
        }, 4000);

        boardText.showOnBoard("Game Over! Blow up the foot of oppression to win", 6000);
        isFirstPlayerTurn = true;
      }
    }
  },
  getRandomIndexInArray: function getRandomIndexInArray(boxArray) {
    return boxArray[Math.floor(Math.random() * boxArray.length)];
  },
  setGameLevelAndTips: function setGameLevelAndTips(level) {
    gameLevel = level - 1;
    gametask.setGameLevelObj();
    track.goToPage('tipsPage');
    gametask.setTips(level);
  },
  setTips: function setTips(level) {
    if (!getGameLevelObj.tipsPage) {
      ui.startGame();
    }

    var _ref = getGameLevelObj.tipsPage || settings.level_data[0].tipsPage,
        heading = _ref.heading,
        text = _ref.text,
        img_src = _ref.img_src,
        height = _ref.height;

    gametask.addTextByQuerySelector("#tipHeading", heading);
    gametask.addTextByQuerySelector("#tipText", text);
    document.getElementById("tipImage").src = img_src;
    document.getElementById("tipImage").style.height = height;
  },
  setDifficulty: function setDifficulty(difficulty) {
    if (difficulty === "easy") {
      chanceToGiveAWayPoint = 0.4;
    } else if (difficulty === "medium") {
      chanceToGiveAWayPoint = 0.2;
    } else if (difficulty === "hard") {
      chanceToGiveAWayPoint = 0.01;
    }
  },
  clearBoard: function clearBoard() {
    // document.getElementsByClassName("box")[0].remove();
    ui.startGame(gameLevel + 1); // add one for the index
  },
  breakRefAndCopy: function breakRefAndCopy(obj) {
    return JSON.parse(JSON.stringify(obj));
  },
  hasTwoInArray: function hasTwoInArray(array, arrayToCheckIn) {
    var numberInside = 0;
    array.forEach(function (arr) {
      if (arrayToCheckIn.includes(arr)) {
        numberInside++;
      }
    });
    return numberInside === 2;
  },
  removedDoublesFromArray: function removedDoublesFromArray(arr) {
    var noDublicates = [];
    arr.forEach(function (item) {
      if (!noDublicates.includes(item)) {
        noDublicates.push(item);
      }
    });
    return noDublicates;
  },
  isSelected: function isSelected() {
    return gametask.getLengthOfElement(".tool.selected") === 1;
  },
  resetScore: function resetScore() {
    playerOneScore = 0;
    playerTwoScore = 0;
    gametask.addTextByQuerySelector(".playerOneScore", playerOneScore);
    gametask.addTextByQuerySelector(".playerTwoScore", playerTwoScore);
  },
  resetPlayerTurn: function resetPlayerTurn() {
    isFirstPlayerTurn = true;
    gametask.setTurnIndicator();
  },
  saveToLocalStorage: function saveToLocalStorage(key, obj) {
    window.localStorage.setItem("boxes", JSON.stringify(_defineProperty({}, key, obj)));
  },
  setFromLocalStorage: function setFromLocalStorage() {
    setTimeout(function () {
      if (!localStorage.boxes || reset_settings) {
        gametask.saveToLocalStorage("settings", settings);
      } else {
        var storage = JSON.parse(localStorage.boxes);
        settings = storage.settings;
      }
      settings.level_data.forEach(function (data, index) {
        if (data.help) {
          data.help.boardHelpText = helpTextArray[index].help.boardHelpText;
          data.help.helpTurns = helpTextArray[index].help.helpTurns;
        }
      });
    });
  },
  changeTitleColor: function changeTitleColor() {
    gametask.addClassByClassName("title", "transitionColor");
    setInterval(function () {
      var hasColorChangheClass = gametask.hasClassByClassName("title", "colorChange");
      if (hasColorChangheClass) {
        gametask.removeClassByClassName("title", "colorChange");
        gametask.removeClassByClassName("africa", "lighter");
        gametask.addClassByClassName("ripple", "active");
        setTimeout(function () {
          gametask.removeClassByClassName("ripple", "active");
        }, 100);
      } else {
        gametask.addClassByClassName("title", "colorChange");
        gametask.addClassByClassName("africa", "lighter");
      }
    }, 4000);
  },
  passTurn: function passTurn() {
    isFirstPlayerTurn = !isFirstPlayerTurn;
    gametask.setTurnIndicator();
    if (!isFirstPlayerTurn) {
      computerMove.setMakeComputerMove();
    }
  },
  resizeBoard: function resizeBoard() {
    setTimeout(function () {
      var boardSize = gametask.getWidthWithId("board");
      var gridWidth = boardSize / 6;
      gametask.setHeightWithClassName("box", gridWidth - 6);
      gametask.setWidthWithClassName("box", gridWidth - 6);
    });
  },
  getTools: function getTools() {
    return getGameLevelObj.tools ? gametask.breakRefAndCopy(getGameLevelObj.tools) : [];
  },
  setGameLevelObj: function setGameLevelObj() {
    getGameLevelObj = gametask.getGameLevelObj();
  },
  getGameLevelObj: function getGameLevelObj() {
    return settings.level_data[gameLevel];
  },
  addTextByQuerySelector: function addTextByQuerySelector(selector, text) {
    var element = document.querySelectorAll(selector);
    var length = element.length;
    if (element) {
      for (var i = 0; i < length; i++) {
        element[i].innerText = text;
      }
    }
  },
  addHTMLByQuerySelector: function addHTMLByQuerySelector(selector, html) {
    var element = document.querySelectorAll(selector);
    var length = element.length;
    if (element) {
      for (var i = 0; i < length; i++) {
        element[i].innerHTML = html;
      }
    }
  },
  getTextByQuerySelector: function getTextByQuerySelector(selector) {
    var element = document.querySelectorAll(selector)[0];
    return element.innerText;
  },
  addClassByQuerySelector: function addClassByQuerySelector(selector, classToRemove) {
    var element = document.querySelectorAll(selector);
    var length = element.length;
    if (element) {
      for (var i = 0; i < length; i++) {
        element[i].classList.add(classToRemove);
      }
    }
  },
  removeClassByQuerySelector: function removeClassByQuerySelector(selector, classToRemove) {
    var element = document.querySelectorAll(selector);
    var length = element.length;
    if (element) {
      for (var i = 0; i < length; i++) {
        element[i].classList.remove(classToRemove);
      }
    }
  }
}, _defineProperty(_window$gametask, 'removeClassByQuerySelector', function removeClassByQuerySelector(selector, classToRemove) {
  var element = document.querySelectorAll(selector);
  var length = element.length;
  if (element) {
    for (var i = 0; i < length; i++) {
      element[i].classList.remove(classToRemove);
    }
  }
}), _defineProperty(_window$gametask, 'removeClassByClassName', function removeClassByClassName(selector, classToRemove) {
  var element = document.getElementsByClassName(selector);
  var length = element.length;
  if (element) {
    for (var i = 0; i < length; i++) {
      element[i].classList.remove(classToRemove);
    }
  }
}), _defineProperty(_window$gametask, 'addClassByClassName', function addClassByClassName(selector, classToAdd) {
  var element = document.getElementsByClassName(selector);
  var length = element.length;
  if (element) {
    for (var i = 0; i < length; i++) {
      element[i].classList.add(classToAdd);
    }
  }
}), _defineProperty(_window$gametask, 'hasClassByClassName', function hasClassByClassName(selector, classToCheckFor) {
  var element = document.getElementsByClassName(selector)[0];
  if (element) {
    return element.classList.contains(classToCheckFor);
  }
}), _defineProperty(_window$gametask, 'hasClassByQuerySelector', function hasClassByQuerySelector(selector, classToCheckFor) {
  var hasClass = false;
  var element = document.querySelectorAll(selector);
  var length = element.length;
  if (element) {
    for (var i = 0; i < length; i++) {
      if (element[i].classList.contains(classToCheckFor)) {
        hasClass = true;
      }
    }
  }
  return hasClass;
}), _defineProperty(_window$gametask, 'getHeightWithClassName', function getHeightWithClassName(selector) {
  return document.getElementsByClassName(selector)[0].clientHeight;
}), _defineProperty(_window$gametask, 'getWidthWithClassName', function getWidthWithClassName(selector) {
  return document.getElementsByClassName(selector)[0].clientWidth;
}), _defineProperty(_window$gametask, 'getWidthWithId', function getWidthWithId(selector) {
  return document.getElementById(selector).clientWidth;
}), _defineProperty(_window$gametask, 'setHeightWithClassName', function setHeightWithClassName(selector, height) {
  var sel = document.getElementsByClassName(selector);
  var length = sel.length;
  for (var i = 0; i < length; i++) {
    sel[i].style.height = height + 'px';
  }
}), _defineProperty(_window$gametask, 'setWidthWithClassName', function setWidthWithClassName(selector, width) {
  var sel = document.getElementsByClassName(selector);
  var length = sel.length;
  for (var i = 0; i < length; i++) {
    sel[i].style.width = width + 'px';
  }
}), _defineProperty(_window$gametask, 'getLengthOfElement', function getLengthOfElement(selector) {
  var query = document.querySelectorAll(selector);
  return query.length;
}), _defineProperty(_window$gametask, 'getStarsForWinner', function getStarsForWinner(score) {
  var starRubric = getGameLevelObj.starRating || [];
  if (score >= starRubric[2].score) {
    return 3;
  } else if (score >= starRubric[1].score) {
    return 2;
  } else if (score >= starRubric[0].score) {
    return 1;
  }
}), _defineProperty(_window$gametask, 'setStarsForWinner', function setStarsForWinner(stars) {
  settings.level_data[gameLevel].stars = stars;
  gametask.saveToLocalStorage("settings", settings);
}), _defineProperty(_window$gametask, 'openNextBoard', function openNextBoard(stars) {
  var nextLevel = settings.level_data[gameLevel + 1];
  if (stars > 0 && nextLevel) {
    nextLevel.isLocked = false;
    gametask.saveToLocalStorage("settings", settings);
  }
}), _defineProperty(_window$gametask, 'setTurnIndicator', function setTurnIndicator() {
  gametask.removeClassByClassName("scoreHolder", "thisPlayerTurn");
  if (isFirstPlayerTurn) {
    gametask.addClassByQuerySelector(".firstPlayerTurnHolder", "thisPlayerTurn");
  } else {
    gametask.addClassByQuerySelector(".secondPlayerTurnHolder", "thisPlayerTurn");
  }
}), _defineProperty(_window$gametask, 'setTurnRestrictions', function setTurnRestrictions() {
  var trainingRestrictions = settings.level_data[gameLevel].trainingRestrictions;

  if (trainingRestrictions) {
    var restrictions = settings.level_data[gameLevel].trainingRestrictions.restrictions;

    restrictions.forEach(function (restriction) {
      var turn = restriction.turn,
          type = restriction.type,
          boxOne = restriction.boxOne,
          boxTwo = restriction.boxTwo,
          clickBox = restriction.clickBox,
          then = restriction.then;

      var onRestrictionTurn = track.turn === turn;
      if (onRestrictionTurn) {
        gametask.resetAllRestrictions();
        if (type === "highLightLine") {
          restrictionLineClicks = [boxOne, boxTwo];
          gametask.highlightLine();
        } else if (type === "clickBox") {
          restrictionClickBox = clickBox;
          setTimeout(function () {
            gametask.addClassByClassName(clickBox, "clickBox");
          }, 500);
        } else if (type === "layBomb") {
          restrictionLayBomb = clickBox;
          var _boxToClick = settings.level_data[gameLevel].clickAnimal;
          setTimeout(function () {
            gametask.addClassByQuerySelector('.tool.' + _boxToClick, "clickBox");
          });
        }
        if (then) {
          nextRestriction = then;
        }
      }
    });
  }
}), _defineProperty(_window$gametask, 'highlightLine', function highlightLine() {
  var restrict = gametask.breakRefAndCopy(restrictionLineClicks);
  setTimeout(function () {
    restrict.forEach(function (data) {
      if (data.side === "top") {
        gametask.addClassByClassName(data.box, "clickTopLine");
      } else if (data.side === "right") {
        gametask.addClassByClassName(data.box, "clickRightLine");
      } else if (data.side === "bottom") {
        gametask.addClassByClassName(data.box, "clickBottomLine");
      } else if (data.side === "left") {
        gametask.addClassByClassName(data.box, "clickLeftLine");
      }
    });
  }, 500);
}), _defineProperty(_window$gametask, 'resetAllRestrictions', function resetAllRestrictions() {
  restrictionLineClicks = null;
  restrictionClickBox = null;
  restrictionLayBomb = null;
  nextRestriction = null;
  setTimeout(function () {
    gametask.removeClassByClassName("box", "clickTopLine");
    gametask.removeClassByClassName("box", "clickRightLine");
    gametask.removeClassByClassName("box", "clickBottomLine");
    gametask.removeClassByClassName("box", "clickLeftLine");
  }, 500);
}), _defineProperty(_window$gametask, 'onRestrictionTurn', function onRestrictionTurn() {
  return restrictionLineClicks || restrictionClickBox;
}), _defineProperty(_window$gametask, 'hasPassedTrainingRestriction', function hasPassedTrainingRestriction(boxNumber, lineClicked) {
  var hasPassed = true;
  if (restrictionLineClicks) {
    hasPassed = false;
    restrictionLineClicks.forEach(function (restriction) {
      var box = restriction.box,
          side = restriction.side;

      if (box === boxNumber && side === lineClicked) {
        hasPassed = true;
      }
    });
  } else if (restrictionClickBox) {
    hasPassed = false;
    if (restrictionClickBox.includes(boxNumber) && !lineClicked) {
      hasPassed = true;
    }
  } else if (restrictionLayBomb) {
    hasPassed = false;
    if (restrictionLayBomb.includes("any box") || restrictionLayBomb.includes(boxNumber)) {
      if (!lineClicked) {
        hasPassed = true;
        restrictionLayBomb = null;

        if (nextRestriction) {
          var _nextRestriction = nextRestriction,
              turn = _nextRestriction.turn,
              type = _nextRestriction.type,
              boxOne = _nextRestriction.boxOne,
              boxTwo = _nextRestriction.boxTwo,
              clickBox = _nextRestriction.clickBox,
              then = _nextRestriction.then,
              withClickBox = _nextRestriction.withClickBox;

          if (type === "highLightLine") {
            setTimeout(function () {
              restrictionLineClicks = [boxOne, boxTwo];
              gametask.highlightLine();
            }, 500);
          } else if (type === "clickBox") {
            if (withClickBox) {
              setTimeout(function () {
                restrictionClickBox = [].concat(_toConsumableArray(clickBox), [boxNumber]);
                restrictionClickBox.forEach(function (data) {
                  gametask.addClassByClassName(data, "clickBox");
                });
              }, 500);
            } else {
              setTimeout(function () {
                restrictionClickBox = [].concat(_toConsumableArray(clickBox));
                restrictionClickBox.forEach(function (data) {
                  gametask.addClassByClassName(data, "clickBox");
                });
              }, 500);
            }
          } else if (type === "layBomb") {
            setTimeout(function () {
              restrictionLayBomb = clickBox;
            });
          }
        }
      }
    }
  }

  if (!hasPassed) {
    soundEffects.playWrongSound();
  }

  return hasPassed;
}), _defineProperty(_window$gametask, 'hasAPreMadeMove', function hasAPreMadeMove() {
  var hasPreMadeMove = false;
  var moveToMake = "";
  var computerMoves = settings.level_data[gameLevel].computerMoves;

  if (computerMoves) {
    computerMoves.forEach(function (move) {
      if (move.turn === track.turn) {
        hasPreMadeMove = true;
        moveToMake = move;
      }
    });
  }
  return {
    hasPreMadeMove: hasPreMadeMove,
    moveToMake: moveToMake
  };
}), _defineProperty(_window$gametask, 'incorrectClick', function incorrectClick(boxNumber, lineClicked) {
  if (boxNumber && lineClicked) {
    // turns the line red to indicate that it cant be clicked
    ui.displayNoClickIndicator(boxNumber, lineClicked);
  }
  soundEffects.playWrongSound();
}), _defineProperty(_window$gametask, 'setToolClickEvent', function setToolClickEvent() {
  $(document).on("click", ".tool.clickBox", function () {
    gametask.removeClassByClassName(".tool", "keepSelected");
    var clickBox = settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn].clickBox;
    clickBox.forEach(function (box) {
      gametask.addClassByQuerySelector(".tool.clickBox", "keepSelected");
      gametask.removeClassByQuerySelector(".tool.clickBox", "clickBox");
      gametask.addClassByClassName(box, "clickBox");
    });
  });
}), _defineProperty(_window$gametask, 'shouldHighlightLayedBomb', function shouldHighlightLayedBomb() {
  if (!settings.level_data[gameLevel].trainingRestrictions) {
    return null;
  }
  return settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn] && settings.level_data[gameLevel].trainingRestrictions.restrictions[track.turn].clickWhenLayed;
}), _defineProperty(_window$gametask, 'selectStoreItem', function selectStoreItem(item, cost) {
  var currentGold = settings.gold;
  if (currentGold >= cost) {
    for (var x in storeItemSelected) {
      delete storeItemSelected[x];
    }storeItemSelected.item = item;
    storeItemSelected.cost = cost;
    ui.toggleConfirmScreen();
  } else {
    soundEffects.playWrongSound();
  }
}), _defineProperty(_window$gametask, 'buyItem', function buyItem() {
  var currentGold = settings.gold;
  settings.gold = currentGold - storeItemSelected.cost;
  settings.itemsPurchased.push(storeItemSelected.item);
  var newQuantity = settings.store[storeItemSelected.item].quantity + 1;
  settings.store[storeItemSelected.item].quantity = newQuantity;
  gametask.saveToLocalStorage("settings", settings);
  ui.toggleConfirmScreen();
  document.getElementById("goldAmount").innerText = settings.gold;
  ui.populateStore();
}), _window$gametask);

window.ui = {
  startGame: function startGame() {
    var selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    selectBombScreen.classList.remove("playGame");

    gametask.removeClassByClassName("helpTextP", "showHelpText");

    restrictionLineClicks = null;
    restrictionClickBox = null;
    restrictionLayBomb = null;
    nextRestriction = null;

    settings.itemsSelected = [];

    gametask.startEndGameInterval();
    track.turn = 0;
    pointsInArow = 0;
    whoClickedLine = gametask.breakRefAndCopy(whoClickTheLine);
    textType = null;
    on_game_board = true;
    gametask.resetPlayerTurn();
    gametask.resetScore();
    track.goToPage(settings.startUpPage);
    gametask.setDifficulty(settings.difficulty);
    initialBombs = getGameLevelObj.initialBombs ? gametask.breakRefAndCopy(getGameLevelObj.initialBombs) : [];
    bombsToLay = getGameLevelObj.bombsToLay ? gametask.breakRefAndCopy(getGameLevelObj.bombsToLay) : 0;
    // track.setRemainingBombs();
    lockBombLocations = getGameLevelObj.lockBoxes ? gametask.breakRefAndCopy(getGameLevelObj.lockBoxes) : [];

    gameBoard = gametask.breakRefAndCopy(ui.gameBoardMapperObj['level' + (gameLevel + 1)]);
    gameBoardLength = ui.getGameBoardLength();

    var lockBoxesAmount = lockBoxes[gameLevel];
    for (var i = 0; i < 36; i++) {
      if (!boxInfo.isBoxDisabled('box' + i)) {
        possibleBombs.push('box' + i);
      }
    }

    possibleBombs.forEach(function (data, index) {
      if (index < lockBoxesAmount) {
        var box = gametask.getRandomIndexInArray(possibleBombs);
        var _index = possibleBombs.indexOf(box);
        possibleBombs.splice(_index, 1);
      }
    });

    ui.addInitialBombs();
    ui.fillPreFilledBoxes();
    ui.populateTheUI();
    bomb.fillPopulationData();
    ui.startLevelText();
  },
  redo: function redo() {
    gametask.clearBoard();
    track.goToPage('gameBoardPage');
  },
  gameBoardMapperObj: {
    level1: level1,
    level2: level2,
    level3: level3,
    level4: level4,
    level5: level5,
    level6: level6,
    level7: level7,
    level8: level8,
    level9: level9,
    level10: level10
  },
  addInitialBombs: function addInitialBombs() {
    initialBombs.forEach(function (data) {
      gameBoard[data.box][data.bombType] = true;
    });
  },
  getGameBoardLength: function getGameBoardLength() {
    var length = 0;
    for (var box in gameBoard) {
      if (!gameBoard[box].disabled) {
        length++;
      }
    }
    return length;
  },
  chooseBoard: function chooseBoard() {
    if (settings.endGame) return null;
    track.goToPage("levelsPage");
    document.querySelectorAll(".levelsHolder")[0].innerHTML = "";
    var node = document.getElementsByClassName("levelsHolder")[0];
    settings.level_data.forEach(function (data) {
      data.isLocked ? node.insertAdjacentHTML('beforeend', ui.uiComponents.lockedBoardBox()) : node.insertAdjacentHTML('beforeend', ui.uiComponents.boardBox(data));
    });
  },
  populateBoard: function populateBoard() {
    // populate the gameboard into the UI
    if (document.getElementsByClassName("box").length > 0) {
      var boxes = document.getElementsByClassName("box");
      ui.removeAllLockBoxes();
      for (var i = 0; i < boxes.length; i++) {
        var _gridBox$classList;

        ui.addLockBox('box' + i);
        var gridBox = boxes[i];
        gridBox.className = "";
        (_gridBox$classList = gridBox.classList).add.apply(_gridBox$classList, _toConsumableArray(boxInfo.getAllBoxClasses('box' + i)));
      }
    } else {
      var _loop3 = function _loop3(box) {
        var _gridBox$classList2;

        ui.addLockBox(box);

        var topRightDot = document.createElement("div");
        var topLeftDot = document.createElement("div");
        var bottomRightDot = document.createElement("div");
        var bottomLeftDot = document.createElement("div");
        topRightDot.classList.add("topRightDot");
        topLeftDot.classList.add("topLeftDot");
        bottomRightDot.classList.add("bottomRightDot");
        bottomLeftDot.classList.add("bottomLeftDot");

        var pointer = document.getElementsByClassName("helpPointer")[0];
        var clone = pointer.cloneNode(true);

        var gridBox = document.createElement("div");

        gridBox.appendChild(topRightDot);
        gridBox.appendChild(topLeftDot);
        gridBox.appendChild(bottomRightDot);
        gridBox.appendChild(bottomLeftDot);

        gridBox.appendChild(clone);

        (_gridBox$classList2 = gridBox.classList).add.apply(_gridBox$classList2, _toConsumableArray(boxInfo.getAllBoxClasses(box)));
        gridBox.insertAdjacentHTML('beforeend', ui.uiComponents.spriteSheet(box));
        gridBox.addEventListener("mousedown", function (e) {
          // add a click event to the box click on borders
          if (!isFirstPlayerTurn || boxInfo.isBoxDisabled(box)) return null; // prevent out of turn clicks
          lineClickAction.highlightClickedBorder(e.offsetX, e.offsetY, box, board);
        });
        var node = document.getElementById("board");
        node.appendChild(gridBox); // add the box to the game board
      };

      for (var box in gameBoard) {
        _loop3(box);
      }
    }
    track.setScores();
    boxInfo.adjustBorderCountArrays(); // add boxes with one border to the oneBorderBoxes array, etc...
    ui.populateHelpers();
  },
  populateHelpers: function populateHelpers() {
    //set helpers
    if (!tools) {
      tools = gametask.getTools();
    }

    //empty any helpers still on the board
    var nodes = document.getElementsByClassName("bombToolsBar");
    nodes[0].innerHTML = "";

    //populate board with helps
    tools.forEach(function (data) {
      var tool = document.querySelectorAll('.tool.' + data.name);
      var toolExists = tool.length > 0;
      if (data.count !== 0 && !toolExists) {
        var _tool = ui.uiComponents.helper(data);
        var node = document.getElementsByClassName("bombToolsBar")[0];
        node.insertAdjacentHTML('beforeend', _tool);
      } else if (data.count !== 0) {
        gametask.addTextByQuerySelector('.' + data.name + 'p', data.count);
      } else if (data.count === 0 && toolExists) {
        tool[0].remove();
      }
    });
  },
  removeAllLockBoxes: function removeAllLockBoxes() {
    gametask.removeClassByClassName("box", "locked");
    for (var data in gameBoard) {
      gameBoard[data].isLocked = false;
    }
  },
  addLockBox: function addLockBox(box) {
    if (boxInfo.isALockBox(box) && !boxInfo.isBoxDisabled(box)) {
      gameBoard[box].isLocked = true;
    }
  },
  removeScoreColorIfRemovingBorder: function removeScoreColorIfRemovingBorder(box) {
    gameBoard[box].whoScored = null;
    gametask.removeClassByClassName('.' + box, "firstPlayerScored");
    gametask.removeClassByClassName('.' + box, "secondPlayerScored");
  },
  closeTheBoxConnection: function closeTheBoxConnection(closeTheBoxConnectionParams) {
    var boxNumber = closeTheBoxConnectionParams.boxNumber,
        adjacentBox = closeTheBoxConnectionParams.adjacentBox,
        boxNumberClosedBorder = closeTheBoxConnectionParams.boxNumberClosedBorder,
        adjacentBoxClosedBorder = closeTheBoxConnectionParams.adjacentBoxClosedBorder;

    if (gameBoard[boxNumber].surroundingBoxes[boxNumberClosedBorder + 'Box']) gameBoard[boxNumber].surroundingBoxes[boxNumberClosedBorder + 'Box'].isConnected = false;
    if (adjacentBox && gameBoard[adjacentBox].surroundingBoxes[adjacentBoxClosedBorder + 'Box']) gameBoard[adjacentBox].surroundingBoxes[adjacentBoxClosedBorder + 'Box'].isConnected = false;
  },
  selectHelper: function selectHelper(bombFunction) {
    var hasSelected = document.querySelector('.tool[class*=' + bombFunction + ']').classList.contains("selected");
    var keepSelected = document.querySelector("keepSelected");
    if (hasSelected && keepSelected) {
      var helperDisabled = keepSelected.length > 0;
      if (helperDisabled) return null;
      gametask.removeClassByClassName("tool", "selected");
    } else {
      gametask.removeClassByClassName("tool", "selected");
      gametask.addClassByQuerySelector('.tool[class*=' + bombFunction + ']', "selected");
      selectedBombFunction = bombFunction;
    }
  },
  populateStore: function populateStore() {
    gametask.addTextByQuerySelector("#goldAmount", settings.gold);
    var merchHolder = document.getElementsByClassName("merchHolder")[0];
    merchHolder.innerHTML = "";
    var _settings = settings,
        store = _settings.store;

    for (var item in store) {
      var animalBox = ui.uiComponents.getStoreItem(store[item]);
      merchHolder.append(animalBox);
    }
  },
  populateBombSelectionScreen: function populateBombSelectionScreen() {
    var selectBomb = document.getElementsByClassName("selectBomb")[0];
    selectBomb.innerHTML = "";
    var populated = [];
    settings.itemsPurchased.forEach(function (data) {
      if (!populated.includes(data)) {
        var animalSelectBox = ui.uiComponents.getAnimalSelectBox(data);
        selectBomb.append(animalSelectBox);
        populated.push(data);
      }
    });
    var hasTakenLayTutorial = gameLevel > 4;
    if (populated.length === 0 || !hasTakenLayTutorial) {
      ui.doneBombSelected();
    }
  },
  uiComponents: {
    boardBox: function boardBox(data) {
      var stars = "";
      for (var i = 0; i < data.stars; i++) {
        stars += '<img class="star' + i + '" src="./img/star.png" alt="">';
      }
      return '\n        <div class="level flexCol playBoardButton" onclick="gametask.setGameLevelAndTips(' + data.levelNumber + ')">\n          <p>' + data.levelNumber + '</p>\n          <div class="stars flexRow">\n            ' + stars + '\n          </div>\n        </div>\n      ';
    },
    spriteSheet: function spriteSheet(box) {
      return "<div class='spriteSheet'></div>";
    },
    lockedBoardBox: function lockedBoardBox() {
      return '\n        <div class="level flexCol">\n          <div class="boardLock">\n            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="lock" class="svg-inline--fa fa-lock fa-w-14" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path fill="currentColor" d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z"></path></svg>\n          </div>\n        </div>\n      ';
    },
    helper: function helper(data) {
      return '<div class="tool flexRow ' + data.name + '" onclick="ui.selectHelper(\'' + data.name + '\')">\n        <img src=' + data.src + ' alt="">\n        <svg class="helpPointer" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="hand-point-down" class="svg-inline--fa fa-hand-point-down fa-w-12" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><path fill="currentColor" d="M91.826 467.2V317.966c-8.248 5.841-16.558 10.57-24.918 14.153C35.098 345.752-.014 322.222 0 288c.008-18.616 10.897-32.203 29.092-40 28.286-12.122 64.329-78.648 77.323-107.534 7.956-17.857 25.479-28.453 43.845-28.464l.001-.002h171.526c11.812 0 21.897 8.596 23.703 20.269 7.25 46.837 38.483 61.76 38.315 123.731-.007 2.724.195 13.254.195 16 0 50.654-22.122 81.574-71.263 72.6-9.297 18.597-39.486 30.738-62.315 16.45-21.177 24.645-53.896 22.639-70.944 6.299V467.2c0 24.15-20.201 44.8-43.826 44.8-23.283 0-43.826-21.35-43.826-44.8zM112 72V24c0-13.255 10.745-24 24-24h192c13.255 0 24 10.745 24 24v48c0 13.255-10.745 24-24 24H136c-13.255 0-24-10.745-24-24zm212-24c0-11.046-8.954-20-20-20s-20 8.954-20 20 8.954 20 20 20 20-8.954 20-20z"></path></svg>\n      </div>';
    },
    getStoreItem: function getStoreItem(item) {
      var _animalBox$classList, _animal$classList, _price$classList, _goldMoney$classList, _totalForItem$classLi, _totalForItemP$classL;

      var hasUnlocked = item.hasUnlocked,
          unlockedImgClass = item.unlockedImgClass,
          lockedImgClass = item.lockedImgClass;

      var animalBoxClasses = ["animalBox", "flexCol"];
      var animalClasses = ["animal", hasUnlocked ? unlockedImgClass : lockedImgClass];
      var priceClasses = ["price", "flexRow"];
      var goldMoneyClasses = ["goldMoney"];
      var totalForItemClasses = ["totalForItem"];
      var totalForItemPClasses = ["totalForItemP"];
      var costLabel = item.hasUnlocked ? item.cost : "?";

      var animalBox = document.createElement("div");
      var animal = document.createElement("div");
      var price = document.createElement("div");
      var goldMoney = document.createElement("div");
      var cost = document.createElement("span");
      var totalForItem = document.createElement("div");
      var totalForItemP = document.createElement("p");

      cost.innerText = costLabel;
      totalForItemP.innerText = item.hasUnlocked ? item.quantity : "";
      (_animalBox$classList = animalBox.classList).add.apply(_animalBox$classList, animalBoxClasses);
      (_animal$classList = animal.classList).add.apply(_animal$classList, animalClasses);
      (_price$classList = price.classList).add.apply(_price$classList, priceClasses);
      (_goldMoney$classList = goldMoney.classList).add.apply(_goldMoney$classList, goldMoneyClasses);
      (_totalForItem$classLi = totalForItem.classList).add.apply(_totalForItem$classLi, totalForItemClasses);
      (_totalForItemP$classL = totalForItemP.classList).add.apply(_totalForItemP$classL, totalForItemPClasses);

      price.append(cost);
      price.append(goldMoney);
      animalBox.append(animal);
      animalBox.append(price);
      totalForItem.append(totalForItemP);
      animalBox.append(totalForItem);

      animalBox.addEventListener("click", function () {
        var animal = item.unlockedImgClass.replace("buy_", "");
        var cost = price.innerText === "?" ? 10000000 : parseInt(item.cost);
        gametask.selectStoreItem(animal, cost);
      });

      return animalBox;
    },
    getAnimalSelectBox: function getAnimalSelectBox(animal) {
      var _animalBox$classList2;

      var animalBoxClasses = ["animalBombSelectBox", 'buy_' + animal];
      var animalBox = document.createElement("div");
      (_animalBox$classList2 = animalBox.classList).add.apply(_animalBox$classList2, animalBoxClasses);
      animalBox.addEventListener("click", function () {
        ui.selectPregameBomb('buy_' + animal);
      });
      return animalBox;
    }
  },
  tools: [{
    name: "lion",
    src: "./img/color_animals/asset_lion.png",
    count: 1
  }, {
    name: "cheetah",
    src: "./img/color_animals/asset_cheetah.png",
    count: 1
  }, {
    name: "panther",
    src: "./img/color_animals/asset_panther.png",
    count: 1
  }],
  changeDifficulty: function changeDifficulty(diff) {
    settings.difficulty = diff;
    gametask.saveToLocalStorage("settings", settings);
    ui.setDifficulty();
  },
  setDifficulty: function setDifficulty() {
    gametask.removeClassByClassName("diff", "selectedSetting");
    gametask.addClassByClassName(settings.difficulty, "selectedSetting");
  },
  toggleSound: function toggleSound() {
    settings.hasMutedSound = !settings.hasMutedSound;
    gametask.saveToLocalStorage("settings", settings);
    ui.setSound();
  },
  setSound: function setSound() {
    gametask.removeClassByClassName("sound", "selectedSetting");
    if (settings.hasMutedSound) {
      gametask.addClassByQuerySelector(".sound.sOptions.off", "selectedSetting");
    } else {
      gametask.addClassByQuerySelector(".sound.sOptions.on", "selectedSetting");
    }
  },
  toggleMusic: function toggleMusic() {
    settings.hasMutedMusic = !settings.hasMutedMusic;
    gametask.saveToLocalStorage("settings", settings);
    ui.setMusic();
  },
  setMusic: function setMusic() {
    gametask.removeClassByClassName("music", "selectedSetting");
    if (settings.hasMutedMusic) {
      gametask.addClassByQuerySelector(".music.mOptions.off", "selectedSetting");
    } else {
      gametask.addClassByQuerySelector(".music.mOptions.on", "selectedSetting");
    }
  },
  showHint: function showHint() {
    var index = gametask.getRandomIndexInArray(noBorders);
    var box = noBorders[index];
    gametask.addClassByClassName(box, "hint");
    setTimeout(function () {
      gametask.removeClassByClassName(box, "hint");
    }, 600);
  },
  setSettingsIfOnSettingsPage: function setSettingsIfOnSettingsPage(page) {
    if (page === "settingsPage") {
      ui.setDifficulty();
      ui.setSound();
      ui.setMusic();
    }
  },
  animateScore: function animateScore(prize, starTimeout) {
    var remainingGold = parseInt(gametask.getTextByQuerySelector(".remainingGold"));
    var hasScore = remainingGold !== 0;
    if (hasScore) {
      var changeNumber = function changeNumber() {
        var gold = remainingGold;
        starTimeout += 100;
        setTimeout(function () {
          // gametask.addTextByQuerySelector(".remainingGold", gold);
          var currectGold = parseInt(gametask.getTextByQuerySelector(".currentGoldCount")) + 1;
          gametask.addTextByQuerySelector(".currentGoldCount", currectGold);
          settings.gold = currectGold;
        }, starTimeout);
        remainingGold--;
        if (remainingGold > 0) {
          changeNumber();
        }
      };
      changeNumber();
    }
    setTimeout(function () {
      ui.showGift(prize, starTimeout);
    }, starTimeout);
  },
  showGift: function showGift(prize, starTimeout) {
    if (prize) {
      setTimeout(function () {
        var hasClaimed = getGameLevelObj.hasLargePrize && getGameLevelObj.hasLargePrize.hasClaimed;
        if (!getGameLevelObj.hasLargePrize || hasClaimed) {
          gametask.addClassByClassName("goldScreen", "smallPrize");
        } else {
          settings.level_data[gameLevel].hasLargePrize.hasClaimed = true;
          gametask.saveToLocalStorage("settings", settings);
          gametask.removeClassByClassName("goldScreen", "smallPrize");
          var _prize = getGameLevelObj.hasLargePrize.prize;
          var img = document.querySelector(".goldScreen img");
          img.src = './img/rewards/' + _prize + '_reward.png';
          var currentClass = img.classList[0];
          img.classList.remove(currentClass);
          img.classList.add(_prize + '_reward');
          settings.store[_prize].hasUnlocked = true;
          var currentQuantity = settings.store[_prize].quantity;
          settings.store[_prize].quantity = currentQuantity + 1;
          settings.itemsPurchased.push(_prize);
          gametask.saveToLocalStorage("settings", settings);
        }
        gametask.addClassByClassName("rewardScreen", "showPrice");
        setTimeout(function () {
          gametask.addClassByQuerySelector("svg.redoBtn", "showBtn");
          if (settings.level_data[gameLevel + 1]) {
            gametask.addClassByQuerySelector("svg.nextBtn", "showBtn");
          }
        }, 1000);
      }, 200);
    }
  },
  showEndGameScreen: function showEndGameScreen(stars, yourScore, computerScore, currentGoldCount, prize) {
    gametask.resetPlayerTurn();
    gametask.removeClassByClassName("gameCompleteBox", "hideGameComplete");
    gametask.addTextByQuerySelector(".yourScore", yourScore);
    gametask.addTextByQuerySelector(".computerScore", computerScore);
    var remainingGold = parseInt(yourScore) - parseInt(computerScore);
    gametask.addTextByQuerySelector(".remainingGold", remainingGold);
    gametask.addTextByQuerySelector(".currentGoldCount", currentGoldCount);
    setTimeout(function () {
      document.getElementsByClassName("rewardScreen")[0].style.opacity = 1;
    }, 1000);
    var starTimeout = 200;
    var showStars = function showStars(count) {
      var starCount = count + 1;
      setTimeout(function () {
        document.getElementsByClassName('completeStar' + starCount)[0].style.opacity = 1;
      }, starTimeout);
      starTimeout += 200;
    };
    setTimeout(function () {
      for (var i = 0; i < stars; i++) {
        showStars(i);
      }
      ui.animateScore(prize, starTimeout);
    }, starTimeout);
  },
  showCompleteScreen: function showCompleteScreen() {
    setTimeout(function () {
      var stars = gametask.getStarsForWinner(playerOneScore);
      gametask.setStarsForWinner(stars);
      gametask.openNextBoard(stars);
      var yourScore = playerOneScore;
      var computerScore = playerTwoScore;
      var currentGoldCount = settings.gold;
      var prize = "cheetah";
      ui.showEndGameScreen(stars, yourScore, computerScore, currentGoldCount, prize);
    }, 500);
  },
  showTextTimeout: 0,
  showText: function showText(text) {
    gametask.removeClassByClassName("helpTextP", "showHelpText");
    clearTimeout(ui.showTextTimeout);
    ui.showTextTimeout = setTimeout(function () {
      gametask.addHTMLByQuerySelector(".helpTextP", text);
      gametask.addClassByClassName("helpTextP", "showHelpText");
    }, 500);
  },
  startLevelText: function startLevelText() {
    if (!getGameLevelObj["help"]) {
      gametask.removeClassByQuerySelector(".helpTextP", "showHelpText");
      return null;
    };

    var levelText = getGameLevelObj["help"]["boardHelpText"]();
    var turnsToShowText = levelText ? getGameLevelObj["help"]["helpTurns"] : [];

    if (track.turn === 0) {
      helpText = levelText;
    }

    if (!helpText && levelText && turnsToShowText.includes(track.turn)) {
      var text = helpText.next().value;
      ui.showText(text || "");
    } else if (helpText && turnsToShowText.includes(track.turn)) {
      var _text = helpText.next().value;
      ui.showText(_text || "");
    }
    if (turnsToShowText.indexOf(track.turn) === turnsToShowText.length - 1) {
      setTimeout(function () {
        ui.showText("");
      }, 8000);
    }
  },
  fillPreFilledBoxes: function fillPreFilledBoxes() {
    var _getGameLevelObj = getGameLevelObj,
        prefilledBoxes = _getGameLevelObj.prefilledBoxes;

    if (prefilledBoxes) {
      for (var box in gameBoard) {
        if (prefilledBoxes.includes(box)) {
          // fill box
          gameBoard[box].borders.top = true;
          gameBoard[box].borders.right = true;
          gameBoard[box].borders.bottom = true;
          gameBoard[box].borders.left = true;
          gameBoard[box].whoScored = "secondPlayerScored";
          // fill adj box
          var topAdj = boxInfo.getAdjBoxBySide(box, "top");
          var rightAdj = boxInfo.getAdjBoxBySide(box, "right");
          var leftAdj = boxInfo.getAdjBoxBySide(box, "left");
          var bottomAdj = boxInfo.getAdjBoxBySide(box, "bottom");
          if (topAdj) {
            gameBoard[topAdj].borders.bottom = true;
          }
          if (rightAdj) {
            gameBoard[rightAdj].borders.left = true;
          }
          if (bottomAdj) {
            gameBoard[bottomAdj].borders.top = true;
          }
          if (leftAdj) {
            gameBoard[leftAdj].borders.right = true;
          }
        }
      }
    }
  },
  undoFinishScreen: function undoFinishScreen() {
    gametask.addClassByClassName("gameCompleteBox", "hideGameComplete");
    gametask.addTextByQuerySelector(".yourScore", 0);
    gametask.addTextByQuerySelector(".computerScore", 0);
    gametask.addTextByQuerySelector(".remainingGold", 0);
    gametask.addTextByQuerySelector(".currentGoldCount", 0);
    document.getElementsByClassName("rewardScreen")[0].style.opacity = 0;
    document.getElementsByClassName('completeStar1')[0].style.opacity = 0;
    document.getElementsByClassName('completeStar2')[0].style.opacity = 0;
    document.getElementsByClassName('completeStar3')[0].style.opacity = 0;
    gametask.removeClassByClassName("rewardScreen", "showPrice");
    gametask.removeClassByQuerySelector("svg.redoBtn", "showBtn");
    gametask.removeClassByQuerySelector("svg.nextBtn", "showBtn");
  },
  redoBorder: function redoBorder() {
    if (currentPage !== "gameBoardPage") return null;
    ui.undoFinishScreen();
    var click = ui.click();
    document.getElementsByClassName("boardBackButton")[0].dispatchEvent(click);
    gameLevel++;
    gametask.setGameLevelAndTips(gameLevel);
  },
  nextBoard: function nextBoard() {
    var notOnBoard = currentPage !== "gameBoardPage";
    var hasAnotherLevel = gameLevel && settings.level_data[gameLevel + 1];
    if (notOnBoard || hasAnotherLevel === false) return null;
    ui.undoFinishScreen();
    var click = ui.click();
    document.getElementsByClassName("boardBackButton")[0].dispatchEvent(click);
    gameLevel += 2;
    gametask.setGameLevelAndTips(gameLevel);
  },
  click: function click() {
    return clickEvent = new MouseEvent("click", {
      "view": window,
      "bubbles": true,
      "cancelable": false
    });
  },
  checkForGameBoardTextConditions: function checkForGameBoardTextConditions() {
    if (pointsInArow > 10) {
      boardText.showText("excellent");
    } else if (pointsInArow > 5) {
      boardText.showText("good");
    }
  },
  animateBombMovement: function animateBombMovement(boxNumber) {
    var helper = document.querySelectorAll(".tool.selected > img")[0];
    var box = document.querySelectorAll('.' + boxNumber)[0];
    var boardHolder = document.getElementById("boardHolder");
    var src = helper.src,
        offsetHeight = helper.offsetHeight,
        offsetWidth = helper.offsetWidth,
        x = helper.x,
        y = helper.y;

    // position the image

    var node = document.createElement("img");
    document.getElementById("gameScreen").appendChild(node);
    node.id = "helperMovingImage";
    node.src = src;
    node.style.position = "absolute";
    node.style.left = x + 'px';
    node.style.top = y + 'px';
    node.style.height = offsetHeight + 'px';
    node.style.width = offsetWidth + 'px';
    node.style.transform = "scale(2)";
    node.style.transition = "all 0.15s";

    // get position of box
    var rect = box.getBoundingClientRect();
    var position = {
      top: rect.top + window.pageYOffset,
      left: rect.left + window.pageXOffset
    };

    // move the image to the box
    var helperMovingImage = document.getElementById("helperMovingImage");
    helperMovingImage.style.transform = "scale(1.1)";
    helperMovingImage.style.left = position.left + 'px';
    helperMovingImage.style.top = position.top + 'px';

    setTimeout(function () {
      helperMovingImage.remove();
      if (boxInfo.getBorderCount(boxNumber) === 4) {
        bomb.explodeBoxes(boxNumber);
      }
    }, 250);
  },
  animateStars: function animateStars() {
    setInterval(function () {
      var timeoutToNext = 0;
      var nums = [0, 1, 2];
      nums.forEach(function (num) {
        timeoutToNext += 100;
        setTimeout(function () {
          gametask.addClassByClassName('star' + num, 'up');
          setTimeout(function () {
            gametask.removeClassByClassName('star' + num, 'up');
          }, 400);
        }, timeoutToNext);
      });
    }, 4000);
  },
  animateDots: function animateDots() {
    setInterval(function () {
      var topRightDot = document.querySelectorAll(".topRightDot");
      var topLeftDot = document.querySelectorAll(".topLeftDot");
      var bottomRightDot = document.querySelectorAll(".bottomRightDot");
      var bottomLeftDot = document.querySelectorAll(".bottomLeftDot");
      var length = 36;
      for (var i = 0; i < length; i++) {
        if (Math.random() < 0.5) {
          topRightDot[i].classList.add("lighterDot");
          topLeftDot[i].classList.add("lighterDot");
          bottomRightDot[i].classList.add("lighterDot");
          bottomLeftDot[i].classList.add("lighterDot");
        } else {
          topRightDot[i].classList.remove("lighterDot");
          topLeftDot[i].classList.remove("lighterDot");
          bottomRightDot[i].classList.remove("lighterDot");
          bottomLeftDot[i].classList.remove("lighterDot");
        }
      }
    }, 2000);
  },
  displayNoClickIndicator: function displayNoClickIndicator(boxNumber, lineClicked) {
    var incorrectLineClick = function incorrectLineClick(box, classToAdd) {
      gametask.addClassByClassName(box, classToAdd);
      setTimeout(function () {
        gametask.removeClassByClassName(box, classToAdd);
      }, 1000);
    };

    var lineClickClass = {
      top: {
        thisBox: "cantClickTop",
        adjBox: "cantClickBottom"
      },
      right: {
        thisBox: "cantClickRight",
        adjBox: "cantClickLeft"
      },
      bottom: {
        thisBox: "cantClickBottom",
        adjBox: "cantClickTop"
      },
      left: {
        thisBox: "cantClickLeft",
        adjBox: "cantClickRight"
      }
    };

    incorrectLineClick(boxNumber, lineClickClass[lineClicked].thisBox);

    var adjacentBox = null;
    var adjBoxNumber = null;
    var hasAdjacentBox = gameBoard[boxNumber].surroundingBoxes[lineClicked + 'Box'] !== null && gameBoard[boxNumber].surroundingBoxes[lineClicked + 'Box'] !== undefined;
    if (hasAdjacentBox) {
      adjacentBox = gameBoard[boxNumber].surroundingBoxes[lineClicked + 'Box'].boxNumber;
      adjBoxNumber = 'box' + adjacentBox;
      incorrectLineClick(adjBoxNumber, lineClickClass[lineClicked].adjBox);
    }
  },
  togglePregameScreen: function togglePregameScreen() {
    if (gametask.hasClassByQuerySelector(".silverScreen", "hidePregameScreen")) {
      gametask.removeClassByClassName("silverScreen", "hidePregameScreen");
    } else {
      gametask.addClassByClassName("silverScreen", "hidePregameScreen");
    }
  },
  uiPopulater: null,
  populateTheUI: function populateTheUI() {
    if (ui.uiPopulater === null) {
      ui.populateBoard();
      ui.uiPopulater = 1;
    } else {
      clearTimeout(ui.uiPopulater);
      ui.uiPopulater = setTimeout(function () {
        ui.populateBoard();
      });
    }
    gametask.setTurnRestrictions();
    track.adjustScore();
  },
  showHelper: function showHelper(boxNumber) {
    tools.forEach(function (data) {
      if (data.name === selectedBombFunction) data.count--;
    });
    var explosionType = void 0;
    if (selectedBombFunction === "lion") explosionType = "isLionExplosion";
    if (selectedBombFunction === "cheetah") explosionType = "isCheetahExplosion";
    if (selectedBombFunction === "panther") explosionType = "isPantherExplosion";
    if (selectedBombFunction === "queen_makeda") explosionType = "isQueenMakedaExplosion";
    if (explosionType) gameBoard[boxNumber][explosionType] = true;
  },
  addHighlightToClickBox: function addHighlightToClickBox(clickBox) {
    setTimeout(function () {
      gametask.addClassByClassName(clickBox, "clickBox");
    }, 500);
  },
  toggleBombSelected: function toggleBombSelected() {
    var selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    var classList = selectBombScreen.classList;
    if (classList.contains("showBoard")) {
      selectBombScreen.classList.remove("showBoard");
    } else {
      selectBombScreen.classList.add("showBoard");
    }
  },
  doneBombSelected: function doneBombSelected() {
    var selectBombScreen = document.getElementsByClassName("selectBombScreen")[0];
    selectBombScreen.classList.remove("showBoard");
    selectBombScreen.classList.add("playGame");
    if (!tools) {
      tools = gametask.getTools();
    }
    var used = [];
    settings.itemsSelected.forEach(function (item) {
      var animalName = item.replace("buy_", "");
      var animal = void 0;
      if (animalName.includes("queen")) {
        animal = {
          name: animalName,
          src: './img/queens/asset_' + animalName + '.png',
          count: 1
        };
      } else {
        animal = {
          name: animalName,
          src: './img/color_animals/asset_' + animalName + '.png',
          count: 1
        };
      }
      var isInTools = false;
      tools.forEach(function (data) {
        if (data.name === animalName) {
          isInTools = true;
        }
      });
      if (!isInTools) {
        tools = [].concat(_toConsumableArray(tools), [animal]);
        used.push(item);
      }
    });
    used.forEach(function (data) {
      var animalName = data.replace("buy_", "");
      var index = settings.itemsPurchased.indexOf(animalName);
      settings.itemsPurchased.splice(index, 1);
      var currentQuantity = settings.store[animalName].quantity;
      settings.store[animalName].quantity = currentQuantity - 1;
    });
    gametask.saveToLocalStorage("settings", settings);
    settings.itemsSelected = [];
    ui.populateHelpers();
  },
  selectPregameBomb: function selectPregameBomb(selected) {
    var animal = document.querySelector('.' + selected + '.selectedBombForBoard');
    if (animal) {
      gametask.removeClassByQuerySelector('.animalBombSelectBox.' + selected, "selectedBombForBoard");
      var _index2 = settings.itemsSelected.indexOf(selected);
      settings.itemsSelected.splice(_index2, 1);
    } else {
      gametask.addClassByQuerySelector('.animalBombSelectBox.' + selected, "selectedBombForBoard");
      settings.itemsSelected.push(selected);
    }
  },
  toggleConfirmScreen: function toggleConfirmScreen() {
    if (gametask.hasClassByClassName("buyItemContainer", "hidePurchaseScreen")) {
      gametask.removeClassByClassName("buyItemContainer", "hidePurchaseScreen");
    } else {
      gametask.addClassByClassName("buyItemContainer", "hidePurchaseScreen");
    }
  }
};

window.boxInfo = {
  getGameBoardClickBox: function getGameBoardClickBox(clickBox) {
    return gameBoard[clickBox];
  },
  getSurroundingBoxesInfo: function getSurroundingBoxesInfo(clickBox, boxSide) {
    return gameBoard[clickBox].surroundingBoxes[boxSide];
  },
  getSurroundingBoxesKeys: function getSurroundingBoxesKeys(clickBox) {
    if (!Object.keys(boxInfo.getGameBoardClickBox(clickBox))) {
      return null;
    }
    return Object.keys(boxInfo.getGameBoardClickBox(clickBox).surroundingBoxes);
  },
  isBoxDisabled: function isBoxDisabled(box) {
    return gameBoard[box].disabled === true;
  },
  getBorderCount: function getBorderCount(box) {
    var borders = gameBoard[box].borders;
    var count = 0;
    Object.keys(borders).forEach(function (data) {
      if (borders[data]) count++;
    });
    return count;
  },
  getSafeBoxes: function getSafeBoxes() {
    var safeClickBoxWithSide = [];
    var oneBorder = [].concat(oneBorderBoxes);
    oneBorder.forEach(function (box) {
      oneBorderBoxes.splice(oneBorderBoxes.indexOf(box), 1);
      var edgeBox = boxInfo.edgeBox(box);
      if (edgeBox.hasEdgeBox) {
        // task takes care of the corner cases by clicked its empty side
        safeClickBoxWithSide.push({
          clickBox: box,
          clickSide: edgeBox.clickSide
        });
      } else {
        var surroundingOnBorderBoxes = boxInfo.getSurroundingBoxes(box).filter(function (data) {
          return oneBorderBoxes.includes(data);
        });
        surroundingOnBorderBoxes.forEach(function (data) {
          var adjObj = boxInfo.isAdjacentBoxesConnected(box, data);
          if (adjObj.isConnected) {
            safeClickBoxWithSide.push({
              clickBox: box,
              clickSide: adjObj.side
            });
          }
        });
      }
    });
    return safeClickBoxWithSide;
  },
  getAllBoxClasses: function getAllBoxClasses(box) {
    var classesToAdd = ["box", "flexRow", box];

    if (gameBoard[box].borders.top) {
      if (whoClickedLine[box].top === "computer") {
        classesToAdd.push("borderTopComputer");
      } else {
        classesToAdd.push("borderTop");
      }
    }
    if (gameBoard[box].borders.right) {
      if (whoClickedLine[box].right === "computer") {
        classesToAdd.push("borderRightComputer");
      } else {
        classesToAdd.push("borderRight");
      }
    }
    if (gameBoard[box].borders.bottom) {
      if (whoClickedLine[box].bottom === "computer") {
        classesToAdd.push("borderBottomComputer");
      } else {
        classesToAdd.push("borderBottom");
      }
    }
    if (gameBoard[box].borders.left) {
      if (whoClickedLine[box].left === "computer") {
        classesToAdd.push("borderLeftComputer");
      } else {
        classesToAdd.push("borderLeft");
      }
    }

    if (gameBoard[box].whoScored) classesToAdd.push(gameBoard[box].whoScored);

    if (gameBoard[box].isLionExplosion) {
      classesToAdd.push("isLionExplosion");
    } else if (gameBoard[box].isCheetahExplosion) {
      classesToAdd.push("isCheetahExplosion");
    } else if (gameBoard[box].isPantherExplosion) {
      classesToAdd.push("isPantherExplosion");
    } else if (gameBoard[box].isQueenMakedaExplosion) {
      classesToAdd.push("isQueenMakedaExplosion");
    }

    var sideClasses = ["isTopRightCornerBox", "isTopLeftCornerBox", "isBottomRightCornerBox", "isBottomLeftCornerBox", "isTopSideRow", "isRightSideRow", "isBottomSideRow", "isLeftSideRow"];

    sideClasses.forEach(function (className) {
      if (gameBoard[box][className]) {
        classesToAdd.push(className);
      }
    });

    if (gameBoard[box].isLocked === true) {
      classesToAdd.push("locked");
    }

    if (boxInfo.isBoxDisabled(box)) {
      classesToAdd.push("disabled");
    }

    return classesToAdd;
  },
  getUnclickedBorders: function getUnclickedBorders(box) {
    var bordersArray = [];
    var borders = gameBoard[box].borders;
    Object.keys(borders).forEach(function (data) {
      if (!borders[data]) bordersArray.push(data);
    });
    return bordersArray;
  },
  getClickedBorders: function getClickedBorders(box) {
    var bordersArray = [];
    var borders = gameBoard[box].borders;
    Object.keys(borders).forEach(function (data) {
      if (borders[data]) bordersArray.push(data);
    });
    return bordersArray;
  },
  adjustBorderCountArrays: function adjustBorderCountArrays() {
    boxInfo.clearBorderArrays();
    for (var box in gameBoard) {
      if (!boxInfo.isBoxDisabled(box)) {
        var borderCount = boxInfo.getBorderCount(box);
        if (boxInfo.countsAsNoBorders(box, borderCount)) noBorders.push(box);else if (boxInfo.countsAsOneBorders(box, borderCount)) oneBorderBoxes.push(box);else if (boxInfo.countsAsTwoBorders(box, borderCount)) twoBorderBoxes.push(box);else if (boxInfo.countsAsThreeBorders(box, borderCount)) threeBorderBoxes.push(box);
      }
    }
  },
  countsAsNoBorders: function countsAsNoBorders(box, borderCount) {
    if (boxInfo.isALockBox(box)) return false;
    return borderCount === 0;
  },
  countsAsOneBorders: function countsAsOneBorders(box, borderCount) {
    if (boxInfo.isALockBox(box)) return false;
    return borderCount === 1;
  },
  countsAsTwoBorders: function countsAsTwoBorders(box, borderCount) {
    if (boxInfo.isALockBox(box)) return false;
    return borderCount === 2;
  },
  countsAsThreeBorders: function countsAsThreeBorders(box, borderCount) {
    if (boxInfo.isALockBox(box)) return false;
    return borderCount === 3;
  },
  isAdjBoxALockBox: function isAdjBoxALockBox(box, side) {
    var adjBox = boxInfo.getAdjBoxBySide(box, side);
    return boxInfo.isALockBox(adjBox);
  },
  getAdjBoxBySide: function getAdjBoxBySide(box, side) {
    var boxNumber = parseInt(box.replace("box", ""));
    var adjBox = void 0;
    if (side === "top") {
      adjBox = boxInfo.getTopBox(boxNumber);
    } else if (side === "left") {
      adjBox = boxInfo.getLeftBox(boxNumber);
    } else if (side === "bottom") {
      adjBox = boxInfo.getBottomBox(boxNumber);
    } else if (side === "right") {
      adjBox = boxInfo.getRightBox(boxNumber);
    }
    return adjBox;
  },
  isALockBox: function isALockBox(box) {
    var allBombs = [];
    lockBombLocations.forEach(function (data) {
      return allBombs.push(data.box);
    });
    return allBombs.includes(box);
  },
  clearBorderArrays: function clearBorderArrays() {
    noBorders.length = 0;
    oneBorderBoxes.length = 0;
    twoBorderBoxes.length = 0;
    threeBorderBoxes.length = 0;
  },
  isAdjacentBoxesConnected: function isAdjacentBoxesConnected(box1, box2) {
    var adjObj = {
      isConnected: false
    };
    var bordersBox2 = boxInfo.getGameBoardClickBox(box2).borders;
    var surroundingBoxes = boxInfo.getGameBoardClickBox(box1).surroundingBoxes;
    boxInfo.getSurroundingBoxesKeys(box1).forEach(function (data) {
      var complement = boxInfo.complementBorder[data.replace("Box", "")];
      if (surroundingBoxes[data] && 'box' + surroundingBoxes[data].boxNumber === box2 && bordersBox2[complement] === null) {
        adjObj.isConnected = true;
        adjObj.side = data.replace("Box", "");
      }
    });
    return adjObj;
  },
  edgeBox: function edgeBox(clickBox) {
    // return an edge box
    var edgeBox = {
      hasEdgeBox: false,
      clickSide: null
    };
    var surroundingBoxesKeys = boxInfo.getSurroundingBoxesKeys(clickBox);
    var clickBoxObj = boxInfo.getGameBoardClickBox(clickBox);
    surroundingBoxesKeys.forEach(function (data) {
      if (clickBoxObj.surroundingBoxes[data] === null && clickBoxObj.borders[data.replace("Box", "")] === null) {
        edgeBox.hasEdgeBox = true;
        edgeBox.clickSide = data.replace("Box", "");
      }
    });
    return edgeBox;
  },
  isEdgeBox: function isEdgeBox(box) {
    var boxInfo = gameBoard[box];
    if (boxInfo.disabled) return false;

    if (boxInfo.isTopRightCornerBox || boxInfo.isTopLeftCornerBox || boxInfo.isBottomRightCornerBox || boxInfo.isBottomLeftCornerBox || boxInfo.isTopSideRow || boxInfo.isRightSideRow || boxInfo.isBottomSideRow || boxInfo.isLeftSideRow) {
      return true;
    }

    return false;
  },
  getLineBetweenBoxes: function getLineBetweenBoxes(clickBox, selectedBox) {
    var selectedSide = null;
    boxInfo.getSurroundingBoxesKeys(clickBox).forEach(function (data) {
      var number = boxInfo.getSurroundingBoxesInfo(clickBox, data) ? boxInfo.getSurroundingBoxesInfo(clickBox, data).boxNumber : null;
      if (selectedBox === 'box' + number) {
        selectedSide = data;
      }
    });
    return selectedSide;
  },
  getLessThanOneBorderNonConnectedSurroundingBoxes: function getLessThanOneBorderNonConnectedSurroundingBoxes(clickBox) {
    var surroundingBoxes = boxInfo.getSurroundingBoxes(clickBox);
    var matchingBoxes = [];
    surroundingBoxes.map(function (data) {
      var borders = boxInfo.getBorderCount(data);
      if (borders <= 1) matchingBoxes.push(data);
    });
    return matchingBoxes;
  },
  getSurroundingBoxes: function getSurroundingBoxes(clickBox) {
    var surroundingBoxes = [];
    boxInfo.getSurroundingBoxesKeys(clickBox).forEach(function (data) {
      if (boxInfo.getSurroundingBoxesInfo(clickBox, data)) surroundingBoxes.push(boxInfo.getSurroundingBoxesInfo(clickBox, data).boxNumber);
    });
    return surroundingBoxes.filter(function (data) {
      return data;
    }).map(function (box) {
      return 'box' + box;
    });
  },
  getOneBorderConnectedSurroundingBoxes: function getOneBorderConnectedSurroundingBoxes(box) {
    var oneBorderConnectedSurroundingBoxes = [];
    var connectedSurroundingBoxes = boxInfo.getSurroundingBoxes(box).filter(function (adjBox) {
      return boxInfo.isAdjacentBoxesConnected(box, adjBox).isConnected;
    });
    connectedSurroundingBoxes.forEach(function (surBox) {
      if (boxInfo.getBorderCount(surBox) === 1) {
        oneBorderConnectedSurroundingBoxes.push(surBox);
      }
    });
    return oneBorderConnectedSurroundingBoxes;
  },
  getConnectedBoxes: function getConnectedBoxes(box) {
    var connectedBoxes = [];
    var surroundingBoxes = boxInfo.getSurroundingBoxes(box);
    surroundingBoxes.forEach(function (surBox) {
      if (boxInfo.isAdjacentBoxesConnected(box, surBox).isConnected) {
        connectedBoxes.push(surBox);
      }
    });
    return connectedBoxes;
  },
  getAllBorders: function getAllBorders(box) {
    return {
      topRightBoxNumber: boxInfo.getTopRightBoxNumber(box),
      topLeftBoxNumber: boxInfo.getTopLeftBoxNumber(box),
      bottomRightBoxNumber: boxInfo.getBottomRightBoxNumber(box),
      bottomLeftBoxNumber: boxInfo.getBottomLeftBoxNumber(box),
      topBox: boxInfo.getTopBox(box),
      leftBox: boxInfo.getLeftBox(box),
      bottomBox: boxInfo.getBottomBox(box),
      rightBox: boxInfo.getRightBox(box)
    };
  },
  getTopRightBoxNumber: function getTopRightBoxNumber(box) {
    var topRightBoxNumber = box - (rowLength - 1);
    return boxInfo.hasTopRightBoxNumber('box' + topRightBoxNumber, 'box' + box) ? 'box' + topRightBoxNumber : false;
  },
  getTopLeftBoxNumber: function getTopLeftBoxNumber(box) {
    var topLeftBoxNumber = box - (rowLength + 1);
    return boxInfo.hasTopLeftBoxNumber('box' + topLeftBoxNumber, 'box' + box) ? 'box' + topLeftBoxNumber : false;
  },
  getBottomRightBoxNumber: function getBottomRightBoxNumber(box) {
    var bottomRightBoxNumber = box + (rowLength + 1);
    return boxInfo.hasBottomRightBoxNumber('box' + bottomRightBoxNumber, 'box' + box) ? 'box' + bottomRightBoxNumber : false;
  },
  getBottomLeftBoxNumber: function getBottomLeftBoxNumber(box) {
    var bottomLeftBoxNumber = box + (rowLength - 1);
    return boxInfo.hasBottomLeftBoxNumber('box' + bottomLeftBoxNumber, 'box' + box) ? 'box' + bottomLeftBoxNumber : false;
  },
  getTopBox: function getTopBox(box) {
    var topBox = box - rowLength;
    return boxInfo.hasTopBox('box' + topBox, 'box' + box) ? 'box' + topBox : false;
  },
  getLeftBox: function getLeftBox(box) {
    var leftBox = box - 1;
    return boxInfo.hasLeftBox('box' + leftBox, 'box' + box) ? 'box' + leftBox : false;
  },
  getBottomBox: function getBottomBox(box) {
    var bottomBox = box + rowLength;
    return boxInfo.hasBottomBox('box' + bottomBox, 'box' + box) ? 'box' + bottomBox : false;
  },
  getRightBox: function getRightBox(box) {
    var rightBox = box + 1;
    return boxInfo.hasRightBox('box' + rightBox, 'box' + box) ? 'box' + rightBox : false;
  },
  hasTopRightBoxNumber: function hasTopRightBoxNumber(topRightBoxNumber, box) {
    return gameBoard[topRightBoxNumber] && !gameBoard[box].isTopRightCornerBox && !gameBoard[box].isTopSideRow && !gameBoard[box].isTopLeftCornerBox && !gameBoard[box].isRightSideRow && !gameBoard[box].isBottomRightCornerBox;
  },
  hasTopLeftBoxNumber: function hasTopLeftBoxNumber(topLeftBoxNumber, box) {
    return gameBoard[topLeftBoxNumber] && !gameBoard[box].isTopSideRow && !gameBoard[box].isTopLeftCornerBox && !gameBoard[box].isTopRightCornerBox && !gameBoard[box].isLeftSideRow && !gameBoard[box].isBottomLeftCornerBox;
  },
  hasBottomRightBoxNumber: function hasBottomRightBoxNumber(bottomRightBoxNumber, box) {
    return gameBoard[bottomRightBoxNumber] && !gameBoard[box].isTopRightCornerBox && !gameBoard[box].isRightSideRow && !gameBoard[box].isBottomRightCornerBox && !gameBoard[box].isBottomSideRow && !gameBoard[box].isBottomLeftCornerBox;
  },
  hasBottomLeftBoxNumber: function hasBottomLeftBoxNumber(bottomLeftBoxNumber, box) {
    return gameBoard[bottomLeftBoxNumber] && !gameBoard[box].isTopLeftCornerBox && !gameBoard[box].isLeftSideRow && !gameBoard[box].isBottomLeftCornerBox && !gameBoard[box].isBottomSideRow && !gameBoard[box].isBottomRightCornerBox;
  },
  hasTopBox: function hasTopBox(topBox, box) {
    return gameBoard[topBox] && !gameBoard[box].isTopRightCornerBox && !gameBoard[box].isTopSideRow && !gameBoard[box].isTopLeftCornerBox;
  },
  hasLeftBox: function hasLeftBox(leftBox, box) {
    return gameBoard[leftBox] && !gameBoard[box].isTopLeftCornerBox && !gameBoard[box].isLeftSideRow && !gameBoard[box].isBottomLeftCornerBox;
  },
  hasBottomBox: function hasBottomBox(bottomBox, box) {
    return gameBoard[bottomBox] && !gameBoard[box].isBottomLeftCornerBox && !gameBoard[box].isBottomSideRow && !gameBoard[box].isBottomRightCornerBox;
  },
  hasRightBox: function hasRightBox(rightBox, box) {
    return gameBoard[rightBox] && !gameBoard[box].isTopRightCornerBox && !gameBoard[box].isRightSideRow && !gameBoard[box].isBottomRightCornerBox;
  },
  getBordersToRemove: function getBordersToRemove(box, _ref2) {
    var topRightBoxNumber = _ref2.topRightBoxNumber,
        topLeftBoxNumber = _ref2.topLeftBoxNumber,
        bottomRightBoxNumber = _ref2.bottomRightBoxNumber,
        bottomLeftBoxNumber = _ref2.bottomLeftBoxNumber,
        topBox = _ref2.topBox,
        leftBox = _ref2.leftBox,
        bottomBox = _ref2.bottomBox,
        rightBox = _ref2.rightBox;

    return [{
      box: box,
      lines: ["top", "right", "bottom", "left"]
    }, {
      box: topRightBoxNumber,
      lines: ["bottom", "left"]
    }, {
      box: topLeftBoxNumber,
      lines: ["right", "bottom"]
    }, {
      box: bottomRightBoxNumber,
      lines: ["top", "left"]
    }, {
      box: bottomLeftBoxNumber,
      lines: ["top", "right"]
    }, {
      box: topBox,
      lines: ["right", "bottom", "left"]
    }, {
      box: leftBox,
      lines: ["top", "right", "bottom"]
    }, {
      box: bottomBox,
      lines: ["top", "right", "left"]
    }, {
      box: rightBox,
      lines: ["top", "bottom", "left"]
    }];
  },
  getRowClick: function getRowClick(positionFromTopOfGameBoard, heightOfBoxes) {
    var row = positionFromTopOfGameBoard / heightOfBoxes;
    // collaboration of row
    if (row < 0.9) {
      row = 0;
    } else if (row < 1 && row > 0.9) {
      row = 1;
    } else if (row < 2 && row > 1.88) {
      row = 2;
    } else if (row < 3 && row > 2.85) {
      row = 3;
    } else if (row < 4 && row > 3.76) {
      row = 4;
    }
    return Math.floor(row);
  },
  getEdgeBoxClickPosition: function getEdgeBoxClickPosition(positionFromTopOfGameBoard, heightOfBoxes) {
    var row = boxInfo.getRowClick(positionFromTopOfGameBoard, heightOfBoxes);
    var rowInformation = {
      row0: [], row1: [], row2: [],
      row3: [], row4: [], row5: []
    };
    for (var i = 0; i < 36; i++) {
      var box = 'box' + i;
      if (!boxInfo.isEdgeBox(box)) continue;
      if (i < 6) {
        rowInformation.row0.push(box);
      } else if (i < 12) {
        rowInformation.row1.push(box);
      } else if (i < 18) {
        rowInformation.row2.push(box);
      } else if (i < 24) {
        rowInformation.row3.push(box);
      } else if (i < 30) {
        rowInformation.row4.push(box);
      } else if (i < 36) {
        rowInformation.row5.push(box);
      }
    }
    var rowInfoWithEdgePositions = [];
    for (var fullRow in rowInformation) {
      if (rowInformation[fullRow].length === 0) continue;
      rowInformation[fullRow].forEach(function (thisBox) {
        var positionClickInfo = {};
        positionClickInfo.box = thisBox;
        var box = document.getElementsByClassName(thisBox);
        var zoom = 0.96;
        var gameBoardPositionX = box[0].getBoundingClientRect().x * zoom;
        var gameBoardPositionY = box[0].getBoundingClientRect().y * zoom;
        var height = gametask.getHeightWithClassName(thisBox);
        var width = gametask.getWidthWithClassName(thisBox);
        var boardHolderWidth = gametask.getWidthWithId("boardHolder");
        var offset = lineClickOffset;

        var topClickOffset = {
          xRange: { min: gameBoardPositionX, max: gameBoardPositionX + width },
          yRange: { min: gameBoardPositionY - offset, max: gameBoardPositionY }
        };
        var rightClickOffset = {
          xRange: { min: gameBoardPositionX + width, max: gameBoardPositionX + width + offset },
          yRange: { min: gameBoardPositionY, max: gameBoardPositionY + height }
        };
        var bottomClickOffset = {
          xRange: { min: gameBoardPositionX, max: gameBoardPositionX + width },
          yRange: { min: gameBoardPositionY + height, max: gameBoardPositionY + height + offset }
        };
        var leftClickOffset = {
          xRange: { min: gameBoardPositionX - offset, max: gameBoardPositionX },
          yRange: { min: gameBoardPositionY, max: gameBoardPositionY + height }
        };

        var boxInfo = gameBoard[thisBox];

        if (boxInfo.isTopRightCornerBox) {
          positionClickInfo.ySide = "top";
          positionClickInfo.xSide = "right";
          positionClickInfo.outsideClickRange = [rightClickOffset, topClickOffset];
        }
        if (boxInfo.isTopLeftCornerBox) {
          positionClickInfo.ySide = "top";
          positionClickInfo.xSide = "left";
          positionClickInfo.outsideClickRange = [leftClickOffset, topClickOffset];
        }
        if (boxInfo.isBottomRightCornerBox) {
          positionClickInfo.xSide = "right";
          positionClickInfo.ySide = "bottom";
          positionClickInfo.outsideClickRange = [rightClickOffset, bottomClickOffset];
        }
        if (boxInfo.isBottomLeftCornerBox) {
          positionClickInfo.ySide = "bottom";
          positionClickInfo.xSide = "left";
          positionClickInfo.outsideClickRange = [leftClickOffset, bottomClickOffset];
        }
        if (boxInfo.isTopSideRow) {
          positionClickInfo.ySide = "top";
          positionClickInfo.outsideClickRange = [null, topClickOffset];
        }
        if (boxInfo.isRightSideRow) {
          positionClickInfo.xSide = "right";
          positionClickInfo.outsideClickRange = [rightClickOffset, null];
        }
        if (boxInfo.isBottomSideRow) {
          positionClickInfo.ySide = "bottom";
          positionClickInfo.outsideClickRange = [null, bottomClickOffset];
        }
        if (boxInfo.isLeftSideRow) {
          positionClickInfo.xSide = "left";
          positionClickInfo.outsideClickRange = [leftClickOffset, null];
        }

        rowInfoWithEdgePositions.push(positionClickInfo);
      });
    }
    return rowInfoWithEdgePositions;
  },
  getEdgeBoxClicked: function getEdgeBoxClicked(rowInfoWithEdgePositions, pageClickPositionX, pageClickPositionY) {
    var boxClicked = false;
    var sideClicked = false;
    var length = rowInfoWithEdgePositions.length;
    for (var i = 0; i < length; i++) {
      var edgeBoxObject = rowInfoWithEdgePositions[i];
      var outsideClickRange = edgeBoxObject.outsideClickRange;
      var len = outsideClickRange.length;
      for (var j = 0; j < len; j++) {
        if (outsideClickRange[j]) {
          var _outsideClickRange$j = outsideClickRange[j],
              xRange = _outsideClickRange$j.xRange,
              yRange = _outsideClickRange$j.yRange;

          var isInXRange = xRange.min < pageClickPositionX && xRange.max > pageClickPositionX;
          var isInYRange = yRange.min < pageClickPositionY && yRange.max > pageClickPositionY;
          if (isInXRange && isInYRange) {
            boxClicked = rowInfoWithEdgePositions[i].box;
            sideClicked = j === 0 ? rowInfoWithEdgePositions[i].xSide : rowInfoWithEdgePositions[i].ySide;
          }
        }
      }
    }
    return {
      boxClicked: boxClicked,
      sideClicked: sideClicked
    };
  },
  complementBorder: {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right"
  },
  getBoxNumberFromBoxX: function getBoxNumberFromBoxX(box) {
    return parseInt(box.replace("box", ""));
  },
  isABomb: function isABomb(box) {
    var hasExplosion = false;
    var classes = document.querySelector('.' + box).classList;
    for (index in classes) {
      var num = parseInt(index);
      var isIndex = isNaN(num);
      var hasAnExplosion = !isIndex ? classes[index].indexOf("Explosion") : false;
      if (hasAnExplosion && hasAnExplosion !== -1) {
        hasExplosion = true;
      }
    }
    return hasExplosion;
  },
  hasClickBorderPreviously: function hasClickBorderPreviously(boxNumber, lineClicked) {
    return gameBoard[boxNumber].borders[lineClicked] === true;
  },
  setLineAsClicked: function setLineAsClicked(boxNumber, lineClicked) {
    gameBoard[boxNumber].borders[lineClicked] = true;
  },
  setLineColor: function setLineColor(boxNumber, lineClicked) {
    if (!isFirstPlayerTurn) {
      whoClickedLine[boxNumber][lineClicked] = "computer";
    }
  },
  highlightBoxIfScored: function highlightBoxIfScored(boxNumber) {
    if (boxInfo.getBorderCount(boxNumber) === 4) {
      if (!boxInfo.isABomb(boxNumber)) {
        takeAnotherTurn = true;
      } else {
        takeAnotherTurn = false;
      }
      gameBoard[boxNumber].whoScored = isFirstPlayerTurn ? "firstPlayerScored" : "secondPlayerScored";
      if (isFirstPlayerTurn) {
        pointsInArow++;
        ui.checkForGameBoardTextConditions();
      }
      soundEffects.playScoreSound();
    }
  }
};

window.bomb = {
  types: [{ key: "isLionExplosion", class: "isLionExplosion" }, { key: "isCheetahExplosion", class: "isCheetahExplosion" }, { key: "isPantherExplosion", class: "isPantherExplosion" }, { key: "isQueenMakedaExplosion", class: "isQueenMakedaExplosion" }],
  isExplosionBox: function isExplosionBox(box) {
    var isBombBox = false;
    bomb.types.forEach(function (data) {
      var className = data.class;
      var isBomb = document.getElementsByClassName(box)[0] ? document.getElementsByClassName(box)[0].classList.contains(className) : false;
      if (isBomb) isBombBox = true;
    });
    return isBombBox;
  },
  populationData: [],
  fillPopulationData: function fillPopulationData() {
    bomb.populationData = [];
    var useTurns = [];
    if (bombsToLay > 0) {
      while (useTurns.length < bombsToLay * 2) {
        var randomNumber = Math.floor(Math.random() * 30) + track.turn;
        var filtered = [];
        for (var box in gameBoard) {
          if (!gameBoard[box].disabled) filtered.push(box);
        }
        var boxNumber = filtered[Math.floor(Math.random() * (gameBoardLength - 1))];
        if (!useTurns.includes(randomNumber) && !useTurns.includes(boxNumber)) {
          useTurns = [].concat(_toConsumableArray(useTurns), [boxNumber, randomNumber]);
          bomb.populationData.push({ randomNumber: randomNumber, boxNumber: boxNumber });
        }
      }
    }
  },
  bombPopulation: function bombPopulation() {
    var boxNumber = void 0;
    bomb.populationData.some(function (data) {
      boxNumber = data.randomNumber === track.turn ? data.boxNumber : boxNumber;
      return data.randomNumber === track.turn;
    });
    if (boxNumber && boxInfo.getBorderCount(boxNumber) !== 4) {
      bomb.placeBomb(boxNumber);
    }
  },
  showExplosionInBox: function showExplosionInBox(box, type, seconds) {
    if (type !== "smoke") bomb.explodeLockBoxIfHit(box);
    gametask.removeClassByQuerySelector('.' + box + 'Explosion', "hideExplosion");
    document.querySelector('.' + box + 'Explosion').src = './gifs/' + type + '.gif';
    setTimeout(function () {
      explodingBoxes.pop();
      taks.addClassByClassName(box + 'Explosion', "hideExplosion");
    }, seconds);
  },
  explodeLockBoxIfHit: function explodeLockBoxIfHit(box) {
    if (boxInfo.isALockBox(box)) {
      var _index3 = void 0;
      lockBombLocations.forEach(function (data, i) {
        if (data.box === box) {
          _index3 = i;
        }
      });
      if (_index3 || _index3 === 0) {
        lockBombLocations[_index3].toughness--;
        if (lockBombLocations[_index3].toughness <= 0) {
          setTimeout(function () {
            var newIndex = void 0;
            lockBombLocations.forEach(function (data, index) {
              if (data.box === box) {
                newIndex = index;
              }
            });
            lockBombLocations.splice(newIndex, 1);
            gametask.removeClassByQuerySelector('.box.' + box, "locked");
          }, 300);
        }
      }
    };
  },
  placeBomb: function placeBomb(boxNumber) {
    //wait for explosions to stop before placing bomb
    if (bomb.isExploding.length === 0) {
      setTimeout(function () {
        var explosion = bomb.types[0];
        var number = Math.floor(Math.random() * 100);
        if (number > 66) {
          explosion = bomb.types[0];
        } else if (number > 33) {
          explosion = bomb.types[1];
        } else {
          explosion = bomb.types[2];
        }
        if (!bomb.isExplosionBox(boxNumber) && !boxInfo.isALockBox(boxNumber) && !boxInfo.isABomb(boxNumber)) {
          // track.decrementBombCount();
          soundEffects.playShowBombSound();
          document.getElementsByClassName(boxNumber)[0].classList.add(explosion.class);
          bomb.showSpriteSmoke(boxNumber);
          setTimeout(function () {
            gameBoard[boxNumber][explosion.key] = true;
            ui.populateTheUI();
          }, 100);
        } else {
          // track.incrementMissedBombCount();
          var missedBox = {
            missedBox: true,
            box: boxNumber
          };
        }
      }, 400);
    } else {
      bomb.placeBomb();
    }
  },
  explodeBoxes: function explodeBoxes(box) {
    if (gameBoard[box].isLionExplosion) {
      var _explodingBoxes;

      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isLionExplosion = false;

      var _animalExplosions$lio = animalExplosions.lion.boxes(box),
          boxesToExplode = _animalExplosions$lio.boxesToExplode,
          linesToRemove = _animalExplosions$lio.linesToRemove;

      (_explodingBoxes = explodingBoxes).push.apply(_explodingBoxes, _toConsumableArray(boxesToExplode));
      // make boxes explode
      bomb.explodeBoxesFromArray(linesToRemove, box);
      bomb.checkForChainReactions(boxesToExplode);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isCheetahExplosion) {
      var _explodingBoxes2;

      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isCheetahExplosion = false;

      var _animalExplosions$che = animalExplosions.cheetah.boxes(box),
          _boxesToExplode = _animalExplosions$che.boxesToExplode,
          _linesToRemove = _animalExplosions$che.linesToRemove;

      (_explodingBoxes2 = explodingBoxes).push.apply(_explodingBoxes2, _toConsumableArray(_boxesToExplode));
      // make boxes explode
      bomb.explodeBoxesFromArray(_linesToRemove, box);
      bomb.checkForChainReactions(_boxesToExplode);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isPantherExplosion) {
      var _explodingBoxes3;

      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isPantherExplosion = false;

      var _animalExplosions$pan = animalExplosions.panther.boxes(box),
          _boxesToExplode2 = _animalExplosions$pan.boxesToExplode,
          _linesToRemove2 = _animalExplosions$pan.linesToRemove;

      (_explodingBoxes3 = explodingBoxes).push.apply(_explodingBoxes3, _toConsumableArray(_boxesToExplode2));
      // make boxes explode
      bomb.explodeBoxesFromArray(_linesToRemove2, box);
      bomb.checkForChainReactions(_boxesToExplode2);
      soundEffects.playExplosionSound();
    } else if (gameBoard[box].isQueenMakedaExplosion) {
      var _explodingBoxes4;

      // removes the bomb image from the box after the ui is populated
      gameBoard[box].isQueenMakedaExplosion = false;

      var _animalExplosions$que = animalExplosions.queen_makeda.boxes(box),
          _boxesToExplode3 = _animalExplosions$que.boxesToExplode,
          _linesToRemove3 = _animalExplosions$que.linesToRemove;

      (_explodingBoxes4 = explodingBoxes).push.apply(_explodingBoxes4, _toConsumableArray(_boxesToExplode3));
      // make boxes explode
      bomb.explodeBoxesFromArray(_linesToRemove3, box);
      bomb.checkForChainReactions(_boxesToExplode3);
      soundEffects.playExplosionSound();
    }
    ui.populateTheUI();
  },
  checkForChainReactions: function checkForChainReactions(boxesToCheck) {
    setTimeout(function () {
      boxesToCheck.forEach(function (box) {
        if (box) {
          bomb.explodeBoxes(box);
        }
      });
    }, 80 * 4);
  },
  allExplodingBoxes: [],
  fillExplodingBoxes: function fillExplodingBoxes(box) {
    bomb.allExplodingBoxes.push(box);
    setTimeout(function () {
      bomb.allExplodingBoxes.pop();
    });
  },
  explodeBoxesFromArray: function explodeBoxesFromArray(linesToRemove, box) {
    linesToRemove.forEach(function (item) {
      if (item.box) {
        bomb.fillExplodingBoxes(item.box);
        lineClickAction.removeBorders(item.box, item.lines);
        ui.removeScoreColorIfRemovingBorder(item.box);
        if (!bomb.isExploding.includes(item.box)) {
          bomb.isExploding.push(item.box);
          bomb.showSpriteExplosion(item.box);
        }
      }
    });
  },
  isExploding: [],
  showSpriteExplosion: function showSpriteExplosion(box) {
    gametask.removeClassByQuerySelector('.' + box + ' > .spriteSheet', "smokeGif");
    setTimeout(function () {
      gametask.addClassByQuerySelector('.' + box + ' > .spriteSheet', "explosionGif");
    });
    setTimeout(function () {
      gametask.removeClassByQuerySelector('.' + box + ' > .spriteSheet', "explosionGif");
      // remove the box from the exploding array
      bomb.isExploding.pop();
    }, 800);
    bomb.explodeLockBoxIfHit(box);
  },
  showSpriteSmoke: function showSpriteSmoke(box) {
    gametask.addClassByQuerySelector('.' + box + ' > .spriteSheet', "smokeGif");
    setTimeout(function () {
      gametask.removeClassByQuerySelector('.' + box + ' > .spriteSheet', "smokeGif");
    }, 800);
  }
};

window.lockBoxes = [2, 3, 4, 5, 5, 7, 9, 10, 8, 12, 14];

// this file contains the exploding patterns of the animal bombs
window.animalExplosions = {
  lion: { // exploding pattern for the lion
    boxes: function boxes(box) {
      /*
        explodes around animal
        ex:    6   7   8
              12  13  14
              18  19  20
      */

      // cache every box that will be exploded
      var temp = lionSquares[box].filter(function (data) {
        return data !== null;
      });
      var boxesToExplode = temp.map(function (data) {
        return 'box' + data;
      });

      var topLeftBoxNumber = lionSquares[box][0];
      var topBox = lionSquares[box][1];
      var topRightBoxNumber = lionSquares[box][2];
      var leftBox = lionSquares[box][3];
      var thisBox = lionSquares[box][4];
      var rightBox = lionSquares[box][5];
      var bottomLeftBoxNumber = lionSquares[box][6];
      var bottomBox = lionSquares[box][7];
      var bottomRightBoxNumber = lionSquares[box][8];

      // match the boxes with the lines that will be remove and a result of the explosion
      var linesToRemove = [{ box: 'box' + topRightBoxNumber, lines: ["bottom", "left"] }, { box: 'box' + topLeftBoxNumber, lines: ["bottom", "right"] }, { box: 'box' + bottomRightBoxNumber, lines: ["top", "left"] }, { box: 'box' + bottomLeftBoxNumber, lines: ["top", "right"] }, { box: 'box' + topBox, lines: ["right", "bottom", "left"] }, { box: 'box' + rightBox, lines: ["top", "bottom", "left"] }, { box: 'box' + bottomBox, lines: ["top", "right", "left"] }, { box: 'box' + leftBox, lines: ["top", "right", "bottom"] }, { box: 'box' + thisBox, lines: ["top", "right", "bottom", "left"] }].filter(function (data) {
        return data.box !== "boxnull";
      });

      return {
        linesToRemove: linesToRemove,
        boxesToExplode: boxesToExplode
      };
    }
  },
  cheetah: {
    boxes: function boxes(box) {
      /*
        explodes animal column
        ex:    0 1 2 3 4 5
      */

      var temp = cheetahSquares[box].filter(function (data) {
        return data !== null;
      });
      var boxesToExplode = temp.map(function (data) {
        return 'box' + data;
      });

      var linesToRemove = [];
      boxesToExplode.forEach(function (data) {
        linesToRemove.push({
          box: data,
          lines: ["right", "left"]
        });
      });

      return {
        linesToRemove: linesToRemove,
        boxesToExplode: boxesToExplode
      };
    }
  },
  panther: {
    boxes: function boxes(box) {
      /*
        explodes animal row
        ex:    0
               6
              12
              18
              24
              30
      */

      var temp = pantherSquares[box].filter(function (data) {
        return data !== null;
      });
      var boxesToExplode = temp.map(function (data) {
        return 'box' + data;
      });

      var linesToRemove = [];
      boxesToExplode.forEach(function (data) {
        linesToRemove.push({
          box: data,
          lines: ["top", "bottom"]
        });
      });

      return {
        linesToRemove: linesToRemove,
        boxesToExplode: boxesToExplode
      };
    }
  },
  queen_makeda: {
    boxes: function boxes(box) {
      var temp = queen_makedaSquares[box].filter(function (data) {
        return data !== null;
      });
      var boxesToExplode = temp.map(function (data) {
        return 'box' + data;
      });

      var linesToRemove = [];
      boxesToExplode.forEach(function (data, index) {
        var lines = index < 6 ? ["left", "right"] : ["top", "bottom"];
        linesToRemove.push({
          box: data,
          lines: lines
        });
      });

      return {
        linesToRemove: linesToRemove,
        boxesToExplode: boxesToExplode
      };
    }
  }
};

window.boardText = {
  text: {
    // bad: ["Oh Nah", "You drawlin", "Haah... got em", "You tripin", "Bruh"],
    bad: ["Haah... got em"],
    // good: ["I see u", "Lets get it", "Chill", "Iiight"],
    good: ["I see u"],
    // excellent: ["Okurrrr", "Yarrrrpp", "Aaaaaa", "You hyyyype"]
    excellent: ["Ooo Yes"]
  },
  getBadText: function getBadText() {
    return gametask.getRandomIndexInArray(boardText.text.bad);
  },
  getGoodText: function getGoodText() {
    return gametask.getRandomIndexInArray(boardText.text.good);
  },
  getExcellentText: function getExcellentText() {
    return gametask.getRandomIndexInArray(boardText.text.excellent);
  },
  showText: function showText(type) {
    var text = void 0;
    if (type === "bad") {
      if (textType === "bad") return null;
      text = boardText.getBadText();
      soundEffects.play("got em/got em.m4a");
    } else if (type === "good") {
      if (textType === "good") return null;
      text = boardText.getGoodText();
      soundEffects.play("jasmin/i see u.m4a");
    } else if (type === "excellent") {
      if (textType === "excellent") return null;
      text = boardText.getExcellentText();
      soundEffects.play("jasmin/yes.m4a");
    }
    textType = type;
    boardText.showOnBoard(text, 2000);
  },
  showOnBoard: function showOnBoard(text, adjustTimeout) {
    gametask.addTextByQuerySelector(".interactiveText p", text);
    gametask.addClassByQuerySelector(".interactiveText p", "showText");
    setTimeout(function () {
      gametask.addTextByQuerySelector(".interactiveText p", "");
      gametask.removeClassByQuerySelector(".interactiveText p", "showText");
    }, adjustTimeout || 2000);
  }
};

window.track = {
  turn: 0,
  incrementTurn: function incrementTurn() {
    track.turn++;
  },
  goToPage: function goToPage(page) {
    tools = null;
    currentPage = page;
    var allPages = document.getElementsByClassName("page");
    for (var i = 0; i < allPages.length; i++) {
      allPages[i].classList.add("removePage");
    }
    var pageToShow = document.getElementsByClassName(page)[0];
    pageToShow.classList.remove("removePage");
    ui.setSettingsIfOnSettingsPage(page);
    if (page === "gameBoardPage") {
      gametask.resizeBoard();
      ui.populateBombSelectionScreen();
    } else {
      on_game_board = false;
    }

    if (page === "storePage") {
      ui.populateStore();
    }
  },
  youLose: function youLose() {
    console.log("you lose");
  },
  setScores: function setScores() {
    playerOneScore = 0;
    playerTwoScore = 0;
    for (var box in gameBoard) {
      var personToScore = gameBoard[box].whoScored;
      if (personToScore === "firstPlayerScored") {
        playerOneScore++;
      } else if (personToScore === "secondPlayerScored") {
        playerTwoScore++;
      }
    }
  },
  adjustScore: function adjustScore(boxNumber, adjacentBoxNumber) {
    track.setScores();

    document.getElementsByClassName("playerOneScore")[0].innerText = playerOneScore;
    document.getElementsByClassName("playerTwoScore")[0].innerText = playerTwoScore;

    var score = function score(box) {
      if (!track.hasScored(box)) return null; // check to see if player scored a point
      bomb.explodeBoxes(box);
    };

    if (boxNumber) score(boxNumber);
    if (adjacentBoxNumber) score(adjacentBoxNumber);
  },
  hasScored: function hasScored(boxNumber) {
    var isTopClicked = gameBoard[boxNumber].borders.top;
    var isRightClicked = gameBoard[boxNumber].borders.right;
    var isBottomClicked = gameBoard[boxNumber].borders.bottom;
    var isLeftClicked = gameBoard[boxNumber].borders.left;
    return isTopClicked && isRightClicked && isBottomClicked && isLeftClicked;
  },
  decrementBombCount: function decrementBombCount() {
    bombsToLay--;
    // track.setRemainingBombs();
  },
  setRemainingBombs: function setRemainingBombs() {
    gametask.addTextByQuerySelector(".remainingBombs", bombsToLay);
  },
  incrementMissedBombCount: function incrementMissedBombCount() {
    var text = gametask.getTextByQuerySelector(".missedBombs");
    var missedBombs = parseInt(text);
    missedBombs++;
    gametask.addTextByQuerySelector(".missedBombs", missedBombs);
    track.decrementBombCount();
  },
  screenText: function screenText() {
    showTextUsed = true;
    setTimeout(function () {
      showTextUsed = false; // prevents multiple calls for screen text
    }, timeToWaitBetweenText);
  }

  // will contain boxes with no lines clicked
};var noBorders = [];
// will contain boxes with one line clicked
var oneBorderBoxes = [];
// will contain boxes with two lines clicked
var twoBorderBoxes = [];
// will contain boxes with three lines clicked
var threeBorderBoxes = [];

//store item selected
var storeItemSelected = {};

// offset from line to be considered a line click
var lineClickOffset = 12;

// tracks who click the line
var whoClickedLine = gametask.breakRefAndCopy(whoClickTheLine);

// this is the selected animal to be placed on the board from the help section
var selectedBombFunction = void 0;

// these are the players' scores
var playerOneScore = 0;
var playerTwoScore = 0;

// the amount of boxes on the board
var gameBoardLength = void 0;
//tot maximum amount of the boxes in each row
var rowLength = 6;
// the ibformtaion for each box on the game board
var gameBoard = void 0;
// the current game level we are on
var gameLevel = void 0;
// all infoemation for the current level
var getGameLevelObj = void 0;

// trcak if a play has score (used to determin the player turn)
var takeAnotherTurn = false;
// will be tru if first player turn
var isFirstPlayerTurn = true;
// disable the computer while debugging
var disableComputer = false;
// track previously used boardtext type to avoid resaying the same type in a row
var textType = void 0;
// help to take another turn after laying a bomb
var layedBomb = void 0;
// has clicked a bomb
var clickedExplosion = void 0;
// help to passTurn during computer move
var computerHasScored = false;

// tracks points scored and used with gameBoardLength to determine if the game is over
var totalPointsScored = 0;
// tools that are being use in game
var tools = void 0;
// this is the currently exploding boex
var explodingBoxes = [];
// amount aof bomb that will be layed in the game
var bombsToLay = 0;
// all lock box locations on the board
var lockBombLocations = [];
// possible bombs to lay
var possibleBombs = [];
// initial bomb on the screen
var initialBombs = void 0;
// number of points scored in a row by isFirstPlayerTurn
var pointsInArow = 0;

// current page we are on
var currentPage = "homePage";

// used for difficulty
var chanceToGiveAWayPoint = void 0;

var reset_settings = true;
//determines if we are on the game board
var on_game_board = false;

// used to prevent multiple game board text showing on board
var showTextUsed = false;
// time to wait before show more game board text
var timeToWaitBetweenText = 8000;

// help text shown when learning on the game board
var helpText = void 0;

// traning helping variable
var restrictionLineClicks = void 0;
var restrictionClickBox = void 0;
var restrictionLayBomb = void 0;
var nextRestriction = void 0;

$(document).ready(function () {
  // set any saved field in local storage
  gametask.setFromLocalStorage();

  // adjust click event for edge boxes
  lineClickAction.setEdgeBoxClickEvent();

  // star of on the home screen
  track.goToPage("homePage");

  // set game music event listener
  soundEffects.playGameMusic();

  // animal text on home screen
  gametask.changeTitleColor();

  // animate the board selecting page stars
  ui.animateStars();
  // ui.animateDots();

  gametask.setToolClickEvent();
});
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(143), __webpack_require__(142), __webpack_require__(144), __webpack_require__(132), __webpack_require__(134), __webpack_require__(135), __webpack_require__(136), __webpack_require__(137), __webpack_require__(138), __webpack_require__(139), __webpack_require__(140), __webpack_require__(141), __webpack_require__(133)))

/***/ },
/* 132 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level1 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: -1,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -4,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -1,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    }
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    }
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    }
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 40,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 41,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  }
};

module.exports = level1;

/***/ },
/* 133 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level10 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopRightCornerBox: true,
    isTopLeftCornerBox: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopRightCornerBox: true,
    isTopLeftCornerBox: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    }
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    }
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      }
    }
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    }
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    }
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      }
    }
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    }
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  }
};

module.exports = level10;

/***/ },
/* 134 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level2 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: -1,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -4,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -1,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    }
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    }
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    }
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 40,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 41,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  }
};

module.exports = level2;

/***/ },
/* 135 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level3 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: null,
      leftBox: null
    },
    isTopRightCornerBox: true,
    isTopLeftCornerBox: true,
    isBottomRightCornerBox: true,
    isBottomLeftCornerBox: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -4,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: null,
      leftBox: null
    },
    isTopRightCornerBox: true,
    isTopLeftCornerBox: true,
    isBottomRightCornerBox: true,
    isBottomLeftCornerBox: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    }
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    }
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    }
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: null,
      leftBox: null
    },
    isTopRightCornerBox: true,
    isTopLeftCornerBox: true,
    isBottomRightCornerBox: true,
    isBottomLeftCornerBox: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 40,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: null,
      leftBox: null
    },
    isTopRightCornerBox: true,
    isTopLeftCornerBox: true,
    isBottomRightCornerBox: true,
    isBottomLeftCornerBox: true
  }
};

module.exports = level3;

/***/ },
/* 136 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level4 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: -1,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -1,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    }
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    }
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      }
    }
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    }
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    }
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      }
    }
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    }
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    }
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    }
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    }
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    }
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 40,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 36,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 41,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  }
};

module.exports = level4;

/***/ },
/* 137 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level5 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      }
    }
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    }
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    }
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    }
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      }
    }
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    }
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    }
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      }
    }
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    }
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    }
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    }
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      }
    }
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    }
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    }
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    }
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  }
};

module.exports = level5;

/***/ },
/* 138 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level6 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true,
    isBottomRightCornerBox: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      }
    }
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    }
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    }
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      }
    }
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      }
    }
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: null
    },
    isBottomRightCornerBox: true,
    isBottomLeftCornerBox: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  }
};

module.exports = level6;

/***/ },
/* 139 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level7 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true,
    isBottomSideRow: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true,
    isBottomSideRow: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true,
    isBottomSideRow: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true,
    isBottomSideRow: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isRightSideRow: true,
    isLeftSideRow: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isRightSideRow: true,
    isLeftSideRow: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isRightSideRow: true,
    isLeftSideRow: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true,
    isBottomSideRow: true
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isRightSideRow: true,
    isLeftSideRow: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isRightSideRow: true,
    isLeftSideRow: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isRightSideRow: true,
    isLeftSideRow: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isRightSideRow: true,
    isLeftSideRow: true
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isRightSideRow: true,
    isLeftSideRow: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true,
    isBottomSideRow: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true,
    isBottomSideRow: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true,
    isBottomSideRow: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  }
};

module.exports = level7;

/***/ },
/* 140 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level8 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      }
    }
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    }
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    }
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    }
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  }
};

module.exports = level8;

/***/ },
/* 141 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var level9 = {
  box0: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopRightCornerBox: true,
    isTopLeftCornerBox: true
  },
  box1: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -5,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box2: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -4,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 1,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box3: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -3,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 4,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 2,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box4: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: -2,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 3,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box5: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopRightCornerBox: true,
    isTopLeftCornerBox: true
  },
  box6: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 0,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: null
    },
    isBottomLeftCornerBox: true
  },
  box7: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box8: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box9: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box10: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      }
    },
    isTopSideRow: true
  },
  box11: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 5,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      }
    },
    isBottomRightCornerBox: true
  },
  box12: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 6,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box13: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 7,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box14: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 8,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      }
    }
  },
  box15: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 9,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      }
    }
  },
  box16: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 10,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box17: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 11,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 18,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 23,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box18: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 12,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box19: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 13,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isLeftSideRow: true
  },
  box20: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 14,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      }
    }
  },
  box21: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 15,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      }
    }
  },
  box22: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 16,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      }
    },
    isRightSideRow: true
  },
  box23: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 17,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box24: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      },
      leftBox: null
    },
    isTopLeftCornerBox: true
  },
  box25: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 19,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box26: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 20,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box27: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 21,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box28: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 22,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      bottomBox: null,
      leftBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      }
    },
    isBottomSideRow: true
  },
  box29: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: null,
      rightBox: null,
      bottomBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      }
    },
    isTopRightCornerBox: true
  },
  box30: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 24,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: null
    },
    isBottomRightCornerBox: true,
    isBottomLeftCornerBox: true
  },
  box31: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 25,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 37,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 30,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box32: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 26,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 38,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 31,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box33: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 27,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 34,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 39,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 32,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box34: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 28,
        isConnected: true,
        borders: null
      },
      rightBox: {
        boxNumber: 35,
        isConnected: true,
        borders: null
      },
      bottomBox: {
        boxNumber: 40,
        isConnected: true,
        borders: null
      },
      leftBox: {
        boxNumber: 33,
        isConnected: true,
        borders: null
      }
    },
    disabled: true
  },
  box35: {
    borders: {
      top: null,
      right: null,
      bottom: null,
      left: null
    },
    surroundingBoxes: {
      topBox: {
        boxNumber: 29,
        isConnected: true,
        borders: null
      },
      rightBox: null,
      bottomBox: null,
      leftBox: null
    },
    isBottomRightCornerBox: true,
    isBottomLeftCornerBox: true
  }
};

module.exports = level9;

/***/ },
/* 142 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var helpTextArray = [{
  levelNumber: 1,
  help: {
    boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
      return regeneratorRuntime.wrap(function gen$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return "create a <span class='highlightText'>box</span> to score";

            case 2:
              _context.next = 4;
              return "take <span class='highlightText'>another turn</span> because you scored!";

            case 4:
              _context.next = 6;
              return "your turn!";

            case 6:
              _context.next = 8;
              return "";

            case 8:
            case "end":
              return _context.stop();
          }
        }
      }, gen, this);
    }),
    helpTurns: [4, 5, 7, 8]
  }
}, {
  levelNumber: 2,
  help: {
    boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
      return regeneratorRuntime.wrap(function gen$(_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              _context2.next = 2;
              return "the cheetah explodes the <span class='highlightText'>row</span>";

            case 2:
              _context2.next = 4;
              return "if the cheetah is in a <span class='highlightText'>box</span> it explodes";

            case 4:
              _context2.next = 6;
              return "";

            case 6:
            case "end":
              return _context2.stop();
          }
        }
      }, gen, this);
    }),
    helpTurns: [0, 1, 3, 5]
  }
}, {
  isLocked: true,
  levelNumber: 3,
  stars: 0,
  prefilledBoxes: ["box9", "box15", "box27"],
  clickAnimal: "panther",
  hasLargePrize: {
    prize: "panther",
    quantity: 1
  },
  starRating: [{ stars: 1, score: 11 }, { stars: 2, score: 12 }, { stars: 3, score: 13 }],
  tools: [{
    name: "panther",
    src: "./img/color_animals/asset_panther.png",
    count: 1
  }],
  help: {
    boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
      return regeneratorRuntime.wrap(function gen$(_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              _context3.next = 2;
              return "the panther explodes the <span class='highlightText'>column</span>";

            case 2:
              _context3.next = 4;
              return "";

            case 4:
            case "end":
              return _context3.stop();
          }
        }
      }, gen, this);
    }),
    helpTurns: [2, 4]
  },
  trainingRestrictions: {
    restrictions: [{
      type: "layBomb",
      turn: 0,
      clickBox: ["box21"],
      clickWhenLayed: true
    }]
  },
  tipsPage: {
    heading: "how to",
    text: "place the bomb on the board by selecting it and a box",
    img_src: "./img/tips/drop_example.png",
    height: "64%"
  }
}, {
  levelNumber: 4,
  help: {
    boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
      return regeneratorRuntime.wrap(function gen$(_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              _context4.next = 2;
              return "that was a <span class='highlightText'>chain explosion</span>!";

            case 2:
              _context4.next = 4;
              return "the <span class='highlightText'>lion</span> explodes surrounding boxes!";

            case 4:
              _context4.next = 6;
              return "";

            case 6:
            case "end":
              return _context4.stop();
          }
        }
      }, gen, this);
    }),
    helpTurns: [1, 3, 5]
  }
}, {
  levelNumber: 5,
  help: {
    boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
      return regeneratorRuntime.wrap(function gen$(_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              _context5.next = 2;
              return "explode the <span class='highlightText'>Foot Of Oppression</span>";

            case 2:
              _context5.next = 4;
              return "You <span class='highlightText'>cannot</span> click lines <span class='highlightText'>around</span> The Foot Of Oppression";

            case 4:
              _context5.next = 6;
              return "If The Foot Of Oppression <span class='highlightText'>is not</span> destroyed You Lose";

            case 6:
              _context5.next = 8;
              return "";

            case 8:
            case "end":
              return _context5.stop();
          }
        }
      }, gen, this);
    }),
    helpTurns: [0, 1, 3, 5]
  }
}, {
  levelNumber: 6
}, {
  levelNumber: 7
}, {
  levelNumber: 8
}, {
  levelNumber: 9
}, {
  levelNumber: 10
}];

module.exports = helpTextArray;

/***/ },
/* 143 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var _ref;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var settings = {
  version: 1,
  difficulty: "easy", // options: easy, medium, hard
  hasMutedMusic: false,
  hasMutedSound: false,
  startUpPage: "gameBoardPage",
  level_data: [{
    computerSpeed: 1500,
    isLocked: false,
    levelNumber: 1,
    stars: 0,
    starRating: [{ stars: 1, score: 8 }, { stars: 2, score: 9 }, { stars: 3, score: 10 }],
    help: {
      boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
        return regeneratorRuntime.wrap(function gen$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                _context.next = 2;
                return "create a <span class='highlightText'>box</span> to score";

              case 2:
                _context.next = 4;
                return "take <span class='highlightText'>another turn</span> because you scored!";

              case 4:
                _context.next = 6;
                return "your turn!";

              case 6:
                _context.next = 8;
                return "";

              case 8:
              case "end":
                return _context.stop();
            }
          }
        }, gen, this);
      }),
      // helpTurns: [0, 2, 4, 5, 6]
      helpTurns: [4, 5, 7, 8]
    },
    trainingRestrictions: {
      restrictions: [{
        type: "highLightLine",
        turn: 0,
        boxOne: {
          box: "box15",
          side: "left"
        },
        boxTwo: {
          box: "box14",
          side: "right"
        }
      }, {
        type: "highLightLine",
        turn: 2,
        boxOne: {
          box: "box20",
          side: "bottom"
        },
        boxTwo: {
          box: "box26",
          side: "top"
        }
      }, {
        type: "highLightLine",
        turn: 4,
        boxOne: {
          box: "box15",
          side: "right"
        },
        boxTwo: {
          box: "box16",
          side: "left"
        }
      }, {
        type: "highLightLine",
        turn: 5,
        boxOne: {
          box: "box21",
          side: "bottom"
        },
        boxTwo: {
          box: "box27",
          side: "top"
        }
      }]
    },
    computerMoves: [{
      turn: 1,
      box: "box9",
      line: "bottom"
    }, {
      turn: 3,
      box: "box15",
      line: "bottom"
    }],
    tipsPage: {
      heading: "how to",
      text: "Complete a box to score. You get another turn by scoring.",
      img_src: "./img/tips/howto.gif",
      height: "30%"
    }
  }, {
    computerSpeed: 1000,
    isLocked: true,
    levelNumber: 2,
    stars: 0,
    prefilledBoxes: ["box7", "box8", "box10", "box25", "box27", "box28"],
    hasLargePrize: {
      prize: "cheetah",
      quantity: 1,
      hasClaimed: false
    },
    initialBombs: [{
      box: "box9",
      bombType: "isCheetahExplosion"
    }, {
      box: "box26",
      bombType: "isCheetahExplosion"
    }],
    starRating: [{ stars: 1, score: 8 }, { stars: 2, score: 9 }, { stars: 3, score: 10 }],
    help: {
      boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
        return regeneratorRuntime.wrap(function gen$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return "the cheetah explodes the <span class='highlightText'>row</span>";

              case 2:
                _context2.next = 4;
                return "if the cheetah is in a <span class='highlightText'>box</span> it explodes";

              case 4:
                _context2.next = 6;
                return "";

              case 6:
              case "end":
                return _context2.stop();
            }
          }
        }, gen, this);
      }),
      // helpTurns: [0, 1, 3, 5]
      helpTurns: [0, 1, 3, 5]
    },
    trainingRestrictions: {
      restrictions: [{
        type: "clickBox",
        turn: 0,
        clickBox: ["box9"]
      }, {
        type: "highLightLine",
        turn: 2,
        boxOne: {
          box: "box20",
          side: "bottom"
        },
        boxTwo: {
          box: "box26",
          side: "top"
        }
      }]
    },
    computerMoves: [{
      turn: 1,
      box: "box26",
      line: "bottom"
    }],
    tipsPage: {
      heading: "how to",
      text: "Exploding opponent's boxes decrease their score",
      img_src: "./img/tips/bomb_example.gif",
      height: "30%"
    }
  }, {
    isLocked: true,
    levelNumber: 3,
    stars: 0,
    prefilledBoxes: ["box9", "box15", "box27"],
    clickAnimal: "panther",
    hasLargePrize: {
      prize: "panther",
      quantity: 1,
      hasClaimed: false
    },
    starRating: [{ stars: 1, score: 10 }, { stars: 2, score: 11 }, { stars: 3, score: 12 }],
    tools: [{
      name: "panther",
      src: "./img/color_animals/asset_panther.png",
      count: 1
    }],
    help: {
      boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
        return regeneratorRuntime.wrap(function gen$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return "the panther explodes the <span class='highlightText'>column</span>";

              case 2:
                _context3.next = 4;
                return "";

              case 4:
              case "end":
                return _context3.stop();
            }
          }
        }, gen, this);
      }),
      helpTurns: [2, 4]
    },
    trainingRestrictions: {
      restrictions: [{
        type: "layBomb",
        turn: 0,
        clickBox: ["box21"],
        clickWhenLayed: true
      }]
    },
    tipsPage: {
      heading: "how to",
      text: "place the bomb on the board by selecting it first. Then selecting a box",
      img_src: "./img/tips/drop_example.png",
      height: "64%"
    }
  }, {
    isLocked: true,
    levelNumber: 4,
    stars: 0,
    initialBombs: [{
      box: "box21",
      bombType: "isLionExplosion"
    }],
    starRating: [{ stars: 1, score: 10 }, { stars: 2, score: 12 }, { stars: 3, score: 16 }],
    hasLargePrize: {
      prize: "lion",
      quantity: 1,
      hasClaimed: false
    },
    tools: [{
      name: "cheetah",
      src: "./img/color_animals/asset_cheetah.png",
      count: 1
    }],
    clickAnimal: "cheetah",
    help: {
      boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
        return regeneratorRuntime.wrap(function gen$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return "that was a <span class='highlightText'>chain explosion</span>!";

              case 2:
                _context4.next = 4;
                return "the <span class='highlightText'>lion</span> explodes surrounding boxes!";

              case 4:
                _context4.next = 6;
                return "";

              case 6:
              case "end":
                return _context4.stop();
            }
          }
        }, gen, this);
      }),
      helpTurns: [1, 3, 5]
    },
    trainingRestrictions: {
      restrictions: [{
        type: "layBomb",
        turn: 0,
        clickBox: ["box14", "box15", "box16", "box20", "box22", "box26", "box27", "box28"],
        then: {
          type: "clickBox",
          clickBox: ["box21"]
          // withClickBox: true
        }
      }]
    }
  }, {
    isLocked: true,
    levelNumber: 5,
    stars: 0,
    lockBoxes: [{
      box: "box14",
      toughness: 1
    }, {
      box: "box15",
      toughness: 1
    }, {
      box: "box20",
      toughness: 1
    }, {
      box: "box21",
      toughness: 1
    }],
    initialBombs: [{
      box: "box27",
      bombType: "isPantherExplosion"
    }],
    starRating: [{ stars: 1, score: 14 }, { stars: 2, score: 18 }, { stars: 3, score: 24 }],
    help: {
      boardHelpText: /*#__PURE__*/regeneratorRuntime.mark(function gen() {
        return regeneratorRuntime.wrap(function gen$(_context5) {
          while (1) {
            switch (_context5.prev = _context5.next) {
              case 0:
                _context5.next = 2;
                return "explode the <span class='highlightText'>Foot Of Oppression</span>";

              case 2:
                _context5.next = 4;
                return "You <span class='highlightText'>cannot</span> click lines <span class='highlightText'>around</span> The Foot Of Oppression";

              case 4:
                _context5.next = 6;
                return "If The Foot Of Oppression <span class='highlightText'>is not</span> destroyed You Lose";

              case 6:
                _context5.next = 8;
                return "";

              case 8:
              case "end":
                return _context5.stop();
            }
          }
        }, gen, this);
      }),
      helpTurns: [0, 1, 3, 5]
    },
    tools: [{
      name: "lion",
      src: "./img/color_animals/asset_lion.png",
      count: 1
    }, {
      name: "cheetah",
      src: "./img/color_animals/asset_cheetah.png",
      count: 1
    }],
    trainingRestrictions: {
      restrictions: [{
        type: "clickBox",
        turn: 0,
        clickBox: ["box27"]
      }]
    },
    tipsPage: {
      heading: "how to",
      text: "There comes a time when people get tired of being trampled by the iron foot of oppression. - MLK Jr.",
      img_src: "./img/tips/foot.png",
      height: "50%"
    }
  }, {
    isLocked: true,
    levelNumber: 6,
    stars: 0,
    lockBoxes: [{
      box: "box28",
      toughness: 1
    }, {
      box: "box29",
      toughness: 1
    }, {
      box: "box34",
      toughness: 1
    }, {
      box: "box35",
      toughness: 1
    }],
    initialBombs: [],
    bombsToLay: 0,
    starRating: [{ stars: 1, score: 10 }, { stars: 2, score: 14 }, { stars: 3, score: 16 }],
    tipsPage: {
      heading: "how to",
      text: "Go to the store to purchase items when you need to win",
      img_src: "./img/tips/store.png",
      height: "74%"
    },
    tools: [{
      name: "cheetah",
      src: "./img/color_animals/asset_cheetah.png",
      count: 1
    }]
  }, {
    isLocked: true,
    levelNumber: 7,
    stars: 0,
    lockBoxes: [{
      box: "box0",
      toughness: 1
    }, {
      box: "box30",
      toughness: 1
    }],
    initialBombs: [],
    bombsToLay: 0,
    starRating: [{ stars: 1, score: 10 }, { stars: 2, score: 12 }, { stars: 3, score: 14 }],
    tools: [{
      name: "panther",
      src: "./img/color_animals/asset_panther.png",
      count: 1
    }]
  }, {
    isLocked: true,
    levelNumber: 8,
    stars: 0,
    lockBoxes: [{
      box: "box20",
      toughness: 1
    }, {
      box: "box21",
      toughness: 1
    }, {
      box: "box26",
      toughness: 1
    }, {
      box: "box27",
      toughness: 1
    }, {
      box: "box32",
      toughness: 1
    }, {
      box: "box33",
      toughness: 1
    }],
    initialBombs: [],
    bombsToLay: 0,
    starRating: [{ stars: 1, score: 14 }, { stars: 2, score: 16 }, { stars: 3, score: 20 }],
    tools: [{
      name: "lion",
      src: "./img/color_animals/asset_lion.png",
      count: 1
    }]
  }, {
    isLocked: true,
    levelNumber: 9,
    stars: 0,
    lockBoxes: [{
      box: "box24",
      toughness: 1
    }, {
      box: "box30",
      toughness: 1
    }, {
      box: "box29",
      toughness: 1
    }, {
      box: "box35",
      toughness: 1
    }],
    initialBombs: [],
    bombsToLay: 0,
    starRating: [{ stars: 1, score: 12 }, { stars: 2, score: 14 }, { stars: 3, score: 16 }],
    tools: [{
      name: "cheetah",
      src: "./img/color_animals/asset_cheetah.png",
      count: 1
    }]
  }, (_ref = {
    isLocked: true,
    levelNumber: 10,
    stars: 0,
    lockBoxes: [],
    initialBombs: [],
    bombsToLay: 0,
    starRating: [{ stars: 1, score: 16 }, { stars: 2, score: 18 }, { stars: 3, score: 20 }],
    tools: [{
      count: 1,
      name: "queen_makeda",
      src: "./img/queens/asset_queen_makeda.png"
    }, {
      name: "panther",
      src: "./img/color_animals/asset_panther.png",
      count: 1
    }]
  }, _defineProperty(_ref, "lockBoxes", [{
    box: "box7",
    toughness: 1
  }, {
    box: "box8",
    toughness: 1
  }, {
    box: "box9",
    toughness: 1
  }, {
    box: "box10",
    toughness: 1
  }, {
    box: "box11",
    toughness: 1
  }, {
    box: "box12",
    toughness: 1
  }, {
    box: "box13",
    toughness: 1
  }, {
    box: "box14",
    toughness: 1
  }, {
    box: "box15",
    toughness: 1
  }, {
    box: "box17",
    toughness: 1
  }, {
    box: "box19",
    toughness: 1
  }, {
    box: "box20",
    toughness: 1
  }, {
    box: "box21",
    toughness: 1
  }, {
    box: "box22",
    toughness: 1
  }, {
    box: "box23",
    toughness: 1
  }]), _defineProperty(_ref, "tipsPage", {
    heading: "history",
    text: "Queen Makeda could make a small kingdom the most revered kingdom in the world",
    img_src: "./img/tips/asset_queen_makeda.png",
    height: "40%"
  }), _ref)],
  store: {
    cheetah: {
      hasUnlocked: false,
      unlockedImgClass: "buy_cheetah",
      lockedImgClass: "buy_cheetah_dark",
      cost: "10",
      quantity: 0,
      imgBackgroundClass: "isCheetahExplosion"
    },
    lion: {
      hasUnlocked: false,
      unlockedImgClass: "buy_lion",
      lockedImgClass: "buy_lion_dark",
      cost: "10",
      quantity: 0,
      imgBackgroundClass: "isLionExplosion"
    },
    panther: {
      hasUnlocked: false,
      unlockedImgClass: "buy_panther",
      lockedImgClass: "buy_panther_dark",
      cost: "10",
      quantity: 0,
      imgBackgroundClass: "isPantherExplosion"
    },
    elephant: {
      hasUnlocked: false,
      unlockedImgClass: "buy_elephant",
      lockedImgClass: "buy_elephant_dark",
      cost: "10",
      quantity: 0,
      imgBackgroundClass: "isElephantExplosion"
    },
    giraffe: {
      hasUnlocked: false,
      unlockedImgClass: "buy_giraffe",
      lockedImgClass: "buy_giraffe_dark",
      cost: "10",
      quantity: 0,
      imgBackgroundClass: "isGiraffeExplosion"
    },
    gorilla: {
      hasUnlocked: false,
      unlockedImgClass: "buy_gorilla",
      lockedImgClass: "buy_gorilla_dark",
      cost: "10",
      quantity: 0,
      imgBackgroundClass: "isGorillaExplosion"
    },
    redtailedmonkey: {
      hasUnlocked: false,
      unlockedImgClass: "buy_redtailedmonkey",
      lockedImgClass: "buy_redtailedmonkey_dark",
      cost: "10",
      quantity: 0,
      imgBackgroundClass: "isRedTailedMonkeyExplosion"
    },
    rhino: {
      hasUnlocked: false,
      unlockedImgClass: "buy_rhino",
      lockedImgClass: "buy_rhino_dark",
      cost: "10",
      quantity: 0,
      imgBackgroundClass: "isRhinoExplosion"
    },
    queen_candace: {
      hasUnlocked: false,
      unlockedImgClass: "buy_queen_candace",
      lockedImgClass: "buy_queen_candace_dark",
      cost: "50",
      quantity: 0,
      imgBackgroundClass: "isQueenCandaceExplosion"
    },
    queen_makeda: {
      hasUnlocked: false,
      unlockedImgClass: "buy_queen_makeda",
      lockedImgClass: "buy_queen_makeda_dark",
      cost: "50",
      quantity: 0,
      imgBackgroundClass: "isQueenMakedaExplosion"
    }
  },
  gold: 0,
  itemsPurchased: [],
  itemsSelected: []
};

module.exports = settings;

/***/ },
/* 144 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// tracks who clicked on each line
var whoClickTheLine = {
  box0: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box1: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box2: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box3: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box4: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box5: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box6: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box7: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box8: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box9: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box10: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box11: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box12: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box13: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box14: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box15: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box16: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box17: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box18: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box19: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box20: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box21: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box22: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box23: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box24: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box25: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box26: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box27: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box28: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box29: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box30: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box31: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box32: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box33: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box34: {
    top: null,
    right: null,
    bottom: null,
    left: null
  },
  box35: {
    top: null,
    right: null,
    bottom: null,
    left: null
  }
};

module.exports = whoClickTheLine;

/***/ },
/* 145 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global, module) {

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/**
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * https://raw.github.com/facebook/regenerator/master/LICENSE file. An
 * additional grant of patent rights can be found in the PATENTS file in
 * the same directory.
 */

!function (global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = ( false ? "undefined" : _typeof(module)) === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      prototype[method] = function (arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function (genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor ? ctor === GeneratorFunction ||
    // For the native GeneratorFunction constructor, the best we can
    // do is to check its .name property.
    (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
  };

  runtime.mark = function (genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function (arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === "object" && hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function (value) {
            invoke("next", value, resolve, reject);
          }, function (err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function (unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration. If the Promise is rejected, however, the
          // result for this iteration will be rejected with the same
          // reason. Note that rejections of yielded Promises are not
          // thrown back into the generator function, as is the case
          // when an awaited Promise is rejected. This difference in
          // behavior between yield and await is important, because it
          // allows the consumer to decide what to do with the yielded
          // rejection (swallow it and continue, manually .throw it back
          // into the generator, abandon iteration, whatever). With
          // await, by contrast, there is no opportunity to examine the
          // rejection reason outside the generator function, so the
          // only option is to throw it from the await expression, and
          // let the generator function handle the exception.
          result.value = unwrapped;
          resolve(result);
        }, reject);
      }
    }

    if (_typeof(global.process) === "object" && global.process.domain) {
      invoke = global.process.domain.bind(invoke);
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
      // If enqueue has been called before, then we want to wait until
      // all previous Promises have been resolved before calling invoke,
      // so that results are always delivered in the correct order. If
      // enqueue has not been called before, then it is important to
      // call invoke immediately, without waiting on a callback to fire,
      // so that the async generator function has the opportunity to do
      // any necessary setup in a predictable way. This predictability
      // is why the Promise constructor synchronously invokes its
      // executor callback, and why async functions synchronously
      // execute code before the first await. Since we implement simple
      // async functions in terms of async generators, it is especially
      // important to get this right, even though it requires care.
      previousPromise ? previousPromise.then(callInvokeWithMethodAndArg,
      // Avoid propagating failures to Promises returned by later
      // invocations of the iterator.
      callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function (innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));

    return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
    : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;
        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);
        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done ? GenStateCompleted : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };
        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (!info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }
    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function () {
    return this;
  };

  Gp.toString = function () {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function (object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function reset(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function stop() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function dispatchException(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }
          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }
          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function abrupt(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function complete(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" || record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function finish(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function _catch(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function delegateYield(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
}(
// Among the various tricks for obtaining a reference to the global
// object, this seems to be the most reliable technique that does not
// use indirect eval (which violates Content Security Policy).
(typeof global === "undefined" ? "undefined" : _typeof(global)) === "object" ? global : (typeof window === "undefined" ? "undefined" : _typeof(window)) === "object" ? window : (typeof self === "undefined" ? "undefined" : _typeof(self)) === "object" ? self : undefined);
/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(130), __webpack_require__(346)(module)))

/***/ },
/* 146 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(153);
module.exports = __webpack_require__(19).RegExp.escape;

/***/ },
/* 147 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var isArray = __webpack_require__(55);
var SPECIES = __webpack_require__(5)('species');

module.exports = function (original) {
  var C;
  if (isArray(original)) {
    C = original.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  }return C === undefined ? Array : C;
};

/***/ },
/* 148 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()

var fails = __webpack_require__(3);
var getTime = Date.prototype.getTime;
var $toISOString = Date.prototype.toISOString;

var lz = function lz(num) {
  return num > 9 ? num : '0' + num;
};

// PhantomJS / old WebKit has a broken implementations
module.exports = fails(function () {
  return $toISOString.call(new Date(-5e13 - 1)) != '0385-07-25T07:06:39.999Z';
}) || !fails(function () {
  $toISOString.call(new Date(NaN));
}) ? function toISOString() {
  if (!isFinite(getTime.call(this))) throw RangeError('Invalid time value');
  var d = this;
  var y = d.getUTCFullYear();
  var m = d.getUTCMilliseconds();
  var s = y < 0 ? '-' : y > 9999 ? '+' : '';
  return s + ('00000' + Math.abs(y)).slice(s ? -6 : -4) + '-' + lz(d.getUTCMonth() + 1) + '-' + lz(d.getUTCDate()) + 'T' + lz(d.getUTCHours()) + ':' + lz(d.getUTCMinutes()) + ':' + lz(d.getUTCSeconds()) + '.' + (m > 99 ? m : '0' + lz(m)) + 'Z';
} : $toISOString;

/***/ },
/* 149 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(26);
var NUMBER = 'number';

module.exports = function (hint) {
  if (hint !== 'string' && hint !== NUMBER && hint !== 'default') throw TypeError('Incorrect hint');
  return toPrimitive(anObject(this), hint != NUMBER);
};

/***/ },
/* 150 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// all enumerable object keys, includes symbols
var getKeys = __webpack_require__(36);
var gOPS = __webpack_require__(59);
var pIE = __webpack_require__(49);
module.exports = function (it) {
  var result = getKeys(it);
  var getSymbols = gOPS.f;
  if (getSymbols) {
    var symbols = getSymbols(it);
    var isEnum = pIE.f;
    var i = 0;
    var key;
    while (symbols.length > i) {
      if (isEnum.call(it, key = symbols[i++])) result.push(key);
    }
  }return result;
};

/***/ },
/* 151 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = __webpack_require__(50)('native-function-to-string', Function.toString);

/***/ },
/* 152 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (regExp, replace) {
  var replacer = replace === Object(replace) ? function (part) {
    return replace[part];
  } : replace;
  return function (it) {
    return String(it).replace(regExp, replacer);
  };
};

/***/ },
/* 153 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/benjamingr/RexExp.escape
var $export = __webpack_require__(0);
var $re = __webpack_require__(152)(/[\\^$*+?.()|[\]{}]/g, '\\$&');

$export($export.S, 'RegExp', { escape: function escape(it) {
    return $re(it);
  } });

/***/ },
/* 154 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.3 Array.prototype.copyWithin(target, start, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { copyWithin: __webpack_require__(95) });

__webpack_require__(29)('copyWithin');

/***/ },
/* 155 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $every = __webpack_require__(23)(4);

$export($export.P + $export.F * !__webpack_require__(21)([].every, true), 'Array', {
  // 22.1.3.5 / 15.4.4.16 Array.prototype.every(callbackfn [, thisArg])
  every: function every(callbackfn /* , thisArg */) {
    return $every(this, callbackfn, arguments[1]);
  }
});

/***/ },
/* 156 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 22.1.3.6 Array.prototype.fill(value, start = 0, end = this.length)
var $export = __webpack_require__(0);

$export($export.P, 'Array', { fill: __webpack_require__(67) });

__webpack_require__(29)('fill');

/***/ },
/* 157 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $filter = __webpack_require__(23)(2);

$export($export.P + $export.F * !__webpack_require__(21)([].filter, true), 'Array', {
  // 22.1.3.7 / 15.4.4.20 Array.prototype.filter(callbackfn [, thisArg])
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments[1]);
  }
});

/***/ },
/* 158 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.9 Array.prototype.findIndex(predicate, thisArg = undefined)

var $export = __webpack_require__(0);
var $find = __webpack_require__(23)(6);
var KEY = 'findIndex';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  findIndex: function findIndex(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(29)(KEY);

/***/ },
/* 159 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.8 Array.prototype.find(predicate, thisArg = undefined)

var $export = __webpack_require__(0);
var $find = __webpack_require__(23)(5);
var KEY = 'find';
var forced = true;
// Shouldn't skip holes
if (KEY in []) Array(1)[KEY](function () {
  forced = false;
});
$export($export.P + $export.F * forced, 'Array', {
  find: function find(callbackfn /* , that = undefined */) {
    return $find(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});
__webpack_require__(29)(KEY);

/***/ },
/* 160 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $forEach = __webpack_require__(23)(0);
var STRICT = __webpack_require__(21)([].forEach, true);

$export($export.P + $export.F * !STRICT, 'Array', {
  // 22.1.3.10 / 15.4.4.18 Array.prototype.forEach(callbackfn [, thisArg])
  forEach: function forEach(callbackfn /* , thisArg */) {
    return $forEach(this, callbackfn, arguments[1]);
  }
});

/***/ },
/* 161 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var ctx = __webpack_require__(20);
var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var call = __webpack_require__(106);
var isArrayIter = __webpack_require__(75);
var toLength = __webpack_require__(6);
var createProperty = __webpack_require__(69);
var getIterFn = __webpack_require__(91);

$export($export.S + $export.F * !__webpack_require__(57)(function (iter) {
  Array.from(iter);
}), 'Array', {
  // 22.1.2.1 Array.from(arrayLike, mapfn = undefined, thisArg = undefined)
  from: function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
    var O = toObject(arrayLike);
    var C = typeof this == 'function' ? this : Array;
    var aLen = arguments.length;
    var mapfn = aLen > 1 ? arguments[1] : undefined;
    var mapping = mapfn !== undefined;
    var index = 0;
    var iterFn = getIterFn(O);
    var length, result, step, iterator;
    if (mapping) mapfn = ctx(mapfn, aLen > 2 ? arguments[2] : undefined, 2);
    // if object isn't iterable or it's array with default iterator - use simple case
    if (iterFn != undefined && !(C == Array && isArrayIter(iterFn))) {
      for (iterator = iterFn.call(O), result = new C(); !(step = iterator.next()).done; index++) {
        createProperty(result, index, mapping ? call(iterator, mapfn, [step.value, index], true) : step.value);
      }
    } else {
      length = toLength(O.length);
      for (result = new C(length); length > index; index++) {
        createProperty(result, index, mapping ? mapfn(O[index], index) : O[index]);
      }
    }
    result.length = index;
    return result;
  }
});

/***/ },
/* 162 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $indexOf = __webpack_require__(52)(false);
var $native = [].indexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].indexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.11 / 15.4.4.14 Array.prototype.indexOf(searchElement [, fromIndex])
  indexOf: function indexOf(searchElement /* , fromIndex = 0 */) {
    return NEGATIVE_ZERO
    // convert -0 to +0
    ? $native.apply(this, arguments) || 0 : $indexOf(this, searchElement, arguments[1]);
  }
});

/***/ },
/* 163 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 22.1.2.2 / 15.4.3.2 Array.isArray(arg)
var $export = __webpack_require__(0);

$export($export.S, 'Array', { isArray: __webpack_require__(55) });

/***/ },
/* 164 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 22.1.3.13 Array.prototype.join(separator)

var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var arrayJoin = [].join;

// fallback for not array-like strings
$export($export.P + $export.F * (__webpack_require__(48) != Object || !__webpack_require__(21)(arrayJoin)), 'Array', {
  join: function join(separator) {
    return arrayJoin.call(toIObject(this), separator === undefined ? ',' : separator);
  }
});

/***/ },
/* 165 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var toInteger = __webpack_require__(22);
var toLength = __webpack_require__(6);
var $native = [].lastIndexOf;
var NEGATIVE_ZERO = !!$native && 1 / [1].lastIndexOf(1, -0) < 0;

$export($export.P + $export.F * (NEGATIVE_ZERO || !__webpack_require__(21)($native)), 'Array', {
  // 22.1.3.14 / 15.4.4.15 Array.prototype.lastIndexOf(searchElement [, fromIndex])
  lastIndexOf: function lastIndexOf(searchElement /* , fromIndex = @[*-1] */) {
    // convert -0 to +0
    if (NEGATIVE_ZERO) return $native.apply(this, arguments) || 0;
    var O = toIObject(this);
    var length = toLength(O.length);
    var index = length - 1;
    if (arguments.length > 1) index = Math.min(index, toInteger(arguments[1]));
    if (index < 0) index = length + index;
    for (; index >= 0; index--) {
      if (index in O) if (O[index] === searchElement) return index || 0;
    }return -1;
  }
});

/***/ },
/* 166 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $map = __webpack_require__(23)(1);

$export($export.P + $export.F * !__webpack_require__(21)([].map, true), 'Array', {
  // 22.1.3.15 / 15.4.4.19 Array.prototype.map(callbackfn [, thisArg])
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments[1]);
  }
});

/***/ },
/* 167 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var createProperty = __webpack_require__(69);

// WebKit Array.of isn't generic
$export($export.S + $export.F * __webpack_require__(3)(function () {
  function F() {/* empty */}
  return !(Array.of.call(F) instanceof F);
}), 'Array', {
  // 22.1.2.3 Array.of( ...items)
  of: function of() /* ...args */{
    var index = 0;
    var aLen = arguments.length;
    var result = new (typeof this == 'function' ? this : Array)(aLen);
    while (aLen > index) {
      createProperty(result, index, arguments[index++]);
    }result.length = aLen;
    return result;
  }
});

/***/ },
/* 168 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $reduce = __webpack_require__(97);

$export($export.P + $export.F * !__webpack_require__(21)([].reduceRight, true), 'Array', {
  // 22.1.3.19 / 15.4.4.22 Array.prototype.reduceRight(callbackfn [, initialValue])
  reduceRight: function reduceRight(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], true);
  }
});

/***/ },
/* 169 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $reduce = __webpack_require__(97);

$export($export.P + $export.F * !__webpack_require__(21)([].reduce, true), 'Array', {
  // 22.1.3.18 / 15.4.4.21 Array.prototype.reduce(callbackfn [, initialValue])
  reduce: function reduce(callbackfn /* , initialValue */) {
    return $reduce(this, callbackfn, arguments.length, arguments[1], false);
  }
});

/***/ },
/* 170 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var html = __webpack_require__(73);
var cof = __webpack_require__(18);
var toAbsoluteIndex = __webpack_require__(40);
var toLength = __webpack_require__(6);
var arraySlice = [].slice;

// fallback for not array-like ES3 strings and DOM objects
$export($export.P + $export.F * __webpack_require__(3)(function () {
  if (html) arraySlice.call(html);
}), 'Array', {
  slice: function slice(begin, end) {
    var len = toLength(this.length);
    var klass = cof(this);
    end = end === undefined ? len : end;
    if (klass == 'Array') return arraySlice.call(this, begin, end);
    var start = toAbsoluteIndex(begin, len);
    var upTo = toAbsoluteIndex(end, len);
    var size = toLength(upTo - start);
    var cloned = new Array(size);
    var i = 0;
    for (; i < size; i++) {
      cloned[i] = klass == 'String' ? this.charAt(start + i) : this[start + i];
    }return cloned;
  }
});

/***/ },
/* 171 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $some = __webpack_require__(23)(3);

$export($export.P + $export.F * !__webpack_require__(21)([].some, true), 'Array', {
  // 22.1.3.23 / 15.4.4.17 Array.prototype.some(callbackfn [, thisArg])
  some: function some(callbackfn /* , thisArg */) {
    return $some(this, callbackfn, arguments[1]);
  }
});

/***/ },
/* 172 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var toObject = __webpack_require__(9);
var fails = __webpack_require__(3);
var $sort = [].sort;
var test = [1, 2, 3];

$export($export.P + $export.F * (fails(function () {
  // IE8-
  test.sort(undefined);
}) || !fails(function () {
  // V8 bug
  test.sort(null);
  // Old WebKit
}) || !__webpack_require__(21)($sort)), 'Array', {
  // 22.1.3.25 Array.prototype.sort(comparefn)
  sort: function sort(comparefn) {
    return comparefn === undefined ? $sort.call(toObject(this)) : $sort.call(toObject(this), aFunction(comparefn));
  }
});

/***/ },
/* 173 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(39)('Array');

/***/ },
/* 174 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.3.3.1 / 15.9.4.4 Date.now()
var $export = __webpack_require__(0);

$export($export.S, 'Date', { now: function now() {
    return new Date().getTime();
  } });

/***/ },
/* 175 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.3.4.36 / 15.9.5.43 Date.prototype.toISOString()
var $export = __webpack_require__(0);
var toISOString = __webpack_require__(148);

// PhantomJS / old WebKit has a broken implementations
$export($export.P + $export.F * (Date.prototype.toISOString !== toISOString), 'Date', {
  toISOString: toISOString
});

/***/ },
/* 176 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(26);

$export($export.P + $export.F * __webpack_require__(3)(function () {
  return new Date(NaN).toJSON() !== null || Date.prototype.toJSON.call({ toISOString: function toISOString() {
      return 1;
    } }) !== 1;
}), 'Date', {
  // eslint-disable-next-line no-unused-vars
  toJSON: function toJSON(key) {
    var O = toObject(this);
    var pv = toPrimitive(O);
    return typeof pv == 'number' && !isFinite(pv) ? null : O.toISOString();
  }
});

/***/ },
/* 177 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var TO_PRIMITIVE = __webpack_require__(5)('toPrimitive');
var proto = Date.prototype;

if (!(TO_PRIMITIVE in proto)) __webpack_require__(11)(proto, TO_PRIMITIVE, __webpack_require__(149));

/***/ },
/* 178 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var DateProto = Date.prototype;
var INVALID_DATE = 'Invalid Date';
var TO_STRING = 'toString';
var $toString = DateProto[TO_STRING];
var getTime = DateProto.getTime;
if (new Date(NaN) + '' != INVALID_DATE) {
  __webpack_require__(12)(DateProto, TO_STRING, function toString() {
    var value = getTime.call(this);
    // eslint-disable-next-line no-self-compare
    return value === value ? $toString.call(this) : INVALID_DATE;
  });
}

/***/ },
/* 179 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.2.3.2 / 15.3.4.5 Function.prototype.bind(thisArg, args...)
var $export = __webpack_require__(0);

$export($export.P, 'Function', { bind: __webpack_require__(98) });

/***/ },
/* 180 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isObject = __webpack_require__(4);
var getPrototypeOf = __webpack_require__(16);
var HAS_INSTANCE = __webpack_require__(5)('hasInstance');
var FunctionProto = Function.prototype;
// 19.2.3.6 Function.prototype[@@hasInstance](V)
if (!(HAS_INSTANCE in FunctionProto)) __webpack_require__(8).f(FunctionProto, HAS_INSTANCE, { value: function value(O) {
    if (typeof this != 'function' || !isObject(O)) return false;
    if (!isObject(this.prototype)) return O instanceof this;
    // for environment w/o native `@@hasInstance` logic enough `instanceof`, but add this:
    while (O = getPrototypeOf(O)) {
      if (this.prototype === O) return true;
    }return false;
  } });

/***/ },
/* 181 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var dP = __webpack_require__(8).f;
var FProto = Function.prototype;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// 19.2.4.2 name
NAME in FProto || __webpack_require__(7) && dP(FProto, NAME, {
  configurable: true,
  get: function get() {
    try {
      return ('' + this).match(nameRE)[1];
    } catch (e) {
      return '';
    }
  }
});

/***/ },
/* 182 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.3 Math.acosh(x)
var $export = __webpack_require__(0);
var log1p = __webpack_require__(109);
var sqrt = Math.sqrt;
var $acosh = Math.acosh;

$export($export.S + $export.F * !($acosh
// V8 bug: https://code.google.com/p/v8/issues/detail?id=3509
&& Math.floor($acosh(Number.MAX_VALUE)) == 710
// Tor Browser bug: Math.acosh(Infinity) -> NaN
&& $acosh(Infinity) == Infinity), 'Math', {
  acosh: function acosh(x) {
    return (x = +x) < 1 ? NaN : x > 94906265.62425156 ? Math.log(x) + Math.LN2 : log1p(x - 1 + sqrt(x - 1) * sqrt(x + 1));
  }
});

/***/ },
/* 183 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.5 Math.asinh(x)
var $export = __webpack_require__(0);
var $asinh = Math.asinh;

function asinh(x) {
  return !isFinite(x = +x) || x == 0 ? x : x < 0 ? -asinh(-x) : Math.log(x + Math.sqrt(x * x + 1));
}

// Tor Browser bug: Math.asinh(0) -> -0
$export($export.S + $export.F * !($asinh && 1 / $asinh(0) > 0), 'Math', { asinh: asinh });

/***/ },
/* 184 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.7 Math.atanh(x)
var $export = __webpack_require__(0);
var $atanh = Math.atanh;

// Tor Browser bug: Math.atanh(-0) -> 0
$export($export.S + $export.F * !($atanh && 1 / $atanh(-0) < 0), 'Math', {
  atanh: function atanh(x) {
    return (x = +x) == 0 ? x : Math.log((1 + x) / (1 - x)) / 2;
  }
});

/***/ },
/* 185 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.9 Math.cbrt(x)
var $export = __webpack_require__(0);
var sign = __webpack_require__(79);

$export($export.S, 'Math', {
  cbrt: function cbrt(x) {
    return sign(x = +x) * Math.pow(Math.abs(x), 1 / 3);
  }
});

/***/ },
/* 186 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.11 Math.clz32(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clz32: function clz32(x) {
    return (x >>>= 0) ? 31 - Math.floor(Math.log(x + 0.5) * Math.LOG2E) : 32;
  }
});

/***/ },
/* 187 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.12 Math.cosh(x)
var $export = __webpack_require__(0);
var exp = Math.exp;

$export($export.S, 'Math', {
  cosh: function cosh(x) {
    return (exp(x = +x) + exp(-x)) / 2;
  }
});

/***/ },
/* 188 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.14 Math.expm1(x)
var $export = __webpack_require__(0);
var $expm1 = __webpack_require__(78);

$export($export.S + $export.F * ($expm1 != Math.expm1), 'Math', { expm1: $expm1 });

/***/ },
/* 189 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.16 Math.fround(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { fround: __webpack_require__(108) });

/***/ },
/* 190 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.17 Math.hypot([value1[, value2[, … ]]])
var $export = __webpack_require__(0);
var abs = Math.abs;

$export($export.S, 'Math', {
  hypot: function hypot(value1, value2) {
    // eslint-disable-line no-unused-vars
    var sum = 0;
    var i = 0;
    var aLen = arguments.length;
    var larg = 0;
    var arg, div;
    while (i < aLen) {
      arg = abs(arguments[i++]);
      if (larg < arg) {
        div = larg / arg;
        sum = sum * div * div + 1;
        larg = arg;
      } else if (arg > 0) {
        div = arg / larg;
        sum += div * div;
      } else sum += arg;
    }
    return larg === Infinity ? Infinity : larg * Math.sqrt(sum);
  }
});

/***/ },
/* 191 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.18 Math.imul(x, y)
var $export = __webpack_require__(0);
var $imul = Math.imul;

// some WebKit versions fails with big numbers, some has wrong arity
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return $imul(0xffffffff, 5) != -5 || $imul.length != 2;
}), 'Math', {
  imul: function imul(x, y) {
    var UINT16 = 0xffff;
    var xn = +x;
    var yn = +y;
    var xl = UINT16 & xn;
    var yl = UINT16 & yn;
    return 0 | xl * yl + ((UINT16 & xn >>> 16) * yl + xl * (UINT16 & yn >>> 16) << 16 >>> 0);
  }
});

/***/ },
/* 192 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.21 Math.log10(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log10: function log10(x) {
    return Math.log(x) * Math.LOG10E;
  }
});

/***/ },
/* 193 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.20 Math.log1p(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { log1p: __webpack_require__(109) });

/***/ },
/* 194 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.22 Math.log2(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  log2: function log2(x) {
    return Math.log(x) / Math.LN2;
  }
});

/***/ },
/* 195 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.28 Math.sign(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', { sign: __webpack_require__(79) });

/***/ },
/* 196 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.30 Math.sinh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(78);
var exp = Math.exp;

// V8 near Chromium 38 has a problem with very small numbers
$export($export.S + $export.F * __webpack_require__(3)(function () {
  return !Math.sinh(-2e-17) != -2e-17;
}), 'Math', {
  sinh: function sinh(x) {
    return Math.abs(x = +x) < 1 ? (expm1(x) - expm1(-x)) / 2 : (exp(x - 1) - exp(-x - 1)) * (Math.E / 2);
  }
});

/***/ },
/* 197 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.33 Math.tanh(x)
var $export = __webpack_require__(0);
var expm1 = __webpack_require__(78);
var exp = Math.exp;

$export($export.S, 'Math', {
  tanh: function tanh(x) {
    var a = expm1(x = +x);
    var b = expm1(-x);
    return a == Infinity ? 1 : b == Infinity ? -1 : (a - b) / (exp(x) + exp(-x));
  }
});

/***/ },
/* 198 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.2.2.34 Math.trunc(x)
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  trunc: function trunc(it) {
    return (it > 0 ? Math.floor : Math.ceil)(it);
  }
});

/***/ },
/* 199 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var has = __webpack_require__(14);
var cof = __webpack_require__(18);
var inheritIfRequired = __webpack_require__(74);
var toPrimitive = __webpack_require__(26);
var fails = __webpack_require__(3);
var gOPN = __webpack_require__(35).f;
var gOPD = __webpack_require__(15).f;
var dP = __webpack_require__(8).f;
var $trim = __webpack_require__(46).trim;
var NUMBER = 'Number';
var $Number = global[NUMBER];
var Base = $Number;
var proto = $Number.prototype;
// Opera ~12 has broken Object#toString
var BROKEN_COF = cof(__webpack_require__(34)(proto)) == NUMBER;
var TRIM = 'trim' in String.prototype;

// 7.1.3 ToNumber(argument)
var toNumber = function toNumber(argument) {
  var it = toPrimitive(argument, false);
  if (typeof it == 'string' && it.length > 2) {
    it = TRIM ? it.trim() : $trim(it, 3);
    var first = it.charCodeAt(0);
    var third, radix, maxCode;
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66:case 98:
          radix = 2;maxCode = 49;break; // fast equal /^0b[01]+$/i
        case 79:case 111:
          radix = 8;maxCode = 55;break; // fast equal /^0o[0-7]+$/i
        default:
          return +it;
      }
      for (var digits = it.slice(2), i = 0, l = digits.length, code; i < l; i++) {
        code = digits.charCodeAt(i);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      }return parseInt(digits, radix);
    }
  }return +it;
};

if (!$Number(' 0o1') || !$Number('0b1') || $Number('+0x1')) {
  $Number = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var that = this;
    return that instanceof $Number
    // check on 1..constructor(foo) case
    && (BROKEN_COF ? fails(function () {
      proto.valueOf.call(that);
    }) : cof(that) != NUMBER) ? inheritIfRequired(new Base(toNumber(it)), that, $Number) : toNumber(it);
  };
  for (var keys = __webpack_require__(7) ? gOPN(Base) : (
  // ES3:
  'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
  // ES6 (in case, if modules with ES6 Number statics required before):
  'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' + 'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger').split(','), j = 0, key; keys.length > j; j++) {
    if (has(Base, key = keys[j]) && !has($Number, key)) {
      dP($Number, key, gOPD(Base, key));
    }
  }
  $Number.prototype = proto;
  proto.constructor = $Number;
  __webpack_require__(12)(global, NUMBER, $Number);
}

/***/ },
/* 200 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.1 Number.EPSILON
var $export = __webpack_require__(0);

$export($export.S, 'Number', { EPSILON: Math.pow(2, -52) });

/***/ },
/* 201 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.2 Number.isFinite(number)
var $export = __webpack_require__(0);
var _isFinite = __webpack_require__(2).isFinite;

$export($export.S, 'Number', {
  isFinite: function isFinite(it) {
    return typeof it == 'number' && _isFinite(it);
  }
});

/***/ },
/* 202 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.3 Number.isInteger(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', { isInteger: __webpack_require__(105) });

/***/ },
/* 203 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.4 Number.isNaN(number)
var $export = __webpack_require__(0);

$export($export.S, 'Number', {
  isNaN: function isNaN(number) {
    // eslint-disable-next-line no-self-compare
    return number != number;
  }
});

/***/ },
/* 204 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.5 Number.isSafeInteger(number)
var $export = __webpack_require__(0);
var isInteger = __webpack_require__(105);
var abs = Math.abs;

$export($export.S, 'Number', {
  isSafeInteger: function isSafeInteger(number) {
    return isInteger(number) && abs(number) <= 0x1fffffffffffff;
  }
});

/***/ },
/* 205 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.6 Number.MAX_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MAX_SAFE_INTEGER: 0x1fffffffffffff });

/***/ },
/* 206 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 20.1.2.10 Number.MIN_SAFE_INTEGER
var $export = __webpack_require__(0);

$export($export.S, 'Number', { MIN_SAFE_INTEGER: -0x1fffffffffffff });

/***/ },
/* 207 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(117);
// 20.1.2.12 Number.parseFloat(string)
$export($export.S + $export.F * (Number.parseFloat != $parseFloat), 'Number', { parseFloat: $parseFloat });

/***/ },
/* 208 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(118);
// 20.1.2.13 Number.parseInt(string, radix)
$export($export.S + $export.F * (Number.parseInt != $parseInt), 'Number', { parseInt: $parseInt });

/***/ },
/* 209 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toInteger = __webpack_require__(22);
var aNumberValue = __webpack_require__(94);
var repeat = __webpack_require__(86);
var $toFixed = 1.0.toFixed;
var floor = Math.floor;
var data = [0, 0, 0, 0, 0, 0];
var ERROR = 'Number.toFixed: incorrect invocation!';
var ZERO = '0';

var multiply = function multiply(n, c) {
  var i = -1;
  var c2 = c;
  while (++i < 6) {
    c2 += n * data[i];
    data[i] = c2 % 1e7;
    c2 = floor(c2 / 1e7);
  }
};
var divide = function divide(n) {
  var i = 6;
  var c = 0;
  while (--i >= 0) {
    c += data[i];
    data[i] = floor(c / n);
    c = c % n * 1e7;
  }
};
var numToString = function numToString() {
  var i = 6;
  var s = '';
  while (--i >= 0) {
    if (s !== '' || i === 0 || data[i] !== 0) {
      var t = String(data[i]);
      s = s === '' ? t : s + repeat.call(ZERO, 7 - t.length) + t;
    }
  }return s;
};
var pow = function pow(x, n, acc) {
  return n === 0 ? acc : n % 2 === 1 ? pow(x, n - 1, acc * x) : pow(x * x, n / 2, acc);
};
var log = function log(x) {
  var n = 0;
  var x2 = x;
  while (x2 >= 4096) {
    n += 12;
    x2 /= 4096;
  }
  while (x2 >= 2) {
    n += 1;
    x2 /= 2;
  }return n;
};

$export($export.P + $export.F * (!!$toFixed && (0.00008.toFixed(3) !== '0.000' || 0.9.toFixed(0) !== '1' || 1.255.toFixed(2) !== '1.25' || 1000000000000000128.0.toFixed(0) !== '1000000000000000128') || !__webpack_require__(3)(function () {
  // V8 ~ Android 4.3-
  $toFixed.call({});
})), 'Number', {
  toFixed: function toFixed(fractionDigits) {
    var x = aNumberValue(this, ERROR);
    var f = toInteger(fractionDigits);
    var s = '';
    var m = ZERO;
    var e, z, j, k;
    if (f < 0 || f > 20) throw RangeError(ERROR);
    // eslint-disable-next-line no-self-compare
    if (x != x) return 'NaN';
    if (x <= -1e21 || x >= 1e21) return String(x);
    if (x < 0) {
      s = '-';
      x = -x;
    }
    if (x > 1e-21) {
      e = log(x * pow(2, 69, 1)) - 69;
      z = e < 0 ? x * pow(2, -e, 1) : x / pow(2, e, 1);
      z *= 0x10000000000000;
      e = 52 - e;
      if (e > 0) {
        multiply(0, z);
        j = f;
        while (j >= 7) {
          multiply(1e7, 0);
          j -= 7;
        }
        multiply(pow(10, j, 1), 0);
        j = e - 1;
        while (j >= 23) {
          divide(1 << 23);
          j -= 23;
        }
        divide(1 << j);
        multiply(1, 1);
        divide(2);
        m = numToString();
      } else {
        multiply(0, z);
        multiply(1 << -e, 0);
        m = numToString() + repeat.call(ZERO, f);
      }
    }
    if (f > 0) {
      k = m.length;
      m = s + (k <= f ? '0.' + repeat.call(ZERO, f - k) + m : m.slice(0, k - f) + '.' + m.slice(k - f));
    } else {
      m = s + m;
    }return m;
  }
});

/***/ },
/* 210 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $fails = __webpack_require__(3);
var aNumberValue = __webpack_require__(94);
var $toPrecision = 1.0.toPrecision;

$export($export.P + $export.F * ($fails(function () {
  // IE7-
  return $toPrecision.call(1, undefined) !== '1';
}) || !$fails(function () {
  // V8 ~ Android 4.3-
  $toPrecision.call({});
})), 'Number', {
  toPrecision: function toPrecision(precision) {
    var that = aNumberValue(this, 'Number#toPrecision: incorrect invocation!');
    return precision === undefined ? $toPrecision.call(that) : $toPrecision.call(that, precision);
  }
});

/***/ },
/* 211 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.1 Object.assign(target, source)
var $export = __webpack_require__(0);

$export($export.S + $export.F, 'Object', { assign: __webpack_require__(111) });

/***/ },
/* 212 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.2 / 15.2.3.5 Object.create(O [, Properties])
$export($export.S, 'Object', { create: __webpack_require__(34) });

/***/ },
/* 213 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.3 / 15.2.3.7 Object.defineProperties(O, Properties)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperties: __webpack_require__(112) });

/***/ },
/* 214 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(7), 'Object', { defineProperty: __webpack_require__(8).f });

/***/ },
/* 215 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.5 Object.freeze(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(25)('freeze', function ($freeze) {
  return function freeze(it) {
    return $freeze && isObject(it) ? $freeze(meta(it)) : it;
  };
});

/***/ },
/* 216 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
var toIObject = __webpack_require__(17);
var $getOwnPropertyDescriptor = __webpack_require__(15).f;

__webpack_require__(25)('getOwnPropertyDescriptor', function () {
  return function getOwnPropertyDescriptor(it, key) {
    return $getOwnPropertyDescriptor(toIObject(it), key);
  };
});

/***/ },
/* 217 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.7 Object.getOwnPropertyNames(O)
__webpack_require__(25)('getOwnPropertyNames', function () {
  return __webpack_require__(113).f;
});

/***/ },
/* 218 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.9 Object.getPrototypeOf(O)
var toObject = __webpack_require__(9);
var $getPrototypeOf = __webpack_require__(16);

__webpack_require__(25)('getPrototypeOf', function () {
  return function getPrototypeOf(it) {
    return $getPrototypeOf(toObject(it));
  };
});

/***/ },
/* 219 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.11 Object.isExtensible(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isExtensible', function ($isExtensible) {
  return function isExtensible(it) {
    return isObject(it) ? $isExtensible ? $isExtensible(it) : true : false;
  };
});

/***/ },
/* 220 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.12 Object.isFrozen(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isFrozen', function ($isFrozen) {
  return function isFrozen(it) {
    return isObject(it) ? $isFrozen ? $isFrozen(it) : false : true;
  };
});

/***/ },
/* 221 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.13 Object.isSealed(O)
var isObject = __webpack_require__(4);

__webpack_require__(25)('isSealed', function ($isSealed) {
  return function isSealed(it) {
    return isObject(it) ? $isSealed ? $isSealed(it) : false : true;
  };
});

/***/ },
/* 222 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.10 Object.is(value1, value2)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { is: __webpack_require__(121) });

/***/ },
/* 223 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.14 Object.keys(O)
var toObject = __webpack_require__(9);
var $keys = __webpack_require__(36);

__webpack_require__(25)('keys', function () {
  return function keys(it) {
    return $keys(toObject(it));
  };
});

/***/ },
/* 224 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.15 Object.preventExtensions(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(25)('preventExtensions', function ($preventExtensions) {
  return function preventExtensions(it) {
    return $preventExtensions && isObject(it) ? $preventExtensions(meta(it)) : it;
  };
});

/***/ },
/* 225 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.2.17 Object.seal(O)
var isObject = __webpack_require__(4);
var meta = __webpack_require__(31).onFreeze;

__webpack_require__(25)('seal', function ($seal) {
  return function seal(it) {
    return $seal && isObject(it) ? $seal(meta(it)) : it;
  };
});

/***/ },
/* 226 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 19.1.3.19 Object.setPrototypeOf(O, proto)
var $export = __webpack_require__(0);
$export($export.S, 'Object', { setPrototypeOf: __webpack_require__(83).set });

/***/ },
/* 227 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 19.1.3.6 Object.prototype.toString()

var classof = __webpack_require__(43);
var test = {};
test[__webpack_require__(5)('toStringTag')] = 'z';
if (test + '' != '[object z]') {
  __webpack_require__(12)(Object.prototype, 'toString', function toString() {
    return '[object ' + classof(this) + ']';
  }, true);
}

/***/ },
/* 228 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseFloat = __webpack_require__(117);
// 18.2.4 parseFloat(string)
$export($export.G + $export.F * (parseFloat != $parseFloat), { parseFloat: $parseFloat });

/***/ },
/* 229 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $parseInt = __webpack_require__(118);
// 18.2.5 parseInt(string, radix)
$export($export.G + $export.F * (parseInt != $parseInt), { parseInt: $parseInt });

/***/ },
/* 230 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var LIBRARY = __webpack_require__(30);
var global = __webpack_require__(2);
var ctx = __webpack_require__(20);
var classof = __webpack_require__(43);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var aFunction = __webpack_require__(10);
var anInstance = __webpack_require__(32);
var forOf = __webpack_require__(33);
var speciesConstructor = __webpack_require__(51);
var task = __webpack_require__(88).set;
var microtask = __webpack_require__(80)();
var newPromiseCapabilityModule = __webpack_require__(81);
var perform = __webpack_require__(119);
var userAgent = __webpack_require__(65);
var promiseResolve = __webpack_require__(120);
var PROMISE = 'Promise';
var TypeError = global.TypeError;
var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8 || '';
var $Promise = global[PROMISE];
var isNode = classof(process) == 'process';
var empty = function empty() {/* empty */};
var Internal, newGenericPromiseCapability, OwnPromiseCapability, Wrapper;
var newPromiseCapability = newGenericPromiseCapability = newPromiseCapabilityModule.f;

var USE_NATIVE = !!function () {
  try {
    // correct subclassing with @@species support
    var promise = $Promise.resolve(1);
    var FakePromise = (promise.constructor = {})[__webpack_require__(5)('species')] = function (exec) {
      exec(empty, empty);
    };
    // unhandled rejections tracking support, NodeJS Promise without it fails @@species test
    return (isNode || typeof PromiseRejectionEvent == 'function') && promise.then(empty) instanceof FakePromise
    // v8 6.6 (Node 10 and Chrome 66) have a bug with resolving custom thenables
    // https://bugs.chromium.org/p/chromium/issues/detail?id=830565
    // we can't detect it synchronously, so just check versions
    && v8.indexOf('6.6') !== 0 && userAgent.indexOf('Chrome/66') === -1;
  } catch (e) {/* empty */}
}();

// helpers
var isThenable = function isThenable(it) {
  var then;
  return isObject(it) && typeof (then = it.then) == 'function' ? then : false;
};
var notify = function notify(promise, isReject) {
  if (promise._n) return;
  promise._n = true;
  var chain = promise._c;
  microtask(function () {
    var value = promise._v;
    var ok = promise._s == 1;
    var i = 0;
    var run = function run(reaction) {
      var handler = ok ? reaction.ok : reaction.fail;
      var resolve = reaction.resolve;
      var reject = reaction.reject;
      var domain = reaction.domain;
      var result, then, exited;
      try {
        if (handler) {
          if (!ok) {
            if (promise._h == 2) onHandleUnhandled(promise);
            promise._h = 1;
          }
          if (handler === true) result = value;else {
            if (domain) domain.enter();
            result = handler(value); // may throw
            if (domain) {
              domain.exit();
              exited = true;
            }
          }
          if (result === reaction.promise) {
            reject(TypeError('Promise-chain cycle'));
          } else if (then = isThenable(result)) {
            then.call(result, resolve, reject);
          } else resolve(result);
        } else reject(value);
      } catch (e) {
        if (domain && !exited) domain.exit();
        reject(e);
      }
    };
    while (chain.length > i) {
      run(chain[i++]);
    } // variable length - can't use forEach
    promise._c = [];
    promise._n = false;
    if (isReject && !promise._h) onUnhandled(promise);
  });
};
var onUnhandled = function onUnhandled(promise) {
  task.call(global, function () {
    var value = promise._v;
    var unhandled = isUnhandled(promise);
    var result, handler, console;
    if (unhandled) {
      result = perform(function () {
        if (isNode) {
          process.emit('unhandledRejection', value, promise);
        } else if (handler = global.onunhandledrejection) {
          handler({ promise: promise, reason: value });
        } else if ((console = global.console) && console.error) {
          console.error('Unhandled promise rejection', value);
        }
      });
      // Browsers should not trigger `rejectionHandled` event if it was handled here, NodeJS - should
      promise._h = isNode || isUnhandled(promise) ? 2 : 1;
    }promise._a = undefined;
    if (unhandled && result.e) throw result.v;
  });
};
var isUnhandled = function isUnhandled(promise) {
  return promise._h !== 1 && (promise._a || promise._c).length === 0;
};
var onHandleUnhandled = function onHandleUnhandled(promise) {
  task.call(global, function () {
    var handler;
    if (isNode) {
      process.emit('rejectionHandled', promise);
    } else if (handler = global.onrejectionhandled) {
      handler({ promise: promise, reason: promise._v });
    }
  });
};
var $reject = function $reject(value) {
  var promise = this;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  promise._v = value;
  promise._s = 2;
  if (!promise._a) promise._a = promise._c.slice();
  notify(promise, true);
};
var $resolve = function $resolve(value) {
  var promise = this;
  var then;
  if (promise._d) return;
  promise._d = true;
  promise = promise._w || promise; // unwrap
  try {
    if (promise === value) throw TypeError("Promise can't be resolved itself");
    if (then = isThenable(value)) {
      microtask(function () {
        var wrapper = { _w: promise, _d: false }; // wrap
        try {
          then.call(value, ctx($resolve, wrapper, 1), ctx($reject, wrapper, 1));
        } catch (e) {
          $reject.call(wrapper, e);
        }
      });
    } else {
      promise._v = value;
      promise._s = 1;
      notify(promise, false);
    }
  } catch (e) {
    $reject.call({ _w: promise, _d: false }, e); // wrap
  }
};

// constructor polyfill
if (!USE_NATIVE) {
  // 25.4.3.1 Promise(executor)
  $Promise = function Promise(executor) {
    anInstance(this, $Promise, PROMISE, '_h');
    aFunction(executor);
    Internal.call(this);
    try {
      executor(ctx($resolve, this, 1), ctx($reject, this, 1));
    } catch (err) {
      $reject.call(this, err);
    }
  };
  // eslint-disable-next-line no-unused-vars
  Internal = function Promise(executor) {
    this._c = []; // <- awaiting reactions
    this._a = undefined; // <- checked in isUnhandled reactions
    this._s = 0; // <- state
    this._d = false; // <- done
    this._v = undefined; // <- value
    this._h = 0; // <- rejection state, 0 - default, 1 - handled, 2 - unhandled
    this._n = false; // <- notify
  };
  Internal.prototype = __webpack_require__(38)($Promise.prototype, {
    // 25.4.5.3 Promise.prototype.then(onFulfilled, onRejected)
    then: function then(onFulfilled, onRejected) {
      var reaction = newPromiseCapability(speciesConstructor(this, $Promise));
      reaction.ok = typeof onFulfilled == 'function' ? onFulfilled : true;
      reaction.fail = typeof onRejected == 'function' && onRejected;
      reaction.domain = isNode ? process.domain : undefined;
      this._c.push(reaction);
      if (this._a) this._a.push(reaction);
      if (this._s) notify(this, false);
      return reaction.promise;
    },
    // 25.4.5.1 Promise.prototype.catch(onRejected)
    'catch': function _catch(onRejected) {
      return this.then(undefined, onRejected);
    }
  });
  OwnPromiseCapability = function OwnPromiseCapability() {
    var promise = new Internal();
    this.promise = promise;
    this.resolve = ctx($resolve, promise, 1);
    this.reject = ctx($reject, promise, 1);
  };
  newPromiseCapabilityModule.f = newPromiseCapability = function newPromiseCapability(C) {
    return C === $Promise || C === Wrapper ? new OwnPromiseCapability(C) : newGenericPromiseCapability(C);
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Promise: $Promise });
__webpack_require__(45)($Promise, PROMISE);
__webpack_require__(39)(PROMISE);
Wrapper = __webpack_require__(19)[PROMISE];

// statics
$export($export.S + $export.F * !USE_NATIVE, PROMISE, {
  // 25.4.4.5 Promise.reject(r)
  reject: function reject(r) {
    var capability = newPromiseCapability(this);
    var $$reject = capability.reject;
    $$reject(r);
    return capability.promise;
  }
});
$export($export.S + $export.F * (LIBRARY || !USE_NATIVE), PROMISE, {
  // 25.4.4.6 Promise.resolve(x)
  resolve: function resolve(x) {
    return promiseResolve(LIBRARY && this === Wrapper ? $Promise : this, x);
  }
});
$export($export.S + $export.F * !(USE_NATIVE && __webpack_require__(57)(function (iter) {
  $Promise.all(iter)['catch'](empty);
})), PROMISE, {
  // 25.4.4.1 Promise.all(iterable)
  all: function all(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var resolve = capability.resolve;
    var reject = capability.reject;
    var result = perform(function () {
      var values = [];
      var index = 0;
      var remaining = 1;
      forOf(iterable, false, function (promise) {
        var $index = index++;
        var alreadyCalled = false;
        values.push(undefined);
        remaining++;
        C.resolve(promise).then(function (value) {
          if (alreadyCalled) return;
          alreadyCalled = true;
          values[$index] = value;
          --remaining || resolve(values);
        }, reject);
      });
      --remaining || resolve(values);
    });
    if (result.e) reject(result.v);
    return capability.promise;
  },
  // 25.4.4.4 Promise.race(iterable)
  race: function race(iterable) {
    var C = this;
    var capability = newPromiseCapability(C);
    var reject = capability.reject;
    var result = perform(function () {
      forOf(iterable, false, function (promise) {
        C.resolve(promise).then(capability.resolve, reject);
      });
    });
    if (result.e) reject(result.v);
    return capability.promise;
  }
});

/***/ },
/* 231 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.1 Reflect.apply(target, thisArgument, argumentsList)
var $export = __webpack_require__(0);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var rApply = (__webpack_require__(2).Reflect || {}).apply;
var fApply = Function.apply;
// MS Edge argumentsList argument is optional
$export($export.S + $export.F * !__webpack_require__(3)(function () {
  rApply(function () {/* empty */});
}), 'Reflect', {
  apply: function apply(target, thisArgument, argumentsList) {
    var T = aFunction(target);
    var L = anObject(argumentsList);
    return rApply ? rApply(T, thisArgument, L) : fApply.call(T, thisArgument, L);
  }
});

/***/ },
/* 232 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.2 Reflect.construct(target, argumentsList [, newTarget])
var $export = __webpack_require__(0);
var create = __webpack_require__(34);
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var fails = __webpack_require__(3);
var bind = __webpack_require__(98);
var rConstruct = (__webpack_require__(2).Reflect || {}).construct;

// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() {/* empty */}
  return !(rConstruct(function () {/* empty */}, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  rConstruct(function () {/* empty */});
});

$export($export.S + $export.F * (NEW_TARGET_BUG || ARGS_BUG), 'Reflect', {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return rConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0:
          return new Target();
        case 1:
          return new Target(args[0]);
        case 2:
          return new Target(args[0], args[1]);
        case 3:
          return new Target(args[0], args[1], args[2]);
        case 4:
          return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});

/***/ },
/* 233 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.3 Reflect.defineProperty(target, propertyKey, attributes)
var dP = __webpack_require__(8);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var toPrimitive = __webpack_require__(26);

// MS Edge has broken Reflect.defineProperty - throwing instead of returning false
$export($export.S + $export.F * __webpack_require__(3)(function () {
  // eslint-disable-next-line no-undef
  Reflect.defineProperty(dP.f({}, 1, { value: 1 }), 1, { value: 2 });
}), 'Reflect', {
  defineProperty: function defineProperty(target, propertyKey, attributes) {
    anObject(target);
    propertyKey = toPrimitive(propertyKey, true);
    anObject(attributes);
    try {
      dP.f(target, propertyKey, attributes);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ },
/* 234 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.4 Reflect.deleteProperty(target, propertyKey)
var $export = __webpack_require__(0);
var gOPD = __webpack_require__(15).f;
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  deleteProperty: function deleteProperty(target, propertyKey) {
    var desc = gOPD(anObject(target), propertyKey);
    return desc && !desc.configurable ? false : delete target[propertyKey];
  }
});

/***/ },
/* 235 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 26.1.5 Reflect.enumerate(target)

var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var Enumerate = function Enumerate(iterated) {
  this._t = anObject(iterated); // target
  this._i = 0; // next index
  var keys = this._k = []; // keys
  var key;
  for (key in iterated) {
    keys.push(key);
  }
};
__webpack_require__(76)(Enumerate, 'Object', function () {
  var that = this;
  var keys = that._k;
  var key;
  do {
    if (that._i >= keys.length) return { value: undefined, done: true };
  } while (!((key = keys[that._i++]) in that._t));
  return { value: key, done: false };
});

$export($export.S, 'Reflect', {
  enumerate: function enumerate(target) {
    return new Enumerate(target);
  }
});

/***/ },
/* 236 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.7 Reflect.getOwnPropertyDescriptor(target, propertyKey)
var gOPD = __webpack_require__(15);
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(target, propertyKey) {
    return gOPD.f(anObject(target), propertyKey);
  }
});

/***/ },
/* 237 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.8 Reflect.getPrototypeOf(target)
var $export = __webpack_require__(0);
var getProto = __webpack_require__(16);
var anObject = __webpack_require__(1);

$export($export.S, 'Reflect', {
  getPrototypeOf: function getPrototypeOf(target) {
    return getProto(anObject(target));
  }
});

/***/ },
/* 238 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.6 Reflect.get(target, propertyKey [, receiver])
var gOPD = __webpack_require__(15);
var getPrototypeOf = __webpack_require__(16);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var isObject = __webpack_require__(4);
var anObject = __webpack_require__(1);

function get(target, propertyKey /* , receiver */) {
  var receiver = arguments.length < 3 ? target : arguments[2];
  var desc, proto;
  if (anObject(target) === receiver) return target[propertyKey];
  if (desc = gOPD.f(target, propertyKey)) return has(desc, 'value') ? desc.value : desc.get !== undefined ? desc.get.call(receiver) : undefined;
  if (isObject(proto = getPrototypeOf(target))) return get(proto, propertyKey, receiver);
}

$export($export.S, 'Reflect', { get: get });

/***/ },
/* 239 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.9 Reflect.has(target, propertyKey)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', {
  has: function has(target, propertyKey) {
    return propertyKey in target;
  }
});

/***/ },
/* 240 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.10 Reflect.isExtensible(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $isExtensible = Object.isExtensible;

$export($export.S, 'Reflect', {
  isExtensible: function isExtensible(target) {
    anObject(target);
    return $isExtensible ? $isExtensible(target) : true;
  }
});

/***/ },
/* 241 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.11 Reflect.ownKeys(target)
var $export = __webpack_require__(0);

$export($export.S, 'Reflect', { ownKeys: __webpack_require__(116) });

/***/ },
/* 242 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.12 Reflect.preventExtensions(target)
var $export = __webpack_require__(0);
var anObject = __webpack_require__(1);
var $preventExtensions = Object.preventExtensions;

$export($export.S, 'Reflect', {
  preventExtensions: function preventExtensions(target) {
    anObject(target);
    try {
      if ($preventExtensions) $preventExtensions(target);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ },
/* 243 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.14 Reflect.setPrototypeOf(target, proto)
var $export = __webpack_require__(0);
var setProto = __webpack_require__(83);

if (setProto) $export($export.S, 'Reflect', {
  setPrototypeOf: function setPrototypeOf(target, proto) {
    setProto.check(target, proto);
    try {
      setProto.set(target, proto);
      return true;
    } catch (e) {
      return false;
    }
  }
});

/***/ },
/* 244 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// 26.1.13 Reflect.set(target, propertyKey, V [, receiver])
var dP = __webpack_require__(8);
var gOPD = __webpack_require__(15);
var getPrototypeOf = __webpack_require__(16);
var has = __webpack_require__(14);
var $export = __webpack_require__(0);
var createDesc = __webpack_require__(37);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);

function set(target, propertyKey, V /* , receiver */) {
  var receiver = arguments.length < 4 ? target : arguments[3];
  var ownDesc = gOPD.f(anObject(target), propertyKey);
  var existingDescriptor, proto;
  if (!ownDesc) {
    if (isObject(proto = getPrototypeOf(target))) {
      return set(proto, propertyKey, V, receiver);
    }
    ownDesc = createDesc(0);
  }
  if (has(ownDesc, 'value')) {
    if (ownDesc.writable === false || !isObject(receiver)) return false;
    if (existingDescriptor = gOPD.f(receiver, propertyKey)) {
      if (existingDescriptor.get || existingDescriptor.set || existingDescriptor.writable === false) return false;
      existingDescriptor.value = V;
      dP.f(receiver, propertyKey, existingDescriptor);
    } else dP.f(receiver, propertyKey, createDesc(0, V));
    return true;
  }
  return ownDesc.set === undefined ? false : (ownDesc.set.call(receiver, V), true);
}

$export($export.S, 'Reflect', { set: set });

/***/ },
/* 245 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var global = __webpack_require__(2);
var inheritIfRequired = __webpack_require__(74);
var dP = __webpack_require__(8).f;
var gOPN = __webpack_require__(35).f;
var isRegExp = __webpack_require__(56);
var $flags = __webpack_require__(47);
var $RegExp = global.RegExp;
var Base = $RegExp;
var proto = $RegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;
// "new" creates a new object, old webkit buggy here
var CORRECT_NEW = new $RegExp(re1) !== re1;

if (__webpack_require__(7) && (!CORRECT_NEW || __webpack_require__(3)(function () {
  re2[__webpack_require__(5)('match')] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return $RegExp(re1) != re1 || $RegExp(re2) == re2 || $RegExp(re1, 'i') != '/a/i';
}))) {
  $RegExp = function RegExp(p, f) {
    var tiRE = this instanceof $RegExp;
    var piRE = isRegExp(p);
    var fiU = f === undefined;
    return !tiRE && piRE && p.constructor === $RegExp && fiU ? p : inheritIfRequired(CORRECT_NEW ? new Base(piRE && !fiU ? p.source : p, f) : Base((piRE = p instanceof $RegExp) ? p.source : p, piRE && fiU ? $flags.call(p) : f), tiRE ? this : proto, $RegExp);
  };
  var proxy = function proxy(key) {
    key in $RegExp || dP($RegExp, key, {
      configurable: true,
      get: function get() {
        return Base[key];
      },
      set: function set(it) {
        Base[key] = it;
      }
    });
  };
  for (var keys = gOPN(Base), i = 0; keys.length > i;) {
    proxy(keys[i++]);
  }proto.constructor = $RegExp;
  $RegExp.prototype = proto;
  __webpack_require__(12)(global, 'RegExp', $RegExp);
}

__webpack_require__(39)('RegExp');

/***/ },
/* 246 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toLength = __webpack_require__(6);
var advanceStringIndex = __webpack_require__(66);
var regExpExec = __webpack_require__(60);

// @@match logic
__webpack_require__(54)('match', 1, function (defined, MATCH, $match, maybeCallNative) {
  return [
  // `String.prototype.match` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.match
  function match(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[MATCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
  },
  // `RegExp.prototype[@@match]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
  function (regexp) {
    var res = maybeCallNative($match, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    if (!rx.global) return regExpExec(rx, S);
    var fullUnicode = rx.unicode;
    rx.lastIndex = 0;
    var A = [];
    var n = 0;
    var result;
    while ((result = regExpExec(rx, S)) !== null) {
      var matchStr = String(result[0]);
      A[n] = matchStr;
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      n++;
    }
    return n === 0 ? null : A;
  }];
});

/***/ },
/* 247 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var toInteger = __webpack_require__(22);
var advanceStringIndex = __webpack_require__(66);
var regExpExec = __webpack_require__(60);
var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&`']|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&`']|\d\d?)/g;

var maybeToString = function maybeToString(it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
__webpack_require__(54)('replace', 2, function (defined, REPLACE, $replace, maybeCallNative) {
  return [
  // `String.prototype.replace` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.replace
  function replace(searchValue, replaceValue) {
    var O = defined(this);
    var fn = searchValue == undefined ? undefined : searchValue[REPLACE];
    return fn !== undefined ? fn.call(searchValue, O, replaceValue) : $replace.call(String(O), searchValue, replaceValue);
  },
  // `RegExp.prototype[@@replace]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
  function (regexp, replaceValue) {
    var res = maybeCallNative($replace, regexp, this, replaceValue);
    if (res.done) return res.value;

    var rx = anObject(regexp);
    var S = String(this);
    var functionalReplace = typeof replaceValue === 'function';
    if (!functionalReplace) replaceValue = String(replaceValue);
    var global = rx.global;
    if (global) {
      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
    }
    var results = [];
    while (true) {
      var result = regExpExec(rx, S);
      if (result === null) break;
      results.push(result);
      if (!global) break;
      var matchStr = String(result[0]);
      if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
    }
    var accumulatedResult = '';
    var nextSourcePosition = 0;
    for (var i = 0; i < results.length; i++) {
      result = results[i];
      var matched = String(result[0]);
      var position = max(min(toInteger(result.index), S.length), 0);
      var captures = [];
      // NOTE: This is equivalent to
      //   captures = result.slice(1).map(maybeToString)
      // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
      // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
      // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
      for (var j = 1; j < result.length; j++) {
        captures.push(maybeToString(result[j]));
      }var namedCaptures = result.groups;
      if (functionalReplace) {
        var replacerArgs = [matched].concat(captures, position, S);
        if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
        var replacement = String(replaceValue.apply(undefined, replacerArgs));
      } else {
        replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
      }
      if (position >= nextSourcePosition) {
        accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
        nextSourcePosition = position + matched.length;
      }
    }
    return accumulatedResult + S.slice(nextSourcePosition);
  }];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return $replace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$':
          return '$';
        case '&':
          return matched;
        case '`':
          return str.slice(0, position);
        case "'":
          return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default:
          // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});

/***/ },
/* 248 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var anObject = __webpack_require__(1);
var sameValue = __webpack_require__(121);
var regExpExec = __webpack_require__(60);

// @@search logic
__webpack_require__(54)('search', 1, function (defined, SEARCH, $search, maybeCallNative) {
  return [
  // `String.prototype.search` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.search
  function search(regexp) {
    var O = defined(this);
    var fn = regexp == undefined ? undefined : regexp[SEARCH];
    return fn !== undefined ? fn.call(regexp, O) : new RegExp(regexp)[SEARCH](String(O));
  },
  // `RegExp.prototype[@@search]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@search
  function (regexp) {
    var res = maybeCallNative($search, regexp, this);
    if (res.done) return res.value;
    var rx = anObject(regexp);
    var S = String(this);
    var previousLastIndex = rx.lastIndex;
    if (!sameValue(previousLastIndex, 0)) rx.lastIndex = 0;
    var result = regExpExec(rx, S);
    if (!sameValue(rx.lastIndex, previousLastIndex)) rx.lastIndex = previousLastIndex;
    return result === null ? -1 : result.index;
  }];
});

/***/ },
/* 249 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var isRegExp = __webpack_require__(56);
var anObject = __webpack_require__(1);
var speciesConstructor = __webpack_require__(51);
var advanceStringIndex = __webpack_require__(66);
var toLength = __webpack_require__(6);
var callRegExpExec = __webpack_require__(60);
var regexpExec = __webpack_require__(82);
var fails = __webpack_require__(3);
var $min = Math.min;
var $push = [].push;
var $SPLIT = 'split';
var LENGTH = 'length';
var LAST_INDEX = 'lastIndex';
var MAX_UINT32 = 0xffffffff;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () {
  RegExp(MAX_UINT32, 'y');
});

// @@split logic
__webpack_require__(54)('split', 2, function (defined, SPLIT, $split, maybeCallNative) {
  var internalSplit;
  if ('abbc'[$SPLIT](/(b)*/)[1] == 'c' || 'test'[$SPLIT](/(?:)/, -1)[LENGTH] != 4 || 'ab'[$SPLIT](/(?:ab)*/)[LENGTH] != 2 || '.'[$SPLIT](/(.?)(.?)/)[LENGTH] != 4 || '.'[$SPLIT](/()()/)[LENGTH] > 1 || ''[$SPLIT](/.?/)[LENGTH]) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function internalSplit(separator, limit) {
      var string = String(this);
      if (separator === undefined && limit === 0) return [];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) return $split.call(string, separator, limit);
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') + (separator.multiline ? 'm' : '') + (separator.unicode ? 'u' : '') + (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      var splitLimit = limit === undefined ? MAX_UINT32 : limit >>> 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy[LAST_INDEX];
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match[LENGTH] > 1 && match.index < string[LENGTH]) $push.apply(output, match.slice(1));
          lastLength = match[0][LENGTH];
          lastLastIndex = lastIndex;
          if (output[LENGTH] >= splitLimit) break;
        }
        if (separatorCopy[LAST_INDEX] === match.index) separatorCopy[LAST_INDEX]++; // Avoid an infinite loop
      }
      if (lastLastIndex === string[LENGTH]) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output[LENGTH] > splitLimit ? output.slice(0, splitLimit) : output;
    };
    // Chakra, V8
  } else if ('0'[$SPLIT](undefined, 0)[LENGTH]) {
    internalSplit = function internalSplit(separator, limit) {
      return separator === undefined && limit === 0 ? [] : $split.call(this, separator, limit);
    };
  } else {
    internalSplit = $split;
  }

  return [
  // `String.prototype.split` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.split
  function split(separator, limit) {
    var O = defined(this);
    var splitter = separator == undefined ? undefined : separator[SPLIT];
    return splitter !== undefined ? splitter.call(separator, O, limit) : internalSplit.call(String(O), separator, limit);
  },
  // `RegExp.prototype[@@split]` method
  // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
  //
  // NOTE: This cannot be properly polyfilled in engines that don't support
  // the 'y' flag.
  function (regexp, limit) {
    var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== $split);
    if (res.done) return res.value;

    var rx = anObject(regexp);
    var S = String(this);
    var C = speciesConstructor(rx, RegExp);

    var unicodeMatching = rx.unicode;
    var flags = (rx.ignoreCase ? 'i' : '') + (rx.multiline ? 'm' : '') + (rx.unicode ? 'u' : '') + (SUPPORTS_Y ? 'y' : 'g');

    // ^(? + rx + ) is needed, in combination with some S slicing, to
    // simulate the 'y' flag.
    var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
    var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
    if (lim === 0) return [];
    if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
    var p = 0;
    var q = 0;
    var A = [];
    while (q < S.length) {
      splitter.lastIndex = SUPPORTS_Y ? q : 0;
      var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
      var e;
      if (z === null || (e = $min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p) {
        q = advanceStringIndex(S, q, unicodeMatching);
      } else {
        A.push(S.slice(p, q));
        if (A.length === lim) return A;
        for (var i = 1; i <= z.length - 1; i++) {
          A.push(z[i]);
          if (A.length === lim) return A;
        }
        q = p = e;
      }
    }
    A.push(S.slice(p));
    return A;
  }];
});

/***/ },
/* 250 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(127);
var anObject = __webpack_require__(1);
var $flags = __webpack_require__(47);
var DESCRIPTORS = __webpack_require__(7);
var TO_STRING = 'toString';
var $toString = /./[TO_STRING];

var define = function define(fn) {
  __webpack_require__(12)(RegExp.prototype, TO_STRING, fn, true);
};

// 21.2.5.14 RegExp.prototype.toString()
if (__webpack_require__(3)(function () {
  return $toString.call({ source: 'a', flags: 'b' }) != '/a/b';
})) {
  define(function toString() {
    var R = anObject(this);
    return '/'.concat(R.source, '/', 'flags' in R ? R.flags : !DESCRIPTORS && R instanceof RegExp ? $flags.call(R) : undefined);
  });
  // FF44- RegExp#toString has a wrong name
} else if ($toString.name != TO_STRING) {
  define(function toString() {
    return $toString.call(this);
  });
}

/***/ },
/* 251 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.2 String.prototype.anchor(name)

__webpack_require__(13)('anchor', function (createHTML) {
  return function anchor(name) {
    return createHTML(this, 'a', 'name', name);
  };
});

/***/ },
/* 252 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.3 String.prototype.big()

__webpack_require__(13)('big', function (createHTML) {
  return function big() {
    return createHTML(this, 'big', '', '');
  };
});

/***/ },
/* 253 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.4 String.prototype.blink()

__webpack_require__(13)('blink', function (createHTML) {
  return function blink() {
    return createHTML(this, 'blink', '', '');
  };
});

/***/ },
/* 254 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.5 String.prototype.bold()

__webpack_require__(13)('bold', function (createHTML) {
  return function bold() {
    return createHTML(this, 'b', '', '');
  };
});

/***/ },
/* 255 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $at = __webpack_require__(63)(false);
$export($export.P, 'String', {
  // 21.1.3.3 String.prototype.codePointAt(pos)
  codePointAt: function codePointAt(pos) {
    return $at(this, pos);
  }
});

/***/ },
/* 256 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.6 String.prototype.endsWith(searchString [, endPosition])


var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(85);
var ENDS_WITH = 'endsWith';
var $endsWith = ''[ENDS_WITH];

$export($export.P + $export.F * __webpack_require__(72)(ENDS_WITH), 'String', {
  endsWith: function endsWith(searchString /* , endPosition = @length */) {
    var that = context(this, searchString, ENDS_WITH);
    var endPosition = arguments.length > 1 ? arguments[1] : undefined;
    var len = toLength(that.length);
    var end = endPosition === undefined ? len : Math.min(toLength(endPosition), len);
    var search = String(searchString);
    return $endsWith ? $endsWith.call(that, search, end) : that.slice(end - search.length, end) === search;
  }
});

/***/ },
/* 257 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.6 String.prototype.fixed()

__webpack_require__(13)('fixed', function (createHTML) {
  return function fixed() {
    return createHTML(this, 'tt', '', '');
  };
});

/***/ },
/* 258 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.7 String.prototype.fontcolor(color)

__webpack_require__(13)('fontcolor', function (createHTML) {
  return function fontcolor(color) {
    return createHTML(this, 'font', 'color', color);
  };
});

/***/ },
/* 259 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.8 String.prototype.fontsize(size)

__webpack_require__(13)('fontsize', function (createHTML) {
  return function fontsize(size) {
    return createHTML(this, 'font', 'size', size);
  };
});

/***/ },
/* 260 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toAbsoluteIndex = __webpack_require__(40);
var fromCharCode = String.fromCharCode;
var $fromCodePoint = String.fromCodePoint;

// length should be 1, old FF problem
$export($export.S + $export.F * (!!$fromCodePoint && $fromCodePoint.length != 1), 'String', {
  // 21.1.2.2 String.fromCodePoint(...codePoints)
  fromCodePoint: function fromCodePoint(x) {
    // eslint-disable-line no-unused-vars
    var res = [];
    var aLen = arguments.length;
    var i = 0;
    var code;
    while (aLen > i) {
      code = +arguments[i++];
      if (toAbsoluteIndex(code, 0x10ffff) !== code) throw RangeError(code + ' is not a valid code point');
      res.push(code < 0x10000 ? fromCharCode(code) : fromCharCode(((code -= 0x10000) >> 10) + 0xd800, code % 0x400 + 0xdc00));
    }return res.join('');
  }
});

/***/ },
/* 261 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.7 String.prototype.includes(searchString, position = 0)


var $export = __webpack_require__(0);
var context = __webpack_require__(85);
var INCLUDES = 'includes';

$export($export.P + $export.F * __webpack_require__(72)(INCLUDES), 'String', {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~context(this, searchString, INCLUDES).indexOf(searchString, arguments.length > 1 ? arguments[1] : undefined);
  }
});

/***/ },
/* 262 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.9 String.prototype.italics()

__webpack_require__(13)('italics', function (createHTML) {
  return function italics() {
    return createHTML(this, 'i', '', '');
  };
});

/***/ },
/* 263 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $at = __webpack_require__(63)(true);

// 21.1.3.27 String.prototype[@@iterator]()
__webpack_require__(77)(String, 'String', function (iterated) {
  this._t = String(iterated); // target
  this._i = 0; // next index
  // 21.1.5.2.1 %StringIteratorPrototype%.next()
}, function () {
  var O = this._t;
  var index = this._i;
  var point;
  if (index >= O.length) return { value: undefined, done: true };
  point = $at(O, index);
  this._i += point.length;
  return { value: point, done: false };
});

/***/ },
/* 264 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.10 String.prototype.link(url)

__webpack_require__(13)('link', function (createHTML) {
  return function link(url) {
    return createHTML(this, 'a', 'href', url);
  };
});

/***/ },
/* 265 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toIObject = __webpack_require__(17);
var toLength = __webpack_require__(6);

$export($export.S, 'String', {
  // 21.1.2.4 String.raw(callSite, ...substitutions)
  raw: function raw(callSite) {
    var tpl = toIObject(callSite.raw);
    var len = toLength(tpl.length);
    var aLen = arguments.length;
    var res = [];
    var i = 0;
    while (len > i) {
      res.push(String(tpl[i++]));
      if (i < aLen) res.push(String(arguments[i]));
    }return res.join('');
  }
});

/***/ },
/* 266 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);

$export($export.P, 'String', {
  // 21.1.3.13 String.prototype.repeat(count)
  repeat: __webpack_require__(86)
});

/***/ },
/* 267 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.11 String.prototype.small()

__webpack_require__(13)('small', function (createHTML) {
  return function small() {
    return createHTML(this, 'small', '', '');
  };
});

/***/ },
/* 268 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// 21.1.3.18 String.prototype.startsWith(searchString [, position ])


var $export = __webpack_require__(0);
var toLength = __webpack_require__(6);
var context = __webpack_require__(85);
var STARTS_WITH = 'startsWith';
var $startsWith = ''[STARTS_WITH];

$export($export.P + $export.F * __webpack_require__(72)(STARTS_WITH), 'String', {
  startsWith: function startsWith(searchString /* , position = 0 */) {
    var that = context(this, searchString, STARTS_WITH);
    var index = toLength(Math.min(arguments.length > 1 ? arguments[1] : undefined, that.length));
    var search = String(searchString);
    return $startsWith ? $startsWith.call(that, search, index) : that.slice(index, index + search.length) === search;
  }
});

/***/ },
/* 269 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.12 String.prototype.strike()

__webpack_require__(13)('strike', function (createHTML) {
  return function strike() {
    return createHTML(this, 'strike', '', '');
  };
});

/***/ },
/* 270 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.13 String.prototype.sub()

__webpack_require__(13)('sub', function (createHTML) {
  return function sub() {
    return createHTML(this, 'sub', '', '');
  };
});

/***/ },
/* 271 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// B.2.3.14 String.prototype.sup()

__webpack_require__(13)('sup', function (createHTML) {
  return function sup() {
    return createHTML(this, 'sup', '', '');
  };
});

/***/ },
/* 272 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// 21.1.3.25 String.prototype.trim()

__webpack_require__(46)('trim', function ($trim) {
  return function trim() {
    return $trim(this, 3);
  };
});

/***/ },
/* 273 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// ECMAScript 6 symbols shim

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var global = __webpack_require__(2);
var has = __webpack_require__(14);
var DESCRIPTORS = __webpack_require__(7);
var $export = __webpack_require__(0);
var redefine = __webpack_require__(12);
var META = __webpack_require__(31).KEY;
var $fails = __webpack_require__(3);
var shared = __webpack_require__(50);
var setToStringTag = __webpack_require__(45);
var uid = __webpack_require__(41);
var wks = __webpack_require__(5);
var wksExt = __webpack_require__(124);
var wksDefine = __webpack_require__(90);
var enumKeys = __webpack_require__(150);
var isArray = __webpack_require__(55);
var anObject = __webpack_require__(1);
var isObject = __webpack_require__(4);
var toIObject = __webpack_require__(17);
var toPrimitive = __webpack_require__(26);
var createDesc = __webpack_require__(37);
var _create = __webpack_require__(34);
var gOPNExt = __webpack_require__(113);
var $GOPD = __webpack_require__(15);
var $DP = __webpack_require__(8);
var $keys = __webpack_require__(36);
var gOPD = $GOPD.f;
var dP = $DP.f;
var gOPN = gOPNExt.f;
var $Symbol = global.Symbol;
var $JSON = global.JSON;
var _stringify = $JSON && $JSON.stringify;
var PROTOTYPE = 'prototype';
var HIDDEN = wks('_hidden');
var TO_PRIMITIVE = wks('toPrimitive');
var isEnum = {}.propertyIsEnumerable;
var SymbolRegistry = shared('symbol-registry');
var AllSymbols = shared('symbols');
var OPSymbols = shared('op-symbols');
var ObjectProto = Object[PROTOTYPE];
var USE_NATIVE = typeof $Symbol == 'function';
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var setter = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDesc = DESCRIPTORS && $fails(function () {
  return _create(dP({}, 'a', {
    get: function get() {
      return dP(this, 'a', { value: 7 }).a;
    }
  })).a != 7;
}) ? function (it, key, D) {
  var protoDesc = gOPD(ObjectProto, key);
  if (protoDesc) delete ObjectProto[key];
  dP(it, key, D);
  if (protoDesc && it !== ObjectProto) dP(ObjectProto, key, protoDesc);
} : dP;

var wrap = function wrap(tag) {
  var sym = AllSymbols[tag] = _create($Symbol[PROTOTYPE]);
  sym._k = tag;
  return sym;
};

var isSymbol = USE_NATIVE && _typeof($Symbol.iterator) == 'symbol' ? function (it) {
  return (typeof it === 'undefined' ? 'undefined' : _typeof(it)) == 'symbol';
} : function (it) {
  return it instanceof $Symbol;
};

var $defineProperty = function defineProperty(it, key, D) {
  if (it === ObjectProto) $defineProperty(OPSymbols, key, D);
  anObject(it);
  key = toPrimitive(key, true);
  anObject(D);
  if (has(AllSymbols, key)) {
    if (!D.enumerable) {
      if (!has(it, HIDDEN)) dP(it, HIDDEN, createDesc(1, {}));
      it[HIDDEN][key] = true;
    } else {
      if (has(it, HIDDEN) && it[HIDDEN][key]) it[HIDDEN][key] = false;
      D = _create(D, { enumerable: createDesc(0, false) });
    }return setSymbolDesc(it, key, D);
  }return dP(it, key, D);
};
var $defineProperties = function defineProperties(it, P) {
  anObject(it);
  var keys = enumKeys(P = toIObject(P));
  var i = 0;
  var l = keys.length;
  var key;
  while (l > i) {
    $defineProperty(it, key = keys[i++], P[key]);
  }return it;
};
var $create = function create(it, P) {
  return P === undefined ? _create(it) : $defineProperties(_create(it), P);
};
var $propertyIsEnumerable = function propertyIsEnumerable(key) {
  var E = isEnum.call(this, key = toPrimitive(key, true));
  if (this === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return false;
  return E || !has(this, key) || !has(AllSymbols, key) || has(this, HIDDEN) && this[HIDDEN][key] ? E : true;
};
var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(it, key) {
  it = toIObject(it);
  key = toPrimitive(key, true);
  if (it === ObjectProto && has(AllSymbols, key) && !has(OPSymbols, key)) return;
  var D = gOPD(it, key);
  if (D && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) D.enumerable = true;
  return D;
};
var $getOwnPropertyNames = function getOwnPropertyNames(it) {
  var names = gOPN(toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (!has(AllSymbols, key = names[i++]) && key != HIDDEN && key != META) result.push(key);
  }return result;
};
var $getOwnPropertySymbols = function getOwnPropertySymbols(it) {
  var IS_OP = it === ObjectProto;
  var names = gOPN(IS_OP ? OPSymbols : toIObject(it));
  var result = [];
  var i = 0;
  var key;
  while (names.length > i) {
    if (has(AllSymbols, key = names[i++]) && (IS_OP ? has(ObjectProto, key) : true)) result.push(AllSymbols[key]);
  }return result;
};

// 19.4.1.1 Symbol([description])
if (!USE_NATIVE) {
  $Symbol = function _Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor!');
    var tag = uid(arguments.length > 0 ? arguments[0] : undefined);
    var $set = function $set(value) {
      if (this === ObjectProto) $set.call(OPSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDesc(this, tag, createDesc(1, value));
    };
    if (DESCRIPTORS && setter) setSymbolDesc(ObjectProto, tag, { configurable: true, set: $set });
    return wrap(tag);
  };
  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return this._k;
  });

  $GOPD.f = $getOwnPropertyDescriptor;
  $DP.f = $defineProperty;
  __webpack_require__(35).f = gOPNExt.f = $getOwnPropertyNames;
  __webpack_require__(49).f = $propertyIsEnumerable;
  __webpack_require__(59).f = $getOwnPropertySymbols;

  if (DESCRIPTORS && !__webpack_require__(30)) {
    redefine(ObjectProto, 'propertyIsEnumerable', $propertyIsEnumerable, true);
  }

  wksExt.f = function (name) {
    return wrap(wks(name));
  };
}

$export($export.G + $export.W + $export.F * !USE_NATIVE, { Symbol: $Symbol });

for (var es6Symbols =
// 19.4.2.2, 19.4.2.3, 19.4.2.4, 19.4.2.6, 19.4.2.8, 19.4.2.9, 19.4.2.10, 19.4.2.11, 19.4.2.12, 19.4.2.13, 19.4.2.14
'hasInstance,isConcatSpreadable,iterator,match,replace,search,species,split,toPrimitive,toStringTag,unscopables'.split(','), j = 0; es6Symbols.length > j;) {
  wks(es6Symbols[j++]);
}for (var wellKnownSymbols = $keys(wks.store), k = 0; wellKnownSymbols.length > k;) {
  wksDefine(wellKnownSymbols[k++]);
}$export($export.S + $export.F * !USE_NATIVE, 'Symbol', {
  // 19.4.2.1 Symbol.for(key)
  'for': function _for(key) {
    return has(SymbolRegistry, key += '') ? SymbolRegistry[key] : SymbolRegistry[key] = $Symbol(key);
  },
  // 19.4.2.5 Symbol.keyFor(sym)
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol!');
    for (var key in SymbolRegistry) {
      if (SymbolRegistry[key] === sym) return key;
    }
  },
  useSetter: function useSetter() {
    setter = true;
  },
  useSimple: function useSimple() {
    setter = false;
  }
});

$export($export.S + $export.F * !USE_NATIVE, 'Object', {
  // 19.1.2.2 Object.create(O [, Properties])
  create: $create,
  // 19.1.2.4 Object.defineProperty(O, P, Attributes)
  defineProperty: $defineProperty,
  // 19.1.2.3 Object.defineProperties(O, Properties)
  defineProperties: $defineProperties,
  // 19.1.2.6 Object.getOwnPropertyDescriptor(O, P)
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor,
  // 19.1.2.7 Object.getOwnPropertyNames(O)
  getOwnPropertyNames: $getOwnPropertyNames,
  // 19.1.2.8 Object.getOwnPropertySymbols(O)
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// 24.3.2 JSON.stringify(value [, replacer [, space]])
$JSON && $export($export.S + $export.F * (!USE_NATIVE || $fails(function () {
  var S = $Symbol();
  // MS Edge converts symbol values to JSON as {}
  // WebKit converts symbol values to JSON as null
  // V8 throws on boxed symbols
  return _stringify([S]) != '[null]' || _stringify({ a: S }) != '{}' || _stringify(Object(S)) != '{}';
})), 'JSON', {
  stringify: function stringify(it) {
    var args = [it];
    var i = 1;
    var replacer, $replacer;
    while (arguments.length > i) {
      args.push(arguments[i++]);
    }$replacer = replacer = args[1];
    if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
    if (!isArray(replacer)) replacer = function replacer(key, value) {
      if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
      if (!isSymbol(value)) return value;
    };
    args[1] = replacer;
    return _stringify.apply($JSON, args);
  }
});

// 19.4.3.4 Symbol.prototype[@@toPrimitive](hint)
$Symbol[PROTOTYPE][TO_PRIMITIVE] || __webpack_require__(11)($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
// 19.4.3.5 Symbol.prototype[@@toStringTag]
setToStringTag($Symbol, 'Symbol');
// 20.2.1.9 Math[@@toStringTag]
setToStringTag(Math, 'Math', true);
// 24.3.3 JSON[@@toStringTag]
setToStringTag(global.JSON, 'JSON', true);

/***/ },
/* 274 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $typed = __webpack_require__(64);
var buffer = __webpack_require__(89);
var anObject = __webpack_require__(1);
var toAbsoluteIndex = __webpack_require__(40);
var toLength = __webpack_require__(6);
var isObject = __webpack_require__(4);
var ArrayBuffer = __webpack_require__(2).ArrayBuffer;
var speciesConstructor = __webpack_require__(51);
var $ArrayBuffer = buffer.ArrayBuffer;
var $DataView = buffer.DataView;
var $isView = $typed.ABV && ArrayBuffer.isView;
var $slice = $ArrayBuffer.prototype.slice;
var VIEW = $typed.VIEW;
var ARRAY_BUFFER = 'ArrayBuffer';

$export($export.G + $export.W + $export.F * (ArrayBuffer !== $ArrayBuffer), { ArrayBuffer: $ArrayBuffer });

$export($export.S + $export.F * !$typed.CONSTR, ARRAY_BUFFER, {
  // 24.1.3.1 ArrayBuffer.isView(arg)
  isView: function isView(it) {
    return $isView && $isView(it) || isObject(it) && VIEW in it;
  }
});

$export($export.P + $export.U + $export.F * __webpack_require__(3)(function () {
  return !new $ArrayBuffer(2).slice(1, undefined).byteLength;
}), ARRAY_BUFFER, {
  // 24.1.4.3 ArrayBuffer.prototype.slice(start, end)
  slice: function slice(start, end) {
    if ($slice !== undefined && end === undefined) return $slice.call(anObject(this), start); // FF fix
    var len = anObject(this).byteLength;
    var first = toAbsoluteIndex(start, len);
    var fin = toAbsoluteIndex(end === undefined ? len : end, len);
    var result = new (speciesConstructor(this, $ArrayBuffer))(toLength(fin - first));
    var viewS = new $DataView(this);
    var viewT = new $DataView(result);
    var index = 0;
    while (first < fin) {
      viewT.setUint8(index++, viewS.getUint8(first++));
    }return result;
  }
});

__webpack_require__(39)(ARRAY_BUFFER);

/***/ },
/* 275 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
$export($export.G + $export.W + $export.F * !__webpack_require__(64).ABV, {
  DataView: __webpack_require__(89).DataView
});

/***/ },
/* 276 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Float32', 4, function (init) {
  return function Float32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ },
/* 277 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Float64', 8, function (init) {
  return function Float64Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ },
/* 278 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Int16', 2, function (init) {
  return function Int16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ },
/* 279 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Int32', 4, function (init) {
  return function Int32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ },
/* 280 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Int8', 1, function (init) {
  return function Int8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ },
/* 281 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Uint16', 2, function (init) {
  return function Uint16Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ },
/* 282 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Uint32', 4, function (init) {
  return function Uint32Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ },
/* 283 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Uint8', 1, function (init) {
  return function Uint8Array(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
});

/***/ },
/* 284 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(28)('Uint8', 1, function (init) {
  return function Uint8ClampedArray(data, byteOffset, length) {
    return init(this, data, byteOffset, length);
  };
}, true);

/***/ },
/* 285 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var weak = __webpack_require__(101);
var validate = __webpack_require__(42);
var WEAK_SET = 'WeakSet';

// 23.4 WeakSet Objects
__webpack_require__(53)(WEAK_SET, function (get) {
  return function WeakSet() {
    return get(this, arguments.length > 0 ? arguments[0] : undefined);
  };
}, {
  // 23.4.3.1 WeakSet.prototype.add(value)
  add: function add(value) {
    return weak.def(validate(this, WEAK_SET), value, true);
  }
}, weak, false, true);

/***/ },
/* 286 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatMap

var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(102);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var aFunction = __webpack_require__(10);
var arraySpeciesCreate = __webpack_require__(68);

$export($export.P, 'Array', {
  flatMap: function flatMap(callbackfn /* , thisArg */) {
    var O = toObject(this);
    var sourceLen, A;
    aFunction(callbackfn);
    sourceLen = toLength(O.length);
    A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, 1, callbackfn, arguments[1]);
    return A;
  }
});

__webpack_require__(29)('flatMap');

/***/ },
/* 287 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/proposal-flatMap/#sec-Array.prototype.flatten

var $export = __webpack_require__(0);
var flattenIntoArray = __webpack_require__(102);
var toObject = __webpack_require__(9);
var toLength = __webpack_require__(6);
var toInteger = __webpack_require__(22);
var arraySpeciesCreate = __webpack_require__(68);

$export($export.P, 'Array', {
  flatten: function flatten() /* depthArg = 1 */{
    var depthArg = arguments[0];
    var O = toObject(this);
    var sourceLen = toLength(O.length);
    var A = arraySpeciesCreate(O, 0);
    flattenIntoArray(A, O, O, sourceLen, 0, depthArg === undefined ? 1 : toInteger(depthArg));
    return A;
  }
});

__webpack_require__(29)('flatten');

/***/ },
/* 288 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/Array.prototype.includes

var $export = __webpack_require__(0);
var $includes = __webpack_require__(52)(true);

$export($export.P, 'Array', {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

__webpack_require__(29)('includes');

/***/ },
/* 289 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/rwaldron/tc39-notes/blob/master/es6/2014-09/sept-25.md#510-globalasap-for-enqueuing-a-microtask
var $export = __webpack_require__(0);
var microtask = __webpack_require__(80)();
var process = __webpack_require__(2).process;
var isNode = __webpack_require__(18)(process) == 'process';

$export($export.G, {
  asap: function asap(fn) {
    var domain = isNode && process.domain;
    microtask(domain ? domain.bind(fn) : fn);
  }
});

/***/ },
/* 290 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/ljharb/proposal-is-error
var $export = __webpack_require__(0);
var cof = __webpack_require__(18);

$export($export.S, 'Error', {
  isError: function isError(it) {
    return cof(it) === 'Error';
  }
});

/***/ },
/* 291 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.G, { global: __webpack_require__(2) });

/***/ },
/* 292 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-map.from
__webpack_require__(61)('Map');

/***/ },
/* 293 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-map.of
__webpack_require__(62)('Map');

/***/ },
/* 294 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Map', { toJSON: __webpack_require__(100)('Map') });

/***/ },
/* 295 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  clamp: function clamp(x, lower, upper) {
    return Math.min(upper, Math.max(lower, x));
  }
});

/***/ },
/* 296 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { DEG_PER_RAD: Math.PI / 180 });

/***/ },
/* 297 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var RAD_PER_DEG = 180 / Math.PI;

$export($export.S, 'Math', {
  degrees: function degrees(radians) {
    return radians * RAD_PER_DEG;
  }
});

/***/ },
/* 298 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var scale = __webpack_require__(110);
var fround = __webpack_require__(108);

$export($export.S, 'Math', {
  fscale: function fscale(x, inLow, inHigh, outLow, outHigh) {
    return fround(scale(x, inLow, inHigh, outLow, outHigh));
  }
});

/***/ },
/* 299 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  iaddh: function iaddh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 + (y1 >>> 0) + (($x0 & $y0 | ($x0 | $y0) & ~($x0 + $y0 >>> 0)) >>> 31) | 0;
  }
});

/***/ },
/* 300 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  imulh: function imulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >> 16;
    var v1 = $v >> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >> 16);
  }
});

/***/ },
/* 301 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  isubh: function isubh(x0, x1, y0, y1) {
    var $x0 = x0 >>> 0;
    var $x1 = x1 >>> 0;
    var $y0 = y0 >>> 0;
    return $x1 - (y1 >>> 0) - ((~$x0 & $y0 | ~($x0 ^ $y0) & $x0 - $y0 >>> 0) >>> 31) | 0;
  }
});

/***/ },
/* 302 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { RAD_PER_DEG: 180 / Math.PI });

/***/ },
/* 303 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);
var DEG_PER_RAD = Math.PI / 180;

$export($export.S, 'Math', {
  radians: function radians(degrees) {
    return degrees * DEG_PER_RAD;
  }
});

/***/ },
/* 304 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://rwaldron.github.io/proposal-math-extensions/
var $export = __webpack_require__(0);

$export($export.S, 'Math', { scale: __webpack_require__(110) });

/***/ },
/* 305 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// http://jfbastien.github.io/papers/Math.signbit.html
var $export = __webpack_require__(0);

$export($export.S, 'Math', { signbit: function signbit(x) {
    // eslint-disable-next-line no-self-compare
    return (x = +x) != x ? x : x == 0 ? 1 / x == Infinity : x > 0;
  } });

/***/ },
/* 306 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://gist.github.com/BrendanEich/4294d5c212a6d2254703
var $export = __webpack_require__(0);

$export($export.S, 'Math', {
  umulh: function umulh(u, v) {
    var UINT16 = 0xffff;
    var $u = +u;
    var $v = +v;
    var u0 = $u & UINT16;
    var v0 = $v & UINT16;
    var u1 = $u >>> 16;
    var v1 = $v >>> 16;
    var t = (u1 * v0 >>> 0) + (u0 * v0 >>> 16);
    return u1 * v1 + (t >>> 16) + ((u0 * v1 >>> 0) + (t & UINT16) >>> 16);
  }
});

/***/ },
/* 307 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(8);

// B.2.2.2 Object.prototype.__defineGetter__(P, getter)
__webpack_require__(7) && $export($export.P + __webpack_require__(58), 'Object', {
  __defineGetter__: function __defineGetter__(P, getter) {
    $defineProperty.f(toObject(this), P, { get: aFunction(getter), enumerable: true, configurable: true });
  }
});

/***/ },
/* 308 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var aFunction = __webpack_require__(10);
var $defineProperty = __webpack_require__(8);

// B.2.2.3 Object.prototype.__defineSetter__(P, setter)
__webpack_require__(7) && $export($export.P + __webpack_require__(58), 'Object', {
  __defineSetter__: function __defineSetter__(P, setter) {
    $defineProperty.f(toObject(this), P, { set: aFunction(setter), enumerable: true, configurable: true });
  }
});

/***/ },
/* 309 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $entries = __webpack_require__(115)(true);

$export($export.S, 'Object', {
  entries: function entries(it) {
    return $entries(it);
  }
});

/***/ },
/* 310 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-getownpropertydescriptors
var $export = __webpack_require__(0);
var ownKeys = __webpack_require__(116);
var toIObject = __webpack_require__(17);
var gOPD = __webpack_require__(15);
var createProperty = __webpack_require__(69);

$export($export.S, 'Object', {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIObject(object);
    var getDesc = gOPD.f;
    var keys = ownKeys(O);
    var result = {};
    var i = 0;
    var key, desc;
    while (keys.length > i) {
      desc = getDesc(O, key = keys[i++]);
      if (desc !== undefined) createProperty(result, key, desc);
    }
    return result;
  }
});

/***/ },
/* 311 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(16);
var getOwnPropertyDescriptor = __webpack_require__(15).f;

// B.2.2.4 Object.prototype.__lookupGetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(58), 'Object', {
  __lookupGetter__: function __lookupGetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.get;
    } while (O = getPrototypeOf(O));
  }
});

/***/ },
/* 312 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var toObject = __webpack_require__(9);
var toPrimitive = __webpack_require__(26);
var getPrototypeOf = __webpack_require__(16);
var getOwnPropertyDescriptor = __webpack_require__(15).f;

// B.2.2.5 Object.prototype.__lookupSetter__(P)
__webpack_require__(7) && $export($export.P + __webpack_require__(58), 'Object', {
  __lookupSetter__: function __lookupSetter__(P) {
    var O = toObject(this);
    var K = toPrimitive(P, true);
    var D;
    do {
      if (D = getOwnPropertyDescriptor(O, K)) return D.set;
    } while (O = getPrototypeOf(O));
  }
});

/***/ },
/* 313 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-object-values-entries
var $export = __webpack_require__(0);
var $values = __webpack_require__(115)(false);

$export($export.S, 'Object', {
  values: function values(it) {
    return $values(it);
  }
});

/***/ },
/* 314 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/zenparsing/es-observable

var $export = __webpack_require__(0);
var global = __webpack_require__(2);
var core = __webpack_require__(19);
var microtask = __webpack_require__(80)();
var OBSERVABLE = __webpack_require__(5)('observable');
var aFunction = __webpack_require__(10);
var anObject = __webpack_require__(1);
var anInstance = __webpack_require__(32);
var redefineAll = __webpack_require__(38);
var hide = __webpack_require__(11);
var forOf = __webpack_require__(33);
var RETURN = forOf.RETURN;

var getMethod = function getMethod(fn) {
  return fn == null ? undefined : aFunction(fn);
};

var cleanupSubscription = function cleanupSubscription(subscription) {
  var cleanup = subscription._c;
  if (cleanup) {
    subscription._c = undefined;
    cleanup();
  }
};

var subscriptionClosed = function subscriptionClosed(subscription) {
  return subscription._o === undefined;
};

var closeSubscription = function closeSubscription(subscription) {
  if (!subscriptionClosed(subscription)) {
    subscription._o = undefined;
    cleanupSubscription(subscription);
  }
};

var Subscription = function Subscription(observer, subscriber) {
  anObject(observer);
  this._c = undefined;
  this._o = observer;
  observer = new SubscriptionObserver(this);
  try {
    var cleanup = subscriber(observer);
    var subscription = cleanup;
    if (cleanup != null) {
      if (typeof cleanup.unsubscribe === 'function') cleanup = function cleanup() {
        subscription.unsubscribe();
      };else aFunction(cleanup);
      this._c = cleanup;
    }
  } catch (e) {
    observer.error(e);
    return;
  }if (subscriptionClosed(this)) cleanupSubscription(this);
};

Subscription.prototype = redefineAll({}, {
  unsubscribe: function unsubscribe() {
    closeSubscription(this);
  }
});

var SubscriptionObserver = function SubscriptionObserver(subscription) {
  this._s = subscription;
};

SubscriptionObserver.prototype = redefineAll({}, {
  next: function next(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      try {
        var m = getMethod(observer.next);
        if (m) return m.call(observer, value);
      } catch (e) {
        try {
          closeSubscription(subscription);
        } finally {
          throw e;
        }
      }
    }
  },
  error: function error(value) {
    var subscription = this._s;
    if (subscriptionClosed(subscription)) throw value;
    var observer = subscription._o;
    subscription._o = undefined;
    try {
      var m = getMethod(observer.error);
      if (!m) throw value;
      value = m.call(observer, value);
    } catch (e) {
      try {
        cleanupSubscription(subscription);
      } finally {
        throw e;
      }
    }cleanupSubscription(subscription);
    return value;
  },
  complete: function complete(value) {
    var subscription = this._s;
    if (!subscriptionClosed(subscription)) {
      var observer = subscription._o;
      subscription._o = undefined;
      try {
        var m = getMethod(observer.complete);
        value = m ? m.call(observer, value) : undefined;
      } catch (e) {
        try {
          cleanupSubscription(subscription);
        } finally {
          throw e;
        }
      }cleanupSubscription(subscription);
      return value;
    }
  }
});

var $Observable = function Observable(subscriber) {
  anInstance(this, $Observable, 'Observable', '_f')._f = aFunction(subscriber);
};

redefineAll($Observable.prototype, {
  subscribe: function subscribe(observer) {
    return new Subscription(observer, this._f);
  },
  forEach: function forEach(fn) {
    var that = this;
    return new (core.Promise || global.Promise)(function (resolve, reject) {
      aFunction(fn);
      var subscription = that.subscribe({
        next: function next(value) {
          try {
            return fn(value);
          } catch (e) {
            reject(e);
            subscription.unsubscribe();
          }
        },
        error: reject,
        complete: resolve
      });
    });
  }
});

redefineAll($Observable, {
  from: function from(x) {
    var C = typeof this === 'function' ? this : $Observable;
    var method = getMethod(anObject(x)[OBSERVABLE]);
    if (method) {
      var observable = anObject(method.call(x));
      return observable.constructor === C ? observable : new C(function (observer) {
        return observable.subscribe(observer);
      });
    }
    return new C(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          try {
            if (forOf(x, false, function (it) {
              observer.next(it);
              if (done) return RETURN;
            }) === RETURN) return;
          } catch (e) {
            if (done) throw e;
            observer.error(e);
            return;
          }observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  },
  of: function of() {
    for (var i = 0, l = arguments.length, items = new Array(l); i < l;) {
      items[i] = arguments[i++];
    }return new (typeof this === 'function' ? this : $Observable)(function (observer) {
      var done = false;
      microtask(function () {
        if (!done) {
          for (var j = 0; j < items.length; ++j) {
            observer.next(items[j]);
            if (done) return;
          }observer.complete();
        }
      });
      return function () {
        done = true;
      };
    });
  }
});

hide($Observable.prototype, OBSERVABLE, function () {
  return this;
});

$export($export.G, { Observable: $Observable });

__webpack_require__(39)('Observable');

/***/ },
/* 315 */
/***/ function(module, exports, __webpack_require__) {

"use strict";
// https://github.com/tc39/proposal-promise-finally


var $export = __webpack_require__(0);
var core = __webpack_require__(19);
var global = __webpack_require__(2);
var speciesConstructor = __webpack_require__(51);
var promiseResolve = __webpack_require__(120);

$export($export.P + $export.R, 'Promise', { 'finally': function _finally(onFinally) {
    var C = speciesConstructor(this, core.Promise || global.Promise);
    var isFunction = typeof onFinally == 'function';
    return this.then(isFunction ? function (x) {
      return promiseResolve(C, onFinally()).then(function () {
        return x;
      });
    } : onFinally, isFunction ? function (e) {
      return promiseResolve(C, onFinally()).then(function () {
        throw e;
      });
    } : onFinally);
  } });

/***/ },
/* 316 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-promise-try

var $export = __webpack_require__(0);
var newPromiseCapability = __webpack_require__(81);
var perform = __webpack_require__(119);

$export($export.S, 'Promise', { 'try': function _try(callbackfn) {
    var promiseCapability = newPromiseCapability.f(this);
    var result = perform(callbackfn);
    (result.e ? promiseCapability.reject : promiseCapability.resolve)(result.v);
    return promiseCapability.promise;
  } });

/***/ },
/* 317 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var ordinaryDefineOwnMetadata = metadata.set;

metadata.exp({ defineMetadata: function defineMetadata(metadataKey, metadataValue, target, targetKey) {
    ordinaryDefineOwnMetadata(metadataKey, metadataValue, anObject(target), toMetaKey(targetKey));
  } });

/***/ },
/* 318 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var toMetaKey = metadata.key;
var getOrCreateMetadataMap = metadata.map;
var store = metadata.store;

metadata.exp({ deleteMetadata: function deleteMetadata(metadataKey, target /* , targetKey */) {
    var targetKey = arguments.length < 3 ? undefined : toMetaKey(arguments[2]);
    var metadataMap = getOrCreateMetadataMap(anObject(target), targetKey, false);
    if (metadataMap === undefined || !metadataMap['delete'](metadataKey)) return false;
    if (metadataMap.size) return true;
    var targetMetadata = store.get(target);
    targetMetadata['delete'](targetKey);
    return !!targetMetadata.size || store['delete'](target);
  } });

/***/ },
/* 319 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var Set = __webpack_require__(128);
var from = __webpack_require__(96);
var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(16);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

var ordinaryMetadataKeys = function ordinaryMetadataKeys(O, P) {
  var oKeys = ordinaryOwnMetadataKeys(O, P);
  var parent = getPrototypeOf(O);
  if (parent === null) return oKeys;
  var pKeys = ordinaryMetadataKeys(parent, P);
  return pKeys.length ? oKeys.length ? from(new Set(oKeys.concat(pKeys))) : pKeys : oKeys;
};

metadata.exp({ getMetadataKeys: function getMetadataKeys(target /* , targetKey */) {
    return ordinaryMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
  } });

/***/ },
/* 320 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(16);
var ordinaryHasOwnMetadata = metadata.has;
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

var ordinaryGetMetadata = function ordinaryGetMetadata(MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return ordinaryGetOwnMetadata(MetadataKey, O, P);
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryGetMetadata(MetadataKey, parent, P) : undefined;
};

metadata.exp({ getMetadata: function getMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryGetMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ },
/* 321 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var ordinaryOwnMetadataKeys = metadata.keys;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadataKeys: function getOwnMetadataKeys(target /* , targetKey */) {
    return ordinaryOwnMetadataKeys(anObject(target), arguments.length < 2 ? undefined : toMetaKey(arguments[1]));
  } });

/***/ },
/* 322 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var ordinaryGetOwnMetadata = metadata.get;
var toMetaKey = metadata.key;

metadata.exp({ getOwnMetadata: function getOwnMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryGetOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ },
/* 323 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var getPrototypeOf = __webpack_require__(16);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

var ordinaryHasMetadata = function ordinaryHasMetadata(MetadataKey, O, P) {
  var hasOwn = ordinaryHasOwnMetadata(MetadataKey, O, P);
  if (hasOwn) return true;
  var parent = getPrototypeOf(O);
  return parent !== null ? ordinaryHasMetadata(MetadataKey, parent, P) : false;
};

metadata.exp({ hasMetadata: function hasMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryHasMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ },
/* 324 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var ordinaryHasOwnMetadata = metadata.has;
var toMetaKey = metadata.key;

metadata.exp({ hasOwnMetadata: function hasOwnMetadata(metadataKey, target /* , targetKey */) {
    return ordinaryHasOwnMetadata(metadataKey, anObject(target), arguments.length < 3 ? undefined : toMetaKey(arguments[2]));
  } });

/***/ },
/* 325 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $metadata = __webpack_require__(27);
var anObject = __webpack_require__(1);
var aFunction = __webpack_require__(10);
var toMetaKey = $metadata.key;
var ordinaryDefineOwnMetadata = $metadata.set;

$metadata.exp({ metadata: function metadata(metadataKey, metadataValue) {
    return function decorator(target, targetKey) {
      ordinaryDefineOwnMetadata(metadataKey, metadataValue, (targetKey !== undefined ? anObject : aFunction)(target), toMetaKey(targetKey));
    };
  } });

/***/ },
/* 326 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-set.from
__webpack_require__(61)('Set');

/***/ },
/* 327 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-set.of
__webpack_require__(62)('Set');

/***/ },
/* 328 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/DavidBruant/Map-Set.prototype.toJSON
var $export = __webpack_require__(0);

$export($export.P + $export.R, 'Set', { toJSON: __webpack_require__(100)('Set') });

/***/ },
/* 329 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/mathiasbynens/String.prototype.at

var $export = __webpack_require__(0);
var $at = __webpack_require__(63)(true);

$export($export.P, 'String', {
  at: function at(pos) {
    return $at(this, pos);
  }
});

/***/ },
/* 330 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://tc39.github.io/String.prototype.matchAll/

var $export = __webpack_require__(0);
var defined = __webpack_require__(24);
var toLength = __webpack_require__(6);
var isRegExp = __webpack_require__(56);
var getFlags = __webpack_require__(47);
var RegExpProto = RegExp.prototype;

var $RegExpStringIterator = function $RegExpStringIterator(regexp, string) {
  this._r = regexp;
  this._s = string;
};

__webpack_require__(76)($RegExpStringIterator, 'RegExp String', function next() {
  var match = this._r.exec(this._s);
  return { value: match, done: match === null };
});

$export($export.P, 'String', {
  matchAll: function matchAll(regexp) {
    defined(this);
    if (!isRegExp(regexp)) throw TypeError(regexp + ' is not a regexp!');
    var S = String(this);
    var flags = 'flags' in RegExpProto ? String(regexp.flags) : getFlags.call(regexp);
    var rx = new RegExp(regexp.source, ~flags.indexOf('g') ? flags : 'g' + flags);
    rx.lastIndex = toLength(regexp.lastIndex);
    return new $RegExpStringIterator(rx, S);
  }
});

/***/ },
/* 331 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(0);
var $pad = __webpack_require__(122);
var userAgent = __webpack_require__(65);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padEnd: function padEnd(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, false);
  }
});

/***/ },
/* 332 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/tc39/proposal-string-pad-start-end

var $export = __webpack_require__(0);
var $pad = __webpack_require__(122);
var userAgent = __webpack_require__(65);

// https://github.com/zloirock/core-js/issues/280
var WEBKIT_BUG = /Version\/10\.\d+(\.\d+)?( Mobile\/\w+)? Safari\//.test(userAgent);

$export($export.P + $export.F * WEBKIT_BUG, 'String', {
  padStart: function padStart(maxLength /* , fillString = ' ' */) {
    return $pad(this, maxLength, arguments.length > 1 ? arguments[1] : undefined, true);
  }
});

/***/ },
/* 333 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

__webpack_require__(46)('trimLeft', function ($trim) {
  return function trimLeft() {
    return $trim(this, 1);
  };
}, 'trimStart');

/***/ },
/* 334 */
/***/ function(module, exports, __webpack_require__) {

"use strict";

// https://github.com/sebmarkbage/ecmascript-string-left-right-trim

__webpack_require__(46)('trimRight', function ($trim) {
  return function trimRight() {
    return $trim(this, 2);
  };
}, 'trimEnd');

/***/ },
/* 335 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(90)('asyncIterator');

/***/ },
/* 336 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(90)('observable');

/***/ },
/* 337 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://github.com/tc39/proposal-global
var $export = __webpack_require__(0);

$export($export.S, 'System', { global: __webpack_require__(2) });

/***/ },
/* 338 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.from
__webpack_require__(61)('WeakMap');

/***/ },
/* 339 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakmap.of
__webpack_require__(62)('WeakMap');

/***/ },
/* 340 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.from
__webpack_require__(61)('WeakSet');

/***/ },
/* 341 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// https://tc39.github.io/proposal-setmap-offrom/#sec-weakset.of
__webpack_require__(62)('WeakSet');

/***/ },
/* 342 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $iterators = __webpack_require__(92);
var getKeys = __webpack_require__(36);
var redefine = __webpack_require__(12);
var global = __webpack_require__(2);
var hide = __webpack_require__(11);
var Iterators = __webpack_require__(44);
var wks = __webpack_require__(5);
var ITERATOR = wks('iterator');
var TO_STRING_TAG = wks('toStringTag');
var ArrayValues = Iterators.Array;

var DOMIterables = {
  CSSRuleList: true, // TODO: Not spec compliant, should be false.
  CSSStyleDeclaration: false,
  CSSValueList: false,
  ClientRectList: false,
  DOMRectList: false,
  DOMStringList: false,
  DOMTokenList: true,
  DataTransferItemList: false,
  FileList: false,
  HTMLAllCollection: false,
  HTMLCollection: false,
  HTMLFormElement: false,
  HTMLSelectElement: false,
  MediaList: true, // TODO: Not spec compliant, should be false.
  MimeTypeArray: false,
  NamedNodeMap: false,
  NodeList: true,
  PaintRequestList: false,
  Plugin: false,
  PluginArray: false,
  SVGLengthList: false,
  SVGNumberList: false,
  SVGPathSegList: false,
  SVGPointList: false,
  SVGStringList: false,
  SVGTransformList: false,
  SourceBufferList: false,
  StyleSheetList: true, // TODO: Not spec compliant, should be false.
  TextTrackCueList: false,
  TextTrackList: false,
  TouchList: false
};

for (var collections = getKeys(DOMIterables), i = 0; i < collections.length; i++) {
  var NAME = collections[i];
  var explicit = DOMIterables[NAME];
  var Collection = global[NAME];
  var proto = Collection && Collection.prototype;
  var key;
  if (proto) {
    if (!proto[ITERATOR]) hide(proto, ITERATOR, ArrayValues);
    if (!proto[TO_STRING_TAG]) hide(proto, TO_STRING_TAG, NAME);
    Iterators[NAME] = ArrayValues;
    if (explicit) for (key in $iterators) {
      if (!proto[key]) redefine(proto, key, $iterators[key], true);
    }
  }
}

/***/ },
/* 343 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


var $export = __webpack_require__(0);
var $task = __webpack_require__(88);
$export($export.G + $export.B, {
  setImmediate: $task.set,
  clearImmediate: $task.clear
});

/***/ },
/* 344 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


// ie9- setTimeout & setInterval additional parameters fix
var global = __webpack_require__(2);
var $export = __webpack_require__(0);
var userAgent = __webpack_require__(65);
var slice = [].slice;
var MSIE = /MSIE .\./.test(userAgent); // <- dirty ie9- check
var wrap = function wrap(set) {
  return function (fn, time /* , ...args */) {
    var boundArgs = arguments.length > 2;
    var args = boundArgs ? slice.call(arguments, 2) : false;
    return set(boundArgs ? function () {
      // eslint-disable-next-line no-new-func
      (typeof fn == 'function' ? fn : Function(fn)).apply(this, args);
    } : fn, time);
  };
};
$export($export.G + $export.B + $export.F * MSIE, {
  setTimeout: wrap(global.setTimeout),
  setInterval: wrap(global.setInterval)
});

/***/ },
/* 345 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(273);
__webpack_require__(212);
__webpack_require__(214);
__webpack_require__(213);
__webpack_require__(216);
__webpack_require__(218);
__webpack_require__(223);
__webpack_require__(217);
__webpack_require__(215);
__webpack_require__(225);
__webpack_require__(224);
__webpack_require__(220);
__webpack_require__(221);
__webpack_require__(219);
__webpack_require__(211);
__webpack_require__(222);
__webpack_require__(226);
__webpack_require__(227);
__webpack_require__(179);
__webpack_require__(181);
__webpack_require__(180);
__webpack_require__(229);
__webpack_require__(228);
__webpack_require__(199);
__webpack_require__(209);
__webpack_require__(210);
__webpack_require__(200);
__webpack_require__(201);
__webpack_require__(202);
__webpack_require__(203);
__webpack_require__(204);
__webpack_require__(205);
__webpack_require__(206);
__webpack_require__(207);
__webpack_require__(208);
__webpack_require__(182);
__webpack_require__(183);
__webpack_require__(184);
__webpack_require__(185);
__webpack_require__(186);
__webpack_require__(187);
__webpack_require__(188);
__webpack_require__(189);
__webpack_require__(190);
__webpack_require__(191);
__webpack_require__(192);
__webpack_require__(193);
__webpack_require__(194);
__webpack_require__(195);
__webpack_require__(196);
__webpack_require__(197);
__webpack_require__(198);
__webpack_require__(260);
__webpack_require__(265);
__webpack_require__(272);
__webpack_require__(263);
__webpack_require__(255);
__webpack_require__(256);
__webpack_require__(261);
__webpack_require__(266);
__webpack_require__(268);
__webpack_require__(251);
__webpack_require__(252);
__webpack_require__(253);
__webpack_require__(254);
__webpack_require__(257);
__webpack_require__(258);
__webpack_require__(259);
__webpack_require__(262);
__webpack_require__(264);
__webpack_require__(267);
__webpack_require__(269);
__webpack_require__(270);
__webpack_require__(271);
__webpack_require__(174);
__webpack_require__(176);
__webpack_require__(175);
__webpack_require__(178);
__webpack_require__(177);
__webpack_require__(163);
__webpack_require__(161);
__webpack_require__(167);
__webpack_require__(164);
__webpack_require__(170);
__webpack_require__(172);
__webpack_require__(160);
__webpack_require__(166);
__webpack_require__(157);
__webpack_require__(171);
__webpack_require__(155);
__webpack_require__(169);
__webpack_require__(168);
__webpack_require__(162);
__webpack_require__(165);
__webpack_require__(154);
__webpack_require__(156);
__webpack_require__(159);
__webpack_require__(158);
__webpack_require__(173);
__webpack_require__(92);
__webpack_require__(245);
__webpack_require__(126);
__webpack_require__(250);
__webpack_require__(127);
__webpack_require__(246);
__webpack_require__(247);
__webpack_require__(248);
__webpack_require__(249);
__webpack_require__(230);
__webpack_require__(125);
__webpack_require__(128);
__webpack_require__(129);
__webpack_require__(285);
__webpack_require__(274);
__webpack_require__(275);
__webpack_require__(280);
__webpack_require__(283);
__webpack_require__(284);
__webpack_require__(278);
__webpack_require__(281);
__webpack_require__(279);
__webpack_require__(282);
__webpack_require__(276);
__webpack_require__(277);
__webpack_require__(231);
__webpack_require__(232);
__webpack_require__(233);
__webpack_require__(234);
__webpack_require__(235);
__webpack_require__(238);
__webpack_require__(236);
__webpack_require__(237);
__webpack_require__(239);
__webpack_require__(240);
__webpack_require__(241);
__webpack_require__(242);
__webpack_require__(244);
__webpack_require__(243);
__webpack_require__(288);
__webpack_require__(286);
__webpack_require__(287);
__webpack_require__(329);
__webpack_require__(332);
__webpack_require__(331);
__webpack_require__(333);
__webpack_require__(334);
__webpack_require__(330);
__webpack_require__(335);
__webpack_require__(336);
__webpack_require__(310);
__webpack_require__(313);
__webpack_require__(309);
__webpack_require__(307);
__webpack_require__(308);
__webpack_require__(311);
__webpack_require__(312);
__webpack_require__(294);
__webpack_require__(328);
__webpack_require__(293);
__webpack_require__(327);
__webpack_require__(339);
__webpack_require__(341);
__webpack_require__(292);
__webpack_require__(326);
__webpack_require__(338);
__webpack_require__(340);
__webpack_require__(291);
__webpack_require__(337);
__webpack_require__(290);
__webpack_require__(295);
__webpack_require__(296);
__webpack_require__(297);
__webpack_require__(298);
__webpack_require__(299);
__webpack_require__(301);
__webpack_require__(300);
__webpack_require__(302);
__webpack_require__(303);
__webpack_require__(304);
__webpack_require__(306);
__webpack_require__(305);
__webpack_require__(315);
__webpack_require__(316);
__webpack_require__(317);
__webpack_require__(318);
__webpack_require__(320);
__webpack_require__(319);
__webpack_require__(322);
__webpack_require__(321);
__webpack_require__(323);
__webpack_require__(324);
__webpack_require__(325);
__webpack_require__(289);
__webpack_require__(314);
__webpack_require__(344);
__webpack_require__(343);
__webpack_require__(342);
module.exports = __webpack_require__(19);

/***/ },
/* 346 */
/***/ function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (module) {
	if (!module.webpackPolyfill) {
		module.deprecate = function () {};
		module.paths = [];
		// module.parent = undefined by default
		if (!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			configurable: false,
			get: function get() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			configurable: false,
			get: function get() {
				return module.i;
			}
		});
		module.webpackPolyfill = 1;
	}
	return module;
};

/***/ },
/* 347 */
/***/ function(module, exports, __webpack_require__) {

__webpack_require__(93);
module.exports = __webpack_require__(131);


/***/ }
/******/ ]);