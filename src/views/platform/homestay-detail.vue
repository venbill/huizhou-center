<template>
<div>
    <div v-for="item in homeInfo" :key="item.index">
    <!-- 顶部图片 -->
    <div>

        <el-row class="center-content">
            <el-col :span=12>
                <img  style="width:100%;height:300px;" :src="item.homestay.picture" />

               </el-col>
                <el-col style="padding:0px;margin:0px;" :span=12>
                    <el-row>
                        <el-col :span=12 style="height:150px">
                            <img  style="width:100%;height:150px;"  :src="item.homestay.picture1" />
                       </el-col>
                            <el-col :span=12 style="height:150px">
                                <img style="width:100%;height:150px;"  :src="item.homestay.picture2" />
                       </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span=12>
                            <img style="width:100%;height:150px;"  :src="item.homestay.picture3" />
                       </el-col>
                            <el-col :span=12>
                                <img style="width:100%;height:150px;"  :src="item.homestay.picture4" />
                       </el-col>

                    </el-row>

                </el-col>

        </el-row>
    </div>

    <div class="center-content" style="padding: 20px 0">
        <el-row>
            <el-col :span=18>
                <h2 style="font-size:25px;color:#474747">
                    {{item.homestay.name}}
                </h2>
                <div>
                    地址：{{item.homestay.provinceName}}{{item.homestay.cityName}}{{item.homestay.countyName}}{{item.homestay.deailAddress}}
                </div>
                <div style="line-height:20px;font-size:16px; margin-top:20px;
   ">
                    <span ><img style=" vertical-align: middle;width:20px;height:20px" src="../../assets/custom-theme/icons/room.png"/>{{item.homestay.roomNum}}间房间</span>

                    <span style="padding:0 10px;"><img style=" vertical-align: middle;width:20px;height:20px" src="../../assets/custom-theme/icons/bed.png"/>{{item.homestay.bedNum}}张床</span>

                    <span><img style=" vertical-align: middle;width:20px;height:20px" src="../../assets/custom-theme/icons/toilet.png"/>{{item.homestay.toiletNum}}个独立卫生间</span>

                    <span style="padding:0 10px;"><img style=" vertical-align: middle;width:20px;height:20px" src="../../assets/custom-theme/icons/person.png"/>最多{{item.homestay.maxPersonNum}}人入住</span>

                </div>


                <!-- 详细信息 -->

                <div>
                    <div style="margin:20px 0;border-style: solid;border-width:1px;border-radius:10px;border-color: #E4E7ED">

                    </div>

                    <el-row>
                        <el-col style="text-align:center" :span=4>

                            <img style="margin-top:10px;width:50px;height:50px;border:2px solid;
border-radius:25px;" :src="item.houseKeeper.picture" />

                        </el-col>

                        <el-col style="text-align:left;font-size:14px;" :span=6 >
                                <div style="float:right">

                                    <p>房东：{{item.houseKeeper.username}} <span style="color:#F5695F ;padding:0 20px;"> <img style="vertical-align:middle;width:20px;height:20px" src="../../assets/custom-theme/icons/tel.png" />{{item.houseKeeper.phone}}</span></p>
                                    <p> 共成交{{item.homestay.saleNum}}个订单. 已实名验证</p>
                                </div>
                        </el-col>

                    </el-row>

                    <div style="font-size:16px;letter-spacing:1px; backgroundColor:#F7F8F8;padding:20px 20px;">
                        {{item.homestay.description}}
                    </div>

                </div>



                <div v-if="item.homestay.wholeHouse" >
                    <div class="grey-line">
                    </div>
                   <span style="line-height:20px;font-size:18px; margin-top:20px;"> 独立房间</span>
                       <span style="font-size:15px;padding-left:20px">

有独立房间，与房东或房客分享合用空间
                       </span>

                    




                </div>




<div v-if="item.configration.length > 0">
    <div class="grey-line"></div>
<div class="title">
                附加配置
            </div>
        <el-row style="padding-top:20px;text-align:center">
            
            <el-col :span=3 v-for="child in item.configration" :key="child.index">
                <img style="width:60px;height:60px" :src="child.picture"/>
                            <div >
                                {{child.name}}
                            </div>
            </el-col>
        </el-row>



</div>

<div class="grey-line"></div>


