<template>
    <div class="buyDetail-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <shopping-cart></shopping-cart>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import NavTitle from '../components/navTitle'
import ShoppingCart from './components/shoppingCat'
export default {
  components: {
    BuyHeader, BuySearch, ShoppingCart, NavTitle
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