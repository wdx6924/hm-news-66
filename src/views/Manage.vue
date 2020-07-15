<template>
  <div class="manage">
    <hm-header>栏目管理</hm-header>
    <div class="del">
      <h6>点击删除以下频道（至少保留4个频道）</h6>
      <ul>
        <li v-for="(item, index) in active" :key="item.id">
          <div @click="del(index)">
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <div class="add">
      <h6>点击添加以下频道</h6>
      <ul>
        <li v-for="(item, index) in deactive" :key="item.id">
          <div @click="add(index)">{{ item.name }}</div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: [],
      deactive: []
    }
  },
  created() {
    const active = JSON.parse(localStorage.getItem('active'))
    const deactive = JSON.parse(localStorage.getItem('deactive'))
    if (active) {
      this.active = active
      this.deactive = deactive
    } else {
      this.getCategory()
    }
  },
  methods: {
    async getCategory() {
      const res = await this.$axios.get('/category')
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.active = data
      }
    },
    del(index) {
      if (this.active.length > 4) {
        this.deactive.push(this.active[index])
        this.active.splice(index, 1)
        return
      }
      this.$toast('至少保留4个频道')
    },
    add(index) {
      this.active.push(this.deactive[index])
      this.deactive.splice(index, 1)
    }
  },
  watch: {
    active: {
      deep: true,
      handler(value) {
        localStorage.setItem('active', JSON.stringify(this.active))
        localStorage.setItem('deactive', JSON.stringify(this.deactive))
      }
    }
  }
}
</script>

<style lang="less" scoped>
.manage {
  padding: 0 20px;
  h6 {
    font-size: 14px;
    color: #a9a9a9;
    background-color: #f1f1f1;
    font-weight: 400;
  }
  .del,
  .add {
    padding-bottom: 20px;
  }
  ul {
    overflow: hidden;
    li {
      float: left;
      padding: 10px 13px 0 0;
    }
    div {
      width: 70px;
      height: 40px;
      border: 1px solid #ccc;
      font-size: 18px;
      text-align: center;
      line-height: 40px;
    }
  }
}
</style>
