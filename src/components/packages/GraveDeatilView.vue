<template>
  <lv-card-container :title="title" @more="entryMore" :isExpanded="true">
    <div v-html="detail"></div>
  </lv-card-container>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { lvDataParser } from '@/utils/Parser'
import LvCardContainer from '@/components/layout/LvCardContainer.vue'
export default defineComponent({
  name: 'GraveDeatilView',
  components: { LvCardContainer },
  data () {
    return {
      expanded: false,
      dataInfo: {
        detail: '',
        moreEntry: ''
      }
    }
  },
  props: {
    title: {
      type: String,
      default: '简介'
    },
    detail: {
      type: String,
      default: ''
    }
  },
  async created () {
    // this.dataInfo = await lvDataParser(this.dataInfo, this.prop)
  },
  methods: {
    entryMore () {
      if (this.prop.detail.moreEntry) {
        this.$router.push(this.prop.detail.moreEntry)
      }
    }
  }
})
</script>

<style lang="less" scoped></style>
