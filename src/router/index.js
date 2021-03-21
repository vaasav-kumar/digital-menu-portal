import Vue from 'vue'
import Router from 'vue-router'
import firebase from 'firebase/app'
import 'firebase/analytics'

import Signup from '../pages/Signup'
import Login from '../pages/Login'
import Home from '../pages/Home'
import Manage from '../pages/Manage'

Vue.use(Router)

let router = new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: Home, meta: { title: 'Home' } },
    { path: '/manage_items', name: 'Manage', component: Manage, meta: { title: 'Manage Items' } },
    { path: '/signup', name: 'Signup', component: Signup, meta: { title: 'Sign up' } },
    { path: '/login', name: 'Login', component: Login, meta: { title: 'Login' } }
  ]
})

const publicRoutes = ['Login', 'Signup']
router.beforeEach((to, from, next) => {
  document.title = 'Digimenu Portal - ' + to.meta.title
  const UID = localStorage.getItem('user_id')
  if (publicRoutes.includes(to.name)) {
    if (UID) {
      next({name: 'Home'})
    }
  } else {
    if (!UID) {
      next({name: 'Login'})
    }
  }
  next()
})

router.afterEach((to, from) => {
  firebase.analytics().logEvent('enter_page', {from: 'Portal - ' + from.meta.title, to: 'Portal - ' + to.meta.title})
})

export default router
