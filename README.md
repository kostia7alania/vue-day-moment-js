## Install
```
yarn add vue-day-moment-js
```

# How to use

#### Install

`@/setups/moment`

```
import Vue from Vue
import VueDayMomentJS from 'vue-day-moment-js'

const opions = {
  placeholder: '-----',
  format: 'DD.MM.YYYY, HH:mm',
  directives: ['moment', 'dayjs'], // inject aliases
  modifiers: { // inject directive modifiers with specified format
    time: 'HH:mm',
    date: 'DD.MM.YYYY', 
    datetime: 'DD.MM.YYYY, HH:mm',
  },
}

Vue.use(VueDayMomentJS, options) 

return Vue.prototype.moment // or Vue.prototype.dayjs
```
## USAGE

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

