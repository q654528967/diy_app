<style lang="scss" scoped>
.topTab {
  height: 120rpx;
  line-height: 120rpx;
  background-color: #fff;
  display: flex;
  justify-content: space-around;
  font-size: 32rpx;
  padding: 0 10rpx;
  box-sizing: border-box;
  .state {
    height: 110rpx;
  }
  .selectCss {
    border-bottom: 2px solid #e99785;
    color: #e99785;
  }
}
</style>
<template>
  <view class="topTab">
    <view v-for="(item, index) in state" :key="index" :class="[stateIndex == index ? 'state selectCss' : 'state']" @click="clickTab(index)">{{item.text}}</view>
  </view>
</template>
<script>
  export default {
    name: "navBar",
    props: {
      state: '',
    },
    data() {
      return {
        stateIndex: 0,
      };
    },
    methods: {
      clickTab(e) {
        this.$emit('clickTab',e)
        this.stateIndex = e
      }
    },
  };
</script>