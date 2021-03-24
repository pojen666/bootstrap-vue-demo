import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from './axios'
import VueAxios from 'vue-axios'
import Vuelidate from 'vuelidate'
import Vuex from 'vuex'
import { store } from './store'


Vue.use(Vuex)
Vue.use(Vuelidate)
Vue.use(BootstrapVue)
Vue.use(VueAxios, axios)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
