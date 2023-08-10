<template>
  <div v-if="videoUrl" class="lv-video-container">
    <div id="lv-video"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Player from 'xgplayer'
import { imgUrlParser } from '@/utils/Parser'
import { overPlay } from '@/utils/MediaControl'
export default defineComponent({
  name: 'GraveAudioView',
  data () {
    return {
      video: null,
      status: 'pause'
    }
  },
  props: {
    videoUrl: {
      default: ''
    }
  },
  mounted () {
    if (this.videoUrl) {
      this.init()
    }
  },
  computed: {
    sourceUrl () {
      return imgUrlParser(this.videoUrl)
    }
  },
  methods: {
    init () {
      this.video = new Player({
        id: 'lv-video',
        url: this.sourceUrl,
        fluid: true
      })
      this.video.on('play', () => {
        console.log('play')
        overPlay(this.sourceUrl)
        this.status = 'play'
      })
      this.video.on('pause', () => {
        console.log('pause')
        this.status = 'pause'
      })
    }
  }
})
</script>

<style lang="less" scoped>
.v-video-container{
  height: 190px;
  width: 100%;
}

</style>
