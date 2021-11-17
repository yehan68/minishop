<template>
  <div class="seckill">
    <div class="title">
      <h1>蜂超市1元菜场</h1>
      <span>新鲜便宜次日达</span>
    </div>
    <div class="content">
      <swiper class="left-shop" ref="seckillSwiper" :options="swiperOptions">
        <swiper-slide class="swiper-item">
          <div class="shop-item">
            <img class="shop-image" src="https://pan.zhangtong.work/minishop/baseinfo/productImage/201912/31/4b078083a92aaceac6f4ce01.small.jpg" alt="">
          </div>
          <div class="shop-item">
            <img class="shop-image" src="https://pan.zhangtong.work/minishop/baseinfo/productImage/201909/26/c6fc571d6f331b09c6f4ce01.small.jpg" alt="">
          </div>
          <div class="shop-item">
            <img class="shop-image" src="https://pan.zhangtong.work/minishop/baseinfo/productImage/202004/02/a9f6cff9619aec74c6f4ce01.small.jpg" alt="">
          </div>
        </swiper-slide>
        <swiper-slide class="swiper-item">
          <div class="shop-item">
            <img class="shop-image" src="https://pan.zhangtong.work/minishop/baseinfo/productImage/201912/31/4b078083a92aaceac6f4ce01.small.jpg" alt="">
          </div>
          <div class="shop-item">
            <img class="shop-image" src="https://pan.zhangtong.work/minishop/baseinfo/productImage/201909/26/c6fc571d6f331b09c6f4ce01.small.jpg" alt="">
          </div>
          <div class="shop-item">
            <img class="shop-image" src="https://pan.zhangtong.work/minishop/baseinfo/productImage/202004/02/a9f6cff9619aec74c6f4ce01.small.jpg" alt="">
          </div>
        </swiper-slide>
      </swiper>
      <div class="right-btn">立即抢购 <van-icon class="arrow" name="arrow" /></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
@Component({
  name: 'Seckill'
})
export default class Seckill extends Vue {
  private swiperOptions: object = {
    direction: 'vertical',
    loop: true,
    autoplay: true
  }
}
</script>

<style lang="scss">
  .seckill {
    margin: 0 12px;
    width: calc(100% - 24px);
    height: 188px;
    background-image: url('~@/assets/seckill_bg.png');
    background-repeat: no-repeat;
    background-size: 100% 100%;
    .title {
      padding: 12px 14px 4px 14px;
      h1 {
        font-size: 16px;
        margin: 6px 0;
        color: #3a7421;
        display: inline-block;
      }
      span {
        font-size: 12px;
        color: #59923f;
        margin-left: 10px;
      }
    }
    .content {
      width: 324px;
      height: 127px;
      margin: auto;
      position: relative;
      .left-shop {
        width: 282px;
        height: 115px;
        padding: 6px;
        margin: 0;
        .swiper-item {
          display: flex;
          align-items: center;
          .shop-item {
            flex: 1;
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 0 4px;
            .shop-image {
              width: 100%;
            }
          }
        }
      }
      .right-btn {
        position: absolute;
        top: 50%;
        right: 0;
        transform: translateY(-50%);
        width: 29px;
        height: 80px;
        text-align: center;
        border-left: 1px solid #ddd;
        font-size: 14px;
        font-weight: 700;
        letter-spacing: 2px;
        writing-mode:vertical-lr;
        color: #326e1c;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        .arrow {
          width: 15px;
          height: 15px;
          border-radius: 50%;
          background-color: #326e1c;
          color: #fff;
          position: absolute;
          bottom: 0;
          font-size: 12px;
          text-align: center;
          line-height: 15px;
        }
      }
    }
  }
</style>
