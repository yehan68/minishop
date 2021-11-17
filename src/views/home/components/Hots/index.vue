<template>
  <div class="category-item">
    <div class="title-image">
      <img :src="img">
    </div>
    <div class="list-wrap">
      <shop-item class="product-item" v-for="item in data" :key="item.code" :shop="item" @click="showDetail(item.code)" />
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import ShopItem from '@/components/ShopItem/index.vue'

@Component({
  name: 'Hots',
  components: {
    ShopItem
  }
})
export default class Hots extends Vue {
  @Prop({ required: true })
  private data!: TProductList[]

  @Prop({ required: true })
  private img!: string

  private showDetail (code: string) {
    this.$router.push(`/productDetail/${code}`)
  }
}
</script>

<style lang="scss">
  .category-item {
    width: 100%;
    display: flex;
    flex-direction: column;
    .title-image {
      width: 100%;
      img {
        width: 100%;
      }
    }
    .list-wrap {
      background-color: #fff;
      margin: -35px 15px 0 15px;
      border-radius: 6px;
      overflow: hidden;
      .product-item {
        border-bottom: 1px solid #f4f4f4;
      }
    }
  }
</style>
