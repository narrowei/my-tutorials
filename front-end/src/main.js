import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import router from './router'
import axios from 'axios'
import store from './store/index.js'

Vue.use(ElementUI);

// Vue.prototype.$axios = axios;


new Vue({
    router,
    axios,
    store,
    render: h => h(App)
}).$mount('#app')
