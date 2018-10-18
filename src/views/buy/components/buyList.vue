<template>
  <div class="b-list">
    <div class="b-list-content">
      <div class="typeArea">
        <router-link v-for="item in activeGoods" :key="item.index" :to="{path:'/buy/search',query: {id: item.id}}" target="_blank">
          <div class="item">
            <h3 style="text-align:center">{{item.activityName}}</h3>
            <img :src="item.picture" style="width:100%;">
          </div>
        </router-link>
      </div>
      <div class="recommendation" v-for="item in goodsTypes" :key="item.index">
        <div class="r-title">
          <span>{{item.tagName}}</span>
        </div>
        <div class="carouselContent">
          <div class="r-item">
            <card-link :body="item.goods" :height="270" :width="190" :imgHeight="190" :imgWidth="190"></card-link>
            <!-- <router-link v-for="child in item.goods" :key="child.index" :to="{path:'/buy/detail',query: {id: child.id}}" target="_blank">
              <el-card class="r-card">
                <img :src="child.picture" class="image" style="height:190px;width:190px;margin:0 auto;background:silver">
                <div style="padding: 4px 10px;font-size:12px;">
                  <span class="r-card-text" :title="child.name">{{child.name}}</span>
                  <div class="r-card-bottom">
                    <span class="r-b-charge">{{child.minPrice | pieceFormat}}</span>
                    <span class="r-b-text">满减测试</span>
                  </div>
                </div>
              </el-card>
            </router-link> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getActiveGoods, getTagAndGoods } from '@/api/buy/buy'
import utils from '@/utils/util'
import CardLink from '@/views/buy/components/cardLink'
export default {
  components: { CardLink },
  data() {
    return {
      activeGoods: [], // 活动商品列表
      goodsTypes: [] // 商品分类
    }
  },
  filters: {
    pieceFormat(value) {
      return utils.pieceFormat(value)
    }
  },
  methods: {
    init() {
      const this_ = this
      // 获取活动商品列表
      getActiveGoods().then(function(data) {
        if (data.data.code === 200) {
          this_.activeGoods = data.data.data
        }
      })

      // 获取商品分类
      getTagAndGoods().then(function(data) {
        if (data.data.code === 200) {
          this_.goodsTypes = data.data.data
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
.b-list {
  width: 100%;
}
img {
  width: 100%;
}
.b-list-content {
  width: 1200px;
  margin: 0 auto;
}
.typeArea {
  height: 320px;
  clear: both;
  margin: 20px 0;
}
.typeArea .item {
  width: 232px;
  height: 320px;
  float: left;
  overflow: hidden;
  cursor: pointer;
}
.typeArea .item:not(:last-child) {
  margin-right: 10px;
}
.recommendation {
  width: 1200px;
  margin-bottom: 20px;
  background: #fff;
}
.r-title {
  width: 100%;
  height: 56px;
  line-height: 56px;
  padding: 0 20px;
  box-sizing: border-box;
  background: #ee4644;
  color: #fff;
  font-size: 18px;
}
.carouselContent {
  box-sizing: content-box;
  height: 270px;
  padding: 20px 8px 10px;
  background: #f5f5f5;
}
.r-card {
  height:270px;
  width:190px;
  float:left;
  background: #fff;
  height: 100%;
  cursor: pointer;
}
.r-card:not(:last-child) {
  margin-right:6px;
}
.r-card-text {
  display: inline-block;
  line-height: 1.4;
  height: 32px;
  overflow: hidden;
}
.r-card-text:hover {
  color: red;
}
.r-card-bottom {
  padding: 4px 0;
}
.r-b-charge {
  font-size: 16px;
  font-weight: bold;
  color: red;
}
.r-b-text {
  float: right;
}
</style>

<style>
.r-item .el-card__body {
  padding: 0;
}
</style>

