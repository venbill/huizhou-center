<template>
  <div>
    <div id="top">
      <div style="margin:0;height:400px;min-width:1366px;padding:0;border:0;font-size:100%;font-family:inherit;vertical-align:baseline;zoom: 1;">
        <el-row class="homestayBanner" style="height:100%;position:relative">
          <el-carousel height="400px">
            <el-carousel-item v-for="item in bannerImg" :key="item.index">
              <template v-if="item.href.includes('http')">
                <a :href="item.href" target="_blank">
                  <img :src="item.url"/>
                </a>
              </template>
              <template v-else>
                <router-link :to="item.href">
                  <img :src="item.url"/>
                </router-link>
              </template>
            </el-carousel-item>
          </el-carousel>
          <div style="margin:0 auto;width:600px;position:absolute;top:20%;left:50%;margin-left:-300px;z-index:999;">
            <el-input v-model="homeSearch.searchWord" style="opacity:.8;" class="select-b-search"></el-input>
            <el-button icon="el-icon-search" class="btn-red" type="danger" style="background:rgba(59,103,19,.8);border-color:transparent" @click="homestaySearch">搜索</el-button>
          </div>
        </el-row>
      </div>
    </div>
      
    <div id="main" style="padding:0 6%;">
        <div style="width:100%">
          <div class="title">热门旅游景区</div>
          <!-- 七大乡镇 -->
          <div style="padding-top:5%">
            <el-row :gutter=30>
              <el-col :span=12>
                <el-row class="city-pic">
                  <router-link :to="{path:'/index/homestay/search',query:{id:4,areaName:'西溪南镇'}}">
                    <img style="padding:0; width:100%;height:180px;position: relative;"
                     src="http://47.105.95.162:81/M00/00/00/rB-mAFvWlmmAKd4BAAYoeRzejWE073.jpg" />
                    <div class="city-title" style="left: 14%">西溪南镇</div>
                  </router-link>
                </el-row>
                <el-row style="padding-top:20px;" :gutter=20>
                  <el-col :span=12 class="city-pic">
                    <router-link :to="{path:'/index/homestay/search',query:{id:1,areaName:'岩寺镇'}}">
                      <img style="padding:0; width:100%;height:320px"
                       src="http://47.105.95.162:81/M00/00/00/rB-mAFvWmQyAYs6LAAQCRf1NwyI730.jpg" />
                      <div class="city-title" style="bottom: 20%">岩寺镇</div>
                    </router-link>
                  </el-col>
                  <el-col :span=12 class="city-pic">
                    <router-link :to="{path:'/index/homestay/search',query:{id:5,areaName:'潜口镇'}}">
                      <img style="padding:0; width:100%;height:320px"
                       src="http://47.105.95.162:81/M00/00/00/rB-mAFvWmPmAR0qNAANCYGvgMHY990.jpg" />
                      <div class="city-title" style="bottom: 20%">潜口镇</div>
                    </router-link>
                  </el-col>
                </el-row>
              </el-col>
              <el-col :span=12>
                <el-row :gutter=20>
                    <el-col :span=12 class="city-pic">
                      <router-link :to="{path:'/index/homestay/search',query:{id:2,areaName:'呈坎镇'}}">
                        <img style="padding:0; width:100%;height:250px"
                         src="http://47.105.95.162:81/M00/00/00/rB-mAFvWmJ-AIqpkAAMtLgzgJpI991.jpg" />
                        <div class="city-title">呈坎镇</div>
                      </router-link>
                    </el-col>
                    <el-col :span=12 class="city-pic">
                      <router-link :to="{path:'/index/homestay/search',query:{id:3,areaName:'杨村乡'}}">
                        <img style="padding:0; width:100%;height:250px"
                         src="http://47.105.95.162:81/M00/00/00/rB-mAFvWmSeAUzRrAALbib25qfg067.jpg" />
                        <div class="city-title">杨村乡</div>
                      </router-link>
                    </el-col>
                </el-row>
                <el-row style="padding-top:20px;" :gutter=20>
                    <el-col :span=12 class="city-pic">
                      <router-link :to="{path:'/index/homestay/search',query:{id:6,areaName:'富溪乡'}}">
                        <img style="padding:0; width:100%;height:250px"
                         src="http://47.105.95.162:81/M00/00/00/rB-mAFvWmLuAUPCbAAP9Mu1b4TI363.jpg" />
                        <div class="city-title">富溪乡</div>
                      </router-link>
                    </el-col>
                    <el-col :span=12 class="city-pic">
                      <router-link :to="{path:'/index/homestay/search',query:{id:7,areaName:'洽舍乡'}}">
                        <img style="padding:0; width:100%;height:250px"
                         src="http://47.105.95.162:81/M00/00/00/rB-mAFvWmOKASceGAANFtlSCAaI951.jpg" />
                        <div class="city-title">洽舍乡</div>
                      </router-link>
                    </el-col>
                </el-row>
              </el-col>
            </el-row>
          </div>
        </div>
        <div id="main" style="padding:0 6%;">
          <div style="width:100%">
            <!-- <div class="title">热门旅游景区</div> -->
            <!-- 七大乡镇 -->
            <div style="padding-top:5%;    text-align:center;   ">
                <el-row :gutter=2>
                    <el-col :span=8 >
                      <img style="width:80px;height:80px" src="../../assets/custom-theme/images/tel-service.png">
                        <div class="desc">
                            在线客服:12783921321
                        </div>
                    </el-col>
                    <el-col :span=8>
                      <img  style="width:80px;height:80px" src="../../assets/custom-theme/images/wechat-pay.png" >
                      <div class="desc">
                        微信安全支付
                      </div>
                    </el-col>
                    <el-col :span=8>
                      <img   style="width:80px;height:80px" src="../../assets/custom-theme/images/auth-user.png" >
                      <div class="desc">
                        平台实名认证房东房客信息
                      </div>
                    </el-col>
                </el-row>
            </div>
          </div>
        </div>
        <!-- 热门民宿 -->
        <div id="hot">
          <div style="width:100%">
              <div class="title">精品推荐</div>
              <div style="padding-top:5%">
                <el-row>
                  <router-link v-for="(item,index) in hotHomestays" :key="item.id" :to="{path:'/index/homestay/detail',query:{id:item.id}}">
                    <el-col :class="{'card-padding':index%4>0}" :span="6" :offset="index%4 > 0 ? 0 : 0">
                      <p v-show="index>3"></p>
                      <el-card style="height:362px;" :body-style="{ padding: '0px ' }">
                          <img style=" width: 100%;height:250px;display: block;" :src="item.picture" class="image">
                          <div style="padding: 14px;">
                              <div style="font-size:16px;">{{item.name}}</div>
                              <p style="color:grey;">{{ item.price }}元/每间</p>
                              <div>
                                  <el-rate style="float:left" v-model="item.score" disabled show-score text-color="#ff9900" score-template="{value}">
                                  </el-rate>
                                  <span style="color:grey;float:right">{{item.saleNum}}人已订</span>
                              </div>
                          </div>
                      </el-card>
                    </el-col>
                  </router-link>
                </el-row>
              </div>
          </div>
          <!-- <div style="padding-top:20px">
              <a href="#" style="padding-top:20px;font-weight:600;font-size:16px;color:#f56960">显示全部 > </a>
          </div> -->
        </div>
        <!-- 特惠超值 -->
        <div id="hot">
            <div style="width:100%">
                <div class="title">特惠超值</div>
                  <div style="padding-top:5%">
                    <el-row>
                      <router-link v-for="(item,index) in hotHomestays" :key="item.id" :to="{path:'/index/homestay/detail',query:{id:item.id}}">
                        <el-col :class="{'card-padding':index%4>0}" :span="6" :offset="index%4 > 0 ? 0 : 0">
                            <p v-show="index>3"></p>
                            <el-card style="height:362px;" :body-style="{ padding: '0px ' }">
                                <img style=" width: 100%;height:250px;display: block;" :src="item.picture" class="image">
                                <div style="padding: 14px;">
                                    <div style="font-size:16px;">{{item.name}}</div>
                                    <p style="color:grey;">{{ item.price }}元/每间</p>
                                    <div>
                                        <el-rate style="float:left" v-model="item.score" disabled show-score text-color="#ff9900" score-template="{value}">
                                        </el-rate>
                                        <span style="color:grey;float:right">{{item.saleNum}}人已订</span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                      </router-link>
                    </el-row>
                  </div>
                </div>
                <!-- <div style="padding-top:20px">
                    <a href="#" style="padding-top:20px;font-weight:600;font-size:16px;color:#f56960">显示全部 > </a>
                </div> -->
            </div>
          </div>
  </div>
