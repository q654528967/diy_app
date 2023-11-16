<script>
	/**
	 * vuex管理登陆状态，具体可以参考官方登陆模板示例
	 */
	import {
		mapMutations
	} from 'vuex';
	export default {
		methods: {
			// ...mapMutations(['login']),
			// login(){
			// 	// console.log('app')
			// 	uni.login({
			// 		success:(data)=>{
			// 			if(data.errMsg == "login:ok"){
			// 				let code=data.code
			// 				let token=uni.getStorageSync('token')
			// 				if(token){
			// 					this.$Request.get('/wx/user/login?code='+code+'&token='+token).then(res => {
			// 						if(res.data){
			// 							uni.setStorageSync('token', 'wx'+res.data.token);
			// 							this.$isResolve()
			// 						}
			// 					});
			// 				}else{
			// 					this.$Request.get('/wx/user/login?code='+code).then(res => {
			// 						if(res.data){
			// 							uni.setStorageSync('token', 'wx'+res.data.token);
			// 							this.$isResolve()
			// 						}
			// 					});
			// 				}	
			// 			}else{
			// 				uni.showToast({
			// 					title:'系统异常，请联系管理员'
			// 				})
			// 			}
				
			// 		},
							
			// 	})	
			// }
		},
		onLoad() {
			console.log('App onLoad')
		},
		onLaunch: function() {
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
			console.log('App onLaunch')
		},
		onShow: function() {
			// 判断存在token，则无需重复调用login
			// let that=this
			// let token = uni.getStorageSync('token');
			// 	if(token){
			// 		uni.checkSession({
			// 			success(err) {
			// 				// console.log('app.vue',err)
			// 				that.login()
			// 			},
			// 			fail(err) {
			// 				console.log('app.vue',err)
			// 				that.login()
			// 			}
			// 		})
			// 		// console.log('token is not null')
			// 	}else{
			// 		that.login()		
			// 	}
			// this.login()
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		},
	}
</script>

<style lang='scss'>
	@import "uview-ui/index.scss";
	/*每个页面公共css */
		
	/*
		全局公共样式和字体图标
	*/
   /* 底部虚线 */
   .dashed{
	  border-bottom:1px dashed #E4E7ED; 
	  height:50px;
   }
   /* 单行超出省略... */
   .ellipsis {
      word-break: break-all;
      text-overflow: ellipsis;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 1;
      -webkit-box-orient: vertical;
   }
   /* 多行超出省略... */
   .ellipsisduo{
	   word-break: break-all;
	   text-overflow: ellipsis;
	   overflow: hidden;
	   display: -webkit-box;
	   -webkit-line-clamp: 2;
	   -webkit-box-orient: vertical;
   }
   /* 3行省略 */
   	.ellipsanhang{
   	   word-break: break-all;
   	   text-overflow: ellipsis;
   	   overflow: hidden;
   	   display: -webkit-box;
   	   -webkit-line-clamp: 3;
   	   -webkit-box-orient: vertical;
   	}
   /* 4行省略 */
	.ellipsishang{
	   word-break: break-all;
	   text-overflow: ellipsis;
	   overflow: hidden;
	   display: -webkit-box;
	   -webkit-line-clamp: 4;
	   -webkit-box-orient: vertical;
	}
	/* 无数据显示图片 */
	.empty-tips{
		text-align: center;
		font-size: $font-sm+2upx;
		color: $font-color-disabled;
		margin-top: 45%;
		image{
			width: 25%;
			height: 200upx;
		}
		.navigator{
			color: #818181;
			margin: 10upx 0;
		}
	}
	@font-face {
		font-family: yticon;
		font-weight: normal;
		font-style: normal;
		src: url('https://at.alicdn.com/t/font_1078604_w4kpxh0rafi.ttf') format('truetype');
	}

	.yticon {
		font-family: "yticon" !important;
		font-size: 16px;
		font-style: normal;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
	}

	view,
	scroll-view,
	swiper-item,
	cover-view,
	cover-image,
	text,
	rich-text,
	progress,
	button,
	form,
	input,
	label,
	switch,
	textarea,
	audio,
	image,
	video {
		box-sizing: border-box;
	}
	
	/* 骨架屏替代方案 */
	.Skeleton {
		background: #f3f3f3;
		padding: 20upx 0;
		border-radius: 8upx;
	}
	
	uni-checkbox .uni-checkbox-input {
		border-radius: 50%;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked {
		background-color: #0055ff;
	}

	uni-checkbox .uni-checkbox-wrapper {
		width: 100%;
	}

	uni-checkbox .uni-checkbox-input.uni-checkbox-input-checked:before {
		color: #FFFFFF;
	}

	uni-checkbox:not([disabled]) .uni-checkbox-input:hover {
		border-color: transparent;
		border-color: #d1d1d1;
	}

	checkbox .wx-checkbox-input {
		border-radius: 50% !important;
	}

	checkbox .wx-checkbox-input.wx-checkbox-input-checked {
		color: #fff;
		background: #0055ff;
	}
	ul li{
		list-style: none;
	}
	/* 图片载入替代方案 */
	.image-wrapper {
		font-size: 0;
		background: #f3f3f3;
		border-radius: 4px;

		image {
			width: 100%;
			height: 100%;
			transition: .6s;
			opacity: 0;

			&.loaded {
				opacity: 1;
			}
		}
	}

	.clamp {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		display: block;
	}

	.common-hover {
		background: #f5f5f5;
	}

	/*边框*/
	.b-b:after,
	.b-t:after {
		position: absolute;
		z-index: 3;
		left: 0;
		right: 0;
		height: 0;
		content: '';
		transform: scaleY(.5);
		border-bottom: 1px solid $border-color-base;
	}

	.b-b:after {
		bottom: 0;
	}

	.b-t:after {
		top: 0;
	}
	button:after{
		border: 0;
	}
	/* input 样式 */
	.input-placeholder {
		color: #999999;
	}

	.placeholder {
		color: #999999;
	}
	body {
		height: 100%;
	  font-size: 28upx;
	  color: #333333;
	  font-family: PingFang SC;
	}
	view {
	  font-size: 30rpx;
	}
</style>
