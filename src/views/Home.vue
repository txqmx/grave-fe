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
import GraveMemberView from '@/components/packages/GraveMemberView.vue'
import GraveEntryView from '@/components/packages/GraveEntryView.vue'
import GraveImgSwiper from '@/components/packages/GraveImgSwiper.vue'
import GraveImgView from '@/components/packages/GraveImgView.vue'
import GraveDeatilView from '@/components/packages/GraveDeatilView.vue'
import { mapMutations } from 'vuex'
export default defineComponent({
  components: { GraveMemberView, GraveEntryView, GraveImgSwiper, GraveDeatilView, GraveImgView },
  name: 'Home',
  data () {
    return {
      code: this.$route.params.code,
      config: []
    }
  },
  created () {
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
