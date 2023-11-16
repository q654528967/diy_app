<template>
<view class="content" catchtouchmove='prevent'>
<view class="maskAlert" :class="sc" v-if="alertMaskHiden"></view>
	<view @touchmove.prevent :class="sc" class="tankuang width-100 height-100 position-fixed p-left-0 p-top-0">
		<view class="mask width-100 height-100" >
			<view class="content width-100 position-absolute p-left-0 bj-white p-30" >
				<slot></slot>
			</view>
		</view>
	</view>
	</view>
</template>

<script>
	export default {
		props:{
			sc:String, //控制calss类名
		  alertMaskHiden: false,
		},
		data() {
			return {
			};
		},
		methods:{
			prevent() {
				return;
			}
		}
	}
</script>

<style lang="scss" scoped>
	/* 底部弹框 */
	.mask {
		/* background-color: rgba(0, 0, 0, 0.5); */
		background-color: #fff;
    position: fixed;
    bottom: 0rpx;
    width: 100%;
		z-index: 9999;
	}

	.content {
		/* height: 800rpx; */
		border-radius: 20upx 20upx 0 0;
		box-sizing: border-box;
		bottom: 0;
	}

	.none {
		display: none;
	}

	@keyframes contentHide {
		from {
			transform: translateY(0%);
		}

		to {
			transform: translateY(100%);
		}
	}

	@keyframes maskHide {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}

	.hide .mask {
		animation: maskHide 0.2s linear both;
	}

	.hide .mask .content {
		animation: contentHide 0.2s linear both;
	}

	@keyframes contentShow {
		from {
			transform: translateY(100%);
		}

		to {
			transform: translateY(0%);
		}
	}

	@keyframes maskShow {
		from {
			opacity: 0;
		}

		to {
			opacity: 1;
		}
	}

	.show {
		display: block;
	}

	.show .mask {
		animation: maskShow 0.2s linear both;
	}

	.show .mask .content {
		animation: contentShow 0.2s linear both;
	}
	.content {
		.maskAlert {
			width: 100%;
			height: 100%;
			position: fixed;
			background-color: rgba(0, 0, 0, 0.5); 
			top: 0;
		}
	}
</style>

