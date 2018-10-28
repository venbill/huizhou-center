<template>
<div class="center-content" style="padding:20px 0">

    <div style="padding:5px;margin:0;padding:0;border:0;font-size:100%;font-family:inherit;vertical-align:baseline;zoom: 1;">
        <div>
            <el-row style="padding-top:10px;height:100%;background-repeat:no-repeat;   ">

                <el-col :span=12>

                    <el-input v-model="homeSearch.searchWord" class="select-b-search"></el-input>

                </el-col>

                <el-col :span=3>
                    <el-button style="width:100%;" class="btn-red" type="danger" @click="homestaySearch">搜索</el-button>
                </el-col>

            </el-row>
            <el-row style="margin-top:10px;">
              <el-menu mode="horizontal" class="chooseMenu" :default-active="activeIndex" @select="handleSelect">
                <el-submenu index="0">
                  <template slot="title">选择地区</template>
                  <el-menu-item :index="0 + '-' + child.id" v-for="child in placeOptions" :key="child.sub">{{child.areaName}}</el-menu-item>
                </el-submenu>
                <el-submenu index="1">
                  <template slot="title">选择类型</template>
                  <el-menu-item :index="1 + '-' + child.value" v-for="child in typeOptions" :key="child.sub">{{child.label}}</el-menu-item>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">价格</template>
                  <el-slider v-model="homeSearch.homestayPrice" range :min="100" :step="100" :max="5000" @change="priceChange"></el-slider>
                </el-submenu>
              </el-menu>
            </el-row>

            <el-row style="font-size:14px;color:#333;padding: 10px 10px 0">
              <span style="margin-right:20px;">地区：{{homeSearch.scenicSpotName}}</span>
              <span style="margin-right:20px;">类型：{{homeSearch.wholeHouseName}}</span>
              <span>价格：{{homeSearch.homestayPrice[0]}}--{{homeSearch.homestayPrice[1]}}</span>
            </el-row>

            <!-- <el-popover placement="bottom" trigger="click" popper-class="chooseBox">
                <el-date-picker focus v-model="homeSearch.time" type="daterange" style="width:100%"
                    range-separator="-" 
                    start-placeholder="开始日期" 
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    @change="timeChange">
                </el-date-picker>
                <el-button slot="reference">选择日期</el-button>
              </el-popover> -->
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

                <div v-for="item in homestays.body" :key="item.index">
                    <el-row  style="margin:10px 0;border-style: solid;border-width:1px;border-radius:10px;border-color: #E4E7ED">

                    <el-col :span=10>
                      <router-link :to="{path:'/index/homestay/detail',query:{id:item.id}}">
                        <img :src="item.picture" style="width:100%;height:100%"/>
                      </router-link>
                    </el-col>

                    <el-col style="padding:0 0 0 4%" :span=8>
                        <!-- <p style="color:#606266">
                            独立房间.1室1卫1床
                        </p> -->
                        <h2 style="color:#303133">
                            {{item.name}}
                        </h2>

                        <p style="color:#606266" :title="item.description">
                            {{item.description | textShow}}
                        </p>

                    </el-col>

                    <el-col style="padding:20px 0 0 4%;text-align:left" :span=6>
                        <p style="color:#909399">  <span style="font-size:16px;color:#F56C6C">{{item.price}}</span>／每晚</p>
                        <el-rate style="float:left" v-model="item.score" disabled show-score text-color="#ff9900" score-template="{value}">
                        </el-rate>
                    </el-col>

                </el-row>

               
                </div>
              <el-pagination
                background
                layout="prev, pager, next"
                :page-size="homestays.pageSize"
                @current-change="pageChange"
                :total="homestays.paginationTotal">
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
             <div v-for="item in recommend" :key="item.index">
                <router-link :to="{path:'/index/homestay/detail',query:{id:item.id}}">
                  <img  style="width:100%"  :src="item.picture"/>
                </router-link>
                <h3 style="color:#303133">
                            {{item.name}}
                        </h3>
                  <div > 
                      <span style="color:#909399">
                       <span style="color:#F56C6C">{{item.price}}
                      </span>／每晚
                      </span>

                      <!-- <span style="float:right;color:#606266">
                            独立房间.1室1卫1床
                        </span> -->
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

