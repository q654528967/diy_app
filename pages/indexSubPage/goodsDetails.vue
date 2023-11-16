<template>
	<view class="content">
		<!-- <Top @searchChange="searchChange"></Top> -->
		<!-- 轮播图 -->
		<!-- <view style="height: 148rpx"></view> -->
    <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :info="info" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content">
      <swiper class="swiper-box indexSwiperHeight" @change="change" :current="swiperDotIndex">
        <swiper-item v-for="(item, index) in product.imgList" :key="index">
			<view @click.stop="arrowleft" class="arrow_img">
				<image src="../../static/left-arrow.png" mode=""></image>
			</view>
			<view class="swiper-item" :class="'swiper-item' + index">
				<image :src="item" style="width: 100%;height: 800rpx" />
				<text class="swiperText" style="swiper">即刻入手</text>
			</view>
        </swiper-item>
      </swiper>
    </uni-swiper-dot>
    <!-- 商品 -->
    <view class="goodsDetails">
      <view class="left">
        <view class="title">{{product.pname==null ? '' : product.pname}}</view>
        <view class="price">￥{{product.billValue}} / {{product.pointsValue}}积分</view>
      </view>
      <view class="right">
        <image @click="addCar" src="../../static/index/shopIcon.png" mode="scaleToFill" />
      </view>
    </view>
   <!-- <view class="info">
      <view>快递：包邮</view>
      <view>月销12笔</view>
      <view>陕西西安</view>
    </view> -->
    <!-- 服务 参数 优惠券 -->
    <view class="serverMt">
		<view class="server_to" @click="chooseGoodsDel('coupons')">
			<view class="left">
			  <view class="leftTitle">优惠</view>
			  <view v-if="couponlist.length==0" class="lis">无优惠券可用</view>
			  <view v-else class="lis">{{couponsname}}</view>
			</view>
			<view class="">
			 <!-- 领券 -->
			  <image style="width: 110upx;height: 72upx;" src="../../static/lqcoupon.png" mode="scaleToFill" />
			</view>
		</view>
		<view class="server" @click="chooseGoodsDel('service')">
			<view class="left">
			  <view class="leftTitle">服务</view>
			  <view class="lis">正品保证-极速退款-七天退换</view>
			</view>
			<view class="lis">
			  <image src="../../static/right.png" mode="scaleToFill" />
			</view>
		</view>
      <!-- <view class="server">
        <view class="left">
          <view class="leftTitle">参数</view>
          <view class="lis">产品类别 品牌</view>
        </view>
        <view class="lis">
          <image src="../../static/right.png" mode="scaleToFill" />
        </view>
      </view> -->

	  
      <view class="server" @click="chooseGoodsDel('specifications')">
        <view class="left">
          <view class="leftTitle">选择</view>
          <!-- <view class="lis">请选择颜色分类尺寸</view> -->
		  <view class="lis">{{productspec}}</view>
        </view>
        <view class="lis">
          <image src="../../static/right.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- 富文本 -->
    <view class="richText">
      <view class="richtitle">
        <view :class="[clickTab==0?'details detailsBorder' : 'details']" @click="clickchage(0)">商品详情</view>
        <view class="line"></view>
        <view :class="[clickTab==1?'details detailsBorder' : 'details']" @click="clickchage(1)">商品评价</view>
      </view>
    </view>
    <!-- 富文本内容 商品详情-->
    <view class="richContent" v-show="clickTab == 0">
      
      <view class="hotGoods">
        <view class="recommend">
          <u-parse :html="product.content"></u-parse>
        </view>
		<view class="bg"></view>
        <!-- 商品列表 -->
		
        <view v-for="(item, index) in recommendlist" :key="index" class="pro">
			<!-- <view style="width: 900rpx;height: 300rpx;margin-right: 30rpx;" class="">
				<image style="width: 100%;height: 100%;" src="../../static/index/bg.png" mode=""></image>
			</view> -->
			<Details :proData="item.children" @buyOrChange="buyOrChange" @shopclick='shopclick'></Details>
        </view>
      </view>
    </view>
    <!-- 富文本内容 商品评价-->
    <view class="richContent" v-show="clickTab == 1">
		<view v-for="(item, index) in evaluatelist" :key="index" class="content">
			<view class="userInfo">
				<view class="left">
					<image class="userIcon" :src="item.custImg || '../../static/missing-face.png'" mode="scaleToFill" />
					<view class="nameBox">
						<view class="name">{{item.custName == null ? '' : item.custName}}</view>
					  <!-- <view class=""> -->
					  	<image v-for="(box, m) in parseFloat(item.commentD)" :key="m" style="width: 30rpx;height: 30rpx;margin-left: 10rpx;margin-top: 10rpx;" src="../../static/goods/sstars.png" mode=""></image>
					</view>
				</view>
				<view class="right">{{item.createTime == null ? '' : item.createTime}}</view>
			</view>
			<view class="text">
			 {{item.content == null ? '' : item.content}}
			</view>
			<!-- <view class="time">32分钟前</view> -->
			<!-- <view class="buyTime">购买时间: 2323-23-89</view> -->
		</view>
      <!-- 推荐商品 -->
      <view class="hotGoods">
        <view class="recommend">
          <image src="../../static/goods/hotGoods.png" mode="scaleToFill" />
        </view>
        <!-- 商品列表 -->
        <view v-for="(item, index) in recommendlist" :key="index" class="pro">
          <Details :proData="item.children" @buyOrChange="buyOrChange" @shopclick='shopclick'></Details>
        </view>
      </view>
    </view>
    <!-- height -->
    <view style="height: 80rpx"></view>
    <AddOrBuy @addCar="addCar" @addCarsubmit='addCarsubmit'></AddOrBuy>
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
        <image @click="specificationsAlert('speciclose')" class="chacha" src="../../static/user/chacha.png" mode="scaleToFill" />
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
        <!-- <view class="right"> -->
		<view class="number">
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
        <!-- </view> -->
      </view>
      <view class="submit" @click="specificationsAlert('shopingcart')">确认</view>
      <view style="height: 90rpx"></view>
    </BottomAlert>
	
	<!-- 推荐商品规格选择 -->
	<BottomAlert :sc="fuClassName.specirecommend">
	  <view class="proChoose">
	    <view class="imgBox">
	      <view class="img">
	        <image :src="productrecommend.proImgs" />
	      </view>
	      <view class="center">
	        <view class="centerContent">{{productrecommend.pname==null ? '' : productrecommend.pname}}</view>
	        <view class="price">￥{{productrecommend.billValue}}</view>
	      </view>
	    </view>
	    <image @click="specificationsAlert('specirecommend')" class="chacha" src="../../static/user/chacha.png" mode="scaleToFill" />
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
	      <view>剩余{{productrecommend.inventorySum}}件</view>
	    </view>
	    <!-- <view class="right"> -->
		<view class="number">
			<view class="sub" @tap.stop="recommendsub">
				<view class="icon jian">-</view>
			</view>
			<view class="input" @tap.stop="discard">
				<input :disabled="true" type="number" v-model="goodsrecommend.number" />
			</view>
			<view class="add"  @tap.stop="recommendadd">
				<view class="icon jia">+</view>
			</view>
		</view>
	    <!-- </view> -->
	  </view>
	  <view class="submit" @click="specifirecommend('specirecommend')">确认</view>
	  <view style="height: 90rpx"></view>
	</BottomAlert>
	
    <!-- 服务 -->
    <BottomAlert :sc="fuClassName.service">
        <view class="serverTitle">服务</view>
          <view class="couponBox">
			  <scroll-view style="height: 600upx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
				  <view class="serverList">
				    <image src="../../static/goods/gougou.png" mode="scaleToFill" />
				    <view class="right">
				      <view class="rightTitle">破损包退</view>
				      <view class="rightContent">所售商品在签收时如有商品破损、变形等情形，且在签收后24小时内提供凭证申请退货的，商家承诺进行退货退款处理。</view>
				    </view>
				  </view>
				  <view class="serverList">
				    <image src="../../static/goods/gougou.png" mode="scaleToFill" />
				    <view class="right">
				      <view class="rightTitle">破损包退</view>
				      <view class="rightContent">所售商品在签收时如有商品破损、变形等情形，且在签收后24小时内提供凭证申请退货的，商家承诺进行退货退款处理。</view>
				    </view>
				  </view>
				  <view class="serverList">
				    <image src="../../static/goods/gougou.png" mode="scaleToFill" />
				    <view class="right">
				      <view class="rightTitle">破损包退</view>
				      <view class="rightContent">所售商品在签收时如有商品破损、变形等情形，且在签收后24小时内提供凭证申请退货的，商家承诺进行退货退款处理。</view>
				    </view>
				  </view>
				  <view class="serverList">
				    <image src="../../static/goods/gougou.png" mode="scaleToFill" />
				    <view class="right">
				      <view class="rightTitle">破损包退</view>
				      <view class="rightContent">所售商品在签收时如有商品破损、变形等情形，且在签收后24小时内提供凭证申请退货的，商家承诺进行退货退款处理。</view>
				    </view>
				  </view>
				  <view class="serverList">
				    <image src="../../static/goods/gougou.png" mode="scaleToFill" />
				    <view class="right">
				      <view class="rightTitle">破损包退</view>
				      <view class="rightContent">所售商品在签收时如有商品破损、变形等情形，且在签收后24小时内提供凭证申请退货的，商家承诺进行退货退款处理。</view>
				    </view>
				  </view>
				  <view class="serverList">
				    <image src="../../static/goods/gougou.png" mode="scaleToFill" />
				    <view class="right">
				      <view class="rightTitle">破损包退</view>
				      <view class="rightContent">所售商品在签收时如有商品破损、变形等情形，且在签收后24小时内提供凭证申请退货的，商家承诺进行退货退款处理。</view>
				    </view>
				  </view>
				  <view class="serverList">
				    <image src="../../static/goods/gougou.png" mode="scaleToFill" />
				    <view class="right">
				      <view class="rightTitle">破损包退</view>
				      <view class="rightContent">所售商品在签收时如有商品破损、变形等情形，且在签收后24小时内提供凭证申请退货的，商家承诺进行退货退款处理。</view>
				    </view>
				  </view>
			  </scroll-view>
            
          </view>
        <view class="submit" @click="specificationsAlert('service')">确认</view>
        <view style="height: 80rpx"></view>
    </BottomAlert>
	<!-- 优惠券 -->
	<BottomAlert :sc="fuClassName.coupons">
		<view class="serverTitle">领取优惠券</view>
		<view class="couponBox">
			<scroll-view style="height: 700upx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
				<view v-for="(item, index) in couponlist" :key="index" class="coupon coupon-wave-left  coupon-wave-right coupon-yellow">
				  <view class="couponInfo">
					<view class="left">
					  <view class="num">￥{{item.free}}</view>
					  <view class="num">满{{item.min}}元可用</view>
					</view>
					<view class="center">
					  <view class="title">{{item.couponsName}}</view>
					  <view class="time">{{item.startTime}}-{{item.endTime}}</view>
					</view>
					
					<view class="right">
						<u-button v-if="item.receiveState==1" @click="receiveclick(item)" shape="circle" :custom-style="customStyle">立即领取</u-button>
						<view v-if="item.receiveState==2" class="ylqclass" :custom-style="alreadyStyle">已领取</view>
					</view>
				  </view>
				  <view class="tips">{{item.value2 == null ? '' : item.value2}}</view>
				</view>
			</scroll-view>
		</view>
		<view class="submit" @click="specificationsAlert('coupons')">关 闭</view>
		<view style="height: 80rpx"></view>
	</BottomAlert>
  </view>
