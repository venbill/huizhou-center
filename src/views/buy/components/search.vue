<template>
  <div class="b-search">
    <div class="b-search-content">
      <!-- <div class="b-search-logo" :style="{backgroundImage:'url(' + logoUrl + ')'}">
      </div> -->
      <div class="b-search-main">
        <div class="b-search-input">
          <el-input v-model="formSearch.search" class="select-b-search"></el-input>
          <!-- <el-autocomplete
            v-model="formSearch.search" :trigger-on-focus = "false"
            :fetch-suggestions="getKeyWords"
            placeholder=""
            @select="handleSelect"
            class="select-b-search">
            <template slot-scope="{item}">
              <div>{{item.keyWord}}</div>
            </template>
          </el-autocomplete> -->
          <el-button icon="el-icon-search" class="btn-red" @click="search">搜索</el-button>
        </div>
        <div class="b-search-history">
          <span class="item" v-for="item in hotSearch" :key="item.id">
            <router-link :to="{path:'/buy/search', query:{id:item.id,keyword:item.content}}">{{item.content}}</router-link>
          </span>
        </div>
      </div>
      <div class="b-search-shoppingCart" v-if="loginStatus">
        <i class="iconfont">&#xe600;</i>
        <router-link to="/buy/pay">我的购物车</router-link>
        <span class="shoppingCat-count">{{goodsNum}}</span>
      </div>
    </div>
  </div>
</template>

<script>
// import util from '@/utils/util'
import { mapGetters } from 'vuex'
import { getHotSearchList, getGoodsNum } from '@/api/buy/buy'
export default {
  props: {
    is_blank: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      formSearch: {
        search: ''
      },
      hotSearch: [],
      logoUrl: '../../../../static/images/logo.png',
      goodsNum: 0,
      loginStatus: false
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    init() {
      const this_ = this
      // 自动填充搜索框
      this.formSearch.search = this.$route.query.keyword
      // 获取热搜
      getHotSearchList().then(function(data) {
        if (data.data.code === 200) {
          this_.hotSearch = data.data.data
        }
      })
      // 没有登录信息，终止函数
      if (this.token === undefined) {
        this.loginStatus = false
      } else {
        this.loginStatus = true
        // 获取购物车数量
        this.getGoodsNum()
      }
    },
    // 获取购物车数量
    getGoodsNum() {
      // 没有登录信息，终止函数
      if (this.token === undefined) {
        return
      }
      const this_ = this
      getGoodsNum().then(function(data) {
        if (data.data.code === 200) {
          this_.goodsNum = data.data.data
        }
      })
    },
    // 查询
    search() {
      const this_ = this
      if (this_.formSearch.search.trim().length === 0) {
        this.$message.info('请先输入关键字')
        this.formSearch.search = ''
      } else {
        // 是否新窗口打开
        if (this.is_blank) {
          const routeData = this.$router.resolve({
            path: '/buy/search',
            query: {
              keyword: this_.formSearch.search
            }
          })
          window.open(routeData.href, '_blank')
        } else {
          this.$emit('search', this_.formSearch.search)
          // this_.$router.push(
          //   {
          //     path: '/buy/search',
          //     query: {
          //       keyword: this_.formSearch.search
          //     }
          //   }
          // )
        }
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
  .b-search {
    height: 90px;
    width: 100%;
    margin: 0 auto;
    padding: 15px 0;
    clear: both;
    background: #fff;
  }
  .b-search-content {
    width: 1200px;
    margin: 0 auto;
  }
  .b-search-logo {
    float: left;
    width: 200px;
    height: 90px;
    /* background: url('../../../../static/images/logo.png'); */
  }
  .b-search-main {
    width: 550px;
    height: 75px;
    margin: 15px 0 0 112px;
    overflow: hidden;
    float: left;
  }
  .select-b-search {
    width: 450px;
  }
  /* .button-b-search {
    position: relative;
    left: -4px;
  } */
  .b-search-history {
    font-size: 12px;
    height: 40px;
    line-height: 40px;
  }
  .b-search-history .item {
    display: inline-block;
    margin-right: 14px;
  }
  .b-search-history .item a:hover {
    color: red;
  }
  .b-search-shoppingCart {
    float: right;
    width: 200px;
    margin: 15px 20px 0 0;
    height: 36px;
    line-height: 34px;
    text-align: center;
    font-size: 12px;
    color: #666;
    box-sizing: border-box;
    border: 1px solid #E0DEDB;
    background: transparent;
  }
  .b-search-shoppingCart a:hover {
    color: red;
  }
  .shoppingCat-count {
    display: inline-block;
    height: 22px;
    width: 22px;
    line-height: 22px;
    text-align: center;
    border-radius: 50%;
    color: #fff;
    background: red;
  }
</style>
