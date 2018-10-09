<template>
<div id="main" style="padding:0 6%;">

    <div style="
padding:5px;
margin: 0;padding: 0;border: 0;font-size: 100%;font-family: inherit;vertical-align: baseline;zoom: 1;">
        <div>

            <el-row style="padding-top:10px;height:100%;background-repeat:no-repeat;   ">

                <el-col :span=12>

                    <el-autocomplete style="width:100%;" v-model="state4" size="medium" allowCreate=true :fetch-suggestions="querySearchAsync" placeholder="请输入景区、地名、民宿名称或店铺名称" @select="handleSelect"></el-autocomplete>

                </el-col>

                <el-col :span=3>
                    <el-button style="width:100%;" type="danger">搜索</el-button>

                </el-col>

            </el-row>

            <el-row style="padding-top:10px;">
                <el-button @click="showSelect(1)" plain>选择地区</el-button>
                <el-button @click="showSelect(2)" plain>选择类型</el-button>
                <el-button @click="showSelect(3)" plain>价格</el-button>
                <el-button @click="showSelect(4)" plain>选择日期</el-button>

            </el-row>

            <div v-show="showSelectArea>0" style="position: fixed;right: 10px;
top: 10px; position: relative;opacity: 0.8; width:50%;z-index:100;border-style: solid;border-width: 2px;
border-color:#FFBFBF">
                <el-row style="padding:40px 40px;">
                    <el-col v-show="showSelectArea==1" :span=18>
                        <el-select v-model="condition.place" placeholder="请选择">
                            <el-option v-for="item in placeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col v-show="showSelectArea==2" :span=18>

                        <el-select v-model="condition.type" placeholder="请选择">
                            <el-option v-for="item in typeOptions" :key="item.value" :label="item.label" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-col>

                    <el-col v-show="showSelectArea==3" :span=18>
                        <el-row>

                            <el-col :span=24>
                                <el-slider v-model="priceRange" range :min="100" :step="100" :max="5000">
                                </el-slider>
                            </el-col>

                        </el-row>
                        <el-row>
                            <el-col style=" line-height:30px; font-size:13px;color:#909399;   display: inline-block;
    vertical-align: middle;" :span=6>
                                ¥{{priceRange[0]}} - ¥{{priceRange[1]}}
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col v-show="showSelectArea==4" :span=18>

                        <el-row>
                            <el-col :span=18>
                                <div  class="block">
                                    {{value6}}
                                    <el-date-picker focus v-model="daterange" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
                                    </el-date-picker>
                                </div>

                            </el-col>

                        </el-row>
                    </el-col>

                    <el-col :span=6 style="text-align:right">
                        <i @click="showSelect(0)"  class="el-icon-success icon-red"></i>
                        <i @click="showSelect(0)" class="el-icon-error icon-red"></i>

                    </el-col>
                </el-row>

            </div>

        </div>

    </div>

    <div style="  border-style: solid;border-left-style:none;border-right-style:none;border-bottom-style:none;border-color:#E4E7ED;border-width:2px;margin-top:20px;padding-top:10px;">

        <el-row>
            <el-col :span=18>
                <div>
                    <span style=" 
          padding:5px;
border-radius:5%;      
  backgroundColor:#F56C6C ;
    font-size: 20px;
    color: #FFFF;
    line-height:40px;
    font-weight: 350;">搜索结果</span>
                    <span style="font-size:14px">
                <span class="active"> 默认排序
                </span>
                    <span>评分 <i class="el-icon-caret-bottom"></i></span>
                    <span>价格 <i class="el-icon-caret-top"></i></span>
                    <span>销量 <i class="el-icon-caret-bottom"></i></span>
                    </span>
                </div>

                <div v-for="item in homestays">
                    <el-row  style="margin:10px 0;border-style: solid;border-width:1px;border-radius:10px;
