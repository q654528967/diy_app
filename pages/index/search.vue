
<template>
    <view class="tabBox">
      <view class="search">
        <view class="searchBox">
          <!-- <image src="../../static/searchIcon.png" mode="scaleToFill" /> -->
		  <u-search placeholder="查找产品····" v-model="searchData" @custom='search'></u-search>
          <!-- <u-input :disabled="true" v-model="searchData" placeholder="查找产品····" /> -->
        </view>
      </view>
	  <view class="search_rm">
	  	<text style="font-size: 32rpx;font-weight: 600;">热门搜索</text>
		<view style="width: 90%;padding: 2% 0;" class="">
			<text @click="popularclick(item)" style="font-size: 30rpx;display: inline-block;margin-right: 6%;margin-top: 6%;font-weight: 600;" v-for="(item, index) in searchrm" :key="index">{{item.searchContent}}</text>
		</view>
	  </view>
	  <!-- 商品列表 -->
	  <view class="pro">
	  	<view  v-for="(item, index) in shoplist" :key="index" class="proBox" @click.stop="jumpDetails(item)">
	  		<image :src="item.posterImg" mode="scaleToFill" />
	  		<view class="proName">{{item.pname}}</view>
	  		<view class="price">￥{{item.billValue}}</view>
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
  export default {
	  components: {
	  		BottomAlert,
	  },
    data() {
      return {
		  selectArr: [],
		  subIndex: [],
		  searchrm:[
			  {
				  
			  }
		  ],
		  searchData:'',
		  
		  shoplist:[],
		  fuClassName: {
		    specifications: "none",
		  },
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
      };
    },
	onShow() {
		this.getseach()
	},
    methods: {
		popularclick(item){
			this.searchData=item.searchContent
			this.search()
		},
		search(){
			let param={
				searchContent:this.searchData,
			}
			console.log('param',param)
			this.$Request.posts('/mms/mobile/v1/productSearch',param).then(res => {
				if (res.code == 200) {
					this.shoplist=res.data
					this.getseach()
				}else{
					this.$api.msg(res.msg);
				}
			})
		},
      getseach(){
		  this.$Request.get('/mms/mobile/v1/searchHistory').then(res => {
		  	if (res.code == 200) {
		  		this.searchrm=res.data
		  	}
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
	  speciclice(){
	  	this.fuClassName.specifications= 'none'
	  },
	  // 跳商品详情
	  jumpDetails(item) {
	    uni.navigateTo({
	      url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`
	    })
	  }
    },
  };
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
    .tabBox {
		// padding-top: 38rpx;
      position: relative;
      padding: 0 2%;
      box-sizing: border-box;
      .left {
        image {
        position: absolute;
        left: 30rpx;
        bottom: 30rpx;
          width: 40rpx;
          height: 38rpx;
          display: block;
          margin-top: 0rpx;
        }
      }
      .search {
		// display: flex;
		// align-items: center;
		    width: 100%;
			padding: 3% 0;
		justify-content: center;
		border-bottom: 1px solid #d0d0d0;
        .searchBox {
			width: 80%;
			margin: auto;
			height: 90rpx;
			line-height: 90rpx;
		  image {
		    width: 40rpx;
		    height: 40rpx;
		  }
        }
        
        input {
          width: 180rpx;
          height: 100%;
          line-height: 180rpx;
          margin-left: 15rpx;
          color: #000;
        }
        .input-placeholder {
          color: #000;
        }
      }
	  .search_rm{
			padding: 4% 0 2% 2%;
			border-bottom: 1px solid #d0d0d0;
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