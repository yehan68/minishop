<template>
  <div id="app">
    <keep-alive>
      <router-view :key="key"/>
    </keep-alive>
    <van-tabbar v-model="active" route fixed placeholder active-color="#F18C43" v-if="showTabbar">
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="apps-o" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="shopping-cart-o" :badge="totalCount" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="contact" to="/mine">我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { CartModule } from '@/store/modules/cart'

@Component
export default class App extends Vue {
  private active = 0
  private showTabbar = true

  private get key (): string {
    return this.$route.path
  }

  private get totalCount () {
    return CartModule.totalCount
  }

  @Watch('$route')
  onRouteChange (route: Route) {
    const tabbarRoute = ['/', '/category', '/cart', '/mine']
    this.showTabbar = tabbarRoute.includes(route.path)
  }
}
</script>

<style lang="scss">
  #app {
    width: 100%;
  }
</style>
