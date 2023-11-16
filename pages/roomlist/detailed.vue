<template>
	<view class="content">
		<view style="background-color: #f3f2f2;padding: 6% 2%;border-radius: 0 0 15px 15px;">
			<view style="background-color: #fff;padding: 2% 5%; border-radius: 7px;" class="">
				<view style="text-align: center;" class="">
					<text class="goInHotel">入住</text>
					<text class="date-wrappper">{{ choiceDate[0].month }}月{{ choiceDate[0].day }}日</text>
					<text class="left-hotel">离店</text>
					<text class="date-wrappper">{{ choiceDate[1].month }}月{{ choiceDate[1].day }}日</text>
					<text class="sumCount">-{{ dayCount }}晚-</text>
				</view>
				<view @click.stop="roomdetail(item)" style="display: flex;margin: 5% 0;" class="">
					<view style="width: 180upx;height: 180upx;" class="">
						<img style="width: 100%;height: 100%;border-radius: 20upx;" :src="product.listImg" alt="">
					</view>
					<view style="width: 64%;margin-left: 3%;" class="">
						<view style="font-size: 18px; line-height: 28px;height: 56px;" class="ellipsisduo">{{product.floor}}{{product.roomName}}</view>
						<view style="color: #cecece;font-size: 13px;margin-top: 5%;" class="">
							<!-- <text>{{product.early == null ? '' : product.early}}</text>	 -->
							
							<text>{{ choiceDate[0].re }}-{{ choiceDate[1].re }}</text>	
						</view>
					</view>
				</view>
				<view style="display: flex;justify-content: flex-end;align-items: center;margin-bottom: 3%;" class="">
					<text style="margin-right: 22%;font-size: 18px;">￥{{product.billValue}}</text>
					<!-- <text style="margin-right: 22%;font-size: 18px;">￥{{total}}</text> -->
					<u-number-box :disabled-input='true' :min="quantity_min" v-model="quantity_value" @change="valChange"></u-number-box>
				</view>
				<!-- <text style="color: #656262;margin-top: 5%;display: inline-block;">{{contetitle}}</text>
				<view style="font-size: 14px; color: #8e8c8c; padding: 5% 0;border-bottom: 1px solid #cac5c5;" class="">{{wanttom}}</view> -->
				<!-- <view style="font-size: 14px;padding: 2% 0;" class="">放心订！<text>{{ choiceDate[0].month }}月{{ choiceDate[0].day }}日 18:00前可免费取消!</text> </view> -->
			</view>
		</view>
		<view class="">
			<view style="width: 97%;background-color: #fff;margin: 5% auto;padding: 5%;border-radius: 7px;" class="">
				<view style="font-size: 19px;font-weight: 600;" class="">入住信息</view>
				<u-form :model="model" :rules="rules" ref="uForm">
					<!-- <u-form-item :label-position="labelPosition" label="房间数量" prop="goodsType" label-width="150">
						<u-input :border="border" type="select" :select-open="selectShow" v-model="model.goodsType" @click="selectShow = true"></u-input>
					</u-form-item> -->
				<!-- 	<view v-for="(index) in goddslist" :key="index" class="">
						<u-form-item label-width="150" :label-position="labelPosition" label="住客姓名">
							<input @input="changeConTitle($event)" :data-index='index' :border="border" placeholder="每间填一位住客姓名" type="text"><input>
						</u-form-item>
					</view> -->
					<u-form-item label-width="150" :label-position="labelPosition" label="住客姓名" prop="name">
						<u-input v-model="model.name" :border="border" placeholder="填一位住客姓名" type="text"></u-input>
					</u-form-item>
					<u-form-item label-width="150" :label-position="labelPosition" label="联系手机" prop="phone">
						<u-input :border="border" placeholder="用于接收通知短信" v-model="model.phone" type="number" maxlength='11'></u-input>
					</u-form-item>
					<u-form-item label-width="150" :label-position="labelPosition" label="预计到店" prop="estimate">
						<u-input v-model="model.estimate + `（房间整晚保留）`" type="select" @click="estimateShow = true"></u-input>
					</u-form-item>
				</u-form>
			</view>
			<view style="width: 97%;background-color: #fff;margin: 5% auto;padding: 5%;border-radius: 7px;" class="">
				<view style="font-size: 19px;font-weight: 600; margin-bottom: 6%;" class="">选择支付方式</view>
				<view class="">
					<radio-group @change="couponChange" class="datas">
						<view style="margin-bottom: 3%;" class="goods_detail">
							<view style=" width: 60%;" class="">
								<img style='width: 30px; height: 30px;vertical-align: middle;' src="../../static/image/card.png" alt="">
								<text style="margin-left: 16%;font-size: 16px;">会员卡余额支付</text>
							</view>
							<view style="text-align: right;" class="">
								<radio color='#bd9e4e' :value="userCash" :disabled="userCash<=0"  style="transform:scale(0.8);" />
							</view>
						</view>
						<view v-if="showpic" style="width: 60%;background-color: #f5f5f5;padding: 5%;margin: auto; border-radius: 10px;" class="">
							<view style="text-align: center;padding: 2% 0;" class="">
								<text style="font-size: 16px;">余额可支付金额</text>
								<view style="font-size: 20px;margin-top: 6%;">￥{{userCash}}</view>
							</view>
						</view>
						<view style="margin-top: 10%;" class="goods_detail">
							<view style=" width: 60%;" class="">
								<img style='width: 25px;height: 23px;vertical-align: middle;' src="../../static/image/wx.png" alt="">
								<text style="font-size: 16px;margin-left: 18%;">微信支付</text>
							</view>
							<view class="">
								<radio color='#bd9e4e' :checked="checked" :value="wxname" style="transform:scale(0.8);" />
							</view>
						</view>
					</radio-group>
				</view>
				<!-- <view style="display: flex;justify-content: space-between;margin-top: 10%;" class="">
					<view style="font-size: 17px;width: 40%;">优惠券 <text style="background-color: #f5d8d8;color: #a54141;font-size: 14px;width: 20px;height: 20px;text-align: center;display: inline-block;margin-left: 6%;">减</text> </view>
					<view v-if="coupon" @click="couponShow = true" class="right"><text>-</text>￥{{coupon}}元 ></view>
					<view v-else @click="couponShow = true" class="right">{{couponname}}></view>
				</view> -->
			</view>
			<view style="width: 97%; margin: auto;" class="">
				<view class="">
					<img style='width: 15px;height: 15px;' src="../../static/image/sm.png" alt="">
					<text style="margin-left: 3%;color: #a7a7a7;">说明</text>
				</view>
				<view style="color: #696868;font-size: 14px;margin: 5% 0 5% 7%;">下单后<text style="color: #b5b5b5;">不可取消修改</text>，若未入住将收取您全额房费</view>
				<view style="color: #696868;font-size: 14px;margin: 8% 0 5% 7%;"><text style="color: #b5b5b5;margin-right: 3%;">开取发票</text>如需发票，请向酒店索取。
				</view>
			</view>
			<view class="page-bottom">
				<view style="width: 52%;display: flex;justify-content: space-between;align-items: center;">
					<view class="">
						<text class="tots">￥{{payValuetot}}</text>
						<!-- <view style="font-size: 12px;color: #5f5d5d;" class="">以优惠￥{{preferential}}</view> -->
					</view>
					<view @click="fangs = !fangs" class="">
						<text style="font-size: 13px;color: #5f5d5d;">明细</text>
						<u-icon name="arrow-down" size="26" color="#5f5d5d" :class="fangs ? 'arrowTransform':'arrowTransformReturn'"></u-icon>
					</view>
				</view>
				<view class="but">
					<u-button :custom-style="customStyle" shape="circle" @click="toFavorite">提交订单</u-button>
				</view>
			</view>
		</view>
		
		<!-- 到店时间 -->
		<u-popup v-model="estimateShow" mode="bottom" border-radius="14">
			<view style="padding: 6% 5%;" class="">
				<view style="font-size: 16px;font-weight: 600;margin-bottom: 3%;">预计到店</view>
				<text style="font-size: 13px;color: #a9a6a6;">房间整晚保留，12:30前到店可能需要等房，详情咨询商家</text>
				<view style="display: flex;flex-wrap: wrap; margin: 5% 0 14%;" class="">
					<view :class="[index==showCategoryIndex?'cur':'']" @tap="tapInfo( item, index)" v-for="(item , index) in timeslot" :key="index" class="time_sol"><text v-if="item.timesid == 2">次日</text>{{item.time}}</view>
				</view>
			</view>
			
		</u-popup>
		
		<!-- 优惠券弹 -->
		<u-popup v-model="couponShow" mode="bottom" closeable='true' border-radius="14">
			<view class="titleBox">优惠券</view>
			<scroll-view style="height: 1000upx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
				<view style="padding: 6% 5% 20%;" class="">
					<u-radio-group size='50' v-model="couponSettingId" @change="integraChange" class="coupon-tp">
						<view class="listContent">
							<!-- <scroll-view style="height: 1100upx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" > -->
								<!-- 未使用 -->
								<view v-for="(item, index) in huiList" :key="index" class="couponBox">
									<view class="">
										<view style=" display: flex;justify-content: flex-end;">
											<u-radio
												active-color="#bd9e4e"
												:name="item.free"
												:disabled="item.fullgral>totalintegral" 
											/>
										</view> 
										<view class="couponInfo">
										  <view class="left">
											<view class="num">￥{{item.free}}</view>
											<!-- <view class="num">满{{item.min}}元可用</view> -->
										  </view>
										  <view class="center">
											  
											<view class="title">{{item.couponsName}}</view>
											<!-- <view class="time">{{item.startTime}}-{{item.endTime}}</view> -->
										  </view>
										  
										</view>
									</view>
								</view>
								<view v-if="huiList.length>0" @click="nousedclick" class="noUseBtn">不使用优惠</view>
						</view>
					</u-radio-group>
					
				</view>
			</scroll-view>
		</u-popup>
		
		<!-- 明细弹框 -->
		<u-popup :custom-style='popupstyle' v-model="fangs" mode="bottom">
			<view style="padding: 6% 5%;" class="">
				<scroll-view style="height: 720upx;" :scroll-top="scrollTop" scroll-y="true" class="scroll-Y" >
					<view style="display: flex;justify-content: space-between;font-size: 18px;" class="">
						<text>入住间夜</text>
						<view class="">
							<text style="color: #bd9e4e;font-weight: 600;font-size: 18px;">{{quantity_value}}间 x {{dayCount}}晚</text>
						</view>
					</view>
					<view style="display: flex;justify-content: space-between;padding-top: 8%; padding-bottom: 5%;border-bottom: 1px solid #ded9d9;">
						<text style="font-size: 16px;">房费</text>
						<view style="color: #bd9e4e;">￥<text style="color: #bd9e4e;font-weight: 600;font-size: 18px;">{{product.billValue}}</text></view>
					</view>
					<view class="">
						<view style="display: flex;justify-content: space-between;padding-left: 5%; padding-top: 5%;color: #bbb7b7;font-weight: 600;font-size: 16px;" v-for="(item , index) in choiceDateArr" :key="index">
							<text>{{item.re}} <text>(1间)</text></text>
							<text>￥{{product.billValue}}</text>
						</view>
					</view>
					<view style="padding-top: 8%; padding-bottom: 5%;border-bottom: 1px solid #ded9d9;" class="">
						<text style="font-size: 16px;">优惠明细</text>
					</view>
					<!-- <view style="display: flex;justify-content: space-between;padding-left: 5%;padding-top: 5%;color: #bd9e4e;" class="">
						<text style="color: #bbb7b7;">优惠金额</text>
						<view style="font-size: 13px;" class="">
							￥<text style="font-size: 16px;">-{{coupon}}</text>
						</view>
						
					</view> -->
					<view style="display: flex;justify-content: space-between;padding-top: 8%; padding-bottom: 5%;">
						<text>微信支付</text>
						<view style="font-size: 13px;color: #bd9e4e;" class="">
							￥
							<text style="font-size: 18px;color: #bd9e4e;">{{payValuetot}}</text>
						</view>
					</view>
					<view style="display: flex;justify-content: space-between; padding-bottom: 5%;">
						<text>实付金额</text>
						<view style="font-size: 13px;color: #bd9e4e;" class="">
							￥
							<text style="font-size: 18px;color: #bd9e4e;">{{payValuetot}}</text>
						</view>
					</view>
				</scroll-view>
			</view>
			
		</u-popup>
	</view>
