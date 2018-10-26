<template>
  <div class="layout-main">
    <div class="index-inner-content">
      <div class="crumbs-box">
        <el-breadcrumb separator=">">
          <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>关于我们</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="bg-white" style="padding-bottom:30px;">
        <div class="detai-title">关于我们</div>
        <div class="us-content">
          <p class="us-title">电子商务公共服务中心</p>
          <div class="us-introduce">
            <p class="introduce-title">
              （一）“电子商务公共服务中心”
            </p>
            <p class="introduce-text">
              利用谢裕大原博物馆、办公大楼建设5000平方米电子商务中心。具体空间布局为：
            </p>
            <p class="introduce-text">
              1.一层主要配置为公共服务中心展示中心、无人超市、产品展示区、茶艺体验区、徽州风情长廊、VR体验区、O2O体验馆、跨境电商展示区等内容；
            </p>
            <p class="introduce-text">
              2.二层为办公区、电商孵化中心、电商培训中心、电商企业入驻区；
            </p>
            <p class="introduce-text">
              3.三层为电商运营区、众创空间、会议室。
            </p>
            <img src="/static/images/us/service.png" class="introduce-img"/>
          </div>
          <div class="us-introduce">
            <p class="introduce-title">
              （二）“电子商务物流配送中心”
            </p>
            <p class="introduce-text">
              建设40亩的物流配送中心，主要包括以下：
            </p>
            <p class="introduce-text">
              1.冷链物流配送系统：包括建设6000立方米的冷链仓库、配送流水线仓库及配送物流车辆等。
            </p>
            <p class="introduce-text">
              2.物流配送农村全覆盖：建设物流配送中心，诸如邮政快递、顺丰快递等快递企业将入驻项目园区，同时通过完善的物流体系实现农村全覆盖。
            </p>
            <p class="introduce-text">
              3.建设农产品集货、分拣、包装、发货聚集区，同时整合圆通、申通、顺丰、韵达、邮政等快递物流企业完成农产品上下行。
            </p>
            <img src="/static/images/us/logistics.png" class="introduce-img"/>
          </div>
          <div class="us-introduce">
            <p class="introduce-title">
              （三）联系我们
            </p>
            <p class="us-info">
              中心地址：安徽省黄山市徽州区城北工业园文峰西路1号<br/>
              固定电话：0559-3586666<br/>
              联系人：江先生 15212310103<br/>
              邮箱：1359201795@qq.com
            </p>
          </div>
        </div>
        <div id="map-us"></div>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  methods: {
    mapDraw() {
      // 绘制地图
      var map = new AMap.Map('map-us', {
        resizeEnable: false,
        zoom: 16, // 级别
        center: [118.333084,29.82785] // 中心坐标
      })
      // 定义标记点
      var marker = new AMap.Marker({
        icon: 'https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png',
        position: [118.333084,29.82785]
      })
      AMap.plugin(['AMap.ToolBar', 'AMap.Scale', 'AMap.Driving'], function() {
        map.addControl(new AMap.ToolBar())
        map.addControl(new AMap.Scale())
        map.addControl(new AMap.Driving())
      })
      map.add(marker)
    }
  },
  mounted() {
    this.mapDraw()
  }
}
</script>


<style scoped>
.layout-main {
  background: #f5f5f5;
}
.crumbs-box {
    font-size: 14px;
    color: #333;
    padding: 45px 0 20px;
    border-bottom: 4px solid #007130;
  }
  .detai-title {
    font-size: 16px;
    padding: 0 30px;
    height: 60px;
    line-height: 60px;
    color: #666;
    border-bottom: 1px solid #ddd;
  }
  .us-content {
    width: 799px;
    margin: 0 auto;
    padding-bottom: 30px;
  }
  .us-title {
    font-size: 24px;
    color: #333;
    padding: 30px 0 20px;
    text-align: center;
  }
  .us-introduce {
    color: #666;
  }
  .us-introduce:not(:last-child) {
    margin-bottom: 70px;
  }
  .introduce-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .introduce-text {
    font-size: 16px;
    line-height: 1.5;
  }
  .introduce-img {
    margin-top: 20px;
  }
  .us-info {
    font-size: 18px;
    line-height: 1.5;
  }
  #map-us {
    width: 1120px;
    height: 540px;
    margin: 0 auto;
  }
</style>