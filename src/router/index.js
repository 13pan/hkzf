import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '@/views/Layout/Layout.vue'
import City from '@/views/City/City.vue'
const Home = () => import('@/views/Home/Home.vue')
const Quest = () => import('@/views/Question/Question.vue')
const Search = () => import('@/views/Search/Search.vue')
const My = () => import('@/views/My/My.vue')
const Login = () => import('@/views/Login/Login.vue')
const DetailFace = () => import('@/views/Detail/Detail.vue')
const Lease = () => import('@/views/Lease/Lease.vue')
const Map = () => import('@/views/Map/Map.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      { path: 'home', component: Home },
      {
        path: 'search',
        component: Search,
        name: 'search'
      },
      { path: 'question', component: Quest },
      { path: 'my', component: My }
    ]
  },
  { path: '/detail', component: DetailFace },
  { path: '/city', component: City },
  { path: '/login', component: Login },
  { path: '/lease', component: Lease },
  { path: '/map', component: Map }

]

const router = new VueRouter({
  routes
})

export default router
