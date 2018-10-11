<template>
    <div class="list-content">
      <div class="detail-main center-content bg-white border-box">
        <div class="detail-img">
          <div class="detail-bigImg"></div>
          <div class="detail-smallImg">
            <div class="smallImg-item" v-for="item in 5" :key="item.index"></div>
          </div>
        </div>
        <div class="detail-buy">
          <p class="detail-buy-title" style="font-size:22px;color:#000">阿斯兰的咖啡机啊索拉卡打飞机拉斯卡复活阿萨德李开复</p>
          <p class="detail-buy-description" style="font-size:12px;color:#9F9F9F;margin-bottom:30px">奥斯卡地方哈迪斯</p>
          <div class="detail-buy-price text-silver">
            <p>
              <span class="item-title">售价</span>
              <span class="text-red" style="font-size:28px;">123</span>
            </p>
            <p>
              <span class="item-title">促销</span>
              <span class="text-red">促销说明</span>
            </p>
            <p>
              <span class="item-title">服务</span>
              <span>服务说明</span>
            </p>
          </div>
          <el-form class="buy-form" :model="buyForm" :rules="buyRules" ref="buyForm" label-width="50px">
            <el-form-item prop="color" label="颜色" class="heightItem">
              <div class="color-item inline-block" v-for="item in 6" :key="item.index">
                <img src="">
              </div>
            </el-form-item>
            <el-form-item prop="number" label="数量">
              <el-input-number v-model="buyForm.number" :min="1" class="mini-number"></el-input-number>
            </el-form-item>
          </el-form>
        </div>

      </div>
      <div class="detail-comment center-content border-box">
        <div class="shop-search">
          <div class="search-input">
            <div class="search-title">店内搜索</div>
            <el-form class="search-form" :model="searchForm" label-width="50px" label-position="left">
              <el-form-item prop="keywords" label="关键词:">
                <el-input size="mini" v-model="searchForm.keywords" class="minier-input"></el-input>
              </el-form-item>
              <el-form-item prop="number" label="价  格:">
                <el-input size="mini" v-model="searchForm.minPiece" class="mini-input"></el-input>
                到
                <el-input size="mini" v-model="searchForm.maxPiece" class="mini-input"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button size="mini">搜索</el-button>
              </el-form-item>
            </el-form>
          </div>
          <div class="search-type" style="padding-bottom:0">
            <div class="search-title">店内分类</div>
            <div class="type-item" v-for="item in 6" :key="item.index">电玩</div>
          </div>
        </div>
        <el-tabs class="shop-comment" v-model="activeTab" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="商品详情" name="first">
            <div class="detail-textBox" style="padding:0 15px 40px 15px">
              <p class="detail-item" v-for="item in 10" :key="item.index">2G：移动/联通(GSM)/电信(CDMA)</p>
            </div>
            <div class="detail-imgBox">
              <img src="" style="display:block;margin:0 auto;max-width:100%">
            </div>
            <div class="shop-assessment">
              <el-tabs style="width:100%;" v-model="commentTab" type="card" @tab-click="commentClick">
                <el-tab-pane label="全部评价" name="first">
                  <v-pageTable pagination :pageChange="pageChange" :page-size="1" :paginationTotal="allData.paginationTotal">
                    <el-table :data="allData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                      <el-table-column prop="appraisal" label="评价心得" width="400px">
                      </el-table-column>
                      <el-table-column prop="satisfaction" label="顾客满意度" width="178px">
                        <template slot-scope="scope">
                          <el-rate v-model="scope.row.satisfaction" text-color="#ff9900" show-text disabled score-template="{value}">
                          </el-rate>
                        </template>
                      </el-table-column>
                      <el-table-column prop="information" label="购买信息" width="200px">
                      </el-table-column>
                      <el-table-column prop="commentator" label="评论者" width="180px">
                      </el-table-column>
                    </el-table>
                  </v-pageTable>
                </el-tab-pane>
                <el-tab-pane label="好评" name="second">
                  <v-pageTable pagination :pageChange="pageChange" :page-size="1" :paginationTotal="goodData.paginationTotal">
                    <el-table :data="goodData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                      <el-table-column prop="appraisal" label="评价心得" width="400px">
                      </el-table-column>
                      <el-table-column prop="satisfaction" label="顾客满意度" width="178px">
                      </el-table-column>
                      <el-table-column prop="information" label="购买信息" width="200px">
                      </el-table-column>
                      <el-table-column prop="commentator" label="评论者" width="180px">
                      </el-table-column>
                    </el-table>
                  </v-pageTable>
                </el-tab-pane>
                <el-tab-pane label="中评" name="third">
                  <v-pageTable pagination :pageChange="pageChange" :page-size="1" :paginationTotal="middleData.paginationTotal">
                    <el-table :data="middleData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                      <el-table-column prop="appraisal" label="评价心得" width="400px">
                      </el-table-column>
                      <el-table-column prop="satisfaction" label="顾客满意度" width="178px">
                      </el-table-column>
                      <el-table-column prop="information" label="购买信息" width="200px">
                      </el-table-column>
                      <el-table-column prop="commentator" label="评论者" width="180px">
                      </el-table-column>
                    </el-table>
                  </v-pageTable>
                </el-tab-pane>
                <el-tab-pane label="差评" name="fourth">
                  <v-pageTable pagination :pageChange="pageChange" :page-size="1" :paginationTotal="badData.paginationTotal">
                    <el-table :data="badData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                      <el-table-column prop="appraisal" label="评价心得" width="400px">
                      </el-table-column>
                      <el-table-column prop="satisfaction" label="顾客满意度" width="178px">
                      </el-table-column>
                      <el-table-column prop="information" label="购买信息" width="200px">
                      </el-table-column>
                      <el-table-column prop="commentator" label="评论者" width="180px">
                      </el-table-column>
                    </el-table>
                  </v-pageTable>
                </el-tab-pane>
              </el-tabs>
            </div>
          </el-tab-pane>
          <el-tab-pane class="" label="商品评价" name="second">
            <el-tabs style="width:100%;" v-model="commentTab" type="card" @tab-click="commentClick">
                <el-tab-pane label="全部评价" name="first">
                  <v-pageTable pagination :pageChange="pageChange" :page-size="1" :paginationTotal="allData.paginationTotal">
                    <el-table :data="allData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                      <el-table-column prop="appraisal" label="评价心得" width="400px">
                      </el-table-column>
                      <el-table-column prop="satisfaction" label="顾客满意度" width="178px">
                        <template slot-scope="scope">
                          <el-rate v-model="scope.row.satisfaction" text-color="#ff9900" show-text disabled score-template="{value}">
                          </el-rate>
                        </template>
                      </el-table-column>
                      <el-table-column prop="information" label="购买信息" width="200px">
                      </el-table-column>
                      <el-table-column prop="commentator" label="评论者" width="180px">
                      </el-table-column>
                    </el-table>
                  </v-pageTable>
                </el-tab-pane>
                <el-tab-pane label="好评" name="second">
                  <v-pageTable pagination :pageChange="pageChange" :page-size="1" :paginationTotal="goodData.paginationTotal">
                    <el-table :data="goodData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                      <el-table-column prop="appraisal" label="评价心得" width="400px">
                      </el-table-column>
                      <el-table-column prop="satisfaction" label="顾客满意度" width="178px">
                      </el-table-column>
                      <el-table-column prop="information" label="购买信息" width="200px">
                      </el-table-column>
                      <el-table-column prop="commentator" label="评论者" width="180px">
                      </el-table-column>
                    </el-table>
                  </v-pageTable>
                </el-tab-pane>
                <el-tab-pane label="中评" name="third">
                  <v-pageTable pagination :pageChange="pageChange" :page-size="1" :paginationTotal="middleData.paginationTotal">
                    <el-table :data="middleData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                      <el-table-column prop="appraisal" label="评价心得" width="400px">
                      </el-table-column>
                      <el-table-column prop="satisfaction" label="顾客满意度" width="178px">
                      </el-table-column>
                      <el-table-column prop="information" label="购买信息" width="200px">
                      </el-table-column>
                      <el-table-column prop="commentator" label="评论者" width="180px">
                      </el-table-column>
                    </el-table>
                  </v-pageTable>
                </el-tab-pane>
                <el-tab-pane label="差评" name="fourth">
                  <v-pageTable pagination :pageChange="pageChange" :page-size="1" :paginationTotal="badData.paginationTotal">
                    <el-table :data="badData.table" style="width: 100%" v-loading="tableLoading" :header-cell-style="headerBg">
                      <el-table-column prop="appraisal" label="评价心得" width="400px">
                      </el-table-column>
                      <el-table-column prop="satisfaction" label="顾客满意度" width="178px">
                      </el-table-column>
                      <el-table-column prop="information" label="购买信息" width="200px">
                      </el-table-column>
                      <el-table-column prop="commentator" label="评论者" width="180px">
                      </el-table-column>
                    </el-table>
                  </v-pageTable>
                </el-tab-pane>
              </el-tabs>
          </el-tab-pane>
          <el-tab-pane label="售后保障" name="third">
            
          </el-tab-pane>
        </el-tabs>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      buyRules: {

      },
      buyForm: {
        color: '1',
        number: 1
      },
      searchForm: {
        keywords: '1',
        minPiece: '1',
        maxPiece: '1'
      },
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
  height: 1000px;
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