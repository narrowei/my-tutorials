import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import router from './router'
import Vuelidate from 'vuelidate'
import axios from 'axios'
//import qs from 'qs'

Vue.use(ElementUI);
Vue.use(Vuelidate);

axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
Vue.prototype.$axios = axios;
/*Vue.config.productionTip = false
axios.interceptors.request.use((config) => {
    config.data = qs.stringify(config.data);
    return config;
}, function(error) {
    return Promise.reject(error);
});*/

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
