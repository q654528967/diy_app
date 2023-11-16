<template>
  <view class="content">
	  <view class="topTab">
	    <view v-for="(item, index) in state" :key="index" :class="[stateIndex == index ? 'state selectCss' : 'state']" @click="clickTab(index)">{{item.text}}</view>
	  </view>
    <!-- <TopTab :state="state" @clickTab="clickTab"></TopTab> -->
    <!-- 列表 -->
    <view class="list">
      <!-- 商品 -->
	  <text style="padding: 10rpx 30rpx;font-size: 28rpx;color: #989898" v-if="stateIndex==0">请您在1小时内完成付款，超时后会自动取消</text>
		<view class="title">
			<view class="left">
				<image src="../../static/user/houseIcon.png" mode="scaleToFill" /> 商品列表
			</view>
			<view class="right">{{status}}</view>
		</view>
		<view style="border-top: 10rpx solid #dadada;margin: 20rpx 0;" v-for="(item, index) in newList" :key="index"  class="">
			<view style="display: flex;justify-content: flex-end;padding: 30rpx;" v-if="stateIndex==3 || stateIndex==4" class="">
				<image @click="delet(item)" style="width: 38rpx;height: 38rpx;" src="../../static/sc.png" mode=""></image>
			</view>
			<view style="padding: 20rpx 30rpx;" class="">订单编号：{{item.billCode}}</view>
			<view v-for="(box, n) in item.billPacks" :key="n" class="">
				<view  class="pro">
					<view class="proInfo">
						<image :src="box.proUrl" mode="scaleToFill" />
						<view class="info">
							<view class="proTitle">{{box.productName}}</view>
							<view class="price">￥{{box.indentPrice == null ? '' : box.indentPrice}}</view>
							<view class="number">{{box.pointsValue}}积分</view>
						</view>
					</view>
					<view class="num">X{{box.counts == null ? '' : box.counts}}</view>
				</view>
			</view>
			<view class="">
				<view class="total">
					<view class="">共{{item.billPacks.length}}件商品 需付款:</view>
					<view class="num">￥{{item.billCash}}
					</view>
				</view>
				<view v-if="!stateIndex==0" style="padding: 15rpx 30rpx;" class="">
					支付时间：{{item.createDate}}
				</view>
				<image class="line" src="../../static/user/line.png" mode="scaleToFill" />
				<!-- 按钮操作 -->
				<view class="btn">
				  <view v-if="stateIndex==1 || stateIndex==2" @click.stop="refund(item)" class="apply">申请退款</view>
				  <view v-if="stateIndex==0" @click.stop="cancel(item.billCode)" class="cancel">取消订单</view>
				  <view v-if="stateIndex==0" @click.stop="payment(item.billCode)" class="cancel">去付款</view>
				  <view v-if="stateIndex==1" @click.stop="reminder(item)" class="cancel">我要催单</view>
				  <view v-if="stateIndex==2" @click.stop="logistics(item)" class="cancel">查看物流</view>
				  <view v-if="stateIndex==1 || stateIndex==2 || stateIndex==3 || stateIndex==4" @click.stop="againpayment(item)" class="cancel">再次购买</view>
				  <view v-if="stateIndex==2" @click.stop="receiving(item)" class="cancel">确认收货</view>
				</view>
			</view>
		</view>
    </view>
  </view>
