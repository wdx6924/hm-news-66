<template>
  <div class="post-search">
    <div class="header">
      <div class="left" @click="back">
        <span class="iconfont iconjiantou2"></span>
      </div>
      <div class="center">
        <input
          type="text"
          placeholder="通灵兽消失术"
          @input="input"
          v-model="keyword"
          @keyup.enter="search"
        />
        <span class="iconfont iconsearch"></span>
      </div>
      <div class="right" @click="search">搜索</div>
    </div>
    <div class="recommend" v-if="recommendList.length > 0">
      <div
        class="item one-txt-cut"
        v-for="item in recommendList"
        :key="item.id"
        @click="recommend_search(item.title)"
      >
        {{item.title}}
        <span class="iconfont iconjiantou1"></span>
      </div>
    </div>
    <div class="searchPost" v-else-if="list.length > 0">
      <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
    </div>
    <div class="content" v-else>
      <div class="history">
        <h6>历史记录</h6>
        <div
          class="one-txt-cut"
          v-for="item in history"
          :key="item"
          @click="history_search(item)"
        >{{item}}</div>
      </div>
      <hr />
      <div class="hot">
        <h6>热门搜索</h6>
        <div v-for="item in hot" :key="item" @click="hot_search(item)">{{item}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import _ from 'lodash'
export default {
  data() {
    return {
      keyword: '',
      list: [],
      history: [],
      hot: ['月季的嫁接技术', '水猴子', '大熊猫', '乘风破浪的姐姐'],
      recommendList: []
    }
  },
  created() {
    this.history = JSON.parse(localStorage.getItem('history')) || []
  },
  methods: {
    input: _.debounce(async function() {
      if (!this.keyword) {
        return
      }
      const res = await this.$axios.get('/post_search_recommend', {
        params: {
          keyword: this.keyword
        }
      })
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.recommendList = data
        console.log(this.recommendList)
      }
    }, 1000),
    async search() {
      this.recommendList = []
      this.history = this.history.filter(item => item !== this.keyword)
      this.history.unshift(this.keyword)
      localStorage.setItem('history', JSON.stringify(this.history))
      const res = await this.$axios.get(`/post_search?keyword=${this.keyword}`)
      console.log(res)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
      }
    },
    back() {
      if (this.keyword) {
        this.keyword = ''
      } else {
        this.$router.push('/')
      }
    },
    history_search(item) {
      this.keyword = item
      this.search()
    },
    hot_search(item) {
      this.keyword = item
      this.search()
    },
    recommend_search(item) {
      this.keyword = item
      this.search()
      this.recommendList = []
    }
  },
  watch: {
    keyword(value) {
      if (!value) {
        this.list = []
        this.recommendList = []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.post-search {
  padding: 0 20px;
  .header {
    width: 100%;
    height: 50px;
    line-height: 50px;
    display: flex;
    justify-content: space-between;
    .center {
      padding-left: 10px;
      flex: 1;
      position: relative;
      input {
        width: 258px;
        height: 38px;
        border: 1px solid #ccc;
        border-radius: 19px;
        font-size: 14px;
        padding-left: 30px;
      }
      span {
        position: absolute;
        top: 4px;
        left: 21px;
        color: #ccc;
      }
    }
    .right {
      font-size: 16px;
      line-height: 50px;
    }
  }
  .content {
    font-size: 14px;

    h6 {
      font-size: 14px;
      padding-bottom: 10px;
    }
    .history,
    .hot {
      padding: 20px 0;

      overflow: hidden;
      div {
        float: left;
        width: 50%;
        line-height: 30px;
      }
    }
  }
  .recommend {
    width: 100%;
    padding-top: 20px;
    .item {
      height: 40px;
      font-size: 14px;
      border-bottom: 1px solid #ccc;
      line-height: 40px;
    }
    span {
      float: right;
    }
  }
}
</style>