</template>

<script>
  import uniSwiperDot from '@/components/uni-swiper-dot_1.2.0/components/uni-swiper-dot/uni-swiper-dot.vue'
  import Top from '@/components/common/top'
  import BottomAlert from '@/components/goods/bottomAlert'
  import AddOrBuy from '@/components/shopCar/addOrBuy'
	import Details from '@/components/shopCar/details'
  export default {
	  components: {
	    uniSwiperDot,
	    Top,
	    BottomAlert,
	    AddOrBuy,
		Details
	  },
    data() {
		return {
			ispaylout:0,
			alreadyStyle:{
				width: '160rpx',
				height: '60rpx',
				backgroundColor: '#c1c1c1',
				color: 'rgb( 175, 100, 49)',
				textAlign: 'center',
				fontSize: '28rpx',
				lineHeight: '60rpx',
				marginTop: '30rpx'
			},
			customStyle:{
				width: '160rpx',
				height: '60rpx',
				backgroundColor: '#fff',
				color: 'rgb( 175, 100, 49)',
				textAlign: 'center',
				fontSize: '28rpx',
				lineHeight: '60rpx',
				marginTop: '30rpx'
			},
			
			couponsname:'领取优惠券',
			recommendlist:[],//推荐商品
			productspec:'请选择颜色分类尺寸',
			couponlist:[],//优惠券
			evaluatelist:[
				{
					img_tx:'../../static/index/shopIcon.png',
					name:'平常心'
				}
			],//评价
			selectArr: [],
			subIndex: [],
			
			specificationslist:[
				{
					
				}
			],
			min: 1,
			product:{
				proImgs:'',
				pname:'',
				price:'',
				pointsValue:'',
				salePrice:'',
				billValue:'',
				imgList:[],
				inventorySum:0
			},
			productrecommend:{
				proImgs:'',
				pname:'',
				price:'',
				pointsValue:'',
				salePrice:'',
				billValue:'',
				imgList:[],
				inventorySum:0
			},
		  productId:'',
		  selectSpec:null,//选中规格
		// 商品信息
		goodsData:{
			number:1,
		},
		goodsrecommend:{
			number:1,
		},
        fuClassName: {
          service: "none",
          specifications: "none",
		  coupons: "none",
		  specirecommend:'none'
        },
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
        swiperDotIndex: 0,
        clickTab: 0,
      }
    },
    onLoad(options) {
		if(options.productId){
			this.productId = options.productId;
			this.getGoodsDetailsData(options.productId)
		}
	},
	onShow() {
		
		this.recommend()
		this.getconpus()
	},
	onShareAppMessage(res) {
			// 设置默认的分享参数
			let shareInfo = {
				title: '',//标题
				path: '/pages/index/index',//路径
				// imageUrl:'share-img.png'// 图片
			}
			return {
				title: shareInfo.title,
				path: shareInfo.path,
				// imageUrl: shareInfo.imageUrl,
				
			}
	},
    methods: {
		//返回上一级
		arrowleft(){
			uni.navigateBack({
				delta: 1
			});
		},
		// 购买或兑换
		buyOrChange(item) {
			console.log('item',item)
			uni.navigateTo({
				url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`
			})
		},
		// 查询推荐商品
		recommend(){
			this.$Request.get('/mms/mobile/v1/recommendedProdTree').then(res => {
				if(res.code==200){
					this.recommendlist=res.data	
				}
				
			})
		},
		//领取优惠券
		receiveclick(item){
			
			let parames={
				couponsCode:item.couponsCode
			}
			this.$Request.post('/mms/wx/v1/saveReceiveCoupons',parames).then(val => {
				if (val.code == 200) {
					uni.showToast({
						title:'领取成功'
					})
					this.couponsname=item.couponsName
					this.getconpus()
					// this.fuClassName.coupons = 'none'
					
				}else{
					console.log('gggg',val.msg)
					this.$api.msg(val.msg);
				}
			})
		},
		// 获取优惠券
		getconpus(){
			let url='/mms/wx/v1/usableCoupons/'+this.productId
			this.$Request.getT(url).then(res => {
				if (res.code == 200) {
					
					this.couponlist=res.data
					if(this.couponlist.length==0){
						this.couponsname='无优惠券可用'
					}
				}
			})
		},
		// 购买数量
		valChange(e) {
			let num=0
			let danjia=0
			if(e.value!=0){
				if(this.payType==1){
					this.totles()
				}else if(this.payType==2){
					this.multiplication()
				}else if(this.payType==3){
					this.subtract()
				}else{
					this.totles()
				}
		
			}
			
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
		// 查询推荐商品详情
		getGoodsrecommend(productId){
			let url='/mms/mobile/v1/product/'+productId
			this.$Request.get(url).then(res => {
				if (res.code == 200) {
					this.productrecommend=res.data
					
				}
			})
		},
		chooseItem( _pIndex, _name, index) {
			if (this.selectArr[_pIndex] != _name) {
				this.$set(this.selectArr, _pIndex, _name);
				this.$set(this.subIndex, _pIndex, index);
			} else {
				this.selectArr.splice( _pIndex,1)
				// this.selectArr.splice( index,1)
				this.$set(this.subIndex, _pIndex, -1); //去掉选中颜色
			}
			console.log(this.selectArr)
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
		
		//推荐商品减少数量
		recommendsub(){
			if(this.goodsrecommend.number<=1){
				return;
			}
			this.goodsrecommend.number--;
		},
		//推荐商品增加数量
		recommendadd(){
			if(this.goodsrecommend.number>=this.productrecommend.inventorySum){
				return;
			}
			this.goodsrecommend.number++;
		},
		
      // 轮播图
      change(e) {
        this.current = e.detail.current
      },
      // tab切换
      clickchage(e) {
        this.clickTab = e
		if(e==1){
			this.getEvaluate()
		}
      },
	  //查询商品评价
	  getEvaluate(){
		  let url='/mms/mobile/v1/getProductEvaluate/'+this.productId
		  this.$Request.get(url).then(res => {
		  	if (res.code == 200) {
		  		this.evaluatelist=res.rows
		  	}
		  })
	  },
      // 规格选择
      chooseGoodsDel(key) {
        this.fuClassName[key] = 'show'
		if(key=='specifications'){
			let productId=this.productId
			this.getSpec(productId)
		}
		if(key=='coupons'){
			
		}
		
      },
	  // 查询规格
	  getSpec(productId){
		  let url='/mms/wx/v1/productSpec/'+productId
		  this.$Request.getT(url).then(res => {
		  	if (res.code == 200) {
		  		this.specificationslist=res.data
		  	}
		  })
	  },
      specificationsAlert(key) {
		  
		  if(key=='speciclose'){
			  	this.fuClassName.specifications = 'none'
		  }
		  if(key=='coupons'){
		  		this.fuClassName.coupons = 'none'
		  }
		  if(this.ispaylout==1){
			  if(key=='shopingcart'){
				  let selectArr=this.selectArr
				  let specificationslist=this.specificationslist
				  let selelist=[]
				  let specation=[]
				  selectArr.forEach(val=>{
				  	selelist.push(val)
				  })
				  specificationslist.forEach(value=>{
				  	specation.push(value)
				  })
				  let nickName=uni.getStorageSync('nickName')
				  if(nickName){
				  	console.log('selelist',selelist)
				  	console.log('specation',specation)
				  	if(selelist.length>=specation.length){
				  		let param={
				  			productId:this.productId,
				  			counts:this.goodsData.number,
				  			proSpecList:selelist
				  		}
				  		console.log('param',param)
				  		this.$Request.post('/mms/wx/v1/addCartAndSettlement',param).then(res => {
				  			if (res.code == 200) {
				  				uni.navigateTo({
				  					url: `/pages/pagesOrder/submitOrder?pagesid=${1}&productId=${this.productId}`
				  				});
								this.ispaylout=0
								this.selectArr=[]
								this.subIndex=[]
								this.goodsData.number=1
								this.fuClassName.specifications = 'none'
				  				// this.getList()
				  			}else{
				  				// console.log('kkkkk',res.msg)
				  				this.$api.msg(res.msg);
				  			}
				  		})
				  	}else{
				  		this.$api.msg('请选择相应规格');
				  	}
				  }else{
				  	let pidurl=`/pages/index/index`
				  	uni.reLaunch({
				  		url: `/pages/warrant/warrant?pid=${pidurl}`
				  	})
				  }
			  }
			  
		  }else{
			  this.fuClassName[key] = 'none'
			  if(key=='shopingcart'){
			  	// let selectArr=this.selectArr
			  	// let selelist=[]
			  	// selectArr.forEach(val=>{
			  		
			  	// 	selelist.push(val.specName)
			  	// })
			  	// this.productspec=selelist.join('')
			  	
			  	let selectArr=this.selectArr
			  	let specificationslist=this.specificationslist
			  	let specation=[]
			  	let selelist=[]
			  	let spevalue=[]
			  	selectArr.forEach(val=>{
			  		selelist.push(val)
			  		spevalue.push(val.specName)
			  	})
			  	specificationslist.forEach(value=>{
			  		specation.push(value)
			  	})
			  	this.productspec=spevalue.join('')
			  	
			  	if(selelist.length>=specation.length){
			  		let param={
			  			productId:this.productId,
			  			counts:this.goodsData.number,
			  			proSpecList:selelist
			  		}
			  		// console.log('param',param)
			  		this.$Request.post('/mms/wx/v1//addCart',param).then(res => {
			  			if (res.code == 200) {
			  				this.$api.msg('添加成功');
			  				this.fuClassName['specifications'] = 'none'
			  			}else{
			  				// console.log('kkkkk',res.msg)
			  				this.$api.msg(res.msg);
			  			}
			  		})
			  	}else{
			  		this.$api.msg('请选择相应规格');
			  	}
			  	
			  	// this.fuClassName['specifications'] = 'none'
			  	
			  }
		  }
        
      },
      // 加入购物车
      addCar() {
		  this.getSpec(this.productId)
		  this.fuClassName['specifications'] = 'show'
        // this.fuClassName['specifications'] = 'show'
      },
	  // 购买
	addCarsubmit(){
		this.ispaylout=1
		this.fuClassName.specifications= 'show'
		 this.getSpec(this.productId)
	  },
	  
	  //加入购物车
	  shopclick(item){
	  	this.selectArr=[]
	  	this.subIndex=[]
		this.goodsrecommend.number=1
	  	console.log('item.productId',item.productId)
	  	this.fuClassName.specirecommend= 'show'
	  	this.productIdrecommend=item.productId
	  	this.getSpec(item.productId)
	  	this.getGoodsrecommend(item.productId)
	  	
	  },
	  specifirecommend(key) {
	  		if(key=='specirecommend'){
	  			// let selectArr=this.selectArr
	  			// let selelist=[]
	  			// selectArr.forEach(val=>{
	  				
	  			// 	selelist.push(val.specName)
	  			// })
	  			// this.productspec=selelist.join('')
	  			
	  			let selectArr=this.selectArr
	  			let specificationslist=this.specificationslist
	  			let specation=[]
	  			let selelist=[]
	  			selectArr.forEach(val=>{
	  				selelist.push(val)
	  			})
	  			specificationslist.forEach(value=>{
	  				specation.push(value)
	  			})
	  			
	  			if(selelist.length>=specation.length){
	  				let param={
	  					productId:this.productIdrecommend,
	  					counts:this.goodsrecommend.number,
	  					proSpecList:selelist
	  				}
	  				// console.log('param',param)
	  				this.$Request.post('/mms/wx/v1//addCart',param).then(res => {
	  					if (res.code == 200) {
	  						this.$api.msg('添加成功');
	  						this.fuClassName['specirecommend'] = 'none'
							this.selectArr=[]
							this.subIndex=[]
							this.goodsrecommend.number=1
	  					}else{
	  						// console.log('kkkkk',res.msg)
	  						this.$api.msg(res.msg);
	  					}
	  				})
	  			}else{
	  				this.$api.msg('请选择相应规格');
	  			}
	  			
	  			// this.fuClassName['specifications'] = 'none'
	  			
	  		}
	  },
    }
  }
</script>

<style lang="scss" scoped>
	.arrow_img{
		position: absolute;
		top: 60rpx;
		left: 23rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50rpx;
		background-color: #000;
		opacity: 0.4;
		z-index: 9;
		image{
			width: 50rpx;
			height: 50rpx;
		}
	}
	.ylqclass{
		width: 160rpx;
		height: 60rpx;
		background-color: #c1c1c1;
		color: rgb( 175, 100, 49);
		text-align: center;
		font-size: 28rpx;
		line-height: 60rpx;
		margin-top: 30rpx;
		border-radius: 60rpx;
	}
  page {
    background-color: #ececec !important;
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
  .swiper-box {
    height: 400rpx;
  }
    .indexSwiperHeight {
  		height: 800rpx;
		position: relative;
  		.swiper-item {
  			display: block;
  			height: 800rpx;
  		}
  		.bannerImg {
  			height: 800rpx;
  			background: linear-gradient(to bottom, #fff, #13175a)
  		}
  	}
  .swiper-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500rpx;
    color: #fff;
  }
  .swiperText {
    position: relative;
    top: -140rpx;
    left: -270rpx;
    color: #fff;
    z-index: 999;
    border: 1rpx solid #fff;
    font-size: 24rpx;
    border-radius: 50rpx;
    padding: 15rpx 20rpx;
    letter-spacing: 5rpx;
  }
  .goodsDetails {
    padding: 30rpx;
    box-sizing: border-box;
    display: flex;
    justify-content: space-between;
    background-color: #fff;
    .left {
      .title {
        font-size: 34rpx;
        color: rgb( 128, 128, 128);
        margin-bottom: 40rpx;
      }
      .price {
        color: #e99785;
        font-size: 30rpx;
      }
    }
    .right {
      image {
        width: 80rpx;
        height: 80rpx;
      }
    }
  }
  .info {
    display: flex;
    justify-content: space-between;
    padding: 0 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    padding-bottom: 20rpx;
  }
  .server_to{
	  display: flex;
	  justify-content: space-between;
	    padding: 15rpx 30rpx;
	  box-sizing: border-box;
	  background-color: #fff;
	  align-items: center;
	  color: gray;
	  font-size: 32rpx;
	  .left {
	    display: flex;
	    .leftTitle {
	      width: 100rpx;
	    }
	  }
  }
  .server {
    display: flex;
    justify-content: space-between;
    padding: 30rpx;
    box-sizing: border-box;
    background-color: #fff;
    color: rgb( 128, 128, 128);
    font-size: 32rpx;
    .left {
      display: flex;
      .leftTitle {
        width: 100rpx;
      }
    }
	.couponLis {
		background-color: #e43b29;
		color: #fff;
		font-size: 24rpx;
		padding: 9rpx 12rpx;
		border-radius: 50rpx;
		image {
		margin-left: 8rpx;
		}
	}
    image {
      width: 18rpx;
      height: 28rpx;
    }
  }
  .serverMt {
    margin-top: 20rpx;
  }
  .richText {
    margin-top: 30rpx;
    .richtitle {
      width: 100%;
      height: 90rpx;
      line-height: 90rpx;
      background-color: #fff;
      display: flex;
      justify-content: space-around;
      padding: 0 70rpx;
      box-sizing: border-box;
      .details {
        align-items: center;
      }
      .detailsBorder {
        height: 70rpx;
        border-bottom: 1rpx solid #e99785;
      }
      .line {
        height: 55rpx;
        width: 1rpx;
        background-color: #e99785;
        margin-top: 20rpx;
      }
    }
  }
  .content {
    border-bottom: 1rpx solid #ccc;
	background-color: #ececec !important;
  }
  .tips {
      width: 100%;
      height: 56rpx;
      background-color: #cec3ad;
      color: #000;
      font-size: 28rpx;
      color: rgb( 97, 82, 71);
      padding-left: 30rpx;
      line-height: 56rpx;
      box-sizing: border-box;
    }
    .couponInfo {
      display: flex;
      justify-content: space-around;
      padding: 18rpx 20rpx 20rpx 25rpx;
      box-sizing: border-box;
      color: #fff;
      margin-top: 10rpx;
      .left {
        border-right: 1rpx dashed #fff;
        width: 160rpx;
        padding-top: 20rpx;
        .num {
          font-size: 35rpx;
          text-align: center;
        }
        .num:nth-child(2) {
          font-size: 26rpx;
        }
      }
      .center {
        .title {
          font-size: 32rpx;
          margin-bottom: 25rpx;
        }
        .time {
          font-size: 28rpx;
        }
      }
      .right {
        // width: 160rpx;
        // height: 60rpx;
        // background-color: #fff;
        // border-radius: 50rpx;
        // color: rgb( 175, 100, 49);
        // text-align: center;
        // font-size: 28rpx;
        // line-height: 60rpx;
        // margin-top: 30rpx;
        .numberRight {
          background-color: #615349;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          height: 150rpx;
          font-size: 28rpx;
          color: #f4f0ee;
          border-left: 1rpx solid #ccc;
          image {
            width: 90rpx;
            height: 90rpx;
            margin-top: -40rpx;
            margin-right: -80rpx;
          }
          view {
            line-height: 40rpx;
          }
          .rightNumber::before {
            content: '-';
            display: inline;
            margin-right: 10rpx;
          }
          .rightNumber::after {
            content: '-';
            display: inline;
            margin-left: 10rpx;
          }
          .useBtn {
            font-size: 24rpx;
            border: 1rpx solid #fff;
            width: 120rpx;
            height: 40rpx;
            line-height: 40rpx;
            color: #fff;
            border-radius: 20rpx;
          }
        }
      }
    }
    .couponBox {
      padding: 0 30rpx;
      box-sizing: border-box;
      // height: 600rpx;
      // overflow-y: scroll;
    }
    /* 优惠券背景颜色 */
    .coupon-yellow {
      background-color: #c49c62;
	  position: relative; 
    margin-bottom: 10rpx;
    }
    /* 下边框的波浪  */
    .coupon-wave-left::before,
    .coupon-wave-right::after {
      content: '';
      position: absolute;
      bottom: -5rpx;
      height: 20rpx;
      width: 100%;
      background-image: radial-gradient(#cec3ad 0, #cec3ad 8rpx, transparent 8rpx);
      background-size: 20rpx 20rpx;
      background-position: center center;
      z-index: 1;
    }
    .coupon-wave-left::before {
      left: -11rpx;
    }
    .coupon-wave-left::after {
      left: -11rpx;
    }
  .richContent {
    .bg {
      background: url('https://s2.loli.net/2022/08/08/b7Bh8Qnpug31wma.png') no-repeat 100%;
      background-size: cover;
      width: 900rpx;
      height: 300rpx;
      margin-right: 30rpx;
    } // 评价
    .userInfo {
      padding: 70rpx 40rpx 0;
      box-sizing: border-box;
      background-color: #fff;
      display: flex;
      justify-content: space-between;
      .left {
        display: flex;
        .userIcon {
          width: 60rpx;
          height: 60rpx;
          margin-right: 20rpx;
        }
        .nameBox {
          .name {
			padding-left: 10rpx;
            color: rgb( 3, 110, 163);
          }
          .star {
            height: 25rpx;
            width: 130rpx;
          }
        }
      }
    }
    .text {
      background-color: #fff;
      font-size: 36rpx;
      padding: 30rpx 40rpx 10rpx 100rpx;
    }
    .time {
      padding-left: 100rpx;
      background-color: #fff;
    }
    .buyTime {
      padding-left: 100rpx;
      background-color: #fff;
      padding-top: 90rpx;
      padding-bottom: 40rpx;
    }
  } // 推荐商品
  .hotGoods {
    .bg {
      background: url('https://s2.loli.net/2022/08/08/YcPV7yRnSIBNDeT.png') no-repeat 100%;
      background-size: cover;
      width: 100%;
      height: 70rpx;
      background-color: #fff;
    }
	
    .recommend {
      margin-top: 30rpx;
      padding-top: 40rpx;
      padding-bottom: 20rpx;
      background-color: #Fff;
      image {
        height: 70rpx;
        width: 100%;
        background-color: #fff;
      }
    }

.pro::-webkit-scrollbar {
	display: none;
	width: 0 !important;
	height: 0 !important;
	-webkit-appearance: none;
	background: transparent;
}
    .pro {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      // overflow-x: scroll;
      
      .proBox {
        padding: 20rpx 20rpx;
        box-sizing: border-box;
        flex: 0 0 33.3%;
        background-color: #fff;
        padding-bottom: 50rpx;
		    margin-bottom: 15rpx;
        image {
          width: 100%;
          height: 200rpx;
        }
        .proName {
          font-size: 30rpx;
          text-align: left;
          margin-top: 10rpx;
          margin-bottom: 20rpx;
        }
        .price {
          font-size: 28rpx;
          color: rgb( 89, 87, 87);
        }
        .number {
          font-size: 26rpx;
          color: rgb( 89, 87, 87);
        }
        .btn {
          display: flex;
          justify-content: space-between;
          .left {
            width: 130rpx;
            height: 55rpx;
            border-radius: 50rpx;
            text-align: center;
            line-height: 55rpx;
            font-size: 24rpx;
            color: #e99785;
            border: 1rpx solid #e99785;
            margin-top: 30rpx;
          }
          .right {
            image {
              width: 45rpx;
              height: 45rpx;
              display: flex;
              margin-top: 10rpx;
            }
          }
        }
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
  .color {
    font-size: 36rpx;
    padding: 0 40rpx;
    margin-top: 20rpx;
    margin-bottom: 20rpx;
    box-sizing: border-box;
  }
  .colorList {
    display: flex;
    padding: 0 40rpx;
    .lis {
      height: 60rpx;
      line-height: 60rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      border: 1rpx solid #7b7a7a;
      color: #7b7a7a;
      margin-right: 20rpx;
    }
  }
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
    .right {
      display: flex;
      font-size: 32rpx;
      view {
        width: 90rpx;
        height: 70rpx;
        border: 1rpx solid #7b7a7a;
        text-align: center;
        line-height: 70rpx;
        margin-left: -1px;
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
  .serverTitle {
    text-align: center;
    font-size: 36rpx;
    padding: 30rpx 0;
  }
  // .serverListBox {
  //   overflow-y: scroll;
  // }
  .serverList {
    display: flex;
    padding: 0 30rpx;
    font-size: 30rpx;
    margin-top: 50rpx;
    box-sizing: border-box;
    image {
      width: 40rpx;
      height: 40rpx;
      flex-basis: 45rpx;
      // margin-right: 40rpx;
    }
    .right {
      display: flex;
      flex-direction: column;
      padding: 0 30rpx;
      width: 100%;
    }
  }
  .serverList:nth-child(1) {
    margin-top: 0rpx;
  }
</style>