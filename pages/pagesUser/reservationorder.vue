<template>
  <view class="content">
	  <view class="topTab">
	    <view v-for="(item, index) in state" :key="index" :class="[stateIndex == index ? 'state selectCss' : 'state']" @click="clickTab(index)">{{item.text}}</view>
	  </view>
    <!-- <TopTab :state="state" @clickTab="clickTab"></TopTab> -->
    <!-- 列表 -->
    <view class="list">
      <!-- 商品 -->
	  <text style="padding: 10rpx 30rpx;font-size: 28rpx;color: #989898" v-if="stateIndex==1">请您在1小时内完成付款，超时后会自动取消</text>
		<view class="title">
			<view class="left">
				<image src="../../static/user/houseIcon.png" mode="scaleToFill" /> 订房列表
			</view>
			
		</view>
		<view style="border-top: 10rpx solid #dadada;margin: 20rpx 0;padding-bottom: 15rpx;" v-for="(item, index) in newList" :key="index"  class="">
			<view style="display: flex;justify-content: flex-end;padding: 30rpx;" v-if=" item.adminState==3" class="">
				<image @click="delet(item)" style="width: 38rpx;height: 38rpx;" src="../../static/sc.png" mode=""></image>
			</view>
			<view style="display: flex;justify-content: space-between;align-items: center;padding: 20rpx 30rpx;" class="">
				<view class="">订单编号：{{item.billCode}}</view>
				<!-- <view style="color: #aa7346;" v-if="item.adminState==1" class="right">待使用</view> -->
				<view style="color: #aa7346;" v-if="item.adminState==4" class="right">已使用</view>
				<view style="color: #aa7346;" v-if="item.adminState==3 && item.payState==1" class="right">已取消</view>
				<view style="color: #aa7346;" v-if="item.adminState==2 && item.payState==1" class="right">已删除</view>
				<view style="color: #aa7346;" v-if="item.payState==1 && item.adminState== 0 " class="right">待支付</view>
				<view style="color: #aa7346;" v-if="item.payState==2 && item.adminState== 1 " class="right">已支付</view>
				
			</view>
			<view @click="roomdetil(item)" class="pro">
				<view class="proInfo">
					<image :src="item.listImg" mode="scaleToFill" />
					<view class="info">
						<view class="proTitle">{{item.roomName}}</view>
						<view class="price">￥{{item.roomsPrice == null ? '' : item.roomsPrice}}</view>
					</view>
				</view>
				<view class="num">
					<text>{{item.roomsCount == null ? '' : item.roomsCount}}间</text>
					<view class="">{{item.days == null ? '' : item.days}}晚</view>
				</view>
			</view>
			<view class="">
				<view v-if="item.payState==1" class="total">
					<view class=""> 需付款:</view>
					<view class="num">￥{{item.billValue}}
					</view>
				</view>
				<view v-if="item.payState==2" style="padding: 15rpx 30rpx;" class="">
					支付时间：{{item.createDate}}
				</view>
				<image class="line" src="../../static/user/line.png" mode="scaleToFill" />
				<!-- 按钮操作 -->
				<view class="btn">
				  <view v-if=" item.payState==1 && item.adminState== null " @click.stop="cancel(item.billCode)" class="cancel">取消订单</view>
				  <view v-if="item.payState==1 && item.adminState== null " @click.stop="payment(item.billCode)" class="cancel">去付款</view>
				</view>
			</view>
		</view>
    </view>
  </view>
</template>
<script>
// import TopTab from '@/components/order/topTab'
export default {
    data() {
		return {
			status:'',
			newList:[],
			stateIndex: 0,
			state: [
				{
					text: '全部',
				}, 
				{
					text: '待支付',
				}, 
				{
					text: '待使用',
				}, 
				{
					text: '已使用',
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
				// this.status='全部'
				this.getbligation()
			}else if(this.stateIndex==1){
				// this.status='待支付'
				this.getserve()
			}else if(this.stateIndex==2){
				// this.status='待使用'
				this.shipped()
			}else if(this.stateIndex==3){
				// this.status='已完成'
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
		if(this.stateIndex==0){
			// this.status='全部'
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
				// this.status='全部'
				this.getbligation()
			}else if(e==1){
				// this.status='待支付'
				this.getserve()
			}else if(e==2){
				// this.status='待使用'
				this.shipped()
			}else if(e==3){
				// this.status='已使用'
				this.getfinish()
			}else if(e==4){
				// this.status='已取消'
				this.getcancel()
			}
		},
		// 全部
		getbligation(){
			let parames={
				
			}
			this.post_list(parames)
		},
		// 待支付
		getserve(){
			let parames={
				payState:1
			}
			this.post_list(parames)	
		},
		// 待使用
		shipped(){
			let parames={
				adminState:1
			}
			this.post_list(parames)	
		},
		//已使用
		getfinish(){
			let parames={
				adminState:4
			}
			this.post_list(parames)	
		},
		//已取消
		getcancel(){
			let parames={
				adminState:3
			}
			this.post_list(parames)	
		},
		// 公共方法
		post_list(parame){
			uni.showLoading({
				title: '加载中'
			});
			// this.newList=[]
			this.$Request.post(`/mms/wx/v1/rooms/myOrder`,parame).then(res => {
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
						that.$Request.post('/mms/wx/v1/rooms/cancelOrder',parame).then(res => {
							if(res.code==200){
								if(that.stateIndex == 0){
									that.getbligation()
								}else if(that.stateIndex == 1){
									that.getserve()
								}
								
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
						that.$Request.post('/mms/wx/v1/rooms/deleteOrder',parame).then(res => {
							if(res.code==200){
								if(that.stateIndex == 0){
									that.getbligation()
									// that.getcancel()
								}else if(that.stateIndex == 4){
									that.getcancel()
								}
									
							}	
						})
			            // console.log('用户点击确定');
			        }
			    }
			});
		},
		// 点击详情
		roomdetil(item){
			console.log('item',item)
			if(item.adminState==2 && item.payState==1){
				return
			}else{
				uni.navigateTo({
					url: `/pages/pagesUser/paymentdetails?roomsId=${item.roomsId}&billCode=${item.billCode}`
				});
			}
			
		},
		// 重新拉起支付
		payment(type){
			let parame={
				billCode:type
			}
			this.$Request.post('/mms/wx/v1/rooms/payOrder',parame).then(res => {
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
							if(this.stateIndex == 0){
								that.getbligation()
							}else if(this.stateIndex == 1){
								that.getserve()
							}
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
        align-items: center;
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
          // height: 180rpx;
          line-height: 40rpx;
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