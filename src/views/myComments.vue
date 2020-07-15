<template>
  <div class="my-comments">
    <hm-header>我的跟帖</hm-header>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="onLoad"
        :immediate-check="false"
      >
        <div class="item" v-for="item in list" :key="item.id">
          <p class="time">{{item.create_date | time('YYYY-MM-DD HH:mm')}}</p>
          <div class="parent" v-if="item.parent">
            <p>回复：{{item.parent.user.nickname}}</p>
            <p>{{item.parent.content}}</p>
          </div>
          <div class="content">
            <p>{{item.content}}</p>
          </div>
          <div class="link">
            <span class="one-txt-cut">原文:{{item.post.title}}</span>
            <span class="iconfont iconjiantou1"></span>
          </div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list: [],
      pageIndex: 1,
      pageSize: 5,
      loading: false,
      finished: false
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const res = await this.$axios.get('/user_comments', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize
        }
      })
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = [...data, ...this.list]
        if (data.length < 5) {
          this.finished = true
        }
        this.pageIndex++
        this.loading = false
      }
    },
    onLoad() {
      this.getList()
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  border-bottom: 1px solid #cccccc;
  font-size: 14px;
  padding: 0 30px;
  .time {
    color: #999;
    margin: 20px 0;
  }
  .parent {
    background-color: #e4e4e4;
    padding: 10px;
    color: #999;
    line-height: 30px;
  }
  .content {
    margin: 20px 0;
  }
  .link {
    padding-bottom: 10px;
    color: #999;
    display: flex;
    justify-content: space-between;
    span:first-child {
      width: 80%;
    }
  }
}
</style>
