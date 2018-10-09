<template>
  <div class="b-search">
    <div class="b-search-content">
      <div class="b-search-logo" :style="{backgroundImage:'url(' + logoUrl + ')'}">

      </div>
      <div class="b-search-main">
        <div class="b-search-input">
          <el-autocomplete
            v-model="formSearch.search" :trigger-on-focus = "false"
            :fetch-suggestions="getKeyWords"
            placeholder=""
            @select="handleSelect"
            class="select-b-search">
            <template slot-scope="{item}">
              <div>{{item.keyWord}}</div>
            </template>
          </el-autocomplete>
          <el-button icon="el-icon-search" class="button-b-search">搜索</el-button>
        </div>
        <div class="b-search-history">
          <span class="item" v-for="item in history" :key="item.id">
            <router-link :to="item.path">{{item.name}}</router-link>
          </span>
        </div>
      </div>
      <div class="b-search-shoppingCart">
        <i class="iconfont">&#xe600;</i>
        <router-link to="/login">我的购物车</router-link>
        <span class="shoppingCat-count">10</span>
      </div>
    </div>
  </div>
</template>

<script>
// import util from '@/utils/util'
export default {
  data() {
    return {
      formSearch: {
        search: ''
      },
      history: [
        {
          name: '鞋子',
          path: '/login'
        },
        {
          name: '牛仔裤',
          path: '/login'
        },
        {
          name: '衬衫',
          path: '/login'
        },
        {
          name: '洗衣机',
          path: '/login'
        }
      ],
      logoUrl: '../../../../static/images/logo.png',
      keyWordsOptions: [
        {
          keyWord: '鞋子',
          path: '/login'
        },
        {
          keyWord: '洗衣机',
          path: '/login'
        },
        {
          keyWord: '衬衫',
          path: '/login'
        },
        {
          keyWord: '羊毛衫',
          path: '/login'
        }
      ],
      loading: false
    }
  },
  methods: {
    getKeyWords(queryString, callback) {
      // let list = []
      // const url = 'kaili-basic/base/baseCustomer/queryCustomer'
      // const params = {
      //   keyWord: this.formSearch.search
      // }
      // util.httpJesen(url, params, function(data) {
      //   if (data.data) {
      //     list = data.data.map(item => {
      //       return {
      //       }
      //     })
      //     callback(list)
      //   }
      // })
      const list = this.keyWordsOptions.map(item => {
        return {
          keyWord: item.keyWord,
          path: item.path
        }
      })
      callback(list)
    },
    handleSelect(item) {
      this.formSearch.search = item.keyWord
    }
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