border-color: #E4E7ED">

                    <el-col :span=10>

                        <el-carousel style="border-radius:10px;padding:0; width:100%;height:220px" :autoplay=false indicator-position="outside" height="200px">
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
                    </el-col>

                    <el-col style="padding-left:4%" :span=8>
                        <p style="color:#606266">
                            独立房间.1室1卫1床
                        </p>
                        <h2 style="color:#303133">
                            独立海边别墅 带泳池
                        </h2>

                        <p style="color:#606266">
                            这间客房位于乡村俱乐部的一栋漂亮的砖房内...
                        </p>

                    </el-col>

                    <el-col style="padding-left:4%;text-align:left" :span=6>
                        <p style="color:#909399">  <span style="font-size:16px;color:#F56C6C">¥221</span>／每晚</p>
                        <el-rate style="float:left" v-model=value disabled show-score text-color="#ff9900" score-template="{value}">
                        </el-rate>

                        <img style="margin-top:10px;width:50px;height:50px;border:2px solid;
border-radius:25px;" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537089309530&di=9ae8e4e812a9baa2802b4af948bc5519&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201501%2F23%2F20150123095036_GCWVx.jpeg" />

                    </el-col>

                </el-row>

               
                </div>
 <el-pagination
  background
  layout="prev, pager, next"
  :total="100">
</el-pagination>
                

            </el-col>

            <el-col :offset=1 :span=5>
                 
             <div>
                    <span style=" 
          padding:5px 20px;
border-radius:5%;      
  backgroundColor:#F56C6C ;
    font-size: 20px;
    color: #FFFF;
    line-height:40px;
    font-weight: 350;">推荐</span>
             </div> 


             <div style="padding-top:10px;width:100%">
             <div v-for="(item,index) in homestays">

                <img  style="width:100%"  src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537686724&di=9162b4a97555ad0b1329a66b6d8c2e4b&imgtype=jpg&er=1&src=http%3A%2F%2Fimg.mp.itc.cn%2Fq_mini%2Cc_zoom%2Cw_640%2Fupload%2F20170805%2F0a5087c2bb294ee3804d86f379558f2d_th.jpg"  />
                <h3 style="color:#303133">
                            独立海边别墅 带泳池
                        </h3>
                  <div > 
                      <span style="color:#909399">
                       <span style="color:#F56C6C">¥221
                      </span>／每晚
                      </span>

                      <span style="float:right;color:#606266">
                            独立房间.1室1卫1床
                        </span>
                      </div> 
            <div  style="  border-style: solid;border-left-style:none;border-right-style:none;border-top-style:none;border-color:#EBEEF5;border-width:2px;margin-bottom:20px;padding-bottom:10px;">
             </div>
            </div>
             </div>





            </el-col>

        </el-row>

    </div>

</div>
</template>

<style>
.icon-red {

    padding: 3%;

    color: #F56C6C;

    font-size: 25px;

}

.active {
    color: #F56C6C;
}


img{
    border-radius:10px
}
</style>

  
 

<script>
export default {
  data() {
    return {
      activeIndex: '2-1',

      restaurants: [],
      state4: '',
      timeout: null,

      showSelectArea: 0,
      condition: {

        place: 0,
        type: 0,
        dateStart: '',
        dateEnd: ''

      },

      placeOptions: [{
        value: 0,
        label: '所有地区'
      },
      {
        value: 1,
        label: '岩寺镇'
      }, {
        value: 2,
        label: '西溪南镇'
      }, {
        value: 3,
        label: '潜口镇'
      }, {
        value: 4,
        label: '呈坎镇'
      }, {
        value: 5,
        label: '杨村乡'
      },
      {
        value: 6,
        label: '富溪乡'
      },
      {
        value: 7,
        label: '洽舍乡'
      }

      ],

      typeOptions: [{
        'value': 0,
        'label': '所有类型'
      }, {
        'value': 1,
        'label': '整个房源'
      }, {
        'value': 2,
        'label': '独立房间'
      }],

      value6: '',
      daterange: '',

      priceRange: [120, 300],

      homestays: [{
        id: 1,
        name: '黄山脚下超级民宿中诺厄我认为哦期望和期望',
        price: 91,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 2,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 3,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 4,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 5,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 6,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 7,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 8,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 9,
        name: '江边海景房',
        price: 101,
        value: 3.5,
        orderNum: 1099,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      }
      ]

    }
  },
  methods: {
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
    handleSelect(item) {
      console.log(item)
    },

    showSelect(i) {
      this.showSelectArea = i
    }

  },

  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>
