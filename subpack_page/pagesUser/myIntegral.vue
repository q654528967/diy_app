<template>
  <view class="content">
    
	<view class="">
		<z-paging ref="paging" v-model="dataList" @query="queryList">
			<view class="main">
			  <view class="number">
			    <view class="num">{{form.userPoints == null ? 0 : form.userPoints}}</view>积分
			  </view>
			</view>
			<view class="topTab">
			  <view v-for="(item, index) in state" :key="index" :class="[stateIndex == index ? 'state selectCss' : 'state']" @click="clickTab(index)">{{item.text}}</view>
			</view>
			<view  v-for="(item,index) in dataList" :key="index" class="list">
			  <view class="left">
			    <view class="title">{{item.remark == null ? '' : item.remark}}</view>
			    <view class="time">{{item.createTime == null ? '' : item.createTime}}</view>
			  </view>
			  <view v-show="stateIndex==0" class="right">+{{item.changeValue == null ? 0 : item.changeValue}}</view>
			</view>
		</z-paging>
	</view>
	
    <!-- <TopTab :state="state" @clickTab="clickTab"></TopTab> -->
    <!-- 积分记录 -->
    <!-- <view class="list">
      <view class="left">
        <view class="title">购物送积分(商品号: 13949)</view>
        <view class="time">2019-01-23 11: 22: 13</view>
      </view>
      <view class="right">+20</view>
    </view> -->
    <!-- 兑换记录 -->
    <!-- <view class="list chageList" style="display: block">
      <view class="title">购物送积分(商品号: 13949)购物送积分(商品号: 13949)</view>
      <view class="time">2019-01-23 11: 22: 13</view>
    </view> -->
    <!-- 没数据展示 -->
    <!-- <NoData text="暂无数据"></NoData> -->
  </view>
</template>

<script>
import zPaging from '../components/z-paging/z-paging/z-paging.vue'
  import TopTab from '../components/order/topTab'
  import NoData from '../components/noData'

  export default {
    data() {
      return {
		  dataList:[],
		  form:{
		  	userPoints:''
		  },
		  stateIndex: 0,
        state: [{
          text: '积分记录',
        }, {
          text: '兑换记录',
        }]
      }
    },
    onLoad() {},
	onShow() {
		this.getMyPoints()
		// if(this.stateIndex==0){
		// 	this.getMyPointsList(0)
		// }else if(this.stateIndex==1){
		// 	this.getMyPointsList(1)
		// }
	},
    methods: {
		queryList(pageNo, pageSize) {
			let parame={
				pageSize:pageSize,
				pageNum:pageNo,
				status:this.stateIndex
			}
			this.$Request.getT('/mms/wx/v1/getMyPointsList',parame).then(res => {
				if(res.code==200){		
					this.$refs.paging.complete(res.rows);
				}	
			})
		},
		//查询我的积分
		getMyPoints(){
			this.$Request.getT('/mms/wx/v1/getMyPoints').then(res => {
				if(res.code==200){
					// let rowlist=res.data
					this.form=res.data	
				}
				
			})
		},
      // tab切换
      clickTab(e) {
        console.log(e);
		this.stateIndex = e
		// if(e==0){
		// 	this.getMyPointsList(0)
		// }else if(e==1){
		// 	this.getMyPointsList(1)
		// }
		this.$refs.paging.reload();
      }
    },
    components: {
      TopTab,
      NoData,
	  zPaging
    }
  }
</script>

<style lang="scss" scoped>
  page {
    background-color: #ececec !important;
  }
  .content {
	background-color: #ececec;
    .main {
      background: url('https://s2.loli.net/2022/08/08/df81uGjTZeYWlKp.png') no-repeat 100%;
      background-size: cover;
      width: 106%;
      height: 300rpx;
      padding-top: 140rpx;
      box-sizing: border-box;
      .number {
        display: flex;
        height: 300krpx;
        justify-content: center;
        font-size: 28rpx;
        color: #c69f61;
        .num {
          font-size: 44rpx;
          color: #fff;
          margin-top: -15rpx;
          margin-right: 5rpx;
        }
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
      background-color: #fff;
      margin-top: 15rpx;
      padding: 40rpx;
      box-sizing: border-box;
      .left {
        font-size: 32rpx;
        .time {
          font-size: 30rpx;
          color: #727171;
          margin-top: 30rpx;
        }
      }
      .right {
        font-size: 44rpx;
        color: #c1906c;
        margin-top: 30rpx;
      }
    }
    .chageList {
      padding: 15rpx 40rpx;
      box-sizing: border-box;
      .time {
        font-size: 30rpx;
        margin-top: 30rpx;
        color: #727171;
      }
    }
  }
</style>