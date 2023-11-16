<template>
  <view class="content">
    <view class="homePro">
      <view class="pro">
        <view class="proBox" v-for="(item, index) in proData" :key="index" @click.stop="buyOrChange(item)">
			<image class="proImg" :src="item.proImgs" mode="scaleToFill" />
			<view class="proName">{{item.name == null ? '' : item.name}}</view>
			<view class="price">￥{{item.salePrice == null ? 0 : item.salePrice}}</view>
			<view class="number">({{item.pointsValue == null ? 0 : item.pointsValue}}积分)</view>
			<view class="btn">
				<view class="left">购买/兑换</view>
				<view @click.stop="shopclick(item)" class="right">
				  <image src="../../static/index/shopIcon.png" mode="scaleToFill" />
				</view>
			</view>
        </view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    name: "navBar",
    props: {
      proData: '',
    },
    data() {
      return {
      };
    },
    methods: {
      // 点击购买或兑换
		buyOrChange(item) {
			this.$emit('buyOrChange',item)
    },
		shopclick(item){
			this.$emit('shopclick',item)
	}
    },
  };
</script>
<style lang="scss" scoped>
  .content {
	  background-color: #fff;
    .homePro {
      // margin-top: 60rpx;
      .bg {
        // background: url('https://s2.loli.net/2022/08/08/b7Bh8Qnpug31wma.png') no-repeat 100%;
        // background-size: cover;
        height: 300rpx;
        width: 100%;
		image{
			width: 100%;
			height: 100%;
		}
      }
	  .pro::-webkit-scrollbar {
	  	display: none;
	  	width: 0 !important;
	  	height: 0 !important;
	  	-webkit-appearance: none;
	  	background: transparent;
	  }
      .pro {
        width: 100%;
        display: flex;
        flex-wrap: wrap;
        // overflow-x: scroll;
        
        .proBox {
          padding: 20rpx 20rpx;
          box-sizing: border-box;
          flex: 0 0 33.3%;
          background-color: #fff;
          padding-bottom: 50rpx;
      	    margin-bottom: 15rpx;
          image {
            width: 100%;
            height: 200rpx;
          }
          .proName {
            font-size: 30rpx;
            text-align: left;
            margin-top: 10rpx;
            margin-bottom: 20rpx;
          }
          .price {
            font-size: 28rpx;
            color: rgb( 89, 87, 87);
          }
          .number {
            font-size: 26rpx;
            color: rgb( 89, 87, 87);
          }
          .btn {
            display: flex;
            justify-content: space-between;
            .left {
              width: 130rpx;
              height: 55rpx;
              border-radius: 50rpx;
              text-align: center;
              line-height: 55rpx;
              font-size: 24rpx;
              color: #e99785;
              border: 1rpx solid #e99785;
              margin-top: 30rpx;
            }
            .right {
              image {
                width: 45rpx;
                height: 45rpx;
                display: flex;
                margin-top: 10rpx;
              }
            }
          }
        }
      }
    }
  }
</style>