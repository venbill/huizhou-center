<template>
    <div class="list-content">
      <div class="detail-comment center-content border-box">
        <div class="order-comment">
          <div class="order-search bg-paleRed">
            <h3 class="weight-normal inline-block" style="color:#fff;margin:0">我的民宿订单</h3>
            <el-button type="text" class="search-button">搜索</el-button>
            <el-input size="mini" class="medium-input" style="font-size:12px;float:right;" v-model="keywords" placeholder="商品名称/商品编号/订单编号"></el-input>
          </div>
          <el-tabs v-model="activeTab" type="border-card" @tab-click="handleClick">
            <div class="order-title">
              <div class="title-item" style="width:378px">订单信息</div>
              <div class="title-item" style="width:120px">收货人</div>
              <div class="title-item" style="width:120px">订单金额</div>
              <div class="title-item" style="width:120px">订单时间</div>
              <div class="title-item" style="width:120px">订单状态</div>
              <div class="title-item" style="width:120px">订单操作</div>
            </div>
            <el-tab-pane label="我的订单" name="first">
              <div class="order-info" v-for="sub in 4" :key="sub.index">
                <div class="info-title">
                  <span style="margin-right:30px">2018-10-11</span>
                  <span style="margin-right:30px">
                    订单号：
                    <span style="color:#000">12345678</span>
                  </span>
                  <span class="text-link" style="color:red">魅族旗舰店</span>
                  <span style="float:right">
                    客服电话：
                    <span style="color:#000">1234567890</span>
                  </span>
                </div>
                <div class="info-detail">
                  <div class="detail-goods info-item">
                    <div class="goods-item" v-for="item in 2" :key="item.index">
                      <img src="" class="inline-block" style="height:62px;width:62px;background:silver;float:left;">
                      <div class="goods-name inline-block">
                        阿拉山口多年来的撒旦个花露水的快感和 阿拉山口多年来的撒旦个花露水的快感和
                      </div>
                      <div class="goods-count inline-block float-left">X1</div>
                    </div>
                  </div>
                  <div class="detail-people info-item">王京</div>
                  <div class="detail-piece info-item">
                    <p>123</p>
                    <p>货到付款</p>
                  </div>
                  <div class="detail-time info-item">2018-4-5</div>
                  <div class="detail-status info-item">状态</div>
                  <div class="detail-handle info-item">
                    <p style="margin-bottom:30px">剩余15分</p>
                    <p class="text-link">立即支付</p>
                    <p class="text-link">取消订单</p>
                    <p>评价</p>
                  </div>
                </div>
              </div>
            </el-tab-pane>
            <el-tab-pane class="" label="待付款" name="second">
              
            </el-tab-pane>
            <el-tab-pane label="代发货" name="third">
              
            </el-tab-pane>
            <el-tab-pane label="代收货" name="fourth">
              
            </el-tab-pane>
            <el-tab-pane label="交易完成" name="five">
              
            </el-tab-pane>
            <el-tab-pane label="订单信息" name="six">
              
            </el-tab-pane>
            <div class="info-page">
              <el-pagination
                layout="prev, pager, next"
                :page-size="10"
                :total="100">
              </el-pagination>
            </div>
          </el-tabs>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      buyRules: {

      },
      keywords: '',
      activeTab: 'first',
      commentTab: 'first',
      allData: {
        paginationTotal: 100,
        star: 4,
        table: [
          {
            appraisal: '所有心得',
            satisfaction: 4,
            information: '所有购买信息',
            commentator: '所有评论者'
          }
        ]
      },
      goodData: {
        paginationTotal: 100,
        table: [
          {
            appraisal: '好评心得',
            satisfaction: '好评满意程度',
            information: '好评购买信息',
            commentator: '好评评论者'
          }
        ]
      },
      middleData: {
        paginationTotal: 100,
        table: [
          {
            appraisal: '中评心得',
            satisfaction: '中评满意程度',
            information: '中评购买信息',
            commentator: '中评评论者'
          }
        ]
      },
      badData: {
        paginationTotal: 100,
        table: [
          {
            appraisal: '差评心得',
            satisfaction: '差评满意程度',
            information: '差评购买信息',
            commentator: '差评评论者'
          }
        ]
      },
      tableLoading: false
    }
  },
  methods: {
    // 表头回调函数
    headerBg: function(row) {
      return { 'background': '#f5f7fa', 'color': '#1F2D3D' }
    },
    handleClick() {
      console.log(this.activeTab)
    },
    commentClick() {

    },
    pageChange() {}
  },

  mounted() {}
}
</script>

<style scoped>
.list-content {
  width: 100%;
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
  width: 700px;
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
  width: 450px;
  padding: 30px 0;
  float: right;
}
.detail-buy p {
  margin: 4px 0;
}
.detail-buy-price {
  background: #ECDEC3;
  font-size: 12px;
  padding: 1px 20px;
}
.detail-buy-price p {
  margin: 10px 0;
}
.item-title {
  display: inline-block;
  width: 50px;
}
.buy-form {
  padding: 10px;
}
.color-item {
  height:50px;
  width:50px;
  margin: 0 20px 10px 0;
  border:1px solid #ddd;
}
.detail-comment {
  padding: 0;
  margin: 10px auto 40px;
}
.shop-category {
  width: 200px;
  min-height: 400px;
  float: left;
}
.search-input, .search-type {
  width: 190px;
  border: 1px solid #ddd;
  margin: 0 auto 16px;
  padding: 0 0 10px;
}
.search-title {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding: 0 5px;
  background: #f7f7f7;
}
.order-comment {
  /* width: 980px;
  float: right; */
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
.order-search {
  height: 42px;
  line-height: 42px;
  margin-bottom: 20px;
  padding: 0 20px;
}
.search-button {
  font-size: 12px;
  float:right;
  color:#fff;
  margin:4px 0 0 40px
}
.search-button:hover {
  color:#A0CFFF;
}
.order-title {
  background: #F5F7FA;
  height: 50px;
  line-height: 50px;
  color: #a3a3a3;
  font-size: 14px;
  text-align: center;
}
.order-title .title-item {
  float: left;
}
.order-info {
  border-top: 1px solid #ddd;
}
.order-info .info-title {
  border-bottom: 1px solid #ddd;
  color: #a3a3a3;
  font-size: 14px;
  padding: 8px 40px;
}
.order-info .info-detail {
  display: flex;
}
.order-info .info-detail .info-item.detail-goods {
  flex: 3.15
}
.order-info .info-detail .info-item {
  flex: 1;
  color: #a3a3a3;
  font-size: 12px;
}
.order-info .info-detail .info-item:not(:last-child) {
  border-right: 1px solid #ddd;
}
.order-info .info-detail .info-item:not(:first-child) {
  padding: 20px 0;
  text-align: center;
}
.goods-item {
  display: flex;
  width: 100%;
  padding: 10px;
}
.goods-item:not(:last-child) {
  border-bottom: 1px solid #ddd;
}
.goods-name {
  float: left;
  width:270px;
  height: 100%;
  padding: 0 10px;
  overflow: hidden;
}
.goods-count {
  line-height: 62px;
}
.detail-handle .text-link {
  margin-bottom: 10px;
}
.info-page {
  background: #fff;
  border-top: 1px solid #ddd;
  padding: 15px 0;
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
.buy-form label {
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
.order-comment .el-tabs__content {
  padding: 0;
  background: #f7f7f7;
}
.info-page .el-pagination {
  text-align: right
}
</style>