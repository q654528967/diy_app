<template>
	<view>
		<view class="war-ph">
			<view>欢迎来到<text style="color: #ffd600;">京医到家</text></view>
			<view style="padding-top: 3%;">很高兴您来到这里</view>
			<view style="padding-top: 10%;font-size: 26rpx;color: #e7e1e1;">您还没有关联手机号,这将会影响部分功能的使用</view>
		</view>
		<view class="war-tx">
			<image :src="userInfo.avatarUrl || '/static/missing-face.png'" />
			<view style="margin: 5% 0;">{{userInfo.nickName || 'Hi游客,点头像登录'}}</view>
		</view>
		<view class="war-b">
			<u-button @getphonenumber="onGetPhoneNumber" shape="circle" open-type="getPhoneNumber" :custom-style="customStyle">微信一键登录</u-button>
		</view>
		<view style="display: flex;justify-content: center;margin: 3% 0;align-items: center;">
			<!-- <u-checkbox-group > -->
				<!-- <u-checkbox shape="circle" @change="checkboxGroupChange" size="30" v-model="checked"> -->
					登录表示您已接受并同意
				<!-- </u-checkbox> -->
			<!-- </u-checkbox-group> -->
			<text @click="sytklick(3)" style="font-size: 32upx;color: #737373;text-decoration:underline;">《隐私政策》</text>
			
		</view>
	</view>
</template>

<script>
	export default {
		data(){
			return {
				proShareKey:null,//分享的商品页标识
				reluform:{},
				shareid:null,//分享授权之后返回分享页面标识
				pid:'',//返回路由标识
				userInfo:{
					avatarUrl:'',
					nickName:''
				},
				checked:false,
				checkboxGroup:false,
				customStyle:{
					backgroundColor:'#00c768',
					marginTop: '20%',
					height: '104rpx',
					width: '82%',
					fontSize: '50rpx',
					color: '#fff',
				}
			}
		},
		onLoad(options) {
			this.uselogin()
			if(options.pid){
				let data=options.pid
				let da= data.replace('@','?')
				let picurl=da.replace('*','=')
				
				console.log('fot',picurl)
				this.pid=picurl
			}
			if(options.shareid){
				this.shareid=options.shareid
			}
			if(options.proShareKey){
				this.proShareKey=options.proShareKey
			}
			console.log('options',options)
			
		},
		onShow() {
			let avatarUrl=uni.getStorageSync('avatarUrl')
			let nickName=uni.getStorageSync('nickName')
			this.reluform=uni.getStorageSync('reluform')
			// console.log('this.reluform',this.reluform)
			this.userInfo.avatarUrl=avatarUrl
			this.userInfo.nickName=nickName
			this.uselogin()
		},
		methods:{
			sytklick(type){
				console.log('type',type)
				uni.navigateTo({
					url: `/pages/perfect/service?type=${type}`
				})
			},
			checkboxGroupChange(e) {
				this.checkboxGroup=e.value
				
			},
			onGetPhoneNumber(e){
				// let that=this
				console.log('jjjj',e)
				// if(this.checkboxGroup==true){
					let parame={
						encryptedData:e.detail.encryptedData,
						iv:e.detail.iv
					}
					this.$Request.post('/wx/user/phone',parame).then(res => {
						if (res.code == 200) {
							uni.setStorageSync('phone', res.data.phoneNumber);
							let parames={
								phone:res.data.phoneNumber,
							}
							this.$Request.post('/wx/user/postPhone',parames).then(val => {
								if (val.code == 200) {
									let pidurl=this.pid
									if(pidurl){
										// console.log('进来了吗')
										if(this.shareid){
											// if(this.reluform.proShareways){
											// 	uni.reLaunch({
											// 		url: `/pages/product/product?id=${this.reluform.productId}&proShareKey=${this.reluform.proShareways}`
											// 	})	
											// }else{
												uni.reLaunch({
													url: `/pages/product/product?id=${this.reluform.productId}&sellKey=${this.reluform.sellKey}&billCode=${this.reluform.billCode}&proShareKey=${this.reluform.proShareKey}`
												})
											// }
											
										}else{
											uni.redirectTo({
												url: pidurl
											})
										}	
									}else{
										if(this.shareid){
											// if(this.reluform.proShareways){
											// 	uni.reLaunch({
											// 		url: `/pages/product/product?id=${this.reluform.productId}&proShareKey=${this.reluform.proShareways}`
											// 	})
												
											// }else{
												uni.reLaunch({
													url: `/pages/product/product?id=${this.reluform.productId}&sellKey=${this.reluform.sellKey}&billCode=${this.reluform.billCode}&proShareKey=${this.reluform.proShareKey}`
												})
											// }
											
										}else{
											uni.reLaunch({
												url: `/pages/index/index`
											})
										}
									}	
								}else{
									// console.log('gggg',val.msg)
									this.$api.msg(val.msg);
								}
							})
						}else{
							console.log('kkkkk',res.msg)
							this.$api.msg('请您授权登录');
						}
					})
				// }
				
			},
			//重新获取token
			uselogin(){
				uni.login({
					success:(data)=>{
						if(data.errMsg == "login:ok"){
							let code=data.code
							this.$Request.get('/wx/user/login?code='+code).then(res => {
								if(res.data){
									uni.setStorageSync('token', 'wx'+res.data.token);
								}
							});	
						}else{
							uni.showToast({
								title:'系统异常，请联系管理员'
							})
						}
				
					},
							
				})	
			}
		}
	} 
</script>

<style lang='scss' scoped>
	.war-ph{
		background-color: #005aa3;
		height: 300rpx;
		font-size: 48rpx;
		color: #fff;
		padding: 4% 5%;
	}
	.war-tx{
		text-align: center;
		margin: 15% 0;
		image{
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
		}
	}
	/* .war-b{
		.conbu{
			backgroundColor:#00c768;
			marginTop: 20%;
			height: 120rpx;
			width: 90%;
			fontSize: 50rpx;
			color: #fff;
		}
	} */
</style>
