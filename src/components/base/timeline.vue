<template>
  <ul class="el-timeline">
    <slot></slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {

    }
  },
  props: {
    reverse: {
      type: Boolean,
      default: false
    }
  },
  provide () {
    return {
      timeline: this
    }
  }

})
</script>

<style lang="less" scoped>
.el-timeline {
    margin: 0;
    font-size: 14px;
    list-style: none;
}
</style>
