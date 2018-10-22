<template>
    <div class="header-main">
        <!-- <div class="bg-deepRed">
            <div class="header-title center-content">
                <span style="font-size:25px">徽州电子商务中心</span>
                <div class="header-login">
                    <span>登录</span>
                    /
                    <span>注册</span>
                </div>
            </div>
        </div> -->
        <div class="b-header">
            <div class="b-header-content">
            <div class="b-header-link">
                <span class="b-header-welcome">您好！</span>
                <template>
                    <span class="text-link">
                        <router-link to="/login">请登录</router-link>
                    </span>
                    <span class="text-link">
                        <router-link to="/regist">免费注册</router-link>
                    </span>
                </template>
                <!-- <template v-else>
                <span class="text-link" @click="logout">退出</span>
                </template> -->
            </div>
            <div class="b-header-list">
                <el-menu mode="horizontal">
                <el-submenu index="1">
                    <template slot="title">我的订单</template>
                    <el-menu-item index="1-1"><router-link to="/login">批发进货</router-link></el-menu-item>
                    <el-menu-item index="1-2"><router-link to="/login">已买到的货品</router-link></el-menu-item>
                    <el-menu-item index="1-3"><router-link to="/login">优惠券</router-link></el-menu-item>
                    <el-menu-item index="1-4"><router-link to="/login">店铺动态</router-link></el-menu-item>
                </el-submenu>
                <el-menu-item index="3"><router-link to="/login">我的收藏</router-link></el-menu-item>
                <el-menu-item index="3"><router-link to="/login">会员中心</router-link></el-menu-item>
                <el-menu-item index="3"><router-link to="/login">帮助中心</router-link></el-menu-item>
                </el-menu>
            </div>
            </div>
        </div>
        <div class="header-nav center-content">
            <el-menu :default-active="activeIndex" mode="horizontal" active-text-color="#F56960">
                <el-menu-item index="1">
                    <router-link to="/index/home">主页</router-link>
                </el-menu-item>
                <el-menu-item index="2">
                    <router-link to="/index/homestay">民宿</router-link>
                </el-menu-item>
                <el-menu-item index="3">
                    <router-link to="/buy">电商</router-link></el-menu-item>
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
    .b-header{
        height: 35px;
        line-height: 34px;
        width: 100%;
        font-size: 12px;
        background: #F3F2F0;
        border-bottom: 1px solid #E7E6E3;
    }
    .b-header-content {
        width: 1200px;
        margin: 0 auto;
        clear: both;
    }
    .b-header-link {
        float: left;
    }
    .b-header-welcome {
        margin-right: 6px;
    }
    .text-link {
        padding:0 4px;
    }
    .b-header-link .text-link a:hover {
        color:red;
    }
    .b-header-list {
        float: right;
        background:green;
    }
    .b-header-list .is-opened {
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
 .b-header-list .el-menu--horizontal > .el-submenu .el-submenu__title, .b-header-list .el-menu--horizontal > .el-menu-item {
    font-size: 12px;
    height: 34px;
    line-height: 34px;
  }
  .b-header-list .el-menu--horizontal {
    background: #F3F2F0;
  }
  .b-header-list .el-menu--collapse .el-menu .el-submenu, .el-menu--popup {
    min-width: 150px;
  }
  .el-menu--horizontal {
    border-bottom: none;
  }
  .el-menu--horizontal .el-menu .el-menu-item {
    padding: 0 20px;
  }
</style>


