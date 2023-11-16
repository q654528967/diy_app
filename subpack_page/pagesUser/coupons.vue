<template>
  <view class="content">
    <TopTab :state="state" @clickTab="clickTab"></TopTab>
    <!-- 未使用 -->
    <view class="couponBox" v-show="index == 0">
		<view style="margin-top: 20rpx;" v-for="(item,index) in discountsList" :key='index' class="">
			<view v-if="item.custCouponsState==1" class="coupon coupon-wave-left  coupon-wave-right coupon-yellow">
			  <view class="couponInfo">
			    <view class="left">
			      <view class="num">￥{{item.free == null ? '' : item.free}}</view>
			      <view class="num">满{{item.min == null ? '' : item.min}}元可用</view>
			    </view>
			    <view class="center">
			      <view class="title">{{item.couponsName == null ? '' : item.couponsName}}</view>
			      <view class="time">有效期至:{{item.endTime == null ? '' : item.endTime}}</view>
			    </view>
			    <view @click="couponslick" class="right">立即使用</view>
			  </view>
			  <view class="tips">{{item.value2 == null ? '' : item.value2}}，</view>
			</view>
		</view>
    </view>
    <!-- 已使用 -->
    <view class="couponBox" v-show="index == 1">
		<view v-for="(item,index) in discountsList" :key='index' class="">
			<view v-if="item.custCouponsState==2" class="coupon coupon-wave-left  coupon-wave-right coupon-yellow" style="background-color: #ba8045">
			  <view class="couponInfo">
			    <view class="left">
			      <view class="num">￥{{item.free == null ? '' : item.free}}</view>
			      <view class="num">满{{item.min == null ? '' : item.min}}元可用</view>
			    </view>
			    <view class="center">
			      <view class="title">{{item.couponsName == null ? '' : item.couponsName}}</view>
			      <view class="time">{{item.startTime == null ? '' : item.startTime}}-{{item.endTime == null ? '' : item.endTime}}</view>
			    </view>
			    <view class="right" style="background-color: #ba8045"></view>
			  </view>
			  <view class="tips">{{item.value2 == null ? '' : item.value2}}，</view>
			</view>
			
		</view>
    </view>
    <!-- 已失效 -->
    <view class="couponBox" v-show="index == 2">
		<view v-for="(item,index) in discountsList" :key='index' class="">
			<view v-if="item.custCouponsState==3" class="coupon coupon-wave-left  coupon-wave-right coupon-yellow">
			  <view class="couponInfo">
			    <view class="left">
			      <view class="num">￥{{item.free == null ? '' : item.free}}</view>
			      <view class="num">满{{item.min == null ? '' : item.min}}元可用</view>
			    </view>
			    <view class="center">
			      <view class="title">{{item.couponsName == null ? '' : item.couponsName}}</view>
			      <view class="time">{{item.startTime == null ? '' : item.startTime}}-{{item.endTime == null ? '' : item.endTime}}</view>
			    </view>
				<view class="right" style="background-color: #c49c62;"></view>
			  </view>
			  <view class="tips">{{item.value2 == null ? '' : item.value2}}，</view>
			</view>
			
		</view>
    </view>
    <!-- 没数据展示 -->
    <NoData v-show="discountsList.length==0" text="暂无数据"></NoData>
  </view>
</template>

<script>
  import TopTab from '../components/order/topTab'
  import NoData from '../components/noData'
  export default {
    data() {
      return {
		  discountsList:[],//未使用
        index: 0,
        state: [{
          text: '未使用',
        }, {
          text: '已使用',
        }, {
          text: '已失效',
        }]
      }
    },
    onLoad() {},
	onShow() {
		this.getcoypon()
	},
    methods: {
		couponslick(){
			uni.switchTab({
				url: `/pages/index/index`
			})
		},
		clickTab(e) {
			console.log('e',e)
			this.index = e
		},
		// 查询优惠券
		getcoypon(){
			uni.showLoading({
				title:'加载中...'
			})
			this.$Request.post('/mms/wx/v1/myCoupons').then(res => {
				this.discountsList=[]
				this.backlogList=[]
				if(res.code==200){
					this.discountsList=res.data
					// this.backlogList=res.data	
				}
				uni.hideLoading();
			})
		},
    },
	
    components: {
      TopTab,
      NoData
    }
  }
</script>

<style lang="scss" scoped>
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
    }
  }
  .tips {
    width: 100%;
    height: 90rpx;
    background-color: #cec3ad;
    color: #000;
    font-size: 30rpx;
    color: rgb( 97, 82, 71);
    padding-left: 30rpx;
    line-height: 90rpx;
    box-sizing: border-box;
  }
  .coupon {
    position: relative;
    // height: 150rpx;
    width: 100%;
    margin: 0 auto;
    overflow: hidden;
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
</style>