</template>

 
 <script>
 import { homestayList, discountList } from '@/api/platform/homestay.js'
 import { getBanner } from '@/api/index/index'
 export default {
   data() {
     return {
       activeIndex: '2-1',
       bannerImg: [], // 民宿轮播图片
       homeSearch: {
         searchWord: ''
       },
       timeout: null,
       hotHomestays: [], // 热门民宿
       cheapHomestays: [] // 精品推荐
     }
   },
   methods: {
     init() {
       const this_ = this
       this.getBanner(2)
       homestayList().then(function(data) {
         if (data.data.code === 200) {
           this_.hotHomestays = data.data.data.results
         }
       })
       discountList().then(function(data) {
         if (data.data.code === 200) {
           this_.cheapHomestays = data.data.data.results
         }
       })
     },
     // 获取轮播图
     getBanner(type) {
       const this_ = this
       getBanner(type).then(function(data) {
         if (data.data.code === 200) {
           this_.bannerImg = data.data.data
           console.log(this_.bannerImg)
         }
       })
     },
     // 查询
     homestaySearch() {
       const this_ = this
       if (this_.homeSearch.searchWord.trim().length === 0) {
         this.$message.info('请先输入关键字')
         this.homeSearch.searchWord = ''
       } else {
         // 新窗口打开
         //  const routeData = this.$router.resolve({
         //    path: '/index/homestay/search',
         //    query: {
         //      keyword: this_.homeSearch.searchWord
         //    }
         //  })
         //  window.open(routeData.href, '_blank')
         this.$router.push('/index/homestay/search')
       }
     },
     handleSelect(item) {
       console.log(item)
     }
   },
   mounted() {
     this.init()
   }
 }
</script>

<style scoped>
.homestayBanner img {
  width: 100%;
  height: 100%;
}
a.hover:hover {
    color: #f56960;
}
 a.grey {
    color: #aaa;
}
.select-b-search {
  width: 450px;
}
 .title {
    text-align: center;
    padding-top: 50px;
    font-size: 25px;
    color: #f56960;
    font-weight: 350;
}
 .desc {
    font-size: 17px;
    font-weight: 400;
    padding-top: 20px;
}
 .city-pic {
    position: relative;
}
 .city-title {
    font-size: 30px;
    position: absolute;
    bottom: 50%;
    left: 30%;
    color: #ffffff;
    opacity: 0.6;
}
 .card-padding {
    padding-left: 20px;
}
</style>