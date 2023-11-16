<template>
	<view>
		<view class="">
			<view v-if="showHeader" class="header" :style="{position:headerPosition,top:headerTop}">
				<view class="title"><image src="../../static/user/houseIcon.png" mode="scaleToFill" />商品列表</view>
				<text style="margin-left: 50%;" class="right" @click="edit">编辑</text>
			</view>
			
		</view>
		
		<!-- 占位 -->
		<view v-if="showHeader" class="place"></view>
		<!-- 商品列表 -->
		<view class="goods-list">
			<view class="tis" v-if="goodsList.length==0">购物车是空的哦~</view>
            <view class="row" v-for="(row,index) in goodsList" :key="index" >
				<!-- 删除按钮 -->
				<view class="menu" @tap.stop="deleteGoods(row)">
					<image src="../../static/cloce.png" mode=""></image>
					<!-- <view class=" shanchu">删除</view> -->
				</view>
				<!-- 商品 -->
				<view class="carrier" :class="[theIndex==index?'open':oldIndex==index?'close':'']" @touchstart="touchStart(index,$event)" @touchmove="touchMove(index,$event)" @touchend="touchEnd(index,$event)">
					<!-- checkbox -->
					<view class="checkbox-box" @tap="selected(index)">
						<view class="checkbox">
							<view :class="[row.selected?'on':'']"></view>
						</view>
					</view>
					<!-- 商品信息 -->
					<view class="goods-info">
						<view class="img">
							<image @click="goodsdetils(row)" :src="row.proUrl"></image>
						</view>
						<view class="info">
							<view class="title" v-if="!editShow">
								<text style="display: inline-block;width: 100%;">{{row.productName == null ? '' : row.productName}}</text>
								<text style="background-color: #afafaf;color: #fff;font-size: 25rpx;padding: 2rpx;border-radius: 7rpx;">规格：{{row.proSpecComment == null ? '' : row.proSpecComment}}</text>
							</view>
							<view class="number" v-if="editShow">
								<view class="sub" @tap.stop="sub(index)">
									<view class="icon jian">-</view>
								</view>
								<view class="input">
									<input :disabled="true" type="number" v-model="row.counts" />
								</view>
								<view class="add"  @tap.stop="add(index)">
									<view class="icon jia">+</view>
								</view>
							</view>
							<view class="price-number">
								<view class="">
									<view class="price">￥{{row.indentPrice}}</view>
									<view style="font-size: 30upx;color: #bc8045;" class="">{{row.pointsValue}}积分</view>
								</view>
								<view class="num">X{{row.counts}}</view>
							</view>
						</view>
					</view>
				</view>
			</view>
        </view>
		<!-- 脚部菜单 -->
		<view class="footer">
			<view style="padding-left: 7%;" class="checkbox-box" @tap="allSelect">
				<view class="checkbox">
					<view :class="[isAllselected?'on':'']"></view>
				</view>
				<view class="text">全选</view>
			</view>
			<view class="settlement">
				<view class="sum">合计:<view class="money">￥{{sumPrice}}<view class="freight">不含运费</view></view></view>
				<view class="btn" @tap="toConfirmation">结算</view>
			</view>
		</view>
		<view v-for="(item, index) in proData" :key="index" class="">
			<!-- <view style="position: relative;" class="newGoodsTitle">
				<text class="newTitle">{{item.name}}</text>
			</view> -->
			<TodayBuy :proData="item.children" :jjimage='item.typeImg' @buyOrChange="buyOrChange" @shopclick='shopclick'></TodayBuy>
		</view>
		
		<view style="height: 120rpx"></view>
		<!-- 底部结算按钮 -->
	  <!-- <CarSubmitBtn @isAllSelect="isAllSelect" @submitBtn="submitBtn" :totalNumber="120"> </CarSubmitBtn> -->
		<view style="height: 230rpx"></view>
		<TabBar :cartnum=cartnum :indexSubPage="3"></TabBar>
		<!-- 规格选择 -->
		<BottomAlert :sc="fuClassName.specifications">
			<view class="proChoose">
				<view class="imgBox">
				  <view class="img">
					<image :src="product.proImgs" />
				  </view>
				  <view class="center">
					<view class="centerContent">{{product.pname==null ? '' : product.pname}}</view>
					<view class="price">￥{{product.billValue}}</view>
				  </view>
				</view>
				<image @click="speciclice" class="chacha" src="../../static/user/chacha.png" mode="scaleToFill" />
			</view>
			<!-- 颜色 -->
			<view v-for="(item,n) in specificationslist" :key="n" class="">
				<view class="color">{{item.specType}}:</view>
				<view class="sp">
					<view v-for="(aitem,index) in item.productSpecifications" :key="index" :class="subIndex[n] == index?'on':''" @click="chooseItem(n,aitem,index)">
						<text  >{{aitem.specName}}</text>
					</view>
				</view>
			</view>
		
			<!-- 数量 -->
			<view class="amount">
				<view class="left">
				  <view>购买数量：</view>
				  <view>剩余{{product.inventorySum}}件</view>
				</view>
				<view class="number">
					<!-- <u-number-box :min="min" v-model="goodsData.number" @change="valChange"></u-number-box> -->
					<view class="sub" @tap.stop="recommendsub">
						<view class="icon jian">-</view>
					</view>
					<view class="input" @tap.stop="discard">
						<input :disabled="true" type="number" v-model="goodsData.number" />
					</view>
					<view class="add"  @tap.stop="recommendadd">
						<view class="icon jia">+</view>
					</view>
				</view>
			</view>
			<view class="submit" @click="specificationsAlert">确认</view>
			<view style="height: 130upx"></view>
		</BottomAlert>
	</view>
