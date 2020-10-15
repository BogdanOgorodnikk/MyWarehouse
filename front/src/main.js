import Vue from 'vue'
import Vuelidate from 'vuelidate'
import vuexpersistedstate from 'vuex-persistedstate'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

Vue.config.productionTip = false

Vue.use(Vuelidate)
Vue.use(vuexpersistedstate)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
