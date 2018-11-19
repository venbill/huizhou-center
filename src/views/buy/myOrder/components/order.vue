<template>
    <div class="list-content">
      <div class="detail-comment center-content border-box">
        <!-- <div class="shop-category">
          <category></category>
        </div> -->
        <div class="order-comment">
          <div class="order-search bg-paleRed">
            <h3 class="weight-normal inline-block" style="color:#fff;margin:0">我的商城订单</h3>
            <!-- <el-button type="text" class="search-button">搜索</el-button>
            <el-input size="mini" class="medium-input" style="font-size:12px;float:right;" v-model="keywords" placeholder="商品名称/商品编号/订单编号"></el-input> -->
          </div>
          <el-tabs v-model="activeTab" type="border-card">
            <div class="order-type">
              <el-button class="typeItem" :class="{active:typeIndex === item.type}" v-for="item in orderType" :key="item.index" @click="typeChange(item.type)">{{item.title}}</el-button>
            </div>
            <div class="order-title">
              <div class="title-item" style="width:526px">订单信息</div>
              <!-- <div class="title-item" style="width:168px">收货人</div> -->
              <div class="title-item" style="width:168px">订单金额</div>
              <div class="title-item" style="width:168px">订单时间</div>
              <div class="title-item" style="width:168px">订单状态</div>
              <div class="title-item" style="width:167px">订单操作</div>
            </div>
            <el-tab-pane label="我的订单" name="first">
              <template v-if="typeIndex === 2">
                <div class="order-info" v-for="sub in orderInfo.table" :key="sub.index">
                  <div class="info-title">
                    <span style="margin-right:30px">{{getName_date(sub.createTime)}}</span>
                    <span style="margin-right:30px">
                      订单号：
                      <span style="color:#000">{{sub.id}}</span>
                    </span>
                    <!-- <span style="color:red">{{sub.shopName}}</span> -->
                    <!-- <span style="float:right">
                      客服电话：
                      <span style="color:#000">{{sub.serviceTel}}</span>
                    </span> -->
                  </div>
                  <div class="info-detail">
                    <div class="detail-goods info-item">
                      <div class="goods-item" v-for="item in sub.buyGoodsDetailVmList" :key="item.index">
                        <img :src="item.picture" class="inline-block" style="height:62px;width:62px;background:silver;float:left;">
                        <div class="goods-name inline-block">
                          {{item.goodsName}}
                        </div>
                        <div class="goods-count inline-block float-left" style="margin-left: 80px;">X{{item.buyNo}}</div>
                      </div>
                    </div>
                    <!-- <div class="detail-people info-item">王京</div> -->
                    <div class="detail-piece info-item">
                      <p>{{sub.totalMoney}}</p>
                      <!-- <p>货到付款</p> -->
                    </div>
                    <div class="detail-time info-item">{{getName_date(sub.createTime)}}</div>
                    <div class="detail-status info-item">{{typeText(sub.status)}}</div>
                    <div class="detail-handle info-item">
                      <!-- <p style="margin-bottom:30px">剩余15分</p> -->
                      <p class="text-link" @click="toPay(sub.id)">立即支付</p>
                    </div>
                  </div>
                </div>
              </template>
              <template v-else>
                <div class="order-info" v-for="sub in orderInfo.table" :key="sub.index">
                  <div class="info-title">
                    <span style="margin-right:30px">{{getName_date(sub.createTime)}}</span>
                    <span style="margin-right:30px">
                      订单号：
                      <span style="color:#000">{{sub.orderId}}</span>
                    </span>
                    <span style="color:red">{{sub.shopName}}</span>
                    <span style="float:right">
                      客服电话：
                      <span style="color:#000">{{sub.serviceTel}}</span>
                    </span>
                  </div>
                  <div class="info-detail">
                    <div class="detail-goods info-item">
                      <div class="goods-item">
                        <img :src="sub.picture" class="inline-block" style="height:62px;width:62px;background:silver;float:left;">
                        <div class="goods-name inline-block">
                          {{sub.goodsName}}
                        </div>
                        <div class="goods-count inline-block float-left" style="margin-left: 80px;">X{{sub.buyNo}}</div>
                      </div>
                    </div>
                    <!-- <div class="detail-people info-item">王京</div> -->
                    <div class="detail-piece info-item">
                      <p>{{sub.price}}</p>
                      <!-- <p>货到付款</p> -->
                    </div>
                    <div class="detail-time info-item">{{getName_date(sub.createTime)}}</div>
                    <div class="detail-status info-item">{{typeText(sub.status)}}</div>
                    <div class="detail-handle info-item">
                      <!-- <p style="margin-bottom:30px">剩余15分</p> -->
                      <template v-if="sub.status === 2">
                        <p class="text-link" @click="toPay(sub.orderId)">立即支付</p>
                      </template>
                      <template v-if="sub.status === 4">
                        <p class="text-link" @click="confirmAccept(sub.detailId)">确认收货</p>
                      </template>
                      <template v-if="sub.status === 5">
                        <p class="text-link" @click="commentClick(sub.detailId)">立即评价</p>
                      </template>
                    </div>
                  </div>
                </div>
              </template>
            </el-tab-pane>
            <div class="info-page">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="orderInfo.pageSize"
                @current-change="pageChange"
                :total="orderInfo.paginationTotal">
              </el-pagination>
            </div>
          </el-tabs>
        </div>
      </div>
      <!--新增、编辑弹窗-->
      <el-dialog title="评价" :visible.sync="popStatus" @close="resetForm('popForm')" width="500px">
        <el-form :model="popData" :rules="popRules" ref="popForm" label-width="110px">
          <el-form-item label="评分：" prop="score">
            <el-rate class="scoreInput"
              v-model="popData.score" show-text
              :colors="['#99A9BF', '#F7BA2A', '#FF9900']">
            </el-rate>
          </el-form-item>
          <el-form-item label="评价内容：" prop="comment">
            <el-input type="textarea" v-model="popData.comment" :autosize="{ minRows: 4}" resize="none"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('popForm')">提交</el-button>
            <el-button @click="resetForm('popForm')">取消</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
