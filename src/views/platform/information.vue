<template>
  <div class="layout-main">
    <div class="center-content" style="overflow:hidden">
      <div class="info-title">
        <div class="info-nav">
          <el-menu :default-active="infoIndex" mode="horizontal" active-text-color="red">
            <el-menu-item index="1">平台要闻</el-menu-item>
            <el-menu-item index="2">最新政策</el-menu-item>
            <el-menu-item index="3">电商资讯</el-menu-item>
          </el-menu>
          <div class="search-box">
            <el-input size="medium" class="medium-input info-search" v-model="keywords" placeholder="关键词"></el-input>
            <el-button class="search-button btn-red">搜索</el-button>
          </div>
        </div>
      </div>
      <div class="info-list">
        <el-card class="list-item">
          <img src="" style="height:200px;width:200px;float:left;margin-right:20px">
          <div class="info-detail">
            <div class="detail-title">标题</div>
            <div class="detail-content">内容</div>
            <span class="detail-foot text-red text-link">查看详情>></span>
          </div>
        </el-card>
      </div>
      <div class="info-foot">
        <el-pagination background layout="prev, pager, next" :total="1000">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      keywords: '',
      infoIndex: '1'
    }
  }
}
</script>


<style scoped>
  .info-nav {
    position: relative;
  }
  .info-nav .search-box {
    position: absolute;
    top: 0;
    right: 0;
  }
  .info-title {
    height: 60px;
    line-height: 60px;
    overflow: hidden;
    padding: 0;
    box-sizing: border-box;
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
.info-nav .el-menu {
  background: #f5f5f5;
}
.info-nav .el-menu--horizontal > .el-menu-item {
  font-size: 16px;
  padding: 0!important;
  margin-right: 40px!important;
}
.info-nav .el-menu--horizontal > .el-menu-item:hover {
  color: red;
  background: #f5f5f5;
}
.info-nav .el-menu--horizontal > .el-menu-item.is-active {
  border-bottom-color: transparent!important;
}
.info-search input {
  font-size: 12px;
  border-color: red;
}
.list-item .el-card__body {
  padding: 10px 0;
  height: 200px;
}
</style>

