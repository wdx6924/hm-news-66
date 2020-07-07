<template>
  <div class="package">
    <div class="hm-header">
      <div class="back">
        <span class="iconfont iconjiantou2" @click="$router.go(-1)"></span>
      </div>
      <div class="title">
        <slot></slot>
      </div>
      <div class="extra"></div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="less">
.package {
  height: 40px;
  .hm-header {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 40px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #f5f5f5;
    display: flex;
    line-height: 40px;
    .back,
    .extra {
      width: 40px;
      text-align: center;
    }
    .title {
      flex: 1;
      text-align: center;
      font-size: 16px;
      font-weight: 700;
    }
  }
}
</style>
