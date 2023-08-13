<template>
  <van-popup v-model:show="dialogVisible" position="bottom" closeable round teleport="body">
    <div class="member_container">
      <div class="member_content">
        <div class="member_base_info">
          <van-row>
            <van-col span="12">名字: {{ currentItem.name }}</van-col>
            <van-col span="12">性别: {{ currentItem.sex === 1 ? "男" : "女" }}</van-col>
          </van-row>
          <van-row>
            <van-col span="12">生年: {{ currentItem.birth_time || "-" }}</van-col>
            <van-col v-if="currentItem.is_die" span="12">卒年: {{ currentItem.die_time || "-" }}</van-col>
          </van-row>
          <van-row>
            <van-col span="24">籍贯: {{ currentItem.native || "-" }}</van-col>
          </van-row>
        </div>
        <div v-if="currentItem.desc" class="member_desc">
          {{ currentItem.desc }}
        </div>
        <div class="html_content" v-html="currentItem.detail"></div>
        <div v-if="currentItem.timeline">
          <GraveTimeline :timeline="currentItem.timeline"></GraveTimeline>
        </div>
      </div>
    </div>
</van-popup>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { mapMutations } from 'vuex'
import GraveTimeline from './packages/GraveTimeline.vue'
export default defineComponent({
  components: { GraveTimeline },
  name: 'MemberDetail',
  data () {
    return {}
  },
  computed: {
    dialogVisible: {
      get () {
        return this.$store.state.memberDetailShow
      },
      set (val) {
        if (!val) {
          this.handleClose()
        }
      }
    },
    currentItem () {
      return this.$store.state.memberDetail
    }
  },
  watch: {
    dialogVisible (val) {
      if (val) {
        window.history.pushState(null, null, window.location.hash)
        window.addEventListener('popstate', this.handleClose, false)
      } else {
        window.removeEventListener('popstate', this.handleClose, false)
      }
    }
  },
  methods: {
    ...mapMutations(['setMemberDetailShow', 'setMemberDetail']),
    handleClose (e) {
      if (!e || e.type !== 'popstate') {
        window.history.back()
      }
      this.setMemberDetail('')
      this.setMemberDetailShow(false)
    },
    dateFormat (date) {
      if (!date) {
        return '-'
      }
      const newDate = new Date(date)
      var Y = newDate.getFullYear() + '-'
      var M =
        (newDate.getMonth() + 1 < 10
          ? '0' + (newDate.getMonth() + 1)
          : newDate.getMonth() + 1) + '-'
      var D =
        (newDate.getDate() < 10 ? '0' + newDate.getDate() : newDate.getDate()) +
        ' '
      return Y + M + D
    }
  }
})
</script>

<style scoped lang="less">
.member_container {
  height: 60vh;
  padding: 50px 15px 30px 15px;
  overflow: hidden;
  font-size: 15px;
  line-height: 2;
  color: #6b7166;

  .member_content {
    padding-top: 10px;
    height: 100%;
    overflow: auto;

    .member_base_info {
      padding: 0 10px;
      margin-bottom: 15px;

      .van-row {
        margin-bottom: 5px;
      }
    }

    .member_desc {
      margin-bottom: 20px;
      padding: 10px;
      border-radius: 8px;
      background: #fcf7efb6;
    }

    .html_content {
      padding: 0 10px;
    }
  }
}
</style>
