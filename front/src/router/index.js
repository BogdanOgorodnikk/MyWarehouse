import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta: {layout: 'main'},
    component: () => import('../views/Home.vue'),
  },
  {
    path: '/createwarehouse',
    name: 'Createwahouse',
    meta: {layout: 'main'},
    component: () => import('../views/Createwarehouse.vue')
  },
  {
    path: '/myorder',
    name: 'MyOrder',
    meta: {layout: 'main'},
    component: () => import('../views/MyOrder.vue')
  },
  {
    path: '/myaccount',
    name: 'MyAccount',
    meta: {layout: 'main'},
    component: () => import('../views/MyAccount.vue')
  },
  {
    path: '/profit',
    name: 'Profit',
    meta: {layout: 'main'},
    component: () => import('../views/Profit.vue')
  },
  {
    path: '/allusers',
    name: 'AllUsers',
    meta: {layout: 'main'},
    component: () => import('../views/AllUsers.vue')
  },
  {
    path: '/warehouse/:url',
    name: 'Town',
    meta: {layout: 'main'},
    component: () => import('../views/Town.vue'),
    props: true
  },
  {
    path: '/signup',
    name: 'SignUp',
    meta: {layout: 'empty'},
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/signin',
    name: 'SignIn',
    meta: {layout: 'empty'},
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/404',
    name: '404',
    meta: {layout: 'empty'},
    component: () => import('../views/404.vue')
  },
  { path: '*',
   redirect: "/404" 
  }
]



const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
