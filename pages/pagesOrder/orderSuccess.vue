<template>
  <view class="content">
    <view class="tipsBox">
      <view class="tips">
        <image src="../../static/index/shopIcon.png" mode="scaleToFill" /> 购买成功
      </view>
      <view class="payNum">实付￥{{payValue}}</view>
	  <view style="font-size: 28rpx;
    color: gray;
    text-align: center;
    margin-top: 15rpx;
    margin-bottom: 10rpx;" class="">本次购买赠送{{bonuspoints}}积分</view>
      <view class="btn">
        <view @click="returnin" class="left">返回首页</view>
        <view @click="meorurl" class="right">查看订单</view>
      </view>
    </view>
	<view v-for="(item, index) in proData" :key="index" class="">
		<TodayBuy :proData="item.children" :jjimage='item.typeImg' @buyOrChange="buyOrChange" @shopclick='shopclick'></TodayBuy>
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
		  bonuspoints:0,//赠送积分
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
		  payValue:0,
        title: 'Hello',
        proData: []
      }
    },
    onLoad(options) {
		if(options.payValue){
			this.payValue=options.payValue
			this.bonuspoints=options.payValue
		}
	},
	onShow() {
		this.recommend()
	},
    methods: {
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
		// 购买或兑换
		buyOrChange(item) {
			console.log('item',item)
			uni.navigateTo({
				url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`
			})
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
			this.goodsData.number=1
			this.selectArr=[]
			this.subIndex=[]
			console.log('item.productId',item.productId)
			this.fuClassName.specifications= 'show'
			this.productId=item.productId
			this.getSpec(item.productId)
			this.getGoodsDetailsData(item.productId)
			
		},
		speciclice(){
			this.fuClassName.specifications= 'none'
		},
		// pages/pagesOrder/orderSuccess
		returnin(){
			uni.switchTab({
			  url: `/pages/index/index`
			})
		},
		meorurl(){
			uni.reLaunch({
				url: `/pages/pagesUser/orderList?ishide=${53}`
			});
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
  .content {
    .tipsBox {
		border-radius: 0 0 133rpx 0;
		margin-bottom: 70rpx;
      background-color: #e8e9e9;
      padding: 60rpx 0rpx;
      box-sizing: border-box;
    }
    .tips {
      display: flex;
      justify-content: center;
      font-size: 36rpx;
      image {
        width: 30rpx;
        height: 30rpx;
        display: block;
        margin-top: 10rpx;
        margin-right: 10rpx;
      }
    }
    .payNum {
      font-size: 32rpx;
      color: rgb( 128, 128, 128 );
      text-align: center;
      margin-top: 15rpx;
      margin-bottom: 40rpx;
    }
    .btn {
      display: flex;
      justify-content: space-around;
      view {
        width: 180rpx;
        height: 65rpx;
        border-radius: 50rpx;
        font-size: 30rpx;
        color: rgb( 128, 128, 128 );
        text-align: center;
        line-height: 65rpx;
        border: 1px solid rgb( 128, 128, 128 );
      }
    }
  }
</style>




