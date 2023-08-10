<template>
  <div v-if="imgs && imgs.length" class="lv-swiper-container">
    <van-swipe
      class="my-swipe"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item v-for="(item, index) in imgs" :key="index">
        <van-image
          width="100%"
          height="100%"
          :src="imgUrlParser(item)"
          fit="fill"
        />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lvDataParser, imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  name: 'GraveImgSwiper',
  data () {
    return {
      imgUrlParser: imgUrlParser
    }
  },
  props: {
    imgs: {
      type: Array,
      default: () => []
    }
  }
})
</script>

<style lang="less" scoped>
.lv-swiper-container {
  position: relative;
  height: 190px;
  width: 100%;
  .my-swipe {
    height: 190px;
    width: 100%;
    .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
    }
  }
}
</style>
