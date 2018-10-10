<template>
    <div class="buy-content">
        <buy-header></buy-header>
        <buy-search></buy-search>
        <buy-banner></buy-banner>
        <buy-list></buy-list>
    </div>
</template>

<script>
import BuyHeader from './components/header'
import BuySearch from './components/search'
import BuyBanner from './components/buyBanner'
import BuyList from './components/buyList'
export default {
  components: {
    BuyHeader, BuySearch, BuyBanner, BuyList
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
    .buy-content{
      height:auto;
      padding:0;
      color: #666;
    }
</style>

