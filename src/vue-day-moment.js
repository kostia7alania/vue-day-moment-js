/* eslint-disable no-shadow */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */

import dayjs from "dayjs";

const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

const VueDayJS = {};

VueDayJS.prototype = dayjs.prototype;

// https://ru.vuejs.org/v2/guide/plugins.html
VueDayJS.install = function (Vue, options = {}) {
  // https://www.telerik.com/blogs/vuejs-how-to-build-your-first-package-publish-it-on-npm
  // Let's register our component globally
  // https://vuejs.org/v2/guide/components-registration.html
  // Vue.component("nice-handsome-button", NiceHandsomeButton);

  const defaults = {
    placeholder: "-",
    format: "DD.MM.YYYY, HH:mm",
    directives: ["moment", "dayjs"],
    filters: ["moment", "dayjs"],
    methods: ["$moment", "$dayjs"],
  };

  // проставляем параметры по-умолчанию
  Object.entries(defaults).forEach(([key, val]) => {
    if (!options[key]) options[key] = val;
  });

  // 1. добавление глобального метода или свойства
  /* Vue.myGlobalMethod = function() {
    console.log(options)
  } */
  // директива
  const directiveCallback = {
    // https://ru.vuejs.org/v2/guide/custom-directive.html
    bind(el, binding /* , vnode, oldVnode */) {
      const { value } = binding;
      let res = "";
      let { format } = options;
      const [formatKey] =
        Object.entries(binding.modifiers).find(
          ([key]) => options.modifiers[key]
        ) || [];
      if (formatKey) format = options.modifiers[formatKey];

      if (typeof value === "object" && value !== null) {
        const { date } = value;
        format = value.format || format;
        res = dayjs(date);
      } else if (typeof value === "string") {
        res = dayjs(value);
      }

      const toEl =
        res && res.isValid() ? res.format(format) : options.placeholder;
      el.innerText = toEl;
    },
  };

  // метод
  const methodCallback = (date, opts = {}) => {
    let res = dayjs(date);

    const format =
      typeof opts == "string" ? opts : opts.format || options.format;

    if (["add", "subtract"].includes(format)) {
      // https://day.js.org/docs/en/manipulate/add
      const { count, unit } = opts; // https://day.js.org/docs/en/manipulate/subtract#docsNav
      res[format](count, unit);
    } else if (format === "diff") {
      // https://day.js.org/docs/en/display/difference#docsNav
      if (res.isValid()) {
        const { date2, unit, ...other } = opts;
        res = res.diff(date2, unit, ...other);
      }
    }

    if (res.isValid()) {
      return format ? res.format(format) : res;
    }
    return options.placeholder;
  };

  // фильтр
  const filterCallback = methodCallback;

  // 2. добавление глобального объекта
  options.directives.forEach((directive) =>
    Vue.directive(directive, directiveCallback)
  );

  // 3. добавление опций компонентов
  const filters = options.filters.reduce(
    (acc, key) => ({ ...acc, [key]: filterCallback }),
    {}
  );
  Vue.mixin({
    filters,
  });

  // 4. добавление метода экземпляра
  options.methods.forEach((key) => (Vue.prototype[key] = methodCallback));
};

export default VueDayJS;
