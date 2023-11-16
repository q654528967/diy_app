<template>
	<view class="content">
		<view style=" padding: 5% 0 0 10%;" class="">
			<text style="font-size: 32px;font-family: cursive;">{{status}}</text>
			<view v-if="product.payState==1 && product.adminState== 0 " style="font-size: 14px;padding: 3% 0;color: #8e8b8b;" class="">{{sattsname}}</view>
		</view>
		<view style="padding: 6% 2%;border-radius: 0 0 15px 15px;">
			<view @click="deailtlick" style="background-color: #fff;padding: 2% 5%; border-radius: 7px;" class="">
				<view style="display: flex;margin: 5% 0 2%;" class="">
					<view style="width: 180upx;height: 180upx;" class="">
						<img style="width: 100%;height: 100%;border-radius: 20upx;" :src="product.listImg" alt="">
					</view>
					<view style="width: 64%;margin-left: 3%;" class="">
						<view style="font-size: 18px; line-height: 28px; height: 56px;" class="ellipsisduo">{{product.roomName}}</view>
						<view style="display: flex;justify-content: space-between;" class="">
							<view style="color: #c1c0c0;font-size: 13px;">{{product.inTime.substring(0,10) }} 至 {{product.outTime.substring(0,10) }}</view>
							<view style="font-size: 13px;" >{{product.days}}晚</view>
						</view>
						<!-- <view style="color: #cecece;font-size: 12px; margin-top: 3%;" class="">
							<text>{{product.early}}</text>	
						</view> -->
					</view>
				</view>
				<view style="display: flex;align-items: center;margin-bottom: 3%;" class="">
					<text style="margin-left: 30%;font-size: 18px;">￥{{product.billValue}}</text>
				</view>
			</view>
		</view>
		<view class="usecss">
			<text style="font-size: 12px;color: #949393;padding: 3% 0;display: inline-block;">订单信息</text>
			<view class="">
				<text class="usfor">入住人</text>
				<text class="usernam">{{userform.username}}</text>
			</view>
			<view class="">
				<text class="usfor">手机号</text>
				<text class="usernam">{{userform.phone}}</text>
			</view>
			<view class="">
				<text class="usfor">订单号</text>
				<text class="usernam">{{userform.billCode}}</text>
			</view>
			<view class="">
				<text class="usfor">到店时间</text>
				<text class="usernam">{{userform.storeTime}}</text>
			</view>
			<view class="">
				<text class="usfor">下单日期</text>
				<text class="usernam">{{userform.createDate}}</text>
			</view>
			<view class="">
				<text class="usfor">支付方式</text>
				<text class="usernam">微信支付</text>
				<!-- <text class="usernam">{{userform.paymentmethod}}</text> -->
			</view>
		</view>
		<view class="usecss">
			<view class="">
				<text class="usfor">订单金额</text>
				<text class="usernam">￥{{userform.totals == null ? 0 : userform.totals}}</text>
			</view>
			<!-- <view class="">
				<text class="usfor">优惠金额</text>
				<text class="usernam">-￥{{userform.usercashValue == null ? '' : userform.usercashValue}}</text>
			</view> -->
			<view class="">
				<text class="usfor">余额支付</text>
				<text class="usernam">￥{{userform.usercashValue == null ? 0 : userform.usercashValue}}</text>
			</view>
			<view class="">
				<text class="usfor">微信支付金额</text>
				<text class="usernam">￥{{userform.payTotals == null ? 0 : userform.payTotals}}</text>
			</view>
		</view>
		<view style="padding: 6% 3% 5%;" class="">
			<view class="">
				<img style='width: 15px;height: 15px;' src="../../static/image/sm.png" alt="">
				<text style="margin-left: 3%;color: #a7a7a7;font-size: 13px;">温馨提示</text>
			</view>
			<view style="display: flex;justify-content: space-between;font-size: 12px;padding: 0 0 0 7%;    margin-top: 5%;" class="">
				<text style="width: 20%;color: #a7a7a7;">取消规则</text>
				<view style="color: #696868;font-size: 12px;">下单后<text style="color: #bf2c2c;">不可取消修改</text>，若未入住将收取您全额房费</view>
			</view>
			<view style="display: flex;align-items: center;font-size: 12px;padding: 0 0 0 7%; margin: 5% 0;" class="">
				<text style="width: 20%;color: #a7a7a7;">开取发票</text>
				<view style="color: #696868;font-size: 12px;">如需发票，请向酒店索取。</view>
			</view>
			<view style="display: flex;align-items: center;font-size: 12px;padding: 0 0 0 7%;"  class="">
				<text style="color: #a7a7a7;width: 20%;">下单级别</text>
				<view style="color: #696868;font-size: 12px;">微信会员</view>
			</view>
		</view>
		<view class="page-bottom">
			<view style="width: 100%;height: 100%;display: flex;justify-content: space-between;align-items: center;">
				<view v-if="product.payState==1 && product.adminState == 0" @click.stop="cancel" style="width: 33%;height: 100%;text-align: center;line-height: 65px;border-right: 1px solid #bd9e4e;" class="">
					<text class="tots">取消订单</text>
				</view>
				<view style="width: 33%;height: 100%;text-align: center;line-height: 65px;background-color: #bd9e4e;color: #fff;" @click="oncemore" class="">
					<text style="font-size: 18px;">再次预订</text>
				</view>
				<view v-if="product.payState==1 && product.adminState== 0 " style="width: 33%;height: 100%;" >
					<u-button :custom-style="customStyle" @click="toFavorite">立即支付</u-button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				billCode:0,
				payState:0,
				customStyle:{
					textAlign: 'center',
					color: '#FEFEFE',
					background: '#bd9e4e',
					height: '100%',
					fontSize: '18px',
					borderRadius: '0'
				},
				userform:{
					username:'',
					phone:'',
					billCode:'',
					storeTime:'',
					createDate:'',
					paymentmethod:'',
					totals:'',
					usercashValue:'',
					usercashValue:'',
					payTotals:''
				},
				status:'',
				sattsname:'您的订单还未支付喔，请尽快支付',
				product:{
					days:'',
					inTime:'',
					outTime:'',
					roomName:'',
					listImg:'',
					billValue:'',
					product:'',
					roomsId:''
				},
				labelPosition: 'left',
				border: false,
			}
		},
		onLoad(options) {
			// if(options.payState){
			// 	this.payState=options.payState
			// 	if(options.payState == 1){
			// 		this.status='待支付'
			// 	}else if(options.payState == 2){
			// 		this.status='已支付'
			// 	}
			// }
			// if(options.roomsId){
			// 	// this.roomsId=options.roomsId
			// 	this.getroomsinfo(options.roomsId)
			// }
			if(options.billCode){
				// this.billCode=options.billCode
				this.getroomsinfo(options.billCode)
			}
			
		},
		onShow() {
			// this.getsurplus()
		},
		filters:{
			formatData(data){
				const nDate=new Date(data)
				const year= nDate.getFullYear()
				const month=nDate.getMonth().toString().padStart(2,0)
				const day=nDate.getDay().toString().padStart(2,0)
				return year+'-'+month+'-'+day
			}
		},
		methods: {
			//跳转详情
			deailtlick(){
				let roomsId=this.product.roomsId
				uni.navigateTo({
					url: `/pages/roomlist/roomdetailed?roomsId=${roomsId}&type=${1}`
				});
			},
			// 立即支付
			toFavorite(){
				let parame={
					billCode:this.product.billCode
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
								uni.reLaunch({
									url: `/pages/pagesUser/reservationorder`
								})
								console.log(res)
							},
							fail: function (res) {
								console.log(res) 
							},
						
						})
					}
				})
			},
			// 取消订单
			cancel(){
				let that=this
				uni.showModal({
				    title: '确认取消？',
				    success: function (res) {
				        if (res.confirm) {
							let parame={
								billCode:that.product.billCode
							}
							that.$Request
								.post('/mms/wx/v1/rooms/cancelOrder',parame).then(res => {
									if(res.code==200){
										that.$api.msg('取消成功')
										uni.reLaunch({
											url: `/pages/pagesUser/reservationorder`
										})
									}else{
										that.$api.msg(res.msg)
									}
							})
				        }
				    }
				});
			},
			// 查询商品信息
			getroomsinfo(billCode){
				let parame={
					billCode:billCode
				}
				this.$Request.post(`/mms/wx/v1/rooms/getOrderInfo`,parame).then(res => {
					if(res.code==200){		
						this.product=res.data
						this.userform=res.data
						if(this.product.payState == 1 && this.product.adminState== 0){
							this.status='待支付'
						}else if(this.product.payState==2 && this.product.adminState== 1 ){
							this.status='已支付'
						}else if(this.product.payState==1 && this.product.adminState== 3 ){
							this.status='已取消'
						}
						// this.payValuetot=res.data.cost
						// this.product.billValue=res.data.cost
						
					}
				})
			},
			// 再次预定
			oncemore(){
				uni.reLaunch({
					url: `/pages/roomlist/index`
				});
			}
		},
		
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.content{
		background-color: #f9f9f9;
		// height: 100%;
	}
	.usecss{
		padding: 2% 3% 5%;
		border-bottom: 1px solid #d0cdcd;
	}
	.usfor{
		font-size: 14px;
		color: #949393;
		width: 85px;
		display: inline-block;
		text-align-last: justify;
		margin-right: 8%;
		margin-top: 3%;
	}
	.usernam{
		font-weight: 600;
		font-size: 15px;
	}
	/* 底部操作菜单 */
	.page-bottom{
		border-top: 2upx solid #e6e6e6;
		position:sticky;
		bottom:0;
		display: flex;
		justify-content: center;
		align-items: center;
		// width: 750upx;
		height: 133upx;
		background: white;
		z-index: 99999;
		.tots{
			font-size: 18px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #bd9e4e;
			// font-weight: 600;
		}
		.but{
			width: 35%;
			margin: 0 5%;
		}
		.pag-home{
			color: #C0C4CC;
			text-align: center;
			font-size: 24rpx;
			margin-right: 7%;
			image{
				width: 45rpx;
				height: 47rpx;
			}
		}
	}
</style>