</template>

<script>
import TodayBuy from '@/components/shopCar/todayBuy'
import BottomAlert from '@/components/goods/bottomAlert'
	export default {
		components: {
			TodayBuy,
			BottomAlert
		},
		data() {
			return {
				cartnum:0,//购物车数量
				
				productId:'',
				specificationslist:[],
				product:{
					proImgs:'',
					pname:'',
					price:'',
					pointsValue:'',
					inventorySum:0,
				},
				goodsData:{
					number:1
				},
				fuClassName: {
				  specifications: "none",
				},
				selectArr: [],
				subIndex: [],
				
				
				editShow: false,
				sumPrice:'0.00',
				headerPosition:"fixed",
				headerTop:null,
				statusTop:null,
				showHeader:true,
				selectedList:[],
				isAllselected:false,
				goodsList:[],
				//控制滑动效果
				theIndex:null,
				oldIndex:null,
				isStop:false,
				tjshoping:'../../static/index/bg.png',
				proData: []
			}
		},
		onPageScroll(e){
			//兼容iOS端下拉时顶部漂移
			this.headerPosition = e.scrollTop>=0?"fixed":"absolute";
			this.headerTop = e.scrollTop>=0?null:0;
			this.statusTop = e.scrollTop>=0?null:-this.statusHeight+'px';
		},
		//下拉刷新，需要自己在page.json文件中配置开启页面下拉刷新 "enablePullDownRefresh": true
		onPullDownRefresh() {
		    setTimeout(function () {
		        uni.stopPullDownRefresh();
		    }, 1000);
		},
		onLoad() {
			uni.hideTabBar()
			//兼容H5下结算条位置
			// #ifdef H5
				this.footerbottom = document.getElementsByTagName('uni-tabbar')[0].offsetHeight+'px';
			// #endif
			// #ifdef APP-PLUS
			this.showHeader = false;
			this.statusHeight = plus.navigator.getStatusbarHeight();
			// #endif
		},
		async onShow() {
			console.log('this.isAllselected',this.isAllselected)
			this.sumPrice='0.00'
			this.getshop()
			this.recommend()
			let nickName=uni.getStorageSync('nickName')
			// if(nickName){
			// 	this.userInfo.nickName=nickName
				
			// 	this.login()
			// }else{
			// 	let pidurl='/pages/index/car'
			// 	uni.reLaunch({
			// 		url: `/pages/warrant/warrant?pid=${pidurl}`
			// 	})
			// }
			
		},
		methods: {
			goodsdetils(item){
				console.log('item',item)
				uni.navigateTo({
					url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`
				})
			},
			chooseItem( _pIndex, _name, index) {
				if (this.selectArr[_pIndex] != _name) {
					// console.log('index',index)
					this.$set(this.selectArr, _pIndex, _name);
					this.$set(this.subIndex, _pIndex, index);
					// console.log('this.subIndex',this.subIndex)
					// console.log('_pIndex',_pIndex)
				} else {
					this.selectArr.splice( _pIndex,1)
					// this.$set(this.selectArr, _pIndex, '{}');
					this.$set(this.subIndex, _pIndex, -1); //去掉选中颜色
				}
				console.log(this.selectArr)
			},
			//减少数量
			recommendsub(){
				if(this.goodsData.number<=1){
					return;
				}
				this.goodsData.number--;
			},
			//增加数量
			recommendadd(){
				if(this.goodsData.number>=this.product.inventorySum){
					return;
				}
				this.goodsData.number++;
			},
			// 查询推荐商品
			recommend(){
				this.$Request.get('/mms/mobile/v1/recommendedProdTree').then(res => {
					if(res.code==200){
						this.proData=res.data	
					}
					
				})
			},
			//查询购物车列表
			getshop(){
				this.$Request.getT('/mms/wx/v1//getCarts').then(res => {
					if(res.code==200){
						this.goodsList=res.data	
						this.cartnum=res.data.length
					}
					
				})
			},
			// 购买或兑换
			buyOrChange(item) {
				console.log('item',item)
				uni.navigateTo({
					url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`
				})
			},
			edit() {
				this.editShow = !this.editShow
			},
			//加入商品 参数 goods:商品数据
			joinGoods(goods){
				/*
				* 这里只是展示一种添加逻辑，模板并没有做从其他页面加入商品到购物车的具体动作，
				* 在实际应用上，前端并不会直接插入记录到goodsList这一个动作，一般是更新列表和本地列表缓存。
				* 一般商城购物车的增删改动作是由后端来完成的,
				* 后端记录后返回前端更新前端缓存
				*/
				let len = this.goodsList.length;
				let isFind = false;//是否找到ID一样的商品
				for(let i=0;i<len;i++){
					let row = this.goodsList[i];
					if(row.id==goods.id )
					{	//找到商品一样的商品
						this.goodsList[i].number++;//数量自增
						isFind = true;//找到一样的商品
						break;//跳出循环
					}
				}
				if(!isFind){
					//没有找到一样的商品，新增一行到购物车商品列表头部
					this.goodsList[i].unshift(goods);
				}
			},
			//控制左滑删除效果-begin
			touchStart(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				this.oldIndex = this.theIndex;
				this.theIndex = null;
				//初始坐标
				this.initXY = [event.touches[0].pageX,event.touches[0].pageY];
			},
			touchMove(index,event){
				//多点触控不触发
				if(event.touches.length>1){
					this.isStop = true;
					return ;
				}
				let moveX = event.touches[0].pageX - this.initXY[0];
				let moveY = event.touches[0].pageY - this.initXY[1];
				
				if(this.isStop||Math.abs(moveX)<5){
					return ;
				}
				if (Math.abs(moveY) > Math.abs(moveX)){
					// 竖向滑动-不触发左滑效果
					this.isStop = true;
					return;
				}
				
				if(moveX<0){
					this.theIndex = index;
					this.isStop = true;
				}else if(moveX>0){
					if(this.theIndex!=null&&this.oldIndex==this.theIndex){
						this.oldIndex = index;
						this.theIndex = null;
						this.isStop = true;
						setTimeout(()=>{
							this.oldIndex = null;
						},150)
					}
				}
			},
			touchEnd(index,$event){
				//结束禁止触发效果
				this.isStop = false;
			},
			//控制左滑删除效果-end
			
			//删除商品
			deleteGoods(item){
				this.$Request.post('/mms/wx/v1/delCart/'+item.billPackId).then(res => {
					if (res.code == 200) {
						this.$api.msg('删除成功');
						this.getshop()
						
						this.sum();
						this.oldIndex = null;
						this.theIndex = null;
					}else{
						// console.log('kkkkk',res.msg)
						this.$api.msg(res.msg);
					}
				})
				
			},
			// 选中商品
			selected(index){
				this.goodsList[index].selected = this.goodsList[index].selected?false:true;
				let i = this.selectedList.indexOf(this.goodsList[index].billPackId);
				i>-1?this.selectedList.splice(i, 1):this.selectedList.push(this.goodsList[index].billPackId);
				this.isAllselected = this.selectedList.length == this.goodsList.length;
				this.sum();
			},
			//全选
			allSelect(){
				let len = this.goodsList.length;
				let arr = [];
				for(let i=0;i<len;i++){
					this.goodsList[i].selected = this.isAllselected? false : true;
					arr.push(this.goodsList[i].id);
				}
				this.selectedList = this.isAllselected?[]:arr;
				this.isAllselected = this.isAllselected||this.goodsList.length==0?false : true;
				this.sum();
			},
			// 减少数量
			sub(index){
				if(this.goodsList[index].counts<=1){
					return;
				}
				this.goodsList[index].counts--;
				this.sum();
			},
			// 增加数量
			add(index){
				if(this.goodsList[index].counts>=this.goodsList[index].inventorySum){
					return;
				}
				this.goodsList[index].counts++;
				this.sum();
			},
			// 合计
			sum(e,index){
				this.sumPrice=0;
				let len = this.goodsList.length;
				for(let i=0;i<len;i++){
					if(this.goodsList[i].selected) {
						if(e && i==index){
							console.log('this.sumPrice1',this.sumPrice)
							this.sumPrice = this.sumPrice + (e.detail.value*this.goodsList[i].indentPrice);
						}else{
							console.log('this.sumPrice2',this.sumPrice)
							this.sumPrice = this.sumPrice + (this.goodsList[i].counts*this.goodsList[i].indentPrice);
						}
					}
				}
				
				console.log('this.goodsList',this.goodsList)
				this.sumPrice = this.sumPrice.toFixed(2);
			},
			// 查询商品详情
			getGoodsDetailsData(productId){
				let url='/mms/mobile/v1/product/'+productId
				this.$Request.get(url).then(res => {
					if (res.code == 200) {
						this.product=res.data
						
					}
				})
			},
			// 查询规格
			getSpec(productId){
				this.specificationslist=[]
				let url='/mms/wx/v1/productSpec/'+productId
					this.$Request.getT(url).then(res => {
						if (res.code == 200) {
							this.specificationslist=res.data
						}
				})
			},
			//确认加入购物车
			specificationsAlert(){
				let selectArr=this.selectArr
				let specificationslist=this.specificationslist
				let selelist=[]
				let specation=[]
				if(this.specificationslist){
					selectArr.forEach(val=>{
						selelist.push(val)
					})
					specificationslist.forEach(value=>{
						specation.push(value)
					})
					if(selelist.length>=specation.length){
						let param={
							productId:this.productId,
							counts:this.goodsData.number,
							proSpecList:selelist
						}
						console.log('param',param)
						this.$Request.post('/mms/wx/v1//addCart',param).then(res => {
							if (res.code == 200) {
								this.$api.msg('添加成功');
								this.fuClassName.specifications= 'none'
								this.getshop()
							}else{
								// console.log('kkkkk',res.msg)
								this.$api.msg(res.msg);
							}
						})
					}else{
						this.$api.msg('请选择相应规格');
					}
				}else{
					this.$api.msg('请选择相应规格');
				}
				
				
			},
			//加入购物车
			shopclick(item){
				this.selectArr=[]
				this.subIndex=[]
				this.goodsData.number=1
				console.log('item.productId',item.productId)
				this.fuClassName.specifications= 'show'
				this.productId=item.productId
				this.getSpec(item.productId)
				this.getGoodsDetailsData(item.productId)
				
			},
			speciclice(){
				this.fuClassName.specifications= 'none'
			},
			//结算
			toConfirmation(){
				let tmpList=[];
				let len = this.goodsList.length;
				for(let i=0;i<len;i++){
					if(this.goodsList[i].selected) {
						tmpList.push(this.goodsList[i]);
					}
				}
				if(tmpList.length<1){
					uni.showToast({
						title:'请选择商品结算',
						icon:'none'
					});
					return ;
				}else{
					// let param={
					// 	tmpList,
					// }
					this.$Request.post('/mms/wx/v1/cartSettlement',tmpList).then(res => {
						if (res.code == 200) {
							// this.$api.msg('添加成功');
							uni.navigateTo({
								url: `/pages/pagesOrder/submitOrder?pagesid=${2}&totalpayl=${this.sumPrice}`
							})
							// tmpList.forEach(val=>{
							// 	val.selected=false
							// })
							this.isAllselected=false
						}else{
							// console.log('kkkkk',res.msg)
							this.$api.msg(res.msg);
						}
					})
				}
				
				console.log('tmpList',tmpList)
				// uni.setStorage({
				// 	key:'buylist',
				// 	data:tmpList,
				// 	success: () => {
				// 		uni.navigateTo({
				// 			url: `/pages/pagesOrder/submitOrder`
				// 		})
				// 	}
				// })
			},
			
		},
		
	}
