import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import 'element-ui/lib/theme-chalk/display.css'
import './plugins/element.js'
import router from './router'
import axios from 'axios'
import store from './store/index.js'
import starRating from 'vue-star-rating'

Vue.use(ElementUI);

new Vue({
    router,
    axios,
    store,
    render: h => h(App)
}).$mount('#app')
