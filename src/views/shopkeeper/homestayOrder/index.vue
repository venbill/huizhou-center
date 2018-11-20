<template>
<div class="app-container">
    <div>
        <el-container>
            <div class="formSearch">
                <el-form :inline="true">
                   
                    <el-form-item style="padding-left:3%" label="民宿" prop="goodsId">
                        <el-select v-model="search.homestayId" clearable placeholder="请选择民宿" >
                            <el-option v-for="item in homestayList" :key="item.id" :label="item.name" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                 

                    <el-form-item style="padding-left:3%" label="订单状态" class="seat">
                        <el-select v-model="search.orderStatus" placeholder="请选择">
                            <el-option v-for="item in statusOptions" :key="item.value" :label="item.lable" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item style="padding-left:3%" label="订单号">
                        <el-input style="width:200px" v-model="search.orderId" placeholder="请输入订单号" clearable></el-input>
                    </el-form-item>

                    <el-form-item style="padding-left:3%" label="创建日期" class="seat">
                        <div class="block">
                            <el-date-picker style="width:200px" v-model="dateRange" type="daterange" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable @change="setDate()">
                            </el-date-picker>
                        </div>
                    </el-form-item>

                    <el-form-item style="padding-left:3%" label="入住日期" class="seat">
                        <div class="block">
                            <el-date-picker style="width:200px" v-model="dateRange2" type="daterange" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable @change="setDate2()">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                    

                    <el-form-item style="padding-left:3%">
                        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getShopOrderList()">搜索</el-button>
                    </el-form-item>
                </el-form>

            </div>

        </el-container>
<el-row >
  <el-col :span="12" style="text-align:center;"><div style="height:50px;padding-top:20px;font-size:23px" class="grid-content bg-purple"> 订单总数：<span style="color:#FD5E40">{{orderNo}}</span></div></el-col>
  <el-col :span="12" style="text-align:center;"><div style="height:50px;padding-top:20px;font-size:23px" class="grid-content bg-purple-light"> 订单总金额：<span style="color:#FD5E40">{{totalMoney}}</span></div></el-col>
