<template>
  <div class="login-container">
    <el-row class="login-title">
      欢迎使用徽州区电商中心平台
    </el-row>

    <el-form id="form" class="login-form" autoComplete="on" :model="loginForm" :rules="loginRules" ref="loginForm" label-position="left">
      <div class="title-container">
        <span class="title">登录</span>
      </div>

      <el-form-item prop="username">
        <span class="svg-container svg-container_login">
          <i class="iconfont">&#xe623;</i>
        </span>
        <el-input name="username" size="medium" type="text" maxlength="11" v-model="loginForm.username" autoComplete="on" placeholder="手机号码"/>
      </el-form-item>

      <el-form-item prop="password">
        <span class="svg-container">
          <i class="iconfont">&#xe654;</i>
        </span>
        <el-input name="password" size="medium" :type="passwordType" maxlength="10"
         @keyup.enter.native="handleLogin"
         v-model="loginForm.password" autoComplete="on" placeholder="密码"/>
        <span class="show-pwd" @click="showPass">
          <i class="iconfont" v-html="passIcon"></i>
        </span>
      </el-form-item>

      <el-button size="max" 
        style="width:100%" class="btn-red" :loading="loading"
        @click.native.prevent="handleLogin">登录</el-button>
      <div class="form-foot">
        <span class="text-link">
          <router-link to="/">
            返回首页
          </router-link>
        </span>
        <span class="text-link" style="margin-left:10px">
          <router-link to="/forget">
            忘记密码
          </router-link>
        </span>
        <span class="text-link" style="margin-left:10px">
          <router-link to="/regist">
            免费注册
          </router-link>
        </span>
      </div>
    </el-form>
    <el-row class="login-foot">
      <div></div>
    </el-row>
  </div>
</template>

<script>
// import util from '@/utils/util'
import { mapState } from 'vuex'
// import { login } from '@/api/common/login'

export default {
  name: 'login',
  data() {
    return {
      companyCodeNum: 5,
      loginForm: {
        username: '',
        password: ''
      },
      loginRules: {
        username: [{ required: true, message: '请输入手机号码', trigger: 'blur' }],
        password: [{ required: true, message: '请输入密码', trigger: 'blur' }]
      },
      passwordType: 'password',
      loading: false,
      passIcon: '&#xe79c;'
    }
  },
  computed: {
    ...mapState({
      language: state => state.app.language
    })
  },
  methods: {
    // 跳转注册页面
    register() {
      this.$router.push('/regist')
    },
    // 密码显示、隐藏切换
    showPass() {
      if (this.passwordType === 'password') {
        this.passwordType = 'text'
        this.passIcon = '&#xe601;'
      } else if (this.passwordType === 'text') {
        this.passwordType = 'password'
        this.passIcon = '&#xe79c;'
      }
    },
    // 登录
    handleLogin() {
      // const this_ = this
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store
            .dispatch('LoginByUsername', this.loginForm)
            .then(() => {
              this.loading = false
              this.$router.push('/buy')
            })
            .catch(() => {
              this.loading = false
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
      // this.$refs.loginForm.validate(valid => {
      //   if (valid) {
      //     this.loading = true
      //     login(this.loginForm.username, this.loginForm.password).then(function(data) {
      //       if (data.data.code === 200) {
      //         const userInfo = {
      //           status: true,
      //           userId: data.data.data.userId,
      //           phone: data.data.data.phone,
      //           roles: data.data.data.roles
      //         }
      //         localStorage.setItem('userInfo', JSON.stringify(userInfo)) // 存入缓存
      //         this_.$router.push('/buy')
      //       }
      //     })
      //     setTimeout(() => {
      //       this_.loading = false
      //     }, 5000)
      //   } else {
      //     console.log('error submit!!')
      //     return false
      //   }
      // })
    }
  },
  watch: {

  },
  mounted() {

  }
}
</script>

<style rel="stylesheet/scss" lang="scss">
$bg:#2d3a4b;
$light_gray:#444;

/* reset element-ui css */
.login-container {
  .el-input-number {
    .el-input__inner {
      width:100%;
      text-align:left;
    }
  }
  .el-input {
    display: inline-block;
    height: 40px;
    width: 80%;
    position: relative;
    top: 2px;
    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 40px;
      &:-webkit-autofill {
        -webkit-box-shadow: 0 0 0px 1000px #fff inset !important;
        box-shadow: 0 0 0px 1000px #fff inset !important;
        //-webkit-text-fill-color: #000 !important;
      }
    }
  }
  .el-form-item {
    border: 1px solid rgba(0,0,0,0.15);
    background: #fff;
    color: #454545;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss" scoped>
$title_bg: #EFF6FE;
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#1C5EB3;
.iconfont{
  font-size:18px;
}
.login-title{
  background: rgba(0, 0, 0, .4);
  padding:24px 0;
  box-sizing:content-box;
  color: #fff;
  font-size: 30px;
  font-weight: bold;
  text-align: center;
}
.login-foot{
  position: absolute;
  bottom:3%;
  width:100%;
  font-size:14px;
  font-family:PingFangSC-Medium;
  color:rgba(255,255,255,0.65);
  text-align:center;
}
.login-container {
  position: relative;
  height: 100%;
  width: 100%;
  min-width: 1024px;
  font-family:PingFangSC-Medium;
  background: url('/static/images/bg.png') 100% 100% no-repeat;
  background-size: cover;
  background-position: left;
  .login-form {
    position: absolute;
    right: 14%;
    top:50%;
    width: 260px;
    background:#EAEAF0;
    box-shadow: 0 0 15px 0 rgba(0,0,0,0.05);
    padding: 20px 30px;
    transform:translateY(-50%);
    .yzm-input{
      width:60%;
      background:transparent;
    }
    .yzm-img{
      width:80px;
      height:40px;
      float:right;
      cursor:pointer;
    }
    .yzm-change{
      padding:0 10px;
      height:40px;
      line-height:40px;
      float:right;
    }
    .form-foot {
      font-size: 12px;
      color: #6c6c6c;
      text-align: right;
      padding: 20px 0 0;
    }
  }
  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;
    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .svg-container {
    padding: 6px 0 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
    &_login {
      font-size: 20px;
    }
  }
  .title-container {
    padding-bottom: 4px;
    margin-bottom: 24px;
    border-bottom: 1px solid #E9E9E9;
    .title {
      font-size: 24px;
      color: #ee4644;
      margin: 0px auto 30px auto;
      font-weight: bold;
    }
  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
  .forget-pass{
    position: absolute;
    right:6px;
    top:100%;
    padding:4px;
  }
  .thirdparty-button {
    position: absolute;
    right: 35px;
    bottom: 28px;
  }
}
</style>

