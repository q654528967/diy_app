<template>
  <view class="content">
    <view class="tab">
      <view class="tabBar" @click="clickJumpPage(1)">
        <image src="../../static/tab/tabHomeIcon.png" mode="scaleToFill" />
        <view :class="[indexSubPage == 1 ? 'text selectText' : 'text']">首页</view>
      </view>
      <button open-type="contact" class="tabBar">
        <image src="../../static/tab/tabkefuIcon.png" mode="scaleToFill" />
        <view :class="[indexSubPage == 2 ? 'text selectText' : 'text']" class="text">客服</view>
      </button>
      <view style="position: relative;" class="tabBar" @click="clickJumpPage(3)">
        <image src="../../static/tab/tabShopIcon.png" mode="scaleToFill" />
		<text style="    position: absolute;top: 2px;right: 23%;color: #f00;">{{cartnum == 0 ? '' : cartnum}}</text>
        <view :class="[indexSubPage == 3 ? 'text selectText' : 'text']">购物车</view>
      </view>
      <view class="tabBar" @click="clickJumpPage(4)">
        <image src="../../static/tab/tabUserIcon.png" mode="scaleToFill" />
        <view :class="[indexSubPage == 4 ? 'text selectText' : 'text']">我的</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    name: "tabbar",
    props: {
		cartnum:{
        type: Number,
      },
      indexSubPage: {
        type: Number,
        default: 1,
      }
    },
    data() {
      return {
        tabList: [{
            icon: 'icon-emotion',
            text: 'tab01',
            badge: 1
          },
          {
            icon: 'icon-qianbao',
            text: 'tab02',
          },
          {
            icon: 'icon-choose01',
            text: 'tab03',
            badgeDot: true
          }
        ],
        currentTabIndex: this.current
      }
    },
    onLoad() {
		
	},
	onShow() {
	},
    methods: {
      clickJumpPage(e) {
        console.log(e);
        let url = ''
        if(e == 1) {
          url = '/pages/index/index'
        }else if(e == 2) {
          url = '/pages/index/kefu'
        }else if(e==3) {
          url = '/pages/index/car'
        }else {
          url = '/pages/user/user'
        }
        uni.switchTab({
          url: url
        })
		// this.getshop()
        console.log(url);
      },
	  
    }
  }
</script>

<style lang="scss" scoped>
  .content {
    position: fixed;
    width: 100%;
    height: 130rpx;
    bottom: 0;
    z-index: 99999;
    background-color: #e5e6e6;
    .tab {
      display: flex;
      justify-content: space-between;
    }
    .tabBar {
      width: 100%;
      height: 120rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      padding: 8rpx 0rpx;
      box-sizing: border-box;
      image {
        width: 40rpx;
        height: 40rpx;
        display: block;
        margin: 0 auto;
      }
      .text {
        font-size: 28rpx;
        text-align: center;
      }
      .selectText {
        color: #bc8045;
      }
    }
    button {
        background-color: #e5e6e6;
        line-height: initial;
        border: none;
      }
      button::after {
        border: none !important;
      }
  }
</style>




