<template>
	<view class="content">
		<view class="topTab">
			<view class="logoist">
				订单编码：{{logisform.billCode == null ? '' : logisform.billCode}}
			</view>
			<view style="margin: 20rpx 0;" class="logoist">
				快递：{{logisform.express == null ? '' : logisform.express}}
			</view>
			<view style="margin: 20rpx 0;" class="logoist">
				快递单号：{{logisform.expressId == null ? '' : logisform.expressId}}
			</view>
		</view>
  </view>
</template>
<script>
export default {
    data() {
		return {
			logisform:{
				billCode:'',
				Carry:'',
				express:'',
				expressId:''
			},
		}
    },
    onLoad(options) {
		if(options.billCode){
			this.getlogistics(options.billCode)
		}
	},
	onShow() {
		
	},
    methods: {
		// 公共方法
		getlogistics(billCode){
			this.logislist=[]
			this.$Request.getT(`/mms/wx/v1/getMyExpress/${billCode}`).then(res => {
				if(res.code==200){
					this.logisform=res.data
					// this.logislist=res.data
				}	
			})
		},
    },
    
  }
</script>

<style lang="scss" scoped>
	.logoist{
		border-bottom: 2rpx solid #adadad;
		padding: 25rpx 0;
	}
	.topTab{
		    // background-color: #f7f6f4;
		    padding: 28rpx;
	}
	.list{
		margin-top: 20rpx;
		background-color: #f7f6f4;
		padding: 32rpx 0 32rpx 32rpx;
	}
.u-node {
		width: 44rpx;
		height: 44rpx;
		border-radius: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #d0d0d0;
	}
	
	.u-order-title {
		color: #333333;
		// font-weight: bold;
		font-size: 32rpx;
	}
	
	.u-order-desc {
		color: rgb(150, 150, 150);
		font-size: 28rpx;
		margin-bottom: 6rpx;
	}
	
	.u-order-time {
		color: #c8c8c8;
		font-size: 26rpx;
		margin-top: 15rpx;
	}
</style>