</template>

<script>
	export default {
		
		data() {
			return {
				isUserCash:false,
				choiceArr:[],//临时存放
				totals:0,//原价总额
				showpic:false,
				radioidisab:false,
				checked:true,
				couponname:'有可使用优惠券',
				choiceDateArr:[],
				total:198,
				popupstyle:{
					'width': '90%',
					'margin': ' 20% auto'
				},
				huiList:[],
				couponSettingId:'',
				couponShow:false,
				pachval:0,
				userCash:0,//会员余额
				cardname:1,
				wxname:2,
				coupon:0,
				quantity_value:1,
				quantity_min:1,
				product:{
					floor:'',
					roomName:'',
					listImg:'',
					early:'无早',
					billValue:0
				},
				customStyle:{
					textAlign: 'center',
					color: '#FEFEFE',
					background: '#bd9e4e',
				},
				fangs:false,
				payValuetot:0,
				preferential:'25',//优惠额
				showCategoryIndex:0,
				timeslot:[
					{
						timesid:1,
						time:'14:00:00'
					},
					{
						timesid:1,
						time:'16:00:00'
					},
					{
						timesid:1,
						time:'18:00:00'
					},
					
					{
						timesid:1,
						time:'20:00:00'
					},
					{
						timesid:1,
						time:'22:00:00'
					},
					
					{
						timesid:1,
						time:'23:00:00'
					},
					{
						timesid:2,
						time:'00:00:00'
					},
					{
						timesid:2,
						time:'01:00:00'
					},
					{
						timesid:2,
						time:'03:00:00'
					},
					{
						timesid:2,
						time:'05:00:00'
					},
					{
						timesid:2,
						time:'06:00:00'
					}
					
				],
				selectorObj: [
					{
						value: '1',
						lable: 1
					},
					{
						value: '2',
						lable: 2
					},
					{
						value: '3',
						lable: 3
					},
					{
						value: '4',
						lable: 4
					},
					{
						value: '5',
						lable: 5
					},
					{
						value: '6',
						lable: 6
					},
					{
						value: '7',
						lable: 7
					},
					{
						value: '8',
						lable: 8
					}
					
				],
				goddslist:[
					{
						modelLabel:''
					}
				],
				estimateList:[
					{
						value: '1',
						label: '18:00'
					},
					{
						value: '2',
						label: '19:00'
					},
					{
						value: '3',
						label: '20:00'
					},
					{
						value: '4',
						label: '21:00'
					},
					{
						value: '5',
						label: '22:00'
					},
					{
						value: '6',
						label: '23:00'
					}
				],
				labelPosition: 'left',
				border: false,
				model: {
					goodsType: '1',
					name:'',
					phone:'',
					estimate:'14:00:00'

				},
				estimateShow:false,
				selectShow: false,
				rules: {
					
					phone: [
						{
							required: true,
							message: '请填写手机号',
							trigger: 'blur',
						}
					],
					name: [
						{
							required: true,
							message: '请填写住客姓名',
							trigger: 'blur' ,
						}
						
					
					],
				},
				// instructions:'',
				dayCount:1,
				choiceDate:[],
				// contetitle:'经济大床房新店上线/万科城/近大学城/每日消毒',
				wanttom:'单人床·无早餐2人入住·20-20m2窗户位于走廊',
				cartnum:0,
				title: 'Hello',
			}
		},
		onLoad(options) {
			if(options.roomsId){
				this.roomsId=options.roomsId
				this.getroomsinfo(options.roomsId)
			}
			if(options.choice){
				let repodata=JSON.parse(decodeURIComponent(options.choice))
				// console.log('choiceDate',repodata)
				this.choiceDate=repodata
				console.log('this.choiceDate',this.choiceDate)
			}
			if(options.choiceDateArr){
				let choicelist=[]
				this.choiceArr=[]
				let choiceArr=JSON.parse(decodeURIComponent(options.choiceDateArr))
				// console.log('choiceDateArr',choiceDateArr)
				this.choiceArr=choiceArr
				for (var i = 0; i < choiceArr.length-1; i++) {
					choicelist.push(choiceArr[i])
				}
				this.choiceDateArr=choicelist
				// console.log('this,choiceArr',this.choiceArr)
			}
			if(options.dayCount){
				this.dayCount = options.dayCount
			}
			// uni.hideTabBar()
		},
		onShow() {
			this.getsurplus()
			let partime=this.choiceDate[0].re + ' ' + this.model.estimate
			this.storeTime=partime
			this.getcoypon()
			console.log('this.model.estimate',this.model.estimate)
		},
		onReady() {
			this.$refs.uForm.setRules(this.rules);
		},
		methods: {
			// 房间详情
			roomdetail(){
				// console.log('item',item)
				let roomsId=this.roomsId
				let choiceDate = encodeURIComponent(JSON.stringify(this.choiceDate))
				let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
				let dayCount = this.dayCount
				uni.navigateTo({
					url: `/pages/roomlist/roomdetailed?choice=${choiceDate}&dayCount=${dayCount}&choiceDateArr=${choiceDateArr}&roomsId=${roomsId}`
				});
			},
			// 查询会员余额
			getsurplus(){
				this.$Request.getT(`/mms/wx/v1/rooms/getCardCash`).then(res => {
					if(res.code==200){
						if(res.data){
							this.userCash=res.data.newCash
						}
					}
				})
			},
			// 查询商品信息
			getroomsinfo(roomsId){
				this.$Request.getT(`/mms/wx/v1/rooms/roomsInfo/${roomsId}`).then(res => {
					if(res.code==200){		
						this.product=res.data
						
						this.payValuetot=res.data.cost
						this.product.billValue=res.data.cost
						this.totles()
					}
				})
			},
			//不使用优惠券
			nousedclick(){
				this.coupon=0
				this.couponname='有可使用优惠券'
				this.couponShow = false
				this.couponSettingId=0
				this.totles()
				
				
			},
			// 优惠券cheng事件
			integraChange(e){
				console.log('e',e)
				if(e){
					this.coupon=e
					this.totles()
				}else{
					this.coupon=0
					this.totles()
				}
				
			},
			// 选用支付方式cheng事件
			couponChange(evt){
				console.log('evt',evt)
				if(evt.detail.value == 2){
					this.isUserCash=false
					this.pachval=0
					this.showpic=false
				}else{
					this.isUserCash=true
					this.showpic=true
					if(evt.detail.value==0){
						this.pachval=0
					}else if(evt.detail.value>=this.payValuetot){
						this.showpic=true
						this.pachval=this.payValuetot
					}else if(evt.detail.value<this.payValuetot){
						this.showpic=true
						this.pachval=this.userCash
					}
				}	
			},
			// 购买数量
			valChange(e) {
				// console.log('e',e)
				if(e.value!=0){
					this.totles()
				}
				
			},
			// 查询优惠券
			getcoypon(){
				this.couponname='无可用优惠券'
				// uni.showLoading({
				// 	title:'加载中...'
				// })
				
				// this.$Request.post('/mms/wx/v1/myCoupons').then(res => {
				// 	this.huiList=[]
				// 	let coupondata=[]
				// 	let couponlist=res.data
				// 	if(res.code==200){
				// 		couponlist.forEach(val=>{
				// 			if(val.custCouponsState == 1){
				// 				coupondata.push(val)
				// 			}
				// 		})
				// 		this.huiList=coupondata	
				// 	}
				// 	uni.hideLoading();
				// })
			},
			// 计算金额
			totles(){
				if(this.coupon!=0){
					let totls=0
					// let total=0
					totls=parseFloat((this.product.billValue)*(this.quantity_value)*(this.dayCount))-parseFloat(this.coupon)
					// total=parseFloat(this.product.billValue)*parseFloat(this.quantity_value)
					// this.total=total.toFixed(2)
					console.log('totls',totls)
					this.payValuetot=totls.toFixed(2)
					if(totls<0){
						this.payValuetot=0
					}
				}else{
					let totls=0
					// let total=0
					totls=parseFloat((parseFloat(this.dayCount)*(this.product.billValue)*this.quantity_value))
					
					console.log('totls',totls)
					this.payValuetot=totls.toFixed(2)
					this.totals=totls.toFixed(2)
					// this.product.billValue=totls.toFixed(2)
				}
			},
			//添加
			tapInfo(item ,index) {
				if(item.timesid == 2){
					this.model.estimate= '次日'+item.time
					let partime=this.choiceArr[1].re + ' ' + item.time
					this.storeTime=partime
				}else{
					this.model.estimate=item.time
					let partime=this.choiceDate[0].re + ' ' + item.time
					this.storeTime=partime
					
				}
				this.showCategoryIndex = index;
				this.estimateShow=false
				console.log('this.model.estimate',this.model.estimate)
				// if (this.rSelect.indexOf(e) == -1) {
				// 	console.log(e)//打印下标
				// 	this.rSelect.push(e);//选中添加到数组里
				// } else {
				// 	this.rSelect.splice(this.rSelect.indexOf(e), 1); //取消
				// }
			},
			// 提交订单
			toFavorite(){
				this.$refs.uForm.validate(valid => {
					if (valid) {
						let parames={
							roomsId: this.roomsId,
							counts:this.quantity_value,
							inTime:this.choiceDate[0].re,
							outTime:this.choiceDate[1].re,
							storeTime:this.storeTime,
							totals:this.totals,
							free:this.coupon,
							payValue:this.payValuetot,
							userCash:this.pachval,
							username:this.model.name,
							phone:this.model.phone,
							days:this.dayCount,
							isUserCash:this.isUserCash
						}
						console.log('parames',parames)
						this.$Request.post(`/mms/wx/v1/rooms/createBill`,parames).then(res => {
							if(res.code==200){
								if(res.data.success==true){
									uni.showToast({
										icon: 'none',
										title: '支付成功，即将跳转到订单列表！',
									});
									setTimeout(() => {
										uni.hideToast();
										//关闭提示后跳转
										uni.navigateTo({
											url: `/pages/pagesUser/reservationorder`
										})
									}, 1500)
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
												url: `/pages/pagesUser/reservationorder`
											})
										},
										fail: function (res) {
											uni.reLaunch({
												url: `/pages/pagesUser/reservationorder`
											})
											console.log('失败',res)
										},
									
									})
								}
								
							}else{
								this.$api.msg(res.msg)
							}
							
						})
					} else {
						console.log('验证失败');
					}
				});
			}
			// changeConTitle(event) {
			// 	console.log('event.detail.value',event.detail.value)
			// 	// console.log('dataValue',dataValue)
			// 	  // var idx = e.currentTarget.dataset.index; //当前下标
			// 	  var val = event.detail.value; //当前输入的值
			// 	  var _list = this.goddslist; //data中存放的数据
			// 	  // let obj={
					  
			// 	  // }
			// 	  for (let i = 0; i < _list.length; i++) {
			// 		  // if (idx == i) {
			// 			  _list[i] = {
			// 				  modelLabel: val
			// 			  } //将当前输入的值放到数组中对应的位置
			// 		  // }
			// 		  this.goddslist= _list
			// 	  }
			// 	  // this.goddslist= _list
			// 	  console.log('this.goddslist',this.goddslist)
			//  },
			// 预计到店
			// estimateConfirm(e){
			// 	this.model.estimate = '';
			// 	// console.log('e',e)
			// 	e.map((val, index) => {
			// 		this.model.estimate += this.model.estimate == '' ? val.label : '-' + val.label;
			// 	})
			// },
			// 房间数量
			// selectConfirm(e) {
			// 	// this.goddslist=[]
			// 	this.model.goodsType = '';
			// 	// console.log('e',e)
			// 	this.model.goodsType=e[0] +1 +''
			// 	// console.log('this.model.goodsType',this.model.goodsType)
			// 	// e.map((val, index) => {
			// 	// 	this.model.goodsType += this.model.goodsType == '' ? val.label : '-' + val.label;
			// 	// })
				
			// 	// for (let i = 0; i < e[0].label; i++) {
			// 	// 	var _list = this.goddslist;
			// 	// 	 _list.push("");
			// 	// 	this.goddslist = _list
			// 	// }
			// },
			//查询购物车列表
			// getshop(){
			// 	this.$Request.getT('/mms/wx/v1//getCarts').then(res => {
			// 		if(res.code==200){
			// 			this.cartnum=res.data.length	
			// 		}
					
			// 	})
			// },
		},
		
	}
