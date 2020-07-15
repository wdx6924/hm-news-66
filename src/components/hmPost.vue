<template>
  <div class="hm-post" @click="$router.push(`/post/${post.id}`)">
    <div class="videoPost" v-if="post.type === 2">
      <div class="content">
        <p class="title">{{post.title}}</p>
      </div>
      <div class="video">
        <img :src="$url(post.cover[0].url)" alt />
        <span class="iconfont iconshipin"></span>
      </div>
      <div class="name">
        <p>
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </p>
      </div>
    </div>
    <div class="singleImg" v-else-if="post.cover.length < 3">
      <div class="content">
        <p class="title">{{ post.title }}</p>
        <p>
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </p>
      </div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt />
      </div>
    </div>
    <div class="multipleImg" v-else>
      <div class="content">
        <p class="title">{{post.title}}</p>
      </div>
      <div class="imgs">
        <img :src="$url(post.cover[0].url)" alt />
        <img :src="$url(post.cover[1].url)" alt />
        <img :src="$url(post.cover[2].url)" alt />
      </div>
      <div class="name">
        <p>
          <span>{{ post.user.nickname }}</span>
          <span>{{ post.comment_length }}跟帖</span>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style lang="less" scoped>
.singleImg {
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
      object-fit: cover;
    }
  }
}
.multipleImg {
  border-bottom: 1px solid #cccccc;
  padding: 10px;

  .imgs {
    display: flex;
    justify-content: space-between;
    padding: 10px 0;
    img {
      width: 112px;
      height: 74px;
      object-fit: cover;
    }
  }
  .name {
    span {
      font-size: 14px;
      color: #999;
      margin-right: 10px;
    }
  }
}
.content {
  padding-top: 10px;
  .title {
    font-size: 16px;
  }
}
.videoPost {
  padding: 10px;
  border-bottom: 1px solid #cccccc;
  .video {
    position: relative;
    text-align: center;
    padding-top: 10px;
    img {
      width: 340px;
      height: 170px;
      object-fit: cover;
    }
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      display: inline-block;
      background-color: rgba(0, 0, 0, 0.3);
      width: 46px;
      height: 46px;
      border-radius: 50%;
      color: #ffffff;
      text-align: center;
      line-height: 46px;
      font-size: 30px;
    }
  }
  .name {
    span {
      font-size: 14px;
      color: #999;
      margin-right: 10px;
    }
  }
}
</style>
