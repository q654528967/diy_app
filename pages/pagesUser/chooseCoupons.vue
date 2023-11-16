<template>
  <view class="content">
    <view class="titleBox">
      优惠券
      <image src="../../static/user/chacha.png" mode="scaleToFill" />
    </view>
   <!-- 未使用 -->
    <view class="couponBox">
      <view class="coupon coupon-wave-left  coupon-wave-right coupon-yellow">
        <view class="couponInfo">
          <view class="left">
            <view class="num">￥60</view>
            <view class="num">满500元可用</view>
          </view>
          <view class="center">
            <view class="title">新手专用券</view>
            <view class="time">2010.01.03-2018.09.12</view>
          </view>
          <view class="right">立即使用</view>
        </view>
      </view>
      <view class="tips">全部商品可用，不可抵扣运费，</view>
    </view>
    <!-- 积分优惠券  -->
     <view class="couponBox">
      <view class="coupon coupon-wave-left  coupon-wave-right coupon-yellow" style="background-color: #ba8045">
        <view class="couponInfo" style="
        justify-content: space-between;padding-top: 0rpx;padding-right: 0rpx">
          <view class="left">
            <view class="num">￥60</view>
            <view class="num">满500元可用</view>
          </view>
          <view class="center">
            <view class="title" style="margin-top: 15rpx">新手专用券</view>
            <view class="time">2010.01.03-2018.09.12</view>
          </view>
          <view class="right" style="background-color: #ba8045;margin-top: 0rpx">
            <view class="numberRight">
              <view class="rightTitle">消耗积分</view>
              <view class="rightNumber">90</view>
              <view class="useBtn">立即使用</view>
            </view>
          </view>
        </view>
      </view>
      <view class="tips">全部商品可用，不可抵扣运费，</view>
    </view>
    <!-- 已领取 -->
     <view class="couponBox">
      <view class="coupon coupon-wave-left  coupon-wave-right coupon-yellow" style="background-color: #ba8045">
        <view class="couponInfo" style="
        justify-content: space-between;padding-top: 0rpx;padding-right: 0rpx">
          <view class="left">
            <view class="num">￥60</view>
            <view class="num">满500元可用</view>
          </view>
          <view class="center">
            <view class="title" style="margin-top: 15rpx;margin-bottom: 0rpx">您已经领取</view>
            <view class="title" style="margin-bottom: 0rpx">全品类优惠券</view>
            <view class="time">2010.01.03-2018.09.12</view>
          </view>
          <view class="right" style="background-color: #ba8045;margin-top: 0rpx">
            <view class="numberRight" style="background-color: #c49c62">
              <image
                src="../../static/user/yinzhang.png"
                mode="scaleToFill"
              />
              <view class="useBtn">立即使用</view>
            </view>
          </view>
        </view>
      </view>
      <view class="tips">全部商品可用，不可抵扣运费，</view>
    </view>
    <!-- 不可用优惠 -->
    <view class="noUser">不可用优惠</view>
    <!-- 已失效 -->
     <view class="couponBox">
      <view class="coupon coupon-wave-left  coupon-wave-right coupon-yellow">
        <view class="couponInfo">
          <view class="left">
            <view class="num">￥60</view>
            <view class="num">满500元可用</view>
          </view>
          <view class="center">
            <view class="title">新手专用券</view>
            <view class="time">2010.01.03-2018.09.12</view>
          </view>
          <view class="right" style="background-color: #c49c62"></view>
        </view>
      </view>
      <view class="tips">未满足使用门槛</view>
    </view>
    <!-- 不使用按钮-->
    <view class="noUseBtn">不使用优惠</view>
    
  </view>
</template>

<script>
   export default {
    data() {
      return {
      }
    },
    onLoad() {},
    methods: {
    },
    components: {
    }
  }
</script>

<style lang="scss" scoped>
.titleBox {
      text-align: center;
      padding: 40rpx 30rpx;
      box-sizing: border-box;
      font-size: 32rpx;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      image {
        width: 40rpx;
        height: 40rpx;
        float: right;
      }
    }
  .couponInfo {
    display: flex;
    justify-content: space-around;
    padding: 18rpx 20rpx 20rpx 25rpx;
    box-sizing: border-box;
    color: #fff;
    .left {
      border-right: 1px dashed #fff;
      width: 160rpx;
      padding-top: 20rpx;
      .num {
        font-size: 35rpx;
        text-align: center;
      }
      .num:nth-child(2) {
        font-size: 26rpx;
      }
    }
    .center {
      .title {
        font-size: 32rpx;
        margin-bottom: 25rpx;
      }
      .time {
        font-size: 28rpx;
      }
    }
    .right {
      width: 160rpx;
      height: 60rpx;
      background-color: #fff;
      border-radius: 50rpx;
      color: rgb( 175, 100, 49);
      text-align: center;
      font-size: 28rpx;
      line-height: 60rpx;
      margin-top: 30rpx;
      .numberRight {
        background-color: #615349;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        height: 150rpx;
        font-size: 28rpx;
        color: #f4f0ee;
        border-left: 1px solid #ccc;
        image {
          width: 90rpx;
          height: 90rpx;
          margin-top: -40rpx;
          margin-right: -80rpx;
        }
        view {
          line-height: 40rpx;
        }
        .rightNumber::before {
          content:'-';
          display: inline;
          margin-right: 10rpx;
        }
        .rightNumber::after {
          content:'-';
          display: inline;
          margin-left: 10rpx;
        }
        .useBtn {
          font-size: 24rpx;
          border: 1px solid #fff;
          width: 120rpx;
          height: 40rpx;
          line-height: 40rpx;
          color: #fff;
          border-radius: 20rpx;
        }
      }
    }
  }
  .noUser {
    text-align: center;
    border-bottom: 1px solid #ccc;
    padding-bottom: 10rpx;
    margin-top: 80rpx;
  }
  .coupon {
    position: relative;
    height: 150rpx;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
  }
  .tips {
    width: 100%;
    height: 90rpx;
    background-color: #cec3ad;
    color: #000;
    font-size: 28rpx;
    color: rgb( 97, 82, 71);
    padding-left: 30rpx;
    line-height: 90rpx;
    box-sizing: border-box;
  }
  .couponBox {
    padding: 30rpx 30rpx;
    box-sizing: border-box;
  }
  /* 优惠券背景颜色 */
  .coupon-yellow {
    background-color: #c49c62;
  }
  /* 下边框的波浪  */
  .coupon-wave-left::before,
  .coupon-wave-right::after {
    content: '';
    position: absolute;
    bottom: -14rpx;
    height: 20rpx;
    width: 120%;
    background-image: radial-gradient(#cec3ad 0, #cec3ad 8rpx, transparent 8rpx);
    background-size: 20rpx 20rpx;
    background-position: center center;
    z-index: 1;
  }
  .coupon-wave-left::before {
    left: -11rpx;
  }
  .coupon-wave-left::after {
    left: -11rpx;
  }
  // 不使用
  .noUseBtn {
    width: 120px;
    height: 80rpx;
    background-color: red;
    font-size: 32rpx;
    color: #fff;
    text-align: center;
    line-height: 80rpx;
    border-radius: 50rpx;
    background-color: #c49c62;
    margin: 0 auto;
    margin-top: 100rpx;
  }
</style>




