<template>
<div class="app-container">
    <div>
        <el-container>
            <div class="formSearch">
                <el-form :inline="true">
                   
                    <el-form-item style="padding-left:3%" label="商品" prop="goodsId">
                        <el-select v-model="search.goodsId" clearable placeholder="请选择商品" >
                            <el-option v-for="item in goodsList" :key="item.id" :label="item.goodsName" :value="item.id">
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

                        <span>{{scope.row.orderId}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="状态" min-width="10">
                    <template min-width="50" slot-scope="scope">

                        <span>{{getOrderStatus(scope.row.status)}}</span>
                    </template>
                </el-table-column>
                

                <el-table-column align="center" label="商品名称" min-width="20">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.goodsName}}</span>
                    </template>
                </el-table-column>

                
                <el-table-column align="center" label="订购数量" min-width="10">
                    <template min-width="10" slot-scope="scope">

                        <span>{{scope.row.buyNo}}</span>
                    </template>
                </el-table-column>

               


                <el-table-column align="center" label="订单金额" min-width="10">
                    <template min-width="50" slot-scope="scope">
                        <span>{{scope.row.totalMoney}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="创建日期" min-width="12">
                    <template slot-scope="scope">
                        <span>{{getDate(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>
                
                <el-table-column min-width="20" align="center" label="操作" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status>2" title="收件信息" type="primary" size="mini" @click="openAcceptInfo(scope.row.id)">收货信息</el-button>
                        <el-button v-if="scope.row.status==3" title="发货" type="primary" size="mini"  @click="openSendExpress(scope.row.id)">发货</el-button>
                        <el-button v-if="scope.row.status>3" title="物流信息" type="primary" size="mini"  @click="openExpressInfo(scope.row.expressNo)">物流信息</el-button>

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

           <el-dialog title="收货信息" :visible.sync="acceptDialog" width="50%">
            <el-form  ref="dataForm"  label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="收件人" prop="goodsName">
                            <span>{{addressInfo.acceptName}}</span>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="goodsName">
                            <span>{{addressInfo.acceptPhone}}</span>
                        </el-form-item>
                        <el-form-item label="地址" prop="goodsName">
                            <span>{{addressInfo.provinceName+' '+addressInfo.cityName+' '+addressInfo.countyName}}</span>
                        </el-form-item>
                        <el-form-item label="详细地址" prop="goodsName">
                            <span>{{addressInfo.detailAddress}}</span>
                        </el-form-item>

                       
                    </el-col>
                </el-row>
            </el-form>
           </el-dialog>


           
           <el-dialog title="快递信息" :visible.sync="expressDialog" width="50%">
            <el-form  ref="dataForm"  label-position="left" label-width="150px">
                <el-row :gutter="20">
                    <el-col :span="20" v-for="(item,index) in expressInfo" :key="index">

                        <el-form-item :label="item.time" prop="goodsName">
                            {{item.status}}
                        </el-form-item>
                        

                       
                    </el-col>
                </el-row>
            </el-form>
           </el-dialog>



           <el-dialog title="收货信息" :visible.sync="sendDialog" width="50%">
            <el-form  ref="dataForm"  label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="快递单号" prop="expressNo">
                              <el-input v-model="sendExpressParam.expressNo" placeholder="请输入快递单号" ></el-input>
                        </el-form-item>

                       
                    </el-col>
                </el-row>
            </el-form>
             <div slot="footer" class="dialog-footer">
                <el-button @click="sendDialog = false">取消</el-button>
                <el-button  type="primary" @click="sendExpress">确认发货</el-button>
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
    getShopGoodsList,
    sendExpress,
    getExpressInfo
} from '@/api/shopkeeper/buyOrder'

export default {
    name: "buyOrder",
    data() {
        return {

            acceptDialog:false,
            addressInfo:{},

            expressDialog:false,
            expressInfo:[],

            sendDialog:false,
            sendExpressParam:{
                detailId:0,
                expressNo:''
            },


            totalMoney:0,
            orderNo:0,
            loading: false,
            dateRange: [],
            search: {
             
                goodsId: '',
                type: 0,
                orderStatus: 0,
                orderId: '',
                createTimeStart: '',
                createTimeEnd: ''
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
                    lable: '待发货',
                    value: 3
                },
                {
                    lable: '待收货',
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
                    lable: '退货',
                    value: 7
                }

            ],

            orderList: [],


            goodsList: [],

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

        openAcceptInfo(detailId){
            var _this = this
            getShopOrderDetail(detailId).then(resp=>{
                if(resp.data.code==200){
                    _this.acceptDialog =true
                    _this.addressInfo = resp.data.data.address
                }
            })

        },
        openExpressInfo(expressNo){
            var _this = this
            getExpressInfo(expressNo).then(resp=>{
                if(resp.data.code==200){
                    _this.expressDialog =true
                    console.log(resp.data.data.messageList)
                    _this.expressInfo = JSON.parse(resp.data.data.messageList)
                }
            })

        },

        openSendExpress(detailId){
            this.sendDialog=true
            this.sendExpressParam={
                detailId:detailId,
                expressNo:''
            }

           
        },
        sendExpress(){
            
            sendExpress(this.sendExpressParam.detailId,this.sendExpressParam.expressNo).then(resp=>{
                 if (resp.data.code === 200) {
                            this.sendDialog = false
                            this.$message({
                                title: '成功',
                                message: '发货成功',
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

        getShopGoodsList() {
                var _this=this
                getShopGoodsList().then(function (resp) {

                    if (resp.data.code === 200) {
                        _this.goodsList = resp.data.data
                    }
                })
            } ,
     

        getShopOrderList() {
            var _this = this
            var params = {
                goodsId: _this.search.goodsId == '' ? 0 : _this.search.goodsId,
                orderId: _this.search.orderId == '' ? 0 : _this.search.orderId,
                orderStatus: _this.search.orderStatus,
                createTimeStart: _this.search.createTimeStart,
                createTimeEnd: _this.search.createTimeEnd,
                pageNo: _this.page.pageNo,
                pageSize: _this.page.pageSize
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
                        return "待发货"
                        break;
                    case 4:
                        return "待收货"
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
        this.getShopGoodsList()
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
