<template>
  <view class="content">
    <view class="info">
      <image :src="userInfo.avatarUrl || '../../static/missing-face.png'" mode="scaleToFill" />
      <view class="text">{{userInfo.nickName || ''}} <u-icon name="edit-pen" @click="viewUserInfo"></u-icon></view> 
    </view>
    <image class="line" src="../../static/user/line.png" mode="scaleToFill" />
    <!-- 绑定手机 -->
    <view class="bindPhone">
      <view class="inputPhone">
        <image src="../../static/user/phoneIcon.png" mode="scaleToFill" />
		<text>{{userInfo.phone}}</text>
        <!-- <input :disabled="true" v-model="userInfo.phone" placeholder="点击按钮捆绑手机号码"/> -->
      </view>
	 <!-- <u-button v-show="isforshow" @getphonenumber="onGetPhoneNumber" shape="circle" open-type="getPhoneNumber" :custom-style="customStyle">立即捆绑</u-button> -->
      <!-- <view @input="clickphone"  class="bind">立即捆绑</view> -->
    </view>
    <!-- 我的订单 -->
    <view class="order">
      <view class="left">我的订单</view>
      <view class="right" @click="vieworder">查看全部订单</view>
    </view>
    <view class="state">
      <view style="position: relative;" class="lis" v-for="(item, index) in state" :key="index" @click="jumpPage(index)">
        <image :src="item.img" mode="heightFix" />
        <view>{{item.text}}</view>
		<text v-if="item.isshow==1" style="position: absolute;
					top: -3px;
					right: -3px;
					width: 15rpx;
					height: 15rpx;
					background-color: #f00;
					border-radius: 30rpx;">
		</text>
      </view>
    </view>
    <view class="list">
      <view class="lis" @click="jumpInshop">
        <view class="left">购物车</view>
        <view class="right">
          <view class="num">X{{shoplenght == null ? 0 : shoplenght}}</view>
          <!-- <image
            src="../../static/right.png"
            mode="scaleToFill"
          /> -->
        </view>
      </view>
      <view class="lis" @click="jumpIntegral">
        <view class="left">我的积分</view>
        <view class="right">
          <view class="num">{{form.userPoints == null ? 0 : form.userPoints}}积分</view>
          <image src="../../static/right.png" mode="scaleToFill" />
        </view>
      </view>
      <view class="lis" @click="jumpCoupon">
        <view class="left">我的优惠券</view>
        <view class="right">
          <!-- <view class="num">30000积分</view> -->
          <image src="../../static/right.png" mode="scaleToFill" />
        </view>
      </view>
      <view class="lis" @click="jumpVip">
        <view class="left">我的会员卡</view>
        <view class="right">
          <!-- <view class="num">30000积分</view> -->
          <image src="../../static/right.png" mode="scaleToFill" />
        </view>
      </view>
	  <view class="lis" @click="reservation">
	    <view class="left">订房订单</view>
	    <view class="right">
	      <!-- <view class="num">30000积分</view> -->
	      <image src="../../static/right.png" mode="scaleToFill" />
	    </view>
	  </view>
    </view>
    
		<view style="height: 180rpx"></view>
		<TabBar :cartnum=shoplenght :indexSubPage="4"></TabBar>
  </view>
</template>

