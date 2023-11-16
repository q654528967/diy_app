<template>
	<view class="content">
    <!-- 有收获地址 -->
    <view class="haveAddress">
		<view class="infoBox" @click="addressChooseClick">
			<image class="dingwei" src="../../static/order/dingwei.png" mode="scaleToFill" />
			<view v-if="addresform.addrName" class="center">
			  <view class="addressTop">
				<view class="left">{{addresform.addrName}}</view>
				<view class="right">{{addresform.phone}}</view>
			  </view>
			  <view class="text">收货地址: {{addresform.zonename}}</view>
			</view>
			<view v-else class="" style="display: flex;align-items: center;">
				<view class="">选择收货地址</view>
				<image class="rightIcon" src="../../static/right.png" mode="scaleToFill" />
			</view>
		</view>
    </view>
    <!-- 商品 -->
    <view class="pro">
      <view class="title">
        <image src="../../static/user/houseIcon.png" mode="scaleToFill" /> 商品明细
      </view>
      <!--  -->
		<view class="">
			<view v-for="(item, index) in shoplist" :key="index" class="list">
				<view class="leftBox">
					<view class="left">
					<image @click="goodsdetils(item)" :src="item.proUrl" mode="scaleToFill" />
				  </view>
				  <view class="center">
					<view class="proTitle">
						<text style="display: inline-block;width: 100%;">{{item.productName}}</text>
						<text style="background-color: #afafaf;color: #fff;font-size: 25rpx;padding: 2rpx;border-radius: 7rpx;">规格：{{item.proSpecComment == null ? '' : item.proSpecComment}}</text>
					</view>
					<view class="price">￥{{item.indentPrice}}</view>
					<view class="number">{{item.pointsValue}}积分</view>
				  </view>
				</view>
				<view class="right">
				  <view class="num">x{{item.counts}}</view>
				  <view class="addOrdel">
					  <view class="number">
					  	<view class="sub" @tap.stop="sub(index)">
					  		<view class="icon jian">-</view>
					  	</view>
					  	<view class="input">
					  		<input type="number" :disabled="true" v-model="item.counts" />
					  	</view>
					  	<view class="add"  @tap.stop="add(index)">
					  		<view class="icon jia">+</view>
					  	</view>
					  </view>
					<!-- <view class="del" @tap.stop="sub(index)">-</view>
					<input style="border: 2upx solid #e99785;width: 52upx;height: 36upx;text-align: center;line-height: 36upx;margin-left: 14upx;margin-right: 14upx;" type="number" :disabled="true" v-model="item.counts"  />
					<view class="add" @tap.stop="add(index)">+</view> -->
				  </view>
				</view>
			</view>
		</view>
    </view>
    <!-- 配送方式 -->
    <view class="type">
      <view class="left">配送方式</view>
      <view class="right" @click="chooseType('chooseType')">
        <view class="expressText">{{choostyp}}
          <image src="../../static/right.png" mode="scaleToFill" />
        </view>
        <!-- <view class="time">202002送达</view> -->
      </view>
    </view>
    <!-- 商家备注 -->
    <view class="note">
      <view class="left">留言备注</view>
      <input v-model="remoken" placeholder="点击给商家留言" placeholder-class="input-placeholder" />
    </view>
    <!-- 金额信息 -->
    <view class="priceInfo">
      <view class="left">商品金额</view>
      <view class="right">￥{{totals}}</view>
    </view>
    <view class="priceInfo">
      <view class="left">运费</view>
      <view class="right">￥{{freight}}</view>
    </view>

    <!-- 优惠 -->
    <view class="type">
		<view class="left">优惠</view>
		<view class="right" @click="showAlert('couponType')">
			<view class="expressText" style="color: #e99785">
				<!-- <text class="coupon-g" @click="discount" v-if="huiList.length==0">无可用></text>
				<text class="coupon-g" @click="discount" v-else v-show="usableshow">{{huiList.length}}张可用></text>
				<text class="coupon-g" @click="discount" v-show="prishow" >-￥{{coupon}}></text> -->
				<!-- <text v-if="huiList.length==0">无可用优惠券</text> -->
				<text>{{couponname}}</text>
				<image src="../../static/right.png" mode="scaleToFill" />
			</view>
			<!-- <view class="time" style="color: #000">202002送达</view> -->
		</view>
    </view>
	<view class="priceInfo">
	  <view class="left">优惠</view>
	  <view class="right"><text v-if="coupon>0">-</text>￥{{coupon}}</view>
	</view>
    <!-- 积分兑换 -->
    <view class="type integral" @click="showAlert('number')">
      <view class="left">积分兑换(共{{totalintegral == null ? 0 : totalintegral}}个)</view>
      <view class="right">
        <view class="expressText">
			<!-- <text>去选择</text> -->
			<text>￥{{integraliscount}}</text>
          <image src="../../static/right.png" mode="scaleToFill" />
        </view>
      </view>
    </view>
    <!-- 总价 -->
    <view class="total">合计: ￥{{sumPrice}}</view>
    <!-- subit -->
    <view style="height: 120rpx"></view>
    <view class="btn">
      <view class="left">
        <view class="price">￥{{sumPrice}}</view>
        <view class="sale">共计优惠
          <text>￥{{ parseFloat(coupon)  + parseFloat(integraliscount)  }}</text>
        </view>
      </view>
      <view @click="submiter" class="right">提交订单</view>
    </view>
    <!-- 是否使用积分弹框 -->
    <BottomAlert :alertMaskHiden="true" :sc="fuClassName.number">
		<view style="min-height: 700rpx;" class="">
			<view class="top">
			  <view class="left">
			    积分<text>(剩余:{{totalintegral == null ? 0 : totalintegral}})</text>
			  </view>
			  <view class="right">
			    <text @click="useAlert">使用规则</text>
			    <image @click="hideAlert('number')" src="../../static/user/chacha.png" mode="scaleToFill" />
			  </view>
			</view>
			<view class="contentBox">		
				<u-radio-group v-model="bookingSettingId" @change="integraChange" class="coupon-tp">
					<view v-if="totalintegral!=0" class="listContent">
						<!-- <view v-if="index==0" class="left">暂不使用积分积分</view> -->
						<view class="left">抵扣￥{{integralist.price}}最高可使用{{integralist.fullgral}}积分</view>
						<label class="ridos">
							<u-radio 
								:name="integralist.price"
								:disabled="integralist.fullgral>totalintegral" 
							/>
						</label>
					</view>
				</u-radio-group>
			</view>
			<view class="submit" @click="specificationsAlert('number')">确认</view>
		</view>
      
    </BottomAlert>
    <!-- 选择快递弹框 -->
    <BottomAlert :alertMaskHiden="true" :sc="fuClassName.chooseType">
		<view class="expressType">
			<view>配送方式</view>
			<image @click="hideAlert('chooseType')" src="../../static/user/chacha.png" mode="scaleToFill" />
		</view>
		<!-- 地址选择 -->
		<u-radio-group v-model="choosvalue" @change="radioGroupChange">
			<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
				<view class="expressTypeBox">
					<view>
						<u-radio :name="item.choosid" :disabled="item.disabled" />
					</view>
					<view class="center">
						<view class="name">{{item.text}}</view>
						<view style="font-size: 28rpx;color: #ccc" class="tips">{{item.tips}}</view>
					</view>
				</view>
			</label>
		</u-radio-group>
      <!-- 按钮 -->
      <view class='bottom' style="padding-bottom:30rpx">
        <view @click="chooslick" class="left">保存</view>
        <view @click="hideAlert('chooseType')" class="right">取消</view>
      </view>
    </BottomAlert>
	<!-- 选用优惠券弹框 -->
	<BottomAlert :alertMaskHiden="true" :sc="fuClassName.couponType">
		<!-- <view class="expressType">
			<view>服务</view>
			<image @click="hideAlert('chooseType')" src="../../static/user/chacha.png" mode="scaleToFill" />
		</view> -->
		<view class="">
			<scroll-view style="height: 1100upx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
				<view class="titleBox">
				 优惠券
				 <image @click="hideAlert('couponType')" src="../../static/user/chacha.png" mode="scaleToFill" />
				</view>
				<!-- 未使用 -->
				<view v-for="(item, index) in huiList" :key="index" class="couponBox">
				  <view class="coupon coupon-wave-left  coupon-wave-right coupon-yellow">
				    <view class="couponInfo">
				      <view class="left">
				        <view class="num">￥{{item.free}}</view>
				        <view class="num">满{{item.min}}元可用</view>
				      </view>
				      <view class="center">
				        <view class="title">{{item.couponsName}}</view>
				        <view class="time">{{item.startTime}}-{{item.endTime}}</view>
				      </view>
				      <view @click="nextStep(item)" class="right">立即使用</view>
				    </view>
				  </view>
				  <view class="tips">全部商品可用，不可抵扣运费，</view>
				</view>
				<!-- 不可用优惠 -->
				<view class="noUser">不可用优惠</view>
				<!-- 已失效 -->
				<view v-for="(item, index) in notList" :key="index" class="couponBox">
				  <view class="coupon coupon-wave-left  coupon-wave-right coupon-yellow">
				    <view class="couponInfo">
				      <view class="left">
				        <view class="num">￥{{item.free}}</view>
				        <view class="num">满{{item.min}}元可用</view>
				      </view>
				      <view class="center">
				        <view class="title">{{item.couponsName}}</view>
				        <view class="time">{{item.startTime}}-{{item.endTime}}</view>
				      </view>
				      <view class="right" style="background-color: #c49c62"></view>
				    </view>
				  </view>
				  <view class="tips">未满足使用门槛</view>
				</view>
				<!-- 不使用按钮-->
				<view @click="nousedclick" class="noUseBtn">不使用优惠</view>
			</scroll-view>
			
		</view>
		
	</BottomAlert>
    <!-- 积分使用规则 -->
    <CenterAlert :isShowAlert="ifShowAlert" @closeAlert="closeAlert"></CenterAlert>
	<!-- 余额抵扣弹框 -->
		
	<u-popup class="pic-qe" v-model="pashare" mode="bottom" :mask-close-able="false" height="450px">
		<view style="text-align: right;padding: 3%;font-size: 45rpx;border-bottom: 5rpx solid #d8d8d8;display: flex;justify-content: space-between;align-items: center;">
			<text></text>
			<text style="font-size: 36rpx;">确认付款</text>
			<image style="width: 50rpx;height: 50rpx;" @click.stop="display" src="../../static/gb.png" mode=""></image>
		</view>
		<view class="ridover">
			<view style="padding-top: 5%;" class="">
				<!-- <text class="coupon-h">需支付总金额</text> -->
				<view style="color: #FF7800;text-align: center;">￥<text style="font-size: 80rpx;">{{sumPrice}}</text></view>
				<view style="color: #FF7800;text-align: center;font-size: 60rpx;padding-top: 1%;">{{totaldiscount}}积分</view>
			</view>
			<view class="coupon-quan dashed">
				<text class="coupon-h">会员可用余额</text>
				<view>￥{{userCash}}</view>
			</view>
			<view v-if="userCash" class="coupo-di dashed">
				<text class="coupon-h">使用余额支付</text>
				<u-checkbox-group @change="checkboxGroupChange">
					<u-checkbox size="30" v-model="checked" :name="userCash">
