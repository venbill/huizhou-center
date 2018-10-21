<template>
    <div class="address-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <div class="bg-white center-content border-box" style="margin:20px auto;padding:0 20px;">
        <template>
          <!--收货地址-->
          <title-box :title="'收货地址'">
            <rece-address v-on:addressChoose="addressChoose" :is_check="true"></rece-address>
          </title-box>
          <!--支付方式-->
          <title-box :title="'支付方式'">
            <type-choose :data="payData" :boxIndex=0></type-choose>
          </title-box>
        </template>
        <div class="order-confirm">
          <div class="confirm-title">确认订单信息</div>
          <el-table :data="orderData" style="width: 100%" :header-cell-style="headerBg">
            <el-table-column prop="goodsName" label="商品名称">
              <template slot-scope="scope">
                <div class="goods-box">
                  <router-link :to="{path:'/buy/detail',query:{id:shopId}}" target="_blank" style="height:40px;width:40px;margin-right:10px">
                    <img :src="scope.row.imgUrl">
                  </router-link>
                  <router-link :to="{path:'/buy/detail',query:{id:shopId}}" target="_blank" class="text-link-normal">
                    <span>{{scope.row.goodsName}}</span>
                  </router-link>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goodsAttr" label="商品属性" width="200">
              <template slot-scope="scope">
                <div v-for="item in scope.row.shopAttr" :key="item.index" style="font-size:12px">
                  <span class="inline-block" style="width:50px">{{item.attrName}}：</span>
                  <span>{{item.attrValue}}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="unitPrice" label="购买价格" width="120">
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
          <!-- <div class="goods-count">
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
          </div> -->
        </div>
        <div class="address-foot">
          <el-button size="max" class="btn-red" @click="payMent">立即下单</el-button>
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
import { goodDetail } from '@/api/buy/buy'
import util from '@/utils/util'
export default {
  components: {
    BuyHeader, BuySearch, ReceAddress, NavTitle, TitleBox, TypeChoose
  },
  data() {
    return {
      shopId: '', // 商品ID
      shopInfo: {},
      addressInfo: '', // 选中地址信息
      imgUrl: '',
      orderData: [],
      message: '', // 会员留言
      payData: {
        type: [
          {
            name: '微信支付'
          }
        ], // 类型数组
        explainText: '' // 说明文字
      }
    }
  },
  methods: {
    // 表头回调函数
    headerBg: function(row) {
      return { 'background': '#f5f7fa', 'color': '#1F2D3D' }
    },
    init() {
      const this_ = this
      this.shopId = this.$route.query.goodsId
      // 获取商品详情
      goodDetail(this.shopId).then(function(data) {
        if (data.data.code === 200) {
          this_.shopInfo = data.data.data
          // 获取商品图片
          if (this_.shopInfo.pictures.length > 0) {
            this_.imgUrl = this_.shopInfo.pictures[0]
          }
          // 封装渲染数据
          const params = {
            imgUrl: this_.imgUrl,
            goodsName: this_.shopInfo.goodsName,
            unitPrice: this_.$route.query.unitPrice,
            number: this_.$route.query.number,
            count: this_.$route.query.totalPrice
          }
          params.shopAttr = JSON.parse(localStorage.getItem('shopInfo'))
          this_.orderData.push(params)
          this_.shouldPay = params.count
        }
      })

      // 计算订单总额
      this.count()
    },
    // 计算订单总额
    count() {
      const shouldPay = this.shouldPay // 应付金额
      const discount = -this.discount // 优惠
      const coupon = -this.coupon // 优惠券抵扣
      const freight = -this.freight // 运费
      this.totalPrice = util.numberAdd(shouldPay, discount, coupon, freight) // 订单总额
    },
    // 获取子组件地址id
    addressChoose(item) {
      this.addressInfo = item
    },
    // 支付
    payMent() {
      // this.$router.push('/buy/pay/payment')
    }
  },

  mounted() {
    this.init()
  }
}
</script>

<style scoped>
  img {
    width: 100%;
    height: 100%;
  }
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
    width: 100%;
  }
  .goods-count {
    float: right;
    height: 200px;
    width:260px;
    font-size: 14px;
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