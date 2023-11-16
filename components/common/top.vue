
<template>
  <view class="navHeight" :style="[{paddingTop:statusBar+'px'}]">
    <view class="tabBox">
     <!-- <view @click="upPage" class="left">
        <image v-if="rightIcon" src="../../static/callback.png" mode="scaleToFill" />
      </view> -->
      <view class="search">
		  <view style="width: 175rpx;height: 60rpx;margin-left: 5%;" class="">
		  	<image style="width: 100%;height: 100%;" src="../../static/user/cardRight.png" mode=""></image>
		  </view>
        <view @click.stop="searchChange" class="searchBox">
          <image src="../../static/searchIcon.png" mode="scaleToFill" />
          <input :disabled="true" v-model="searchData" placeholder="查找产品····" />
        </view>
      </view>
    </view>
    <!-- <view style="height: 90rpx"></view> -->
  </view>
</template>
<script>
import Vue from 'vue'
  export default {
    name: "navBar",
    props: {
      searchData: '查找商品',
      rightIcon: {
        type: Boolean,
        default: true,
      }
    },
    data() {
      return {
        statusBar: this.statusBar
      };
    },
    methods: {
      searchChange() {
        this.$emit('searchChange')
      },
      // 上一页
      upPage() {
        uni.navigateBack({
          delta: 1
        })
      }
    },
  };
</script>
<style lang="scss" scoped>
  .navHeight {
    height: 148rpx;
    width: 100%;
    // background-color: #fff;
    position: fixed;
    top: 0;
    z-index: 999;
    .tabBox {
		padding-top: 5%;
      position: relative;
      padding-right: 10rpx;
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
        display: flex;
		    align-items: center;
        // width: 200rpx;
        // margin: 0 auto;
        // border-bottom: 1px solid #727171;
        .searchBox {
			margin-left: 7%;
          display: flex;
          align-items: center;
          height: 90rpx;
          line-height: 90rpx;
		  border-bottom: 1px solid #727171;
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
    }
  }
</style>