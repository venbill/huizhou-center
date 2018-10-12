<template>
    <div class="buyDetail-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <buy-detail></buy-detail>
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
    }
  },
  methods: {},

  mounted() {}
}
</script>

<style scoped>
    .buyDetail-content{
      height:auto;
      padding:0;
      color: #666;
    }
</style>