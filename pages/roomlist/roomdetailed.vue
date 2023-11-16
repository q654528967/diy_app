<template>
	<view >
		<div class="content">
		    <div class="second-title">
		        <span>{{roomName}}</span>
				<view style="height: 60upx;margin-bottom: 5%;" class="">
					<image style="width: 100%;height: 100%;" src="../../static/image/content_top.png" mode=""></image>
				</view>
		    </div>
		    <div class="lists">
		        <view class="carousel-section">
		        	<!-- 背景色区域 -->
		        	<swiper class="carousel" circular :autoplay="autoplay" :interval="interval" :duration="duration" :indicator-dots='indicatorDots'>
		        		<swiper-item v-for="(item, index) in carouselList" :key="index" class="carousel-item">
		        			<image :src="item" />
		        		</swiper-item>
		        	</swiper>
		        </view>
		        <div class="room-detail-word">
		            <p class="r-detail-title">房间设施</p>
		            <!-- <p  class="r-detail-facs"> -->
					<view :class=" isShow ? 'on tl-card' : 'tl-card'">
						<view style="padding-top: 2%;" v-for="(item, index) in attrs" :key="index" class="">
							{{item.value}}
						</view>
						<!-- 保险箱<br>
						平板电视<br>
						写字台<br>
						允许使用婴儿床<br>
						化妆室<br> -->
					</view>
					<view class="tl-mgs" v-if="!isShow" @tap="toChange">
						<view style="width: 40rpx;height: 40rpx;margin-right: 3%;"><image src="../../static/image/arro-bot.png" class="tl-img-16"></image></view>
						<view>展开 </view>
						
					</view>
					<view class="tl-mgs" v-if="isShow" @tap="toChange">
						<view style="width: 40rpx;height: 40rpx;margin-right: 3%;"><image src="../../static/image/arro-top.png" class="tl-img-16"></image></view>
						<view>收起 </view>
						
					</view>
					<!-- <p v-for="(item, index) in attrs" :key="index" class="r-detail-facs"> 
						{{item.value}}
					</p> -->
						
					<!-- {{item.value}}<br>
		               <!-- 房间内咖啡/茶煮制设备 <br>
		                保险箱<br>
		                平板电视<br>
		                写字台<br>
		                允许使用婴儿床<br>
		                化妆室<br>
		                浴室:浴缸<br> -->
		              <!--  浴室:淋浴<br>
		                加床: 允许增加一张庆<br>
		                风景: 城市<br>
		                大小: 40 m2 (431 ft2) - 50 m2 (538 ft2)<br>
		                客房面积：40㎡ 客房床宽：1.8m<br>
		                楼层：18号楼3-17层<br> -->
		            <!-- </p> -->
		           <!-- <span @click='shoulick' class="r-d-slide flex ver-center her-stretch">
		                <img src="../../static/image/room-arrow.png" alt="">
		                <span>收起</span>
		            </span> -->
		            <div class="r-d-btns flex ver-center">
		                <div>
		                    <p >{{cost}}</p>
		                    <p>CNY</p>
		                </div>
						<a v-if="type==1" href="javascript:;" @click='oncemore' class="word-p-btn">再次预定</a>
		                <a v-else href="javascript:;" @click='booknow' class="word-p-btn">立即预定</a>
						
		            </div>
		        </div>
				<view class="u-content">
					<u-parse :html="content"></u-parse>
				</view>
		    </div>
		</div>
	</view>
</template>

