<template>
  <div v-if="img" class="img_container">
    <van-image width="100%" height="100%" :src="imgUrlParser(img)" fit="fill"/>
  </div>

</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  name: 'GraveImgView',
  data () {
    return {
      imgUrlParser: imgUrlParser
    }
  },
  props: {
    img: {
      type: String,
      default: ''
    }
  }
})
</script>

<style lang="less" scoped>
.img_container{
  height: 180px;
  width: 100%;
}
</style>
