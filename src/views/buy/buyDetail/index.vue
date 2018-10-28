<template>
    <div class="buyDetail-content">
      <buy-search ref="buySearch"></buy-search>
      <!-- <nav-title></nav-title> -->
      <buy-detail v-on:goodsNumber="goodsNumber"></buy-detail>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import BuyDetail from './components/detail'
import NavTitle from '../components/navTitle'
export default {
  components: {
    BuyHeader, BuySearch, BuyDetail, NavTitle
  },
  data() {
    return {
      goodsId: -1
    }
  },
  methods: {
    goodsNumber(num) {
      // 调用自路由方法
      this.$refs.buySearch.getGoodsNum()
    }
  },

  mounted() {
    this.goodsId = this.$route.query.id
  }
}
</script>

<style scoped>
    .buyDetail-content{
      height:auto;
      padding:0;
      color: #666;
    }
</style>