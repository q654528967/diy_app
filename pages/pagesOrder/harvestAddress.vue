<template>
  <view class="content">
    <view class="title">
      配送方式
    </view>
    <view class="form">
      <view class="input xrequired">
        <view class="left">收货人</view>
        <input class="inputData" v-model="mobile.addrName" placeholder="姓名" />
      </view>
	  <view class="input xrequired">
	    <view class="left">联系电话</view>
	    <input class="inputData" v-model="mobile.phone" placeholder="11位手机号" maxlength='11' />
	  </view>
	  <view class="input xrequired">
	    <view class="left">收获地区</view>
	    <view class="address">
	      <input type="select" @click="showRegionPicker" v-model="mobile.zonename" placeholder="省份城市" />
	      <image src="../../static/order/dingwei.png" mode="scaleToFill" />
	    </view>
	  </view>
	  <view class="input xrequired">
	    <view class="left">详细地址</view>
	    <input class="inputData" v-model="mobile.address" placeholder="街道门牌信息" />
	  </view>
      <view class="input xrequired">
        <view class="left">邮政编码</view>
        <input class="inputData" v-model="mobile.zipCode" placeholder="邮政编码" />
      </view>
      
    </view>
    <!-- 按钮 -->
    <view class='bottom'>
      <view class="left" @click="submitvation">保存</view>
      <view v-show="caleisshow" class="right" @click="calerqx">删除</view>
    </view>
    <view class="bg">
      <view class="boxBg">
        <image src="../../static/user/add.png" mode="scaleToFill" /> 新增收获人信息
      </view>
    </view>
    <!-- 地址选择 -->
    <u-radio-group v-model="radiovalue">
		<label class="uni-list-cell uni-list-cell-pd" v-for="(item, index) in items" :key="index">
            <view class="box">
				<view>
  					<u-radio active-color="#00ffa1"  @change="radioChange(item)" :name="item.custAddressId" />
  				</view>
				<view class="center">
					<view class="top">
						<view class="name">{{item.addrName}}</view>
						<view class="phone">{{item.phone}}</view>
					</view>
					<view class="address">收获地址: {{item.zonename}}</view>
				</view>
            </view>
            <image @click="edait(item)" src="../../static/user/editIcon.png" mode="scaleToFill" />
  		</label>
    </u-radio-group>
     <!-- 按钮 -->
    <view class='bottom' style="padding-bottom:30rpx">
      <view @click="addressclick" class="left">确认</view>
      <view @click="receingclick" class="right">取消</view>
    </view>
	<lotus-address v-on:choseVal="choseValue" :lotusAddressData="lotusAddressData"></lotus-address>
  </view>
