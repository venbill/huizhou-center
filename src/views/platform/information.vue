<template>
  <div class="layout-main">
    <div class="index-center-content">
      <div class="crumbs-box index-inner-content">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>热门资讯</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="info-title border-box index-inner-content">
        <div class="information-title">
          <div class="information-title-item" v-for="(item, index) in news" :key="item.index"
          :class="{active:newsIndex === index}"
          @click="newsIndexChange(item, index)">{{item.title}}</div>
        </div>
        <!-- <div class="search-box">
          <el-input size="medium" class="medium-input info-search" v-model="keywords" placeholder="关键词"></el-input>
          <el-button class="search-button btn-red">搜索</el-button>
        </div> -->
      </div>
      <div class="info-list index-inner-content">
        <v-pageTable pagination :pageChange="pageChange" :page-size="newsInfo.pageSize" :paginationTotal="newsInfo.paginationTotal">
          <el-table :data="newsInfo.table" style="width: 100%" v-loading="tableLoading" :show-header="false">
            <el-table-column width="350px" align="right">
              <template slot-scope="scope">
                <div class="img-box">
                  <img :src="scope.row.headerPicture" style="width:100%;height:100%"/>
                </div>
              </template>
            </el-table-column>
            <el-table-column>
              <template slot-scope="scope">
                <div class="new-content">
                  <div class="new-text">
                    {{textSlice(scope.row.content)}}
                    <router-link :to="{path:'/index/information/detail',query:{id:scope.row.id}}">
                      <span class="new-full-text">阅读全文</span>
                    </router-link>
                  </div>
                  <div class="new-time">
                    发布日期：<span>{{getName_date(scope.row.createTime)}}</span>
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
        </v-pageTable>
        <!-- <el-card class="list-item">
          <img src="" style="height:200px;width:200px;float:left;margin-right:20px">
          <div class="info-detail">
            <div class="detail-title">标题</div>
            <div class="detail-content">内容</div>
            <span class="detail-foot text-red text-link">查看详情>></span>
          </div>
        </el-card> -->
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/utils/util'
import { getNews } from '@/api/index/index'
export default {
  data() {
    return {
      keywords: '',
      news: [
        {
          title: '热门资讯',
          type: 1
        },
        {
          title: '热门新闻',
          type: 3
        },
        {
          title: '热门企业',
          type: 4
        },
        {
          title: '公告',
          type: 2
        }
      ], // 资讯标题
      newsIndex: 0,
      newsInfo: {
        pageNo: 1,
        pageSize: 5,
        paginationTotal: 0,
        type: 1, // 资讯获取 1 热门资讯 2 公告 3 热门新闻 4 热门企业 5 讲师资料 6 培训资讯
        table: []
      },
      tableLoading: false
    }
  },
  methods: {
    init() {
      const newIndex = this.$route.query.index
      if (newIndex !== undefined) {
        this.newsIndex = newIndex
        this.newsInfo.type = this.news[newIndex].type
        this.headerIndex(this.$route.path)
      }
      this.getNews()
    },
    // 分页查询资讯
    getNews() {
      this.tableLoading = true
      const this_ = this
      const params = {
        pageNo: this.newsInfo.pageNo,
        pageSize: this.newsInfo.pageSize,
        type: this.newsInfo.type
      }
      getNews(params).then(function(data) {
        if (data.data.code === 200) {
          this_.tableLoading = false
          this_.newsInfo.table = data.data.data.results
          this_.newsInfo.paginationTotal = data.data.data.total
        }
      })
      setTimeout(() => {
        this.tableLoading = false
      }, 5000)
    },
    // 翻页
    pageChange(val) {
      this.newsInfo.pageNo = val
      this.getNews()
    },
    // 新闻、资讯切换
    newsIndexChange(item, index) {
      this.newsInfo.type = item.type
      this.newsIndex = index
      this.pageChange(1)
    },
    // 日期时间处理
    getName_date(date) {
      if (date) {
        return util.formatDate.format(new Date(date), 'yyyy-MM-dd')
      }
    },
    // 资讯内容处理
    textSlice(val) {
      if (val) {
        if (val.length > 70) {
          return util.stringSlice(val, 70) + '...'
        } else {
          return val
        }
      }
    },
    // 返回父组件路由路径
    headerIndex(path) {
      this.$emit('headerIndex', path)
    }
  },
  mounted() {
    this.init()
  }
}
</script>


<style scoped>
  .layout-main {
    background: #f5f5f5;
    padding-bottom: 30px;
  }
  .crumbs-box {
    font-size: 14px;
    color: #333;
    padding: 45px 0 20px;
    border-bottom: 4px solid #007130;
  }
  .info-title {
    height: 60px;
    padding: 0 40px;
    border-bottom: 1px solid #e6e6e6;
    background: #fff;
  }
  .information-title-item {
    float: left;
    text-align: center;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    margin-right: 40px;
  }
  .information-title-item.active {
    border-bottom: 2px solid #007130;
  }
  .img-box {
    display: inline-block;
    height: 148px;
    width: 183px;
    margin: 30px auto;
  }
  .new-content {
    position: relative;
    height: 148px;
    width: 710px;
  }
  .new-content .new-text {
    position: relative;
    font-size: 16px;
    color: #333;
    height: 40px;
    overflow: hidden;
    line-height: 1.2;
  }
  .new-content .new-text .new-full-text {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 14px;
    color: #41accf;
    cursor: pointer;
  }
  .new-content .new-text .new-full-text:hover {
    text-decoration: underline;
  }
  .new-content .new-time {
    position: absolute;
    right: 0;
    bottom: 0;
    font-size: 14px;
    color: #666;
  }
  .info-detail {
    font-size: 12px;
    color: #666;
  }
  .detail-title {
    font-size: 16px;
    color: #000;
  }
  .detail-content {
    height: 150px;
    padding: 10px 0;
    line-height: 1.5;
    display: -webkit-box;
    -webkit-line-clamp: 9;
    -webkit-box-orient: vertical;
    overflow: hidden;
  }
  .info-foot {
    padding: 20px 0;
    text-align: right;
  }
</style>

<style>
.info-search input {
  font-size: 12px;
  border-color: red;
}
.list-item .el-card__body {
  padding: 10px 0;
  height: 200px;
}
</style>

