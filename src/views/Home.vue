<template>
  <div class="home">
    <template v-for="(item, index) in config" :key="index">
      <component :is="item.component" v-bind="item.data"></component>
    </template>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/api'
import { getUrlParam } from '@/utils/Url'
import GraveImgSwiper from '@/components/packages/GraveImgSwiper.vue'
import GraveDeatilView from '@/components/packages/GraveDeatilView.vue'
import { mapMutations } from 'vuex'
import LvMemberSwiper from '@/components/packages/LvMemberSwiper.vue'
import LvImgAlbum from '@/components/packages/LvImgAlbum.vue'
import LvVideoView from '@/components/packages/LvVideoView.vue'
import GraveMemberView from '@/components/packages/GraveMemberView.vue'
import LvNoticeView from '@/components/packages/LvNoticeView.vue'
import LvMenu from '@/components/packages/LvMenu.vue'
export default defineComponent({
  components: { GraveImgSwiper, GraveDeatilView, LvMemberSwiper, LvImgAlbum, LvVideoView, GraveMemberView, LvNoticeView, LvMenu },
  name: 'Home',
  data () {
    return {
      code: '',
      config: []
    }
  },
  created () {
    this.code = this.$route.params.code
    this.getHomeInfo()
  },

  methods: {
    ...mapMutations(['setLoading']),
    // 获取首页配置
    async getHomeInfo () {
      this.$setLoading(true)
      const data = await api.getHomeInfo({
        code: this.code
      })
      this.config = data || []
      this.$setLoading(false)
    }
  }

})
</script>

<style scoped lang="less">
.home{
  overflow: auto;
  height: 100%;
  margin-bottom: 20px;
  & > div{
    margin-bottom: 16px;
    border-radius: 10px;
  }
}

</style>
