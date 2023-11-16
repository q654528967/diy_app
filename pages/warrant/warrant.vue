<template>
	<view>
		<view class="war-bj">
			<image src="../../static/sxbg.png" mode=""></image>
		</view>
		<!-- <view class="war-zc">注册/登录</view> -->
		<view class="war-b">
			<u-button shape="circle" :custom-style="customStyle" class="userinfo" @click="getuserinfo()">
				<u-icon margin-left="30" name="weixin-fill" color="#fff" size="80"></u-icon>
				&nbsp;微信登录
			</u-button>
		</view>
		<view style="display: flex;justify-content: center;margin: 3% 0;align-items: center;">
			<u-checkbox-group >
				<u-checkbox shape="circle" @change="checkboxGroupChange" size="30" v-model="checked">
					<text style="font-size: 28rpx;">我已阅读并同意</text>
				</u-checkbox>
			</u-checkbox-group>
			<text @click="sytklick(2)" style="font-size: 32upx;color: #737373;text-decoration:underline;">《使用条款》</text>和<text @click="sytklick(3)" style="font-size: 32upx;color: #737373;text-decoration:underline;">《隐私政策》</text>
			
		</view>
		<view class="warimg_left">
			<image src="../../static/sxbg1.png" mode=""></image>
		</view>
		<view class="war_botimg">
			<image src="../../static/sxbg2.png" mode=""></image>
		</view>
		<!-- <wyg-bottom-tab :tabIndex='tabIndex'></wyg-bottom-tab> -->
	</view>
</template>

<script>
	// import wygBottomTab from '@/components/wyg-bottom-tab/wyg-bottom-tab.vue';
	export default {
		components: {
			// wygBottomTab,
		 },
		data(){
			return {
				id:null,//分享的商品页标识
				proShareKey:null,//分享的商品页标识
				reluform:{},
				shareid:null,//分享授权之后返回分享页面标识
				tabIndex:4,
				pid:'',//返回路由标识
				checked:false,
				checkboxGroup:false,
				customStyle:{
					backgroundColor:'#00c768',
					marginTop: '10%',
					height: '104rpx',
					width: '82%',
					fontSize: '50rpx',
					color: '#fff',
				}
			}
		},
		onShow() {
			this.reluform=uni.getStorageSync('reluform')
			console.log('this.reluform',this.reluform)
		},
		async onLoad(options) {
			if(options.pid){
				this.newpid=options.pid
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
			// if(options.id){
			// 	this.id=options.id
			// }
			await this.$onLaunched;
			this.uselogin()
			
			
			
			console.log('options.pid',options)
			
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
			// 公用获取手机号
			// phones(){
			// 	this.$Request.getT('/mms/wx/v1/myInfo').then(res => {
			// 		if (res.code == 200) {
			// 			if(res.data){
			// 				if(res.data.tel){
			// 					uni.setStorageSync('phone', res.data.tel);
								
			// 				}else{
			// 					uni.redirectTo({
			// 						url: `/pages/warrant/warphone?pid=${this.newpid}&shareid=${this.shareid}`
			// 					})
			// 				}
			// 			}	
			// 		}
			// 	})
			// },
			// 返回路由
			getfhym(){
				let pidurl=this.newpid
				console.log('pidurl',pidurl)
				if(pidurl){
					console.log('pidurl22222',pidurl)
					if(pidurl=='/pages/user/user'){
						uni.switchTab({
							url: `${pidurl}`
						})
					}
					if(pidurl=='/pages/indexSubPage/goodsDetails'){
						uni.navigateBack({
							delta: 1
						})
					}
					uni.redirectTo({
						url: `${pidurl}`
					})
				}else{
					if(this.shareid){
						console.log('普通分享')
							uni.reLaunch({
								url: `/pages/product/product?id=${this.reluform.productId}&sellKey=${this.reluform.sellKey}&billCode=${this.reluform.billCode}&proShareKey=${this.reluform.proShareKey}`
							})
						
					}else{
						console.log('没进来普通分享')
						uni.reLaunch({
							url: `/pages/index/index`
						})
					}
				}
			},
			//用户信息
			getuserinfo(){
				let that=this
				let nickName=uni.getStorageSync('nickName')
				if(that.checkboxGroup==true){
						uni.getUserProfile({
							desc: '正在获取',
							success: function(res) {
								console.log('获取成功: ', res)
								// that.userInfo=res.userInfo
								
								that.$Request.post('/wx/user/postAuth').then(res => {
									console.log('postAuth:',res)
									if (res.code == 200) {
										// uni.setStorageSync('avatarUrl', res.data.wxpic);
										// uni.setStorageSync('nickName', res.data.wxname);
									}
								
								// console.log('kkkkkkk',res)
								});
								
								that.getfhym()
								// uni.navigateTo({
								// 	url: `/pages/warrant/warphone`
								// })
							},
							fail: function(err) {
								// uni.clearStorageSync()
								console.log("获取失败: ", err)
							}
						})
					
				}else{
					uni.showModal({
					    title: '请您先同意《使用条款》和《隐私政策》',
						showCancel: false,
					    success: function (res) {
					        if (res.confirm) {
								// uni.navigateTo({
								// 	url: `/pages/user/user`
								// })
					        }
					    }
					});
				}
			
			},
			//重新获取token
			uselogin(){
				uni.login({
					success:(data)=>{
						if(data.errMsg == "login:ok"){
							let code=data.code
							let token=uni.getStorageSync('token')
							if(token){
								this.$Request.get('/wx/user/login?code='+code+'&token='+token).then(res => {
									if(res.data){
										uni.setStorageSync('token', 'wx'+res.data.token);
										this.$isResolve()
									}
								});
							}else{
								this.$Request.get('/wx/user/login?code='+code).then(res => {
									if(res.data){
										uni.setStorageSync('token', 'wx'+res.data.token);
										this.$isResolve()
									}
								});
							}	
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
	.warimg_left{
		width: 375rpx;
		height: 380rpx;
		margin-top: 8%;
		position: relative;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.war_botimg{
		width: 100%;
		height: 295rpx;
		bottom: 0%;
		position: absolute;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.war-bj{
		width:170rpx;
		height: 170rpx;
		margin: auto;
		margin-top: 20%;
		image{
			width: 100%;
			height: 100%;
		}
	}
	.war-zc{
		margin-top: 30%;
		text-align: center;
		font-size: 70rpx;
	}
	.war-b{
		/* margin: 50% auto; */
	}
</style>
