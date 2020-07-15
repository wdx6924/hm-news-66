<template>
  <div class="home">
    <div class="header">
      <div class="icon">
        <span class="iconfont iconnew"></span>
      </div>
      <div class="search-box" @click="$router.push('/post-search')">
        <div class="search">
          <span class="iconfont iconsearch"></span>
          <span>搜索新闻</span>
        </div>
      </div>
      <div class="user" @click="$router.push('/user')">
        <span class="iconfont iconwode"></span>
      </div>
    </div>
    <van-sticky>
      <div class="manage" @click="$router.push('/manage')">
        <span class="iconfont iconicon-test"></span>
      </div>
    </van-sticky>
    <!-- 导航栏 -->
    <van-tabs v-model="active" sticky animated swipeable>
      <van-tab :title="item.name" v-for="item in navList" :key="item.id">
        <van-pull-refresh v-model="refreshing" @refresh="onRefresh">
          <van-list
            v-model="loading"
            :finished="finished"
            finished-text="没有更多了"
            @load="onLoad"
            :immediate-check="false"
            :offset="50"
          >
            <hm-post
              v-for="post in postList"
              :key="post.id"
              :post="post"
            ></hm-post>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
export default {
  name: 'home',
  data() {
    return {
      active: 0,
      navList: [],
      postList: [],
      pageIndex: 1,
      pageSize: 5,
      finished: false,
      loading: false,
      refreshing: false
    }
  },
  created() {
    const active = JSON.parse(localStorage.getItem('active'))
    if (active) {
      this.navList = active
      this.getPostList(this.navList[0].id)
    } else {
      this.getNavList()
    }
  },
  methods: {
    async getNavList() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.navList = data
        this.getPostList(this.navList[0].id)
      }
    },
    async getPostList(id) {
      const res = await this.$axios.get('/post', {
        params: {
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          category: id
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.postList = [...this.postList, ...data]
        this.loading = false
        if (data.length < this.pageSize) {
          this.finished = true
        }
        this.refreshing = false
      }
    },
    onLoad() {
      this.pageIndex++
      this.getPostList(this.navList[this.active].id)
    },
    onRefresh() {
      this.postList = []
      this.pageIndex = 1
      this.getPostList(this.navList[this.active].id)
    }
  },
  watch: {
    active(value) {
      this.pageIndex = 1
      this.postList = []
      this.loading = true
      this.finished = false
      this.getPostList(this.navList[value].id)
    }
  }
}
</script>

<style lang="less" scoped>
.home {
  .header {
    background-color: red;
    display: flex;
    height: 54px;
    line-height: 54px;
    text-align: center;
    width: 100%;
    justify-content: space-between;
    padding: 0 10px;
    .icon,
    .user {
      width: 50px;
    }
    .icon {
      span {
        font-size: 50px;
        color: white;
      }
    }
    .user {
      span {
        font-size: 24px;
        color: white;
      }
    }
    .search-box {
      flex: 1;
      padding-top: 10px;
      .search {
        height: 34px;
        line-height: 34px;
        background-color: rgba(255, 255, 255, 0.5);
        border-radius: 17px;
        margin: 0 10px;
        font-size: 14px;
        text-align: center;
        color: white;
        span {
          margin-right: 5px;
        }
      }
    }
  }
  /deep/ .van-tabs .van-sticky {
    width: 90%;
  }
  .manage {
    width: 10%;
    position: absolute;
    right: 0;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #fff;
    z-index: 999;
  }
}
</style>
