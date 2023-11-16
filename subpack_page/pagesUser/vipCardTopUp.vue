<template>
  <view class="content">
    <view class="btn">
      <view class="rules" @click="rulesAlert">规则</view>
      <view class="rules" @click="detailList">明细</view>
    </view>
    <!-- 会员卡信息 -->
    <view class="cardBox">
      <view class="cardInfo" @click="shopVipCard">
        <view class="left">
          <view class="num">商城会员卡</view>
          <view class="only">仅限商城站内使用</view>
        </view>
        <view class="center">
          <view class="text">卡内余额(元)</view>
          <view class="text">{{balance == null ? 0 : balance}}</view>
        </view>
        <view class="right">
          <image src="../../static/user/shopVipBg.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- 会员卡详情 -->
    <view class="info">
      <!-- <view class="title">同一用户每个月所有面额仅限充值一次!</view> -->
    </view>
    <!--  -->
    <view class="numCard">
		<view v-for="(item, index) in recdata" :key="index" @click="changeMoney(index,item)" :class="{selStyle:active == index}"  class="card">
			<view class="posCard">
				<view class="left">
				  <view class="num">￥{{item.saleCash}}</view>
				  <view v-show="!item.freeCash==0" class="num">充{{item.saleCash}}赠{{item.freeCash}}</view>
				</view>
				<view class="right">{{item.typeName}}</view>
			</view>
		</view>
    </view>
    <view class="info">
      <!-- <view class="title">同一用户每个月所有面额仅限充值一次!</view> -->
    </view>
    <!-- 四个图腾 -->
    <view class="four">
      <view class="lis">
        <image src="../../static/user/tuten1.png" mode="scaleToFill" />
        <view class="text">官方发行</view>
      </view>
      <view class="lis">
        <image src="../../static/user/tuten1.png" mode="scaleToFill" />
        <view class="text">官方发行</view>
      </view>
      <view class="lis">
        <image src="../../static/user/tuten1.png" mode="scaleToFill" />
        <view class="text">官方发行</view>
      </view>
      <view class="lis">
        <image src="../../static/user/tuten1.png" mode="scaleToFill" />
        <view class="text">官方发行</view>
      </view>
    </view>
    <!-- qus -->
    <view class="qus">
      <view class="qusTitle">Q1 什么是商城会员卡？</view>
      <view class="qusContent">由陕西宾馆商城官方发行可在商城内使用的购物卡</view>
<!--      <view class="qusTitle">Q1 什么是积分商城会员卡？</view>
      <view class="qusContent">由陕西宾馆积分商城官方发行可在积分商城内使用的购物卡</view>
      <view class="qusTitle">Q1 什么是积分商城会员卡？</view>
      <view class="qusContent">由陕西宾馆积分商城官方发行可在积分商城内使用的购物卡</view> -->
    </view>
    <view style="height: 140rpx"></view>
    <!-- 充值按钮 -->
    <view class="bottom">
      <!-- <view class="left">充<text>{{saleCash}}</text>元得{{payCash}}元商城会员卡</view> -->
      <view class="right" @click="payvalue">立即充值</view>
    </view>
	 <!-- 规则 -->
	<BottomAlert :alertMaskHiden="true" :sc="fuClassName.rules">
		<scroll-view style="height: 660upx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
			  <view class="chachaBox">
				<image class="chacha" @click="hideAlert('rules')" src="../../static/user/chacha.png" mode="scaleToFill" />
			  </view>
			  <view class="rulesContent">
				<view class="condition">使用条件</view>
				<view class="list">1.订单全部金额均可使用 <br /> 2.积分数量大于100个(含);具体以页面实际可用积分量为准;
				  <br /> 3.您当前优享值为100000积分支付，实际支付金额以页面显示为准 </view>
				<view class="condition">使用数量</view>
				<view class="list">1.订单全部金额均可使用 <br /> 2.积分数量大于100个(含);具体以页面实际可用积分量为准;
				  <br /> 3.您当前优享值为100000积分支付，实际支付金额以页面显示为准 </view>
			  </view>
		</scroll-view>
	</BottomAlert>
  </view>
</template>

