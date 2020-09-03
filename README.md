## Install
```
yarn add vue-day-moment-js
```

`@/setups/moment.js`

```
import Vue from Vue
import VueDayMomentJS from 'vue-day-moment-js'

const opions = {

  // show this if date is invalid
  placeholder: '-----', 
  
  // global default format
  format: 'DD.MM.YYYY, HH:mm', 
  
  // inject aliases. Example: if ['moment', 'dayjs'] then we can use  <span v-moment> or <span v-dayjs>
  directives: ['moment', 'dayjs'], 
  
  // inject directive modifiers with specified date format. E.g. <span v-moment.time>
  modifiers: { 
    time: 'HH:mm',
    date: 'DD.MM.YYYY', 
    datetime: 'DD.MM.YYYY, HH:mm',
  },
  
}

Vue.use(VueDayMomentJS, options) 

return Vue.prototype.moment // or Vue.prototype.dayjs
```

`@/main.js`
```
import '@/setups/moment'
```


# How to use 

### Directives

```
<span v-moment="props.row.created"></span>
<span v-moment="{ date: props.row.created }"></span>
<span v-moment.time="{ date: props.row.created, format: 'YYYY-MM-DD' }"></span>
<span v-moment.date="{ date: props.row.created }"></span>
<span v-moment.datetime="{ date: props.row.created }"></span>
```

### Filters

##### Format

```
{{ props.row.modified | moment('DD.MM.YYYY, HH:mm') }} 
```
Result: `02.09.2020, 14:16`
```
{{ props.row.modified | moment }}
```
Result: `02.09.2020, 14:16`

Depends on:
1) global settings
2) default - 'DD.MM.YYYY, HH:mm'

##### Add
```
<span>{{ props.row.modified | moment('add', 1, 'day') }}</span>
```
##### Subtract
```
<span>{{ props.row.modified | moment('subtract', 1, 'day') }}</span>
```

#### Methods
```
this.$dayjs().format('YYYY-MM-DD HH:mm:ss');
this.moment() // default format - depends on def-config
```
### Wrong date
```
<span>{{ 'wrong date' | moment }}</span>
```
Result: `-----`

Specified in placeholder

