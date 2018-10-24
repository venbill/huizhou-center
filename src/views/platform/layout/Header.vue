<template>
    <div class="main-content">
        <div class="outside-box" style="background:#fff">
            <div class="index-center-content header-main">
                <div class="header-title">
                    <div class="logo"></div>
                    <span class="title-text">徽州区电子商务公共服务中心</span>
                </div>
                <div class="header-handle">
                    <span>您好！</span>
                    <span>请</span>
                    <router-link to="/login" class="link-text">登录</router-link>
                    /
                    <router-link to="/regist" class="link-text">注册</router-link>
                    <!-- <span class="link-text">退出</span> -->
                </div>
            </div>
        </div>
        <div class="outside-box" style="background:#1D1F21">
            <div class="index-center-content header-nav">
                <router-link v-for="(item, index) in navList" :key="item.index" :to="item.path">
                    <div class="nav-item" :class="{active:activeIndex === index}" @click="navChange(index)">{{item.title}}</div>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          title: '首页',
          path: '/index/home'
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
          path: '/index/shop'
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
  methods: {
    init() {
      // 判断是否路由选中
      const path = this.$route.path
      for (let i = 0; i < this.navList.length; i++) {
        if (path.indexOf(this.navList[i].path) !== -1) {
          this.activeIndex = i
          return
        }
      }
    },
    navChange(index) {
      this.activeIndex = index
    }
  },
  mounted() {
    this.init()
  }
}
</script>


<style scoped>
    .header-main {
        height: 48px;
        line-height: 48px;
        padding: 16px 0;
        box-sizing: content-box;
    }
    .header-title {
        float: left;
        margin-left: 100px;
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
        margin-right: 70px;
        font-size: 14px;
        color: #666;
    }
    .link-text {
        color: #0a5f9b;
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
    }
    .nav-item:hover {
        background: #3b6713;
    }
    .nav-item.active {
        background: #3b6713;
    }
</style>

<style>
 
</style>


