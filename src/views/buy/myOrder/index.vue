<template>
    <div class="myOrder-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <nav-title></nav-title>
      <my-order></my-order>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import NavTitle from '../components/navTitle'
import Crumbs from '../components/crumbs'
import MyOrder from './components/order'
export default {
  components: {
    BuyHeader, BuySearch, MyOrder, NavTitle, Crumbs
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
  .myOrder-content{
    height:auto;
    padding:0;
    color: #666;
  }
</style>