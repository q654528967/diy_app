<template>
  <view>
    <button @click="goCustomization">定制元素</button>
  </view>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    goCustomization() {
      uni.navigateTo({
        url: "/pages/customization/customization",
      });
    },
  },
};
</script>

<style></style>
