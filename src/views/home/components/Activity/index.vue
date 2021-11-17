<template>
  <div class="activity">
    <h5 class="activity-title">活动专区</h5>
    <div class="activity-wrap">
      <div class="activity-item" v-for="item in activityList" :key="item">
        <img :src="item">
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'Activity'
})
export default class Activity extends Vue {
  private activityList: Array<string> = [
    'https://pan.zhangtong.work/minishop/promotion/b63cb2c581caef8c.png',
    'https://pan.zhangtong.work/minishop/promotion/abe60b152258ebcf.png',
    'https://pan.zhangtong.work/minishop/promotion/6f07278b8bd89efb.jpg',
    'https://pan.zhangtong.work/minishop/promotion/672b1bee87d5cac8.png'
  ]
}
</script>

<style lang="scss">
  .activity {
    padding: 0 12px 10px 12px;
    .activity-title {
      width: 100%;
      font-size: 14px;
      font-weight: 700;
      margin-bottom: 10px;
    }
    .activity-wrap {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      flex-wrap: wrap;
      .activity-item {
        width: 170px;
        margin-bottom: 4px;
        img {
          width: 100%;
        }
      }
    }
  }
</style>