</script>

<style lang="scss" scoped>
	page{
		height: 100%;
	}
	.titleBox {
	      text-align: center;
	      padding: 30rpx 30rpx;
	      box-sizing: border-box;
	      font-size: 32rpx;
	      font-weight: bold;
	      border-bottom: 1px solid #ccc;
	     
	}
	.noUseBtn {
	  width: 120px;
	  height: 80rpx;
	  font-size: 32rpx;
	  color: #fff;
	  text-align: center;
	  line-height: 80rpx;
	  border-radius: 50rpx;
	  background-color: #c49c62;
		margin: 5% auto;
	 
	}
	.couponInfo {
	  display: flex;
	  justify-content: space-around;
	  padding-bottom: 4%;
	  box-sizing: border-box;
	  color: #fff;
	  .left {
	    border-right: 1px dashed #b5a8a8;
	    line-height: 50px;
	    padding-right: 5%;
	    .num {
			font-size: 22px;
			font-weight: 600;
			color: #ad7d7d;
			text-align: center;
	    }
	    // .num:nth-child(2) {
	    //   font-size: 26rpx;
	    // }
	  }
	  .center {
		line-height: 50px;
		margin-left: 5%;
	    .title {
			color: #696161;
	      font-size: 32rpx;
	      // margin-bottom: 25rpx;
	    }
	    .time {
	      font-size: 28rpx;
	    }
	  }
	  // .right {
	  //   width: 160rpx;
	  //   height: 60rpx;
	  //   background-color: #fff;
	  //   border-radius: 50rpx;
	  //   color: rgb( 175, 100, 49);
	  //   text-align: center;
	  //   font-size: 28rpx;
	  //   line-height: 60rpx;
	  //   margin-top: 30rpx;
	    
	  // }
	}
	.couponBox {
	  padding: 30rpx 30rpx;
	  box-sizing: border-box;
	  box-shadow: 2px 2px 9px 3px #bfbbbb;
	  margin: 5% 0;
	  border-radius: 5px;
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
	.coupon {
	  position: relative;
	  height: 150rpx;
	  // width: 100%;
	  // margin: 0 auto;
	  // overflow: hidden;
	}
	/* 优惠券背景颜色 */
	.coupon-yellow {
	  background-color: #fff;
	}
	.goods_detail{
		display: flex;
		align-items: center;
		justify-content: space-between;
	}
	
	.arrowTransform {
		transition: 0.2s;
		transform-origin: center;
		transform: rotateZ(180deg);
	}
		.arrowTransformReturn {
		transition: 0.2s;
		transform-origin: center;
		transform: rotateZ(0deg);
	}
	/* 底部操作菜单 */
	.page-bottom{
		border-top: 2upx solid #e6e6e6;
		position:sticky;
		bottom:0;
		display: flex;
		justify-content: center;
		align-items: center;
		width: 750upx;
		height: 133upx;
		background: white;
		z-index: 99999;
		.tots{
			font-size: 20px;
			font-family: Microsoft YaHei;
			font-weight: 400;
			color: #bd9e4e;
			font-weight: 600;
		}
		.but{
			width: 35%;
			margin: 0 5%;
		}
		.pag-home{
			color: #C0C4CC;
			text-align: center;
			font-size: 24rpx;
			margin-right: 7%;
			image{
				width: 45rpx;
				height: 47rpx;
			}
		}
	}
	.cur {
	    color: #2951a9;
		border: 1px solid #638ce6;
		font-weight: 600;
	}
	.time_sol{
		width: 31%;
		height: 40px;
		line-height: 40px;
		text-align: center;
		background-color: #f9f9f9;
		margin: 2% 2% 2% 0;
		border-radius: 5px;
		font-size: 14px;
	}
	.content{
		// height: 100%;
		background-color: #f3f2f2;
	}
	.goInHotel {
		// margin-left: 20upx;
		font-size: 26upx;
		color: gray;
	}
	.goInHotel2 {
		font-size: 26upx;
		color: gray;
	}
	.date-wrappper {
		position: relative;
		padding: 0 10upx;
		font-size: 32upx;
		color: black;
		font-weight: 600;
	}
	.left-hotel {
		margin-left: 40upx;
		font-size: 26upx;
		color: gray;
	}
	.sumCount {
		color: #6495ed;
		margin-left: 4%;
		font-size: 26upx;
	}
</style>

