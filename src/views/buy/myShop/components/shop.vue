<template>
    <div class="shop-content">
      <div class="shop-title bg-paleRed center-content">
        <h3 class="weight-normal inline-block" style="color:#fff;margin:0">店铺名称</h3>
        <el-button type="text" class="search-button">搜索</el-button>
        <el-input size="mini" class="medium-input" style="font-size:12px;float:right;" v-model="keywords" placeholder="关键词"></el-input>
      </div>
      <div class="detail-comment center-content border-box">
        <div class="shop-category">
          <category v-on:getGoodsClass="getGoodsClass" v-on:setIndex="setIndex" :data="goodsClass" :title="goodsTitle" :is_blank="false"></category>
        </div>
        <div class="order-comment">
          <div class="goods-list">
            <div class="list-item" v-for="item in goodsData.body" :key="item.index">
              <router-link :to="{path:'/buy/detail', query:{id:item.id}}">
                <img :src="item.picture" class="block" style="height:220px;width:220px;">
              </router-link>
              <p class="text-link-normal" style="font-size:14px;margin:10px 0">
                <router-link :to="{path:'/buy/detail', query:{id:item.id}}">
                  {{item.name}}
                </router-link>
              </p>
              <p class="text-red" style="font-size:16px;font-weight:bolder;">{{item.minPrice | pieceFormat}}</p>
            </div>
          </div>
          <div class="info-page">
            <el-pagination
              @current-change="pageChange"
              layout="prev, pager, next, jumper"
              :page-size="goodsData.pageSize"
              :total="goodsData.total">
            </el-pagination>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import util from '@/utils/util'
import { goodsSearch } from '@/api/buy/buy'
import Category from '../../components/category'
export default {
  components: {
    Category
  },
  data() {
    return {
      goodsData: {
        pageNo: 1,
        pageSize: 50,
        total: 0,
        body: []
      },
      searchParam: {},
      keywords: '',
      tableLoading: false,
      goodsClass: [],
      goodsTitle: '',
      routeIndex: '1'
    }
  },
  filters: {
    pieceFormat(value) {
      return util.pieceFormat(value)
    }
  },
  methods: {
    init() {
      const shopId = this.$route.query.shopId
      const content = this.$route.query.content
      const minPrice = this.$route.query.minPrice
      const maxPrice = this.$route.query.maxPrice
      const shopType = this.$route.query.shopType

      this.searchParam = {
        content: content,
        minPrice: minPrice,
        maxPrice: maxPrice,
        shopType: shopType,
        shopId: shopId
      }
      this.goodsSearch(this.searchParam)
    },
    // 商品查询
    goodsSearch(params) {
      console.log(params)
      const this_ = this
      const newParams = util.arrDeepCopy(params)
      newParams.pageNo = this.goodsData.pageNo
      newParams.pageSize = this.goodsData.pageSize
      if (newParams.shopType === undefined) {
        delete newParams.shopType
      }
      if (newParams.minPrice === '') {
        delete newParams.minPrice
      }
      if (newParams.maxPrice === '') {
        delete newParams.maxPrice
      }
      goodsSearch(newParams).then(function(data) {
        if (data.data.code === 200) {
          this_.goodsData.body = data.data.data.results
          this_.goodsData.total = data.data.data.total
        }
      })
    },
    pageChange(val) {
      this.goodsData.pageNo = val
      this.goodsSearch(this.searchParam)
    },
    getGoodsClass(item) {
      this.goodsClass = item.data
      this.goodsTitle = item.title
    },
    setIndex(id) {
      this.searchParam.shopType = id
      this.goodsSearch(this.searchParam)
    }
  },

  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.shop-content {
  width: 100%;
  padding-top: 20px;
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
  width: 980px;
  padding: 10px;
  float: right;
  background: #fff;
}
.list-item {
  width: 220px;
  height: 300px;
  display: inline-block;
  margin: 0 20px 40px 0;
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
.shop-title {
  height: 42px;
  line-height: 42px;
  margin-bottom: 20px;
  overflow: hidden;
  padding: 0 20px;
  box-sizing: border-box;
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