</el-row>
        

        <el-main>
     
          
            <el-table :ey='tableKey' :data="orderList" border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="5">
                    <template slot-scope="scope">

                        <span>{{scope.$index+1+(page.pageNo - 1)*page.pageSize  }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="订单号" min-width="10">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.id}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="状态" min-width="10">
                    <template min-width="50" slot-scope="scope">

                        <span>{{getOrderStatus(scope.row.status)}}</span>
                    </template>
                </el-table-column>
                

                <el-table-column align="center" label="民宿名称" min-width="20">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.homestayName}}</span>
                    </template>
                </el-table-column>

                
                
                <el-table-column align="center" label="入住人数" min-width="10">
                    <template min-width="10" slot-scope="scope">

                        <span>{{scope.row.personNum}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="入住时间" min-width="10">
                    <template min-width="10" slot-scope="scope">

                        <span>{{getDate(scope.row.inTime)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="退房时间" min-width="10">
                    <template min-width="10" slot-scope="scope">

                        <span>{{getDate(scope.row.outTime)}}</span>
                    </template>
                </el-table-column>

               


                <el-table-column align="center" label="订单金额" min-width="10">
                    <template min-width="50" slot-scope="scope">
                        <span>{{scope.row.totalPrice}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="创建日期" min-width="12">
                    <template slot-scope="scope">
                        <span>{{getDate(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column min-width="20" align="center" label="操作" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status>2" title="入住信息" type="primary" size="mini" @click="openOrderInfo(scope.row.id)">入住信息</el-button>
                        <el-button v-if="scope.row.status==3" title="确认入住" type="primary" size="mini"  @click="openCustomerIn(scope.row.id)">确认入住</el-button>

                    </template>
                </el-table-column>

            </el-table>
        </el-main>

        <el-footer>
            <!-- 分页 -->
            <div class="pagination-container">
                <el-pagination background @current-change="handleCurrentChange" :current-page="page.pageNo" :page-sizes="[10]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-footer>

           <el-dialog title="入住信息" :visible.sync="orderDialog" width="50%">
            <el-form  ref="dataForm"  label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="客户昵称" prop="goodsName">
                            <span>{{orderInfo.nick}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="goodsName">
                            <span>{{orderInfo.phone}}</span>
                        </el-form-item>
                        <el-form-item label="入住人数" prop="goodsName">
                            <span>{{orderInfo.personNo}}</span>
                        </el-form-item>
                        <el-form-item label="民宿名称" prop="goodsName">
                            <span>{{orderInfo.homestayName}}</span>
                        </el-form-item>
                        <el-form-item label="入住时间" prop="goodsName">
                            <span>{{getDate(orderInfo.inTime)}}</span>
                        </el-form-item>
                        <el-form-item label="退房时间" prop="goodsName">
                            <span>{{getDate(orderInfo.outTime)}}</span>
                        </el-form-item>

                       
                    </el-col>
                </el-row>
            </el-form>
           </el-dialog>


           

           <el-dialog title="确认客户入住" :visible.sync="customerInDialog" width="50%">
            <el-form  ref="dataForm"  label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                       是否确认客户已入住？

                       
                    </el-col>
                </el-row>
            </el-form>
             <div slot="footer" class="dialog-footer">
                <el-button @click="customerInDialog = false">取消</el-button>
                <el-button  type="primary" @click="customerIn">确认入住</el-button>
            </div>
           </el-dialog>



    </div>
</div>
</template>

<script>
import util from '@/utils/util'
import {
    getShopOrderList,
    getShopOrderDetail,
    getShopHomestayList,
    customerIn
} from '@/api/shopkeeper/homestayOrder'

export default {
    name: "homestayOrder",
    data() {
        return {

            orderDialog:false,
            orderInfo:{},

            customerInDialog:false,
            orderId:0,


            totalMoney:0,
            orderNo:0,
            loading: false,
            dateRange: [],
            dateRange2: [],

            search: {
                hoemstayId: '',
                orderStatus: 0,
                orderId: '',
                createTimeStart: '',
                createTimeEnd: '',
                inTimeStart:'',
                inTimeEnd:''
            },
          
            statusOptions: [{
                    lable: '所有状态',
                    value: 0
                },
                {
                    lable: '取消',
                    value: 1
                },
                {
                    lable: '待支付',
                    value: 2
                },
                {
                    lable: '待入住',
                    value: 3
                },
                {
                    lable: '入住中',
                    value: 4
                },
                {
                    lable: '待评价',
                    value: 5
                },

                {
                    lable: '完成',
                    value: 6
                },
                {
                    lable: '退款',
                    value: 7
                }

            ],

            orderList: [],


            homestayList: [],

            tableKey: 0,

            // 弹框显示
            dialogFormVisible: false,
            innerVisible: false,
            dialogStatus: '',

            order: {},
            total: null,
            page: {
                pageNo: 1,
                pageSize: 10
            }

        }
    },
    methods: {

        openOrderInfo(detailId){
            var _this = this
            getShopOrderDetail(detailId).then(resp=>{
                if(resp.data.code==200){
                    _this.orderDialog =true
                    _this.orderInfo = resp.data.data
                }
            })

        },
       
        openCustomerIn(orderId){
            this.customerInDialog=true
            this.orderId = orderId
            

           
        },
        customerIn(){
            
            customerIn(this.orderId).then(resp=>{
                 if (resp.data.code === 200) {
                   
                            this.customerInDialog = false
                            this.$message({
                                title: '成功',
                                message: '入住成功',
                                type: 'success',
                                duration: 3000
                            })
                              this.getShopOrderList()
                        } else {
                            this.$notify({
                                title: '警告',
                                message: resp.data.data.msg,
                                type: 'warning',
                                duration: 3000
                            })
                        }
            })
        },

        getShopHomestayList() {
                var _this=this
                getShopHomestayList().then(function (resp) {

                    if (resp.data.code === 200) {
                        _this.homestayList = resp.data.data
                    }
                })
            } ,
     

        getShopOrderList() {
            var _this = this
            var params = {
                homestayId: _this.search.hoemstayId == '' ? 0 : _this.search.hoemstayId,
                orderId: _this.search.orderId == '' ? 0 : _this.search.orderId,
                orderStatus: _this.search.orderStatus,
                createTimeStart: _this.search.createTimeStart,
                createTimeEnd: _this.search.createTimeEnd,
                inTimeStart: _this.search.inTimeStart,
                inTimeEnd: _this.search.inTimeEnd,
                pageNo: _this.page.pageNo,
                pageSize: _this.page.pageSize,

            }
            getShopOrderList(params).then(function (data){ 
                if (data.data.code === 200) {
                  _this.totalMoney = data.data.data.totalMoney
                  _this.orderNo = data.data.data.orderNo
                    _this.orderList = data.data.data.results
                    _this.total = data.data.data.total
                }
            })
        },
        // 日期时间处理
        getDate(date) {
            if (date) {
                return util.formatDate.format(new Date(date), 'yyyy-MM-dd hh:mm')
            }
        },
        setDate() {
            if (this.dateRange.length == 2) {
                this.search.createTimeStart = this.dateRange[0]
                this.search.createTimeEnd = this.dateRange[1]
            }
        },
    
        setDate2() {
            if (this.dateRange2.length == 2) {
                this.search.inTimeStart = this.dateRange2[0]
                this.search.inTimeEnd = this.dateRange2[1]
            }
        },



        handleCurrentChange(val) {
            this.page.pageNo = val
            this.getShopOrderList()
        },
        getOrderStatus(status) {
      
                switch (status) {
                    case 1:
                        return "取消"
                        break;
                    case 2:
                        return "待支付"
                        break;
                    case 3:
                        return "待入住"
                        break;
                    case 4:
                        return "入住中"
                        break;
                    case 5:
                        return "待评价"
                        break;
                    case 6:
                        return "完成"
                        break;

                    case 7:
                        return "退款"
                        break;
                    
                }
           
}
    },
    watch: {

    },

    mounted() {
        this.getShopOrderList()
        this.getShopHomestayList()
    }

}
</script>

<style lang="scss" scoped>
.formSearch {
    width: 100%;
    background: #fafafa;
    border: 1px solid #e9e9e9;
    border-radius: 3px;
    padding: 18px 10px 0;
    margin-bottom: 10px;
}
.bg-purple {
    background: #D9E3F3;
  }
  .bg-purple-light {
    background: #DFEAFB;
  }
</style>
