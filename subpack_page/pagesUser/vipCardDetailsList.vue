<template>
	<view class="content">
		<view class="">
			<!-- <z-paging ref="paging" v-model="dataList" @query="queryList"> -->
				<view class="inv-h-w">
					<view :class="['inv-h',Inv==0?'inv-h-se':'']" @click="Inv=0">已到账记录</view>
					<view :class="['inv-h',Inv==1?'inv-h-se':'']" @click="Inv=1">消费记录</view>
					<!-- <view :class="['inv-h',Inv==2?'inv-h-se':'']" @click="Inv=2">团体预约</view> -->
				</view>
				<!-- <view class="topTab">
					<view v-for="(item, index) in state" :key="index" :class="[stateIndex == index ? 'state selectCss' : 'state']" @click="clickTab(index)">{{item.text}}</view>
				</view> -->
				<view v-show="Inv == 0">
					<view v-for="(item, index) in receivedlist" :key="index" class="list" style="display: block">
					  <view v-if="item.cashTypes==1" class="title">您的账户赠送金额<text class="price">{{item.changeCash}}</text>元已到账</view>
					  <view v-else class="title">您的账户充值金额<text class="price">{{item.changeCash}}</text>元已到账</view>
					  <view class="time">{{item.createTime}}</view>
					</view>
				</view>
				<view class="" v-show="Inv == 1">
					<!-- 消费记录 -->
					<view v-for="(item, index) in expendilist" :key="index" class="list consume">
					  <view class="title">
						<view class="up">您的账户消费记录明细</view>
						<view class="down">{{item.createTime}}</view>
					  </view>
					  <view class="price">￥{{item.changeCash}}</view>
					</view>
				</view>
			<!-- </z-paging> -->
		</view>
		
	</view>
</template>

<script>
  import TopTab from '../components/order/topTab'
  import NoData from '../components/noData'
  export default {
    data() {
      return {
		  receivedlist:[
			  {
				  changeCash:'1000',
				  time:'2021-02-12',
				  createTime:'2021-02-12'
			  }
		  ],
		  expendilist:[],
		  Inv:0,
		  stateIndex: 0,
        state: [{
          text: '已到账记录',
        }, {
          text: '未到账记录',
        }, {
          text: '消费记录',
        }]
      }
    },
    onLoad() {},
	onShow() {
		this.getlist()
		this.expenditure()
	},
    methods: {
		// 充值
		getlist(){
			this.receivedlist=[]
			this.$Request.getT(`/mms/wx/v1/getCardHistory/${1}`).then(res => {
				if(res.code==200){		
					this.receivedlist=res.data	
					
				}	
			})
		},
		// 支出
		expenditure(){
			this.expendilist=[]
			this.$Request.getT(`/mms/wx/v1/getCardHistory/${0}`).then(res => {
				if(res.code==200){		
					this.expendilist=res.data	
				}	
			})
		},
      clickTab(e) {
        console.log(e);
      }
    },
    components: {
      TopTab,
      NoData
    }
  }
</script>

<style lang="scss" scoped>
	.inv-h-w{
		background-color: #FFFFFF;
		height: 100upx;
		display: flex;
		.inv-h{
			font-size: 34upx;
			flex: 1;
			text-align: center;
			// color: #C9C9C9;
			height: 100upx;
			line-height: 100upx;
		}
		.inv-h-se{
			color: #e99785;
			border-bottom: 2upx solid #e99785;
		}
	}
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
    display: flex;
    justify-content: space-between;
    height: 200rpx;
    width: 100%;
    background-color: #ffdfbf;
    margin-top: 15rpx;
    padding: 30rpx 40rpx;
    box-sizing: border-box;
    .title {
      // display: flex;
    }
    .price {
      color: #bd9463;
    }
    .time {
      font-size: 30rpx;
      color: #000;
      margin-top: 20rpx;
    }
  }
  .consume {
    padding: 10rpx 40rpx;
    justify-content: flex-start;
     image {
      width: 200rpx;
      height: 100%;
      margin-right: 20rpx;
     }
     .title {
      font-size: 32rpx;
      .down {
        margin-top: 60rpx;
      }
     }
     .price {
      margin-top: 100rpx;
      margin-left: 110rpx;
     }
  }
</style>




