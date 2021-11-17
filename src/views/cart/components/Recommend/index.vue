<template>
  <div class="recommend-comp">
    <h5>推荐商品</h5>
    <div class="shop-list">
      <div class="shop-item">
        1
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'

@Component({
  name: 'Recommend'
})
export default class Recommend extends Vue {

}
</script>

<style lang="scss" scoped>
  .recommend-comp {
    h5 {
      height: 48px;
      line-height: 48px;
      padding: 0 8px;
      font-size: 18px;
      font-weight: 500;
      color: #3f3f3f;
    }
  }
</style>
