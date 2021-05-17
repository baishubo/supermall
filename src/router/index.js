import Vue from 'vue'
import VueRouter from 'vue-router'

const Cart = () => import(/* webpackChunkName: "group-foo" */ '@/views/cart/cart.vue')
const Category = () => import(/* webpackChunkName: "group-foo" */ '@/views/category/category.vue')
const Home = () => import(/* webpackChunkName: "group-foo" */ '@/views/home/home.vue')
const Profile = () => import(/* webpackChunkName: "group-foo" */ '@/views/profile/profile.vue')
const Detail = () => import(/* webpackChunkName: "group-foo" */ '@/views/detail/Detail.vue')
//注册插件
Vue.use(VueRouter);
//创建实例
const routes=[
  { path: '', redirect: '/home' },
  {
    path: '/home',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'category',
    component: Category
  },
  {
    path: '/Cart',
    name: 'cart',
    component: Cart
  },
  {
    path: '/Profile',
    name: 'crofile',
    component: Profile
  },
  {
    path: '/detail/:id',
    name: 'detail',
    component: Detail
  }
]
const router = new VueRouter({
  routes,
  mode: 'history'
})
export default router