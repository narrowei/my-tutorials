import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element.js'
import router from './router'
import Vuelidate from 'vuelidate'
import axios from 'axios'

Vue.config.productionTip = false

Vue.use(ElementUI);
Vue.use(Vuelidate);

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
