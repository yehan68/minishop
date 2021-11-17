<template>
  <div class="category-page">
    <van-search
      v-model="keywords"
      placeholder="请输入搜索关键词"
      input-align="center"
      clearable />
    <swiper class="category-swipe" ref="categorySwiper" :options="swiperOptions">
      <swiper-slide :class="{ 'active': swiperMenuIndex === index }" v-for="(item, index) in categoryList" :key="item.code">
        <van-image lazy-load :src="item.icon" @click="handleSwiperMenuClick(index)" />
        <span>{{ item.name }}</span>
      </swiper-slide>
    </swiper>
    <div class="category-content">
      <van-sidebar v-model="sidebarMenuIndex" v-if="sidebarMenu" @change="handleSidebarMenuChange">
        <van-sidebar-item v-for="item in sidebarMenu" :key="item.code" :title="item.name" />
      </van-sidebar>
      <div class="product" ref="productWrapper">
        <div class="product-content">
          <shop-item class="product-item" v-for="item in productList" :key="item.code" :shop="item" @click="showDetail(item.code)" />
          <div class="pullup-tips">
            <template v-if="!noMore">
              <div v-if="!loading" class="before-trigger">
                <span class="pullup-txt" style="font-size: 14px;">加载更多</span>
              </div>
              <div v-else class="after-trigger">
                <van-loading size="24px">加载中...</van-loading>
              </div>
            </template>
            <div v-else class="after-trigger">
              <van-divider>到底了！！</van-divider>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Ref } from 'vue-property-decorator'
import { Route } from 'vue-router'
import { getCategory, getProductList } from '@/api/index'
import BScroll from '@better-scroll/core'
import ScrollBar from '@better-scroll/scroll-bar'
import Pullup from '@better-scroll/pull-up'
import ShopItem from '@/components/ShopItem/index.vue'

interface Params {
  categoryCode: number;
  isAll: boolean;
  pageSize: number;
  pageNum: number;
}

BScroll.use(ScrollBar)
BScroll.use(Pullup)

@Component({
  name: 'Category',
  components: {
    ShopItem
  }
})
export default class Category extends Vue {
  private keywords = ''
  private swiperOptions: object = {
    slidesPerView: 'auto',
    spaceBetween: 12,
    freeMode: true
  }

  private swiperMenuIndex = 0
  private sidebarMenuIndex = 0
  private categoryList: TCategory[] = []
  private productList: TProductList[] = []
  private loading = false
  private scroll: any = null
  private noMore = false

  private params: Params = {
    categoryCode: 0,
    isAll: true,
    pageSize: 15,
    pageNum: 1
  }

  @Ref('productWrapper')
  readonly productRef!: HTMLDivElement

  /**
   * 获取顶部菜单
   * @private
   */
  private async getAllCategory () {
    const { data } = await getCategory()
    this.categoryList = data
    const { code } = this.sidebarMenu[this.sidebarMenuIndex]
    await this.getProduct(code)
  }

  /**
   * 获取左侧菜单
   * @private
   */
  private get sidebarMenu (): TSubCategory[] { // 获取二级分类
    if (this.categoryList.length > 0) {
      let { code, children } = this.categoryList[this.swiperMenuIndex]
      if (children[0].code !== code) {
        children = [
          {
            code: code,
            sort: 1,
            name: '全部分类',
            parentCode: 0
          },
          ...children
        ]
      }
      return children
    } else {
      return []
    }
  }

  /**
   * 顶部菜单点击切换
   * @param index, code
   * @private
   */
  private handleSwiperMenuClick (index: number) {
    this.swiperMenuIndex = index
    this.sidebarMenuIndex = 0
    this.handleSidebarMenuChange()
  }

  /**
   * 左侧菜单点击切换
   * @private
   */
  private handleSidebarMenuChange () {
    const { code, parentCode } = this.sidebarMenu[this.sidebarMenuIndex]
    this.params.isAll = parentCode === 0
    this.params.pageNum = 1
    this.productList = []
    this.noMore = false
    this.getProduct(code)
    this.scroll.scrollTo(0, 0)
  }

  /**
   * 跳转商品详情
   * @param code
   * @private
   */
  private showDetail (code: string) {
    this.$router.push(`/productDetail/${code}`)
  }

  /**
   * 获取商品列表
   * @param categoryCode
   * @private
   */
  private async getProduct (categoryCode: number) {
    this.params.categoryCode = categoryCode || this.params.categoryCode
    try {
      this.loading = true
      const { data: { list, totalPage } } = await getProductList(this.params)
      this.productList = [...this.productList, ...list]
      if (list.length === 0 || this.params.pageNum >= totalPage) {
        this.noMore = true
        this.scroll.closePullUp()
      } else {
        this.scroll.finishPullUp()
        this.loading = false
        this.params.pageNum++
      }
      this.$nextTick(() => {
        this.scroll.refresh()
      })
    } catch (e) {
      console.log(e)
    }
  }

  created () {
    const { curr } = this.$route.query
    !curr && this.getAllCategory()
  }

  mounted () {
    this.$nextTick(() => {
      this.scroll = new BScroll(this.productRef, {
        scrollY: true,
        scrollbar: true,
        pullUpLoad: true,
        click: true
      })
      this.scroll.on('pullingUp', this.getProduct)
    })
  }

  activated () {
    const { curr } = this.$route.query
    if (curr && typeof curr === 'string') {
      this.swiperMenuIndex = parseInt(curr)
      this.params.isAll = true
      this.params.pageNum = 1
      this.productList = []
      this.noMore = false
      this.getAllCategory()
    }
  }
}
</script>

<style lang="scss" scoped>
  .category-page {
    height: calc(100vh - 13.33333vw);
    background-color: #f7f8fa;
    overflow: hidden;
    .category-swipe {
      background-color: #fff;
      padding: 10px 12px;
      .swiper-slide {
        width: 56px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        font-size: 12px;
        color: #666;
        .van-image {
          width: 40px;
          height: 40px;
          padding: 1px;
          border: 1px solid #fff;
          border-radius: 18px;
          ::v-deep img {
            height: 44px;
            margin-top: -4px;
          }
        }
        span {
          width: 100%;
          height: 16px;
          line-height: 16px;
          background-color: #fff;
          margin-top: 3px;
          border-radius: 4px;
          text-align: center;
        }
        &.active {
          .van-image {
            border-color: #ef8e48;
          }
          span {
            background-color: #ef8e48;
            color: #fff;
          }
        }
      }
    }
    .category-content {
      height: calc(100% - 136.97px);
      display: flex;
      .van-sidebar {
        width: 78px;
        height: 100%;
        background-color: #f5f5f5;
        .van-sidebar-item {
          background-color: #f5f5f5;
          font-size: 12px;
          color: #696969;
          text-align: center;
        }
      }
      .product {
        width: calc(100vw - 78px);
        height: 100%;
        overflow: hidden;
        position: relative;
        .product-content {
          width: calc(100% - 20px);
          padding: 0 10px;
          background-color: #fff;
          .product-item {
            border-bottom: 1px solid #f4f4f4;
          }
        }
      }
    }
  }
</style>
