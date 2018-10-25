<template>
  <div class="b-header">
    <div class="outside-box" style="background:#fff">
      <div class="index-inner-content header-main">
        <div class="header-title">
          <div class="logo"></div>
          <span class="title-text">徽州区电子商务公共服务中心</span>
        </div>
        <template v-if="!loginStatus">
          <div class="header-handle">
              <span>您好！</span>
              <span>请</span>
              <router-link to="/login" class="link-text">登录</router-link>
              /
              <router-link to="/regist" class="link-text">注册</router-link>
              <router-link to="/" class="link-text">回到首页</router-link>
          </div>
        </template>
        <template v-else>
          <div class="header-menu">
            <el-menu mode="horizontal">
              <el-menu-item index="3"><router-link to="/buy/order">我的订单</router-link></el-menu-item>
              <!-- <el-submenu index="1">
                <template slot="title">我的订单</template>
                <el-menu-item index="1-1"><router-link to="/login">批发进货</router-link></el-menu-item>
                <el-menu-item index="1-2"><router-link to="/login">已买到的货品</router-link></el-menu-item>
                <el-menu-item index="1-3"><router-link to="/login">优惠券</router-link></el-menu-item>
                <el-menu-item index="1-4"><router-link to="/login">店铺动态</router-link></el-menu-item>
              </el-submenu> -->
              <!-- <el-submenu index="2">
                <template slot="title">我的商城</template>
                <el-menu-item index="2-1"><router-link to="/login">批发进货</router-link></el-menu-item>
                <el-menu-item index="2-2"><router-link to="/login">已买到的货品</router-link></el-menu-item>
                <el-menu-item index="2-3"><router-link to="/login">优惠券</router-link></el-menu-item>
                <el-menu-item index="2-4"><router-link to="/login">店铺动态</router-link></el-menu-item>
              </el-submenu>
              <el-menu-item index="3"><router-link to="/login">我的云购</router-link></el-menu-item> -->
              <!-- <el-menu-item index="3"><router-link to="/login">我的收藏</router-link></el-menu-item>
              <el-menu-item index="3"><router-link to="/login">会员中心</router-link></el-menu-item> -->
              <!-- <el-menu-item index="3"><router-link to="/login">客户服务</router-link></el-menu-item> -->
              <!-- <el-menu-item index="3"><router-link to="/login">帮助中心</router-link></el-menu-item> -->
            </el-menu>
            <router-link to="/index" class="link-text">回到首页</router-link>
            <span class="link-text" style="margin-left: 10px;" @click="logout">退出</span>
          </div>
        </template>
      </div>
    </div>
    <div class="outside-box" style="background:#1D1F21">
      <div class="index-center-content header-nav">
        <div class="nav-item" :class="{active:activeIndex === index}"
          v-for="(item, index) in navList" :key="item.index"
          @click="navChange(item, index)">{{item.title}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  data() {
    return {
      active: '',
      loginStatus: false, // 登录状态
      userInfo: {},
      navList: [
        {
          title: '首页',
          path: '/'
        },
        {
          title: '热门资讯',
          path: '/index/information'
        },
        {
          title: '农特商城',
          path: '/buy'
        },
        {
          title: '精品民宿',
          path: '/index/homestay'
        },
        {
          title: '电商培训',
          path: 'https://xueyuan.maijia.com/m/search/37'
        },
        {
          title: '招商引资',
          path: '/index/cooperation'
        },
        {
          title: '关于我们',
          path: '/index/us'
        }
      ],
      activeIndex: 0
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    init() {
      // 判断是否路由选中
      const path = this.$route.path
      if (path === '/') {
        this.activeIndex = 0
      } else {
        for (let i = 0; i < this.navList.length; i++) {
          const newPath = this.navList[i].path
          if (newPath !== '/') {
            if (path.indexOf(this.navList[i].path) !== -1) {
              this.activeIndex = i
              return
            }
          }
        }
      }
      // 没有登录信息，终止函数
      if (this.token === undefined) {
        this.loginStatus = false
      } else {
        this.loginStatus = true
      }
      console.log(this.loginStatus)
    },
    // 退出
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    navChange(item, index) {
      if (index === 4) {
        window.open('https://xueyuan.maijia.com/m/search/37', '_blank')
      } else {
        this.activeIndex = index
        this.$router.push(
          {
            path: item.path
          }
        )
      }
    }
  },
  mounted() {
    this.init()
    // this.userInfo = JSON.parse(localStorage.getItem('userInfo'))
    // console.log(this.userInfo)
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

  .header-main {
        height: 48px;
        line-height: 48px;
        padding: 16px 0;
        box-sizing: content-box;
    }
    .header-title {
        float: left;
        margin-left: 20px;
        font-size: 32px;
        font-weight: bold;
        color: #3b6713;
    }
    .header-title .logo {
        float: left;
        height: 48px;
        width: 48px;
        border-radius: 50%;
        margin-right: 10px;
        background: url('/static/images/index/logo.png') no-repeat;
    }
    .header-handle {
        float: right;
        margin-right: 20px;
        font-size: 14px;
        color: #666;
    }
    .link-text {
        color: #0a5f9b;
        cursor: pointer;
    }
    .header-nav {
        height: 48px;
        line-height: 48px;
        font-size: 18px;
        color: #fff;
        padding-left: 250px;
    }
    .nav-item {
        float: left;
        margin-right: 25px;
        padding: 0 20px;
        cursor: pointer;
    }
    .nav-item:hover {
        background: #3b6713;
    }
    .nav-item.active {
        background: #3b6713;
        color: #fff;
    }
    .header-menu {
      float: right;
      margin-right: 40px;
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
  .header-menu .el-menu--horizontal .el-menu-item {
    height: 48px;
    line-height: 44px;
    padding: 0 20px;
  }
  .header-menu .el-menu {
    float: left;
  }
</style>



