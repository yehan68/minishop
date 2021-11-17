<template>
  <div class="product-detail-page" v-if="showPage">
    <van-icon class="back-btn" name="arrow-left" color="#fff" @click="$router.go(-1)" />
    <van-swipe @change="onChange">
      <van-swipe-item v-for="item in detail.shopImages" :key="item">
        <van-image :src="item"></van-image>
      </van-swipe-item>
      <template #indicator>
        <div class="custom-indicator">
          {{ current + 1 }}/{{ detail.shopImages.length }}
        </div>
      </template>
    </van-swipe>
    <div class="info">
      <div class="price">
        <div class="left">
          <span>￥<b>{{ detail.price }}</b></span>
          <span>￥{{ detail.originPrice }}</span>
        </div>
        <div class="right">已售{{ detail.soldNum }}件</div>
      </div>
      <div class="name">
        <span>{{ detail.promotion ? `【${detail.promotion}】` : '' }}{{ detail.name }}</span>
        <span>
          <van-icon name="share" color="#eb6c11" size="20" />
          分享
        </span>
      </div>
      <div class="msg">{{ detail.pintuanmsg }}</div>
    </div>
    <div class="props">
      <label>商品信息</label>
      <div class="prop-table">
        <div v-for="item in propKeys" :key="item">
          <span>{{ propName(item) }}</span>
          <span>{{ detail.properties[item] }}</span>
        </div>
      </div>
    </div>
    <div class="detail-img">
      <label>商品详情</label>
      <div class="img-wrap">
        <van-image v-for="item in detail.detailImages" :key="item" :src="item"></van-image>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator'
import { getProductDetail } from '@/api/index'

@Component
export default class ProductDetail extends Vue {
  private current = 0
  private propKeys: string[] = []
  private propKey = ''
  private showPage = false

  private detail: TProductDetail = {
    code: '',
    name: '',
    shopImages: [],
    price: 0,
    originPrice: 0,
    label: '',
    inventory: 0,
    soldNum: 0,
    promotion: '',
    promotionTag: '',
    promotionTitle: '',
    properties: {},
    detailImages: [],
    pintuanmsg: '',
    cartMsg: ''
  }

  private async getDetail () {
    const { data } = await getProductDetail({ code: this.$route.params.code })
    this.detail = data
    this.showPage = true
    this.propKeys = Object.keys(this.detail.properties)
  }

  private onChange (index: number) {
    this.current = index
  }

  private propName (name: string) {
    // eslint-disable-next-line
    const propNames: any = {
      originPlace: '产地',
      unitName: '单位',
      netVol: '净含量',
      expireDate: '保质期',
      storeCondition: '贮存方式'
    }
    return propNames[name]
  }

  created () {
    this.getDetail()
  }
}
</script>

<style lang="scss" scoped>
  .product-detail-page {
    position: relative;
    background-color: #e6e6e6;
    .back-btn {
      width: 26px;
      height: 26px;
      line-height: 26px;
      border-radius: 50%;
      text-align: center;
      position: absolute;
      top: 14px;
      left: 14px;
      background: rgba(0, 0, 0, 0.3);
      z-index: 999;
    }
    .van-swipe {
      background-color: #fff;
      border-bottom: 2px solid #f3f3f3;
      .van-swipe-item {
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .custom-indicator {
        width: 36px;
        height: 18px;
        line-height: 18px;
        border-radius: 18px;
        text-align: center;
        position: absolute;
        right: 14px;
        bottom: 14px;
        padding: 2px 5px;
        font-size: 12px;
        color: #fff;
        background: rgba(0, 0, 0, 0.3);
      }
    }
    .info {
      padding: 0 12px;
      background-color: #fff;
      .price {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        padding-top: 10px;
        .left {
          span {
            &:nth-child(1) {
              font-size: 12px;
              font-weight: 700;
              color: #eb5d2a;
              b {
                font-size: 22px;
              }
            }
            &:nth-child(2) {
              font-size: 12px;
              color: #7e7e7e;
              margin-left: 10px;
              text-decoration: line-through;
            }
          }
        }
        .right {
          font-size: 14px;
          color: #1d1d1d;
          font-weight: 700;
        }
      }
      .name {
        height: 35px;
        display: flex;
        margin-top: 10px;
        span {
          display: inline-block;
          &:nth-child(1) {
            flex: 1;
            font-size: 14px;
            font-weight: 700;
            color: #0d0d0d;
            border-right: 2px dashed #ababab;
          }
          &:nth-child(2) {
            width: 35px;
            text-align: center;
            color: #ababab;
            font-size: 10px;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        }
      }
      .msg {
        height: 40px;
        line-height: 40px;
        font-size: 12px;
        color: #ec7520;
        position: relative;
        padding-left: 12px;
        margin-top: 4px;
        border-top: 1px solid #e6e6e6;
        &::before {
          content: '';
          display: inline-block;
          background-color: #ec7520;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          position: absolute;
          top: 50%;
          left: 0;
          transform: translateY(-50%);
        }
      }
    }
    .props {
      background-color: #fff;
      margin-top: 10px;
      padding-top: 14px;
      padding-bottom: 14px;
      label {
        height: 22px;
        line-height: 22px;
        display: inline-block;
        font-size: 14px;
        font-weight: 700;
        color: #4f4f4f;
        padding-left: 12px;
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 14px;
          background-color: #ed7e2e;
        }
      }
      .prop-table {
        width: calc(100% - 30px);
        margin: 10px 14px;
        border: 1px solid #f8f8f8;
        div {
          &:not(:last-child) {
            border-bottom: 1px solid #f8f8f8;
          }
          display: flex;
          height: 39px;
          line-height: 39px;
          font-size: 14px;
          span {
            &:nth-child(1) {
              width: 110px;
              display: inline-block;
              padding-left: 15px;
              color: #9b9b9b;
            }
            &:nth-child(2) {
              flex: 1;
              display: inline-block;
              padding-left: 15px;
              color: #424242;
            }
          }
        }
      }
    }
    .detail-img {
      background-color: #fff;
      margin-top: 10px;
      padding-top: 14px;
      padding-bottom: 14px;
      label {
        height: 22px;
        line-height: 22px;
        display: inline-block;
        font-size: 14px;
        font-weight: 700;
        color: #4f4f4f;
        padding-left: 12px;
        position: relative;
        &::before {
          content: '';
          display: block;
          position: absolute;
          left: 0;
          top: 50%;
          transform: translateY(-50%);
          width: 3px;
          height: 14px;
          background-color: #ed7e2e;
        }
      }
      .img-wrap {
        margin: 10px 0;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
    }
  }
</style>
