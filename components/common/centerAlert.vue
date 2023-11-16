<template>
  <view class="box" v-if="isShowAlert">
    <view class="alert">
      <view class="title">积分使用规则</view>
      <view class="content">
        <view class="condition">使用条件</view>
        <view class="list">1.订单全部金额均可使用 <br /> 2.积分数量大于100个(含);具体以页面实际可用积分量为准;
          <br /> 3.您当前优享值为100000积分支付，实际支付金额以页面显示为准 </view>
        <view class="condition">使用数量</view>
        <view class="list">1.订单全部金额均可使用 <br /> 2.积分数量大于100个(含);具体以页面实际可用积分量为准;
          <br /> 3.您当前优享值为100000积分支付，实际支付金额以页面显示为准 </view>
      </view>
      <view class="btn" @click="closeAlert">我知道了</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "centerAlert",
    props: {
      text: '',
      isShowAlert: false
    },
    data() {
      return {
      }
    },
    onLoad() {},
    methods: {
      closeAlert() {
        this.$emit('closeAlert')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box {
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    z-index: 99999;
    background-color: rgba($color: #000, $alpha: .5);
    .alert {
      background-color: #fff;
      border-radius: 20rpx;
      margin: 0 auto;
      margin-top: 200rpx;
      padding-bottom: 40rpx;
      width: 90%;
      .title {
        font-size: 34rpx;
        font-weight: bold;
        text-align: center;
        height: 120rpx;
        line-height: 130rpx;
      }
      .content {
        padding: 0rpx 40rpx;
        box-sizing: border-box;
        .condition {
          margin-bottom: 15rpx;
          margin-top: 30rpx;
        }
        .list {
          line-height: 45rpx;
        }
      }
      .btn {
        border-radius: 50rpx;
        font-size: 28rpx;
        text-align: center;
        height: 60rpx;
        line-height: 60rpx;
        width: 300rpx;
        background-color: red;
        color: #fff;
        margin: 0 auto;
        margin-top: 70rpx;
      }
    }
  }
</style>




