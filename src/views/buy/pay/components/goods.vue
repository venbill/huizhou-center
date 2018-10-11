<template>
    <div class="car-content">
      <div class="center-content goods-type">
        <el-button class="btn-hover-red">全部商品</el-button>
        <el-button class="btn-hover-red">限时优惠</el-button>
        <el-button class="btn-hover-red">库存紧张</el-button>
      </div>
      <div class="center-content border-box bg-white table-title">
        <div class="item" style="width:50px">
          <el-checkbox v-model="allCheck" style="margin-left:-8px"></el-checkbox>
          全选
        </div>
        <div class="item" style="width:350px">
          商品
        </div>
        <div class="item" style="width:160px">
          商品 
        </div>
        <div class="item" style="width:160px">
          单价
        </div>
        <div class="item" style="width:160px">
          数量
        </div>
        <div class="item" style="width:160px">
          小计
        </div>
        <div class="item" style="width:140px">
          操作
        </div>
      </div>
      <div class="center-content table-shop" v-for="sub in 2" :key="sub.index">
        <div class="table-shopName">
          <el-checkbox v-model="allCheck"></el-checkbox>
          测试店铺名
          <span class="inline-block text-link" style="margin-left:40px">
            联系客服 
          </span>
        </div>
        <div class="table-goods" v-for="item in 2" :key="item.index">
          <div class="item flex-middle" style="width:50px;">
            <el-checkbox v-model="allCheck"></el-checkbox>
          </div>
          <div class="item" style="width:350px">
            <img src="" style="height:100px;width:100px;border:1px solid #ddd;float:left;margin-right:20px">
            <div class="text-link">商品名称</div>
          </div>
          <div class="item flex-middle" style="width:160px;overflow:hidden">
            <p>商品信息:商品信息</p>
          </div>
          <div class="item flex-middle" style="width:160px;">
            <p>100</p>
          </div>
          <div class="item flex-middle flex-center" style="width:160px;">
            <el-input-number size="mini" v-model="num1" :min="1"></el-input-number>
          </div>
          <div class="item flex-middle" style="width:160px;">
            <p>100</p>
          </div>
          <div class="item flex-middle flex-center" style="width:140px;">
            <el-button type="text">删除</el-button>
          </div>
        </div>
      </div>
      <div class="center-content table-foot bg-white border-box">
        <el-checkbox v-model="allCheck"></el-checkbox>
        全选
        <el-button type="text" style="margin-left: 40px">删除</el-button>
        
        <el-button class="btn-red" style="float:right;height:100%;width:200px;margin-left:20px;font-size:18px">去付款</el-button>
        <span style="float:right">
          共有
          <span class="text-red" style="font-size:18px">2</span>
          款产品，总计（不含运费）
          <span class="text-red" style="font-size:22px;margin-left:20px">￥189</span>
        </span>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      shoppingCart: {
        table: [
          {
            goods: '商品',
            goodsInfo: '商品信息',
            unitPrice: '单价',
            number: '数量',
            subtotal: '小计'
          }
        ]
      },
      allCheck: false,
      num1: 1
    }
  },
  methods: {
    shoppingChange() {

    }
  },

  mounted() {}
}
</script>

<style scoped>
.car-content {
  width: 100%;
}
.goods-type {
  padding: 20px 0;
}
.table-title {
  padding: 10px 10px;
}
.table-title .item {
  float: left;
  font-size: 12px;
  text-align: center;
}
.table-shop {
  width: 1200px;
  margin: 0 auto;
}
.table-shopName {
  padding: 15px 10px;
  font-size: 12px;
  background: #eee;
}
.table-goods {
  padding: 15px 10px;
  height: 100px;
  clear: both;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  background: #fff;
}
.table-goods .item {
  float: left;
  height: 100%;
}
.table-goods .item p {
  width: 100%;
  text-align: center;
}
.table-foot {
  height: 54px;
  line-height: 50px;
  font-size: 12px;
  margin: 40px auto;
  padding: 0 0 0 10px;
}
</style>