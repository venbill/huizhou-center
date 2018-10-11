<template>
    <div class="buyDetail-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <crumbs></crumbs>
      <shopping-cart></shopping-cart>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import NavTitle from '../components/navTitle'
import ShoppingCart from './components/shoppingCat'
import Crumbs from '../components/crumbs'
export default {
  components: {
    BuyHeader, BuySearch, ShoppingCart, NavTitle, Crumbs
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