<template>
  <view class="content">
    <!-- 轮播图 -->
    <!-- <view style="height: 150upx"></view> -->
    <button @click="goCustomization">定制</button>
    <view v-for="(item, index) in culterList" :key="index" class="">
      <Top :rightIcon="false" @searchChange="searchChange"></Top>
      <view v-if="item.rowType == 1" class="">
        <!-- <uni-swiper-dot class="uni-swiper-dot-box" @clickItem=clickItem :item.children="item.children" :current="current" :mode="mode" :dots-styles="dotsStyles" field="content"> -->
        <swiper class="swiper-box indexSwiperHeight" :current="swiperDotIndex">
          <swiper-item v-for="(box, k) in item.children" :key="k">
            <view
              @click.stop="buyOrChange(box)"
              class="swiper-item"
              :class="'swiper-item' + n"
            >
              <image :src="box.proImgs" style="width: 100%; height: 100%" />
              <text class="swiperText" style="swiper">即刻入手</text>
            </view>
          </swiper-item>
        </swiper>
        <!-- </uni-swiper-dot> -->
      </view>
      <!-- 商品描述 -->
      <view v-if="item.rowType == 2" class="">
        <view class="title">
          <view class="titleTop">{{ item.name == null ? "" : item.name }}</view>
          <view class="titleContent">{{
            item.typeContent == null ? "" : item.typeContent
          }}</view>
        </view>
        <view class="gift">
          <view v-for="(box, n) in item.children" :key="n" class="giftBox">
            <image
              @click.stop="buyOrChange(box)"
              :src="box.proImgs"
              mode="widthFix"
            />
            <text @click.stop="changeList(item)" class="inChage" style="swiper"
              >即刻兑换</text
            >
          </view>
        </view>
      </view>
      <!-- 限时兑换 -->
      <view v-if="item.rowType == 3" class="exchange">
        <view style="position: relative" class="changeTitle">
          <text class="newTitle">{{ item.name == null ? "" : item.name }}</text>
          <image
            class="changeTitleImg"
            src="../../static/index/cult_xsdh.png"
            mode="widthFix"
          />
        </view>
        <uni-swiper-dot
          class="uni-swiper-dot-box"
          @clickItem="clickItem"
          :item.children="item.children"
          :current="current"
          :mode="mode"
          :dots-styles="dotsStyles"
          field="content"
        >
          <swiper class="swiper-box" :current="threeswiperDotIndex">
            <swiper-item
              v-for="(rowbox, index1) in item.children"
              :key="index1"
            >
              <view class="swiper-item" :class="'swiper-item' + index1">
                <image
                  @click.stop="buyOrChange(rowbox)"
                  :src="rowbox.proImgs"
                  style="width: 100%"
                />
                <view class="changeGoods">
                  <view class="left">
                    <view style="color: #151515" class="changeName">{{
                      rowbox.name == null ? "" : rowbox.name
                    }}</view>
                    <view class="price">
                      ￥{{ rowbox.salePrice == null ? 0 : rowbox.salePrice }}
                      <text
                        style="text-decoration: line-through; margin: 0 15rpx"
                        >￥{{ rowbox.price == null ? 0 : rowbox.price }}</text
                      >
                      {{
                        rowbox.pointsValue == null ? 0 : rowbox.pointsValue
                      }}积分</view
                    >
                  </view>
                  <view @click.stop="shopclick(rowbox)" class="right">
                    <image
                      src="../../static/index/shopIcon.png"
                      mode="scaleToFill"
                    />
                  </view>
                </view>
              </view>
            </swiper-item>
          </swiper>
        </uni-swiper-dot>
      </view>

      <!-- 新品发布 -->
      <view v-if="item.rowType == 4" class="newGoods">
        <view style="position: relative" class="newGoodsTitle">
          <text class="newTitle">{{ item.name == null ? "" : item.name }}</text>
          <image
            class="changeTitleImg"
            src="../../static/index/cult_xpfb.png"
            mode="widthFix"
          />
        </view>
        <!-- 新品 -->
        <view class="goodsList">
          <view
            v-for="(xinbox, index2) in item.children"
            :key="index2"
            :style="{
              backgroundImage: `url(${xinbox.proImgs})`,
              backgroundSize: 'cover',
            }"
            class="listBox"
            @click.stop="buyOrChange(xinbox)"
          >
            <view class="lisName">{{
              xinbox.name == null ? "" : xinbox.name
            }}</view>
            <view class="btn"
              >已售{{ xinbox.saleNum == null ? 0 : xinbox.saleNum }}件</view
            >
            <view class="price">
              <view class="left">
                <view class="newPrice"
                  >￥{{ xinbox.salePrice == null ? 0 : xinbox.salePrice }}</view
                >
                <view class="old1Price"
                  >{{
                    xinbox.pointsValue == null ? 0 : xinbox.pointsValue
                  }}积分</view
                >
              </view>
              <view @click.stop="shopclick(xinbox)" class="right">
                <image
                  src="../../static/index/shopIcon.png"
                  mode="scaleToFill"
                />
              </view>
            </view>
          </view>
        </view>
        <view @click="changeList(item)" class="more">更多</view>
      </view>

      <view style="margin-top: 60rpx" v-if="item.rowType == 5" class="">
        <view style="position: relative" class="newGoodsTitle">
          <text class="newTitle">{{ item.name == null ? "" : item.name }}</text>
          <image
            class="changeTitleImg"
            src="../../static/index/jjyp.png"
            mode="widthFix"
          />
        </view>
        <TodayBuy
          @imageclick="changeList(item)"
          :proData="item.children"
          :jjimage="item.typeImg"
          @buyOrChange="buyOrChange"
          @shopclick="shopclick"
        ></TodayBuy>
        <view @click="changeList(item)" class="more">更多</view>
      </view>
    </view>

    <view style="margin: 5% 0" class="">
      <button class="btn" @click="showclick">酒店日期选择</button>
    </view>

    <!-- 组件测试 -->
    <!-- <AddOrBuy></AddOrBuy> -->
    <view style="height: 120rpx"></view>
    <TabBar :cartnum="cartnum" :indexSubPage="1"></TabBar>

    <!-- 规格选择 -->
    <BottomAlert :sc="fuClassName.specifications">
      <view class="proChoose">
        <view class="imgBox">
          <view class="img">
            <image :src="product.proImgs" />
          </view>
          <view class="center">
            <view class="centerContent">{{
              product.pname == null ? "" : product.pname
            }}</view>
            <view class="price">￥{{ product.billValue }}</view>
          </view>
        </view>
        <image
          @click="speciclice"
          class="chacha"
          src="../../static/user/chacha.png"
          mode="scaleToFill"
        />
      </view>
      <!-- 颜色 -->
      <view v-for="(item, n) in specificationslist" :key="n" class="">
        <view class="color">{{ item.specType }}:</view>
        <view class="sp">
          <view
            v-for="(aitem, index) in item.productSpecifications"
            :key="index"
            :class="subIndex[n] == index ? 'on' : ''"
            @click="chooseItem(n, aitem, index)"
          >
            <text>{{ aitem.specName }}</text>
          </view>
        </view>
      </view>

      <!-- 数量 -->
      <view class="amount">
        <view class="left">
          <view>购买数量：</view>
          <view>剩余{{ product.inventorySum }}件</view>
        </view>
        <view class="number">
          <!-- <u-number-box :min="min" v-model="goodsData.number" @change="valChange"></u-number-box> -->
          <view class="sub" @tap.stop="sub">
            <view class="icon jian">-</view>
          </view>
          <view class="input" @tap.stop="discard">
            <input :disabled="true" type="number" v-model="goodsData.number" />
          </view>
          <view class="add" @tap.stop="add">
            <view class="icon jia">+</view>
          </view>
        </view>
      </view>
      <view class="submit" @click="specificationsAlert">确认</view>
      <view style="height: 130upx"></view>
    </BottomAlert>
  </view>