<script>
	 // import $ from '../../subpack_page/components/js/jquery-3.5.1.min.js'  
	export default {
		data() {
			return {
				type:0,
				content:'',
				choiceDate:[],
				choiceArr:[],
				choiceDateArr:[],
				dayCount:0,
				roomsId:null,
				cost:0.00,
				isShow:false,
				arrtser:'',
				attrs:[],
				roomName:'',
				carouselList:[],
				// autoplay: true,
				indicatorDots:true,
				interval: 3000,
				duration: 500,
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
			if(options.dayCount){
				this.dayCount = options.dayCount
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
			if(options.type){
				this.type=options.type
				
			}
		},
		onShow() {
			// this.getshop()
		},
		methods: {
			oncemore(){
				uni.navigateTo({
					url: `/pages/roomlist/index`
				});
			},
			//立即预定
			booknow(){
				let roomsId=this.roomsId
				let choiceDate = encodeURIComponent(JSON.stringify(this.choiceDate))
				let choiceDateArr = encodeURIComponent(JSON.stringify(this.choiceDateArr))
				let dayCount = this.dayCount
				uni.navigateTo({
					url: `/pages/roomlist/detailed?choice=${choiceDate}&dayCount=${dayCount}&choiceDateArr=${choiceDateArr}&roomsId=${roomsId}`
				});
			},
			toChange(){
				this.isShow = !this.isShow;
			},		

			//轮播图数据
			getroomsinfo(roomsId){
				this.$Request.getT(`/mms/wx/v1/rooms/roomsInfo/${roomsId}`).then(res => {
					if (res.code == 200) {
						// this.carouselList = res.data;
						if(res.data.contentImg){
							this.roomName=res.data.roomName
							this.content=res.data.content
							this.attrs=res.data.attrsArray
							this.cost=res.data.cost
							let imgs = res.data.contentImg.split(",");
							this.carouselList = imgs
						}
					}
				})
			},
			
		}
	}
</script>

<style lang="scss" scoped>
	.u-content{
		width: 100%;
		margin: 1.7rem auto 0;
		position: relative;
		padding-bottom: 1.5rem;
		    padding: 0 3%;
	}
	.tl-mgs{
		display: flex;
		margin-top: 5%;
	}
	.tl-img-16{
		width: 100%;
		height: 100%;
	}
	.tl-card{
			// display: flex;
			// justify-content: flex-start;
			// align-items: center;
			// flex-wrap: wrap;
			height: 200rpx;
			// height: 200rpx;
			overflow: hidden;
		}
		.on{
			height: auto;
		}
	/* 头部 轮播图 */
	.carousel-section {
		position: relative;
		margin: 0 2%;
		.titleNview-placing {
			height: var(--status-bar-height);
			padding-top: 44upx;
			box-sizing: content-box;
		}
	}
	.carousel {
		width: 100%;
		height: 480upx;
		.carousel-item {
			width: 100%;
			height: 100%;
			overflow: hidden;
		}
	
		image {
			width: 100%;
			height: 100%;
			border-radius: 10upx;
		}
	}
	.carousel-section{
		padding: 0;
		.titleNview-placing {
			padding-top: 0;
			height: 0;
		}
	}
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
	.word-p-btn {font-size: 0.6rem;color: #bd8142;text-align: center;height: 1.2rem;line-height: 1.2rem;border: 1px solid #bd8142;border-radius: 1.2rem;display: block;width: 4rem;margin-top: 0.5rem;}
	/* 预定房间 */
	.second-title p{color: #bd8142}
	.second-title{text-align: center; font-size:0.7rem; color: #231815;padding-top: 10%; }
	.second-title span{position: relative;font-size: 35rpx;}
	.second-title span::before,.second-title span::after{position: absolute; width: 0.4rem; height: 0.4rem; text-align: center; content: ""; background: url("../../static/image/second-title.png") no-repeat center center; background-size: contain; top: 50%; margin-top: -0.2rem; left: -1.2rem;}
	.second-title span::after{left: auto; right: -1.2rem;}
	
	.room-detail-word{width: 86vw; margin: 0 auto;  background-color: #fff7eb;line-height: 1.25rem;  padding: 1rem 0.75rem 4rem 1.2rem; position: relative; z-index: 30;}
	
	.r-detail-title{font-size: 0.8rem; color: #615247; margin-bottom: 0.25rem;} 
	.room-detail-word .w-p-line{ transform:rotate(90deg) ; -webkit-transform:rotate(90deg) ; -moz-transform:rotate(90deg) ; -ms-transform:rotate(90deg) ; -o-transform:rotate(90deg); right: 0rem; left: auto; top: -0.2rem; margin-top: 0;}
	.r-detail-facs{ height: 100%; overflow: initial; }
	.r-detail-facs.sliup{height: 5rem; overflow-y: hidden;}
	.r-d-slide img{transform-origin: 50% 50%; width: 30rpx;height: 30rpx;}
	.r-detail-facs.sliup+.r-d-slide img{ transform:rotate(180deg) ; -webkit-transform:rotate(180deg) ; -moz-transform:rotate(180deg) ; -ms-transform:rotate(180deg) ; -o-transform:rotate(180deg) ; }
	.r-d-slide{ font-size: 0.5rem; color: #615247; margin-top: 0.6rem; width: 2rem; }
	.r-d-btns{position: absolute; right: 0.25rem; bottom: 0.5rem; line-height: 0.7rem;display: flex;}
	.r-d-btns .word-p-btn{margin-top: 0; width: 3.6rem;}
	.r-d-btns>div{padding: 0 0.5rem; margin-right: 0.5rem; font-size: #000; font-size: 0.8rem; font-weight: bold; position: relative;}
	.r-d-btns>div::after{content: "";position: absolute; right: 0; bottom: 0; width: 1px; background-color: #bd8142; height: 1.5rem;}
	.r-d-btns>div p:last-child{font-size: 0.4rem; font-weight: normal}
	.room-sec-els{width: 100%; margin-top: 1rem;}
	.room-sec-els img{width: 100%; margin-bottom: 0.5rem;}
	.room-sec-els p{line-height: 1.2rem; }
	.room-dtl-info{border-left: 3px solid #c8c9ca; margin-top: 1.25rem; padding-left: 1rem; line-height:1rem; color: #000;}
	.room-dtl-info .room-dtl-title{font-weight: bold; margin-top: 0.75rem;}
	.r-d-btns-l{right: auto; left: 0.75rem; }
	.r-d-btns-l>div::after{content: none;}
	.r-b-jia{font-size: 0.6rem; margin-bottom: 5px;}
</style>


