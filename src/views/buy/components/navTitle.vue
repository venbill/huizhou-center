<template>
  <div class="list-title bg-paleRed">
    <div class="center-content">
      <div class="item horizontalList text-white" v-for="item in 7" :key="item.index">
        云购首页
      </div>
    </div>
  </div>
</template>

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