</template>
<script>
// import TopTab from '@/components/order/topTab'
export default {
	// components: {
	//   TopTab
	// },
    data() {
		return {
			status:'待付款',
			newList:[
			  {
				  proUrl:'../../static/user/houseIcon.png',
				  productName:'五星级酒店专用',
				  indentPrice:'2300',
				  counts:'2'
			  }
			],
			stateIndex: 0,
			state: [
				{
					text: '待付款',
				}, 
				{
					text: '待发货',
				}, 
				{
					text: '已发货',
				}, 
				{
					text: '已完成',
				}, 
				{
					text: '已取消'
				},
			]
		}
    },
    onLoad(options) {
		if(options.statis){
			this.stateIndex=options.statis
			if(this.stateIndex==0){
				this.status='代付款'
				this.getbligation()
			}else if(this.stateIndex==1){
				this.status='待发货'
				this.getserve()
			}else if(this.stateIndex==2){
				this.status='已发货'
				this.shipped()
			}else if(this.stateIndex==3){
				this.status='已完成'
				this.getfinish()
			}
		}
		if(options.ishide){
			if(options.ishide == 53){
				this.stateIndex=1
				this.getserve()
			}
		}
	},
	onShow() {
		console.log('stateIndex',this.stateIndex)
		
		// console.log('btns',this.btnnum)
		if(this.stateIndex==0){
			this.getbligation()
		}else if(this.stateIndex==1){
			this.getserve()
		}else if(this.stateIndex==2){
			this.shipped()
		}else if(this.stateIndex==3){
			this.getfinish()
		}
	},
    methods: {
		clickTab(e) {
			console.log('e',e)
			this.stateIndex = e
			if(e==0){
				this.status='待付款'
				this.getbligation()
			}else if(e==1){
				this.status='待发货'
				this.getserve()
			}else if(e==2){
				this.status='已发货'
				this.shipped()
			}else if(e==3){
				this.status='已完成'
				this.getfinish()
			}else if(e==4){
				this.status='已取消'
				this.getcancel()
			}
		},
		// 待付款
		getbligation(){
			// let parame={
			// 	payState:1,
			// 	adminState:0
			// }
			this.post_list(0)
		},
		// 待发货
		getserve(){
			// let parame={
			// 	payState:2,
			// 	adminState:0
			// }
			this.post_list(1)	
		},
		// 已发货
		shipped(){
			// let parame={
			// 	payState:3,
			// 	adminState:0
			// }
			this.post_list(2)	
		},
		//已完成
		getfinish(){
			// let parame={
			// 	payState:2,
			// 	adminState:1
			// }
			this.post_list(3)	
		},
		//已取消
		getcancel(){
			// let parame={
			// 	// payState:2,
			// 	adminState:3
			// }
			this.post_list(4)	
		},
		// 公共方法
		post_list(parame){
			uni.showLoading({
				title: '加载中'
			});
			this.newList=[]
			this.$Request.getT(`/mms/wx/v1/myOrderNew/${parame}`).then(res => {
				if(res.code==200){
					this.newList=res.data
					uni.hideLoading();
				}	
			})
		},
		logistics(item){
			uni.navigateTo({
				url: `/pages/pagesUser/logistics?billCode=${item.billCode}`
			});
		},
		//催单
		reminder(item){
			let parame={
				billCode:item.billCode,
			}
			this.$Request.post('/mms/wx/v1//saveReminder',parame).then(res => {
				if(res.code==200){		
					this.$api.msg('催单成功')
				}else{
					this.$api.msg(res.msg)
				}	
			})
		},
		//再次购买
		againpayment(item){
			let parame={
				billCode:item.billCode,
			}
			this.$Request.post('/mms/wx/v1/reAddCartAndSettlement',parame).then(res => {
				if(res.code==200){		
					uni.switchTab({
						url: `/pages/index/car`
					});
				}	
			})
		},
		//申请退款
		refund(item){
			let that=this
			uni.showModal({
			    title: '确认申请退款？',
			    success: function (res) {
			        if (res.confirm) {
						let parame={
							billCode:item.billCode,
							refundReason:'申请退款'
						}
						that.$Request.post('/mms/wx/v1/refundOrder',parame).then(res => {
							if(res.code==200){
								setTimeout(function(){
									// uni.redirectTo({
									// 	url: `/pages/refund/aftersales`
									// })
									that.$api.msg('申请退款成功')
								},1000)	
							}else{
								that.$api.msg(res.msg)
							}
								
						})
			        }
			    }
			});
			
		},
		// 确认收货
		receiving(item){
			let parame={
				billCode:item.billCode,
			}
			this.$Request.post('/mms/wx/v1/saveReseviePro',parame).then(res => {
				if(res.code==200){		
					this.shipped()
				}	
			})
		},
		// 取消订单
		cancel(type){
			let that=this
			uni.showModal({
			    title: '确认取消？',
			    success: function (res) {
			        if (res.confirm) {
						let parame={
							billCode:type
						}
						that.$Request
							.post('/mms/wx/v1/orderCancel',parame).then(res => {
								if(res.code==200){
									that.getbligation()
								}
						})
			        }
			    }
			});
		},
		// 删除订单
		delet(item){
			let that=this
			uni.showModal({
			    title: '确认删除？',
			    success: function (res) {
			        if (res.confirm) {
						let parame={
							billCode:item.billCode,
						}
						that.$Request.post('/mms/wx/v1/orderDelete',parame).then(res => {
							if(res.code==200){		
								that.getcancel()	
							}	
						})
			            // console.log('用户点击确定');
			        }
			    }
			});
		},
		// 重新拉起支付
		payment(type){
			let parame={
				billCode:type
			}
			this.$Request.post('/mms/wx/v1/orderPay',parame).then(res => {
				if(res.code==200){
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
							console.log(res)
						},
						fail: function (res) {
							console.log(res) 
						},
					
					})
				}
			})
		},
    },
    
  }
