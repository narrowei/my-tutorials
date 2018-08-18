import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import ElementUI from 'element-ui';
import router from './router'

Vue.config.productionTip = false

Vue.use(ElementUI);
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
