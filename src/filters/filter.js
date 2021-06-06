import Vue from 'vue'
import format from'date-fns/format'

Vue.filter('dateFormat', function (value ) {
    return format(value, 'MM-dd')
});