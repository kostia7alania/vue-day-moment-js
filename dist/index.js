/*!
 * vue-day-moment-js v0.0.8
 * (c) Kostia Bazrov
 * Released under the MIT License.
 */
'use strict';

var dayjs = require('dayjs');

function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

var dayjs__default = /*#__PURE__*/_interopDefaultLegacy(dayjs);

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function (obj) {
      return typeof obj;
    };
  } else {
    _typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function _objectWithoutProperties(source, excluded) {
  if (source == null) return {};

  var target = _objectWithoutPropertiesLoose(source, excluded);

  var key, i;

  if (Object.getOwnPropertySymbols) {
    var sourceSymbolKeys = Object.getOwnPropertySymbols(source);

    for (i = 0; i < sourceSymbolKeys.length; i++) {
      key = sourceSymbolKeys[i];
      if (excluded.indexOf(key) >= 0) continue;
      if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue;
      target[key] = source[key];
    }
  }

  return target;
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray(arr);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
}

function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}

function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

  return arr2;
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

var relativeTime = require("dayjs/plugin/relativeTime");

var utc = require("dayjs/plugin/utc");

dayjs__default['default'].extend(utc);
dayjs__default['default'].extend(relativeTime);
var VueDayJS = {}; // https://ru.vuejs.org/v2/guide/plugins.html

VueDayJS.install = function (Vue) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  // https://www.telerik.com/blogs/vuejs-how-to-build-your-first-package-publish-it-on-npm
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  // Vue.component("nice-handsome-button", NiceHandsomeButton);
  var defaults = {
    placeholder: "-",
    fallbackToDateNow: false,
    format: "DD.MM.YYYY, HH:mm",
    directives: ["moment", "dayjs"],
    filters: ["moment", "dayjs"],
    methods: ["$moment", "$dayjs"]
  }; // проставляем параметры по-умолчанию

  Object.entries(defaults).forEach(function (_ref) {
    var _ref2 = _slicedToArray(_ref, 2),
        key = _ref2[0],
        val = _ref2[1];

    if (!options[key]) options[key] = val;
  }); // 1. добавление глобального метода или свойства

  /* Vue.myGlobalMethod = function() {
    console.log(options)
  } */
  // директива

  var directiveCallback = {
    // https://ru.vuejs.org/v2/guide/custom-directive.html
    bind: function bind(el, binding
    /* , vnode, oldVnode */
    ) {
      var value = binding.value;
      var res = "";
      var format = options.format;

      var _ref3 = Object.entries(binding.modifiers).find(function (_ref5) {
        var _ref6 = _slicedToArray(_ref5, 1),
            key = _ref6[0];

        return options.modifiers[key];
      }) || [],
          _ref4 = _slicedToArray(_ref3, 1),
          formatKey = _ref4[0];

      if (formatKey) format = options.modifiers[formatKey];

      if (_typeof(value) === "object" && value !== null) {
        var date = value.date;
        format = value.format || format;
        res = dayjs__default['default'](date);
      } else if (typeof value === "string") {
        res = dayjs__default['default'](value);
      }

      var toEl = res && res.isValid() ? res.format(format) : options.placeholder;
      el.innerText = toEl;
    }
  }; // метод

  var methodCallback = function methodCallback(date) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    if (!date && !options.fallbackToDateNow) return options.placeholder;
    var res = dayjs__default['default'](date);
    var format = typeof opts === "string" ? opts : opts.format || options.format;

    if (["add", "subtract"].includes(format)) {
      // https://day.js.org/docs/en/manipulate/add
      var count = opts.count,
          unit = opts.unit; // https://day.js.org/docs/en/manipulate/subtract#docsNav

      res[format](count, unit);
    } else if (format === "diff") {
      // https://day.js.org/docs/en/display/difference#docsNav
      if (res.isValid()) {
        var _res;

        var date2 = opts.date2,
            _unit = opts.unit,
            other = _objectWithoutProperties(opts, ["date2", "unit"]);

        res = (_res = res).diff.apply(_res, [date2, _unit].concat(_toConsumableArray(other)));
      }
    }

    if (res.isValid()) {
      return Object.assign({}, res, {
        toString: function toString() {
          return res.format(format);
        }
      });
    }

    return options.placeholder;
  };

  Object.assign(methodCallback, dayjs__default['default']);
  methodCallback.prototype = dayjs__default['default'].prototype;
  methodCallback.prototype.original = dayjs__default['default']; // фильтр

  var filterCallback = methodCallback; // 2. добавление глобального объекта

  options.directives.forEach(function (directive) {
    return Vue.directive(directive, directiveCallback);
  }); // 3. добавление опций компонентов

  var filters = options.filters.reduce(function (acc, key) {
    return Object.assign({}, acc, _defineProperty({}, key, filterCallback));
  }, {});
  Vue.mixin({
    filters: filters
  }); // 4. добавление метода экземпляра

  options.methods.forEach(function (key) {
    return Vue.prototype[key] = methodCallback;
  });
};

/*
// USAGE EXAMPLE
import Vue from "vue";

Vue.use(VueDayJS, {
  placeholder: "-----",
  format: "DD.MM.YYYY, HH:mm",
  directives: ["moment", "dayjs"],
  methods: ["$moment", "$dayjs"],
  modifiers: {
    time: "HH:mm",
    date: "DD.MM.YYYY",
    datetime: "DD.MM.YYYY, HH:mm",
  },
});

export default Vue.prototype[methods[0]];
*/

module.exports = VueDayJS;
