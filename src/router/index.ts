import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'Home',
    meta: {
      title: '首页'
    },
    component: () => import('@/views/home/index.vue')
  },
  {
    path: '/category',
    name: 'Category',
    meta: {
      title: '分类'
    },
    component: () => import('@/views/category/index.vue')
  },
  {
    path: '/cart',
    name: 'Cart',
    meta: {
      title: '购物车'
    },
    component: () => import('@/views/cart/index.vue')
  },
  {
    path: '/mine',
    name: 'Mine',
    meta: {
      title: '我的'
    },
    component: () => import('@/views/mine/index.vue')
  },
  {
    path: '/productDetail/:code',
    name: 'ProductDetail',
    meta: {
      title: '商品详情'
    },
    component: () => import('@/views/product/detail/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
