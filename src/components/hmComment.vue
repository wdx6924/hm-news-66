<template>
  <div class="hm-comment">
    <div class="info">
      <div class="left">
        <img :src="$url(comment.user.head_img)" alt />
      </div>
      <div class="center">
        <div class="nickname">{{comment.user.nickname}}</div>
        <div class="time">{{comment.create_date | fromNow}}</div>
      </div>
      <div class="right" @click="reply(comment.user.nickname,comment.id)">回复</div>
    </div>
    <hm-floor :comment="comment.parent" v-if="comment.parent" :num="this.getCount(0,comment)"></hm-floor>
    <div class="content">{{comment.content}}</div>
  </div>
</template>

<script>
import hmFloor from './hmFloor.vue'

export default {
  props: {
    comment: {
      type: Object,
      required: true
    }
  },
  components: {
    'hm-floor': hmFloor
  },
  methods: {
    getCount(num, obj) {
      if (obj.parent) {
        return this.getCount(num + 1, obj.parent)
      } else {
        return num
      }
    },
    async reply(name, id) {
      await this.$emit('reply', name, id)
    }
  }
}
</script>

<style lang='less' scoped>
.hm-comment {
  padding: 10px 10px;
  border-bottom: 1px solid #ccc;
  .info {
    display: flex;
    justify-content: space-between;
    height: 50px;
    .left {
      img {
        width: 35px;
        height: 35px;
        border-radius: 50%;
      }
    }

    .center {
      flex: 1;
      margin-left: 10px;
      .nickname {
        font-size: 16px;
      }
      .time {
        font-size: 14px;
        color: #999;
      }
    }
    .right {
      font-size: 14px;
      color: #999;
    }
  }
  .content {
    font-size: 16px;
    padding: 10px 0;
  }
}
</style>
