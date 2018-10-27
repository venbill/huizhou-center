<template>
  <div class="card-body">
    <el-card class="r-card goods-list inline-block" v-for="child in body" :key="child.index" :style="{width:width + 'px', height:height + 'px'}">
      <router-link :to="{path:'/buy/detail', query:{id:child.id}}" target="_blank">
        <img :src="child.picture" class="block" :style="{width:imgWidth + 'px', height:imgHeight + 'px'}">
      </router-link>
      <div style="padding: 4px 10px;font-size:12px;">
        <router-link :to="{path:'/buy/detail', query:{id:child.id}}" target="_blank">
          <span class="r-card-text text-link-normal" :title="child.name">{{child.name}}</span>
        </router-link>
        <span class="r-b-charge block">{{child.minPrice | pieceFormat}}</span>
      </div>
    </el-card>
  </div>
</template>

<script>
import util from '@/utils/util'
export default {
  props: {
    body: {
      type: Array
    }, // 数据
    height: '', // 卡片高度
    width: '', // 卡片宽度
    imgHeight: '', // 图片高度
    imgWidth: '' // 图片宽度
  },
  data() {
    return {

    }
  },
  filters: {
    pieceFormat(value) {
      return util.pieceFormat(value)
    }
  },
  mounted() {

  }
}
</script>

<style scoped>
.card-body{
}
img{
  margin: 0 auto;
}
.goods-list {
  margin-bottom: 20px;
  display: inline-block;
}
.goods-list:not(:last-child) {
  margin-right: 20px;
}
.r-card-text {
  display: inline-block;
  line-height: 1.4;
  height: 40px;
  overflow: hidden;
}
.r-b-charge {
  font-size: 16px;
  font-weight: bold;
  color: red;
}
</style>

<style>
.goods-list .el-card__body {
  padding: 10px 0;
}
.card-body .el-card {
  width: 100%;
  height: 100%;
}
</style>



