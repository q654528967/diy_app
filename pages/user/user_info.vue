<template>
	<view class="content">
		<view class="title">
		  个人信息
		</view>
		<view class="form">
			<view class="info">
				<button class="avatar-wrapper" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
					<image :src="userInfo.avatarUrl || '../../static/missing-face.png'" mode="scaleToFill" />
				</button>
			</view>
		  <view class="input xrequired">
		    <view class="left">昵称</view>
		    <input class="inputData" v-model="userInfo.nickName" placeholder="昵称" type="nickname"/>
		  </view>
		  <view class="input xrequired">
		    <view class="left">手机号</view>
			<button class="button-wrapper" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">
				<input class="inputData" v-model="userInfo.phone" placeholder="手机号"  />
			</button>
		    
		  </view>
		  
		</view>
		<!-- 按钮 -->
		<view class='bottom'>
		  <view class="left" @click="submitvation" >保存</view>
		</view>
	</view>
</template>

<script>
import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
	
export default{
	data() {
		return {
			userInfo:{
				avatarUrl:'',
				nickName:'',
				phone:'',
			},
			avatarUrl: ''
		}
	},
	created() {
		// this.userInfo.phone=uni.getStorageSync('phone')
		// this.userInfo.nickName=uni.getStorageSync('nickName')
		// this.userInfo.avatarUrl=uni.getStorageSync('avatarUrl')
	},
	onShow() {
		this.$Request.getT('/wx/user/getUserInfo').then(res => {
			if(res.code==200){
				if(res.data.wxpic){
					this.userInfo.avatarUrl=res.data.wxpic
				}
				if(res.data.wxname){
					this.userInfo.nickName=res.data.wxname
				}
				if(res.data.tel){
					this.userInfo.phone=res.data.tel
				}
			}
		});
	},
	methods:{
		//用户信息
		getuserinfo(){
			uni.getUserProfile({
				desc: '正在获取',
				success: function(res) {
					console.log('获取成功: ', res)
					
				},
				fail: function(err) {
					// uni.clearStorageSync()
					console.log("获取失败: ", err)
				}
			})
		
		},
		onChooseAvatar(e) {
			let token = uni.getStorageSync("token");
			let avatarUrl;
			uni.uploadFile({
			    url: 'https://test.xassp.com/prod-api/mms/mobile/v1/upload',
			    filePath: e.detail.avatarUrl,// 临时文件路径
			    name: 'file',
			    header:{
			        'content-type': 'multipart/form-data',
			        'token': token // 添加自定义的token字段
			    },
				success: (res) => {
					console.log('res: ', res);
					var jsonObj = JSON.parse(res.data);
					this.userInfo.avatarUrl = jsonObj.url;
					console.log('this.userInfo: ', this.userInfo);
				}
			})
			// uni.setStorageSync('nickName', res.userInfo.nickName);
		},
		getPhoneNumber(e) {
			console.log('jjjj',e)
			if(this.userInfo.phone){
				return
			}else{
				let parame={
					code:e.detail.code
				}	
				console.log('parame',parame)
				this.$Request.post('/wx/user/getUserPhone',parame).then(res => {
					if (res.code == 200) {
						this.userInfo.phone=res.data.phoneNumber
						
					}else{
						console.log('kkkkk',res.msg)
						this.$api.msg('请您授权登录');
					}
				})
			}
		},
		// 保存信息
		submitvation(){
			console.log('this.userInfo',this.userInfo)
			if(this.userInfo.avatarUrl && this.userInfo.nickName && this.userInfo.phone){
				this.$Request.post('/wx/user/postUpdate',this.userInfo).then(res => {
					if (res.code == 200) {
						this.$api.msg('保存成功');
						// uni.setStorageSync('phone', this.userInfo.phone);
						// uni.setStorageSync('nickName', this.userInfo.nickName);
						// uni.setStorageSync('avatarUrl', this.userInfo.avatarUrl);
						this.toUser();
					}else{
						this.$api.msg(res.msg);
					}
				})
			}else{
				this.$api.msg('请填写必填信息')
			}
		},
		//查看订单
		toUser(){
			  uni.reLaunch({
				  url: `pages/user/user`
			  })
		}
	}
}
</script>


