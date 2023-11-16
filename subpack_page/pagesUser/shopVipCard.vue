<template>
  <view class="content">
    <view class="btn">
      <view class="rules" @click="rulesAlert">规则</view>
      <view class="rules" @click="detailList">明细</view>
    </view>
    <!-- 会员卡信息 -->
    <view class="cardBox">
      <view class="cardInfo">
        <view class="left">
          <view class="num">商城会员卡</view>
          <view class="only">仅限商城站内使用</view>
        </view>
        <view class="center">
          <view class="text">卡内余额(元)</view>
          <view class="text">{{form.userBalance == null ? 0 : form.userBalance}}</view>
        </view>
        <view class="right">
          <image src="../../static/user/shopVipBg.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- 会员卡详情 -->
    <view class="info">
      <view class="title">一卡全包~省钱~省力 更省心</view>
      <image class="lineImg" src="../../static/user/line.png" mode="scaleToFill" />
      <view class="textContent">
        <view class="line">
          <image src="../../static/user/hua.png" mode="scaleToFill" /> 官方发行
          <image src="../../static/user/hua.png" mode="scaleToFill" />
        </view>
        <view class="security">商城官方发行三年有效</view>
      </view>
      <view class="textContent">
        <view class="line">
          <image src="../../static/user/hua.png" mode="scaleToFill" /> 全品类通用
          <image src="../../static/user/hua.png" mode="scaleToFill" />
        </view>
        <view class="security">商城官方发行三年有效</view>
      </view>
      <view class="textContent">
        <view class="line">
          <image src="../../static/user/hua.png" mode="scaleToFill" /> 充卡享优惠
          <image src="../../static/user/hua.png" mode="scaleToFill" />
        </view>
      </view>
      <view class="textContent" style="margin-top: 80rpx">
        <view class="line">
          <image src="../../static/user/hua.png" mode="scaleToFill" /> 支付便捷
          <image src="../../static/user/hua.png" mode="scaleToFill" />
        </view>
        <view class="security"></view>
      </view>
      <!-- 充值/用卡 -->
      <view class="button">
        <view class="topUp" @click="goTopUp">我要充值</view>
        <view @click="indexurl" class="topUp">我要用卡</view>
      </view>
      
    <view style="height: 100rpx"></view>
    </view>
    <!-- 规则 -->
    <BottomAlert :alertMaskHiden="true" :sc="fuClassName.rules">
		<view class="chachaBox">
			<image class="chacha" @click="hideAlert('rules')" src="../../static/user/chacha.png" mode="scaleToFill" />
		</view>
       <view class="rulesContent">
		   <scroll-view style="height: 660upx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
			   <view class="condition">使用条件</view>
			   <view class="list">1.订单全部金额均可使用 <br /> 2.积分数量大于100个(含);具体以页面实际可用积分量为准;
			     <br /> 3.您当前优享值为100000积分支付，实际支付金额以页面显示为准 </view>
			   <view class="condition">使用数量</view>
			   <view class="list">1.订单全部金额均可使用 <br /> 2.积分数量大于100个(含);具体以页面实际可用积分量为准;
			     <br /> 3.您当前优享值为100000积分支付，实际支付金额以页面显示为准 </view>
		   </scroll-view>
      </view>
    </BottomAlert>
  </view>
</template>

<script>
import BottomAlert from '@/components/goods/bottomAlert'
  export default {
    data() {
      return {
		  form:{
			  userBalance:null,//账户余额
		  },
		  
        fuClassName: {
          rules: 'none'
        }
      }
    },
    onLoad() {},
	onShow() {
		this.getye()
	},
    components: {
      BottomAlert
    },
    methods: {
		//账户余额
		getye(){
			this.$Request.getT('/mms/wx/v1/getUserCardInfo').then(res => {
				if (res.code == 200) {
					this.form = res.data;
				}
			})
		},
      // 详细列表
      detailList() {
        uni.navigateTo({
          url: '/subpack_page/pagesUser/vipCardDetailsList'
        })
      },
      // 去充值
      goTopUp() {
        uni.navigateTo({
          url: '/subpack_page/pagesUser/vipCardTopUp'
        })
      },
	  indexurl(){
		  uni.reLaunch({
		    url: '/pages/index/index'
		  })
	  },
      // 规则
      rulesAlert() {
        this.fuClassName.rules = 'show' 
      },
      hideAlert(key) {
        this.fuClassName[key] = 'none'
      },
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    .btn {
      display: flex;
      justify-content: flex-end;
      padding-top: 30rpx;
      box-sizing: border-box;
      .rules {
        width: 140rpx;
        height: 60rpx;
        border: 1px solid #c1906c;
        text-align: center;
        line-height: 60rpx;
        color: #c1906c;
        margin-right: 30rpx;
        font-size: 30rpx;
      }
    }
    .cardBox {
      padding: 40rpx 50rpx;
      box-sizing: border-box;
    }
    .cardInfo {
      height: 390rpx;
      width: 100%;
      border-radius: 30rpx;
      background-color: #bd8145;
      padding: 40rpx 0rpx 10rpx;
      box-sizing: border-box;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .left {
        padding: 0 30rpx;
        box-sizing: border-box;
        display: flex;
        justify-content: space-between;
        .num {
          font-size: 32rpx;
          color: #fff;
          font-weight: bold;
        }
        .only {
          font-size: 20rpx;
          color: #fff;
          background-color: rgba(250, 250, 250, 0.2);
          height: 40rpx;
          line-height: 40rpx;
          border-radius: 20rpx;
          padding: 0 20rpx;
          box-sizing: border-box;
        }
      }
      .center {
        display: block;
        margin: 0 auto;
        .text {
          color: #edddcd;
        }
        .text:nth-child(1) {
          font-size: 28rpx;
        }
        .text:nth-child(2) {
          font-size: 40rpx;
          font-weight: bold;
          color: #fff;
        }
      }
      .right {
        image {
          width: 100%;
          height: 100rpx;
        }
      }
    }
    .info {
      .title {
        font-size: 32rpx;
        padding: 20rpx 80rpx;
        box-sizing: border-box;
      }
      .lineImg {
        height: 30rpx;
        width: 100%;
        transform: rotate(180deg)
      }
      .textContent {
        padding: 0 80rpx;
        .line {
          display: flex;
          margin-top: 40rpx;
          color: #bd8145;
          image {
            width: 30rpx;
            height: 30rpx;
            display: block;
            margin-top: 6rpx;
            margin-left: 10rpx;
            margin-right: 10rpx;
          }
        }
        .security {
          margin-left: 50rpx;
          margin-top: 10rpx;
        }
      }
      .button {
        display: flex;
        justify-content: space-around;
        padding: 0 100rpx;
        box-sizing: border-box;
        margin-top: 100rpx;
        view {
          width: 220rpx;
          height: 65rpx;
          border: 1px solid #c1906c;
          color: #c1906c;
          font-size: 30rpx;
          text-align: center;
          line-height: 65rpx;
          border-radius: 50rpx;
        }
      }
    }
    .chachaBox {
      text-align: right
    }
    .chacha {
      width: 50rpx;
      height: 50rpx;
      margin-top: 30rpx;
      margin-right: 30rpx;
    }
    .rulesContent {
        padding: 0rpx 40rpx;
        padding-bottom: 40rpx;
   //      height: 600rpx;
		 // overflow-y: scroll;
		 box-sizing: border-box;
        .condition {
          margin-bottom: 15rpx;
          margin-top: 30rpx;
        }
        .list {
          line-height: 45rpx;
        }
      }
  }
</style>