<script>
import BottomAlert from '@/components/goods/bottomAlert'
  export default {
	components: {
		BottomAlert
	},
    data() {
      return {
		  // saleCash:0,
		  // payCash:0,
		fuClassName: {
			rules: 'none'
		  },
		  form:{
			  
		  },
		  active:-1,
		   balance:null,//账户余额
		   recdata:[]
	  }
    },
    onLoad() {},
	onShow() {
		this.getye()
		this.getczlist()
	},
    methods: {
		//立即充值
		payvalue(){
			// this.$api.msg('充值')
			let nickName=uni.getStorageSync('nickName')
			if(nickName){
				if(this.active>=0){
					this.$Request.postzf('/mms/wx/v1/createUserCardOrder',this.form).then(res => {
						console.log(res)
						if(res.code ==500){
							uni.showToast({
								title:res.msg,
								icon: 'none'
							})
						}else{
							if(res.data){
								wx.requestPayment({
									appId:res.data.appId,
									billCode:res.data.billCode,
									billPaysCode:res.data.billPaysCode,
									timeStamp:res.data.timeStamp,
									paySign:res.data.paySign,
									nonceStr:res.data.nonceStr,
									package:res.data.package,
									signType:res.data.signType,
									success:function (res) { 
										console.log('成功',res)
										uni.navigateTo({
											url: `/pages/recharge/record`
										})
									},
									fail: function (res) {
										// uni.navigateTo({
										// 	url: `/pages/index/index`
										// })
										console.log('失败',res)
									},
								
								})	
								
							}else{
								uni.showToast({
									title:'购买失败，请联系客服人员！',
									icon: 'none'
								})
							}
								
						}
				
					})
				}else{
					this.$api.msg('请选择充值金额')
				}
					
			}else{
				uni.showModal({
					title: '请您登录购买',
					success: function (res) {
						if (res.confirm) {
							uni.navigateTo({
								url: `/pages/user/user`
							})
						}
					}
				});
				
			}
		},
		changeMoney(index,item) {
			console.log(index)
			console.log(item)
			// this.saleCash=item.saleCash
			// this.payCash=item.payCash
			this.active = index
			this.form=item
		},
		//账户余额
		getye(){
			this.$Request.getT('/mms/wx/v1/getCardCash').then(res => {
				if (res.code == 200) {
					if(res.data){
						this.balance=res.data.newCash
					}else{
						this.balance=0
					}
				}
			})
		},
		//充值列表
		getczlist(){
			this.$Request.getT('/mms/wx/v1/getCardTypeList/0').then(res => {
				if (res.code == 200) {
					this.recdata=res.data
				}
			})
		},
      detailList() {
        uni.navigateTo({
          url: '/subpack_page/pagesUser/vipCardDetailsList'
        })
      },
	   //规则
		rulesAlert() {
		  this.fuClassName.rules = 'show'
		},
		hideAlert(key) {
		  this.fuClassName[key] = 'none'
		},
      // shopVipCard(){
      //   console.log('33');
      //   uni.navigateTo({
      //     url: '/pages/pagesUser/shopVipCard'
      //   })
      // }
    }
  }
</script>

<style lang="scss" scoped>
	.selStyle{
		border: 1px solid red;
	}
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
        text-align: center;
        box-sizing: border-box;
      }
    }
    .numCard {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding: 30rpx;
      box-sizing: border-box;
	  .posCard {
		  position: relative;
		  width: 100%;
		  height: 100%;
		  display: flex;
		}
	  // .card_box{
		  .card {
		    width: 49%;
		    height: 230rpx;
		    background-color: #bd8145;
		    border-radius: 10rpx;
		    display: flex;
		    padding: 10rpx 0 0 15rpx;
		    margin-top: 30rpx;
		    box-sizing: border-box;
		    justify-content: space-between;
		    .left {
		      display: flex;
		      flex-direction: column;
		      justify-content: center;
		      color: #fff;
		      .num:nth-child(1) {
		        font-size: 40rpx;
		      }
		      .num {
		        font-size: 25rpx;
		      }
		    }
		    .right {
		      font-size: 20rpx;
		      background-color: #e5bb88;
		      border-radius: 20rpx 0 0 20rpx;
		      color: #fff;
		      height: 40rpx;
		      padding: 0 15rpx;
		      box-sizing: border-box;
			  line-height: 40rpx;
				position: absolute;
				right: 0;
				top: 0;
		    }
		  }
	  // }
      
      .selectCard {
        border: 1px solid red;
      }
    } // 四个图腾
    .four {
      display: flex;
      justify-content: space-between;
      padding: 0 30rpx;
      margin-top: 70rpx;
      box-sizing: border-box;
      .lis {
        image {
          width: 60rpx;
          height: 60rpx;
          display: block;
          margin: 0 auto;
        }
        .text {
          font-size: 32rpx;
          color: #c1906c;
          text-align: center;
          margin-top: 5rpx;
        }
      }
    } // 问答
    .qus {
      padding: 60rpx 10rpx;
      box-sizing: border-box;
      .qusTitle {
        font-size: 34rpx;
        font-family: "SourceHanSansCN";
        color: rgb( 89, 87, 87);
        font-weight: bold;
        margin-top: 20rpx;
      }
      .qusContent {
        font-size: 32rpx;
        font-family: "SourceHanSansCN";
        color: rgb( 89, 87, 87);
        margin-top: 10rpx;
      }
    }
    .bottom {
      height: 110rpx;
      line-height: 110rpx;
      width: 100%;
      background-color: #ccc;
      position: fixed;
      bottom: 0rpx;
      display: flex;
      justify-content: flex-end;
      .left {
        font-size: 30rpx;
        padding-left: 20rpx;
        text {
          color:#bd8145;
        }
      }
      .right {
        width: 230rpx;
        height: 110rpx;
        background-color: red;
        color: #fff;
        text-align: center;
        line-height: 110rpx;
        font-size: 34rpx;
        font-weight: bold;
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
	      height: 600rpx;
	      overflow-y: scroll;
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




