<template>
    <div class="myOrder-content">
      <buy-header></buy-header>
      <buy-search></buy-search>
      <my-order></my-order>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import Crumbs from '../components/crumbs'
import MyOrder from './components/order'
export default {
  components: {
    BuyHeader, BuySearch, MyOrder, Crumbs
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