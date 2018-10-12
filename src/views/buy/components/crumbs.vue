<template>
  <!--面包屑-->
  <div class="crumbs-main">
    <div class="crumbs-main" style="background:#e6e6e6">
      <div class="center-content border-box" style="font-size:12px;padding:0 20px;">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/buy' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>活动管理</el-breadcrumb-item>
          <el-breadcrumb-item>活动列表</el-breadcrumb-item>
          <el-breadcrumb-item>活动详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
  .crumbs-main {
  width: 100%;
  height: 42px;
  line-height: 42px;
  margin: 0 auto;
}
</style>

<style>
.crumbs-main .el-breadcrumb {
  line-height: 42px;
  font-size: 12px;
}
.crumbs-main .el-breadcrumb__inner, .crumbs-main .el-breadcrumb__inner a {
  color: #666;
}
.crumbs-main .el-breadcrumb__inner:hover {
  color: red;
}
</style>


