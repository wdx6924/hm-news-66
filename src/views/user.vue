<template>
  <div class="user">
    <hm-header>个人中心</hm-header>
    <div class="header" @click="$router.push('/user-edit')">
      <div class="avatar">
        <img :src="$axios.defaults.baseURL + info.head_img" alt />
      </div>
      <div class="info">
        <p class="name">
          <span class="iconfont iconxingbienv" v-if="info.gender === 0"></span>
          <span class="iconfont iconxingbienan" v-else></span>
          {{ info.nickname }}
        </p>
        <p class="time">{{ info.create_date | time }}</p>
      </div>
      <div class="arrow">
        <p>
          <span class="iconfont iconjiantou1"></span>
        </p>
      </div>
    </div>
    <div class="nav">
      <hm-navbar @click="$router.push('/my-follow')">
        <template v-slot:title>我的关注</template>
        <template #content>关注的用户</template>
      </hm-navbar>
      <hm-navbar @click="$router.push('/my-comments')">
        <template v-slot:title>我的跟帖</template>
        <template #content>跟帖/回复</template>
      </hm-navbar>
      <hm-navbar @click="$router.push('/my-star')">
        <template v-slot:title>我的收藏</template>
        <template #content>文章/视频</template>
      </hm-navbar>
      <hm-navbar @click="$router.push('/user-edit')">
        <template v-slot:title>设置</template>
      </hm-navbar>
      <hm-navbar @click="exit">
        <template v-slot:title>退出</template>
      </hm-navbar>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      info: {}
    }
  },
  async created() {
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.info = data
    }
  },
  methods: {
    async exit() {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '确定要退出系统吗'
        })
        this.$toast('退出成功')
        this.$router.push('/login')
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
      } catch {
        this.$toast('取消退出')
      }
    }
  }
}
</script>

<style lang="less" scoped>
.user {
  .header {
    display: flex;
    height: 120px;
    border-bottom: 5px solid #e4e4e4;
    padding: 0 20px;
    align-items: center;
  }
  .avatar {
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
  }
  .info {
    flex: 1;
    font-size: 16px;
    padding-left: 20px;
    .time {
      margin-top: 10px;
      color: #a0a0a0;
    }
    .iconxingbienan {
      color: #7cb5e0;
    }
    .iconxingbienv {
      color: #f23dbd;
    }
  }
  .arrow {
    align-items: right;
  }
  .nav {
    padding-left: 20px;
  }
}
</style>
