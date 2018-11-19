<template>
<div class="app-container">
    <div>
        <el-container>
            <div class="formSearch">
                <el-form :inline="true">
                    <el-form-item style="padding-left:3%" label="店铺" prop="shopId">
                        <el-select v-model="search.shopId" clearable filterable remote reserve-keyword placeholder="请输入店铺名称" :remote-method="getShopListByName" :loading="loading">
                            <el-option v-for="item in shopList" :key="item.id" :label="item.shopName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item style="padding-left:3%" label="商品" prop="goodsId">
                        <el-select v-model="search.goodsId" clearable filterable remote reserve-keyword placeholder="请输入商品名称" :remote-method="getGoodsListByName" :loading="loading">
                            <el-option v-for="item in goodsList" :key="item.id" :label="item.goodsName" :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item style="padding-left:3%" label="订单类型" class="type">
                        <el-select v-model="search.type" placeholder="请选择">
                            <el-option v-for="item in types" :key="item.value" :label="item.lable" :value="item.value">
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
                        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getOrderList()">搜索</el-button>
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

                        <span>{{getOrderStatus(scope.row.orderStatus,scope.row.type)}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="类型" min-width="10">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.type==1?'民宿':'电商'}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="商品／民宿名称" min-width="30">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.goodsName}}</span>
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

            </el-table>
        </el-main>

        <el-footer>
            <!-- 分页 -->
            <div class="pagination-container">
                <el-pagination background @current-change="handleCurrentChange" :current-page="page.pageNo" :page-sizes="[10]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
                </el-pagination>
            </div>
        </el-footer>

    </div>
</div>
</template>

<script>
import util from '@/utils/util'
import {
    getOrderList,
    getOrderDetail,
    getShopListByName,
    getGoodsListByName
} from '@/api/admin/order'

export default {
    name: 'order',
    data() {
        return {
            totalMoney:0,
            orderNo:0,
            loading: false,
            dateRange: [],
            search: {
                shopId: '',
                goodsId: '',
                type: 0,
                orderStatus: 0,
                orderId: '',
                createTimeStart: '',
                createTimeEnd: ''
            },
            types: [{
                    lable: '所有类型',
                    value: 0
                },
                {
                    lable: '民宿订单',
                    value: 1
                },
                {
                    lable: '电商订单',
                    value: 2
                }
            ],
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
                    lable: '待发货／待入住',
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

            shopList: [],
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

        getShopListByName(query) {
            if (query !== '') {
                this.loading = true;

                var _this = this

                getShopListByName(query).then(function (data) {
                    _this.loading = false;
                    if (data.data.code === 200) {
                        _this.shopList = data.data.data.results
                    }
                })

            } else {
                this.shopList = [];
            }
        },
        getGoodsListByName(query) {
            if (query !== '') {
                this.loading = true;

                var _this = this
                getGoodsListByName(query).then(function (data) {
                    _this.loading = false;
                    if (data.data.code === 200) {
                        _this.goodsList = data.data.data.results
                    }
                })
            } else {
                this.goodsList = [];
            }
        },

        getOrderList() {
            var _this = this
            var params = {
                shopId: _this.search.shopId == '' ? 0 : _this.search.shopId,
                goodsId: _this.search.goodsId == '' ? 0 : _this.search.goodsId,
                type: _this.search.type,
                orderId: _this.search.orderId == '' ? 0 : _this.search.orderId,
                orderStatus: _this.search.orderStatus,
                createTimeStart: _this.search.createTimeStart,
                createTimeEnd: _this.search.createTimeEnd,
                pageNo: _this.page.pageNo,
                pageSize: _this.page.pageSize
            }
            getOrderList(params).then(function (data){ 
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
            this.getOrderList()
        },
        getOrderStatus(status, type) {
            if (type == 1) {
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
            }else{
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
                        return "退货"
                        break;
                    
                } 
            }
        }

    },
    watch: {

    },

    mounted() {
        this.getOrderList()
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
