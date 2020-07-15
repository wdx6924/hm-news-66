<template>
  <div class="login">
    <hm-header>登录</hm-header>
    <hm-logo></hm-logo>
    <van-form @submit="onSubmit">
      <van-field v-model="username" label="用户名" :rules="rules.username" />
      <van-field
        v-model="password"
        type="password"
        label="密码"
        placeholder="请输入密码"
        :rules="rules.password"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
    <p class="tips">
      没有账号？去
      <router-link to="/register">注册</router-link>
    </p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      rules: {
        username: [
          { required: true, message: '请填写用户名', trigger: 'onChange' },
          {
            pattern: /^\d{5,11}$/,
            message: '用户名为5-11位数字',
            trigger: 'onChange'
          }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'onChage' },
          {
            pattern: /^\w{3,9}$/,
            message: '密码必须是3-9位',
            trigger: 'onChange'
          }
        ]
      }
    }
  },
  created() {
    // console.log(this.$route)
    const { username, password } = this.$route.params
    this.username = username
    this.password = password
  },
  methods: {
    async onSubmit() {
      const res = await this.$axios.post('/login', {
        username: this.username,
        password: this.password
      })
      const { statusCode, message, data } = res.data
      if (statusCode === 200) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('userId', data.user.id)
        const backUrl = localStorage.getItem('backUrl')
        // const back = this.$route.query
        // console.log(back)
        // if (back) {
        //   this.$router.back()
        // } else {
        //   this.$router.push('/')
        // }
        if (backUrl) {
          this.$router.push(backUrl)
          localStorage.removeItem('backUrl')
        } else {
          this.$router.push('/user')
        }
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.login {
  .tips {
    font-size: 14px;
    text-align: right;
    padding-right: 20px;
    a {
      color: rgb(240, 0, 0);
    }
  }
}
</style>
