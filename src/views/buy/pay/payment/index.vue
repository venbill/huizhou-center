<template>
    <div class="pay-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <div class="payment-main center-content border-box">
        <div class="payment-title">收银台</div>
        <div class="payment-info flex-box">
          <div class="info-item">
            <p>订单编号：<span>123456789</span></p>
            <p>订单编号：<span>123456789</span></p>
          </div>
          <div class="info-item" style="display:flex;align-items:center;">
            <p>
              <span>应付金额：</span>
              <span class="text-red weight-bold" style="font-size:24px">123</span>
            </p>
          </div>
        </div>
        <el-tabs type="card">
          <el-tab-pane label="微信支付">
            <div class="QR_Code"></div>
            <div class="text-foot"></div>
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
import BuyHeader from '@/views/buy/components/header'
import BuySearch from '@/views/buy/components/search'
import NavTitle from '@/views/buy/components/navTitle'
export default {
  components: {
    BuyHeader, BuySearch, NavTitle
  },
  data() {
    return {
    }
  },
  methods: {},

  mounted() {}
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
  .QR_Code {
    height: 260px;
    width: 260px;
    margin-bottom: 10px;
    background: silver;
  }
  .text-foot {
    width:260px;
    height: 86px;
    background: url('/static/images/pay_text.png')
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

