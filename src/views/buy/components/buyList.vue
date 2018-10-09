<template>
  <div class="b-list">
    <div class="b-list-content">
      <div class="typeArea">
        <div class="item" v-for="item in 5" :key="item.index">
          <img src="">
        </div>
      </div>
      <div class="recommendation">
        <div class="r-title">
          <span>今日推荐</span>
        </div>
        <el-carousel trigger="click" :autoplay=false arrow="always" height="270px" class="carouselContent">
          <el-carousel-item v-for="item in 3" :key="item">
            <div class="r-item">
              <el-card class="r-card" v-for="child in 6" :key="child.index">
                <img src="" class="image" style="height:190px;width:190px;margin:0 auto;background:silver">
                <div style="padding: 4px 10px;font-size:12px;">
                  <span class="r-card-text" :title="1">阿拉山口等拉开哈市的反撒立刻打飞机安居房多</span>
                  <div class="r-card-bottom">
                    <span class="r-b-charge">123</span>
                    <!-- <span class="r-b-text">满减测试</span> -->
                  </div>
                </div>
              </el-card>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    }
  }
}
</script>

<style scoped>
.b-list {
  width: 100%;
}
.b-list-content {
  width: 1200px;
  margin: 0 auto;
}
.typeArea {
  height: 260px;
  clear: both;
  margin: 20px 0;
}
.typeArea .item {
  width: 232px;
  height: 260px;
  float: left;
  cursor: pointer;
  background: silver;
}
.typeArea .item:not(:last-child) {
  margin-right: 10px;
}
.recommendation {
  width: 1200px;
  height: 326px;
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
  padding: 0 8px;
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

