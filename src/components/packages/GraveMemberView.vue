/* eslint-disable @typescript-eslint/no-explicit-any */
<template>
  <div class="lv-banner-container">
    <div class="member_container">
      <div class="member_item" v-for="(item, index) in memberList" :key="index">
        <div class="member_item_left">
          <div class="familt-cover" @click="getDetail(item)">
            <van-image width="100%" height="100%" :src="getAvatar(item)" />
            <div class="msg">查看详情</div>
          </div>
        </div>
        <div class="member_item_right">
          <div class="member_name">
            {{ item.identity }}
            {{ item.name }}
          </div>
          <div class="member_msg">
            <label>生於:</label>
            {{ item.birth_time || "-" }}
          </div>
          <div class="member_msg">
            <label>殁於:</label>
            {{ item.die_time || "-" }}
          </div>
          <!-- <div class="member_desc ">
            <div class="desc_name">简介:</div>
            <div class="desc_content">{{ dataInfo.desc || "-" }}</div>
          </div> -->
        </div>
      </div>
      <div class="background"></div>
    </div>

    <div v-if="showRelation" class="lv-banner-btn" @click="entry">查 看 子 女 关 系</div>
    <LoginGrave v-if="loginShow" :graveInfo="graveInfo" @close="loginCancel" @login="login"></LoginGrave>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import api from '@/api'
import { mapMutations } from 'vuex'
import { lvDataParser, imgUrlParser } from '@/utils/Parser'
import LoginGrave from '../base/loginGrave.vue'
export default defineComponent({
  name: 'GraveMemberView',
  data () {
    return {
      code: this.$route.params.code,
      graveInfo: {},
      memberList: [],
      imgUrlParser: imgUrlParser,
      loginShow: false
    }
  },
  props: {
    includeMate: {
      default: 0
    },
    showRelation: {
      default: 1
    }
  },
  async created () {
    this.getMasterInfo()
    this.getGraveInfo()
  },
  methods: {
    ...mapMutations([
      'setMemberDetailShow',
      'setMemberDetail'
    ]),
    async getMasterInfo () {
      const res = await api.getMasterInfo({
        code: this.code
      })
      this.memberList = [res]
      if (this.includeMate && res.mate) {
        this.memberList.push({
          ...res.mate,
          isMate: true
        })
      }
    },
    async getGraveInfo () {
      const res = await api.getGraveInfo({
        code: this.code
      })
      this.graveInfo = res
    },
    getAvatar (item) {
      let avatar = ''
      if (!item.avatar) {
        avatar = item.sex === 1 ? require('@/assets/111.jpeg') : require('@/assets/222.jpeg')
      } else {
        avatar = imgUrlParser(item.avatar)
      }
      return avatar
    },
    entry () {
      if (this.graveInfo.password) {
        this.loginShow = true
      } else {
        this.$router.push({ name: 'memberTree' })
      }
    },
    async getDetail (item) {
      let apiUrl = 'getMemberDetail'
      if (item.isMate) {
        apiUrl = 'getMateDetail'
      }
      const itemDetail = await api[apiUrl]({
        code: this.code,
        id: item.id
      })
      this.setMemberDetail(itemDetail)
      this.setMemberDetailShow(true)
    },
    login () {
      this.$router.push({ name: 'memberTree' })
    },
    loginCancel () {
      this.loginShow = false
    }
  },
  components: { LoginGrave }
})
</script>

<style lang="less" scoped>
.lv-banner-container {
  position: relative;
  z-index: 1;
  // padding: 10px 10px 0;
  background: #ffffff2e;
  overflow: hidden;

  .member_container {
    position: relative;

    .member_item {
      padding: 0 10px 10px;
      display: flex;
      height: 120px;
      overflow: hidden;
      &:first-child  {
        padding-top: 10px;
      }

      .member_item_left {
        padding: 0 10px;

        .familt-cover {
          width: 90px;
          height: 120px;
          position: relative;

          img {
            width: 100%;
            height: 100%;
          }
          .msg {
          font-size: 14px;
          display: inline-block;
          position: absolute;
          text-align: center;
          width: 100%;
          bottom: 0;
          right: 0;
          left: 0;
          color: #fff;
          background: rgba(22, 20, 20, 0.19);
        }
        }
      }

      .member_item_right {
        flex: 1;
        padding: 10px;

        .member_name {
          font-size: 17px;
          font-weight: 500;
          color: #000;
          margin-bottom: 15px;
        }

        .member_msg {
          font-size: 15px;
          color: #606266;
          margin-bottom: 10px;
        }

        .member_desc {
          display: flex;
          width: 100%;
          font-size: 14px;
          color: #606266;
          margin-bottom: 5px;

          .desc_name {
            width: 35px;
          }

          .desc_content {
            flex: 1;
            white-space: pre-wrap;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 1;
            -webkit-box-orient: vertical;
          }
        }
      }
    }

    .background {
      position: absolute;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      z-index: -10;
      background: url("~@/assets/background.png") no-repeat transparent;
      background-size: 100% 100%;
      opacity: 0.7;
    }
  }

  .lv-banner-btn {
    margin: 10px 10px 0;
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
}</style>
