<template>
  <div>
    <div id="top">
      <div style="margin:0;height:450px;padding:0;border:0;font-size:100%;font-family:inherit;vertical-align:baseline;zoom: 1;">
        <el-row style="padding-top:120px;height:100%;background-size: bottom;  
          background-image:url(https://static.zzkcdn.com/o_1cjv6uma41nbl1jkcg761op11hvpm.jpg);  
          background-repeat:no-repeat;  
          background-position:center; ">
          <div style="margin:0 auto; width: 600px;">
            <el-input v-model="homeSearch.searchWord" class="select-b-search"></el-input>
            <el-button icon="el-icon-search" class="btn-red" type="danger" @click="homestaySearch">搜索</el-button>
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
 export default {
   data() {
     return {
       activeIndex: '2-1',
       restaurants: [],
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
     loadAll() {
       return [{
         value: '三全鲜食（北新泾店）',
         address: '黄山'
       },
       {
         value: 'Hot honey 首尔炸鸡（仙霞路）',
         address: '西递'
       },
       {
         value: '新旺角茶餐厅',
         address: '宏村'
       },
       {
         value: '泷千家(天山西路店)',
         address: '唐模景区'
       },
       {
         value: '胖仙女纸杯蛋糕（上海凌空店）',
         address: '黄山市古徽州文化旅游区'
       },
       {
         value: '贡茶',
         address: '棠樾石牌坊群'
       },
       {
         value: '豪大大香鸡排超级奶爸',
         address: '呈坎景区'
       },
       {
         value: '茶芝兰（奶茶，手抓饼）',
         address: '潜口民宅'
       },
       {
         value: '十二泷町',
         address: '鲍家花园'
       },
       {
         value: '星移浓缩咖啡',
         address: '徽州古城'
       },
       {
         value: '阿姨奶茶/豪大大',
         address: '嘉定区曹安路1611号'
       },
       {
         value: '新麦甜四季甜品炸鸡',
         address: '嘉定区曹安公路2383弄55号'
       },
       {
         value: 'Monica摩托主题咖啡店',
         address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'
       },
       {
         value: '浮生若茶（凌空soho店）',
         address: '上海长宁区金钟路968号9号楼地下一层'
       },
       {
         value: 'NONO JUICE  鲜榨果汁',
         address: '上海市长宁区天山西路119号'
       },
       {
         value: 'CoCo都可(北新泾店）',
         address: '上海市长宁区仙霞西路'
       },
       {
         value: '快乐柠檬（神州智慧店）',
         address: '上海市长宁区天山西路567号1层R117号店铺'
       },
       {
         value: 'Merci Paul cafe',
         address: '上海市普陀区光复西路丹巴路28弄6号楼819'
       },
       {
         value: '猫山王（西郊百联店）',
         address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306'
       },
       {
         value: '枪会山',
         address: '上海市普陀区棕榈路'
       },
       {
         value: '纵食',
         address: '元丰天山花园(东门) 双流路267号'
       },
       {
         value: '钱记',
         address: '上海市长宁区天山西路'
       },
       {
         value: '壹杯加',
         address: '上海市长宁区通协路'
       },
       {
         value: '唦哇嘀咖',
         address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元'
       },
       {
         value: '爱茜茜里(西郊百联)',
         address: '长宁区仙霞西路88号1305室'
       },
       {
         value: '爱茜茜里(近铁广场)',
         address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'
       },
       {
         value: '鲜果榨汁（金沙江路和美广店）',
         address: '普陀区金沙江路2239号金沙和美广场B1-10-6'
       },
       {
         value: '开心丽果（缤谷店）',
         address: '上海市长宁区威宁路天山路341号'
       },
       {
         value: '超级鸡车（丰庄路店）',
         address: '上海市嘉定区丰庄路240号'
       },
       {
         value: '妙生活果园（北新泾店）',
         address: '长宁区新渔路144号'
       },
       {
         value: '香宜度麻辣香锅',
         address: '长宁区淞虹路148号'
       },
       {
         value: '凡仔汉堡（老真北路店）',
         address: '上海市普陀区老真北路160号'
       },
       {
         value: '港式小铺',
         address: '上海市长宁区金钟路968号15楼15-105室'
       },
       {
         value: '蜀香源麻辣香锅（剑河路店）',
         address: '剑河路443-1'
       },
       {
         value: '北京饺子馆',
         address: '长宁区北新泾街道天山西路490-1号'
       },
       {
         value: '饭典*新简餐（凌空SOHO店）',
         address: '上海市长宁区金钟路968号9号楼地下一层9-83室'
       },
       {
         value: '焦耳·川式快餐（金钟路店）',
         address: '上海市金钟路633号地下一层甲部'
       },
       {
         value: '动力鸡车',
         address: '长宁区仙霞西路299弄3号101B'
       },
       {
         value: '浏阳蒸菜',
         address: '天山西路430号'
       },
       {
         value: '四海游龙（天山西路店）',
         address: '上海市长宁区天山西路'
       },
       {
         value: '樱花食堂（凌空店）',
         address: '上海市长宁区金钟路968号15楼15-105室'
       },
       {
         value: '壹分米客家传统调制米粉(天山店)',
         address: '天山西路428号'
       },
       {
         value: '福荣祥烧腊（平溪路店）',
         address: '上海市长宁区协和路福泉路255弄57-73号'
       },
       {
         value: '速记黄焖鸡米饭',
         address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
       },
       {
         value: '红辣椒麻辣烫',
         address: '上海市长宁区天山西路492号'
       },
       {
         value: '(小杨生煎)西郊百联餐厅',
         address: '长宁区仙霞西路88号百联2楼'
       },
       {
         value: '阳阳麻辣烫',
         address: '天山西路389号'
       },
       {
         value: '南拳妈妈龙虾盖浇饭',
         address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
       }
       ]
     },
     querySearchAsync(queryString, cb) {
       var restaurants = this.restaurants
       var results = queryString
         ? restaurants.filter(this.createStateFilter(queryString))
         : restaurants
       clearTimeout(this.timeout)
       this.timeout = setTimeout(() => {
         cb(results)
       }, 1000 * Math.random())
     },
     createStateFilter(queryString) {
       return state => {
         return (
           state.address.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
         )
       }
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
     this.restaurants = this.loadAll()
     this.init()
   }
 }
</script>

<style scoped>
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