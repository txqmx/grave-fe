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
      timeList: [
        {
          timestamp: '2018/4/12',
          content: 'xxxx'
        },
        {
          timestamp: '2018/4/12',
          content: 'xxxx'
        }
      ]
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
.lv-timeline-container {
  position: relative;
  height: 190px;
  width: 100%;
}
</style>
