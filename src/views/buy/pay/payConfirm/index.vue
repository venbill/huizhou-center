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
                  <router-link :to="{path:'/buy/detail',query:{id:scope.row.goodsId}}" target="_blank" style="height:40px;width:40px;margin-right:10px">
                    <img :src="scope.row.picture">
                  </router-link>
                  <router-link :to="{path:'/buy/detail',query:{id:scope.row.goodsId}}" target="_blank" class="text-link-normal">
                    <span>{{scope.row.goodsName}}</span>
                  </router-link>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="goodsAttributesValuesContent" label="商品属性" width="200">
              <!-- <template slot-scope="scope">
                <div v-for="item in scope.row.shopAttr" :key="item.index" style="font-size:12px">
                  <span class="inline-block" style="width:50px">{{item.goodsAttributesValuesContent}}：</span>
                  <span>{{item.attrValue}}</span>
                </div>
              </template> -->
            </el-table-column>
            <el-table-column prop="price" label="购买价格" width="120">
            </el-table-column>
            <el-table-column prop="buyNo" label="购买数量" width="120">
            </el-table-column>
            <el-table-column prop="totalPrice" label="小计" width="120">
            </el-table-column>
          </el-table>
          <div class="price-count" style="padding:20px 70px 0 0;text-align:right;font-size:14px">
            总计：<span style="color:red;font-size:20px;margin-left:10px;">{{countPrice}}</span>
          </div>
        </div>
        <!-- <div class="order-confirm" style="height: 220px">
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
        </div> -->
        <div class="address-foot">
          <el-button size="max" @click="toShoppingCart">返回购物车</el-button>
          <el-button size="max" class="btn-red" :loading="loading" @click="payMent">立即下单</el-button>
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
import { createOrder } from '@/api/buy/buy'
export default {
  components: {
    BuyHeader, BuySearch, ReceAddress, NavTitle, TitleBox, TypeChoose
  },
  data() {
    return {
      addressInfo: '', // 选中地址信息
      orderData: [], // 商品数组
      typeStatus: '', // 直接购买(1)或者购物车购买(2)
      countPrice: 0, // 所有商品总价
      message: '', // 会员留言
      payData: {
        type: [
          {
            name: '微信支付'
          }
        ], // 支付方式数组
        explainText: '' // 说明文字
      },
      loading: false
    }
  },
  methods: {
    // 表头回调函数
    headerBg: function(row) {
      return { 'background': '#f5f7fa', 'color': '#1F2D3D' }
    },
    init() {
      this.typeStatus = this.$route.query.type
      this.orderData = JSON.parse(localStorage.getItem('shopInfo'))
      // 计算单个商品总价
      this.orderData.forEach(function(e) {
        const price = e.price * 100
        const num = e.buyNo
        e.totalPrice = (price * num) / 100
        e.remark = ''
      })
      // 计算所有商品总价
      this.priceCount()
    },
    // 计算所有商品总价
    priceCount() {
      let count = 0
      this.orderData.forEach(function(e) {
        count += e.totalPrice
      })
      this.countPrice = '￥' + count
    },
    // 获取子组件地址id
    addressChoose(item) {
      this.addressInfo = item
    },
    // 支付
    payMent() {
      const this_ = this
      if (this.addressInfo.id === undefined) {
        this.$message.info('请选择收货地址')
        return
      }
      this.loading = true
      const goodsDetailList = []
      this.orderData.forEach(function(e) {
        const obj = {
          buyCarId: e.buyCarId,
          buyNo: e.buyNo,
          goodsAttributeValues: e.goodsAttributesValues,
          goodsId: e.goodsId,
          remark: e.remark
        }
        goodsDetailList.push(obj)
      })
      const params = {
        deliveryAddress: this.addressInfo.id,
        goodsDetailList: goodsDetailList,
        type: this.typeStatus
      }
      createOrder(params).then(function(data) {
        if (data.data.code === 200) {
          this_.loading = false
          this_.$router.replace(
            {
              path: '/buy/pay/payment',
              query: {
                id: data.data.data
              },
              replace: true
            }
          )
        }
      })
      setTimeout(() => {
        this.loading = false
      }, 2000)
      // this.$router.push('/buy/pay/payment')
    },
    // 返回购物
    toShoppingCart() {
      this.$router.push('/buy/pay')
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