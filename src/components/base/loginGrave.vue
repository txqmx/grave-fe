<template>
  <van-dialog  v-model:show="loginShow" title="请输入密码" show-cancel-button @confirm="login" @cancel="loginCancel" :beforeClose="beforeClose">
    <van-field ref="password" v-model="password" type="password" placeholder="请输入密码" autofocus/>
  </van-dialog>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
export default defineComponent({
  data () {
    return {
      loginShow: false,
      password: ''
    }
  },
  props: {
    graveInfo: {
      // eslint-disable-next-line @typescript-eslint/no-empty-function
      default: () => {}
    }
  },
  created () {
    this.loginShow = true
    document.onkeydown = (e) => {
      if (e && e.key === 'Enter') {
        this.login()
      }
    }
    window.history.pushState(null, null, window.location.hash)
    window.addEventListener('popstate', this.loginCancel, false)
  },
  beforeUnmount () {
    window.removeEventListener('popstate', this.loginCancel, false)
    document.onkeydown = null
  },
  methods: {
    login () {
      this.$refs.password.focus()
      if (!this.password) {
        this.$toast('请输入密码')
        return
      }
      if (this.password === this.graveInfo.password) {
        this.loginCancel()
        setTimeout(() => {
          this.$emit('login')
        }, 100)
      } else {
        this.$toast('密码错误')
      }
    },
    loginCancel (e) {
      if (!e || e.type !== 'popstate') {
        window.history.back()
      }
      this.password = ''
      this.$emit('close')
    },
    beforeClose () {
      return false
    }
  }

})
</script>

<style lang="less" scoped>
</style>
