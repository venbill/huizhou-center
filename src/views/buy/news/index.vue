<template>
    <div class="myNews-content">
      <buy-search></buy-search>
      <!-- <nav-title></nav-title> -->
      <my-news></my-news>
    </div>
</template>

<script>
import BuyHeader from '../components/header'
import BuySearch from '../components/search'
import NavTitle from '../components/navTitle'
import MyNews from './components/news'
export default {
  components: {
    BuyHeader, BuySearch, MyNews, NavTitle
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
  .myNews-content{
    height:auto;
    padding:0;
    color: #666;
  }
</style>