<template>
    <div class="myOrder-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <div class="list-content center-content">
        <div class="detail-main center-content bg-white border-box">
          <div class="detail-img">
            <div class="detail-bigImg"></div>
          </div>
          <div class="detail-buy">
            <p class="detail-buy-title" style="font-size:22px;color:#000;margin-bottom:30px">阿斯兰的咖啡机啊索拉卡打飞机拉斯卡复活阿萨德李开复</p>
            <div class="detail-buy-price text-silver">
              <p>
                <span class="item-title">价格</span>
                <span class="text-red weight-bold" style="font-size:28px;">123</span>
                元
              </p>
              <p>
                <span class="item-title">评价</span>
                <span class="text-red">促销说明</span>
              </p>
              <p>
                <span class="item-title">颜色</span>
                <span>服务说明</span>
              </p>
              <p>
                <span class="item-title">尺码</span>
                <span>服务说明</span>
              </p>
              <p style="margin-left:53px;">
                <span class="block">现在查看的是 您所购买商品的信息</span>
                <span class="block">于2018年9月20日下单购买了此商品</span>
              </p>
            </div>
            <!-- <el-form class="comment-form" :model="commentForm" :rules="commentRules" ref="commentForm" label-width="50px">
              <el-form-item prop="color" label="颜色" class="heightItem">
                <div class="color-item inline-block" v-for="item in 6" :key="item.index">
                  <img src="">
                </div>
              </el-form-item>
              <el-form-item prop="number" label="数量">
                <el-input-number v-model="commentForm.number" :min="1" class="mini-number"></el-input-number>
              </el-form-item>
            </el-form> -->
          </div>
        </div>
      </div>
      <div class="comment-form center-content border-box">
        <p style="font-size:18px;margin-bottom:20px">其他买家需要您的建议哦！</p>
        <el-form :model="commentForm" :rules="commentRules" ref="commentForm" label-width="100px">
          <el-form-item prop="content" label="使用感受：" class="heightItem">
            <el-input type="textarea" style="width:70%"
             placeholder="请输入评价内容"
             v-model="commentForm.content" :autosize="{ minRows: 4}"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="mini" class="btn-red">提价评价</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
</template>

<script>
import BuyHeader from '../../components/header'
import BuySearch from '../../components/search'
import NavTitle from '../../components/navTitle'
export default {
  components: {
    BuyHeader, BuySearch, NavTitle
  },
  data() {
    return {
      commentForm: {
        content: ''
      },
      commentRules: {
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    init() {
    }
  },

  mounted() {
  }
}
</script>

<style scoped>
.list-content {
  background: #fff;
}
.center-content .item{
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
}
.center-content .item:hover {
  background: #d1201e;
}
.no-data {
  font-size: 12px;
}
.hotGoods {
  margin-top: 30px;
}
.hotGoods-content {
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 25px 30px;
  text-align: center;
}
.hotGoods-content .r-card:not(:last-child) {
  margin-right: 20px;
}
.r-card-text {
  display: inline-block;
  line-height: 1.4;
  height: 32px;
  overflow: hidden;
}
.detail-main {
  height: 500px;
  background: #fff;
}
.detail-img {
  width: 490px;
  height: 490px;
  float: left;
  padding: 30px;
  background: silver;
}
.detail-bigImg {
  height: 430px;
  width: 430px;
  float: left;
}
.detail-smallImg {
  width: 180px;
  height: 430px;
  float: right;
  background: green;
}
.smallImg-item {
  height: 76px;
  width: 76px;
  margin: 0 auto 10px;
}
.detail-buy {
  height: 490px;
  width: 650px;
  padding: 30px 0;
  float: right;
}
.detail-buy p {
  margin: 4px 0;
}
.detail-buy-price {
  font-size: 12px;
  padding: 0;
}
.detail-buy-price p {
  margin: 20px 0;
}
.item-title {
  display: inline-block;
  width: 50px;
}
.comment-form {
  padding: 50px;
  margin: 30px 0;
  border: 1px solid #f0eceb;
  background: #fff;
}
.color-item {
  height:50px;
  width:50px;
  margin: 0 20px 10px 0;
  border:1px solid #ddd;
}
.detail-comment {
  padding: 20px 10px;
  margin-top: 20px;
  background: #fff;
}
.shop-search {
  width: 200px;
  min-height: 400px;
  float: left;
}
.search-input, .search-type {
  width: 190px;
  margin: 0 auto 16px;
  padding: 0 0 10px;
}
.search-input {
  border: 1px solid #ddd;
}
.search-title {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding: 0 5px;
  background: #f7f7f7;
}
.shop-comment {
  width: 960px;
  float: right;
}
.search-form {
  font-size: 12px;
}
.search-type .type-item {
  background: #F5F5F5;
  height: 36px;
  line-height: 36px;
  padding-left: 40px;
  font-size: 12px;
}
.search-type .type-item:not(:last-child) {
  border-bottom: 1px solid #ddd
}
.detail-item {
  display: inline-block;
  width: 200px;
  font-size: 12px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  margin: 2px 30px 2px 0;
}
</style>

<style>
.hotGoods-content .el-card__body {
  padding: 0;
}
.list-title .el-breadcrumb {
  line-height: 42px;
  font-size: 12px;
}
.list-title .el-breadcrumb__inner, .list-title .el-breadcrumb__inner a {
  color: #666;
}
.list-title .el-breadcrumb__inner:hover {
  color: red;
}
.comment-form label {
  font-weight: normal;
}
.heightItem label {
  line-height: 50px!important;
}
.search-form label {
  font-size: 12px;
  line-height: 30px!important;
  padding: 5px;
  font-weight: normal;
}
.search-form .el-form-item {
  margin-bottom: 4px;
}
.search-form input {
  padding: 0 2px;
}
.shop-comment .el-tabs__content {
  padding: 20px 0 0;
}
</style>