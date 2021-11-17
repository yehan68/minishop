<template>
  <div class="add-cart-comp">
    <template v-if="cartNum > 0">
      <van-icon class="decrease-btn" name="minus" @click.stop="decrease" />
      <span class="cart-num">{{ cartNum }}</span>
    </template>
    <van-icon class="increase-btn" name="plus" @click.stop="increase" />
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import { CartModule } from '@/store/modules/cart'

@Component({
  name: 'AddCart'
})
export default class AddCart extends Vue {
  @Prop({ required: true })
  private shop!: TProductList

  private get cartNum (): number {
    const list: TCartData[] = CartModule.getList
    const target = list.find(item => this.shop.code === item.code)
    return (target && target.count) || 0
  }

  private decrease () {
    CartModule.decrease(this.shop)
  }

  private increase () {
    CartModule.increase(this.shop)
  }
}

</script>

<style lang="scss" scoped>
  .add-cart-comp {
    display: flex;
    flex-direction: row;
    align-content: center;
    .decrease-btn {
      width: 20px;
      height: 20px;
      line-height: 21px;
      text-align: center;
      border: 1px solid #ef8e48;
      color: #ef8e48;
      border-radius: 50%;
      font-size: 16px !important;
    }
    .increase-btn {
      width: 20px;
      height: 20px;
      line-height: 21px;
      text-align: center;
      background-color: #ef8e48;
      border: 1px solid #ef8e48;
      color: #fff;
      border-radius: 50%;
      font-size: 16px;
    }
    .cart-num {
      width: 28px;
      height: 22px;
      line-height: 22px;
      text-align: center;
      font-size: 14px;
      pointer-events: none
    }
  }
</style>
