<template>
  <div v-if="audioUrl" class="lv-audio-container">
    <div :class="['music_btn',status === 'play'? 'rotate': '']" @click="handleClick"></div>
    <div id="lv-audio"></div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import 'xgplayer'
import Music from 'xgplayer-music'
import { imgUrlParser } from '@/utils/Parser'
export default defineComponent({
  name: 'LvAudioView',
  data () {
    return {
      music: null,
      status: 'pause'

    }
  },
  props: {
    audioUrl: {
      default: ''
    }
  },
  mounted () {
    if (this.audioUrl) {
      this.init()
    }
  },
  methods: {
    init () {
      this.music = new Music({
        id: 'lv-audio',
        url: [{ src: imgUrlParser(this.audioUrl), name: '' }],
        mode: 'loop',
        status: 'off',
        controls: true,
        ignores: ['next', 'forward', 'backward', 'prev', 'cover', 'name', 'time']
      })
      this.music.on('play', () => {
        console.log('play')
        this.status = 'play'
      })
      this.music.on('pause', () => {
        console.log('pause')
        this.status = 'pause'
      })
    },
    handleClick () {
      if (this.status === 'play') {
        this.music.pause()
      } else {
        this.music.play()
      }
    }
  }
})
</script>

<style lang="less" scoped>
.rotate {
  animation: rotate 1.5s infinite linear;
  transform-origin: center;
}
@keyframes rotate {
  from {
    transform: rotate(0);
  }
  to {
    transform: rotate(360deg);
  }
}
.lv-audio-container {
  // display: inline-block;
  width: 36px;
  height: 36px;
  position: absolute;
  top: 10px;
  right: 10px;
  z-index: 1000;
  overflow: hidden;
  .music_btn{
    width: 36px;
    height: 36px;
    background: url("~@/assets/musicBtn.png") no-repeat transparent;
    background-size: 100% 100%;
  }
  #lv-audio {
    position: absolute;
    // width: 100% !important;
    // height: 100% !important;
    background: none;
  }
}
</style>
