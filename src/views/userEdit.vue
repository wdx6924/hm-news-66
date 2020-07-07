<template>
  <div class="user-edit">
    <hm-header>编辑资料</hm-header>
    <div class="avatar">
      <img :src="$axios.defaults.baseURL + info.head_img" alt />
      <!-- 修改头像模态框 -->
      <van-uploader :after-read="afterRead" />
      <div class="cropper" v-show="isCanvas">
        <van-button type="info" @click="up">确定</van-button>
        <van-button type="info" @click="cancle">取消</van-button>
        <VueCropper
          ref="crop"
          :img="canvasImg"
          :canScale="false"
          autoCrop
          autoCropWidth="150"
          autoCropHeight="150"
          fixed
          :fixedNumber="[1,1]"
          centerBox
        ></VueCropper>
      </div>
    </div>
    <div class="nav">
      <hm-navbar @click="setNickname">
        <template #title>昵称</template>
        <template #content>{{ info.nickname }}</template>
      </hm-navbar>
      <hm-navbar @click="setPwd">
        <template #title>密码</template>
        <template #content>******</template>
      </hm-navbar>
      <hm-navbar @click="setGender">
        <template #title>性别</template>
        <template #content>{{ info.gender === 1 ? '男' : '女' }}</template>
      </hm-navbar>
    </div>
    <!-- 修改昵称模态框 -->
    <van-dialog v-model="showname" title="修改昵称" show-cancel-button @confirm="updateNickname">
      <van-field v-model="name" placeholder="请输入新昵称" />
    </van-dialog>
    <!-- 修改密码模态框 -->
    <van-dialog v-model="showpwd" title="修改密码" show-cancel-button @confirm="updatePwd">
      <van-field v-model="password" placeholder="请输入新密码" />
    </van-dialog>
    <!-- 修改性别模态框 -->
    <van-dialog v-model="showgender" title="修改性别" show-cancel-button @confirm="updateGender">
      <van-radio-group v-model="gender">
        <van-cell-group>
          <van-cell title="男" clickable @click="radio = '1'">
            <template #right-icon>
              <van-radio :name="1" />
            </template>
          </van-cell>
          <van-cell title="女" clickable @click="radio = '0'">
            <template #right-icon>
              <van-radio :name="0" />
            </template>
          </van-cell>
        </van-cell-group>
      </van-radio-group>
    </van-dialog>
  </div>
</template>

<script>
import { VueCropper } from 'vue-cropper'
export default {
  data() {
    return {
      info: {},
      showname: false,
      showpwd: false,
      showgender: false,
      name: '',
      password: '',
      gender: '',
      isCanvas: false,
      canvasImg: ''
    }
  },
  async created() {
    this.getInfo()
  },
  components: {
    VueCropper
  },

  methods: {
    input() {
      // console.log(123)
    },
    setNickname() {
      this.showname = true
      this.name = this.info.nickname
    },
    setPwd() {
      this.showpwd = true
      this.password = this.info.password
    },
    setGender() {
      this.showgender = true
      this.gender = this.info.gender
    },
    // 封装获取用户信息请求
    async getInfo() {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.get(`/user/${userId}`)
      const { statusCode, data } = res.data
      if (statusCode === 200) {
        this.info = data
      }
    },
    // 封装更新用户信息请求
    async updateUserInfo(data) {
      const userId = localStorage.getItem('userId')
      const res = await this.$axios.post(`/user_update/${userId}`, data)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        this.$toast.success(message)
        this.getInfo()
      } else {
        this.$toast.fail(message)
      }
    },
    async updateNickname() {
      console.log(this.name)
      this.updateUserInfo({ nickname: this.name })
    },
    async updatePwd() {
      this.updateUserInfo({ password: this.password })
    },
    async updateGender() {
      this.updateUserInfo({ gender: this.gender })
    },
    async afterRead(file) {
      // 判断文件的格式和大小
      const fileSize = file.file.size / 1024 >= 40
      const isJpg = 'image/jpeg'
      const isPng = 'image/png'
      const isGif = 'image/gif'
      const fileType = file.file.type
      if (fileSize) {
        this.$toast.fail('图片大小不能超过40k')
        return
      }
      if (fileType !== (isJpg || isPng || isGif)) {
        this.$toast.fail('图片类型为jpg/png/gif')
      }
      // console.log(file)
      this.canvasImg = file.content
      this.isCanvas = true
    },
    up() {
      this.$refs.crop.getCropBlob(async blob => {
        // do something
        console.log(blob)
        const fd = new FormData()
        fd.append('file', blob)
        const res = await this.$axios.post('/upload', fd)
        const { statusCode, data } = res.data
        if (statusCode === 200) {
          console.log(data)
          this.updateUserInfo({
            head_img: data.url
          })
          this.isCanvas = false
        }
        this.getInfo()
      })
    },
    cancle() {
      this.isCanvas = false
    }
  }
}
</script>

<style lang="less" scoped>
.user-edit {
  .avatar {
    position: relative;
    height: 120px;
    padding: 25px;
    text-align: center;
    img {
      width: 70px;
      height: 70px;
      border-radius: 50%;
    }
    .van-uploader {
      position: absolute;
      top: 25px;
      left: 50%;
      transform: translateX(-50%);
      opacity: 0;
    }
    .cropper {
      position: fixed;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      z-index: 99;
    }
    .van-button {
      position: absolute;
      top: 0;
      z-index: 999;
    }
    .van-button:nth-child(1) {
      left: 0;
    }
    .van-button:nth-child(2) {
      right: 0;
    }
  }
  .nav {
    padding-left: 20px;
  }
  .van-dialog {
    padding: 20px;
    .van-field {
      border: 1px solid #ccc;
    }
  }
}
</style>
