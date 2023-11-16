<template>
  <view class="content">
    <view class="userInfo">
      <view class="left">
        <image :src="form.wxpic || '../../static/missing-face.png'" mode="scaleToFill" />
        <view class="info">
          <view class="name">{{form.username ==null ? '' : form.username}}</view>
          <view class="phone">{{form.tel ==null ? '' : form.tel}}</view>
        </view>
      </view>
      <view class="right" @click="vipSetting">
        会员设置
        <image src="../../static/right.png" mode="scaleToFill" />
      </view>
    </view>
    <!-- 会员卡信息 -->
    <view v-if="form.cardSn" class="cardBox">
      <view :key="index" class="cardInfo" @click="shopVipCard">
        <view class="left">
          <view class="num">卡号: {{form.cardSn ==null ? '' : form.cardSn}}</view>
          <image src="../../static/user/cardLeftPic.png" mode="scaleToFill" />
        </view>
        <view class="right">
          <image src="../../static/user/cardText.png" mode="scaleToFill" />
          <image src="../../static/user/cardRight.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- tips -->
    <view class="tips">
      <image
        src="../../static/user/hua.png"
        mode="scaleToFill"
      />
      珍惜每一份关怀
      <image
        src="../../static/user/hua.png"
        mode="scaleToFill"
      />
    </view>
    <!-- 没数据展示 -->
    <NoData v-if="!form.cardSn" text="暂无会员卡"></NoData>
  </view>
</template>

<script>
import NoData from '../components/noData'
export default {
    data() {
      return {
		  form: {
		  	username: '',
			tel:'',
			cardSn:''
		  },
		  membershipcard:[]
	  }
    },
    onLoad() {},
	onShow() {
		// this.getcard()
		this.getsaveCust()
	},
    methods: {
		//查询会员信息
		getsaveCust(){
			this.$Request.getT('/mms/wx/v1/getUserCardInfo').then(res => {
				if (res.code == 200) {
					this.form = res.data;
				}
			})
		},
		
		// 会员卡列表
		// getcard(){
		// 	this.$Request.getT('/mms/wx/v1/getCardTypeList/1').then(res => {
		// 		if (res.code == 200) {
		// 			this.membershipcard=res.data
		// 		}
		// 	})
		// },
		// 会员卡设置
		vipSetting() {
			uni.navigateTo({
			  url: '/subpack_page/pagesUser/vipInfo'
			})
		},
		shopVipCard(){
			uni.navigateTo({
			  url: '/subpack_page/pagesUser/shopVipCard'
			})
		}
    },
    components: {
      NoData
    }
}
</script>

<style lang="scss" scoped>
  .content {
    .userInfo {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 20rpx 30rpx;
      border: 1px solid #d9d9d9;
      box-sizing: border-box;
      .left {
        display: flex;
        align-items: center;
        font-size: 30rpx;
        image {
          width: 80rpx;
          height: 80rpx;
          border-radius: 50%;
          margin-right: 20rpx;
        }
        .info {}
      }
      .right {
        font-size: 32rpx;
        display: flex;
        image {
          width: 20rpx;
          height: 30rpx;
          margin-left: 15rpx;
          display: block;
          margin-top: 6rpx;
        }
      }
    }
    .cardBox {
      padding: 40rpx 50rpx;
      box-sizing: border-box;
    }
    .cardInfo {
		margin: 3% 0;
      height: 390rpx;
      width: 100%;
      border-radius: 30rpx;
      background-color: #bd8145;
      display: flex;
      justify-content: space-between;
      padding: 40rpx 30rpx;
      box-sizing: border-box;
      .left {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        .num {
          font-size: 32rpx;
          color: #fff;
          font-weight: bold;
        }
        image {
          width: 230rpx;
          height: 200rpx;
        }
      }
      .right {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: flex-end;
        image {
          display: block;
        }
        image:nth-child(1) {
          width: 190rpx;
          height: 22rpx;
        }
        image:nth-child(2) {
          width: 140rpx;
          height: 50rpx;
        }
      }
    }
    .tips {
      display: flex;
      justify-content: center;
      margin-top: 30rpx;
      color: #595858;
      image {
        width: 30rpx;
        height: 30rpx;
        display: block;
        margin-top: 6rpx;
        margin-left: 10rpx;
        margin-right: 10rpx;
      }
    }
  }
</style>




