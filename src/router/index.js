import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/history',
    name: 'Hisotry',
    component: () => import('../views/history.vue')
  },
  {
    path: '/history/articles/:index',
    name: 'Articles',
    component: () => import('../views/articles.vue')
  },
  {
    path: '/about-church',
    name: 'church',
    component: () => import('../views/church.vue')
  },
  {
    path: '/about-fukada',
    name: 'fukada',
    component: () => import('../views/fukada.vue')
  },
  {
    path: '/about-dendosho',
    name: 'dendosho',
    component: () => import('../views/dendosho.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
