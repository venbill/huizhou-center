<template>
    <div class="search-content">
      <buy-header></buy-header>
      <buy-search :is_blank='false'></buy-search>
      <nav-title></nav-title>
      <search-list></search-list>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import SearchList from './components/searchList'
import NavTitle from '../components/navTitle'
export default {
  components: {
    BuyHeader, BuySearch, SearchList, NavTitle
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
    .search-content{
      height:auto;
      padding:0;
      color: #666;
    }
</style>