</template>
<script>
import uniSwiperDot from "@/components/uni-swiper-dot_1.2.0/components/uni-swiper-dot/uni-swiper-dot.vue";
import BottomAlert from "@/components/goods/bottomAlert";
import TodayBuy from "@/components/shopCar/todayBuy";
import AddOrBuy from "@/components/shopCar/addOrBuy";
import Top from "@/components/common/top";
export default {
  components: {
    uniSwiperDot,
    AddOrBuy,
    Top,
    TodayBuy,
    BottomAlert,
  },
  data() {
    return {
      cartnum: 0, //购物车数量

      productIdid: 0,
      product: {
        proImgs: "",
        pname: "",
        price: "",
        pointsValue: "",
        inventorySum: 0,
        salePrice: "",
        billValue: "",
      },
      goodsData: {
        number: 1,
      },
      fuClassName: {
        specifications: "none",
      },
      selectArr: [],
      subIndex: [],

      specificationslist: [],
      shopup: false,
      threeswiperDotIndex: 0,
      content_img: "",
      rqjp_title: "", //人气精品
      rqjp_content: "", //人气文字
      jjimage: "",
      cult_wccp: "",
      cult_zxtc: "",

      cult_jjyp: "",
      cult_xsdh: "",
      cult_title: "",
      culterList: [],
      exList: [],
      carouselList: [],
      proData: [],
      cultural_list: [],
      selection_list: [],
      modeIndex: -1,
      styleIndex: -1,
      current: 0,
      mode: "default",
      dotsStyles: {
        width: 6,
        bottom: 20,
        backgroundColor: "rgba(255, 255, 255,0.3)",
        border: "1px rgba(255, 90, 95,0.3) solid",
        color: "#fff",
        selectedBackgroundColor: "rgba(255, 255, 255,1)",
        selectedBorder: "1px rgba(255, 90, 95,0.9) solid",
      },
      swiperDotIndex: 0,
    };
  },
  // onUnload(e) {
  // 	console.log('shaye')
  //    this.fuClassName.specifications='none'
  // },
  async onLoad() {
    uni.hideTabBar();
    // this.loadData();
  },
  onShow() {
    this.getBannerData();
    this.getshop();
    this.fuClassName.specifications = "none";
  },
  onShareAppMessage(res) {
    // 设置默认的分享参数
    let shareInfo = {
      title: "", //标题
      path: "/pages/index/index", //路径
      // imageUrl:'share-img.png'// 图片
    };
    return {
      title: shareInfo.title,
      path: shareInfo.path,
      // imageUrl: shareInfo.imageUrl,
    };
  },
  // onBackPress() {
  // 	if (this.showCaledar !== false) {
  // 		this.showCaledar = false;
  // 		return true;
  // 	}
  // },
  methods: {
    goCustomization() {
      uni.navigateTo({
        url: "/pages/customizationStart/customizationStart",
      });
    },
    showclick() {
      uni.navigateTo({
        url: `/pages/roomlist/index`,
      });
    },

    //查询购物车列表
    getshop() {
      this.$Request.getT("/mms/wx/v1//getCarts").then((res) => {
        if (res.code == 200) {
          this.cartnum = res.data.length;
        }
      });
    },
    // 查询商品详情
    getGoodsDetailsData(productId) {
      let url = "/mms/mobile/v1/product/" + productId;
      this.$Request.get(url).then((res) => {
        if (res.code == 200) {
          this.product = res.data;
        }
      });
    },
    //减少数量
    sub() {
      if (this.goodsData.number <= 1) {
        return;
      }
      this.goodsData.number--;
    },
    //增加数量
    add() {
      this.goodsData.number++;
    },
    // 查询规格
    getSpec(productId) {
      this.specificationslist = [];
      let url = "/mms/wx/v1/productSpec/" + productId;
      this.$Request.getT(url).then((res) => {
        if (res.code == 200) {
          this.specificationslist = res.data;
        }
      });
    },
    chooseItem(_pIndex, _name, index) {
      if (this.selectArr[_pIndex] != _name) {
        // console.log('index',index)
        this.$set(this.selectArr, _pIndex, _name);
        this.$set(this.subIndex, _pIndex, index);
        // console.log('this.subIndex',this.subIndex)
        // console.log('_pIndex',_pIndex)
      } else {
        this.selectArr.splice(_pIndex, 1);
        // this.$set(this.selectArr, _pIndex, '{}');
        this.$set(this.subIndex, _pIndex, -1); //去掉选中颜色
      }
      console.log(this.selectArr);
    },
    //查询首页树接口
    getBannerData() {
      this.$Request.get("/mms/mobile/v1/productsTree").then((res) => {
        if (res.code == 200) {
          let rowlist = res.data;
          this.culterList = res.data;
        }
      });
    },
    // 跳转商品列表
    changeList(item) {
      uni.navigateTo({
        url: `/pages/indexSubPage/list?id=${item.id}`,
      });
    },
    // 轮播图
    change(e) {
      // console.log('e',e)
      this.current = e.detail.current;
    },
    // 头部搜索
    searchChange() {
      // console.log('wwewe');
      uni.navigateTo({
        url: `/pages/index/search`,
      });
    },
    // 购买或兑换
    buyOrChange(item) {
      console.log("item", item);
      uni.navigateTo({
        url: `/pages/indexSubPage/goodsDetails?productId=${item.productId}`,
      });
    },
    //确认加入购物车
    specificationsAlert() {
      let selectArr = this.selectArr;
      let specificationslist = this.specificationslist;
      let selelist = [];
      let specation = [];
      if (this.specificationslist) {
        selectArr.forEach((val) => {
          selelist.push(val);
        });
        specificationslist.forEach((value) => {
          specation.push(value);
        });
        if (selelist.length >= specation.length) {
          let param = {
            productId: this.productIdid,
            counts: this.goodsData.number,
            proSpecList: selelist,
          };
          console.log("param", param);
          this.$Request.post("/mms/wx/v1//addCart", param).then((res) => {
            if (res.code == 200) {
              this.$api.msg("添加成功");
              this.fuClassName.specifications = "none";
              this.getshop();
            } else {
              // console.log('kkkkk',res.msg)
              this.$api.msg(res.msg);
            }
          });
        } else {
          this.$api.msg("请选择相应规格");
        }
      } else {
        this.$api.msg("请选择相应规格");
      }
    },
    //加入购物车
    shopclick(item) {
      this.selectArr = [];
      this.subIndex = [];
      this.goodsData.number = 1;
      console.log("item.productId", item.productId);
      this.fuClassName.specifications = "show";
      this.productIdid = item.productId;
      this.getSpec(item.productId);
      this.getGoodsDetailsData(item.productId);
    },
    speciclice() {
      this.fuClassName.specifications = "none";
    },
  },
};
</script>

