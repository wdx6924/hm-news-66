<template>
  <div class="my-star">
    <hm-header>我的收藏</hm-header>
    <hm-post v-for="item in list" :key="item.id" :post="item"></hm-post>
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
      const res = await this.$axios.get('/user_star')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.list = data
        console.log(data)
        this.list.forEach(item => {
          item.comment_length = item.comments.length
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
.item {
  text-align: center;
  border-bottom: 1px solid #cccccc;
  display: flex;
  padding: 10px;
  justify-content: space-between;
  .content {
    padding-top: 10px;
    text-align: left;
    .title {
      font-size: 16px;
      margin-bottom: 5px;
    }
    span {
      font-size: 14px;
      color: #999;
      margin-right: 10px;
    }
  }
  .imgs {
    img {
      width: 121px;
      height: 75px;
    }
  }
}
</style>
