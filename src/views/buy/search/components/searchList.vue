<template>
    <div class="list-content">
      <div class="list-main center-content bg-white border-box">
        <div class="no-data text-silver">
          抱歉，没有找到与<span class="text-red">“测试数据”</span>相关的商品
        </div>
        <div class="hotGoods">
          <div class="hotGoods-title">
            <span style="font-size:18px">热卖区</span>
            <span class="text-link float-right" style="font-size:12px">换一换</span>
          </div>
          <div class="hotGoods-content">
            <el-card class="r-card inline-block pointer" style="width:160px" v-for="child in 6" :key="child.index">
              <img src="" class="image block" style="height:140px;width:140px;margin:0 auto;background:silver">
              <div style="padding: 4px 10px;font-size:12px;">
                <span class="r-card-text" :title="1">阿拉山口等拉开哈市的反撒立刻打飞机安居房多</span>
              </div>
            </el-card>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  data() {
    return {
    }
  },
  methods: {},

  mounted() {}
}
</script>

<style scoped>
.list-content {
  width: 100%;
}
.list-main {
  padding: 20px;
}
.no-data {
  font-size: 12px;
}
.hotGoods {
  margin-top: 30px;
}
.hotGoods-content {
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 25px 30px;
  text-align: center;
}
.hotGoods-content .r-card:not(:last-child) {
  margin-right: 20px;
}
.r-card-text {
  display: inline-block;
  line-height: 1.4;
  height: 32px;
  overflow: hidden;
}
</style>

<style>
.hotGoods-content .el-card__body {
  padding: 0;
}
</style>