<template>
  <view class="content">
    <!-- 轮播图 -->
    <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
      <swiper class="swiper-box indexSwiperHeight" @change="change" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in info.slice(0,3)" :key="index">
          <view class="swiper-item" :class="'swiper-item' + index">
            <image :src="item.proImgs" style="width: 100%;height: 800rpx" />
            <text @click.stop="buyOrChange(item)" class="swiperText" style="swiper">即刻入手</text>
          </view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
	<view class="title">
		<view class="titleTop">{{form.name == null ? '' : form.name}}</view>
		<view class="titleContent">{{form.typeContent == null ? '' : form.typeContent}}</view>
	</view>
    <!-- 商品列表 -->
    <view class="pro">
		<view  v-for="(item, index) in shoplist" :key="index" class="proBox" @click.stop="jumpDetails(item)">
			<image  :src="item.proImgs" mode="scaleToFill" />
			<view class="proName">{{item.name}}</view>
			<view class="price">￥{{item.salePrice}}</view>
			<view class="number">({{item.pointsValue}}积分)</view>
			<view class="btn">
			<view class="left">购买/兑换</view>
			<view class="right">
			  <image @click.stop="shopclick(item)" src="../../static/index/shopIcon.png" mode="scaleToFill" />
			</view>
			</view>
		</view>
	</view>
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
				<view class="sub" @tap.stop="sub">
					<view class="icon jian">-</view>
				</view>
				<view class="input" @tap.stop="discard">
					<input :disabled="true" type="number" v-model="goodsData.number" />
				</view>
				<view class="add"  @tap.stop="add">
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
import BottomAlert from '@/components/goods/bottomAlert'
  import {
    uniSwiperDot
  } from '@/components/uni-swiper-dot_1.2.0/components/uni-swiper-dot/uni-swiper-dot.vue'
  export default {
	  components: {
		  BottomAlert,
	    uniSwiperDot
	  },
    data() {
      return {
		  selectArr: [],
		  subIndex: [],
		  goodsData:{
		  	number:1
		  },
		  specificationslist:[],
		  product:{
		  	proImgs:'',
		  	pname:'',
		  	price:'',
		  	pointsValue:'',
		  	inventorySum:0,
			salePrice:'',
			billValue:''
		  },
		  fuClassName: {
		    specifications: "none",
		  },
		form:{
			  name:'',
			  typeContent:''
		},
		shoplist:[
			
		],
        info: [],
        modeIndex: -1,
        styleIndex: -1,
        current: 0,
        mode: 'default',
        dotsStyles: {
			width: 6,
			bottom: 20,
			backgroundColor: 'rgba(255, 255, 255,0.3)',
			border: '1px rgba(255, 90, 95,0.3) solid',
			color: '#fff',
			selectedBackgroundColor: 'rgba(255, 255, 255,1)',
			selectedBorder: '1px rgba(255, 90, 95,0.9) solid'
		},
        swiperDotIndex: 0
      }
    },
    onLoad(options) {
		console.log('options',options)
		if(options.id){
			this.commodity(options.id)
		}
		
	},
    methods: {
		// 即可入手
		buyOrChange(item) {
			console.log('item',item)
			uni.navigateTo({
				url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`
			})
		},
		//减少数量
			sub(){
				if(this.goodsData.number<=1){
					return;
				}
				this.goodsData.number--;
			},
			//增加数量
			add(){
				if(this.goodsData.number>=this.product.inventorySum){
					return;
				}
				this.goodsData.number++;
			},
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
		//加入购物车
		shopclick(item){
			this.selectArr=[]
			this.subIndex=[]
			this.goodsData.number=1
			console.log('item.productId',item.productId)
			this.fuClassName.specifications= 'show'
			this.productIdid=item.productId
			this.getSpec(item.productId)
			this.getGoodsDetailsData(item.productId)
			
		},
		//确认加入购物车
		specificationsAlert(){
			let selectArr=this.selectArr
			let specificationslist=this.specificationslist
			let selelist=[]
			let specation=[]
			selectArr.forEach(val=>{
				console.log('val',)
				selelist.push(val)
			})
			specificationslist.forEach(value=>{
				specation.push(value)
			})
			if(selelist.length>=specation.length){
				let param={
					productId:this.productIdid,
					counts:this.goodsData.number,
					proSpecList:selelist
				}
				console.log('param',param)
				this.$Request.post('/mms/wx/v1//addCart',param).then(res => {
					if (res.code == 200) {
						this.$api.msg('添加成功');
						this.fuClassName.specifications= 'none'
					}else{
						// console.log('kkkkk',res.msg)
						this.$api.msg(res.msg);
					}
				})
			}else{
				this.$api.msg('请选择相应规格');
			}
			
		},
		// 查询商品信息
		commodity(id){
			this.$Request.get(`/mms/mobile/v1/productsTree/${id}`).then(res => {
				if(res.code==200){
					this.form.name=res.data[0].name
					this.form.typeContent=res.data[0].typeContent
					
					this.info=res.data[0].children
					this.shoplist=res.data[0].children
					
					uni.setNavigationBarTitle({
						title:this.form.name
					})
				}
				
			})
		},
		speciclice(){
			this.fuClassName.specifications= 'none'
		},
      // 轮播图
      change(e) {
        this.current = e.detail.current
      },
      // 跳商品详情
      jumpDetails(item) {
        uni.navigateTo({
          url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`
        })
      }
    },

  }
</script>

<style lang="scss" scoped>
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
  .swiper-box {
    height: 400rpx;
  }
  .swiper-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500rpx;
    color: #fff;
  }
  .indexSwiperHeight {
  		height: 800rpx;
  		.swiper-item {
  			display: block;
  			height: 800rpx;
  		}
  		.bannerImg {
  			height: 800rpx;
  			background: linear-gradient(to bottom, #fff, #13175a)
  		}
  	}
  .swiperText {
    position: relative;
    top: -140rpx;
    left: 40rpx;
    color: #fff;
    z-index: 999;
    border: 1px solid #fff;
    font-size: 24rpx;
    border-radius: 50rpx;
    padding: 15rpx 20rpx;
    letter-spacing: 5rpx;
  }
  .title {
		padding: 60rpx 30rpx 30rpx 30rpx;
		box-sizing: border-box;
		.titleTop {
			font-size: 40rpx;
			color: #000;
		}
		.titleContent {
			font-size: 32rpx;
			color: rgb( 128, 128, 128);
			margin-top: 10rpx;
		}
	}
  .pro {
				width: 100%;
				display: flex;
				flex-wrap: wrap;
			.proBox {
				padding: 20rpx 20rpx;
				box-sizing: border-box;
				width: 50%;
				image {
					width: 100%;
					height: 350rpx;
				}
				.proName {
					font-size: 35rpx;
					text-align: left;
					margin-top: 10rpx;
					margin-bottom: 20rpx;
				}
				.price {
					font-size: 32rpx;
					color: rgb( 89, 87, 87 );
				}
				.number{
					font-size: 30rpx;
					color: rgb( 89, 87, 87 );
				}
				.btn {
					display: flex;
					justify-content: space-between;
					.left {
						width: 190rpx;
						height: 60rpx;
						border-radius: 50rpx;
						text-align: center;
						line-height: 60rpx;
						font-size: 32rpx;
						color: #e99785;
						border: 1px solid #e99785;
						margin-top: 30rpx;
					}
					.right {
						image {
							width: 80rpx;
							height: 80rpx;
							display: flex;
							margin-top: 10rpx;
						}
					}
				}
			}
		}
</style>

