<template>
    <div class="address-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <!-- <nav-title></nav-title> -->
      <div class="bg-white center-content border-box" style="margin:20px auto;padding:0 20px;">
        <template>
          <!--收货地址-->
          <title-box :title="'收货地址'">
            <rece-address></rece-address>
          </title-box>
        </template>
      </div>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import NavTitle from '../components/navTitle'
import ReceAddress from '../components/address'
import TitleBox from '../components/titleBox'
export default {
  components: {
    BuyHeader, BuySearch, ReceAddress, NavTitle, TitleBox
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