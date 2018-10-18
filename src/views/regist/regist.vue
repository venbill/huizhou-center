<template>
  <div class="login-container">
    <el-row class="login-title">
      欢迎使用徽州区电商中心平台后台管理系统
    </el-row>
    
    <el-form class="login-form" autoComplete="on" :model="registForm" :rules="registRules" ref="registForm" label-position="left">
      <div class="title-container">
        <span class="title">注册</span>
      </div>

      <el-form-item prop="nick">
        <span class="svg-container svg-container_login">
          <i class="iconfont">&#xe623;</i>
        </span>
        <el-input size="medium" type="text" maxlength="10" v-model="registForm.nick" autoComplete="on" placeholder="昵称"/>
      </el-form-item>

      <el-form-item prop="phone">
        <span class="svg-container svg-container_login">
          <i class="iconfont">&#xe623;</i>
        </span>
        <el-input name="phone" size="medium" type="text" maxlength="11" v-model="registForm.phone" autoComplete="on" placeholder="手机号"/>
      </el-form-item>

      <el-form-item prop="verifyCode" maxlength="4" style="background:#fff;margin-bottom:42px:position:relative">
        <span class="svg-container svg-container_login">
          <i class="iconfont">&#xe62b;</i>
        </span>
        <el-input class="yzm-input enter" type="text" v-model="registForm.verifyCode" @keyup.enter.native="regist" placeholder="验证码"/>
        <el-button size="medium" class="yzm-send" type="primary" :disabled=yzmStatus @click.native.prevent="yzmGet">{{yzmText}}</el-button>
      </el-form-item>

      <el-form-item prop="pass">
        <span class="svg-container svg-container_login">
          <i class="iconfont">&#xe654;</i>
        </span>
        <el-input size="medium" type="password" maxlength="12" v-model="registForm.pass" autoComplete="on" placeholder="请输入密码"/>
      </el-form-item>

      <el-form-item prop="passConfirm" style="background:#fff;margin-bottom:42px:position:relative">
        <span class="svg-container svg-container_login">
          <i class="iconfont">&#xe654;</i>
        </span>
        <el-input class="yzm-input enter" type="password" maxlength="12" v-model="registForm.passConfirm" @keyup.enter.native="regist" placeholder="请再次确认密码"/>
      </el-form-item>

      <el-button size="max" 
        style="width:100%" class="btn-red" :loading="loading"
        @click.native.prevent="regist">注册</el-button>
      <div class="form-foot">
        <router-link to='/login'>
          <span class="text-link">返回登录</span>
        </router-link>
      </div>
    </el-form>

    <el-row class="login-foot">
      <div></div>
    </el-row>
    
    <el-dialog :visible.sync="registSuccess" @close="toLogin" width="340px" center>
      <div style="text-align:center;font-size:18px">注册成功！</div>
      <span slot="footer" class="dialog-footer">
        <el-button class="btn-red" @click="toLogin">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
// import util from '@/utils/util'
import { mapState } from 'vuex'
import { getCode, regist } from '@/api/common/regist'

export default {
  name: 'login',
  data() {
    var nickCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入昵称'))
      } else {
        const re = /^[\u0391-\uFFE5A-Za-z]+$/
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error('只能输入字母、汉字'))
        }
      }
    }
    var phoneCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号码'))
      } else {
        const re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error('手机号码不正确'))
        }
      }
    }
    var yzmCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入验证码'))
      } else {
        const re = /^[0-9a-zA-Z]+$/
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error('验证码格式不正确'))
        }
      }
    }
    var passCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入密码'))
      } else {
        const re = /^([0-9a-zA-Z.@!#$%^&*_+-/~`()=,?;:"']){6,12}$/
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error('密码格式不正确，6-12位字符，不能包含空格'))
        }
      }
    }
    var passConfirmCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请再次确认密码'))
      } else {
        const re = /^([0-9a-zA-Z.@!#$%^&*_+-/~`()=,?;:"']){6,12}$/
        if (re.test(value)) {
          if (this.registForm.pass === value) {
            callback()
          } else {
            callback(new Error('两次输入密码不一致'))
          }
        } else {
          callback(new Error('密码格式不正确，6-12位字符，不能包含空格'))
        }
      }
    }
    return {
      companyCodeNum: 5,
      registForm: {
        phone: '',
        verifyCode: '',
        pass: '',
        passConfirm: ''
      },
      registRules: {
        nick: [{ required: true, validator: nickCheck, trigger: 'blur' }],
        phone: [{ required: true, validator: phoneCheck, trigger: 'blur' }],
        verifyCode: [{ required: true, validator: yzmCheck, trigger: 'blur' }],
        pass: [{ required: true, validator: passCheck, trigger: 'blur' }],
        passConfirm: [{ required: true, validator: passConfirmCheck, trigger: 'blur' }]
      },
      loading: false,
      yzmStatus: false,
      yzmText: '获取验证码',
      time: 60,
      registSuccess: false
    }
  },
  computed: {
    ...mapState({
      language: state => state.app.language
    })
  },
  methods: {
    // 验证码格式校验
    // yzmCheck(val) {
    //   this.$nextTick(function() {
    //     this.registForm.verifyCode = val.replace(/^[0-9a-zA-Z]+$/, '')
    //     if (val.length > 6) {
    //       this.registForm.verifyCode = val.slice(0, 6)
    //     }
    //   })
    // },
    // 获取验证码
    yzmGet() {
      this.$refs['registForm'].validateField('phone', (valid) => {
        if (valid === '') {
          this.countDown()
          getCode(this.registForm.phone)
        }
      })
    },
    // 倒计时
    countDown() {
      this.time -= 1
      if (this.time > 0) {
        this.yzmText = this.time + '秒后重新发送'
        this.yzmStatus = true
        setTimeout(this.countDown, 1000)
      } else {
        this.time = 60
        this.yzmStatus = false
        this.yzmText = '获取验证码'
      }
    },
    // 注册
    regist() {
      const this_ = this
      this.$refs.registForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = {
            nick: this.registForm.nick,
            phone: this.registForm.phone,
            code: this.registForm.verifyCode,
            password: this.registForm.pass
          }
          regist(params).then(function(data) {
            if (data.data.code === 200) {
              this_.registSuccess = true
            }
          })
          setTimeout(() => {
            this_.loading = false
          }, 5000)
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    // 跳转登录
    toLogin() {
      this.registSuccess = false
      this.$router.push('/login')
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
  .yzm-input{
    width:100%;
    background:transparent;
  }
  .yzm-send{
    position:absolute;
    width:120px;
    padding: 10px;
    height: 49px;
    text-align:center;
    top: 0;
    right: 0;
    border-radius: 0;
    border: none;
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
  background: url(../../assets/custom-theme/images/login_bg.jpg) 100% 100% no-repeat;
  background-size: cover;
  background-position: left;
  .login-form {
    position: absolute;
    right: 14%;
    top:50%;
    width: 300px;
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
    padding: 6px 0 6px 10px;
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

