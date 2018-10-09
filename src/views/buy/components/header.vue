<template>
  <div class="b-header">
    <div class="b-header-content">
      <div class="b-header-link">
        <span class="b-header-welcome">您好！欢迎来云购物</span>
        <span class="text-link">
          <router-link to="/login">请登录</router-link>
        </span>
        <span class="text-link">
          <router-link to="/register">免费注册</router-link>
        </span>
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
          <el-submenu index="2">
            <template slot="title">我的商城</template>
            <el-menu-item index="2-1"><router-link to="/login">批发进货</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/login">已买到的货品</router-link></el-menu-item>
            <el-menu-item index="2-3"><router-link to="/login">优惠券</router-link></el-menu-item>
            <el-menu-item index="2-4"><router-link to="/login">店铺动态</router-link></el-menu-item>
          </el-submenu>
          <el-menu-item index="3"><router-link to="/login">我的云购</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/login">我的收藏</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/login">会员中心</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/login">客户服务</router-link></el-menu-item>
          <el-menu-item index="3"><router-link to="/login">帮助中心</router-link></el-menu-item>
        </el-menu>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      active: ''
    }
  },
  methods: {
  }
}
</script>

<style scoped>
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



