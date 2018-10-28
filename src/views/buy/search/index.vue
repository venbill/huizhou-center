<template>
    <div class="search-content">
      <buy-header></buy-header>
      <buy-search :is_blank='false' v-on:search="search"></buy-search>
      <!-- <nav-title></nav-title> -->
      <search-list ref="searchList"></search-list>
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
  methods: {
    search(val) {
      this.$refs.searchList.getTable(val)
    }
  },

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