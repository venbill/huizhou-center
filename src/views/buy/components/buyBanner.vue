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
            <router-link v-for="(item, index) in navList" :key="item.index" :to="{path:'/buy/search',query: {id: item.id,keyword:item.bigTypeName}}" target="_blank">
              <div class="type-item" :class="{active: typeIndex === index}" @mouseenter="typeIndexChange(index)">
                <i class="iconfont" v-html="item.icon" style="margin-right:4px;"></i>
                <span class="typeTitle">
                  {{item.bigTypeName}}
                </span>
              </div>
            </router-link>
            <div class="b-content-list" v-if="contentStatus && typeIndex !== -1">
              <div class="b-list-sub">
                <span class="item" v-for="sub in navList[typeIndex].smallTypes" :key="sub.index">
                  <router-link :to="{path:'/buy/search',query: {id: sub.id, keyword:sub.smallTypeName}}" target="_blank">{{sub.smallTypeName}}</router-link>
                </span>
              </div>
            </div>
          </div>
        </div>
        <el-carousel trigger="click" height="510px" class="b-content-img">
          <el-carousel-item v-for="item in imgList" :key="item.index">
            <a :href="'http://' + item.href" target="_blank">
              <img :src="item.url">
            </a>
          </el-carousel-item>
        </el-carousel>
        <!-- <div class="b-imgList">
          <div  class="item"></div>
          <div  class="item"></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script>
import { getDetailTypes, getBanner } from '@/api/buy/buy'
export default {
  data() {
    return {
      bannerTitle: [
        {
          title: '首页',
          path: '/'
        },
        {
          title: '电商',
          path: '/buy'
        },
        {
          title: '民宿',
          path: '/index/homestay'
        }
      ],
      navList: [],
      imgList: [],
      typeIndex: -1, // 商品大分类索引
      contentStatus: false
    }
  },
  methods: {
    init() {
      const this_ = this
      // 获取商品分类详情
      getDetailTypes().then(function(data) {
        if (data.data.code === 200) {
          this_.navList = data.data.data
        }
      })

      // 获取轮播图
      getBanner(3).then(function(data) {
        if (data.data.code === 200) {
          this_.imgList = data.data.data
        }
      })
    },

    typeIndexChange(index) {
      this.typeIndex = index
    },
    contentShow() {
      this.contentStatus = true
    },
    contentHide() {
      this.contentStatus = false
      this.typeIndex = -1
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
  .b-banner {
    width: 100%;
    background: #ee4644;
  }
  img {
    width: 100%;
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
  .b-banner-header .item:hover {
    background: rgba(000, 000, 000, 0.3);
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
  .b-content-nav .listContent .type-item {
    height: 34px;
    line-height: 34px;
    font-size: 13px;
    color: #fff;
    padding: 0 36px;
  }
  .b-content-nav .listContent .type-item.active {
    background: #ee4644;
  }
  .b-content-nav .type-item  .typeTitle:not(:last-child)::after{
    content: '/';
    margin: 0;
  }
  .b-banner-content {
    position: relative;
    clear: both;
  }
  .b-content-list {
    position: absolute;
    z-index: 999;
    width: 1000px;
    height: 510px;
    top: 0;
    left: 200px;
    font-size: 12px;
    overflow: hidden;
    background: rgba(210,209,208, 0.9)
  }
  .b-content-list .type-item {
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
    width: 100%;
    padding: 10px;
    word-break: break-all;
    overflow: hidden;
  }
  .b-content-list .b-list-sub .item {
    display: inline-block;
    margin: 0 10px 4px 0;
  }
  .b-content-list .b-list-sub .item:hover {
    color: red;
  }
  .b-content-img {
    width: 1000px;
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
