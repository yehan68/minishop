<template>
  <div class="shop-item" @click="handleClick">
    <div class="thumb-box">
      <img class="thumb" :src="shop.image" alt="">
    </div>
    <div class="info-box">
      <h5 class="name">{{ shop.name }}</h5>
      <div class="tags">
        <span class="label">{{ shop.label }}</span>
        <span class="promotion-tag" v-if="shop.promotionTag">{{ shop.promotionTag }}</span>
      </div>
      <div class="price">
        <span class="current-price">￥{{ shop.price }}</span>
        <span class="origin-price">￥{{ shop.originPrice }}</span>
        <div class="btn">
          <add-cart :shop="shop" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import AddCart from '@/components/AddCart/index.vue'

@Component({
  name: 'ShopItem',
  components: {
    AddCart
  }
})
export default class ShopItem extends Vue {
  @Prop({ required: true })
  private shop!: TProductList

  private handleClick () {
    this.$emit('click')
  }
}
</script>

<style lang="scss" scoped>
  .shop-item {
    width: 100%;
    display: flex;
    padding: 20px 0;
    background-color: #fff;
    .thumb-box {
      width: 74px;
      height: 74px;
      margin-right: 15px;
      display: flex;
      justify-content: center;
      align-items: center;
      .thumb {
        width: 100%;
        object-fit: cover;
      }
    }
    .info-box {
      flex: 1;
      position: relative;
      .name {
        font-size: 14px;
        font-weight: 400;
        line-height: 1.25;
        margin-bottom: 5px;
      }
      .tags {
        justify-content: flex-start;
        align-items: center;
        font-size: 10px;
        .label {
          color: #999999;
          border: 1px solid #e0e0e0;
          border-radius: 3px;
          padding: 1px 3px;
          margin-right: 6px;
        }
        .promotion-tag {
          color: #eb5952;
          border: 1px solid #f6cac9;
          border-radius: 3px;
          padding: 1px 3px;
        }
      }
      .price {
        width: 100%;
        position: absolute;
        bottom: 0;
        justify-content: flex-start;
        align-items: center;
        .current-price {
          color: #eb5952;
          font-size: 14px;
          font-weight: 700;
          margin-right: 5px;
        }
        .origin-price {
          color: #cccccc;
          font-size: 10px;
          text-decoration: line-through;
        }
        .btn {
          position: absolute;
          right: 5px;
          top: 50%;
          transform: translateY(-50%);
        }
      }
    }
  }
</style>