<script>
  export default {
    data() {
		return {
			isforshow:false,
			statelick:false,
			
			// ligationList:[],
			// serveList:[],
			// shippedList:[],
			// getfinishList:[],
			customStyle:{
				fontSize: '28rpx',
				height: '50rpx',
				lineHeight: '50rpx',
				width: '180rpx',
				border: '1rpx solid #bd8b6c',
				color: '#bd8b6c',
				textAlign: 'center',
				borderRadius: '50rpx',
			},
			shoplenght:0,
			form:{
				userPoints:''
			},
		  userInfo:{
			avatarUrl:'',
			nickName:'微信用户',
			phone:''
		},
        title: 'Hello',
        state: [{
          img: '../../static/user/walletIcon.png',
          text: '待付款',
		  isshow:0
        }, {
          img: '../../static/user/walletIcon.png',
          text: '待发货',
		   isshow:0
        }, {
          img: '../../static/user/carIcon.png',
          text: '已发货',
		   isshow:0
        }, {
          img: '../../static/user/completedIcon.png',
          text: '已完成',
		   isshow:0
        }, {
          img: '../../static/user/waitIcon.png',
          text: '待评价'
        }],
        phoneNum: '',
      }
    },
    onLoad() {
      uni.hideTabBar()
    },

    methods: {
		// 待付款
		getbligation(parame){
			this.ligationList=[]
			this.$Request.getT(`/mms/wx/v1/myOrderNew/${parame}`).then(res => {
				if(res.code==200){
					// this.ligationList=res.data
					if(res.data){
						this.$set(this.state,'isshow','1')
					}
				}	
			})
		},
		// 待发货
		getserve(parame){
			this.serveList=[]
			this.$Request.getT(`/mms/wx/v1/myOrderNew/${parame}`).then(res => {
				if(res.code==200){
					this.serveList=res.data
				}	
			})
		},
		// 已发货
		shipped(parame){
			this.shippedList=[]
			this.$Request.getT(`/mms/wx/v1/myOrderNew/${parame}`).then(res => {
				if(res.code==200){
					this.shippedList=res.data
				}	
			})
		},
		
		// 已完成
		getfinish(parame){
			this.getfinishList=[]
			this.$Request.getT(`/mms/wx/v1/myOrderNew/${parame}`).then(res => {
				if(res.code==200){
					if(res.data){
						this.$set(this.state,'isshow','1')
						console.log('this.state',this.state)
					}
				}	
			})
		},
		//查询购物车列表
		getshop(){
			this.$Request.getT('/mms/wx/v1//getCarts').then(res => {
				if(res.code==200){
					this.shoplenght=res.data.length	
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
      // 绑定手机
  //     onGetPhoneNumber(e){
  //     	// let that=this
  //     	console.log('jjjj',e)
		// if(this.userInfo.phone){
		// 	return
		// }else{
		// 	let parame={
		// 		encryptedData:e.detail.encryptedData,
		// 		iv:e.detail.iv
		// 	}	
		// 	console.log('parame',parame)
		// 	this.$Request.post('/wx/user/phone',parame).then(res => {
		// 		if (res.code == 200) {
		// 			uni.setStorageSync('phone', res.data.phoneNumber);
		// 			this.userInfo.phone=res.data.phoneNumber
		// 			this.isforshow=false
		// 			let parames={
		// 				phone:res.data.phoneNumber,
		// 			}
		// 			this.$Request.post('/wx/user/postPhone',parames).then(val => {
		// 				if (val.code == 200) {
							
		// 				}else{
		// 					// console.log('gggg',val.msg)
		// 					this.$api.msg(val.msg);
		// 				}
		// 			})
		// 		}else{
		// 			console.log('kkkkk',res.msg)
		// 			this.$api.msg('请您授权登录');
		// 		}
		// 	})
		// }	
      	
  //     },
	  // 公用获取手机号
	  // phones(){
		 //  this.userInfo.phone=''
	  // 	this.$Request.getT('/mms/wx/v1/myInfo').then(res => {
	  // 		if (res.code == 200) {
	  // 			if(res.data){
	  // 				if(res.data.tel){
	  // 					uni.setStorageSync('phone', res.data.tel);
			// 			if(res.data.tel){
			// 				this.userInfo.phone=res.data.tel
			// 			}else{
			// 				this.isforshow=true
			// 			}
						
	  // 				}
	  // 			}	
	  // 		}
	  // 	})
	  // },
	  //查看订单
	  vieworder(){
		  uni.navigateTo({
		      url: `/pages/pagesUser/orderList`
		  })
	  },
	  // 订房订单
	  reservation(){
		  uni.navigateTo({
		      url: `/pages/pagesUser/reservationorder`
		  })
	  },
      // 跳转订单列表
      lookAllOrder(index) {
        this.funJumpPage(`/pages/pagesUser/orderList?statis=${index}`)
      },
	  viewUserInfo(){
		  uni.navigateTo({
		      url: `/pages/user/user_info`
		  })
	  },
      funJumpPage(url) {
        uni.navigateTo({
            url: url
        })
      },
      jumpPage(index) {
        if (index == 4) {
          this.funJumpPage('/pages/pagesUser/evaluationCenter')
        } else {
          this.lookAllOrder(index)
        }
      },
      // 我的积分
      jumpIntegral() {
        this.funJumpPage('/subpack_page/pagesUser/myIntegral')
      },
      // 我的优惠券
      jumpCoupon() {
        this.funJumpPage('/subpack_page/pagesUser/coupons')
      },
      jumpVip() {
        this.funJumpPage('/subpack_page/pagesUser/vipCard')
      },
	  jumpInshop(){
		  uni.switchTab({
		    url: `/pages/index/car`
		  })
	  },
	  getinfor(){
		  this.$Request.getT('/wx/user/getUserInfo').then(res => {
		  	if(res.code==200){
				console.log('获取成功: ', res)
		  		if(res.data.wxpic){
		  			this.userInfo.avatarUrl=res.data.wxpic
		  		}
		  		if(res.data.wxname){
		  			this.userInfo.nickName=res.data.wxname
		  		}
				if(res.data.tel){
					this.userInfo.phone=res.data.tel
				}
		  		
		  	}else{
		  		let pidurl='/pages/user/user'
		  		uni.reLaunch({
		  			url: `/pages/warrant/warrant?pid=${pidurl}`
		  		})
		  	}
		  });
	  },
	  login(){
	  	// console.log('首页')
	  	uni.login({
	  		success:(data)=>{
	  			let code=data.code
	  			let token=uni.getStorageSync('token')
	  			if(token){
	  				this.$Request.get('/wx/user/login?code='+code+'&token='+token).then(res => {
	  					if(res.data){
	  						uni.setStorageSync('token', 'wx'+res.data.token);
							this.getinfor()
							// this.phones()
							this.getMyPoints()
							this.getshop()
							
							
							// 待付款
							this.getbligation(0)
							// 待发货
							this.getserve(1)
							// 已发货
							this.shipped(2)
							//已完成
							this.getfinish(3)
	  					}
	  				});
	  			}else{
	  				this.$Request.get('/wx/user/login?code='+code).then(res => {
	  					if(res.data){
	  						uni.setStorageSync('token', 'wx'+res.data.token);
							this.getinfor()
							this.getMyPoints()
							this.getshop()
							
							
							// 待付款
							this.getbligation(0)
							// 待发货
							this.getserve(1)
							// 已发货
							this.shipped(2)
							//已完成
							this.getfinish(3)
	  					}
	  				});
	  			}	
	  		},
	  				
	  	})	
	  }
    },
	created() {
		
	},
	async onShow() {
		this.login()
		
	},
  }
</script>

<style lang="scss" scoped>
  .line {
    height: 30rpx;
    width: 100%;
    display: block;
    margin-top: 30rpx;
  }
  .content {
    .info {
      image {
        width: 170rpx;
        height: 170rpx;
        border-radius: 50%;
        display: block;
        margin: 0 auto;
        margin-top: 70rpx;
      }
      .text {
        text-align: center;
        margin-top: 40rpx;
        font-size: 30rpx;
      }
    }
    .bindPhone {
      display: flex;
      height: 100rpx;
      line-height: 100rpx;
      align-items: center;
      justify-content: space-between;
      padding: 0 50rpx;
      border-bottom: 1rpx solid #d2d2d2;
      margin-top: 5rpx;
      box-sizing: border-box;
      .inputPhone {
        display: flex;
		    align-items: center;
      }
      image {
        width: 26rpx;
        height: 35rpx;
        margin-right: 20rpx;
        display: block;
        margin-top: 5rpx;
      }
      input {
        font-size: 30rpx;
      }
      .bind {
        font-size: 28rpx;
        height: 50rpx;
        line-height: 50rpx;
        width: 180rpx;
        border: 1rpx solid #bd8b6c;
        color: #bd8b6c;
        text-align: center;
        border-radius: 50rpx;
      }
    } // 订单
    .order {
      display: flex;
      justify-content: space-between;
      font-size: 30rpx;
      padding: 0 40rpx;
      height: 92rpx;
      line-height: 120rpx;
      border: 1rpx solid #d2d2d2;
    }
    .state {
      display: flex;
      justify-content: space-around;
      padding: 30rpx 30rpx;
      border: 1rpx solid #d2d2d2;
      box-sizing: border-box;
      .lis {
        font-size: 28rpx;
        text-align: center;
        color: rgb( 128, 128, 128);
        view {
          font-size: 26rpx;
        }
        image {
          height: 46rpx;
          display: block;
          margin: 0 auto;
          margin-bottom: 10rpx;
        }
      }
    }
    .list {
      .lis {
        height: 106rpx;
        line-height: 106rpx;
        border-bottom: 1rpx solid #d2d2d2;
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0rpx 40rpx;
        padding-right: 70rpx;
        font-size: 30rpx;
        box-sizing: border-box;
        .right {
          display: flex;
          align-items: center;
          .num {
            color: #e99785;
          }
          image {
            height: 32rpx;
            width: 15rpx;
            margin-left: 20rpx;
          }
        }
      }
      .lis:last-child {
        border-bottom: none;
      }
    }
  }
</style>




