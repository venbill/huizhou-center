<template>
    <div class="header-main">
        <div class="bg-deepRed">
            <div class="header-title center-content">
                <span style="font-size:25px">徽州电子商务中心</span>
                <div class="header-login">
                    <span>登录</span>
                    /
                    <span>注册</span>
                </div>
            </div>
        </div>
        <div class="header-nav center-content">
            <el-menu :default-active="activeIndex" mode="horizontal" active-text-color="#F56960">
                <el-menu-item index="1">
                    <router-link to="/index/home">主页</router-link>
                </el-menu-item>
                <el-submenu index="2">
                    <template slot="title">民宿</template>
                    <el-menu-item index="2-1">选项1</el-menu-item>
                    <el-menu-item index="2-2">选项2</el-menu-item>
                    <el-menu-item index="2-3">选项3</el-menu-item>
                    <el-submenu index="2-4">
                        <template slot="title">选项4</template>
                        <el-menu-item index="2-4-1">选项1</el-menu-item>
                        <el-menu-item index="2-4-2">选项2</el-menu-item>
                        <el-menu-item index="2-4-3">选项3</el-menu-item>
                    </el-submenu>
                </el-submenu>
                <el-menu-item index="3">
                    <router-link to="/index/shop">电商</router-link></el-menu-item>
                <el-menu-item index="4">
                    <router-link to="/index/information">资讯</router-link></el-menu-item>
                <el-menu-item index="5">
                    <router-link to="/index/us">关于</router-link></el-menu-item>
            </el-menu>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: '1'
    }
  }
}
</script>


<style scoped>
    .header-main {
        width: 100%;
        background: #fff;
        border-bottom: 1px solid #ddd;
    }
    .header-title {
        height: 60px;
        line-height: 60px;
        overflow: hidden;
        color: #fff;
    }
    .header-login {
        float: right;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
        margin: 14px 0;
        border: 2px solid #fff;
        border-radius: 4px;
        font-size: 12px;
    }
    .header-nav {
        background: #fff;
    }
</style>

<style>
 .header-nav .el-menu--horizontal {
     border-bottom: none;
 }
 .header-nav .el-menu-item{
     padding: 0;
 }
 .header-nav .el-menu--horizontal>.el-menu-item a {
     height: 100%;
     width: 100%;
     padding: 0 20px;
     display: inline-block;
 }
</style>


