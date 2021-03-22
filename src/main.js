import Vue from 'vue'
import App from './App.vue'
import router from './router'
import VueMq from 'vue-mq'
import store from '@/store'
import { MdField, MdButton, MdRadio, MdCheckbox } from 'vue-material/dist/components'

import 'vue-material/dist/vue-material.min.css'
import 'vue-material/dist/theme/default.css'
// import '@fortawesome/fontawesome-free/css/all.min.css'

import './assets/scss/index.scss'
import './assets/scss/utils.scss'

import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/analytics'

const firebaseConfig = {
  apiKey: 'AIzaSyBxJa6whnookijG8wST8fLnbQ_gemqs9vI',
  authDomain: 'digital-menu-44bb9.firebaseapp.com',
  projectId: 'digital-menu-44bb9',
  databaseURL: 'https://digital-menu-44bb9-default-rtdb.firebaseio.com',
  storageBucket: 'digital-menu-44bb9.appspot.com',
  messagingSenderId: '579050242937',
  appId: '1:579050242937:web:8eaacf833b463eb32825a8',
  measurementId: 'G-FEWBBPSQF6'
}
firebase.initializeApp(firebaseConfig)

Vue.prototype.$auth = firebase.auth()
Vue.prototype.$db = firebase.firestore()
Vue.prototype.$analytics = firebase.analytics()

Vue.use(VueMq, {
  breakpoints: {
    mobile: 520,
    tablet: 720,
    desktop: Infinity
  },
  defaultBreakpoint: 'desktop'
})

Vue.use(MdField)
Vue.use(MdButton)
Vue.use(MdRadio)
Vue.use(MdCheckbox)

new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
