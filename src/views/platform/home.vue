<template>
  <div class="layout-main">
    <div>
      <el-carousel style="padding:0; width:100%;height:100%" indicator-position="outside" height="400px">
        <el-carousel-item>
          <img style="padding:0; width:100%;height:100%"   src="http://pic.cifnews.com/upload/201508/16/201508161802374333.jpg"/>
        </el-carousel-item>
        <el-carousel-item>
          <img style="padding:0; width:100%;height:100%"  src="http://img2.imgtn.bdimg.com/it/u=2173796169,814644965&fm=26&gp=0.jpg" />
        </el-carousel-item>
        <el-carousel-item>
          <img style="padding:0; width:100%;height:100%"  src="http://img1.imgtn.bdimg.com/it/u=3497043959,337388444&fm=200&gp=0.jpg" />
        </el-carousel-item>
      </el-carousel>

      <el-row>
        <el-col style="text-align:center" :offset=4 :span=16>
          <div style="padding-top:50px;font-size:30px;color:#232323;font-weight:500">
              徽州电子商务中心简介
          </div>
          <div style="color:#999999;padding-top:20px;padding-bottom:20px;font-size:15px;">
              徽州电子商务中心是徽州区政府引导鼓励黄山企业迈入电商互联网行业的发展平台，平台给予企业最大的政策和机会支持，同时保证为客户提供良好的互联网购物环境，助力当地经济发展的同时为客户提供种类繁多、物美价廉的商品和民宿服务。
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="20" style="padding-top:50px;text-align:center;line-height:50px;font-size:23px;color:#959595">
          <!-- <el-col :span=6><div class="grid-content bg-purple">1</div></el-col> -->
          <el-col :offset=4 :span=4>
              <div class="grid-content bg-purple">入驻企业</div>
              <div class="grid-content bg-purple"><span style="color:#F5695F">50</span>家</div>
          </el-col>

          <el-col :span=4>
              <div class="grid-content bg-purple">销售商品</div>
              <div class="grid-content bg-purple"><span style="color:#F5695F">9990+</span>类</div>
          </el-col>

          <el-col :span=4>
              <div class="grid-content bg-purple">客户量</div>
              <div class="grid-content bg-purple"><span style="color:#F5695F">50000+</span>位</div>
          </el-col>

          <el-col :span=4>
              <div class="grid-content bg-purple">营销专家</div>
              <div class="grid-content bg-purple"><span style="color:#F5695F">30</span>位</div>
          </el-col>

      </el-row>

      <el-row>
        <el-col style="text-align:center" :offset=4 :span=16>
          <div style="padding-top:50px;font-size:30px;color:#232323;font-weight:500">
              最新签约
          </div>
          <div style="color:#999999;padding-top:20px;padding-bottom:20px;font-size:15px;">
            <el-table :show-header="false" :data="shops" style="width: 100%;text-align:left">
                <el-table-column prop="name" label="企业">
                </el-table-column>
                <el-table-column prop="date" label="日期" width="180">
                </el-table-column>
            </el-table>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col style="text-align:center" :offset=4 :span=16>
          <div style="padding-top:50px;font-size:30px;color:#232323;font-weight:500">
            平台优势
          </div>
          <div style="color:#999999;padding-top:20px;padding-bottom:20px;font-size:15px;">
            <el-row>
              <el-col :span=6>
                <el-card :offset=2 :body-style="{ padding: '0px' }">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537283317&di=9516a597d34677102f55961c850eaf87&imgtype=jpg&er=1&src=http%3A%2F%2Fimg3.qianzhan.com%2Fnews%2F201711%2F20%2F20171120-fd2e8c40a0a4e9d0_600x5000.jpg" style="height:250px;width:100%">
                  <div style="padding: 14px;">
                    <span>雄厚的研发实力</span>
                  </div>
                </el-card>
              </el-col>
              <el-col :offset=3 :span=6>
                <el-card :body-style="{ padding: '0px' }">
                  <img src="http://imgsrc.baidu.com/imgad/pic/item/5366d0160924ab189eaf1f1e3efae6cd7b890b59.jpg"  style="height:250px;width:100%">
                  <div style="padding: 14px;">
                      <span>农村资源整合</span>
                  </div>
                </el-card>
              </el-col>
              <el-col :offset=3 :span=6>
                <el-card :body-style="{ padding: '0px' }">
                  <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537283405&di=4aa58bbf85e1527d5f004dc0cb95eeba&imgtype=jpg&er=1&src=http%3A%2F%2Fwww.ltsoftware.net%2Fimages%2Fltsoft-dianshang.jpg" style="height:250px;width:100%">
                  <div style="padding: 14px;">
                      <span>打造旅游+民宿+电商服务</span>
                  </div>
                </el-card>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>

      <el-row>
        <el-col style="text-align:center" :offset=4 :span=16>
          <div style="padding-top:50px;font-size:30px;color:#232323;font-weight:500">
              助力经济发展
          </div>
          <div style="padding-top:20px;padding-bottom:20px;font-size:15px;">
            <el-row>
              <el-col style="border:1px solid #aaa;border-radius: 5px;padding:10px 5;display: inline-block;" :span=10>
                <h4 style="font-size:20px;font-weight:390">1.优化旅游服务</h4>
                <div style="color:#999999">不断健全配套服务体系。构建完善的城市旅游综合配套服务体系是旅游产业实现转型的客观要求。各类涉旅行业需按照旅游“吃、住、行、游、购、娱”六要素的要求，以游客为本，加快建设游客集散服务体系,提高旅游接待能力，形成以服务游客为中心的综合配套服务体系。</div>
              </el-col>
              <el-col :offset=4 style="border:1px solid #aaa;border-radius: 5px;padding:10px 5;display: inline-block;" :span=10>
                <h4 style="font-size:20px;font-weight:390">2.提供优质民宿资源</h4>
                <div style="color:#999999">平台民宿开发通过线上与线下的民宿合作，为用户们提供丰富的民宿的资源，不一样的旅行感受。民宿服务开发是为了方便旅客们，用户们在享受自然地风景的时候，也可以感受一些民宿的风俗乐趣，在附近找到一家民宿进行租住，而不用返回遥远的边际酒店，更好的享受自然的风光。</div>
              </el-col>
            </el-row>
            <el-row style="padding-top:20px">
              <el-col style="border:1px solid #aaa;border-radius: 5px;padding:10px 5;display: inline-block;" :span=10>
                <h4 style="font-size:20px;font-weight:390">3.绿色农产品供销</h4>
                <div style="color:#999999">推动农产品进出口的平衡发展，需要推动农业供给侧结构性改革，加快农业科技进步，提高农业生产率。同时，在体制机制建设上，要让市场的作用真正发挥出来，更好地配置农业资源。</div>
              </el-col>
              <el-col :offset=4 style="border:1px solid #aaa;border-radius: 5px;padding:10px 5;display: inline-block;" :span=10>
                <h4 style="font-size:20px;font-weight:390">4.丰富居民生活</h4>
                <div style="color:#999999">以互联网+旅游为平台，通过疏通“线上线下”供需渠道，将农副产品输送到城市社区居民手上，完成城市居民与村民的供需对接，从而解决贫困户“产业脱贫”增收的关键问题。</div>
              </el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
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
  
</style>


