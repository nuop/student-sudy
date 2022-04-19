<template>
  <div class="login">
    <van-nav-bar
  title="标题"
  left-text="返回"
  left-arrow
  @click-left="onClickLeft"
/>
    <van-form @submit="onSubmit">
      <van-field
        v-model="form.phone"
        name="phone"
        label="手机号"
        placeholder="请输入手机号"
        :rules="[
        {require: true, message: '请输入手机号'},
        {validator: phoneCheck, message: '格式有误，请重新输入'}]"/>
      <van-field
        v-model="form.password"
        type="password"
        name="password"
        label="密码"
        placeholder="6-12位密码"
        :rules="[
        { required: true, message: '请填写密码' },
        { pattern: /^[a-zA-Z0-9]{6,12}$/, message: '格式有误，请重新输入' }]"/>
        <div style="">
          <van-button
            round
            block
            type="info"
            native-type="submit"
            :loading="isLoading"
            :disabled="isLoading">提交</van-button>
        </div>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/services/user'
export default {
  name: 'LoginIndex',
  data () {
    return {
      form: {
        pgone: '',
        password: ''
      },
      isLoading: false
    }
  },
  methods: {
    onClickLeft () {
      this.$router.go(-1)
    },
    async onSubmit () {
      this.isLoading = true
      const { data } = await login(this.form)
      if (data.state === 1) {
        this.$store.commit('setUser', data.content)
        this.$router.push(this.$route.query.redirect || '/')
        this.$toast.success('登陆成功')
      } else {
        this.$toast.fail('登陆失败')
      }
      this.isLoading = false
    },
    phoneCheck (value) {
      return /^1\d{10}$/.test(value)
    }
  }
}
</script>

<style>

</style>
