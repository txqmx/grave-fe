/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="lv-entry-container">
    <div class="lv-banner-btn" @click="entry">
      查 看 子 女 关 系
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  name: 'GraveEntryView',
  methods: {
    entry () {
      this.$router.push({ name: 'memberTree' })
    }
  }
})
</script>

<style lang="less" scoped>
.lv-entry-container {
  position: relative;
  padding: 0 10px 0;
  background: #ffffff2e;
  overflow: hidden;

  .lv-banner-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 6px;
    background: #ff976a;
    border-radius: 6px;
    color: #ffffff;
    font-size: 16px;
    font-weight: bold;
  }
}
</style>