</script>

<style lang="scss" scoped>
// @font-face{
// 	font-family:"bulingstyle";
// 	src: url('../font/CODE Bold.ttf');
// }
  .content {
	  .topTab {
	    height: 120rpx;
	    line-height: 120rpx;
	    background-color: #fff;
	    display: flex;
	    justify-content: space-around;
	    font-size: 32rpx;
	    padding: 0 10rpx;
	    box-sizing: border-box;
	    .state {
	      height: 110rpx;
	    }
	    .selectCss {
	      border-bottom: 2px solid #e99785;
	      color: #e99785;
	    }
	  }
    .list {
      .title {
        background-color: #fff;
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100rpx;
        line-height: 100rpx;
        padding: 0 35rpx;
        font-family: "SourceHanSansCN";
        font-size: 32rpx;
        color: rgb( 170, 115, 70);
        box-sizing: border-box;
        .left {
          image {
            width: 30rpx;
            height: 30rpx;
            margin-right: 10rpx;
          }
        }
      }
      .pro {
        display: flex;
        justify-content: space-between;
        // background-color: pink;
        padding-right: 30rpx;
        box-sizing: border-box;
        margin-top: 30rpx;
        .proInfo {
          display: flex;
          justify-content: space-between;
          padding: 0rpx 30rpx;
          image {
            width: 180rpx;
            height: 180rpx;
            margin-right: 30rpx;
          }
          .info {
            .proTitle {
              // font-family: bulingstyle;
              // font-family: bulingstyle;
              // font-size: 34rpx;
            }
            .price {
              font-size: 28rpx;
              color: rgb( 170, 115, 70);
              margin-top: 70rpx;
            }
            .number {
              font-size: 28rpx;
              color: rgb( 170, 115, 70);
            }
          }
        }
        .num {
          height: 180rpx;
          line-height: 180rpx;
          font-size: 32rpx;
          color: rgb( 170, 115, 70);
        }
      }
      .pro:nth-child(2) {
        margin-top: 0rpx;
      }
      .total {
        display: flex;
        justify-content: flex-end;
        font-size: 32rpx;
        padding: 0 30rpx;
        height: 80rpx;
        line-height: 80rpx;
        .num {
          color: rgb( 170, 115, 70);
        }
      }
      .line {
        height: 30rpx;
        width: 100%;
      }
      .btn {
        display: flex;
        justify-content: flex-end;
        padding: 0 30rpx;
        margin-top: 10rpx;
        box-sizing: border-box;
        .cancel {
          height: 70rpx;
          line-height: 70rpx;
          text-align: center;
          font-size: 32rpx;
          width: 160rpx;
          color: rgb( 170, 115, 70);
          border: 1px solid rgb( 170, 115, 70);
          margin-left: 30rpx;
        }
        .apply {
          height: 70rpx;
          line-height: 70rpx;
        }
      }
    }
  }
</style>