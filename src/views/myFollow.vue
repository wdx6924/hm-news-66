<template>
  <div class="my-follow">
    <hm-header>我的关注</hm-header>
    <div class="list">
      <div class="item" v-for="item in list" :key="item.id">
        <div class="avatar">
          <img :src="$axios.defaults.baseURL + item.head_img" alt />
        </div>
        <div class="info">
          <p>{{item.nickname}}</p>
          <p class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</p>
        </div>
        <div class="btn">
          <van-button round type="info" @click="unfollow(item.id)">取消关注</van-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: []
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/user_follows')
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    async unfollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getList()
      }
    }
  }
}
</script>

<style lang='less' scoped>
.item {
  height: 100px;
  padding: 0 20px;
  display: flex;
  border-bottom: 1px solid #cccccc;
  align-items: center;
  justify-items: space-between;
  .avatar {
    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }
  .info {
    margin-left: 10px;
    font-size: 16px;
    flex: 1;
    .time {
      color: #999;
      font-size: 14px;
      margin-top: 3px;
    }
  }
  .btn {
    .van-button {
      height: 30px;
      width: 82px;
      font-size: 10px;
    }
  }
}
</style>
