<template>
    <div class="list-content">
      <div class="detail-main center-content bg-white border-box">
        <div class="detail-img">
          <div class="detail-bigImg">
            <img :src="imgUrl">
          </div>
          <div class="detail-smallImg">
            <div class="smallImg-item" v-for="(item, index) in shopInfo.pictures" :key="item.index"
             :class="{active: imgIndex === index}" @mouseenter="showImg(item, index)">
              <img :src="item">
            </div>
          </div>
        </div>
        <div class="detail-buy">
          <p class="detail-buy-title" style="font-size:22px;color:#000;margin-bottom:30px">{{shopInfo.goodsName}}</p>
          <!-- <p class="detail-buy-description" style="font-size:12px;color:#9F9F9F;margin-bottom:30px">奥斯卡地方哈迪斯</p> -->
          <div class="detail-buy-price text-silver">
            <p>
              <span class="item-title">售价</span>
              <span class="text-red" style="font-size:28px;">{{shopPrice}}</span>
            </p>
            <!-- <p>
              <span class="item-title">促销</span>
              <span class="text-red">促销说明</span>
            </p>
            <p>
              <span class="item-title">服务</span>
              <span>服务说明</span>
            </p> -->
          </div>
          <el-form class="buy-form" label-width="70px" label-position="left">
            <el-form-item prop="size" :label="item.keyName + '：'" v-for="(item, index) in shopInfo.selectAttributeDetailList" :key="item.index">
              <div class="color-item inline-block" v-for="(child, sub) in item.attributeValues" :key="child.sub"
               @mouseenter="attrFocus" @mouseleave="attrBlur" @click="attrChoose($event, item, child, index, sub)"
               :class="{active: oneIndex === index && twoIndex === sub, is_disabled:!child.isEnableSelect, is_focus:child.isDefaultSelect}">
                {{child.value}}
              </div>
            </el-form-item>
            <el-form-item prop="number" label="数量">
              <el-input-number v-model="shopNumber" :min="1" class="mini-number"></el-input-number>
            </el-form-item>
            <el-form-item label="">
              <el-button size="max" :loading="addGoodsLoading" @click="addShoppingCart">加入购物车</el-button>
              <el-button size="max" class="btn-red" @click="Buy">立即购买</el-button>
            </el-form-item>
          </el-form>
        </div>

      </div>
      <div class="detail-comment center-content border-box">
        <div class="shop-search">
          <div class="search-input">
            <div class="shop-info">
              {{shopDetail.shopName}}
            </div>
            <div class="search-title">店内搜索</div>
            <el-form class="search-form" :model="searchForm" label-width="50px" label-position="left">
              <el-form-item prop="content" label="关键词:">
                <el-input size="mini" v-model="searchForm.content" class="minier-input"></el-input>
              </el-form-item>
              <el-form-item prop="number" label="价  格:">
                <el-input size="mini" v-model="searchForm.minPrice" class="mini-input"></el-input>
                到
                <el-input size="mini" v-model="searchForm.maxPrice" class="mini-input"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini" @click="goodsSearch">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="search-type">
            <category :title="'商品分类'" :data="shopList" :is_blank="true"></category>
          </div>
        </div>
        <el-tabs class="shop-comment" v-model="activeTab" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="商品详情" name="first">
            <div class="detail-textBox" style="padding:0 15px 40px 15px">
              <p class="detail-item" v-for="item in shopInfo.goodsAttributeList" :key="item.index">
                {{item.attributeName}}：{{item.attributeContent}}
              </p>
            </div>
            <div class="detail-imgBox">
              <img :src="item" v-for="item in shopInfo.pictures" :key="item.index" style="display:block;margin:0 auto;max-width:60%">
            </div>
            <div class="shop-assessment">
              <el-tabs style="width:100%;" v-model="commentTab" type="card" @tab-click="commentClick">
                <el-tab-pane label="全部评价" name="first">
                </el-tab-pane>
                <el-tab-pane label="好评" name="second">
                </el-tab-pane>
                <el-tab-pane label="中评" name="third">
                </el-tab-pane>
                <el-tab-pane label="差评" name="fourth">
                </el-tab-pane>
              </el-tabs>
              <div>
                <v-pageTable pagination :pageChange="pageChange" :page-size="commentsData.pageSize" :paginationTotal="commentsData.paginationTotal">
                  <el-table :data="commentsData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                    <el-table-column prop="comment" label="评价心得">
                    </el-table-column>
                    <el-table-column prop="score" label="顾客满意度" width="178px">
                      <template slot-scope="scope">
                        <el-rate v-model="scope.row.score" text-color="#ff9900" show-text disabled score-template="{value}">
                        </el-rate>
                      </template>
                    </el-table-column>
                    <el-table-column prop="attributesValuesContent" label="购买信息" width="200px">
                    </el-table-column>
                    <el-table-column prop="replyUser" label="评论者" width="180px">
                    </el-table-column>
                  </el-table>
                </v-pageTable>
              </div>
            </div>
          </el-tab-pane>
          <el-tab-pane class="" label="商品评价" name="second">
            <el-tabs style="width:100%;" v-model="commentTab" type="card" @tab-click="commentClick">
              <el-tab-pane label="全部评价" name="first">
              </el-tab-pane>
              <el-tab-pane label="好评" name="second">
              </el-tab-pane>
              <el-tab-pane label="中评" name="third">
              </el-tab-pane>
              <el-tab-pane label="差评" name="fourth">
              </el-tab-pane>
            </el-tabs>
            <div>
              <v-pageTable pagination :pageChange="pageChange" :page-size="commentsData.pageSize" :paginationTotal="commentsData.paginationTotal">
                <el-table :data="commentsData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                  <el-table-column prop="comment" label="评价心得">
                  </el-table-column>
                  <el-table-column prop="score" label="顾客满意度" width="178px">
                    <template slot-scope="scope">
                      <el-rate v-model="scope.row.score" text-color="#ff9900" show-text disabled score-template="{value}">
                      </el-rate>
                    </template>
                  </el-table-column>
                  <el-table-column prop="attributesValuesContent" label="购买信息" width="200px">
                  </el-table-column>
                  <el-table-column prop="replyUser" label="评论者" width="180px">
                  </el-table-column>
                </el-table>
              </v-pageTable>
            </div>
          </el-tab-pane>
          <!-- <el-tab-pane label="售后保障" name="third">
            
          </el-tab-pane> -->
        </el-tabs>
      </div>
    </div>
