<template>
  <div class="home-main">
    <home-header></home-header>
    <router-view></router-view>
    <home-foot></home-foot>
  </div>
</template>

<script>
import HomeHeader from './layout/Header'
import HomeFoot from './layout/Footer'
export default {
  components: {
    HomeHeader, HomeFoot
  },
  data() {
    return {

    }
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
    background: #333;
  }
</style>


