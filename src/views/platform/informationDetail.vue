<template>
  <div class="layout-main">
    <div class="index-inner-content">
      <div class="crumbs-box">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/index/information' }">热门资讯</el-breadcrumb-item>
          <el-breadcrumb-item>热门资讯详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bg-white">
        <div class="detai-title">热门资讯详情</div>
        <div class="news-content">
          <p class="news-title">{{newsDetail.title}}</p>
          <div class="news-text" v-html="newsDetail.content"></div>
          <div class="news-info">
            <span>作者：{{newsDetail.author}}</span>
            <span class="float-right">日期：{{getName_date(newsDetail.createTime)}}</span>
          </div>
          <div class="img-list">
            <img :src="newsDetail.headerPicture" style="width:100%">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import util from '@/utils/util'
import { newsDetail } from '@/api/index/index'
export default {
  data() {
    return {
      newsDetail: {}
    }
  },
  methods: {
    init() {
      const this_ = this
      const id = this.$route.query.id
      newsDetail(id).then(function(data) {
        if (data.data.code === 200) {
          console.log(data)
          this_.newsDetail = data.data.data
        }
      })
    },
    // 日期时间处理
    getName_date(date) {
      if (date) {
        return util.formatDate.format(new Date(date), 'yyyy-MM-dd')
      }
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
    padding: 0;
  }
  .crumbs-box {
    font-size: 14px;
    color: #333;
    padding: 45px 0 20px;
    border-bottom: 4px solid #007130;
  }
  .detai-title {
    font-size: 16px;
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    color: #666;
    border-bottom: 1px solid #ddd;
  }
  .news-content {
    width: 799px;
    margin: 0 auto;
  }
  .news-title {
    font-size: 20px;
    color: #333;
    padding: 30px 0 20px;
    text-align: center;
  }
  .news-text {
    font-size: 16px;
    color: #333;
  }
  .news-info {
    font-size: 14px;
    color: #666;
    margin: 40px 0 30px;
  }
  .img-list {
    padding-bottom: 30px;
  }
</style>