</template>

<script>
import util from '@/utils/util'
import { getOrderList, confirmAccept, comment } from '@/api/buy/buy'
import Category from '../../components/category'
export default {
  components: {
    Category
  },
  data() {
    const validateScore = (rule, value, callback) => {
      if (value === 0) {
        callback(new Error('请选择评分'))
      } else {
        callback()
      }
    }
    return {
      popRules: {
        score: [
          { required: true, validator: validateScore }
        ],
        comment: [
          { required: true, message: '请输入评价', trigger: 'blur' }
        ]
      },
      orderType: [
        {
          title: '全部订单',
          type: 0
        },
        {
          title: '待支付',
          type: 2
        },
        {
          title: '待发货',
          type: 3
        },
        {
          title: '待收货',
          type: 4
        },
        {
          title: '已完成',
          type: 6
        },
        {
          title: '待评价',
          type: 5
        }
      ],
      keywords: '',
      activeTab: 'first',
      typeIndex: 0,
      orderInfo: {
        paginationTotal: 0,
        pageNo: 1,
        pageSize: 10,
        status: 0,
        table: []
      },
      popStatus: false,
      popData: {
        comment: '',
        orderId: null,
        score: 0
      },
      tableLoading: false
    }
  },
  methods: {
    // 表头回调函数
    headerBg: function(row) {
      return { 'background': '#f5f7fa', 'color': '#1F2D3D' }
    },
    init() {
      this.getOrderList()
    },
    // 获取订单列表
    getOrderList() {
      const this_ = this
      const params = {
        pageNo: this.orderInfo.pageNo,
        pageSize: this.orderInfo.pageSize,
        status: this.orderInfo.status
      }
      getOrderList(params).then(function(data) {
        if (data.data.code === 200) {
          this_.orderInfo.table = data.data.data.results
          this_.orderInfo.paginationTotal = data.data.data.total
        }
      })
    },
    // 日期时间处理
    getName_date(date) {
      if (date) {
        return util.formatDate.format(new Date(date), 'yyyy-MM-dd')
      }
    },
    // 类型处理
    typeText(val) {
      for (let i = 0; i < this.orderType.length; i++) {
        if (val === this.orderType[i].type) {
          return this.orderType[i].title
        }
      }
    },
    // 类型切换
    typeChange(val) {
      this.orderInfo.status = val
      this.typeIndex = val
      this.getOrderList()
    },
    // 跳转支付
    toPay(id) {
      this.$router.push(
        {
          path: '/buy/pay/payment',
          query: {
            id: id
          }
        }
      )
    },
    // 评价
    commentClick(id) {
      this.popStatus = true
      this.popData.orderId = id
    },
    // 提交表单
    submitForm(formName) {
      const this_ = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          const params = this_.popData
          comment(params).then(function(data) {
            if (data.data.code === 200) {
              this_.$message.success('评价成功')
              this_.resetForm('popForm')
              this_.getOrderList()
            }
          })
        } else {
          return false
        }
      })
    },
    // 确认到货
    confirmAccept(id) {
      const this_ = this
      confirmAccept(id).then(function(data) {
        if (data.data.code === 200) {
          this_.$message.success('操作成功')
          this_.getOrderList()
        }
      })
    },
    pageChange(val) {
      this.orderInfo.pageNo = val
      this.getOrderList()
    },
    // 重置表单
    resetForm(formName) {
      this.popStatus = false
      this.$refs[formName].resetFields()
      this.popData = {
        comment: '',
        orderId: null,
        score: 0
      }
    }
  },

  mounted() {
    this.init()
  },
  computed: {
    score() {
      return this.popData.score
    }
  },
  watch: {
    score(val) {
      this.$refs['popForm'].validateField('score')
    }
  }
}
</script>

<style scoped>
.list-content {
  width: 100%;
}
.order-type {
  padding: 20px 0;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
}
.typeItem {
  margin: 0 10px;
}
.typeItem.active {
  background: #d1201e;
  color: #fff;
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
.scoreInput {
  line-height: 2.5;
}
</style>
