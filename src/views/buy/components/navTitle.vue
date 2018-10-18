<template>
  <div class="list-title bg-paleRed">
    <div class="center-content">
      <router-link  v-for="item in navList" :key="item.index" :to="item.path">
        <div class="item horizontalList text-white">
          {{item.title}}
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navList: [
        {
          path: '/login',
          title: '首页'
        },
        {
          path: '/login',
          title: '电商'
        },
        {
          path: '/login',
          title: '民宿'
        }
      ]
    }
  }
}
</script>


<style scoped>
.list-title {
  width: 100%;
  height: 42px;
  line-height: 42px;
  margin: 0 auto;
}
.center-content .item{
  font-size: 14px;
  padding: 0 20px;
  cursor: pointer;
}
.center-content .item:hover {
  background: #d1201e;
}
</style>

