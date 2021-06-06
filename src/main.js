import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {Button} from 'mint-ui'
import VueLazyload from 'vue-lazyload'
import './mock/MockServer.js'
import loading from './common/imgs/loading.gif'
Vue.use(VueLazyload, {
    loading
});
Vue.component(Button.name, Button)
new Vue({
    el: '#app',
    render: h => h(App),
    router,
    store
})
