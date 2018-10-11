<template>
    <div class="pay-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <goods></goods>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import NavTitle from '../components/navTitle'
import Goods from './components/goods'
export default {
  components: {
    BuyHeader, BuySearch, Goods, NavTitle
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
  .pay-content{
    height:auto;
    padding:0;
    color: #666;
  }
</style>