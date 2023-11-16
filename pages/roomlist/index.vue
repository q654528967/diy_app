<template>
	<view class="content">
		<view style="position: fixed;top: 0;width: 100%;background-color: #f3f2f2;z-index: 99;" class="">
			<view class="order-time flebox" @tap="showCalendar()" v-if="!modal">
				<view class="time-viewer flebox" v-if="singleDate">{{ choiceDate[0].year }}年{{ choiceDate[0].month }}月{{ choiceDate[0].day }}日</view>
				<view class="time-viewer flebox" v-else>
					<text class="goInHotel">入住</text>
					<text class="date-wrappper">{{ choiceDate[0].month }}月{{ choiceDate[0].day }}日</text>
					<text class="goInHotel2" v-if="choiceDate[0].year + '' + choiceDate[0].month + '' + choiceDate[0].day == today">今天</text>
					<text class="left-hotel">离店</text>
					<text class="date-wrappper">{{ choiceDate[1].month }}月{{ choiceDate[1].day }}日</text>
					<text class="sumCount">-{{ dayCount2 }}晚-</text>
					<text
						class="goInHotel2"
						v-if="choiceDate[choiceDate.length - 1].year + '' + choiceDate[choiceDate.length - 1].month + '' + choiceDate[choiceDate.length - 1].day == tomorrow"
					>
						明天
					</text>
					
				</view>
			</view>
			<!-- <view style="text-align: center;margin: 4%;background-color: #fff; padding: 2%;border-radius: 10rpx;" class="">客房住宿</view> -->
		</view>
		
		<view class="calendar-layer flebox" :animation="animationData" :class="isShow_H5 ? 'show' : 'hide'">
			<!-- 遮罩层 -->
			<view class="layer-white-space flebox" @tap="hideCalendar(false)"></view>

			<view class="layer-content flebox" :class="{ choiceDate: choice === true || singleDate }">
				<view class="layer-header flebox">
					<view class="layer-close flebox" @tap="hideCalendar(false)"></view>
					<text class="layer-title">选择日期</text>
				</view>
				<!--  -->
				<view class="layer-body flebox">
					<view class="week-box flebox">
						<text class="week-box-item" v-for="(item, tmpIndex) in weekNameArr" :key="tmpIndex">{{ item }}</text>
					</view>
					<!--  -->
					<scroll-view class="layer-list " scroll-y="true">
						<view v-for="(monthData, index) in date" :key="index" class="month flebox">
							<view class="month-title flebox" :class="'m-' + monthData[0].year + '-' + monthData[0].month" :style="'z-index:' + index">
								{{ monthData[0].year + '年' + monthData[0].month + '月' }}
							</view>
							<view class="month-content flebox">
								<view
									v-for="(data, index2) in monthData"
									:key="index2"
									class="day flebox"
									:data-index="index"
									:data-indexs="index2"
									:class="
										data.re < today
											? 'disabled flebox'
											: data.selected
											? 'active flebox' + (data.date == choiceDate[0].date ? ' begin flebox' : data.date == choiceDate[1].date ? ' end' : '')
											: ''
									"
									:style="index2 == 0 ? 'margin-left:' + weeks[index] * (100 / 7) + '%' : ''"
									@tap="dayClick"
								>
									<view class="day-content flebox">
										<!-- <text class="day-subject">{{ data.week }}</text> -->

										<!-- <text class="day-subject holiday" v-if="getDayType(data) === '假'">{{ getDayType(data) }}</text> -->
										<!-- <text class="day-subject workday" v-else-if="getDayType(data) === '班'">{{ getDayType(data) }}</text> -->
										<!-- <text class="day-subject" v-else>{{ getDayType(data) }}</text> -->

										<text class="day-txt">{{ getDayName(monthData[0].year, data) }}</text>

										<text class="day-tip" v-if="!singleDate">{{ data.act.tip }}</text>
									</view>
									<view class="beginTip flebox" v-if="choice === false && !singleDate">请选择离店日期</view>
									<view class="endTip flebox" v-if="choice">{{ dayCount2 }}</view>
								</view>
							</view>
						</view>
					</scroll-view>
				</view>
				<!--  -->
				<view class="layer-footer flebox"><view class="submitBtn flebox" @tap="submitbtn" v-if="choice === true || singleDate">确认{{dayCount2}}</view></view>
			</view>	
		</view>
		
		<view style="margin-top: 18%;" class="">
			<view style="padding-bottom: 1%;" class="">
				<view class="lists" >
					<view class="content-title">
						<img src="../../static/image/ROOMTYPES.png" alt="">
					</view>
					<view style=" height: 33px;margin-bottom: 5%;" class="">
						<img style="width: 100%;height: 100%;" src="../../static/image/content_top.png" alt="">
					</view>
					<view @click.stop="roomdetail(item)" v-for="(item , index) in totlist" :key="index" class="list-item3">
					    <view class="img-part">
							<img :src="item.listImg" alt="">
					        <!-- <img src="../../static/room1.png" alt=""> -->
					    </view>
					    <view class="word-part flex ver-center her-center">
					        <div>
					            <p class="room-title1">{{item.floor == null ? '' : item.floor}}</p>
								<!-- <p class="room-title1">18号楼</p> -->
					            <p class="word-p-title">{{item.roomName}}</p>
					            <p style="font-size: 12px;margin-top: 3%;" v-for="(vals , index) in item.attrsArray" :key="index">{{vals.value}}</p>
					            <!-- <p>客房床宽：1.8m</p> -->
					            <!-- <p style="font-size: 12px;">楼层：{{item.floor == null ? '' : item.floor}}</p> -->
					            <text @click.stop="predetermine(item)" class="word-p-btn">立即预定</text>
					        </div>
					        <view class="w-p-line"></view>
					        <view class="w-p-line2"></view>
					    </view>
					    <!-- <view class="tel-part">
					        <p>客房热线 ：</p>
					        <p>029—6889 9999—</p>
					    </view> -->
					</view>
				</view>
				
				<!-- <view class=""> -->
					<!-- <view style=" display: flex;justify-content: center;margin: 5% 0;" v-for="(item , index) in totlist" :key="index" class="">
						<view style="text-align: center;padding: 5% 0;position: relative;width: 90%;background-color: #fff;border-radius: 20px;" class="">
							<img style='border-radius: 15rpx;width: 90%;height: 200px;' :src="item.listImg == null ? '' : item.listImg" alt="">
							<view style="position: absolute;bottom: 30%; width: 100%;" class="">
								<text style="width: 100%;display: inline-block;text-align: left;color: #fff;padding: 0 8%;font-size: 25px;">{{item.roomName}}</text>
								<view class="">
									
									<text style="color: #eae7e7;text-shadow: 2px 2px 2px #000;font-size: 17px;display: inline-block;width: 100%;text-align: left;padding: 3% 8% 0;">{{item.content.slice(14,32)}}</text>
									
								</view>
							</view>
							<view style="display: flex;padding: 0 8%;align-items: center;justify-content: space-between;" class="">
								<view class="">
									<text v-show="item.freeCost" style="color: #dc3c3c;">￥ <text style="color: #dc3c3c;font-size: 22px;"> {{item.freeCost}}</text></text>
									<text v-show="item.cost" style="text-decoration:line-through;font-size: 14px;color: #757575;margin-left: 7%;">￥{{item.cost}}</text>
								</view>
								<view @click="predetermine(item)" style="border: 1px solid #164682;width: 50px;height: 50px;border-radius: 6px;" class="">
									<text style="width: 100%;display: inline-block;background-color: #164682;color: #fff;border-radius: 2px 2px 0 0;font-size: 20px;font-weight: 600;padding: 3% 0;">订</text>
									<view style="font-size: 13px;color: #164682;" class="">在线付</view>
								</view>
							</view>
							<view class="sjx_lca"></view>
						</view>
					</view> -->
				<!-- </view> -->
			</view>
		</view>
		<u-back-top top='400' z-index='99999' :scroll-top="scrollTop" :icon-style="iconStyle"></u-back-top>
	</view>
