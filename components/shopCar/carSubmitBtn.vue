<template>
  <view class="settlement">
    <view class="content">
      <view class="left">
        <view class="yuan" @click="isAllSelect">
          <view class="dian"></view>
        </view>
        <view class="all">全选</view>
      </view>
      <view class="right">
        <view class="number">
          <view class="total">合计: {{totalNumber}}</view>
          <view class="freight">不含运费</view>
        </view>
        <view class="btn" @click="submitBtn">结算</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "carSubmitBtn",
    props: {
      totalNumber: ''
    },
    data() {
      return {}
    },
    onLoad() {},
    methods: {
      // 全选反选
      isAllSelect() {
        this.$emit('isAllSelect')
      },
      // 结算
      submitBtn() {
        this.$emit('submitBtn')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .settlement {
    width: 100%;
    position: fixed;
    bottom: 120rpx;
  }
  .content {
    display: flex;
    justify-content: space-between;
    height: 100rpx;
    width: 98%;
    margin: 0 auto;
    border-radius: 50rpx;
    background-color: #fff;
    border: 1rpx solid #f1f1f1;
    .left {
      display: flex;
      height: 100rpx;
      align-items: center;
      margin-left: 40rpx;
      .all {
        font-size: 32rpx;
      }
    }
    .right {
      display: flex;
      .number {
        text-align: right;
        margin-right: 20rpx;
        .total {
          margin-top: 10rpx;
          font-size: 28rpx;
        }
        .freight {
          margin-top: 4rpx;
          font-size: 30rpx;
        }
      }
      .btn {
        width: 90px;
        background-color: #e43b29;
        height: 98rpx;
        border-radius: 0 50rpx 50rpx 0;
        color: #fff;
        font-size: 32rpx;
        text-align: center;
        line-height: 98rpx;
        letter-spacing: 5rpx;
        border: 1rpx solid #e43b29;
      }
    }
    .yuan {
      width: 30rpx;
      height: 30rpx;
      border-radius: 50%;
      border: 1px solid #e99785;
      margin-right: 20rpx;
      .dian {
        width: 12rpx;
        height: 12rpx;
        border-radius: 50%;
        margin: 0 auto;
        background-color: #b40c24;
        margin-top: 9rpx;
      }
    }
  }
</style>




