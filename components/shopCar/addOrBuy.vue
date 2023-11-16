<style lang="scss" scoped>
  .navHeight {
    height: 116rpx;
    width: 100%;
    background-color: #e5e6e6;
    position: fixed;
    bottom: -1px;
    z-index: 999;
    .tabBox {
      display: flex;
      align-items: center;
      padding-right: 10rpx;
    }
    .left {
      display: flex;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      .home {
        margin-left: 20rpx;
        width: 85rpx;
        height: 85rpx;
        image {
          width: 45rpx;
          height: 45rpx;
          display: block;
          margin: 0 auto;
        }
        text {
          font-size: 24rpx;
          color: #727171;
          text-align: center;
          display: block;
          margin-top: 0rpx;
        }
      }
      .home:nth-child(1) {
        margin-left: 0rpx;
      }
    }
    .right {
      width: 100%;
      height: 75rpx;
      border-radius: 50rpx;
      display: flex;
      font-size: 26rpx;
      text-align: center;
      color: #fff;
      line-height: 75rpx;
      .addCar {
        width: 50%;
        background-color: #e99785;
        border-radius: 50rpx 0 0 50rpx;
      }
      .buy {
        width: 50%;
        background-color: #e63b29;
        border-radius: 0 50rpx 50rpx 0;
      }
    }
  }
  button {
    background-color: #e5e6e6;
    line-height: initial;
    border: none;
    padding-left: 0;
    padding-right: 0;
  }
  button::after {
    border: none !important;
  }
</style>
<template>
  <view class="navHeight">
    <view class="tabBox">
      <view class="left">
        <view class="home" @click="goHome">
          <image src="../../static/tab/tabHomeIcon.png"></image>
          <text>首页</text>
        </view>
        <button open-type="contact" class="home">
            <image src="../../static/tab/tabkefuIcon.png"></image>
            <text>客服</text>
          </button>
        <view class="home" @click="jumpCar">
          <image src="../../static/tab/tabShopIcon.png"></image>
          <text>购物车</text>
        </view>
      </view>
      <view class="right">
        <view class="addCar" @click="addCar">加入购物车</view>
        <view class="buy" @click="addCarsubmit">马上购买</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: "navBar",
    props: {},
    data() {
      return {};
    },
    methods: {
      // 去首页
      goHome() {
        uni.switchTab({
          url: '/pages/index/index'
        })
      },
      addCar() {
        this.$emit('addCar')
      },
	  // 马上购买
	  addCarsubmit(){
		  this.$emit('addCarsubmit')
	  },
      // 跳转购物车
      jumpCar() {
        console.log('ssss');
        uni.switchTab({
          url: '/pages/index/car'
        })
      }
    },
  };
</script>