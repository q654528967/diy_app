<template>
  <view class="content">
    <view class="noData">
      <image src="../../static/user/noCoupons.png" mode="scaleToFill" />
      <view class="text">{{text}}</view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "noData",
    props: {
      text: ''
    },
    data() {
      return {}
    },
    onLoad() {},
    methods: {}
  }
</script>

<style lang="scss" scoped>
.content {
  .noData {
    padding-top: 180rpx;
    image {
      width: 90rpx;
      height: 100rpx;
      display: block;
      margin: 0 auto;
    }
    view {
      text-align: center;
      color: #d9d9d9;
      font-size: 32rpx;
      margin-top: 50rpx;
    }
  }
}
</style>




