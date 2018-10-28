<template>
    <div class="pay-content">
      <div class="payment-main center-content border-box">
        <div class="payment-title">收银台</div>
        <div class="payment-info">
          <div class="info-item">
            <p>订单编号：<span>{{orderId}}</span></p>
            <p>
              <span>应付金额：</span>
              <span class="text-red weight-bold" style="font-size:24px">{{orderInfo.totalPrice | pieceFormat}}</span>
            </p>
          </div>
        </div>
        <el-tabs type="card">
          <el-tab-pane label="微信支付">
            <div style="height:410px" v-if="!yzmStatus">
              <div class="styleLogo">
                <div class="logoImg"></div>
              </div>
              <div style="float:left">
                <div class="QR_Code" id="QR_Code"></div>
                <div class="text-foot"></div>
              </div>
            </div>
            <div v-else style="display:flex;height:410px;align-items:center;justify-content: center">
              <span style="margin:0 4px">{{yzmText}}</span>
              <router-link to="/index/homestay/search" style="color:red" class="text-link-normal">精品民宿</router-link>
            </div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
import { orderDetail, getOrderStatus, orderPay } from '@/api/platform/homestay'
import util from '@/utils/util'
import QRCode from 'qrcodejs2'
export default {
  data() {
    return {
      orderId: '', // 订单Id
      shouldPay: 0, // 应付金额
      orderInfo: {
        totalPrice: 0,
        inTime: '',
        outTime: '',
        homestayName: ''
      }, // 订单详情
      codeUrl: '', // 支付链接
      time: 4,
      yzmText: '3秒后返回',
      yzmStatus: false,
      orderCheck: null,
      message: ''
    }
  },
  filters: {
    pieceFormat(value) {
      return util.pieceFormat(value)
    }
  },
  methods: {
    init() {
      const this_ = this
      this.orderId = this.$route.query.id
      console.log(this.orderId)
      // 获取订单详情
      orderDetail(this.orderId).then(function(data) {
        if (data.data.code === 200) {
          this_.orderInfo = data.data.data
        }
      })
      // // 生成微信支付二维码
      orderPay(this.orderId).then(function(data) {
        if (data.data.code === 200) {
          this_.codeUrl = data.data.code_url
          this_.qrcode(this_.codeUrl)
        }
      })
      // 查询订单支付状态
      this.orderCheck = setInterval(() => {
        this.getOrderStatus()
      }, 3000)
    },
    // 生成二维码
    qrcode(url) {
      const canvas = document.getElementById('QR_Code')
      // QRCode.toCanvas(canvas, url, function() {})
      const qrcode = new QRCode(canvas, {
        height: 260,
        width: 260,
        text: url
      })
      return qrcode
    },
    // 查询订单支付状态
    getOrderStatus() { // 订单状态 1;订单取消 2待支付 3待入住  5待评价 6订单完成 7退款
      const this_ = this
      getOrderStatus(this.orderId).then(function(data) {
        if (data.data.code === 200) {
          if (data.data.data.status === 3 || data.data.data.status === 1) {
            this_.countDown(data.data.data.status)
            clearInterval(this_.orderCheck)
          }
        }
      })
    },
    // 倒计时
    countDown(val) {
      if (val === 3) {
        this.message = '支付完成'
      } else if (val === 1) {
        this.message = '订单超时'
      }
      this.time -= 1
      if (this.time > 0) {
        this.yzmText = this.message + ' ' + this.time + '秒后回到'
        this.yzmStatus = true
        setTimeout(this.countDown, 1000)
      } else {
        this.time = 4
        this.yzmStatus = false
        this.$router.replace(
          {
            path: '/index/homestay/search',
            replace: true
          }
        )
      }
    },
    // 日期时间处理
    getName_date(date) {
      if (date) {
        return util.formatDate.format(new Date(date), 'yyyy.MM.dd hh:mm:ss')
      }
    }
  },

  mounted() {
    this.init()
  },
  beforeDestroy() {
    clearInterval(this.orderCheck)
  }
}
</script>

<style scoped>
  .pay-content{
    height:auto;
    padding:0;
    color: #666;
  }
  .payment-main {
    padding: 20px;
    margin-top: 20px;
    background: #fff;
  }
  .payment-title {
    font-size: 30px;
  }
  .payment-info {
    padding: 40px 0;
  }
  .info-item {
    flex: 1;
  }
  .styleLogo {
    height: 370px;
    float: left;
    margin-right: 50px
  }
  .logoImg {
    width: 200px;
    height: 60px;
    background: url('/static/images/WePayLogo.png') no-repeat;
  }
  .QR_Code {
    width: 260px;
    height: 260px;
    margin-bottom: 20px;
  }
  .text-foot {
    width:260px;
    height: 86px;
    background: url('/static/images/pay_text.png') no-repeat;
  }
</style>

<style>
.payment-main .el-tabs__header {
  margin: 0;
}
.payment-main .el-tabs__content {
  padding: 20px;
  border: 1px solid #ddd;
  border-top: none;
  background: #fff;
}
.payment-main .el-tabs__nav {
  background: #fff;
}
</style>

