<template>
    <div class="myShop-content">
      <buy-search></buy-search>
      <!-- <nav-title></nav-title> -->
      <my-shop></my-shop>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import NavTitle from '../components/navTitle'
import myShop from './components/shop'
export default {
  components: {
    BuyHeader, BuySearch, myShop, NavTitle
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
  .myShop-content{
    height:auto;
    padding:0;
    color: #666;
  }
</style>