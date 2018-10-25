<template>
  <div class="home-main">
    <home-header ref="homeHeader"></home-header>
    <router-view v-on:headerIndex="headerIndex"></router-view>
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
  },
  methods: {
    headerIndex(path) {
      this.$refs.homeHeader.routeFocus(path)
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
  }
</style>


