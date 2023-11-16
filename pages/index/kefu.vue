<template>
	<view class="content">
		<view>
			<text class="title">{{title}}</text>
		</view>
		<TabBar :cartnum=cartnum :indexSubPage="2"></TabBar>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				cartnum:0,
				title: 'Hello',
			}
		},
		onLoad() {
			uni.hideTabBar()
		},
		onShow() {
			this.getshop()
		},
		methods: {
			//查询购物车列表
			getshop(){
				this.$Request.getT('/mms/wx/v1//getCarts').then(res => {
					if(res.code==200){
						this.cartnum=res.data.length	
					}
					
				})
			},
		}
	}
</script>

<style lang="scss" scoped>
</style>

