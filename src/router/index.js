import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/employee',
    name: 'Employee',
    component: () => import('../views/Employee.vue')
  },
  {
    path: '/env-variable',
    name: 'EnvVariable',
    component:() => import('../views/EnvVariable.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
