<template>
  <div class="category-main">
    <el-collapse class="search-type">
      <el-collapse-item title="店内分类" :name="index" v-for="(item, index) in 2" :key="item.id">
        <div class="type-item" :name="index + '-' + sub" :class="{ bgColor: routeIndex === index + '-' + sub}"
          v-for="(route, sub) in 6" :key="route.index" @click="routeFocus(item,  route, index, sub)">电玩</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  data() {
    return {
      routeIndex: '' // 选中链接索引
    }
  },
  methods: {
    routeFocus(item, route, index, sub) {
      this.routeIndex = index + '-' + sub
      console.log(this.routeIndex)
    }

  },

  mounted() {}
}
</script>

<style scoped>
.category-main {
  width: 100%;
}
.search-type {
  width: 100%;
  border: 1px solid #ddd;
  margin: 0 auto;
  padding: 0;
  background: transparent;
}
.search-title {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding: 0 5px;
  background: #f7f7f7;
}
.search-title {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding: 0 5px;
  background: #f7f7f7;
}
.search-type .type-item {
  background: #F5F5F5;
  height: 36px;
  line-height: 36px;
  padding-left: 40px;
  font-size: 12px;
}
.search-type .type-item:not(:last-child) {
  border-bottom: 1px solid #ddd
}
.bgColor{
  background:#ddd!important;
}
.search-type .el-collapse-item__content .type-item:hover{
  background: #ddd;
}
</style>

<style>
.search-type .el-collapse-item {
  padding: 0;
}
.search-type .el-collapse-item .el-collapse-item__header {
  padding-left: 10px;
}
.search-type .el-collapse-item__content{
  padding-bottom: 0;
}
</style>
