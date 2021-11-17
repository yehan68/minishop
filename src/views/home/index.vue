<template>
  <van-list class="home-page" @load="handleLoad" offset="50" :immediate-check="false" v-model="loading" :finished="finishedLoading">
    <!--  顶部搜索、地址切换  -->
    <van-sticky>
      <van-search
        v-model="keywords"
        placeholder="请输入搜索关键词"
        input-align="center"
        clearable />
      <div class="address-and-switch">
        <span class="address">
          <van-icon name="location-o" /> 鲁谷路6号店自提点 <van-icon name="arrow" />
        </span>
        <div class="switch-btn">
          <span :class="{ 'active': switchVal === 1 }" @click="switchVal = 1">自提</span>
          <span :class="{ 'active': switchVal === 2 }" @click="switchVal = 2">外送</span>
        </div>
      </div>
    </van-sticky>
    <!--  轮播图  -->
    <swiper :list="swiperList" />
    <!--    -->
    <div class="tips">
      <span>
        <van-image lazy-load :src="require('@/assets/icon1.png')" /> 品质囤货
      </span>
      <span>
        <van-image lazy-load :src="require('@/assets/icon2.png')" /> 畅享低价
      </span>
      <span>
        <van-image lazy-load :src="require('@/assets/icon3.png')" /> 自营配送
      </span>
      <span>
        <van-image lazy-load :src="require('@/assets/icon4.png')" /> 会员返现
      </span>
    </div>
    <!--  一元秒杀  -->
    <seckill />
    <!--  商品分类  -->
    <menus :list="category" />
    <!--  活动入口  -->
    <activity />
    <!--  热门商品  -->
    <template v-if="productList.length > 0">
      <hots  v-for="(products, index) in productList" :key="index" :img="category[index].titleImage" :data="products" />
    </template>
  </van-list>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getSwiper, getCategoryTopTen, getProductList } from '@/api/index'
import Swiper from './components/Swiper/index.vue'
import Seckill from './components/Seckill/index.vue'
import Menus from './components/Menus/index.vue'
import Activity from './components/Activity/index.vue'
import Hots from './components/Hots/index.vue'

interface Params {
  categoryCode: number;
  isAll: boolean;
  pageSize: number;
  pageNum: number;
}

@Component({
  name: 'Home',
  components: {
    Swiper,
    Seckill,
    Menus,
    Activity,
    Hots
  }
})
export default class Home extends Vue {
  private keywords = ''
  private switchVal = 1
  private swiperList = []
  private loading = false
  private finishedLoading = false
  private currentCategoryIndex = 0

  private category: TCategory[] = []

  private productList: Array<TProductList[]> = []

  private params: Params = {
    categoryCode: 0,
    isAll: true,
    pageSize: 15,
    pageNum: 1
  }

  /**
   * 获取轮播图
   * @private
   * */
  private async getSwiper () {
    const { data } = await getSwiper()
    this.swiperList = data
  }

  /**
   * 获取一级分类前十
   * @private
   * */
  private async getCategory () {
    const { data } = await getCategoryTopTen()
    this.category = data
    this.getProduct(this.category[this.currentCategoryIndex].code)
  }

  /**
   * 根据分类code获取商品
   * @param categoryCode
   * @private
   */
  private async getProduct (categoryCode: number) {
    this.params.categoryCode = categoryCode || this.params.categoryCode
    try {
      this.loading = true
      const { data: { list } } = await getProductList(this.params)
      this.productList[this.currentCategoryIndex] = list
      this.currentCategoryIndex < 9 ? this.currentCategoryIndex++ : this.finishedLoading = true
    } catch (e) {
      console.log(e)
    } finally {
      this.loading = false
    }
  }

  private handleLoad () {
    this.getProduct(this.category[this.currentCategoryIndex].code)
  }

  created () {
    this.getSwiper()
    this.getCategory()
  }
}
</script>

<style lang="scss" scoped>
  .home-page {
    background-color: #fff;
    .address-and-switch {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 12px 10px 12px;
      background-color: #fff;
      .address {
        display: flex;
        justify-self: flex-start;
        align-items: center;
        color: #666;
        font-size: 13px;
      }
      .switch-btn {
        width: 98px;
        height: 26px;
        line-height: 26px;
        border: 1px solid #ef8e48;
        border-radius: 28px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        font-size: 14px;
        color: #ef8e48;
        span {
          width: 49px;
          height: 26px;
          border-radius: 28px;
          display: inline-block;
          text-align: center;
          &.active {
            background-color: #ef8e48;
            color: #fff;
          }
        }
      }
    }
    .tips {
      height: 28px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #fdf6ee;
      margin: 10px 14px;
      border-radius: 6px;
      padding: 0 8px;
      span {
        display: flex;
        justify-content: center;
        align-items: center;
        color: #ee7b4c;
        font-size: 12px;
        .van-image {
          width: 16px;
          height: 16px;
          margin-right: 3px;
        }
      }
    }
  }
</style>