</script>
<style lang="scss" scoped>
	page{position: relative;background-color: #fff;}
	.amount {
	  display: flex;
	  justify-content: space-between;
	  margin-top: 55rpx;
	  padding: 0 40rpx;
	  box-sizing: border-box;
	  .left {
	    view:nth-child(1) {
	      font-size: 34rpx;
	    }
	    view:nth-child(2) {
	      font-size: 30rpx;
	    }
	  }
	  .number{
	  	display: flex;
	  	justify-content: center;
	  	align-items: center;
	  	height: 80upx;
	  	.input{
	  		// width: 60upx;
	  		// height: 60upx;
	  		// margin: 0 10upx;
	  		// background-color: #f3f3f3;
	  		input{
	  			width: 72rpx;
	  			height: 52rpx;
	  			display: flex;
	  			border: 0.5px solid #7b7a7a;
	  			justify-content: center;
	  			align-items: center;
	  			text-align: center;
	  			font-size: 26rpx;
	  		}
	  	}
	  	.sub ,.add{
	  		// width: 45upx;
	  		// height: 45upx;
	  		// background-color: #f3f3f3;
	  		// border-radius: 5upx;
	  		.icon{
	  			font-size: 32rpx;
	  			width: 72rpx;
	  			height: 52rpx;
	  			display: flex;
	  			justify-content: center;
	  			border: 0.5px solid #7b7a7a;
	  			align-items: center;
	  			
	  		}
	  	}
	  }
	}
	.submit {
	  height: 70rpx;
	  width: 170rpx;
	  border: 1rpx solid #7b7a7a;
	  display: block;
	  margin: 0 auto;
	  line-height: 70rpx;
	  text-align: center;
	  font-size: 34rpx;
	  letter-spacing: 7rpx;
	  margin-top: 50rpx;
	}
	.color {
	  font-size: 36rpx;
	  padding: 0 40rpx;
	  margin-top: 20rpx;
	  margin-bottom: 20rpx;
	  box-sizing: border-box;
	}
	.sp {
		width: 100%;
		display: flex;
		padding: 0 5%;
		view {
			height: 31px;
			line-height: 31px;
			padding: 0 15px;
			box-sizing: border-box;
			border: 2upx solid #7b7a7a;
			color: #7b7a7a;
			margin-right: 10px;
			&.on{
				border: solid 4upx #f47952;
				height: 31px;
				line-height: 31px;
				padding: 0 15px;
				box-sizing: border-box;
				color: #7b7a7a;
				margin-right: 10px;
			}
		}
	}
	.proChoose {
	  display: flex;
	  justify-content: space-between;
	  padding: 0 30rpx;
	  padding-bottom: 20rpx;
	  border-bottom: 1rpx solid #ccc;
	  box-sizing: border-box;
	      background-color: #cacaca;
	  .imgBox {
	    display: flex;
	    .img {
	      image {
	        width: 170rpx;
	        height: 170rpx;
	        margin-top: -40rpx;
	        margin-right: 20rpx;
	      }
	    }
	    .center {
	      padding-top: 15rpx;
	      font-size: 32rpx;
	      .price {
	        margin-top: 10rpx;
	        color: #a46c4d;
	        font-size: 36rpx
	      }
	    }
	  }
	  .chacha {
	    width: 50rpx;
	    height: 50rpx;
	    margin-top: 15rpx;
	  }
	}
	.checkbox-box{
		display: flex;
		align-items: center;
		padding-left: 3%;
		.checkbox{
			width: 35upx;
			height: 35upx;
			border-radius: 100%;
			border: solid 2upx #f06c7a;
			display: flex;
			justify-content: center;
			align-items: center;
			.on{
				width: 25upx;
				height: 25upx;
				border-radius: 100%;
				background-color: #f06c7a;
			}
		}
		.text{
			font-size: 28upx;
			margin-left: 10upx;
		}
	}
.status {
		width: 100%;
		height: 0;
		position: fixed;
		z-index: 10;
		background-color: #fff;
		top: 0;
		/*  #ifdef  APP-PLUS  */
		height: var(--status-bar-height);//覆盖样式
		/*  #endif  */
	}

	.header{
		width: 100%;
		padding: 0 4%;
		height: 100upx;
		display: flex;
		align-items: center;
		position: fixed;
		top: 0;
		z-index: 10;
		background-color: #fff;
		/*  #ifdef  APP-PLUS  */
		top: var(--status-bar-height);
		/*  #endif  */
		.title{
			// margin-left: 5%;
			font-size: 32upx;
			image{
				width: 36upx;
				height: 30upx;
				vertical-align: middle;
				margin-left: 26upx;
				margin-right: 10upx;
			}
		}
		
	}
	.place{
		
		background-color: #ffffff;
		height: 100upx;
		/*  #ifdef  APP-PLUS  */
		margin-top: var(--status-bar-height);
		/*  #endif  */
	}
	.goods-list{
		width: 100%;
		padding: 20upx 0 120upx 0;
		.tis{
			width: 100%;
			height: 60upx;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 32upx;
		}
		.row{
			width: calc(92%);
			height: calc(22vw + 40upx); 
			margin: 20upx auto;
			
			border-radius: 15upx;
			// box-shadow: 0upx 5upx 20upx rgba(0,0,0,0.1);
			display: flex;
			align-items: center;
			position: relative;
			overflow: hidden;
			z-index: 4;
			border: 0;
			.menu{
				.icon{
					color: #fff;
					// font-size: 25upx;
				}
				position: absolute;
				width: 22%;
				height: 100%;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				background-color: #EA5863;
				color: #fff;
				z-index: 2;
				image{
					width: 50upx;
					height: 55upx;
				}
			}
			.carrier{
				@keyframes showMenu {
					0% {transform: translateX(0);}100% {transform: translateX(-30%);}
				}
				@keyframes closeMenu {
					0% {transform: translateX(-30%);}100% {transform: translateX(0);}
				}
				&.open{
					animation: showMenu 0.25s linear both;
				}
				&.close{
					animation: closeMenu 0.15s linear both;
				}
				background-color: #fff;
				.checkbox-box{
					padding-left: 20upx;
					flex-shrink: 0;
					height: 22vw;
					margin-right: 20upx;
				}
				position: absolute;
				width: 100%;
				padding: 0 0;
				height: 100%;
				z-index: 3;
				display: flex;
				align-items: center;

				.goods-info{
					width: 100%;
					display: flex;
					padding-right: 20upx;
					.img{
						width: 186upx;
						height: 186upx;
						// border-radius: 10upx;
						overflow: hidden;
						flex-shrink: 0;
						// margin-right: 10upx;
						image{
							width: 100%;
							height: 100%;
						}
					}
					.info{
						width: 100%;
						margin-left: 20upx;
						// height: 22vw;
						overflow: hidden;
						display: flex;
						flex-wrap: wrap;
						position: relative;
						.title{
							width: 100%;
							font-size: 28upx;
							display: -webkit-box;
							-webkit-box-orient: vertical;
							-webkit-line-clamp: 2;
							// text-align: justify;
							overflow: hidden;
						}
						.price{
							margin-bottom: 5px;
							font-size: 30upx;
							color: #bc8045;
						}
						.number{
							display: flex;
							justify-content: center;
							align-items: center;
							height: 80upx;
							.input{
								// width: 60upx;
								// height: 60upx;
								// margin: 0 10upx;
								// background-color: #f3f3f3;
								input{
									width: 72rpx;
									height: 52rpx;
									display: flex;
									border: 0.5px solid #bc8045;
									justify-content: center;
									align-items: center;
									text-align: center;
									font-size: 26rpx;
								}
							}
							.sub ,.add{
								// width: 45upx;
								// height: 45upx;
								// background-color: #f3f3f3;
								// border-radius: 5upx;
								.icon{
									font-size: 32rpx;
									width: 72rpx;
									height: 52rpx;
									display: flex;
									justify-content: center;
									border: 0.5px solid #bc8045;
									align-items: center;
									
								}
							}
						}
						.spec{
							font-size: 20upx;
							background-color: #f3f3f3;
							color: #a7a7a7;
							height: 30upx;
							display: flex;
							align-items: center;
							padding: 0 10upx;
							border-radius: 15upx;
							margin-bottom: 20vw;
						}
						.price-number{
							position: absolute;
							width: 100%;
							bottom: 0upx;
							display: flex;
							justify-content: space-between;
							align-items: flex-end;
							font-size: 28upx;
							height: 60upx;
							
							
						}
					}
				}
			}
		}
	}
	.footer{
		position: fixed;
		bottom: 140rpx;
		display: flex;
		justify-content: space-between;
		height: 100rpx;
		width: 98%;
		margin: 0 auto;
		border-radius: 50rpx;
		background-color: #fff;
		border: 1rpx solid #f1f1f1;
		z-index: 9;
		.delBtn{
			border: solid 1upx #f06c7a;
			color: #f06c7a;
			padding: 0 30upx;
			height: 50upx;
			border-radius: 30upx;
			display: flex;
			justify-content: center;
			align-items: center;
		}
		.settlement{
			width: 60%;
			display: flex;
			justify-content: flex-end;
			align-items: center;
			.sum{
				width: 50%;
				font-size: 28upx;
				margin-right: 10upx;
				display: flex;
				justify-content: flex-end;
				.money{
					font-weight: 600;
				}
				.freight {
				  margin-top: 4rpx;
				  font-size: 30rpx;
				}
			}
			.btn{
				width: 90px;
				background-color: #e43b29;
				height: 98rpx;
				border-radius: 0 50rpx 50rpx 0;
				color: #fff;
				font-size: 32rpx;
				text-align: center;
				line-height: 98rpx;
				letter-spacing: 5rpx;
				border: 1rpx solid #e43b29;
			}
		}
	}
</style>
