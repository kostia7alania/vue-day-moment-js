# How to use


```
import Vue from Vue
import VueDayMomentJS from 'vue-day-moment-js'

Vue.use(VueDayMomentJS, {
  placeholder: '-----',
  format: 'DD.MM.YYYY, HH:mm',
  directives: ['moment', 'dayjs'],
  modifiers: {
    time: 'HH:mm',
    date: 'DD.MM.YYYY',
    datetime: 'DD.MM.YYYY, HH:mm',
  },
}) 

return Vue.prototype.moment // or Vue.prototype.dayjs
```