<!-- 						<text style="font-size: 32upx;display: inherit;color: #000;">{{pachval}}</text> -->
					</u-checkbox>
				</u-checkbox-group>
			</view>
			<view v-if="showpic" class="coupon-quan dashed">
				<text class="coupon-h">余额可支付金额</text>
				<view>￥{{pachval}}</view>
			</view>
			<button class="confirm-btn" @click="payvlout">立即支付</button>
			<!-- </view> -->
		</view>
	</u-popup>
  </view>
</template>
<script>
import BottomAlert from '@/components/goods/bottomAlert'
import CenterAlert from '@/components/common/centerAlert'
export default {
	data() {
		return {
			totals:0,//原价总额
			noSettingId:'',
			
			totalintegral:'',//总积分
			integraliscount:0,//积分优惠
			totaldiscount:0,//
			integral:0,//积分
			showpic:false,
			pachval:0,
			userCash:null,//会员余额
			checked:false,//余额check
			pashare:false,//余额弹框
			
			custCouponsId:0,//优惠券编号
			bookingSettingId:'',
			freight:0.00,//运费
			couponmin:0,//优惠券最小值
			remoken:'',//留言
			coupon:0,//满减优惠
			coupons:0,//折扣优惠
			free:0,//减到优惠
			couponname:'优惠券',
			chooskd:0,
			choostyp:'普通快递',
			choosvalue:'',
			
			huiList:[],//可用优惠券列表
			notList:[],//不可用优惠券列表
			
			addresform:{
				addrName:'',
				zonename:'',
				phone:'',
			},
			form:{
				proUrl:'',
				productName:'',
				indentPrice:'',
				pointsValue:'',
				counts:1
			},
			productId:null,
			pagesid:null,
			active:null,
			integralist:{
				ridoid:'1',
				name:'暂不使用积分',
				price:1.00,
				fullgral:100,
				nointe:0,
				disabled:false
			},
			sumPrice:'0.00',
			shoplist:[],
			fuClassName: {
			  number: 'none',
			  chooseType: 'none',
			  couponType:'none'
			},
			items: [
				{
					choosid:1,
				  text: '普通快递',
				  tips: '由商家选择合作快递为您服务'
				},
				{
					choosid:2,
				  text: '顺丰快递',
				  tips: ''
				}
			],
			current: 0,
			ifShowAlert: false,
	  }
	},
    onLoad(options) {
		
		if(options.pagesid){
			this.pagesid=options.pagesid
			if(options.pagesid==2){
				this.getsettlement()
			}else if(options.pagesid==1){
				if(options.productId){
					this.productId=options.productId
					this.getGoodsDetailsData(options.productId)
					
				}
			}
		}
		if(options.totalpayl){
			this.totalpayl=options.totalpayl
		}
		
	},
	onShow() {
		let addresform=uni.getStorageSync('addresform')
		if(addresform){
			this.addresform=addresform
		}else{
			this.addresform={
				addrName:'',
				phone:'',
				zonename:'',
			}
		}
		this.discounts()
		this.getye()
		this.getMyPoints()
	},
    components: {
      BottomAlert,
      CenterAlert
    },
    methods: {
		goodsdetils(item){
			console.log('item',item)
			uni.navigateTo({
				url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`
			})
		},
		//积分cheng
		integraChange(e){
			console.log('e',e)
			// console.log('bookingSettingId',this.bookingSettingId)
			// console.log('totalintegral',this.totalintegral)
			if(e){
				let submit=0
				this.integraliscount=e
				this.totaldiscount=this.integralist.fullgral
				submit=parseFloat(this.sumPrice-e)
				// if(submit<0){
				// 	this.sumPrice=0
				// }
				this.sumPrice=submit
			}else{
				this.totaldiscount=0
				this.integraliscount=0
				this.sum();
			}
			
		},
		//确认使用积分
		specificationsAlert(key) {
			this.fuClassName[key] = 'none'
		},
		//不使用优惠券
		nousedclick(){
			this.coupon=0
			this.couponname='优惠券'
			this.sum();
			// this.discounts()
			this.fuClassName.couponType = 'none'
			this.custCouponsId=0
		},
		// 优惠券确认
		nextStep(item){
			console.log('item',item.payType)
			this.custCouponsId=item.custCouponsId
			if(item.payType==1){
				console.log('item',item)
				this.coupon=item.free
				this.couponname=item.couponsName
				this.couponmin=item.min
				this.sum()
				this.fuClassName.couponType = 'none'
				// this.discounts()
			}else if(item.payType==2){
				this.coupons=item.free
				this.multiplication()
				// this.share=false
			}else if(item.payType==3){
				this.free=item.free
				let num=0
				num=parseFloat(this.product.indentPrice)-parseFloat(item.free)
				this.coupon=num
				this.subtract()
				// this.share=false
			}
			
		},
		//查询我的积分
		getMyPoints(){
			this.$Request.getT('/mms/wx/v1/getMyPoints').then(res => {
				if(res.code==200){
					// let rowlist=res.data
					if(res.data.userPoints==null){
						this.totalintegral=0
					}else{
						let sum=0
						let lessum=0 //
						this.totalintegral=res.data.userPoints
						if(this.sumPrice<=this.integralist.fullgral){
							lessum=parseFloat(this.sumPrice*this.integralist.fullgral)
							this.integralist.fullgral=lessum
							this.integralist.price=this.sumPrice
						}else{
							sum=parseFloat(this.totalintegral/100).toFixed(2)
							console.log('sum',sum)
							this.integralist.price=sum
							this.integralist.fullgral=res.data.userPoints
						}

					}
				}
				
			})
		},
		// 查询优惠券
		discounts(){
			this.huiList=[]
			this.notList=[]
			this.$Request.getT('/mms/wx/v1/myCustCoupons').then(res => {
				// let list=res.data
				if(res.code==200){
					// console.log('走到了')
					if(res.data){
						// this.shoplist.forEach(val=>{
							// console.log('走到了',res.data)
							res.data.forEach(value=>{	
								// console.log('走到了循环里面',val)
								if(value.usableState===1 && this.sumPrice>=value.min && value.custCouponsState===1){
									// console.log('走到了',val)
									this.huiList.push(value)
									if(this.huiList){
										this.couponname='优惠券'
									}else{
										this.couponname='无可用优惠券'
									}
									
									// console.log('可使用',this.huiList)
								}else{
									this.notList.push(value)
									// console.log('不可使用',this.notList)
								}
							})
						// })
						
					}
				}		
			})
		},
		//余额支付复选框
		checkboxGroupChange(e) {
			console.log('e',e)
			console.log('userCash',this.userCash)
			if(e.length==0 ){
				this.pachval=0
				// this.userdable=false
				this.showpic=false
			}else if(this.userCash>=this.sumPrice){
				this.pachval=this.sumPrice
				// this.userdable=true
				this.showpic=true
			}else if(this.userCash<this.sumPrice){
				this.pachval=this.userCash
				// this.userdable=true
				this.showpic=true
			}
		},
		//账户余额
		getye(){
			this.$Request.getT('/mms/wx/v1/getCardCash').then(res => {
				if (res.code == 200) {
					this.userCash=res.data.newCash
				}
			})
		},
		// 隐藏余额弹框
		display() {
			this.pashare=false
			this.checked=false
			// this.userdable=false
			this.pachval=0
		},
		// 查询购物车列表
		getsettlement(){
			this.shoplist=[]
			this.$Request.getT('/mms/wx/v1//getCartOrders').then(res => {
				if(res.code==200){
					this.shoplist=res.data
						
					this.sum();
				}
			})
		},
		// 查询商品详情
		getGoodsDetailsData(productId){
			this.shoplist=[]
			let url='/mms/wx/v1/getProCartOrders/'+productId
			this.$Request.getT(url).then(res => {
				if (res.code == 200) {
					this.shoplist=res.data
					this.sum();
				}
			})
		},
		// 积分兑换cheange事件
		couponChange(item,index){
			if (this.active== index) { // 如果已经选中，则取消选中		
				// this.custCouponsId=null;
				this.active= null;
				console.log('item1',item)
				
			} else { // 否则进行选中赋值
				console.log('item2',item)
				
				this.active= index;
				console.log('index',index)
				
			}	
		},
		// 购物车多个商品减少数量
		sub(index){
			if(this.shoplist[index].counts<=1){
				return;
			}
			this.shoplist[index].counts--;
			
			this.sum();
			this.discounts()
		},
		// 购物车多个商品增加数量
		add(index){
			if(this.shoplist[index].counts>=this.shoplist[index].inventorySum){
				return;
			}
			this.shoplist[index].counts++;
			this.sum();
			this.discounts()
			if(this.huiList){
				this.couponname='优惠券'
			}
		},
		// 购物车满减计算价格
		sum(){
			this.sumPrice=0;
			let totls=0
			let len = this.shoplist.length;
			for(let i=0;i<len;i++){
				if(this.coupon!=0){
					this.sumPrice = this.sumPrice + parseFloat(this.shoplist[i].counts*this.shoplist[i].indentPrice);
					// if(){
						
					// }
				}else{
					// let totose=0
					// totose+=parseFloat(this.shoplist[i].billValue)*parseFloat(this.shoplist[i].counts)
					// this.sumPrice=totose.toFixed(2)
					this.sumPrice = this.sumPrice + (this.shoplist[i].counts*this.shoplist[i].indentPrice);
				}
			}
			// this.discounts()
			this.totals=this.sumPrice
			if(this.sumPrice<this.couponmin){
				this.coupon=0
				this.sumPrice=this.totals
				this.discounts()
			}
			totls = this.sumPrice-(parseFloat(this.coupon)+parseFloat(this.integraliscount));
			this.sumPrice=totls.toFixed(2)
			// console.log('this.sumPrice',this.sumPrice)
		},
		// 折扣计算价格
		multiplication(){
			this.sumPrice=0
			let num=0
			let number=0
			let totles=0
			let totose=0
			this.coupon=0
			let len = this.shoplist.length;
			for(let i=0;i<len;i++){
				if(this.coupons!=0){
					num = num + parseFloat(this.shoplist[i].indentPrice*this.shoplist[i].counts)//总金额
					number=num*this.coupons//合计
					totles=num-number//优惠金额
					// console.log('2222+++++',num)
					// this.sumPrice=number.toFixed(2)
					if(num<0){
						this.sumPrice=0
					}
				}else{
					// totose=parseFloat(this.shoplist[i].billValue)*parseFloat(this.shoplist[i].counts)
					// this.sumPrice=totose.toFixed(2)
					this.sumPrice = this.sumPrice + (this.shoplist[i].counts*this.shoplist[i].indentPrice);
				}
			}
			this.coupon=totles.toFixed(2)
			this.sumPrice = this.sumPrice-parseFloat(this.coupon).toFixed(2);
		},
		// 减到价格
		subtract(){
			this.coupon=0
			this.sumPrice=0
			let number=0
			let heji=0
			let len = this.shoplist.length;
			for(let i=0;i<len;i++){
				heji=parseFloat(this.shoplist[i].indentPrice*this.shoplist[i].counts)
				if(this.free!=0){
					number=parseFloat(this.free)*parseInt(this.shoplist[i].counts)
					
					heji=number
				}
				
			}
			this.coupon=heji - number
			this.sumPrice=heji.toFixed(2)
		},
		
		//提交订单
		submiter(){
			if(this.addresform.addrName){
				this.pashare=true
			}else{
				this.$api.msg('请选择收货地址');
			}
			
		},
		payvlout(){
			let param={
				productCode:"11", //商品编号
				counts:2,  //商品数量
				totals:this.totals,  //原价总额
				indentInfo:this.remoken,   //下单备注
				free:this.coupon,   //优惠总额
				payValue:this.sumPrice,    //应付总额
				custCouponsId:this.custCouponsId,  //优惠券编号
				sellKey:"",//销售转发key
				spellKey:"",//拼团key
				proShareKey:"",//商品分享key
				userCash:this.pachval, //用户余额可抵扣金额
				custAddressId:this.addresform.custAddressId, //增加用户收货地址id20220714
				orderType: this.pagesid, //订单类型，1-单商品提交，2-购物车提交
				sendType: this.chooskd,  //配送方式，0-普通快递，1-快递（顺丰快递）
				sendFee:this.freight,   //运费
				usePoints: this.totaldiscount, //积分兑换
				payType: 1,  //支付方式，1-微信支付，2-会员卡
				userCart:this.shoplist
			}
			this.$Request.post('/mms/wx/v1/createBillNew',param).then(res => {
				if(res.code ==500){
					uni.showToast({
						title:res.msg,
						icon: 'none'
					})
				}else{
					if(res.data){
						if(res.data.success){
							//0元购
							setTimeout(() => {
								uni.showToast({
									icon: 'none',
									title: '支付成功！',
								});
									uni.hideToast();
									//关闭提示后跳转
									uni.navigateTo({
										url: `/pages/pagesOrder/orderSuccess?payValue=${this.sumPrice}`
									})
							}, 0);
						
						}else{
							
							wx.requestPayment({
								appId:res.data.appId,
								billCode:res.data.billCode,
								billPaysCode:res.data.billPaysCode,
								timeStamp:res.data.timeStamp,
								paySign:res.data.paySign,
								nonceStr:res.data.nonceStr,
								package:res.data.package,
								signType:res.data.signType,
								success:function (res) { 
									console.log('成功',res)
									uni.navigateTo({
										url: `/pages/pagesOrder/orderSuccess`
									})
								},
								fail: function (res) {
									uni.redirectTo({
										url: `/pages/pagesUser/orderList`
									})
									console.log('失败',res)
								},
							
							})	
						}
						
					}else{
						uni.showToast({
							title:'购买失败，请联系客服人员！',
							icon: 'none'
						})
					}
						
				}		
			})
		},
		showAlert(key) {
			this.fuClassName[key] = 'show'
			this.discounts()
		},
		hideAlert(key) {
			this.fuClassName[key] = 'none'
			this.ifShowAlert = false
		},
		// 快递选择
		radioGroupChange(e) {
			this.chooskd=e-1
			
			console.log('this.chooskd',this.chooskd)
			// console.log('choosvalue',this.choosvalue)
		},
		// 快递选择确认
		chooslick(){
			if(this.chooskd==0){
				this.choostyp='普通快递'
				this.freight=0
			}else if(this.chooskd==1){
				this.choostyp='顺丰快递'
				this.freight=10
			}else{
				this.choostyp='去选择'
			}
			this.fuClassName.chooseType = 'none'
		},
		// 使用规格弹框
		useAlert() {
			this.ifShowAlert = true
		},
		closeAlert() {
			this.ifShowAlert = false
		},
		// 弹出配送方式
		chooseType(key) {
			this.fuClassName[key] = 'show'
		},
	   // 地址选择页
		addressChooseClick() {
		  uni.navigateTo({
			url: '/pages/pagesOrder/harvestAddress'
		  })
		},
		// 优惠券
		couponsPage() {
		  uni.navigateTo({
			url: '/pages/pagesUser/chooseCoupons'
		  })
		}
    }
  }
</script>

<style lang="scss" scoped>
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
	.pic-qe{
		.ridover{
			font-size: 25rpx;
			padding: 3% 7%;
			.coupon-quan{
				padding: 6% 0;
				display: flex;
				justify-content: space-between;
			}
			.coupo-di{
				padding: 4% 0;
				display: flex;
				align-items: center;
				.coupon-h{
					margin-right: 3%;
				}
			}
			.confirm-btn{
				background-color:#f70000;
				width: 85%;
				bottom: 6%;
				height: 82upx;
				line-height: 76upx;
				position: fixed;
				margin-top: 7%;
				color: #fff;
				font-size: $font-lg;
			}
		}
	}
	.titleBox {
	      text-align: center;
	      padding: 40rpx 30rpx;
	      box-sizing: border-box;
	      font-size: 32rpx;
	      font-weight: bold;
	      border-bottom: 1px solid #ccc;
	      image {
	        width: 40rpx;
	        height: 40rpx;
	        float: right;
	      }
	    }
	  .couponInfo {
	    display: flex;
	    justify-content: space-around;
	    padding: 18rpx 20rpx 20rpx 25rpx;
	    box-sizing: border-box;
	    color: #fff;
	    .left {
	      border-right: 1px dashed #fff;
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
	      width: 160rpx;
	      height: 60rpx;
	      background-color: #fff;
	      border-radius: 50rpx;
	      color: rgb( 175, 100, 49);
	      text-align: center;
	      font-size: 28rpx;
	      line-height: 60rpx;
	      margin-top: 30rpx;
	      .numberRight {
	        background-color: #615349;
	        display: flex;
	        flex-direction: column;
	        justify-content: center;
	        align-items: center;
	        height: 150rpx;
	        font-size: 28rpx;
	        color: #f4f0ee;
	        border-left: 1px solid #ccc;
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
	          content:'-';
	          display: inline;
	          margin-right: 10rpx;
	        }
	        .rightNumber::after {
	          content:'-';
	          display: inline;
	          margin-left: 10rpx;
	        }
	        .useBtn {
	          font-size: 24rpx;
	          border: 1px solid #fff;
	          width: 120rpx;
	          height: 40rpx;
	          line-height: 40rpx;
	          color: #fff;
	          border-radius: 20rpx;
	        }
	      }
	    }
	  }
	  .noUser {
	    text-align: center;
	    border-bottom: 1px solid #ccc;
	    padding-bottom: 10rpx;
	    margin-top: 80rpx;
	  }
	  .coupon {
	    position: relative;
	    height: 150rpx;
	    width: 100%;
	    margin: 0 auto;
	    overflow: hidden;
	  }
	  
	  .couponBox {
	    padding: 30rpx 30rpx;
	    box-sizing: border-box;
		.tips {
		  width: 100%;
		  height: 90rpx;
		  background-color: #cec3ad;
		  color: #000;
		  font-size: 28rpx;
		  color: rgb( 97, 82, 71);
		  padding-left: 30rpx;
		  line-height: 90rpx;
		  box-sizing: border-box;
		}
	  }
	  /* 优惠券背景颜色 */
	  .coupon-yellow {
	    background-color: #c49c62;
	  }
	  /* 下边框的波浪  */
	  .coupon-wave-left::before,
	  .coupon-wave-right::after {
	    content: '';
	    position: absolute;
	    bottom: -14rpx;
	    height: 20rpx;
	    width: 120%;
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
	  // 不使用
	  .noUseBtn {
	    width: 120px;
	    height: 80rpx;
	    background-color: red;
	    font-size: 32rpx;
	    color: #fff;
	    text-align: center;
	    line-height: 80rpx;
	    border-radius: 50rpx;
	    background-color: #c49c62;
	    margin: 0 auto;
	    margin-top: 100rpx;
	  }
	// .checkbox-box{
	// 	display: flex;
	// 	align-items: center;
	// 	padding-left: 3%;
	// 	.checkbox{
	// 		width: 35upx;
	// 		height: 35upx;
	// 		border-radius: 100%;
	// 		border: solid 2upx #f06c7a;
	// 		display: flex;
	// 		justify-content: center;
	// 		align-items: center;
	// 		.on{
	// 			width: 25upx;
	// 			height: 25upx;
	// 			border-radius: 100%;
	// 			background-color: #f06c7a;
	// 		}
	// 	}
	// 	.text{
	// 		font-size: 28upx;
	// 		margin-left: 10upx;
	// 	}
	// }
  .content {
    .address {
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      box-sizing: border-box;
      height: 120rpx;
      border-bottom: 1px solid #cccccc;
      .left {
        width: 80rpx;
        height: 80rpx;
        border: 1px solid #000;
        font-size: 70rpx;
        line-height: 70rpx;
        text-align: center;
        color: #000;
        border-radius: 10rpx;
      }
      .right {
        color: #000;
        margin-left: 30rpx;
      }
    }
    .haveAddress {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 30rpx 30rpx;
      box-sizing: border-box;
      border-bottom: 1px solid #cccccc;
      .infoBox {
        display: flex; // justify-content: space-between;
		justify-content: space-between;
        width: 100%;
      }
      .center {
        width: 100%;
        .addressTop {
          display: flex;
          justify-content: space-between;
          .left {
            font-size: 34rpx;
            font-weight: bold;
          }
        }
      }
      .dingwei {
        height: 60rpx;
        width: 40rpx;
        margin-right: 20rpx;
      }
      .rightIcon {
        width: 20rpx;
        height: 30rpx;
        margin-left: 30rpx;
        vertical-align: middle;
      }
    }
    .pro {
      .title {
        display: flex;
        height: 110rpx;
        align-items: center;
        padding: 0 40rpx;
        image {
          width: 45rpx;
          height: 40rpx;
          margin-right: 15rpx;
        }
      }
      .list {
        display: flex;
        background-color: #f7f6f4;
        justify-content: space-between;
        padding: 15rpx 30rpx;
        margin-top: 20rpx;
        box-sizing: border-box;
        .leftBox {
          display: flex;
		  .left {
		    image {
		      width: 180rpx;
		      height: 180rpx;
		    }
		  }
        }
       
        .center {
          margin-left: 20rpx;
          font-size: 32rpx;
          .price {
            color: #e99785;
            font-size: 30rpx;
            margin-top: 25rpx;
          }
          .number {
            color: #e99785;
            font-size: 30rpx;
          }
        }
        .right {
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          .num {
            font-size: 30rpx;
            color: #e99785;
            text-align: right;
          }
          .addOrdel {
            display: flex;
            margin-bottom: 10rpx;
            color: #e99785;
            margin-top: 30rpx;
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
						border: 2upx solid #e99785;
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
						border: 2upx solid #e99785;
						align-items: center;
						
					}
				}
			}
            .addOrdelNum {
              border: 1px solid #e99785;
              width: 50rpx;
              height: 35rpx;
              text-align: center;
              line-height: 35rpx;
              margin-left: 14rpx;
              margin-right: 14rpx;
            }
            .del {
              font-size: 30rpx;
            }
          }
        }
      }
      .list:nth-child(2) {
        margin-top: 0rpx;
      }
    }
    .type {
      height: 170rpx;
      display: flex;
      align-items: center;
      padding: 0 30rpx;
      padding-bottom: 30rpx;
      box-sizing: border-box;
      justify-content: space-between;
      border-bottom: 1px solid #cacaca;
      .right {
        .expressText {
          // margin-top: 50rpx;
          image {
            width: 20rpx;
            height: 30rpx;
            margin-left: 30rpx;
            vertical-align: middle;
          }
        }
        .time {
          color: red;
          font-size: 30rpx;
          margin-top: 10rpx;
          margin-left: -40rpx;
        }
      }
    }
    .integral {
      height: 100rpx;
      line-height: 100rpx;
      padding-bottom: 0rpx;
      .right {
        height: 100rpx;
        line-height: 100rpx;
        .express {
          margin-top: 0rpx;
          color: #000;
        }
      }
    }
    .note {
      display: flex;
      height: 110rpx;
      line-height: 110rpx;
      padding: 0 30rpx;
      border-bottom: 1px solid #cacaca;
      box-sizing: border-box;
      input {
        height: 110rpx;
        line-height: 110rpx;
        margin-left: 100rpx;
      }
    }
    .priceInfo {
      display: flex;
      justify-content: space-between;
      padding: 20rpx 30rpx;
      box-sizing: border-box;
      font-size: 32rpx;
      height: 60rpx;
      line-height: 60rpx;
      .right {
        color: #e99785;
      }
    }
    .total {
      text-align: right;
      padding: 0 30rpx;
      box-sizing: border-box;
      height: 100rpx;
      line-height: 100rpx;
    }
    .btn {
      position: fixed;
      bottom: 0rpx;
      height: 110rpx;
      width: 100%;
      background-color: #e6e7e7;
      display: flex;
      justify-content: space-between;
      padding: 0 30rpx;
      box-sizing: border-box;
      .left {
        font-size: 32rpx;
        .price {
          color: red;
          margin-top: 10rpx;
        }
        .sale {
          color: #000;
          font-size: 32rpx;
          text {
            color: red;
          }
        }
      }
      .right {
        width: 210rpx;
        height: 80rpx;
        background-color: red;
        border-radius: 50rpx;
        text-align: center;
        line-height: 80rpx;
        color: #fff;
        font-size: 34rpx;
        margin-top: 15rpx;
      }
    }
    .top {
      display: flex;
      justify-content: space-between;
      height: 100rpx;
      padding: 0 20rpx;
      box-sizing: border-box;
      align-items: center;
      border-bottom: 1px solid #ccc;
      .left {
        font-size: 36rpx;
        font-weight: bold;
        text {
          font-weight: normal;
          font-size: 32rpx;
        }
      }
      .right {
        font-size: 32rpx;
        image {
          width: 40rpx;
          height: 40rpx;
          margin-left: 15rpx;
        }
      }
    }
    .listContent {
      display: flex;
      justify-content: space-between;
      padding: 0 30rpx;
      box-sizing: border-box;
      font-size: 36rpx;
      font-weight: bold;
      margin-top: 40rpx;
      .kong {
        width: 30rpx;
        height: 30rpx;
        border-radius: 50%;
        border: 1px solid #ccc;
        .shixin {
          width: 12rpx;
          height: 12rpx;
          border-radius: 50%;
          background-color: #b51431;
          margin: 0 auto;
          margin-top: 9rpx;
        }
      }
    }
    .contentBox {
      padding-bottom: 100rpx;
      box-sizing: border-box;
    }
  }
  .bottom {
    display: flex;
    justify-content: center;
    margin-top: 60rpx;
    .left {
      background-color: #c2906d;
      color: #fff;
      margin-right: 40rpx;
    }
    .right {
      color: #FFF;
      border: 1px solid #c2906d;
      margin-left: 40rpx;
      background-color: #e43828;
    }
    view {
      width: 200rpx;
      height: 70rpx;
      line-height: 70rpx;
      text-align: center;
      border-radius: 50rpx;
    }
  }
  .expressType {
    height: 100rpx;
    line-height: 100rpx;
    border-bottom: 1px solid #ccc;
    view {
      text-align: center;
    }
    image {
      width: 40rpx;
      height: 40rpx;
      float: right;
      margin-top: -70rpx;
      margin-right: 30rpx;
    }
  }
  .expressTypeBox {
    display: flex;
    padding: 30rpx;
    box-sizing: border-box;
    font-size: 32rpx;
    view {
      margin-left: 5rpx;
    }
    .tips {
      font-size: 28rpx;
      color: #ccc
    }
  }
</style>