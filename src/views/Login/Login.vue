<template>
  <div>
    <van-nav-bar title="标题" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit">
      <!-- 通过 pattern 进行正则校验 -->
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账户"
        :rules="[
          { required: true, message: '请输入账号' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,8}$/,
            message: '用户名格式5-8位的字母和数字',
          },
        ]"
      />
      <van-field
        v-model="password"
        name="password"
        placeholder="请输入密码"
        :rules="[
          { required: true, message: '请输入账号' },
          {
            pattern: /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{5,12}$/,
            message: '密码格式5-12位的字母和数字',
          },
        ]"
      />
      <div style="margin: 16px">
        <van-button native-type="submit" @submit="$router.back()">登录</van-button>
      </div>
    </van-form>
    <div class="main"><p>还没有账号，去注册~</p></div>
  </div>
</template>
<script>
import { login } from '@/api/user'
export default {
  created () { },
  data () {
    return {
      username: 'pan123',
      password: 'pan1234'
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        this.$store.commit('setUser', res.data.body)
        this.$toast.success('登录成功')
        this.$router.push('/my')
      } catch (err) {
        console.log(err)
        this.$toast.fail('账户或密码错误，请重试')
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.van-button {
  background-color: #21b97a;
  width: 690px;
  // margin-left: 30px ;
  margin-top: 40px;
  border: none;
}
.van-field {
  padding-top: 60px;
}
p {
  color: #666;
  font-size: 14px;
}
.main {
  text-align: center;
  padding-top: 30px;
}
</style>
