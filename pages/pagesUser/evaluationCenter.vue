<template>
  <view class="content">
	  <view class="topTab">
	    <view v-for="(item, index) in state" :key="index" :class="[stateIndex == index+1 ? 'state selectCss' : 'state']" @click="clickTab(index+1)">{{item.text}}</view>
	  </view>
    <view class="title">
      <view class="left">
        <image src="../../static/user/houseIcon.png" mode="scaleToFill" /> 评价列表
      </view>
      <view class="right">{{statesinfor}}</view>
    </view>
    <!-- 商品 -->
    <view v-for="(item, index) in evaluationlist" :key="index" class="pro">
      <image :src="item.proUrl" mode="scaleToFill" />
      <view class="right">
        <view class="proTitle">{{item.productName}}</view>
        <!-- <view class="tips">{{item.productpj}}</view> -->
        <view v-if="stateIndex==1" class="btn" @click="jumpEvaluation(item)">评价</view>
      </view>
    </view>
  </view>
</template>
<script>
  export default {
    data() {
      return {
		  statesinfor:'等待评价',
		  evaluationlist:[
			  {
				 proUrl:'../../static/index/pro.png' ,
				 productName:'五星级酒店专用枕头五星级五星级五星级',
				 productpj:'评价玩最多可获得32积分'
			  }
		  ],
		  stateIndex: 1,
        state: [{
          text: '待评价',
        }, {
          text: '已评价',
        },
		// {
  //         text: '追评价',
  //       },
		]
      }
    },
    onLoad() {},
	onShow() {
		if(this.stateIndex==1){
			this.getevalcenter(1)
		}
	},
    methods: {
		getevalcenter(status){
			this.evaluationlist=[]
			this.$Request.getT(`/mms/wx/v1/getProductMsg/${status}`).then(res => {
				if (res.code == 200) {
					this.evaluationlist = res.data;
				}
			})
		},
		clickTab(e) {
			console.log('e',e)
			this.stateIndex = e
			if(e==1){
				this.statesinfor='等待评价'
				this.getevalcenter(1)
			}else if(e==2){
				this.statesinfor='已评价'
				this.getevalcenter(2)
			}
		},
      jumpEvaluation(item) {
		  console.log('item',item)
        uni.navigateTo({
          url: `/pages/pagesUser/evaluation?billPackId=${item.billPackId}&productCode=${item.productCode}`,
        })
      }
    },
  }
</script>

<style lang="scss" scoped>
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
  .title {
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 50rpx;
    margin-top: 40rpx;
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
    height: 210rpx;
    background-color: #ccc;
    display: flex;
    padding-top: 10rpx;
    padding-right: 30rpx;
    margin-top: 20rpx;
    box-sizing: border-box;
    image {
      width: 180rpx;
      height: 180rpx;
      margin-left: 20rpx;
      margin-right: 10rpx;
    }
    .right {
      flex: 1;
      .proTitle {
		  height: 118rpx;
        font-size: 30rpx;
        margin-top: 10rpx;
      }
      .tips {
        font-size: 26rpx;
        color: #e99785;
        margin-top: 10rpx;
      }
      .btn {
        width: 110rpx;
        height: 50rpx;
        border-radius: 50rpx;
        text-align: center;
        line-height: 50rpx;
        font-size: 28rpx;
        color: red;
        border: 1px solid red;
        margin: 0 right;
        float: right;
      }
    }
  }
</style>