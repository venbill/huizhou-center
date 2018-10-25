<template>
  <div class="layout-main">
    <div class="index-inner-content">
      <div class="crumbs-box">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>招商引资</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bg-white" style="padding-bottom:30px;">
        <div class="detai-title">招商引资</div>
        <div class="cooperation-content">
          <div class="content-introduce">
            <div class="introduce-left">
              <p class="left-title">招商对象：互联网+型</p>
              <p class="left-text">电商、微商、B2B、</p>
              <p class="left-text">B2C、服务应用型公司等</p>
            </div>
            <div class="introduce-right">
              <img src="/static/images/cooperation/net.png">
            </div>
          </div>
          <div class="content-introduce">
            <div class="introduce-left">
              <p class="left-title">招商政策</p>
              <p class="left-text">1、创业工位</p>
              <p class="left-text">2、房租优惠：1年免租、2年优惠</p>
              <p class="left-text">3、免费会议室</p>
              <p class="left-text">4、创业扶持、配套服务</p>
              <p class="left-text">5、徽州区企业奖励政策</p>
              <p class="left-text">6、徽州区人才引进政策</p>
            </div>
            <div class="introduce-right">
              <img src="/static/images/cooperation/space.png">
            </div>
          </div>
          <div class="consultation-content">
            <div class="consultation-title">留言咨询</div>
            <el-form class="consultation-form" :model="consultForm" :rules="consultRules" ref="consultForm" label-position="top">
              <div style="margin-bottom:20px;font-size:24px;color:#333;">您好!</div>
              <el-form-item prop="name" label="姓名">
                <el-input size="max" v-model="consultForm.name" placeholder="请输入您的姓名"></el-input>
              </el-form-item>
              <el-form-item prop="companyName" label="公司名称">
                <el-input size="max" v-model="consultForm.companyName" placeholder="请输入您的公司名称"></el-input>
              </el-form-item>
              <el-form-item prop="phone" label="电话">
                <el-input size="max" v-model="consultForm.phone" placeholder="请输入您的电话号码"></el-input>
              </el-form-item>
              <el-form-item prop="content" label="留言">
                <el-input size="max" type="textarea" v-model="consultForm.content" placeholder="为了更好的合作，请输入您的留言"
                 :autosize="{ minRows: 3}" resize="none"></el-input>
              </el-form-item>
              <el-form-item>
                <!-- <span class="btn-consultation" @click="submit">提交</span> -->
                <el-button class="btn-consultation" @click="submit">提交</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="know-more">
            <p class="know-more-title">了解更多，请联系我们</p>
            <p class="us-info">
              中心地址：安徽省黄山市徽州区城北工业园文峰西路1号<br/>
              固定电话：0559-3586666<br/>
              联系人：江先生 15212310103<br/>
              邮箱：1359201795@qq.com
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { leaveMessage } from '@/api/index/index'
export default {
  data() {
    var nameCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入您的姓名'))
      } else {
        const re = /^[\u4e00-\u9fa5]+$/
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error('只能输入汉字'))
        }
      }
    }
    var companyCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入您的公司名称'))
      } else {
        const re = /^[\u4e00-\u9fa5]+$/
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error('公司名称不合法'))
        }
      }
    }
    var phoneCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入您的手机号码'))
      } else {
        const re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error('手机号码格式不正确'))
        }
      }
    }
    return {
      consultRules: {
        name: [{ required: true, validator: nameCheck, trigger: 'blur' }],
        phone: [{ required: true, validator: phoneCheck, trigger: 'blur' }],
        companyName: [{ required: true, validator: companyCheck, trigger: 'blur' }],
        content: [{ required: true, message: '请输入留言', trigger: 'blur' }]
      },
      consultForm: {
        name: '',
        companyName: '',
        phone: '',
        content: ''
      },
      loading: false
    }
  },
  methods: {
    // 提交留言
    submit() {
      const this_ = this
      this.$refs.consultForm.validate(valid => {
        if (valid) {
          this.loading = true
          const params = this_.consultForm
          leaveMessage(params).then(function(data) {
            if (data.data.code === 200) {
              this_.loading = false
              this_.$message.success('提交成功')
              // 清空表单内容
              for (const key in this_.consultForm) {
                this_.consultForm[key] = ''
              }
            }
          })
          setTimeout(() => {
            this.loading = false
          }, 5000)
        }
      })
    }
  }
}
</script>


<style scoped>
.layout-main {
  background: #f5f5f5;
  padding-bottom: 0;
}
.crumbs-box {
    font-size: 14px;
    color: #333;
    padding: 45px 0 20px;
    border-bottom: 4px solid #007130;
  }
  .detai-title {
    font-size: 16px;
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    color: #666;
    border-bottom: 1px solid #ddd;
  }
  .cooperation-content {
    width: 1000px;
    margin: 40px auto 0;
  }
  .content-introduce {
    padding: 0 90px;
    margin-bottom: 70px;
    color: #666;
    line-height: 1.5;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .introduce-left, .introduce-right {
    flex: 1;
  }
  .left-title {
    font-size: 24px;
    font-weight: bold;
  }
  .left-text {
    font-size: 20px;
  }
  .introduce-right img {
    display: block;
    height: 163px;
    width: 326px;
  }
  .consultation-content {
    background: #f5f5f5;
  }
  .consultation-form {
    width: 640px;
    margin: 0 auto;
    padding: 30px 0 20px;
  }
  .consultation-title {
    height: 60px;
    line-height: 60px;
    color: #fff;
    font-size: 28px;
    text-align: center;
    background: #007130
  }
  .btn-consultation {
    background: #007130;
    color: #fff;
    font-size: 24px;
    width: 164px;
  }
  .know-more {
    padding: 50px 0 0 180px;
    color: #666;
  }
  .know-more-title {
    font-size: 20px;
    font-weight: bold;
    line-height: 2;
  }
  .us-info {
    font-size: 18px;
    line-height: 1.5;
  }
</style>

<style>
.consultation-form .el-form-item__label {
  line-height: 24px;
  font-size: 24px;
  color: #333;
  font-weight: normal;
}
.consultation-form .el-form-item {
  margin-bottom: 30px;
}
.consultation-form .el-input__inner, .consultation-form .el-textarea__inner {
  font-size: 18px;
}
</style>
