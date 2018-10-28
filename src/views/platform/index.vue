<template>
  <div class="home-main">
    <home-header ref="homeHeader"></home-header>
    <router-view></router-view>
    <home-foot></home-foot>
  </div>
</template>

<script>
import HomeHeader from '@/views/buy/components/header'
import HomeFoot from './layout/Footer'
export default {
  components: {
    HomeHeader, HomeFoot
  },
  data() {
    return {

    }
  },
  methods: {
  }
}
</script>

<style scoped>
  .home-main {
    height:auto;
    width: auto;
    min-width: 1366px;
    padding:0;
    color: #666;
  }
</style>


