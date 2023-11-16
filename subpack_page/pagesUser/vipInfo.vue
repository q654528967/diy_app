<template>
	<view class="content">
    <view class="info xrequired">
      <view class="left">姓名</view>
      <view class="right">
        <input
          v-model="form.username"
          placeholder="姓名"
          placeholder-class="input-placeholder"
        />
      </view>
    </view>
    <view @click="brithclick" style="padding-left: 63rpx;" class="info">
      <view class="left">生日</view>
      <view class="right">
		  <text>{{form.birthday == null ? '' : form.birthday}}</text>
      </view>
    </view>
    <view class="info xrequired">
      <view class="left">性别</view>
      <view style="display: flex;justify-content: space-between;width: 100%;padding: 0 6%;" @click="show=true" class="right">
        <text>{{perfect}}</text>
		<u-icon name="arrow-right" color="#c2bfbb" size="28"></u-icon>
      </view>
    </view>
    <!-- <view class="info">
      <view class="left">微信账号</view>
      <view class="right">
        <input
          v-model="name"
          placeholder="1234343432"
          placeholder-class="input-placeholder"
        />
      </view>
    </view> -->
    <!-- 手机号 -->
    <view class="info xrequired">
      <view class="left">手机号</view>
      <view class="right">
        <input
          v-model="form.tel"
          placeholder="1234343432"
          placeholder-class="input-placeholder"
		  maxlength="11"
        />
        <!-- <input
        class="code"
          v-model="name"
          placeholder=""
          placeholder-class="input-placeholder"
        />
        <view class="btn">获取验证码</view> -->
      </view>
    </view>
    <!-- ------- -->
    <view style="padding-left: 63rpx;" class="info">
      <view class="left">所在地</view>
      <view class="right">
        <input
          v-model="form.address"
          placeholder="地区"
          placeholder-class="input-placeholder"
        />
      </view>
    </view>
    <!-- 按钮 -->
    <view class='bottom'>
      <view @click="submit" class="left">保存</view>
      <view @click="celener" class="right">取消</view>
    </view>
	<u-select v-model="show" mode="single-column" :list="list" @confirm="confirm"></u-select>
	<!-- <u-calendar v-model="caleshow" :mode="mode" @change="change"></u-calendar> -->
	<u-picker v-model="caleshow" mode="time" :params="params" @confirm="change"></u-picker>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				params: {
					year: true,
					month: true,
					day: true,
				},
				caleshow: false,
				// mode: 'date',
				perfect:'',
				show: false,
				list: [
					{
						value: '1',
						label: '男'
					},
					{
						value: '2',
						label: '女'
					}
				],
				form: {
					username: '',
					sex:null,
					tel:'',
					credCode:'',
					birthday:'',
					address:''
				},
				title: 'Hello',
			}
		},
		onLoad() {},
		onShow() {
			this.hxinfor()
		},
		methods: {
			// 回显会员信息
			hxinfor(){
				this.$Request.getT('/mms/wx/v1/getUserCardInfo').then(res => {
					if (res.code == 200) {
						if(res.data.sex==1){
							this.perfect='男'
						}else if(res.data.sex==2){
							this.perfect='女'
						}
						this.form = res.data;
					}
				})
			},
			change(e) {
				console.log(e);
				this.form.birthday=e.year+'-'+e.month+'-'+e.day
			},
			brithclick(){
				this.caleshow=true
			},
			// 点击选择性别
			confirm(e) {
				console.log(e);
				this.perfect=e[0].label
				this.form.sex=e[0].value
			},
			//取消
			celener(){
				uni.navigateBack({
					delta: 1
				});
			},
			//保存
			submit() {
				if(this.form.username && this.form.sex && this.form.tel){
					console.log('form',this.form)
					this.$Request.post('/mms/wx/v1/updateUserCardInfo',this.form).then(res => {
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
					this.$api.msg('请填写必填项')
				}
				
			},
		}
	}
</script>

<style lang="scss" scoped>
	
page {
  background-color: #f4f1ef;
}
.xrequired:before {
  content: '* ';
	color: red;
	vertical-align: middle;
	font-size: 45rpx;
	margin-right: 2%;
	display: inline-block;
}
.info {
  display: flex;
  height: 100rpx;
  line-height: 100rpx;
  border-bottom: 1px solid #ccc;
  padding-left: 30rpx;
  box-sizing: border-box;
  .left {
    width: 150rpx;
    text-align: left;
    font-size: 30rpx;
  }
  .right {
    display: flex;
    .code {
      border: 1px solid #c2906d;
      height: 70rpx;
      width: 180rpx;
      margin-top: 15rpx;
    }
    input {
      height: 100rpx;
      line-height: 100rpx;
      // width: 200rpx;
      padding-left: 15rpx;
    }
    .btn {
      font-size: 22rpx;
      border: 1px solid #c2906d;
      height: 70rpx;
      line-height: 70rpx;
      border-radius: 50rpx;
      margin-top: 15rpx;
      padding: 0 8rpx;
      box-sizing: border-box;
      margin-left: 10rpx;
    }

  }
}
.bottom {
  display: flex;
  justify-content: center;
  margin-top: 200rpx;
  .left {
    background-color: #c2906d;
    color: #fff;
    margin-right: 40rpx;
  }
  .right {
    color: #c2906d;
    border: 1px solid #c2906d;
    margin-left: 40rpx;
  }
  view {
    width: 200rpx;
    height: 80rpx;
    line-height: 80rpx;
    text-align: center;
    border-radius: 50rpx;
  }
}
</style>




