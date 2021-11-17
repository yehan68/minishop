<template>
  <div class="cart-page">
    <van-sticky>
      <van-nav-bar
        title="购物车"
        left-arrow
        @click-left="$router.go(-1)" />
    </van-sticky>
    <div class="wrap">
      <div class="cart-list">
        <van-checkbox-group v-model="selectedItems">
          <van-swipe-cell v-for="shop in cartList" :key="shop.code">
            <van-checkbox :name="shop.code" icon-size="15px" checked-color="#e94019"></van-checkbox>
            <shop-item class="product-item" :shop="shop" @click="showDetail(shop.code)">
              <van-icon class="add-cart" name="plus" />
            </shop-item>
            <template #right>
              <van-button square text="删除" type="danger" class="delete-button" />
            </template>
          </van-swipe-cell>
        </van-checkbox-group>
      </div>
      <recommend />
    </div>
    <van-submit-bar :price="totalPrice" button-text="去结算" @submit="onSubmit">
      <van-checkbox icon-size="15px" checked-color="#e94019" v-model="isSelecteAll">全选</van-checkbox>
    </van-submit-bar>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import Recommend from './components/Recommend/index.vue'
import ShopItem from '@/components/ShopItem/index.vue'
import { CartModule } from '@/store/modules/cart'

@Component({
  name: 'Cart',
  components: {
    Recommend,
    ShopItem
  }
})
export default class Cart extends Vue {
  private selectedItems = CartModule.checkedCodes

  private get cartList () {
    return CartModule.getList
  }

  private get totalPrice () {
    return CartModule.totalPrice * 100
  }

  private get isSelecteAll () {
    console.log(this.selectedItems.length, CartModule.getList.length)
    return this.selectedItems.length === CartModule.getList.length
  }

  private onSubmit () {
    console.log('submit')
  }
}
</script>

<style lang="scss" scoped>
  .cart-page {
    background-color: #eee;
    padding-bottom: 50px;
    .wrap {
      padding: 8px 10px;
      .cart-list {
        background-color: #fff;
        border-radius: 4px;
        padding: 10px 0;
        box-shadow: 0 1px 6px 0 rgba(0, 0, 0, 0.01);
        overflow: hidden;
        ::v-deep .van-swipe-cell {
          position: relative;
          padding-bottom: 1px;
          .van-swipe-cell__wrapper {
            width: 100%;
            display: flex;
            flex-direction: row;
          }
          display: flex;
          .van-checkbox {
            width: 25px;
            margin-left: 10px;
            text-align: center;
          }
          .product-item {
            margin-right: 10px;
          }
          .van-swipe-cell__right {
            .delete-button {
              height: 100%;
              background-color: #eb5d2a;
              border-color: #eb5d2a;
            }
          }
          &:not(:last-child):before {
            content: '';
            width: calc(100% - 20px);
            height: 1px;
            border-bottom: 1px solid #eee;
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            z-index: 3;
          }
        }
      }
    }
    .van-submit-bar {
      bottom: 50px;
    }
  }
</style>