</template>

<script>
export default {
	data() {
		return {
			iconStyle: {
				opacity: '0.8'
			},
			scrollTop: 0,
			date: [],
			weeks: [],
			dayCount: 1,
			dayCount2: '1晚',
			festival: {
				'0101': '元旦',
				'0214': '情人节',
				'0308': '妇女节',
				'0312': '植树节',
				'0315': '消费者权益日',
				'0401': '愚人节',
				'0405': '清明节',
				'0501': '劳动节',
				'0504': '青年节',
				'0512': '护士节',
				'0601': '儿童节',
				'0701': '建党节',
				'0801': '建军节',
				'0910': '教师节',
				'0928': '孔子诞辰',
				'1001': '国庆节',
				'1006': '老人节',
				'1024': '联合国日',
				'1224': '平安夜',
				'1225': '圣诞节'
			},
			holidayList: {
				y2023: {
					holidayName: {
						'0101': '元旦',
						'0124': '除夕',
						'0125': '春节',
						'0404': '清明',
						'0501': '劳动',
						'0625': '端午',
						'1001': '国庆'
					},
					holiday: {
						//元旦
						'0101': true,
						//春节
						'0124': true,
						'0125': true,
						'0126': true,
						'0127': true,
						'0128': true,
						'0129': true,
						'0130': true,
						//清明
						'0404': true,
						'0405': true,
						'0406': true,
						//劳动
						'0501': true,
						'0502': true,
						'0503': true,
						'0504': true,
						'0505': true,
						//端午
						'0625': true,
						'0626': true,
						'0627': true,
						//中秋 国庆
						'1001': true,
						'1002': true,
						'1003': true,
						'1004': true,
						'1005': true,
						'1006': true,
						'1007': true,
						'1008': true
					},
					workday: { '0119': true, '0201': true, '0426': true, '0509': true, '0628': true, '0927': true, '1010': true }
				},
				y2021:{
					holidayName:{},
					holiday:{},
					workday:{},
				}
			},
			haveOrder: [],
			dateFlag: {},
			choice: '',
			today: '',
			choiceDate: [],
			choiceDateArr: [],
			tomorrow: '',
			afterTomorrow: '',
			weekNameArr: ['日', '一', '二', '三', '四', '五', '六'],
			animation: null,
			animationData: null,
			curScrollTop: 0,
			monthTitleRectList: [],
			fixedId: '',
			layerTop: 0,
			//用来重置的
			bak_date: [],
			bak_weeks: [],
			bak_choiceDate: [],
			bak_choiceDateArr: [],
			bak_dayCount: 1,
			isShow_H5: '', //用于表示H5平台显示隐藏状态
			isShow_NoH5: false, //用于表示非H5平台显示隐藏状态
			tmpWeekArr: {} ,//临时数组
			totlist:[]
		};
	},
	onPageScroll(e) {
			this.scrollTop = e.scrollTop;
	},
	props: {
		startDate: {
			type: String,
			default: ''
		},
		endDate: {
			type: String,
			default: ''
		},
		modal: {
			type: Boolean,
			default: false //默认为有界面的
		},
		show: {
			type: Boolean,
			default: false //默认不显示
		},
		daysCount: {
			type: Number,
			default: 150 //默认显示150天
		},
		singleDate: {
			type: Boolean,
			default: false //默认为false
		}
	},
	components: {},
	created() {
		this.init();
	},
	onLoad() {
		this.init();
	},
	onShow() {
		this.getBannerData();
		// this.getRoomAppointTel()
		console.log('this.choiceDate[0]',this.choiceDate)
	},
	watch: {
		show: function(newVal, oldVal) {
			this.isShow_NoH5 ? this.hideCalendar() : this.showCalendar();
		},
		startDate: function(newVal, oldVal) {
			console.log('--startDate');
			this.dateData();
		},
		endDate: function(newVal, oldVal) {
			console.log('--endDate');
			this.dateData();
		}
	},
	methods: {
		// 获取客房电话
		// getRoomAppointTel(){
		// 	this.$Request.gets('/client/api/roomAppointTel').then(res => {
		// 		if(res.code==200){
						
		// 		}
		// 	})
		// },
		// 房间详情
		roomdetail(item){
			// console.log('item',item)
			let roomsId=item.roomsId
			let choiceDate = encodeURIComponent(JSON.stringify(this.choiceDate))
			let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
			let dayCount = this.dayCount2
			uni.navigateTo({
				url: `/pages/roomlist/roomdetailed?choice=${choiceDate}&dayCount=${dayCount}&choiceDateArr=${choiceDateArr}&roomsId=${roomsId}`
			});
		},
		// 预定房间
		predetermine(item){
			// console.log('item',item)
			let roomsId=item.roomsId
			let choiceDate = encodeURIComponent(JSON.stringify(this.choiceDate))
			let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
			let dayCount = this.dayCount2
			// console.log('this.dayCount2',this.dayCount2)
			uni.navigateTo({
				url: `/pages/roomlist/detailed?choice=${choiceDate}&dayCount=${dayCount}&choiceDateArr=${choiceDateArr}&roomsId=${roomsId}`
			});
		},
		//查询首页树接口
		getBannerData(){
			let param={
				startTime:this.choiceDate[0].re,
				endTime:this.choiceDate[1].re
			}
			this.$Request.getT('/mms/wx/v1/rooms/roomsList',param).then(res => {
				if(res.code==200){
					
					// this.attrs=attrs
					this.totlist=res.data	
				}
				
			})
		},
		//补0
		pad(num, n) {
			return Array(n - ('' + num).length + 1).join(0) + num;
		},
		init() {
			// console.log(this.startDate, this.endDate);

			//#ifndef H5
			// 弹出层动画创建
			this.animation = uni.createAnimation({
				duration: 400, // 整个动画过程花费的时间，单位为毫秒
				timingFunction: 'ease', // 动画的类型
				delay: 0 // 动画延迟参数
			});
			//#endif

			this.dateData();

			if (this.modal) {
				//如果是弹窗模式，那么初始时就派发change事件
				this.$emit('change', {
					choiceDate: this.choiceDate,
					dayCount: this.dayCount
				});
			}
		},
		getDayType(data) {
			return data.re != this.today && data.re != this.tomorrow && data.re != this.afterTomorrow ? data.act.subject : '';
		},
		getDayName(year, data) {
			let name = data.day;
			let yearData = this.holidayList['y' + year] || {};
			let holidayName = yearData['holidayName'] || "";
			var monthAndDay = data.month + '' + data.day;
			if (holidayName[monthAndDay]) {
				name = holidayName[monthAndDay];
			} else if (data.re == this.today) {
				name = '今天';
			} else if (data.re == this.tomorrow) {
				name = '明天';
			} else if (data.re == this.afterTomorrow) {
				name = '后天';
			}
			return name;
		},
		isHoliday(year, day) {
			//判断是否为法定节假日
			let yearData = this.holidayList['y' + year];
			let result = false;
			if (yearData) {
				let holiday = yearData['holiday'];
				result = holiday[day];
			}
			return result ? '假' : '';
		},
		isWorkday(year, day) {
			//判断是否要补班
			let yearData = this.holidayList['y' + year];
			let result = false;
			if (yearData) {
				let workday = yearData['workday'];
				result = workday[day];
			}
			return result ? '班' : '';
		},
		getLayerTop: function() {
			return new Promise(resolve => {
				//获取layer-list窗器的top
				let view2 = uni.createSelectorQuery().select('.layer-list');
				view2
					.boundingClientRect(data => {
						resolve(data.top);
					})
					.exec();
			});
		},
		getMonthTitleRectList: function() {
			return new Promise(resolve => {
				//获取每个月的文字头的top
				let view = uni.createSelectorQuery().selectAll('.month-title');
				view.boundingClientRect(data => {
					resolve(data);
				}).exec();
			});
		},
		getRectList: async function() {
			if (!this.layerTop || this.layerTop < 0) this.layerTop = await this.getLayerTop();
			var isInitRectData = true;
			if (this.monthTitleRectList && this.monthTitleRectList.length > 0) {
				if (this.monthTitleRectList[0].top == 0) {
					this.monthTitleRectList = await this.getMonthTitleRectList();
					isInitRectData = false;
				}
			} else {
				isInitRectData = false;
			}
			if (isInitRectData == false) this.monthTitleRectList = await this.getMonthTitleRectList();
		},
		showCalendar: function() {
			//存储未更新前的数据
			this.bak_date = JSON.parse(JSON.stringify(this.date));
			this.bak_weeks = JSON.parse(JSON.stringify(this.weeks));
			this.bak_choiceDate = JSON.parse(JSON.stringify(this.choiceDate));
			this.bak_choiceDateArr = JSON.parse(JSON.stringify(this.choiceDateArr));
			this.bak_dayCount = this.dayCount;

			///////////////////非非非h5平台适配//////////////////
			//#ifndef H5
			// 设置动画内容为：使用绝对定位显示区域，高度变为100%
			this.animation
				.bottom('0px')
				.height('100%')
				.step();
			this.animationData = this.animation.export();
			this.isShow_NoH5 = true;
			//#endif

			///////////////////h5平台适配//////////////////
			//#ifdef H5
			this.isShow_H5 = true;
			//#endif
		},
		hideCalendar: function(isBtnClick) {
			///////////////////非非非h5平台适配//////////////////
			//#ifndef H5
			// 设置动画内容为：使用绝对定位隐藏整个区域，高度变为0
			this.animation
				.bottom('-100%')
				.height('0upx')
				.step();
			this.animationData = this.animation.export();
			this.isShow_NoH5 = false;
			//#endif

			///////////////////h5平台适配//////////////////
			//#ifdef H5
			this.isShow_H5 = false;
			//#endif

			//SubmitisBtnClick判断是否为按钮点击
			if (isBtnClick) return;

			//非按钮点击则重置已选择的
			this.dateFlag = {};
			// this.choice = '';
			this.dayCount = this.bak_dayCount;
			this.dayCount2 =  this.dayCount;
			//
			this.date = JSON.parse(JSON.stringify(this.bak_date));
			this.weeks = JSON.parse(JSON.stringify(this.bak_weeks));
			this.choiceDate = JSON.parse(JSON.stringify(this.bak_choiceDate));
			this.choiceDateArr = JSON.parse(JSON.stringify(this.bak_choiceDateArr));
			// console.log('h 4');
		},
		setData: function(obj) {
			let that = this;
			let keys = [];
			let val, data;
			Object.keys(obj).forEach(function(key) {
				keys = key.split('.');
				val = obj[key];
				data = that.$data;
				keys.forEach(function(key2, index) {
					if (index + 1 == keys.length) {
						that.$set(data, key2, val);
					} else {
						if (!data[key2]) {
							that.$set(data, key2, {});
						}
					}
					data = data[key2];
				});
			});
		},
		onScroll: function(e) {
			//////暂时还有问题，效率也不太好，等后缀再优化
			//<scroll-view class='layer-list' scroll-y="true" @scroll="onScroll">
			//<view v-for="(monthData,index) in date" :key="index" class="month" :class="fixedId == ('m-' + monthData[0].year + '-' + monthData[0].month) ? 'fixed' : ''">
			//
			// this.getRectList();
			//
			// let scorllTop = e.detail.scrollTop;
			// this.curScrollTop = scorllTop + this.layerTop;
			//
			// ///////////////////////////////////////////
			// this.monthTitleRectList.forEach((item, i) => {
			// 	if (this.curScrollTop > item.top - 70) {
			// 		this.fixedId = item.id;
			// 		///////////这里理应需要 节流 和 return，后面再处理/////////////
			// 	}
			// });
		},
		dateData: function() {
			let dataAll = []; //总日历数据
			let dataAll2 = []; //总日历数据
			let dataMonth = []; //月日历数据
			let date = new Date(); //当前日期
			let getDateTime = date.getTime();
			let year = date.getFullYear(); //当前年
			let week = date.getDay(); //当天星期几
			let weeks = [];
			let month = date.getMonth() + 1; //当前月份
			let day = date.getDate(); //当天
			let daysCount = Math.min(this.daysCount, 60); //一共显示多少天
			daysCount = Math.min(this.daysCount, 360); //最小60天，最大360天
			daysCount += day;
			let dayscNow = 0; //计数器
			let monthList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]; //月份列表
			let nowMonthList = []; //本年剩余年份
			this.today = '' + year + '-' + this.pad(month, 2) + '-' + this.pad(day, 2);
			this.tomorrow = '' + year + '-' + this.pad(month, 2) + '-' + this.pad(day + 1, 2);
			this.afterTomorrow = '' + year + '-' + this.pad(month, 2) + '-' + this.pad(day + 2, 2);

			///////////////配置初始日期/////////////////
			//ios上不支持-连接的日期时间，所以需要替换-为/
			let startDate = this.startDate;
			let endDate = this.endDate;
			if (startDate) {
				startDate = new Date(startDate.split('-').join('/'));
				//如果起始时间小于当前时间，那么，超始时间就是当前时间，这里也不考虑分秒，所以这里简单处理。
				if (startDate.getTime() < getDateTime) startDate = new Date();
			} else {
				startDate = new Date();
			}

			if (endDate) {
				endDate = new Date(this.endDate.split('-').join('/'));
				if (endDate.getTime() < getDateTime) endDate = new Date(startDate.getTime() + 24 * 3600 * 1000);
			} else {
				endDate = new Date(startDate.getTime() + 24 * 3600 * 1000);
			}

			//判断开始时间是否大于结束时间，大于则互换
			if (startDate.getTime() > endDate.getTime()) [startDate, endDate] = [endDate, startDate];

			let maxDate = new Date(getDateTime + daysCount * 24 * 3600 * 1000);
			if (endDate.getTime() > maxDate.getTime()) {
				let millisecond = endDate.getTime() - maxDate.getTime();
				//如果结束时间大于
				daysCount += parseInt(millisecond / (24 * 3600 * 1000)) + 7;
				console.log('这里需要显示的天数', daysCount);
			}
			///////////////配置初始日期/////////////////

			for (let i = month; i < 13; i++) {
				nowMonthList.push(i);
			}
			let yearList = [year]; //年份最大可能
			for (let i = 0; i < daysCount / 365 + 2; i++) {
				yearList.push(year + i + 1);
			}
			let leapYear = function(Year) {
				//判断是否闰年
				if ((Year % 4 == 0 && Year % 100 != 0) || Year % 400 == 0) {
					return true;
				} else {
					return false;
				}
			};
			for (let i = 0; i < yearList.length; i++) {
				//遍历年
				let mList;
				if (yearList[i] == year) {
					//判断当前年份
					mList = nowMonthList;
				} else {
					mList = monthList;
				}
				for (let j = 0; j < mList.length; j++) {
					//循环月份
					dataMonth = [];
					let t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
					let t_days_thisYear = [];
					if (yearList[i] == year) {
						for (let m = 0; m < nowMonthList.length; m++) {
							t_days_thisYear.push(t_days[mList[m] - 1]);
						}
						t_days = t_days_thisYear;
					} else {
						t_days = [31, 28 + leapYear(yearList[i]), 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
					}

					for (let k = 0; k < t_days[j]; k++) {
						//循环每天
						dayscNow++;
						let nowData;
						if (dayscNow < daysCount) {
							//如果计数器没满
							let days = this.pad(k + 1, 2);

							var monthAndDay = this.pad(mList[j], 2) + '' + days;

							var subject = this.festival[monthAndDay];
							var subject = this.isHoliday(yearList[i], monthAndDay) || this.isWorkday(yearList[i], monthAndDay) || '';

							var none = false;
							let newDateFormate = new Date(yearList[i] + '/' + mList[j] + '/' + (k + 1));
							let thisDateTime = newDateFormate.getTime();
							var selected = 0;
							if (yearList[i] == year && mList[j] == month) {
								//判断当年当月
								// if (k + 1 >= day) {
								// if (k + 1 == day) {
								if (k == 0) {
									let date = new Date(yearList[i] + '/' + mList[j] + '/' + (k + 1));
									let weekss = date.getDay(); //获取每个月第一天是周几
									weeks.push(weekss);
								}
								nowData = {
									year: yearList[i],
									month: this.pad(mList[j], 2),
									act: {
										subject: subject ? subject : '',
										none,
										tip: '',
										defaultStr: 0
									},
									day: this.pad(k + 1, 2),
									date: yearList[i] + '' + this.pad(mList[j], 2) + days,
									selected,
									re: yearList[i] + '-' + this.pad(mList[j], 2) + '-' + days,
									dateTime: thisDateTime,
									week: this.getWeek(weeks, month, year, yearList[i], mList[j], k + 1)
								};
								dataMonth.push(nowData);
								// }
							} else {
								if (k == 0) {
									let date = new Date(yearList[i] + '/' + mList[j] + '/' + (k + 1));
									let weekss = date.getDay(); //获取每个月第一天是周几
									weeks.push(weekss);
								}
								//其他情况
								nowData = {
									year: yearList[i],
									month: this.pad(mList[j], 2),
									act: {
										subject: subject ? subject : '',
										none,
										tip: '',
										defaultStr: 0
									},
									day: this.pad(k + 1, 2),
									date: yearList[i] + '' + this.pad(mList[j], 2) + days,
									selected,
									re: yearList[i] + '-' + this.pad(mList[j], 2) + '-' + days,
									dateTime: thisDateTime,
									week: this.getWeek(weeks, month, year, yearList[i], mList[j], k + 1)
								};
								dataMonth.push(nowData);
							}
						} else {
							break;
						}
					}
					dataAll.push(dataMonth);
				}
			}
			for (let i = 0; i < dataAll.length; i++) {
				if (dataAll[i].length != 0) {
					dataAll2.push(dataAll[i]);
				}
			}

			//
			let start_year = startDate.getFullYear();
			let start_month = startDate.getMonth() + 1;
			let start_day = startDate.getDate();
			//
			let end_year = endDate.getFullYear();
			let end_month = endDate.getMonth() + 1;
			let end_day = endDate.getDate();

			//当前选中的起始时间坐标
			let startIndex1 = start_year == year ? start_month - month : start_month + (12 - month);
			let startIndex2 = start_day - 1;

			//当前选中的结束时间坐标
			let endIndex1 = end_year == year ? end_month - month : end_month + (12 - month);
			let endIndex2 = end_day - 1;
			//
			dataAll2[startIndex1][startIndex2].selected = 1;
			dataAll2[startIndex1][startIndex2].act.tip = '入住';
			dataAll2[startIndex1][startIndex2].act.defaultStr = 1;
			this.choiceDate.push(dataAll2[startIndex1][startIndex2]);

			let islastDay = false; //是否为一个月最后一天，且结束日期是下月第一天
			if (startIndex1 == endIndex1 && endIndex2 - startIndex2 == 1) {
				if (dataAll2[startIndex1][startIndex2 + 1]) {
					dataAll2[startIndex1][startIndex2 + 1].selected = 1;
					dataAll2[startIndex1][startIndex2 + 1].act.tip = '离店';
					dataAll2[startIndex1][startIndex2 + 1].act.defaultStr = 1;
					this.choiceDate.push(dataAll2[startIndex1][startIndex2 + 1]);
				} else {
					islastDay = true;
				}
			} else {
				islastDay = true;
			}

			if (islastDay) {
				dataAll2[endIndex1][endIndex2].selected = 1;
				dataAll2[endIndex1][endIndex2].act.tip = '离店';
				dataAll2[endIndex1][endIndex2].act.defaultStr = 1;
				this.choiceDate.push(dataAll2[endIndex1][endIndex2]);
			}

			//选择日期 //nextTick()居然app和其他平台表现不一，换回setTimeout
			setTimeout(() => {
				this.selectday(startIndex1, startIndex2);
				this.selectday(endIndex1, endIndex2);
			});

			// console.log(dataAll2, weeks, this.today, this.tomorrow, this.afterTomorrow, this.choiceDate);
			this.date = dataAll2;
			this.weeks = weeks;
			this.choiceDate = this.choiceDate;
			this.choiceDateArr = this.choiceDate;
			// console.log(this.choiceDate);
		},
		getWeek(weeks, firstMonth, thisYear, curYear, curMonth, day) {
			/**
			 * 获取周几
			 * weeks 每个月第一天周几
			 * firstMonth 当前第一个月是哪个月
			 * thisYear 今年的年份
			 * curYear 当前要取的是哪一年
			 * curMonth 当前要取的是哪个月
			 * day 要取哪一天的星期
			 */
			//注：这里取的是每月第一天的星期几，但是因为现在只从今天展示，所以第一个月的第一天的星期几是今天的星期几，而不会是1号的星期天。

			//搞定不是本年的月份的星期的问题
			let monthIndex = 0;
			if (curYear > thisYear) {
				monthIndex = (curYear - thisYear) * 12 + curMonth - firstMonth;
			} else {
				monthIndex = curMonth - firstMonth;
			}

			let firstDayWeek = weeks[monthIndex];
			let key = curYear + '-' + curMonth;
			if (!this.tmpWeekArr[key]) {
				let tmpArr = [];
				for (let i = firstDayWeek; i < this.weekNameArr.length; i++) {
					tmpArr.push(this.weekNameArr[i]);
				}
				tmpArr = [...tmpArr, ...this.weekNameArr];
				//缓存一下，就不必每次再取了
				this.tmpWeekArr[key] = tmpArr;
			}
			let index = day % 7 || 7;
			// if (curMonth == firstMonth) {
			// 	index += firstDayWeek + 1;
			// } else {
			index--;
			// }
			return this.tmpWeekArr[key][index];
		},
		dayClick: function(e) {
			let indexs = e.currentTarget.dataset.indexs;
			let index = e.currentTarget.dataset.index;
			// console.log('selectday ', indexs, index);
			this.selectday(index, indexs, true);
		},
		selectday: function(index, indexs, isUserClick) {
			// console.log("001", this.dateFlag, isUserClick)
			//单个日期
			if (this.singleDate) {
				if (!isUserClick && JSON.stringify(this.dateFlag) != '{}') {
					return;
				}
				this.dateFlag = {};
			}
			// console.log("002", indexs)
			if (indexs == -1) {
				return;
			}
			let curDate = this.date[index][indexs];
			if (curDate.re < this.today) {
				//如果是用户点击今天之前的日期的话，就返回
				if (isUserClick) return;
			}
			// console.log("003", indexs)

			curDate.selected = 1;
			curDate.act.tip = '入住';
			if (this.dateFlag.date && curDate.dateTime < this.dateFlag.date.dateTime) {
				console.log('004');
				var flagIndex = this.dateFlag.index;
				var flagIndexs = this.dateFlag.indexs;
				this.date[flagIndex][flagIndexs].selected = 0;
				this.date[flagIndex][flagIndexs].act.tip = '';
				this.dateFlag = {
					date: curDate,
					index: index,
					indexs: indexs
				};
				this.choice = false;
				this.dayCount = 1;
				//
				this.choiceDate[0] = curDate;
			} else if (this.dateFlag && this.dateFlag.date) {
				// console.log("005")
				if (this.dateFlag.index == index && this.dateFlag.indexs == indexs) {
					return;
				}
				curDate.act.tip = '离店';
				//
				// console.log("00555555")
				//
				var that = this;
				var dateFlagDateTime = that.dateFlag.date.dateTime;
				var choiceDateTime = that.date[index][indexs].dateTime;
				that.choiceDateArr = [];
				that.choiceDateArr.push(that.dateFlag.date);
				var nonFlag = false;
				var nonArr = [];
				var count = 0;
				this.date.forEach(function(dataItems) {
					dataItems.forEach(function(dataItem) {
						if (dataItem.dateTime > dateFlagDateTime && dataItem.dateTime < choiceDateTime) {
							if (dataItem.act.none) {
								nonFlag = true;
								nonArr.push(dataItem.day);
							}
							that.choiceDateArr.push(dataItem);
							dataItem.selected = 1;
							count++;
						}
					});
				});
				that.choiceDateArr.push(that.date[index][indexs]);
				//设置开始和结果两个日期
				this.choiceDate[0] = that.choiceDateArr[0];

				this.choiceDate[1] = that.choiceDateArr[that.choiceDateArr.length - 1];
				//
				if (nonFlag) {
					var that = this;
					this.date.forEach(function(dataItems) {
						dataItems.forEach(function(dataItem) {
							if (dataItem.dateTime != choiceDateTime) {
								dataItem.act.tip = '';
								dataItem.selected = 0;
							} else {
								dataItem.act.tip = '入住';
							}
						});
					});
					this.dateFlag = {
						date: that.date[index][indexs],
						index: index,
						indexs: indexs
					};
					this.choiceDate[0] = that.date[index][indexs];
					this.dayCount = 1;
					var nonstr = '';
					nonArr.forEach(function(nonitem, index) {
						if (index != nonArr.length - 1) {
							nonstr = nonstr + nonitem + '号,';
						} else {
							nonstr = nonstr + nonitem + '号';
						}
					});
					uni.showModal({
						title: '提示',
						content: `${nonstr}无房`
					});
				} else {
					this.dateFlag = {};
					this.choice = true;
					// console.log('count', count);
					this.dayCount = count + 1;
					this.dayCount2 =(count + 1);
				}
			} else {
				// console.log("006")
				var that = this;
				this.date.forEach(function(dataItems) {
					dataItems.forEach(function(dataItem) {
						dataItem.act.defaultStr = 0;
						if (dataItem.dateTime != that.date[index][indexs].dateTime) {
							dataItem.selected = 0;
							dataItem.act.tip = '';
						} else {
							dataItem.act.tip = '入住';
						}
					});
				});
				this.dateFlag = {
					date: curDate,
					index: index,
					indexs: indexs
				};
				this.choice = false;
				this.dayCount = 1;
				//
				this.choiceDate[0] = curDate;
				// console.log("this.choice ", this.choice)
			}
		},
		submitbtn: function() {
			this.choiceDate[0] = this.choiceDateArr[0];
			this.choiceDate[1] = this.choiceDateArr[this.choiceDateArr.length - 1];
			this.dayCount2 = this.dayCount;
			this.hideCalendar(true);
			/**派发事件
			 * 参数：
			 * 1.choiceDate 时间区间（开始时间和结束时间）
			 * 2.dayCount 共多少晚
			 */
			console.log('this.choiceDateArr',this.choiceDateArr)
			console.log('this.choiceDate[0]',this.choiceDate)
			// this.$emit('change', {
			// 	choiceDate: this.singleDate ? this.choiceDate[0] : this.choiceDate, //如果是单个日期方式，则只导出数组第一个
			// 	dayCount: this.dayCount
			// });
		}
	}
};
</script>

