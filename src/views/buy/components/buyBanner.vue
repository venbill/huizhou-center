<template>
  <div class="b-banner">
    <div class="b-banner-main">
      <div class="b-banner-header">
        <div class="products">
          <i class="iconfont" style="margin-right:4px;">&#xe6b8;</i>
          商品分类
        </div>
        <router-link :to="item.path" v-for="item in bannerTitle" :key="item.index">
          <div class="item">
              {{item.title}}
          </div>
        </router-link>
      </div>
      <div class="b-banner-content">
        <div class="b-content-nav">
          <div class="listContent" @mouseenter="contentShow" @mouseleave="contentHide">
            <div class="item" v-for="(item, index) in navList" :key="item.index" @mouseenter="listShow(index)">
              <i class="iconfont" v-html="item.icon" style="margin-right:4px;"></i>
              <span class="item-type" v-for="child in item.child" :key="child.index">
                <router-link to="child.path">
                {{child.title}}
                </router-link>
              </span>
            </div>
            <div class="b-content-list" v-if="contentStatus">
              <div class="item"  v-for="sub in 6" :key="sub.index">
                <div class="b-list-title">
                  <span class="b-list-text">静啊拉开纠纷</span>
                </div>
                <div class="b-list-sub">
                  <span class="item" v-for="item in 30" :key="item.index">
                    <router-link to="item.path">测试分类</router-link>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="b-content-img">
          <img src="">
        </div>
        <div class="b-imgList">
          <div  class="item"></div>
          <div  class="item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bannerTitle: [
        {
          title: '首页',
          path: '/login'
        },
        {
          title: '云购物',
          path: '/login'
        },
        {
          title: '限时购',
          path: '/login'
        },
        {
          title: '电器城',
          path: '/login'
        }
      ],
      navList: [
        {
          icon: '&#xe666;',
          child: [
            {
              title: '男装',
              path: '/login'
            },
            {
              title: '女装',
              path: '/login'
            },
            {
              title: '童装',
              path: '/login'
            }
          ]
        },
        {
          icon: '&#xe62a;',
          child: [
            {
              title: '男装',
              path: '/login'
            },
            {
              title: '女装',
              path: '/login'
            },
            {
              title: '童装',
              path: '/login'
            }
          ]
        },
        {
          icon: '&#xe60a;',
          child: [
            {
              title: '男装',
              path: '/login'
            },
            {
              title: '女装',
              path: '/login'
            },
            {
              title: '童装',
              path: '/login'
            }
          ]
        },
        {
          icon: '&#xe61a;',
          child: [
            {
              title: '男装',
              path: '/login'
            },
            {
              title: '女装',
              path: '/login'
            },
            {
              title: '童装',
              path: '/login'
            }
          ]
        },
        {
          icon: '&#xe60d;',
          child: [
            {
              title: '男装',
              path: '/login'
            },
            {
              title: '女装',
              path: '/login'
            },
            {
              title: '童装',
              path: '/login'
            }
          ]
        }
      ],
      contentStatus: false
    }
  },
  methods: {
    listShow(index) {
      console.log(index)
    },
    contentShow() {
      this.contentStatus = true
    },
    contentHide() {
      this.contentStatus = false
    }
  }
}
</script>

<style scoped>
  .b-banner {
    width: 100%;
    background: #ee4644;
  }
  .b-banner-main {
    width: 1200px;
    height: 550px;
    margin: 0 auto;
    background: #ee4644;
  }
  .b-banner-header {
    height: 40px;
    line-height: 40px;
    color: #fff;
    clear: both;
    overflow: hidden;
  }
  .b-banner-header .products {
    float: left;
    width: 170px;
    padding: 0 15px;
  }
  .b-banner-header .item {
    float: left;
    text-align: center;
    margin-right: 10px;
    padding: 0 10px;
    font-size: 14px;
  }
  .b-content-nav, .products {
    font-size: 16px;
    background: rgba(000, 000, 000, 0.3);
  }
  .b-content-nav {
    width: 200px;
    height: 510px;
    overflow-y: hidden;
    float: left;
    background: rgba(000, 000, 000, 0.3);
  }
  .b-content-nav .listContent > .item {
    height: 34px;
    line-height: 34px;
    font-size: 13px;
    color: #fff;
    padding: 0 15px;
  }
  .b-content-nav .listContent > .item:hover {
    background: #ee4644;
  }
  .b-content-nav .item  .item-type:not(:last-child)::after{
    content: '/';
    margin: 0;
  }
  .b-banner-content {
    position: relative;
    clear: both;
  }
  .b-content-list {
    position: absolute;
    width: 800px;
    height: 510px;
    top: 0;
    left: 200px;
    font-size: 12px;
    overflow: hidden;
    background: rgba(210,209,208, 0.9)
  }
  .b-content-list > .item {
    box-sizing: border-box;
    width: 100%;
    clear: both;
    color: #666;
    padding: 15px 10px 0;
  }
  .b-list-title {
    width: 110px;
    float: left;
    font-size: 13px;
    font-weight: bold;
  }
  .b-list-title::after {
    content: '>';
    margin-left: 4px;
  }
  .b-list-sub {
    float: left;
    width: 640px;
    word-break: break-all;
    overflow: hidden;
  }
  .b-content-list .b-list-sub .item {
    display: inline-block;
    margin: 0 10px 4px;
  }
  .b-content-list .b-list-sub .item:hover {
    color: red;
  }
  .b-content-img {
    width: 800px;
    height: 510px;
    float: left;
  }
  .b-imgList {
    float: left;
    height: 510px;
    width: 190px;
    margin-left: 10px;
    background: transparent;
  }
  .b-imgList .item {
    height: 250px;
    width: 100%;
  }
  .b-imgList .item:not(:last-child) {
    margin-bottom: 10px;
  }
</style>
