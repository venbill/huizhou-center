<template>
    <div class="main-content">
        <div class="outside-box" style="background:#fff">
            <div class="index-inner-content header-main">
                <div class="header-title">
                    <div class="logo"></div>
                    <span class="title-text">徽州区电子商务公共服务中心</span>
                </div>
                <div class="header-handle">
                    <template v-if="!loginStatus">
                        <span>您好！</span>
                        <span>请</span>
                        <router-link to="/login" class="link-text">登录</router-link>
                        /
                        <router-link to="/regist" class="link-text">注册</router-link>
                    </template>
                    <template v-else>
                        <span class="link-text" @click="logout">退出</span>
                    </template>
                </div>
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
      loginStatus: false, // 登录状态
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
    },
    // 退出
    logout() {
      this.$store.dispatch('LogOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
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
        cursor: pointer;
    }
    .nav-item.active {
        background: #3b6713;
        color: #fff;
    }
</style>

<style>
 
</style>