<style lang="scss" scoped>
  .content {
	  
    .title {
      text-align: center;
      padding: 40rpx 30rpx;
      box-sizing: border-box;
      font-size: 32rpx;
      font-weight: bold;
      border-bottom: 1px solid #ccc;
      image {
        width: 40rpx;
        height: 40rpx;
        float: right;
      }
    }
    .form {
      padding: 50rpx;
      padding-top: 0rpx;
	  .info {
	  		image {
	  		  width: 170rpx;
	  		  height: 170rpx;
	  		  border-radius: 50%;
	  		  display: block;
	  		  margin: 0 auto;
	  		  margin-top: 70rpx;
	  		}
	  }
	  .xrequired:before {
            content: '* ';
			color: red;
			vertical-align: middle;
			font-size: 45rpx;
			margin-right: 2%;
			display: inline-block;
        }
      .input {
        height: 70rpx;
        display: flex;
        margin-top: 40rpx;
        .left {
          width: 190rpx;
          border: 1px solid #ccc;
          text-align: center;
          line-height: 70rpx;
          font-size: 32rpx;
          color: #c59b63;
          margin-left: -2rpx;
        }
        .inputData {
          height: 70rpx;
          width: 100%;
          line-height: 70rpx;
          font-size: 34rpx;
          border: 1px solid #ccc;
          padding: 0 40rpx;
          box-sizing: border-box;
        }
        .address {
          display: flex;
          justify-content: space-between;
          border: 1px solid #ccc;
          width: 100%;
          height: 70rpx;
          line-height: 70rpx;
          padding: 0 40rpx;
          padding-right: 10rpx;
          box-sizing: border-box;
          input {
            height: 70rpx;
            line-height: 70rpx;
          }
          image {
            width: 40rpx;
            height: 50rpx;
            display: block;
            margin-top: 10rpx;
          }
        }
      }
    }
    .bottom {
      display: flex;
      justify-content: center;
      margin-top: 60rpx;
      .left {
        background-color: #c2906d;
        color: #fff;
        margin-right: 40rpx;
      }
      .right {
        color: #FFF;
        border: 1px solid #c2906d;
        margin-left: 40rpx;
        background-color: #e43828;
      }
      view {
        width: 200rpx;
        height: 70rpx;
        line-height: 70rpx;
        text-align: center;
        border-radius: 50rpx;
      }
    }
    .bg {
      background: url('https://s2.loli.net/2022/08/08/iOLKVtTN7639q1E.png') no-repeat 100%;
      background-size: cover;
      height: 100rpx;
      width: 100%;
      display: flex;
      margin-top: 100rpx;
      .boxBg {
        display: flex;
        margin-top: 20rpx;
        margin-left: 20rpx;
      }
      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
    }
    .uni-list-cell {
      display: flex;
      padding: 30rpx 40rpx;
      box-sizing: border-box;
      justify-content: space-between;
      .center {
        width: 100%;
        font-size: 32rpx;
        .top {
          display: flex;
          justify-content: space-between;
        }
        .address{
          font-size: 32rpx;
          color: #909191;
        }
      }
      .box {
        display: flex;
        width: 100%;
        padding-right: 20rpx;
      }
      image {
        width: 40rpx;
        height: 35rpx;
      }
    }
  }
  .avatar-wrapper {
    width: 100%;
    background: white;
    border: none;
    text-align: left;
    padding: 0px;
    margin: 0px;
    line-height: 1.3;
    font-size: 16px;
    border-radius:0;
  }
  .button-wrapper {
    width: 100%;
    background: white;
    border: none;
    text-align: left;
    padding: 0px;
    margin: 0px;
    line-height: 1.3;
    font-size: 16px;
    border-radius:0;
  }
</style>