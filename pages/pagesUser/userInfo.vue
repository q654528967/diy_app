<template>
  <view class="content">
    <view class="info">
      <image src="../static/index/pro.png" mode="scaleToFill" />
      <view class="text">用户名</view>
    </view>
    <!-- <image
          src=""
          mode="scaleToFill"
         /> -->
    <!-- 绑定手机 -->
    <view class="bindPhone">
      <view class="inputPhone">
        <image src="../static/user/phoneIcon.png" mode="scaleToFill" />
        <input v-model="phoneNum" placeholder="输入捆绑手机号码" placeholder-class="input-placeholder" @input="clickphone" />
      </view>
      <view class="bind">立即捆绑</view>
    </view>
    <!-- 我的订单 -->
    <view class="order">
      <view class="left">我的订单</view>
      <view class="right">查看全部订单</view>
    </view>
     <view class="state">
       <view class="lis">
        <image
          src="../static/user/walletIcon.png"
          mode="heightFix"
        />
        <view>待付款</view>
       </view>
        <view class="lis">
        <image
          src="../static/user/walletIcon.png"
          mode="heightFix"
        />
        <view>待发货</view>
       </view>
        <view class="lis">
        <image
          src="../static/user/carIcon.png"
          mode="heightFix"
        />
        <view>已发货</view>
       </view>
        <view class="lis">
        <image
          src="../static/user/completedIcon.png"
          mode="heightFix"
        />
        <view>已完成</view>
       </view>
        <view class="lis">
        <image
          src="../static/user/waitIcon.png"
          mode="heightFix"
        />
        <view>待评价</view>
       </view>
     </view>
     <view class="list">
      <view class="lis">
        <view class="left">购物车</view>
        <view class="right">
        <view class="num">X2</view>
        <!-- <image
          src="../static/right.png"
          mode="scaleToFill"
        /> -->
        </view>
      </view>
      <view class="lis">
        <view class="left">我的积分</view>
        <view class="right">
        <view class="num">30000积分</view>
        <image
          src="../static/right.png"
          mode="scaleToFill"
        />
        </view>
      </view>
      <view class="lis">
        <view class="left">我的优惠券</view>
        <view class="right">
        <!-- <view class="num">30000积分</view> -->
        <image
          src="../static/right.png"
          mode="scaleToFill"
        />
        </view>
      </view>
      <view class="lis">
        <view class="left">我的会员卡</view>
        <view class="right">
        <view class="num">30000积分</view>
        <image
          src="../static/right.png"
          mode="scaleToFill"
        />
        </view>
      </view>
     </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        title: 'Hello',
        phoneNum: '',
      }
    },
    onLoad() {},
    methods: {
      // 绑定手机
      clickphone() {}
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    .info {
      image {
        width: 190rpx;
        height: 190rpx;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        margin-top: 180rpx;
      }
      .text {
        text-align: center;
        margin-top: 40rpx;
      }
    }
    .bindPhone {
      display: flex;
      height: 120rpx;
      line-height: 120rpx;
      align-items: center;
      justify-content: space-between;
      padding: 0 50rpx;
      border-bottom: 1rpx solid #d2d2d2;
      margin-top: 40rpx;
      box-sizing: border-box;
      .inputPhone {
        display: flex;
      }
      image {
        width: 30rpx;
        height: 40rpx;
        margin-right: 30rpx;
      }
      input {
        font-size: 36rpx;
      }
      .bind {
        font-size: 34rpx;
        height: 70rpx;
        line-height: 70rpx;
        width: 200rpx;
        border: 1px solid #e99785;
        color: #e99785;
        text-align: center;
        border-radius: 50rpx;
      }
    } // 订单
    .order {
      display: flex;
      justify-content: space-between;
      font-size: 32rpx;
      padding: 0 40rpx;
      height: 100rpx;
      line-height: 130rpx;
      border: 1rpx solid #d2d2d2;
    }
    .state {
      display: flex;
      justify-content: space-around;
      padding: 40rpx 30rpx;
      border: 1px solid #d2d2d2;
      box-sizing: border-box;
      .lis {
        font-size: 30rpx;
        text-align: center;
        color: rgb( 128, 128, 128 );
        image {
          height: 46rpx;
          display: block;
          margin: 0 auto;
          margin-bottom: 10rpx;
        }
      }
    }
    .list {
      .lis {
        height: 120rpx;
        line-height: 120rpx;
        border-bottom: 1rpx solid #d2d2d2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rpx 40rpx;
        padding-right: 70rpx;
        font-size: 32rpx;
        box-sizing: border-box;
        .left {}
        .right {
          display: flex;
          align-items: center;
          .num {
            color: #e99785;
          }
          image {
            height: 32rpx;
            width: 15rpx;
            margin-left: 20rpx;
          }
        }
      }
    }
  }
</style>