</template>

<script>
import Category from '@/views/buy/components/category'
import { goodDetail, goodComments, getShopTypeList, getShop, addGoods, getGoodsNum } from '@/api/buy/buy'
export default {
  components: {
    Category
  },
  data() {
    return {
      buyRules: {

      },
      buyForm: {},
      searchForm: {
        content: '',
        minPrice: '',
        maxPrice: ''
      },
      goodId: '', // 商品Id
      shopInfo: {}, // 商品详情
      shopDetail: {}, // 店铺信息
      imgIndex: -1, // 商品缩略图索引
      imgUrl: '', // 商品大图路径
      attrIndex: [], // 商品属性索引-鼠标移入移除
      activeIndex: [], // 商品属性索引-选中
      oneIndex: -1,
      twoIndex: -1,
      chooseItem: [], // 选中商品的id
      shopPriceUnit: '', // 商品单价
      shopPrice: '', // 商品总价
      shopNumber: 1, // 商品数量
      shopList: {}, // 店铺分类
      activeTab: 'first',
      commentTab: 'first',
      commentsData: {
        paginationTotal: 100,
        pageNo: 1,
        pageSize: 50,
        commentType: '0',
        score: 4,
        table: []
      },
      tableLoading: false,
      addGoodsLoading: false
    }
  },
  methods: {
    // 表头回调函数
    headerBg: function(row) {
      return { 'background': '#f5f7fa', 'color': '#1F2D3D' }
    },
    init() {
      const this_ = this
      this.goodId = this.$route.query.id
      // 获取商品详情
      goodDetail(this.goodId).then(function(data) {
        if (data.data.code === 200) {
          this_.shopInfo = data.data.data
          // 图片处理
          if (this_.shopInfo.pictures.length > 0) {
            this_.imgUrl = this_.shopInfo.pictures[0]
            this_.imgIndex = 0
          }
          // 选中属性处理
          this_.chooseItem = []
          const arr = this_.shopInfo.selectAttributeDetailList
          for (let i = 0; i < arr.length; i++) {
            this_.chooseItem.push(0)
            const child = arr[i].attributeValues
            for (let k = 0; k < child.length; k++) {
              if (child[k].isDefaultSelect && child[k].isEnableSelect) {
                this_.chooseItem[i] = child[k].id
              }
            }
          }

          // 获取商品价格
          this_.getPrice()
          // 获取店铺信息
          this_.getShop()
          // 获取店铺分类
          this_.getShopTypeList()
        }
      })

      // 获取商品评论
      this.getComments()
    },
    // 获取店铺信息
    getShop() {
      const this_ = this
      getShop(this.shopInfo.shopId).then(function(data) {
        if (data.data.code === 200) {
          this_.shopDetail = data.data.data
        }
      })
    },
    // 获取店铺分类
    getShopTypeList() {
      const this_ = this
      getShopTypeList(this.shopInfo.shopId).then(function(data) {
        if (data.data.code === 200) {
          this_.shopList = data.data.data
        }
      })
    },
    // 搜索商品
    goodsSearch() {
      if (this.searchForm.content.trim().length === 0) {
        this.$message.info('请先输入关键词')
        this.searchForm.content = ''
        return
      }
      // const this_ = this
      // 定义参数
      const params = {
        pageNo: 1,
        pageSize: 50,
        content: this.searchForm.content,
        minPrice: this.searchForm.minPrice,
        maxPrice: this.searchForm.maxPrice,
        shopId: this.shopInfo.shopId,
        shopName: this.shopDetail.shopName
      }
      // 跳转路由
      this.$router.push(
        {
          path: '/buy/my_shop',
          query: params
        }
      )
    },
    // 获取商品评论
    getComments() {
      const this_ = this
      this.tableLoading = true
      const params = {
        pageNo: this.commentsData.pageNo,
        pageSize: this.commentsData.pageSize,
        goodsId: this.goodId,
        commentType: this.commentsData.commentType
      }
      goodComments(params).then(function(data) {
        if (data.data.code === 200) {
          this_.commentsData.paginationTotal = data.data.data.data.total
          this_.commentsData.table = data.data.data.data.results
        }
        this_.tableLoading = false
      })
    },
    // 图片显示
    showImg(item, index) {
      this.imgIndex = index
      this.imgUrl = item
    },
    // 属性移入
    attrFocus(e) {
      e.target.classList.add('active')
    },
    // 属性移出
    attrBlur(e) {
      e.target.classList.remove('active')
    },
    // 属性选中
    attrChoose(e, item, child, index, sub) {
      if (e.target.classList.contains('is_disabled')) {
        return
      }
      const arr = e.target.parentNode.children
      if (e.target.classList.contains('is_focus')) {
        e.target.classList.remove('is_focus')
        this.chooseItem[index] = 0
      } else {
        for (let i = 0; i < arr.length; i++) {
          arr[i].classList.remove('is_focus')
          e.target.classList.add('is_focus')
        }
        this.chooseItem[index] = child.id
      }
      // 获取商品价格
      this.getPrice()
      // 图片索引取消
      this.imgIndex = -1
    },
    // 获取商品价格
    getPrice() {
      // 获取价格
      const priceItem = this.chooseItem.join(',')
      const priceArr = this.shopInfo.enableSelectGroupList
      for (let i = 0; i < priceArr.length; i++) {
        if (priceArr[i].attributeValueIds === priceItem) {
          this.shopPriceUnit = priceArr[i].price
          return
        } else {
          this.shopPriceUnit = ''
        }
      }
    },
    // 加入购物车
    addShoppingCart() {
      const this_ = this
      this.addGoodsLoading = true
      // 获取属性名称
      const arr = []
      this.shopInfo.selectAttributeDetailList.forEach(function(e) {
        arr.push(e.keyName)
      })
      // 判断属性值是否都选中，选中的值存入商品属性数组中
      // this.shopAttr = ''
      // for (let i = 0; i < this.chooseItem.length; i++) {
      //   if (this.chooseItem[i] <= 0) {
      //     const message = '请选择' + arr[i]
      //     this.$message(message)
      //     return
      //   } else {
      //     const attrParam = this.shopInfo.selectAttributeDetailList[i] // 商品可选属性
      //     const attrName = arr[i] // 商品属性名
      //     let attrValue = '' // 商品选中属性值
      //     const attrChild = attrParam.attributeValues // 商品属性数组

      //     for (let k = 0; k < attrChild.length; k++) {
      //       if (this.chooseItem[i] === attrChild[k].id) {
      //         attrValue = attrChild[k].value
      //       }
      //     }
      //     this.shopAttr = this.shopAttr + ',' + attrValue
      //     // const attrInfo = {
      //     //   attrName: attrName,
      //     //   attrValue: attrValue
      //     // }
      //     // this.shopAttr.push(attrInfo)
      //   }
      // }
      // 判断是否选择数量
      if (!this.shopNumber) {
        return
      }
      const params = {
        goodsId: this.$route.query.id,
        selectAttributeValues: this.chooseItem.join(','),
        num: this.shopNumber
      }
      addGoods(params).then(function(data) {
        if (data.data.code === 200) {
          this_.$message.success('购物车添加成功！')
          this_.addGoodsLoading = false
          this_.getGoodsNum()
        }
      })
      setTimeout(() => {
        this.addGoodsLoading = false
      })
    },
    // 获取购物车数量
    getGoodsNum() {
      const this_ = this
      getGoodsNum().then(function(data) {
        if (data.data.code === 200) {
          this_.goodsNum = data.data.data
          this_.goodsNumber()
        }
      })
    },
    goodsNumber() {
      const num = this.goodsNum
      this.$emit('goodsNumber', num)
    },
    handleClick() {
      // console.log(this.activeTab)
      // const activeTab = this.activeTab
      // if (activeTab === 'first') {
      //   this.commentsData.commentType = '0'
      // } else if (activeTab === 'second') {
      //   this.commentsData.commentType = '0'
      // }
    },
    // 全部、好评、中评、差评
    commentClick() {
      const commentTab = this.commentTab
      if (commentTab === 'first') {
        this.commentsData.commentType = '0'
      } else if (commentTab === 'second') {
        this.commentsData.commentType = '1'
      } else if (commentTab === 'third') {
        this.commentsData.commentType = '2'
      } else if (commentTab === 'fourth') {
        this.commentsData.commentType = '3'
      }
      this.pageChange(1)
    },
    // 翻页
    pageChange(val) {
      this.commentsData.pageNo = val
      this.getComments()
    },
    // 购买
    Buy() {
      console.log(this.shopInfo)
      // 获取属性名称
      const arr = []
      this.shopInfo.selectAttributeDetailList.forEach(function(e) {
        arr.push(e.keyName)
      })
      // 判断属性值是否都选中，选中的值存入商品属性数组中
      let attrValue = ''
      for (let i = 0; i < this.chooseItem.length; i++) {
        if (this.chooseItem[i] <= 0) {
          const message = '请选择' + arr[i]
          this.$message(message)
          return
        }
        const attrParam = this.shopInfo.selectAttributeDetailList[i] // 商品可选属性
        const attrChild = attrParam.attributeValues // 商品属性数组

        for (let k = 0; k < attrChild.length; k++) {
          if (this.chooseItem[i] === attrChild[k].id) {
            if (attrValue === '') {
              attrValue = attrValue + attrChild[k].value
            } else {
              attrValue = attrValue + ',' + attrChild[k].value
            }
          }
        }
      }
      // 判断是否选择数量
      if (!this.shopNumber) {
        return
      }
      // 获取勾选属性对应的价格
      let price = ''
      const selectList = this.shopInfo.enableSelectGroupList
      const selectValues = this.chooseItem.join(',')
      for (let i = 0; i < selectList.length; i++) {
        if (selectList[i].attributeValueIds === selectValues) {
          price = selectList[i].price
        }
      }
      // 定义选中参数
      const attrInfo = [{
        goodsAttributesValuesContent: attrValue,
        goodsAttributesValues: selectValues,
        buyCarId: 0,
        buyNo: this.shopNumber,
        goodsId: this.goodId,
        goodsName: this.shopInfo.goodsName,
        picture: this.shopInfo.pictures[0],
        price: price
      }]
      // 参数添加商品属性、属性值
      localStorage.setItem('shopInfo', JSON.stringify(attrInfo)) // 存入缓存
      // // 跳转路由
      this.$router.push(
        {
          path: '/buy/pay/pay_confirm',
          query: {
            type: 1
          }
        }
      )
    }
  },

  mounted() {
    this.init()
  },
  watch: {
    shopNumber(val) {
      if (this.shopPriceUnit !== '') {
        this.shopPrice = (this.shopPriceUnit * val).toFixed(2)
      } else {
        this.shopPrice = ''
      }
    },
    shopPriceUnit(val) {
      if (val !== '') {
        this.shopPrice = (this.shopNumber * val).toFixed(2)
      } else {
        this.shopPrice = ''
      }
    }
  }
}
</script>

<style scoped>
.list-content {
  width: 100%;
}
img {
  height: 100%;
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
}
.smallImg-item {
  height: 76px;
  width: 76px;
  margin: 0 auto 10px;
  border: 1px solid transparent;
}
.smallImg-item.active {
  border-color: red;
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
  padding: 0 14px;
  margin: 0 20px 10px 0;
  border:2px solid #ddd;
  cursor: default;
}
.color-item.active {
  border-color: red;
}
.color-item.is_focus.active {
  border-color: red;
}
.color-item.is_focus {
  position: relative;
  border: 2px solid red;
}
.color-item.is_disabled {
  cursor: not-allowed;
  border-color: #ddd;
}
/* .color-item.is_focus::after {
  content: '';
  position: absolute;
  height:12px;
  width:12px;
  bottom: 0;
  right: 0;
  background: red;
} */
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
.shop-search .shop-info {
  font-size: 16px;
  padding: 10px 5px;
  width: 188px;
  background: #ee4644;
  color: #fff;
  box-sizing: border-box;
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
.shop-comment .el-tabs__content {
  padding: 20px 0 0;
}
</style>