<style lang="scss" scoped>
	.lists {
	    width: 100%;
	    margin: 0 auto;
	    padding: 1% 2vw 0;
	    // background: url("../../static/image/content_top.png") no-repeat top center;
	    // background-size: contain;
	    // margin-top: -0.3rem;
	}
	/* 客房住宿 */
	.list-item3 {width: 100%;height: 73vw;overflow: hidden;background-color: #d8a451; position: relative;margin-bottom: 0.7rem;
	}
	// .list-item3::before {content: ""; width: 0.5rem;height: 2px;background-color: #fff7eb;position: absolute;right: 6vw; top: 4.3vw;visibility: visible;}
	.img-part {height: 100%;width: 55.6vw;overflow: hidden;}
	.img-part img {height: 100%; min-width: 100%;}
	
	.word-part {
	    width: 50vw;
	    height: 52.3vw;
	    position: absolute;
	    top: 10.35vw;
	    background-color: rgba(255, 247, 235, 0.9);
	    left: 29vw;
	    color: #000;
	    line-height: 1rem;}
	.room-title1{font-size: 14px; color: #000;}
	.w-p-line {
	    position: absolute;
	    width: 2rem;
	    height: 2px;
	    background-color: #bd8142;
	    top: 0.6rem;
	    left: -1rem;
	}
	.w-p-line::before {
	    width: 50%;
	    height: 100%;
	    content: "";
	    position: absolute;
	    left: 0;
	    top: 0;
	    background-color: #e73828;
	}
	.w-p-line2 {
	    position: absolute;
	    width: 1.2rem;
	    height: 2px;
	    background-color: #fff7eb;
	    bottom: 0.8rem;
	    right: -0.6rem;
	}
	.w-p-line2::before {width: 50%;height: 100%;content: "";position: absolute;left: 0;top: 0;background-color: #bd8142;}
	.word-p-title {font-size: 16px;position: relative;line-height: 1.2rem;margin-bottom: 6%;padding: 3% 0;}
	.word-p-title::after {content: "";position: absolute;width: 0.8rem;height: 2px;background-color: #e73828;left: 0;bottom: -0.3rem}
	.word-p-btn {font-size: 12px;color: #bd8142;text-align: center;height: 24px;line-height: 24px;border: 1px solid #bd8142;border-radius: 1.2rem;display: block;width: 80px;margin-top: 8%;}
	.tel-part {position: absolute;right: 4.6vw;color: #ffffff;top: 8vw;width: 1rem;overflow: visible;font-size: 0.5rem;transform: scale(0.8);-webkit-transform: scale(0.8);}
	.tel-part::before,
	.tel-part::after {content: "";position: absolute;width: 1.2rem;height: 1rem;background: url("../../static/image/word-bird.png") no-repeat left top;background-size: 280% auto;left: -0.8rem;top: -1rem;}
	.tel-part::after {background-position: right bottom;left: 1rem;top: 7rem;}
	.tel-part p:nth-child(1) {width: 0.9rem;text-align: center;word-break: break-word;}
	.tel-part p:nth-child(2) {height: 0.9rem;text-align: left;line-height: 0.9rem;white-space: nowrap;margin-top:-0.7rem;transform-origin: left 0.9rem;transform: rotate(90deg);-webkit-transform: rotate(90deg);-moz-transform: rotate(90deg);-ms-transform: rotate(90deg);-o-transform: rotate(90deg);
	}
	.list-item3:nth-child(3n+2),.address-lists .list-item3{
	    background-color: #002c43;
	}
	.list-item3:nth-child(3n) {
	    background-color: #615247;
	}
	
	.list-item3:nth-child(even)::before,
	.address-lists .list-item3::before {
	    right: auto;
	    left: 6.2vw;
	}
	
	.list-item3:nth-child(even) .img-part,.list-item4:nth-child(even) .img-part,.address-lists .list-item3 .img-part {
	    float: right;
	}
	.list-item3:nth-child(even) .word-part,.address-lists .list-item3 .word-part{
	    left: auto;
	    right:29vw;
	}
	.list-item3:nth-child(even) .w-p-line,.list-item4:nth-child(even) .w-p-line,.address-lists .list-item3 .w-p-line {
	    left: auto;
	    right: -1rem;
	}
	.list-item3:nth-child(even) .w-p-line::before,.list-item4:nth-child(even) .w-p-line::before,.address-lists .list-item3 .w-p-line::before{
	    left: auto;
	    right: 0;
	}
	.list-item3:nth-child(even) .w-p-line2,.address-lists .list-item3 .w-p-line2 {
	    right: auto;
	    left: -0.6rem;
	}
	.list-item3:nth-child(even) .w-p-line2::before,.address-lists .list-item3 .w-p-line2::before{
	    left: auto;
	    right: 0;
	}
	.list-item3:nth-child(even) .tel-part,.address-lists .list-item3 .tel-part{
	    left: 4.6vw;
	    right: auto;
	}
	.clearfix:after, .clearfix:before {content: "";  display: block;  height: 0;  clear: both;  visibility: hidden;}
	.flex{display: -webkit-box; display: -ms-flexbox; display: -webkit-flex; display: flex;}
	.her-center{-webkit-box-pack: center; -ms-flex-pack: center; -webkit-justify-content: center; justify-content: center; }
	.ver-center{ -webkit-box-align: center; -ms-flex-align: center; -webkit-align-items: center; align-items: center; }
	.content-title {
	    width: 21vw;
	    margin: 7% auto 0%;
	    position: relative;
	}
	.content-title img {
	    display: block;
		width: 68px;
		height: 27px;
	    margin: 0 auto;
	}
	.content-title::before,
	.content-title::after {
	    content: "";
	    position: absolute;
	    width: 4.67vw;
	    height: 2.7vw;
	}
	.content-title::before {
	    background: url("../../static/image/title-bird1.png") no-repeat left top;
	    background-size: contain;
	    left: -4.6vw;
	    top: 0;
	}
	.content-title::after {
	    background: url("../../static/image/title-bird2.png") no-repeat right bottom;
	    background-size: contain;
	    bottom: -2.7vw;
	    right: -6vw;
	}
	
	page{
		height: 100%;
		// background-color: #ccc;
	}
	.content{
		height: 100%;
		// background-color: #f1f1f1;
	}
	.sjx_lca{
		width: 0;
		height: 0;
		border-bottom: 10px solid #fff;
		border-left: 10px solid transparent;
		position: absolute;
		bottom: 40%;
		right: 30%;
	}
/*
* 主题颜色请修改这里
* 
* */
$themeColor: #f93f4a;

/**
 * 补班的日子的文字颜色
 */
$workdayColor: #0c978d;

/*  #ifndef  H5  */
view {
	// display: flex;
}

/*  #endif  */

/*  #ifdef  H5  */
uni-view {
	// display: flex;
}

/*  #endif  */
.flebox{
	display: flex;
}
.layer-white-space {
	position: fixed;
	height: 100%;
	width: 100%;
	background-color: #ccc;
	opacity: 0.5;
}

.layer-header {
	height: 70upx;
	align-items: center;
	position: relative;
	margin: 4% 0;
	display: flex;
	.layer-close {
		width: 34upx;
		height: 34upx;
		position: absolute;

		left: 25upx;
		top: 50%;
		transform: translateY(-50%);

		//
		&::before {
			content: '';
			width: 34upx;
			height: 1upx;
			background-color: $themeColor;
			position: absolute;
			top: 16upx;
			left: 0;
			transform: rotate(45deg);
		}

		&::after {
			content: '';
			width: 1upx;
			height: 34upx;
			background-color: $themeColor;
			position: absolute;
			top: 0;
			left: 16upx;
			transform: rotate(45deg);
		}
	}

	.layer-title {
		text-align: center;
		flex: 1;
		font-size: 36upx;
	}
}

.calendar-layer {
	position: fixed;
	bottom: -100%;
	left: 0;
	height: 0;
	width: 100%;
	overflow: hidden;
	z-index: 1111;

	/*  #ifdef  H5  */
	//h5使用css3动画
	&.show {
		bottom: 0;
		height: 100%;
		transition: bottom 0.4s;
	}

	//h5使用css3动画
	&.hide {
		bottom: -100%;
		height: 100%;
		transition: bottom 0.4s;
	}

	/*  #endif  */
}

.layer-content {
	position: absolute;
	height: 85%;
	bottom: 0;
	font-size: 26upx;
	flex-direction: column;
	background-color: #fff;
	padding-bottom: 9%;
}

.layer-body {
	flex-direction: column;
	height: calc(100% - 70upx);
	    display: flex;
}

.layer-list {
	// position: absolute;
	// height:300upx;
	width: 100%;
	height: 100%;
	// bottom: 0upx;
	display: flex;
	flex: 1;
	flex-direction: column;
	position: relative;
}

.layer-footer {
	width: 100%;
	height: 120upx;
	align-items: center;
	justify-items: center;
	display: none;
	z-index: 11;
	margin-top: 4%;
}

.layer-content.choiceDate {
	.layer-footer {
		display: block;
	}

	.layer-body {
		height: calc(100% - 70upx - 120upx);
		    display: flex;
	}
}

.submitBtn {
	height: 80upx;
	line-height: 80upx;
	color: #fff;
	border-radius: 10upx;
	margin: 20upx 50upx;
	justify-content: center;
	font-size: 32upx;
	// background: linear-gradient(to right, #f5504f, #f43f4f);
	background: $themeColor;
	&:active {
		transform: scale(0.98, 0.98);
	}
}

.month {
	width: 750upx;
	flex-direction: column;
	margin-bottom: 50upx;

	.month-title {
		font-size: 30upx;
		text-align: center;
		width: 100%;
		height: 60upx;
		line-height: 60upx;
		justify-content: center;
		border-bottom: 1upx solid #ddd;
		background: #fff;
	}

	&.fixed {
		.month-title {
			position: fixed;
			top: calc(15% + 70upx + 60upx);
			z-index: 11;
		}

		&:first-child {
			padding-top: 60upx;
		}
	}

	// 		&:first-child {
	// 			.month-title {
	// 				border: 0;
	// 			}
	// 		}
	&:last-child {
		margin-bottom: 0;
	}

	.month-content {
		flex-wrap: wrap;
	}
}

.day {
	width: calc(100% / 7);
	text-align: center;
	height: 90upx;
	align-items: center;
	justify-content: center;
	position: relative;

	.day-content {
		flex-direction: column;
		line-height: 1;
	}

	.day-txt {
		width: 100%;
		height: 1.2em;
	}

	.day-tip {
		// margin-top: 5upx;
		font-size: 20upx;
		height: 1.2em;
	}

	.day-subject {
		// margin-top: 5upx;
		font-size: 14upx;
		height: 1.2em;
		&.workday {
			color: $workdayColor;
		}
		&.holiday {
			color: $themeColor;
		}
	}

	&.disabled {
		color: #ccc;
	}

	&.active {
		background: rgba($themeColor, 0.1);
	}

	.beginTip {
		display: none;
		//////////////////////////////
		/*  #ifndef  H5  */
		width: 115upx;
		margin-top: -70upx;
		/*  #endif  */
		//////////////////////////////
		/*  #ifdef  H5  */
		width: 130upx;
		margin-top: -74upx;
		/*  #endif  */
		//////////////////////////////
		position: absolute;
		background: rgba(0, 0, 0, 0.6);
		border-radius: 5upx;
		text-align: center;
		padding: 6upx 10upx;
		font-size: 16upx;
		z-index: 33;

		&::after {
			content: '';
			position: absolute;
			/*  #ifndef  H5  */
			left: 35%;
			top: 28upx;
			border: 5upx solid transparent;
			border-top: 6upx solid rgba($color: #000000, $alpha: 0.6);
			/*  #endif  */

			/*  #ifdef  H5  */
			left: 35%;
			top: 37upx;
			border: 8upx solid transparent;
			border-top: 10upx solid rgba($color: #000000, $alpha: 0.6);
			/*  #endif  */
		}
	}

	.endTip {
		display: none;
		background: rgba($color: #000000, $alpha: 0.6);
		position: absolute;
		border-radius: 5upx;
		text-align: center;
		padding: 6upx 10upx;
		// min-width: 70upx;
		//////////////////////////////
		/*  #ifndef  H5  */
		margin-top: -70upx;
		/*  #endif  */
		//////////////////////////////
		/*  #ifdef  H5  */
		margin-top: -74upx;
		/*  #endif  */
		//////////////////////////////
		font-size: 16upx;
		left: 12%;
		z-index: 33;

		&::after {
			content: '';
			position: absolute;

			/*  #ifndef  H5  */
			left: 35%;
			top: 28upx;
			border: 5upx solid transparent;
			border-top: 6upx solid rgba($color: #000000, $alpha: 0.6);
			/*  #endif  */

			/*  #ifdef  H5  */
			left: 35%;
			top: 37upx;
			border: 8upx solid transparent;
			border-top: 10upx solid rgba($color: #000000, $alpha: 0.6);
			/*  #endif  */
		}
	}

	&.begin,
	&.end {
		background: $themeColor;
		color: #fff;
	}

	&.begin {
		border-radius: 8upx 0 0 8upx;

		.beginTip {
			display: block;
		}
	}

	&.end {
		border-radius: 0 8upx 8upx 0;

		.endTip {
			display: block;
		}
	}
}

/* ///////////////////////////////////////// */
.week-box {
	height: 60upx;
	line-height: 60upx;
	border-bottom: 1upx solid #ddd;
	background: #fff;
	position: relative;
	z-index: 11;
	
}

.week-box-item {
	width: calc(100% / 7);
	text-align: center;

	&:first-child,
	&:last-child {
		color: $themeColor;
	}
}

/* ///////////////////order-time////////////////////// */
.order-time {
	position: relative;
	width: 100%;
	padding: 25upx 15upx;
}

.time-viewer {
	align-items: center;
	margin: auto;
	padding: 3% 5%;
	border-radius: 15rpx;
	background-color: #fff;
}

.order-time::after {
	position: absolute;
	content: '';
	width: 100%;
	bottom: 0;
	left: 0;
	border-top: 1upx solid #eee;
	transform-origin: 0 100%;
	transform: scaleY(0.5);
}

.goInHotel {
	margin-left: 20upx;
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

.order-time .sumCount {
	color: #6495ed;
	float: right;
	margin-right: 15upx;
	font-size: 26upx;
}
</style>
