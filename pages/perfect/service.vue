<template>
	<view class="pagesvv">
		<view class="new-tit">{{form.title == null ? '' : form.title}}</view>
		<!-- <view class="new-time">{{form.createTime == null ? '' : form.createTime}}</view> -->
		<u-parse :html="form.content" :tag-style="style"></u-parse>
	</view>
</template>
<script>
export default {
data() {
	return {
		content:'',
		id:'',
		style:{
			img:'margin: auto;display: block;',
			strong:'margin-bottom: 3%;display: inline-block;',
			span:'font-size: 16px;color: rgb(0, 0, 0);font-family: 宋体, SimSun;'
		},
		form:{
			content:'',
			title:'',
			// createTime:'',
			// openCount:''
		}
	};
},
onShow() {

},
onLoad(options) {
	console.log('type',options.type)
	if(options.type){
		// this.id=options.id
		this.getdetails(options.type)
	}
},
methods: {
	getdetails(type){
		// let id=this.id
		this.$Request.get(`/mms/article/article/`+type).then(res => {
			if (res.code == 200) {
				if(res.data){
					this.form = res.data
					// this.form=res.data
				}
			}
		})
	},
},
};
</script>

<style lang="scss" scoped>
page{
	height: 100%;
	// background-color: #f6f6f6;
}
.pagesvv{
	margin-top: 3%;
	padding: 0 6%;
	margin-bottom: 5%;
	.new-tit{
		// font-weight: 600;
		text-align: center;
		color: rgba(16, 16, 16, 100);
		font-size: 40upx;
		font-family: PingFangSC-bold;
		// padding: 0 30upx 32upx 0;
		padding-bottom: 32upx;
	}
	.new-time{
		padding-bottom: 30upx;
		color: rgba(16, 16, 16, 100);
		font-size: 24upx;
		font-family: PingFangSC-semiBold;
		width: 100%;
		text-align: right;
		font-weight: 600;
	}
	.new-open{
		text-align: left;
		margin-bottom: 1rem;
	}
}	
</style>
