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
## USAGE
```
<span v-moment="props.row.created"></span>
<span v-moment="{ date: props.row.created }"></span>
<span v-moment.time="{ date: props.row.created, format: 'YYYY-MM-DD' }"></span>
<span v-moment.date="{ date: props.row.created }"></span>
<span v-moment.datetime="{ date: props.row.created }"></span>
```