<style lang="scss" scoped>
.amount {
  display: flex;
  justify-content: space-between;
  margin-top: 55rpx;
  padding: 0 40rpx;
  box-sizing: border-box;
  .left {
    view:nth-child(1) {
      font-size: 34rpx;
    }
    view:nth-child(2) {
      font-size: 30rpx;
    }
  }
  .number {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 80upx;
    .input {
      // width: 60upx;
      // height: 60upx;
      // margin: 0 10upx;
      // background-color: #f3f3f3;
      input {
        width: 72rpx;
        height: 52rpx;
        display: flex;
        border: 0.5px solid #7b7a7a;
        justify-content: center;
        align-items: center;
        text-align: center;
        font-size: 26rpx;
      }
    }
    .sub,
    .add {
      // width: 45upx;
      // height: 45upx;
      // background-color: #f3f3f3;
      // border-radius: 5upx;
      .icon {
        font-size: 32rpx;
        width: 72rpx;
        height: 52rpx;
        display: flex;
        justify-content: center;
        border: 0.5px solid #7b7a7a;
        align-items: center;
      }
    }
  }
}
.submit {
  height: 70rpx;
  width: 170rpx;
  border: 1rpx solid #7b7a7a;
  display: block;
  margin: 0 auto;
  line-height: 70rpx;
  text-align: center;
  font-size: 34rpx;
  letter-spacing: 7rpx;
  margin-top: 50rpx;
}
.color {
  font-size: 36rpx;
  padding: 0 40rpx;
  margin-top: 20rpx;
  margin-bottom: 20rpx;
  box-sizing: border-box;
}
.sp {
  width: 100%;
  display: flex;
  padding: 0 5%;
  view {
    height: 31px;
    line-height: 31px;
    padding: 0 15px;
    box-sizing: border-box;
    border: 2upx solid #7b7a7a;
    color: #7b7a7a;
    margin-right: 10px;
    &.on {
      border: solid 4upx #f47952;
      height: 31px;
      line-height: 31px;
      padding: 0 15px;
      box-sizing: border-box;
      color: #7b7a7a;
      margin-right: 10px;
    }
  }
}
.proChoose {
  display: flex;
  justify-content: space-between;
  padding: 0 30rpx;
  padding-bottom: 20rpx;
  border-bottom: 1rpx solid #ccc;
  box-sizing: border-box;
  background-color: #cacaca;
  .imgBox {
    display: flex;
    .img {
      image {
        width: 170rpx;
        height: 170rpx;
        margin-top: -40rpx;
        margin-right: 20rpx;
      }
    }
    .center {
      padding-top: 15rpx;
      font-size: 32rpx;
      .price {
        margin-top: 10rpx;
        color: #a46c4d;
        font-size: 36rpx;
      }
    }
  }
  .chacha {
    width: 50rpx;
    height: 50rpx;
    margin-top: 15rpx;
  }
}
.carousel-section {
  padding: 0;
  .titleNview-placing {
    padding-top: 0;
    height: 0;
  }
}
/* 头部 轮播图 */
.carousel-section {
  position: relative;
  // margin-bottom: 20upx;
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
.more {
  font-size: 32rpx;
  width: 100%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: right;
  padding: 0 50rpx;
  box-sizing: border-box;
  color: rgb(89, 87, 87);
}
.swiper-box {
  height: 610rpx;
}
.indexSwiperHeight {
  height: 900rpx;
  .swiper-item {
    display: block;
    height: 100%;
  }
  .bannerImg {
    height: 100%;
    background: linear-gradient(to bottom, #fff, #13175a);
  }
}
.swiper-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // height: 500rpx;
  color: #fff;
  .changeGoods {
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 30rpx 40rpx;
    box-sizing: border-box;
    .left {
      .changeTitle {
        font-size: 24rpx;
        color: #000;
      }
      .price {
        font-size: 24rpx;
        color: rgb(89, 87, 87);
        margin-top: 10rpx;
      }
    }
    .right {
      image {
        width: 70rpx;
        height: 70rpx;
      }
    }
  }
}
.swiperText {
  position: relative;
  top: -140rpx;
  left: 40rpx;
  color: #fff;
  z-index: 999;
  border: 1px solid #fff;
  font-size: 24rpx;
  border-radius: 50rpx;
  padding: 10rpx 20rpx;
  box-sizing: border-box;
  letter-spacing: 5rpx;
}
.active {
  border-style: solid;
  border-color: #007aff;
  border-width: 1px;
} // 商品描述
.title {
  padding: 60rpx 30rpx 30rpx 30rpx;
  box-sizing: border-box;
  .titleTop {
    font-size: 36rpx;
    color: #000;
  }
  .titleContent {
    font-size: 30rpx;
    color: rgb(128, 128, 128);
    margin-top: 10rpx;
  }
} // 兑换
.gift {
  height: 1000rpx;
  image {
    width: 100%;
  }
  .giftBox {
    position: relative;
    .inChage {
      position: absolute;
      bottom: 100rpx;
      left: 50rpx;
      color: #fff;
      z-index: 999;
      font-family: "Microsoft YaHei";
      border: 1px solid #fff;
      font-size: 24rpx;
      border-radius: 50rpx;
      padding: 15rpx 20rpx;
      letter-spacing: 5rpx;
    }
  }
} // 显示兑换
.changeTitleImg {
  width: 100%;
}
.newTitle {
  position: absolute;
  left: 4%;
  font-size: 36rpx;
  top: 6%;
  border-bottom: 2px solid #985656;
}
.exchange {
  margin-top: 60rpx; // .changeTitle {
  // 	image {
  // 		width: 100%;
  // 	}
  // }
}
// .changeGoods {
// 	display: flex;
// 	justify-content: space-between;
// 	padding: 30rpx 40rpx;
// 	box-sizing: border-box;
// 	.left {
// 		.changeTitle {
// 			font-size: 24rpx;
// 			color: #000;
// 		}
// 		.price {
// 			font-size: 24rpx;
// 			color: rgb( 89, 87, 87);
// 			margin-top: 10rpx;
// 		}
// 	}
// 	.right {
// 		image {
// 			width: 70rpx;
// 			height: 70rpx;
// 		}
// 	}
// } // 新品发布
.newGoods {
  margin-top: 60rpx;
  .goodsList {
    width: 100%;
    display: flex;
    overflow-x: scroll;
    white-space: nowrap;
    .listBox {
      // background: url('https://s2.loli.net/2022/08/08/Y51SrLa9xd7QcFM.png') no-repeat 100%;
      // background-size: cover;
      width: 900rpx;
      height: 300rpx;
      margin-right: 30rpx;
      .lisName {
        font-size: 28rpx;
        color: #fff;
        text-align: center;
        padding-top: 60rpx;
      }
      .btn {
        height: 60rpx;
        width: 170rpx; // padding: 0rpx 10rpx;
        line-height: 60rpx;
        text-align: center;
        margin: 0 auto;
        color: #fff;
        font-size: 28rpx;
        background-color: #bc8a6d;
        margin-top: 30rpx;
      }
      .price {
        display: flex;
        justify-content: space-between;
        padding: 0 20rpx;
        margin-top: 20rpx;
        box-sizing: border-box;
        .left {
          font-size: 26rpx;
          color: #fff;
        }
        .right {
          image {
            width: 60rpx;
            height: 60rpx;
          }
        }
      }
    }
  }
}
</style>
