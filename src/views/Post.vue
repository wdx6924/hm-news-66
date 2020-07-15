<template>
  <div class="post">
    <div class="header">
      <div class="left" @click="$router.back()">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="right">
        <span class="follow" v-if="post.has_follow === false" @click="follow"
          >关注</span
        >
        <span v-else @click="unfollow">已关注</span>
      </div>
    </div>
    <div class="content">
      <div class="title">
        <p>{{ post.title }}</p>
      </div>
      <div class="author">
        <span class="nickname">{{ post.user.nickname }}</span>
        <span class="time">{{ post.create_date | time }}</span>
      </div>
      <div class="txt" v-html="post.content" v-if="post.type === 1"></div>
      <div class="video" v-else>
        <video :src="post.content" controls></video>
      </div>
      <div class="footer">
        <div
          class="good"
          @click="like(post.id)"
          :class="{ like: post.has_like }"
        >
          <span class="iconfont icondianzan"></span>
          <span>{{ post.like_length }}</span>
        </div>
        <div class="share">
          <span class="iconfont iconweixin"></span>
          <span>微信</span>
        </div>
      </div>
    </div>
    <div class="comment">
      <h5>精彩跟贴</h5>
      <hm-comment
        v-for="item in list"
        :key="item.id"
        :comment="item"
        @reply="reply"
      ></hm-comment>
      <div class="more">更多跟帖</div>
    </div>
    <div class="foot">
      <div class="input" v-if="!isShowTextarea">
        <input type="text" placeholder="写跟帖" @focus="focus" />
        <span class="iconfont iconpinglun-">
          <div class="badge">{{ post.comment_length }}</div>
        </span>
        <span
          class="iconfont iconshoucang"
          @click="star"
          :class="{ active: post.has_star }"
        ></span>
        <span class="iconfont iconfenxiang"></span>
      </div>
      <div class="textarea" v-else>
        <textarea
          :placeholder="'回复：' + replyName"
          ref="textarea"
          v-model="content"
          @blur="blur"
        ></textarea>
        <span @click="send">发送</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      post: {
        user: {}
      },
      list: [],
      isShowTextarea: false,
      content: '',
      replyId: '',
      replyName: ''
    }
  },
  created() {
    this.getPostDetails()
    this.getCommentList()
    this.$bus.$on('reply', this.replayFn)
  },
  destroyed() {
    this.$bus.$off('reply', this.replayFn)
  },
  methods: {
    async replayFn(name, id) {
      this.replyName = name
      this.replyId = id
      this.isShowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async getPostDetails() {
      const res = await this.$axios.get(`/post/${this.$route.params.id}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.post = data
      }
    },
    async follow(id) {
      // 判断有没有登录
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '登录后才能关注，是否去登录？'
          })
          localStorage.setItem('backUrl', this.$route.path)
          this.$router.push('/login')
        } else {
          const res = await this.$axios.get(
            `/user_follows/${this.post.user.id}`
          )
          const { statusCode, message } = res.data
          if (statusCode === 200) {
            this.$toast.success(message)
            this.getPostDetails(this.$route.params.id)
          }
        }
      } catch {
        this.$toast('继续浏览')
      }
    },
    async unfollow(id) {
      const res = await this.$axios.get(`/user_unfollow/${this.post.user.id}`)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getPostDetails(this.$route.params.id)
      }
    },
    async like(id) {
      try {
        // 判断是否登录
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '需要登录才能点赞哦~是否要登录？'
          })
          localStorage.setItem('backUrl', this.$route.path)
          this.$router.push('/login')
        } else {
          const res = await this.$axios.get(`/post_like/${id}`)
          const { statusCode, message } = res.data
          if (statusCode === 200) {
            this.$toast.success(message)
            this.getPostDetails(this.post.id)
          }
        }
      } catch {
        this.$toast('继续浏览')
      }
    },
    async star() {
      // 判断是否登录
      try {
        const token = localStorage.getItem('token')
        if (!token) {
          await this.$dialog.confirm({
            title: '温馨提示',
            message: '登录后才能点击收藏，是否登录？'
          })
          this.$router.push('/login')
          localStorage.setItem('backUrl', this.$route.path)
          return
        }
        const res = await this.$axios.get(`/post_star/${this.post.id}`)
        console.log(res)
        const { statusCode, message } = res.data
        if (statusCode === 200) {
          this.$toast.success(message)
          this.getPostDetails(this.post.id)
        }
      } catch {
        this.$toast('继续浏览')
      }
    },
    async getCommentList() {
      const res = await this.$axios.get(
        `/post_comment/${this.$route.params.id}`
      )
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(this.list)
      }
    },
    async focus() {
      this.isShowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async send() {
      const res = await this.$axios.post(
        `/post_comment/${this.$route.params.id}`,
        {
          content: this.content,
          parent_id: this.replyId
        }
      )
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getCommentList()
        this.getPostDetails()
        this.isShowTextarea = false
        this.content = ''
        this.replyId = ''
        this.replyName = ''
      }
    },
    async reply(name, id) {
      console.log(name, id)
      this.replyName = name
      this.replyId = id
      this.isShowTextarea = true
      await this.$nextTick()
      this.$refs.textarea.focus()
    },
    async blur() {
      if (!this.content) {
        this.isShowTextarea = false
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post {
  padding-bottom: 100px;
  .header {
    height: 50px;
    display: flex;
    padding: 0 10px;
    line-height: 40px;
    align-items: center;

    .left {
      font-size: 22px;
    }
    .center {
      flex: 1;
      height: 40px;
      line-height: 40px;
      span {
        font-size: 58px;
      }
    }
    .right {
      span {
        display: inline-block;
        width: 65px;
        height: 30px;
        font-size: 14px;
        border: 1px solid #ccc;
        border-radius: 15px;
        text-align: center;
        line-height: 30px;
      }
      .follow {
        background-color: red;
        color: #fff;
        border: none;
      }
    }
  }
  .content {
    padding: 20px 0;
    border-bottom: 3px solid #ccc;

    .title {
      padding: 0 10px;

      p {
        font-size: 18px;
        font-weight: 700;
      }
    }
    .author {
      padding: 0 10px;

      span {
        font-size: 14px;
        color: #999;
        margin-right: 15px;
      }
    }
    .txt {
      padding: 0 10px;

      font-size: 16px;
      margin: 20px 0;
      /deep/ img {
        width: 100%;
      }
    }
    .video {
      padding: 0 10px;

      margin: 20px 0;
      video {
        width: 100%;
      }
    }
    .footer {
      display: flex;
      justify-content: space-around;
      .good,
      .share {
        width: 80px;
        height: 30px;
        // line-height: 30px;
        font-size: 14px;
        border-radius: 15px;
        border: 1px solid #ccc;
        text-align: center;
        span {
          margin-right: 5px;
        }
        span:last-child {
          line-height: 30px;
        }
      }
      .like {
        border: 1px solid red;
        color: red;
      }
      .iconweixin {
        color: #2ed254;
      }
    }
  }
  .foot {
    .input {
      padding: 0 10px;
      width: 100%;
      position: fixed;
      bottom: 0;
      background-color: #ffff;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 50px;
      input {
        width: 180px;
        height: 30px;
        font-size: 14px;
        border: none;
        border-radius: 15px;
        background-color: #ddd;
        padding-left: 10px;
      }
      span {
        font-size: 26px;
      }
      .iconpinglun- {
        position: relative;
        .badge {
          width: 30px;
          height: 20px;
          line-height: 20px;
          background-color: red;
          font-size: 12px;
          text-align: center;
          border-radius: 10px;
          color: #fff;
          position: absolute;
          top: -11px;
          left: 4px;
        }
      }
      .active {
        color: red;
      }
    }
    .textarea {
      padding: 10px 15px;
      display: flex;
      justify-content: space-around;
      align-items: flex-end;
      height: 120px;
      width: 100%;
      position: fixed;
      bottom: 0;
      background-color: #fff;
      textarea {
        width: 260px;
        height: 90px;
        font-size: 16px;
        border-radius: 10px;
        background-color: #d7d7d7;
        border: none;
        padding: 10px;
        resize: none;
      }
      span {
        display: inline-block;
        background-color: red;
        font-size: 14px;
        width: 60px;
        height: 26px;
        line-height: 26px;
        border-radius: 13px;
        text-align: center;
        color: #fff;
      }
    }
  }
  .comment {
    padding: 20px 0;
    position: relative;
    h5 {
      font-weight: 400;
      text-align: center;
    }
    .more {
      margin-top: 20px;
      width: 120px;
      height: 30px;
      border: 1px solid rgb(121, 121, 121);
      border-radius: 15px;
      font-size: 16px;
      text-align: center;
      line-height: 30px;
      position: absolute;

      left: 50%;
      transform: translateX(-50%);
    }
  }
}
</style>
