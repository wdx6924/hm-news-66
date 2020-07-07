<template>
  <div class="hm-navbar" @click="$emit('click')">
    <div class="title">
      <slot name="title"></slot>
    </div>
    <div class="content">
      <slot name="content"></slot>
    </div>
    <div class="arrow">
      <span class="iconfont iconjiantou1"></span>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less" scoped>
.hm-navbar {
  height: 50px;
  line-height: 50px;
  font-size: 14px;
  display: flex;
  border-bottom: 1px solid #e4e4e4;
  padding-right: 20px;
  .content {
    flex: 1;
    text-align: right;
    color: #999999;
  }
  .arrow {
    padding-left: 10px;
  }
}
</style>