<div>
    <div class="title">
        评分
              
    </div>
    <div style="padding-top:20px">

         <el-row style="font-size:17px">
             

             <el-col :span=4>
                 <el-rate style="float:left" v-model="item.homestay.score" disabled show-score text-color="#ff9900" score-template="{value}">
                                        </el-rate>  
             </el-col>
             <el-col :span=6>
                 {{item.homestay.commentNo}}条评价
             </el-col>


             
         </el-row>



         <!-- <el-row style="padding-top:20px;font-size:14px">
             <el-col :span=4>
                 如实描述
             </el-col>

             <el-col :span=8>
                 <el-rate style="float:left" v-model=value disabled show-score text-color="#ff9900" score-template="{value}">
                                        </el-rate>  
             </el-col>
             <el-col :span=4>
                 干净卫生
             </el-col>

             <el-col :span=8>
                 <el-rate style="float:left" v-model=value disabled show-score text-color="#ff9900" score-template="{value}">
                                        </el-rate>  
             </el-col>
             <el-col :span=4>
                 位置便利
             </el-col>

             <el-col :span=8>
                 <el-rate style="float:left" v-model=value disabled show-score text-color="#ff9900" score-template="{value}">
                                        </el-rate>  
             </el-col>
             <el-col :span=4>
                 沟通交流
             </el-col>

             <el-col :span=8>
                 <el-rate style="float:left" v-model=value disabled show-score text-color="#ff9900" score-template="{value}">
                                        </el-rate>  
             </el-col>
            

             
         </el-row> -->




    </div>


<div class="grey-line"></div>
    










</div>







            </el-col>
           

        </el-row>

    </div>
    </div>
    <!--评价-->
    <div class="center-content bg-white">
        <v-pageTable pagination :pageChange="pageChange" :page-size="comments.pageSize" :paginationTotal="comments.paginationTotal">
            <el-table :data="comments.body" style="width: 100%" v-loading="loading" :header-cell-style="headerBg">
            <el-table-column prop="cusPicture" label="顾客信息" width="300px">
                <template slot-scope="scope">
                    <div style="width:50px;height:50px;border:1px solid #ddd;border-radius:25px;float:left;margin-right:20px">
                    <img :src="scope.row.cusPicture" style="width:100%;height:100%"/>
                    </div>
                    <p style="width:80%">{{scope.row.nick}}</p>
                    <p style="width:80%">{{getName_date(scope.row.createTime)}}</p>
                </template>
            </el-table-column>
            <el-table-column prop="score" label="顾客满意度" width="300px">
                <template slot-scope="scope">
                <el-rate v-model="scope.row.score" text-color="#ff9900" show-text disabled score-template="{value}">
                </el-rate>
                </template>
            </el-table-column>
            <el-table-column prop="comment" label="评价信息">
            </el-table-column>
            </el-table>
        </v-pageTable>
    </div>
    <!--预定信息-->
    <div class="book-box">
        <p class="book-title">预定</p>
        <el-form class="book-form" :model="bookForm" :rules="bookRules" ref="bookForm" label-position="top">
            <el-form-item prop="time" label="入住日期">
                <el-date-picker focus v-model="bookForm.time" type="daterange" style="width:100%"
                    range-separator="-" 
                    start-placeholder="开始日期" 
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                    :default-time="['12:00:00', '12:59:59']"
                    @change="timeChange">
                </el-date-picker>
            </el-form-item>
            <el-form-item prop="personNum" label="入住人数">
                <el-input-number v-model="bookForm.personNum" :min="1" :max="maxPersonNum" @change="handleChange"></el-input-number>
            </el-form-item>
            <p style="margin-bottom:20px">
                <span style="font-size:15px;color:#909399;margin-right:20px"> ¥{{price}} x {{dayNumber}}晚</span>
                <span style="font-size:16px; color:#606266">总价 ¥{{totalPrice()}}</span>
            </p>
            <el-form-item label="" style="text-align:center">
                <el-button size="max" class="btn-red" @click="Book">预定房间</el-button>
            </el-form-item>
        </el-form>
    </div>
</div>
</template>

