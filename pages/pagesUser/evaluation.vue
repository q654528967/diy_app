<template>
  <view class="content">
    <view class="submit" @click="jumpEvaluation">提交</view>
    <view class="star">
      商品评价
		<u-rate :size='50' :count="count" v-model="commodityvalue"></u-rate>
    </view>
    <image class="line" src="../../static/user/line.png" mode="scaleToFill" />
    <textarea v-model="textareaData" placeholder="评价内容不得少于3个字" placeholder-class="textarea-placeholder" />
    <!-- <view class="tips">再写10个字可获得30个积分</view> -->
    <!-- <view class="take">
      <image
        src="../../static/user/takeIcon.png"
        mode="scaleToFill"
      />
      <view class="add">添加图片/视频</view>
    </view>
     <image class="line" src="../../static/user/line.png" mode="scaleToFill" /> -->
     <!-- 物流评价 -->
     <view class="logistics">
      <view class="logisticsTitle">
        <view class="left">物流服务评价</view>
        <view class="right">满意请给5星喔</view>
      </view>
      <view class="tips">可在提交评价后对快递小哥打赏</view>
     <view class="star marginTop">
      包装评价
      <u-rate :size='50' :count="count" v-model="packingvalue"></u-rate>
    </view>
    <view class="star marginTop">
      送货速度
     <u-rate :size='50' :count="count" v-model="deliveryvalue"></u-rate>
    </view>
    <view class="star marginTop">
      配送员服务
     <u-rate :size='50' :count="count" v-model="servicevalue"></u-rate>
    </view>
     </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
		  billPackId:null,//购物车iD
		  productCode:null,//商品iD
        title: 'Hello',
        textareaData: '',
        count:5,
		commodityvalue:0,//商品评价
		packingvalue:0,//包装评价
		deliveryvalue:0,//送货速度
		servicevalue:0//配送员服务
      }
    },
    onLoad(options) {
		if(options.billPackId){
			this.billPackId=options.billPackId
		}
		if(options.productCode){
			this.productCode=options.productCode
		}
	},
    methods: {
      clickStar(e) {
        let newArr = []
        // 拿到点击的个数
        for (let i = 0; i < e+1; i++) {
          newArr.push({url: '../../static/user/selectStar.png'})
        }
        for (let i = 0; i < 5; i++) {
          if(newArr.length < 5) {
            newArr.push({url: '../../static/user/kongStar.png'})
          }
        }
        this.starImg = newArr
		console.log('e',e+1)
      },
	  //保存评价
	  jumpEvaluation(){
		  if(this.textareaData){
			  let parames={
			  				tableName: this.productCode, //商品id
			  			    custBillPackId: this.billPackId , //"购物车id",
			  			    commentD: this.commodityvalue, //商品评价
			  			    commentA: this.packingvalue, //包装评价
			  			    commentB: this.deliveryvalue, //送货速度
			  			    commentC: this.servicevalue, //配送员服务
			  			    content: this.textareaData, //评价内容
			  }
			  console.log('parames',parames)
			  this.$Request.post('/mms/wx/v1/saveProMsg',parames).then(res => {
			  	if(res.code== 200){
			  		uni.showToast({ title: '保存成功！' });
			  		setTimeout(()=>{
			  			uni.navigateBack({
			  				delta: 1
			  			});
			  		},1000)
			  		
			  	}else{
			  		this.$api.msg(res.msg)
			  	}
			  });
		  }else{
			  this.$api.msg('请填写评价内容')
		  }
		  
	  }
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    padding: 50rpx 30rpx;
    box-sizing: border-box;
  }
  .submit {
    width: 110rpx;
    height: 50rpx;
    border-radius: 50rpx;
    text-align: center;
    line-height: 50rpx;
    font-size: 28rpx;
    color: red;
    border: 1px solid red;
    margin: 0 right;
    float: right;
  }
  .star {
    font-size: 32rpx;
    margin-top: 80rpx;
    image {
      width: 40rpx;
      height: 40rpx;
      margin-left: 30rpx;
      vertical-align: middle;
    }
  }
  .marginTop {
    margin-top: 40rpx;
  }
  .line {
    height: 30rpx;
    width: 100%;
    display: block;
    margin-top: 30rpx;
  }
  textarea {
    height: 300rpx;
    background-color: #fff;
    padding: 30rpx 0rpx;
    font-size: 32rpx;
  }
  .tips {
    font-size: 32rpx;
  }
  .take {
    height: 250rpx;
    background-color: #f3f3f3;
    padding-top: 50rpx;
    margin-top: 30rpx;
    box-sizing: border-box;
    image {
      width: 110rpx;
      height: 80rpx;
      display: block;
      margin: 0 auto;
      text-align: center;
    }
    .add {
      text-align: center;
      margin-top: 10rpx;
      font-size: 32rpx;
    }
  }
  .logistics {
    .logisticsTitle {
      display: flex;
      justify-content: space-between;
      font-size: 32rpx;
    }
    .tips {
      font-size: 32rpx;
      margin-top: 85rpx;
    }
  }
</style>




