import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import Home from '../views/Home.vue'
import AboutApp from '../views/About.vue'
import FormApp from '../views/Form.vue'
import WatchersApp from '../views/Watchers.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: AboutApp
  },
  {
    path: '/form',
    name: 'Form',
    component: FormApp
  },
  {
    path: '/watchers',
    name: 'Watchers',
    component: WatchersApp
  }
  // {
  //   path: '/about-lazy',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
