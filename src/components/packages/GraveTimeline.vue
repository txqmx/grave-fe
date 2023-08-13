<template>
  <div class="lv-timeline-container">
    <el-timeline>
      <el-timeline-item
        v-for="(item, index) in timeList"
        :key="index"
        :timestamp="item.timestamp"
      >
        <div>{{ item.content }}</div>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<script lang="ts">
import ElTimeline from '@/components/base/timeline.vue'
import ElTimelineItem from '@/components/base/timeline-item.vue'
import { defineComponent } from 'vue'
export default defineComponent({
  components: { ElTimeline, ElTimelineItem },
  name: 'GraveTimeline',
  data () {
    return {
      timeList: []
    }
  },
  props: {
    timeline: {
      default: ''
    }
  },
  created () {
    this.timeList = this.timeline ? JSON.parse(this.timeline) : []
  }
})
</script>

<style lang="less" scoped>
.lv-timeline-container {
  position: relative;
  padding: 10px 0;
  width: 100%;
}
</style>