</template>
<script>
import lotusAddress from "../../components/Winglau14-lotusAddress/Winglau14-lotusAddress.vue";
export default {
	components:{
		"lotus-address":lotusAddress
	},
    data() {
		return {
			caleisshow:false,
			
			radiovalue:'',
			mobile:{
				addrName:'',
				phone:'',
				zonename:'',
				address:'',
				zipCode:''
			},
			title: 'Hello',
			lotusAddressData:{
				visible:false,
				provinceName:'',
				cityName:'',
				townName:'',
			},
			items: [],
			current: -1
		}
    },
    onLoad() {},
	onShow() {
		this.getresslist()
	},
    methods: {
		reform(){
			this.mobile={
				addrName:'',
				phone:'',
				zonename:'',
				address:'',
				zipCode:''
			}
		},
		//删除
		calerqx(){
			console.log('this.mobile',this.mobile)
			let that=this
			let ids=that.mobile.custAddressId
			uni.showModal({
			    title: '确认删除？',
			    success: function (res) {
			        if (res.confirm) {
						that.$Request.post('/mms/wx/v1/address/delete/'+ids).then(res => {
							if (res.code == 200) {
								that.caleisshow=false
								that.reform()
								that.getresslist()
							}
						})
			        }
			    }
			});
			// this.reform()
		},
		// 收货地址确认
		addressclick(){
			if(this.radiovalue){
				uni.navigateBack({
					delta: 1
				});
			}else{
				this.$api.msg('请选择收货信息');
			}
			
		},
		// 修改信息
		edait(item){
			this.caleisshow=true
			this.$Request.getT('/mms/wx/v1/address/'+item.custAddressId).then(res => {
				if (res.code == 200) {
					this.mobile=res.data
				}
			})
		},
		// 查询收货人信息
		getresslist(){
			this.$Request.getT('/mms/wx/v1/address/list').then(val => {
				if (val.code == 200) {
					this.items=val.rows
					if(this.items.length==0){
						uni.removeStorageSync('addresform');
					}
				}else{
					// console.log('gggg',val.msg)
					this.$api.msg(val.msg);
				}
			})
		},
		// 保存信息
		submitvation(){
			if(this.mobile.addrName && this.mobile.phone && this.mobile.zonename && this.mobile.address && this.mobile.zipCode){
						// if(this.model.custAddressId){
				this.$Request.post('/mms/wx/v1/address/add',this.mobile).then(res => {
					if (res.code == 200) {
						this.getresslist()
						this.reform()
						this.caleisshow=false
					}
				})
			}else{
				this.$api.msg('请填写必填信息')
			}
			
			
		},
		showRegionPicker() {
			// this.pickerShow=true
			this.lotusAddressData.visible = true;
			this.lotusAddressData.provinceName = '';
			this.lotusAddressData.cityName = '';
			this.lotusAddressData.townName = '';
			// this.show = true;
		},
		choseValue(res){
		    //res数据源包括已选省市区与省市区code
			console.log(res);
			this.lotusAddressData.visible = res.visible;//visible为显示与关闭组件标识true显示false隐藏
			//res.isChose = 1省市区已选 res.isChose = 0;未选
			if(res.isChose){
				this.lotusAddressData.provinceName = res.province;//省
				this.lotusAddressData.cityName = res.city;//市
				this.lotusAddressData.townName = res.town;//区
				this.mobile.province=res.province
				this.mobile.city=res.city
				this.mobile.area=res.town
				this.mobile.zonename = `${res.province} ${res.city} ${res.town}`; //region为已选的省市区的值	
			}
		},
		radioChange(item) {
			uni.setStorageSync('addresform', item);
			console.log('item',item)
		},
		receingclick(){
			uni.removeStorage({
				key:'addresform'
			})
			uni.navigateBack({
				delta: 1
			});
		}
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    .title {
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
    .form {
      padding: 50rpx;
      padding-top: 0rpx;
	  .xrequired:before {
            content: '* ';
			color: red;
			vertical-align: middle;
			font-size: 45rpx;
			margin-right: 2%;
			display: inline-block;
        }
      .input {
        height: 70rpx;
        display: flex;
        margin-top: 40rpx;
        .left {
          width: 190rpx;
          border: 1px solid #ccc;
          text-align: center;
          line-height: 70rpx;
          font-size: 32rpx;
          color: #c59b63;
          margin-left: -2rpx;
        }
        .inputData {
          height: 70rpx;
          width: 100%;
          line-height: 70rpx;
          font-size: 34rpx;
          border: 1px solid #ccc;
          padding: 0 40rpx;
          box-sizing: border-box;
        }
        .address {
          display: flex;
          justify-content: space-between;
          border: 1px solid #ccc;
          width: 100%;
          height: 70rpx;
          line-height: 70rpx;
          padding: 0 40rpx;
          padding-right: 10rpx;
          box-sizing: border-box;
          input {
            height: 70rpx;
            line-height: 70rpx;
          }
          image {
            width: 40rpx;
            height: 50rpx;
            display: block;
            margin-top: 10rpx;
          }
        }
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
    .bg {
      background: url('https://s2.loli.net/2022/08/08/iOLKVtTN7639q1E.png') no-repeat 100%;
      background-size: cover;
      height: 100rpx;
      width: 100%;
      display: flex;
      margin-top: 100rpx;
      .boxBg {
        display: flex;
        margin-top: 20rpx;
        margin-left: 20rpx;
      }
      image {
        width: 40rpx;
        height: 40rpx;
        margin-right: 10rpx;
      }
    }
    .uni-list-cell {
      display: flex;
      padding: 30rpx 40rpx;
      box-sizing: border-box;
      justify-content: space-between;
      .center {
        width: 100%;
        font-size: 32rpx;
        .top {
          display: flex;
          justify-content: space-between;
        }
        .address{
          font-size: 32rpx;
          color: #909191;
        }
      }
      .box {
        display: flex;
        width: 100%;
        padding-right: 20rpx;
      }
      image {
        width: 40rpx;
        height: 35rpx;
      }
    }
  }
</style>




