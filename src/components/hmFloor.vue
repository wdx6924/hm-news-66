<template>
  <div>
    <hm-floor :comment="comment.parent" v-if="comment.parent" :num="num-1"></hm-floor>
    <div class="hm-floor">
      <div class="info">
        <div class="left">{{num}}楼：{{comment.user.nickname}}</div>
        <div class="center">{{comment.create_date | fromNow}}</div>
        <div class="right" @click="reply(comment.user.nickname,comment.id)">回复</div>
      </div>
      <div class="content">{{comment.content}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'hm-floor',
  props: {
    comment: Object,
    num: Number
  },
  methods: {
    reply(name, id) {
      this.$bus.$emit('reply', name, id)
    }
  }
}
</script>

<style lang='less' scoped>
.hm-floor {
  padding: 10px;
  border: 1px solid #ccc;
  margin-top: -1px;
  .info {
    font-size: 16px;
    display: flex;
    .center {
      margin-left: 10px;
      flex: 1;
      color: #999;
      font-size: 14px;
    }
    .right {
      color: #999;
      font-size: 14px;
    }
  }
  .content {
    font-size: 16px;
    padding: 10px 0;
  }
}
</style>
