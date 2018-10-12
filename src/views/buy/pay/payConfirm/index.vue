<template>
    <div class="address-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <div class="bg-white center-content border-box" style="margin:20px auto;padding:0 20px;">
        <template>
          <!--收货地址-->
          <title-box>
            <rece-address></rece-address>
          </title-box>
          <!--选择按钮-->
          <title-box>
            <type-choose></type-choose>
          </title-box>
        </template>
        <div class="order-confirm">
          <div class="confirm-title">确认订单信息</div>
          <el-table :data="orderData" style="width: 100%" :header-cell-style="headerBg">
            <el-table-column prop="goodsName" label="商品名称">
              <template slot-scope="scope">
                <div class="goods-box">
                  <img src="" style="height:40px;width:40px;background:silver;margin-right:10px">
                  <span class="text-link">商品名称</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="piece" label="购买价格" width="120">
            </el-table-column>
            <el-table-column prop="number" label="购买数量" width="120">
            </el-table-column>
            <el-table-column prop="count" label="小计" width="120">
            </el-table-column>
          </el-table>
        </div>
        <div class="order-confirm" style="height: 220px">
          <div class="message-main">
            <div class="confirm-title">会员留言</div>
            <div class="message-input">
              <el-input type="textarea" v-model="message" :rows="6" resize="none"></el-input>
            </div>
          </div>
          <div class="goods-count">
            <p>
              <span class="count-title">订单总额：</span>
              <span class="count-piece">123</span>
            </p>
            <p>
              <span class="count-title">活动优惠：</span>
              <span class="count-piece">123</span>
            </p>
            <p>
              <span class="count-title">优惠券抵扣：</span>
              <span class="count-piece">123</span>
            </p>
            <p>
              <span class="count-title">运费：</span>
              <span class="count-piece">123</span>
            </p>
            <div class="should-pay">
              <span class="count-title">应付金额：</span>
              <span class="count-piece should-piece">500</span>
            </div>
          </div>
        </div>
        <div class="address-foot">
          <el-button size="max" plain>返回购物车</el-button>
          <el-button size="max" class="btn-red">立即下单</el-button>
        </div>
      </div>
    </div>
</template>

<script>
import BuyHeader from '../../components/header'
import BuySearch from '../../components/search'
import NavTitle from '../../components/navTitle'
import ReceAddress from '../../components/address'
import TitleBox from '../../components/titleBox'
import TypeChoose from '../../components/typeChoose'
export default {
  components: {
    BuyHeader, BuySearch, ReceAddress, NavTitle, TitleBox, TypeChoose
  },
  data() {
    return {
      orderData: [
        {
          goodsName: '',
          piece: '39',
          number: '5',
          count: '195'
        }
      ],
      message: ''
    }
  },
  methods: {
    // 表头回调函数
    headerBg: function(row) {
      return { 'background': '#f5f7fa', 'color': '#1F2D3D' }
    }
  },

  mounted() {}
}
</script>

<style scoped>
  .address-content{
    height:auto;
    padding:0;
    color: #666;
  }
  .confirm-title {
    padding: 20px 0;
  }
  .order-confirm {
    padding-bottom: 20px;
  }
  .goods-box {
    display: flex;
    align-items: center;
  }
  .message-main {
    float: left;
    height: 200px;
    width: 700px;
  }
  .goods-count {
    float: right;
    height: 200px;
    width:260px;
    font-size: 14px;
    background: silver
  }
  .goods-count p {
    padding-bottom: 10px;
  }
  .count-title {
    display: inline-block;
    width:110px;
    text-align: right;
  }
  .count-piece {
    display: inline-block;
    width:120px;
    color: red;
    text-align: right;
  }
  .should-piece {
    font-size: 30px
  }
  .address-foot {
    margin-top: 20px;
    padding: 20px;
    background: #fafafa;
    text-align: right;
  }
</style>