<script>
import { homestaySearch, getScenicSpotList, homestayList } from '@/api/platform/homestay.js'
export default {
  data() {
    return {
      homeSearch: {
        searchWord: '',
        homestayPrice: [100, 5000], // 价格范围
        time: [], // 时间范围
        scenicSpotId: 0, // 地区id
        scenicSpotName: '全部',
        wholeHouse: 0, // 类型
        wholeHouseName: '整个房源'
      },
      typeOptions: [ // 类型数组
        {
          'value': 0,
          'label': '所有类型'
        }, {
          'value': 1,
          'label': '整个房源'
        }, {
          'value': 2,
          'label': '独立房间'
        }
      ],
      placeOptions: [], // 地区数组
      homestays: {
        pageSize: 5,
        pageNo: 1,
        paginationTotal: 0,
        body: []
      },
      activeIndex: '',
      recommend: [] // 推荐

    }
  },
  filters: {
    textShow(value) {
      const text = value.slice(0, 60)
      return text + '...'
    }
  },
  methods: {
    init() {
      this.getScenicSpotList()
      this.homestaySearch()
      this.homestayList()
    },
    handleSelect(key, keyPath) {
      const arr = key.split('-')
      const index = Number(arr[0])
      const sub = Number(arr[1])
      const area = this.placeOptions
      const type = this.typeOptions
      if (index === 0) {
        for (let i = 0; i < area.length; i++) {
          if (area[i].id === sub) {
            this.homeSearch.scenicSpotId = area[i].id
            this.homeSearch.scenicSpotName = area[i].areaName
            return
          }
        }
      } else if (index === 1) {
        for (let i = 0; i < type.length; i++) {
          if (type[i].value === sub) {
            this.homeSearch.wholeHouse = type[i].value
            this.homeSearch.wholeHouseName = type[i].label
            return
          }
        }
      }
    },
    // 推荐
    homestayList() {
      const this_ = this
      homestayList().then(function(data) {
        if (data.data.code === 200) {
          this_.recommend = data.data.data.results
        }
      })
    },
    // 分页查询
    homestaySearch() {
      const this_ = this
      this.searchLoading = true
      const params = {
        pageNo: this.homestays.pageNo,
        pageSize: this.homestays.pageSize,
        searchWord: this.homeSearch.searchWord,
        scenicSpotId: this.homeSearch.scenicSpotId,
        wholeHouse: this.homeSearch.wholeHouse,
        minPrice: this.homeSearch.homestayPrice[0],
        maxPrice: this.homeSearch.homestayPrice[1]
      }
      homestaySearch(params).then(function(data) {
        if (data.data.code === 200) {
          this_.searchLoading = false
          this_.homestays.paginationTotal = data.data.data.total
          this_.homestays.body = data.data.data.results
        }
      })
      setTimeout(() => {
        this.searchLoading = false
      }, 5000)
    },
    // 获取景区列表
    getScenicSpotList() {
      const this_ = this
      getScenicSpotList().then(function(data) {
        if (data.data.code === 200) {
          const arr = data.data.data
          this_.placeOptions = [
            {
              id: 0,
              areaName: '全部'
            }
          ]
          arr.forEach(function(e) {
            const param = {
              id: e.id,
              areaName: e.areaName
            }
            this_.placeOptions.push(param)
          })
        }
      })
    },
    // 类型选中
    typeSelect(item) {
      console.log(item)
      this.homeSearch.wholeHouse = item.value
      this.homeSearch.wholeHouseName = item.label
    },
    // 地区选中
    areaSelect(item) {
      console.log(item)
      this.homeSearch.scenicSpotId = item.id
      this.homeSearch.scenicSpotName = item.areaName
    },
    // 价格切换
    priceChange(val) {
      // console.log(val)
    },
    // 翻页
    pageChange(val) {
      this.homestays.pageNo = val
      this.homestaySearch()
    }

  },

  mounted() {
    if (this.$route.query.keyword !== undefined) {
      this.homeSearch.searchWord = this.$route.query.keyword
    }
    if (this.$route.query.id !== undefined) {
      this.homeSearch.scenicSpotId = this.$route.query.id
    }
    if (this.$route.query.areaName !== undefined) {
      this.homeSearch.scenicSpotName = this.$route.query.areaName
    }
    this.init()
  }
}
</script>

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
.chooseBox {
  padding: 0;
}
.priceBox {
  width: 300px;
}
.popover-item {
  padding: 10px;
  cursor: pointer;
}
.popover-item:hover{
  background: #eee;
}
.chooseMenu .el-menu--horizontal>.el-submenu.is-active .el-submenu__title {
  border-bottom-color: transparent;
}
</style>
