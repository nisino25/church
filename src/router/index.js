import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'


const routes = [
  // {
  //   path: '/:catchAll(.*)',
  //   name: 'maintenance',
  //   component: () => import('../views/maintenance.vue')
  // },
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/:catchAll(.*)',
    // name: 'PageNotFound',
    component: () => import('../views/PageNotFound.vue')
  },
  {
    path: '/history',
    name: 'Hisotry',
    component: () => import('../views/history.vue')
  },
  // {
  //   path: '/history/articles/:index',
  //   name: 'Articles',
  //   component: () => import('../views/articles.vue')
  // },
  {
    path: '/about-church',
    name: 'church',
    component: () => import('../views/church.vue')
  },
  {
    path: '/access',
    name: 'access',
    component: () => import('../views/access.vue')
  },
  // {
  //   path: '/schedule',
  //   name: 'shcedule',
  //   component: () => import('../views/schedule.vue')
  // },
  {
    path: '/test',
    name: 'test',
    component: () => import('../views/test.vue')
  },
  // {
  //   path: '/schedule/edit',
  //   name: 'shceduleEdit',
  //   component: () => import('../views/scheduleEdit.vue')
  // },
  // {
  //   path: '/about-fukada',
  //   name: 'fukada',
  //   component: () => import('../views/fukada.vue')
  // },
  // {
  //   path: '/about-fukada/articles/:index',
  //   name: 'fukada-articles',
  //   component: () => import('../views/fukada-articles.vue')
  // },
  {
    path: '/about-dendosho',
    name: 'dendosho',
    component: () => import('../views/dendosho.vue')
  },

  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/register',
    name: 'register',
    component: () => import('../views/register.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue')
  },
  {
    path: '/edit',
    name: 'edit',
    component: () => import('../views/edit.vue')
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