<script>
import util from '@/utils/util'
import { mapGetters } from 'vuex'
import { homestayDetai, homestayComments, createOrder } from '@/api/platform/homestay'
export default {
  data() {
    var timeCheck = (rule, value, callback) => {
      if (value === '' || value === null) {
        callback(new Error('请输入入住日期'))
      } else {
        callback()
        // if (this.order.appointDate !== '' && this.order.appointSendTime !== null) {
        //   const appointDate = (new Date(this.order.appointDate)).getTime() // 棰勭害鏃ユ湡
        //   const appointSendTime = (new Date(this.order.appointSendTime)).getTime() // 棰勭害鍙戣揣鏃ユ湡
        //   if (appointSendTime > appointDate) {
        //     callback()
        //   } else {
        //     callback(new Error(this.$t('i18nView_businessWork.reservationDeliveryTimeError')))
        //   }
        // } else {
        //   callback()
        // }
      }
    }
    return {
      pickerOptions: { // 日期为当前时间前一天
        disabledDate(time) {
          return time.getTime() < Date.now() - 1000 * 60 * 60 * 24
        }
      },
      bookRules: {
        time: [
          { type: 'date', required: true, validator: timeCheck, trigger: 'change' }
        ],
        personNum: [
          { required: true, message: '请选择入住人数', trigger: 'change' }
        ]
      },
      bookForm: {
        time: [new Date(), new Date().setDate(new Date().getDate() + 1)],
        personNum: 1
      },
      num: 1,
      value: 1,
      daterange: '',
      num1: '',
      homeId: 0, // 民宿Id
      price: 0, // 民宿价格
      dayNumber: 1, // 预定天数
      maxPersonNum: 1, // 最大人数
      homeInfo: [], // 民宿详情
      comments: {
        pageNo: 1,
        pageSize: 50,
        paginationTotal: 0,
        body: []
      }, // 评价
      loading: false,
      loginStatus: false // 登录状态
    }
  },
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    // 表头回调函数
    headerBg: function(row) {
      return { 'background': '#f5f7fa', 'color': '#1F2D3D' }
    },
    init() {
      const this_ = this
      this.homeId = this.$route.query.id
      homestayDetai(this.homeId).then(function(data) {
        if (data.data.code === 200) {
          this_.$nextTick(function() {
            this_.homeInfo = [data.data.data]
            this_.price = data.data.data.homestay.price
            this_.maxPersonNum = data.data.data.homestay.maxPersonNum
          })
        }
      })
      this.getComments()
      // 没有登录信息，终止函数
      if (this.token === undefined) {
        this.loginStatus = false
      } else {
        this.loginStatus = true
      }
    },
    // 分页查询评论
    getComments() {
      this.loading = true
      const this_ = this
      const params = {
        pageNo: this.comments.pageNo,
        pageSize: this.comments.pageSize,
        hoemstayId: this.homeId
      }
      homestayComments(params).then(function(data) {
        if (data.data.code === 200) {
          this_.loading = false
          this_.comments.body = data.data.data.data.results
          this_.comments.paginationTotal = data.data.data.data.total
        }
      })
      setTimeout(() => {
        this.loading = false
      }, 5000)
    },
    // 翻页
    pageChange(val) {
      this.comments.pageNo = val
      this.getComments()
    },
    // 日期时间处理
    getName_date(date) {
      if (date) {
        return util.formatDate.format(new Date(date), 'yyyy.MM.dd hh:mm:ss')
      }
    },
    // 时间日期变化
    timeChange(val) {
      this.dayNum(this.bookForm.time)
    },
    // 预定
    Book() {
      if (!this.loginStatus) {
        this.$confirm('您还没有登录，请先登录', '提示', {
          confirmButtonText: '登录',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$router.push('/login')
        }).catch(() => {
        })
        return
      }
      const this_ = this
      const params = {
        homestayId: this.homeId,
        inTime: this.bookForm.time[0],
        outTime: this.bookForm.time[1],
        personNum: this.bookForm.personNum
      }
      createOrder(params).then(function(data) {
        if (data.data.code === 200) {
          this_.$router.push(
            {
              path: '/index/homestay/payment',
              query: {
                id: data.data.data.orderId
              }
            }
          )
        }
      })
    },
    // 计算日期相差天数
    dayNum(time) {
      if (time === null) {
        this.dayNumber = 0
        return
      }
      let start = time[0]
      let end = time[1]
      if (typeof (start) === 'object') {
        start = start.getTime()
      }
      if (typeof (end) === 'object') {
        end = end.getTime()
      }
      const seconds = end - start
      let days = parseInt(seconds / (1000 * 60 * 60 * 24))
      if (days < 1) {
        days = 1
      }
      this.dayNumber = days
      this.totalPrice()
    },
    // 计算总价
    totalPrice() {
      const price = this.price * 100
      const num = this.dayNumber
      return (price * num) / 100
    },
    handleChange(value) {
      this.$nextTick(function() {

      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style>
    .grey-line{
    margin:20px 0;border-style: solid;border-width:0.5px;border-radius:10px;
    border-color: #EAEBEA;
    }

    .small-line{
    margin:20px 0;border-style: solid;border-width:0.5px;border-radius:10px;
    border-color: #EAEBEA;
    }
    .title{
    line-height:20px;font-size:18px; margin-top:20px;
    }
    .book-box {
        background: #fff;
        border: 2px solid #ee4644;
        border-radius: 10px;
        position: fixed;
        bottom: 20%;
        right: 0;
        padding: 10px 20px;
        width: 260px;
    }
    .book-title {
        font-size: 20px;
        margin-bottom: 10px;
    }
</style>
