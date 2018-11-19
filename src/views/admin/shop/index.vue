<template>
<div class="app-container">
    <div>
        <el-container>
            <div class="formSearch">
                <el-form :inline="true">
                    <el-form-item style="padding-left:3%" label="店铺类型" class="seat">
                        <el-select v-model="search.type" placeholder="请选择店铺类型">
                            <el-option v-for="item in types" :key="item.value" :label="item.lable" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>

                    <el-form-item style="padding-left:3%" label="店铺名称">
                        <el-input style="width:200px" v-model="search.shopName" placeholder="请输入店铺名称" clearable></el-input>
                    </el-form-item>

                    <el-form-item style="padding-left:3%" label="注册日期" class="seat">
                        <div class="block">
                            <el-date-picker style="width:200px" v-model="dateRange" type="daterange" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable @change="searchUser()">
                            </el-date-picker>
                        </div>
                    </el-form-item>

                    <el-form-item style="padding-left:3%">
                        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getShopList()">搜索</el-button>
                    </el-form-item>
                </el-form>

            </div>

        </el-container>

        <el-main>

            <el-button style="margin: 5px 50px;" size="small" @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
            <el-table :ey='tableKey' :data="shopList" border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="5">
                    <template slot-scope="scope">

                        <span>{{scope.$index+1+(page.pageNo - 1)*page.pageSize  }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="店铺名称" min-width="20">
                    <template min-width="50" slot-scope="scope">
                        <span>{{scope.row.shopName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="店铺类型" min-width="10">
                    <template min-width="50" slot-scope="scope">
                        <el-button v-if="scope.row.openBuy" style="margin-right:5px" size="mini" type="primary" plain>电商</el-button>
                        <el-button v-if="scope.row.openHomestay" style="margin-right:5px" size="mini" type="primary" plain>民宿</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="图标" min-width="10">
                    <template slot-scope="scope">
                        <img style="width:50px;height:50px;" v-bind:src="scope.row.headerPicture" />
                    </template>
                </el-table-column>
                <el-table-column align="center" label="店铺电话" min-width="20">
                    <template min-width="50" slot-scope="scope">
                        <span>{{scope.row.serviceTel}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="创建日期" min-width="20">
                    <template slot-scope="scope">
                        <span>{{getDate(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>




                <el-table-column min-width="20" align="center" label="操作" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button v-if="scope.row.status==1" title="查看详情" type="primary" size="mini" icon="el-icon-search" @click="handleDetail(scope.row)"></el-button>
                        <el-button v-if="scope.row.status==1" title="编辑" type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
                        <el-button v-if="scope.row.status==1" title="删除" type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)"></el-button>
                        <el-button v-if="scope.row.status!=1" title="已删除" type="danger"  size="mini" >已删除</el-button>
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

        <!--新增編輯彈出框-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
            <el-form :rules="rules" ref="dataForm" :model="shop" label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="店铺名称" prop="shopName">
                            <el-input v-model="shop.shopName" placeholder="请输入店铺名称" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                        <el-form-item label="店铺描述" prop="description">
                            <el-input type="textarea" :rows="6" :onfocus="editable?'':'this.blur();'" v-model="shop.description" placeholder="请输入店铺描述"></el-input>
                        </el-form-item>

                        <el-form-item label="店铺头像" prop="headerPicture">
                            <img v-if="shop.headerPicture!=''" style="width:150px;height:100px;" v-bind:src="shop.headerPicture" />
                            <input  :onfocus="editable?'':'this.blur();'" class="uploadInput"  id="uploadImg" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input :onfocus="editable?'':'this.blur();'" v-model="shop.headerPicture" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>

                        <el-form-item label="店铺地址" prop="address">
                            <el-input v-model="shop.address" placeholder="请输入店铺地址" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="地址纬度" prop="addressX">
                            <el-input v-model="shop.addressX" placeholder="请输入店铺地址" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="地址经度" prop="addressY">
                            <el-input v-model="shop.addressY" placeholder="请输入店铺地址" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                        <el-form-item label="省市区：">
                            <el-row>
                                <el-col :span="7" style="margin-right:20px">
                                    <el-form-item label="" prop="province">
                                        <el-select v-model="shop.province" placeholder="省份" @change="provinceChange">
                                            <el-option v-for="item in provinceOptions" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" style="margin-right:20px">
                                    <el-form-item label="" prop="city">
                                        <el-select v-model="shop.city" placeholder="城市" @change="cityChange">
                                            <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <el-form-item label="" prop="county">
                                        <el-select v-model="shop.county" placeholder="区县">
                                            <el-option v-for="item in countyOptions" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item>

                        <el-form-item label="店铺开通" prop="openBuy">
                            <el-checkbox v-model="shop.openBuy" :onfocus="editable?'':'this.blur();'">电商</el-checkbox>
                            <el-checkbox v-model="shop.openHomestay" :onfocus="editable?'':'this.blur();'">民宿</el-checkbox>
                        </el-form-item>
                        <el-form-item label="服务时间" prop="serviceTime">
                            <el-input v-model="shop.serviceTime" placeholder="请输入店铺服务时间" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="服务电话" prop="serviceTel">
                            <el-input v-model="shop.serviceTel" placeholder="请输入店铺客服电话" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                        <el-form-item v-if="dialogStatus=='detail'" label="创建时间" prop="创建时间">
                            {{getDate(shop.createTime)}}
                        </el-form-item>
                        <el-form-item label="店主" prop="shopKeeper">
                            <el-select
    v-model="shop.shopKeeper"
 clearable 
    filterable
    remote
    reserve-keyword
    placeholder="请输入电话号码"
    :remote-method="getUserByPhone"
    :loading="loading">
    <el-option
      v-for="item in userList"
      :key="item.userId"
      :label="item.nick"
      :value="item.userId">
    </el-option>
  </el-select>

                        </el-form-item>

                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">提交</el-button>
                <el-button v-if="dialogStatus=='update'" type="primary" @click="updateData">提交</el-button>
                <el-button v-if="dialogStatus=='delete'" type="danger" @click="deleteData">删除</el-button>
            </div>
        </el-dialog>

    </div>
</div>
</template>

<script>
import util from '@/utils/util'
import axios from 'axios'
import {
    getShopList,
    addShop,
    updateShop,
    deleteShop,
    getShopDetail
} from '@/api/admin/shop'
import {
  getUserList,
} from '@/api/admin/user'
import {
    uploadFile
} from '@/api/common/common'
export default {
    name: 'shop',
    data() {
        return {
            provinceOptions: [], // 省份
            cityOptions: [], // 城市
            countyOptions: [], // 区县

               loading: false,
               userList:[],
                shopKeeper:[],


            dateRange: [],
            radioValue: 0,
            search: {
                type: 0,
                shopName: '',
                createTimeStart: '',
                createTimeEnd: ''
            },
            types: [{
                    lable: '所有类型',
                    value: 0
                },
                {
                    lable: '电商',
                    value: 1
                },
                {
                    lable: '民宿',
                    value: 2
                }

            ],

            shopList: [],

            tableKey: 0,

            // 弹框显示
            dialogFormVisible: false,
            innerVisible: false,
            dialogStatus: '',
            textMap: {
                update: '修改',
                create: '新增',
                detail: '详情',
                delete: '删除'
            },

            rules: {
                title: [{
                    required: true,
                    message: '标题不能为空',
                    trigger: 'change'
                }],
                headerPicture: [{
                    required: true,
                    message: '图片地址不能为空',
                    trigger: 'change'
                }],
                author: [{
                    required: true,
                    message: '作者不能为空',
                    trigger: 'change'
                }],
                content: [{
                    required: true,
                    message: '内容不能为空',
                    trigger: 'change'
                }]
            },

            shop: {},
            total: null,
            page: {
                pageNo: 1,
                pageSize: 10
            }

        }
    },
    methods: {

       getUserByPhone(query) {
        if (query !== '') {
          this.loading = true;
          

          var _this = this
      var params = {
       
        phone: query,
       
        pageNo: 1,
        pageSize: 10
      }
      getUserList(params).then(function(data) {
           _this.loading = false;
        if (data.data.code === 200) {
          _this.userList = data.data.data.results
        
        }
      })





        } else {
          this.userList = [];
        }
      },

        getShopList() {

            var _this = this
            var params = {
                type: _this.search.type,
                shopName: _this.search.shopName,
                createTimeStart: _this.search.createTimeStart,
                createTimeEnd: _this.search.createTimeEnd,
                pageNo: _this.page.pageNo,
                pageSize: _this.page.pageSize
            }
            getShopList(params).then(function (data) {
                if (data.data.code === 200) {
                    _this.shopList = data.data.data.results
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

        initData() {
            this.shop = {
                shopName: '',
                description: '',
                headerPicture: '',
                address: '',
                addressX: '',
                addressY: '',
                province: '',
                city: '',
                county: '',
                openBuy: true,
                openHomestay: false,
                serviceTel: '',
                serviceTime: '',
                shopKeeper: ''

            }
        },

        handleCreate: function () {
            this.initData()
            this.dialogStatus = 'create'
            this.dialogFormVisible = true
            var fileInput = document.getElementById('uploadImg')
            if (fileInput != null) {
                fileInput.value = ''
            }

            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },

        handleUpdate: function (row) {
            this.shop = row
            var city = row.city
            var county = row.county

            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            var fileInput = document.getElementById('uploadImg')
            if (fileInput != null) {
                fileInput.value = ''
            }

            this.provinceChange(row.province)
            
            this.shop.city= city
            this.cityChange(row.city)
            this.shop.county = county

            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },

        // 上传的按钮
        fileUpload(e) {
            // console.log(1234)
            const file = e.target.files[0]
            // console.log(file)
            var _this = this
            if (file != null) {
                const param = new FormData() // 创建form对象
                param.append('file', file, file.name) // 通过append向form对象添加数据

                //  console.log(file.name)
                uploadFile(param).then(resp => { // 调用上传接口
                    if (resp.data.code == 200) {
                        console.log(resp.data.data)
                        _this.shop.headerPicture = resp.data.data.fileUrl

                        this.$message({
                            title: '成功',
                            message: '上传成功',
                            type: 'success',
                            duration: 2000
                        })
                    } else {
                        this.$notify({
                            title: '警告',
                            message: '上传失败',
                            type: 'warning',
                            duration: 3000
                        })
                    }
                    this.fromLoading = false
                })
            }
        },

        createData: function () {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    // this.shop.shopKeeper = this.shopKeeper[0]
                    addShop(this.shop).then(response => {
                        if (response.data.code === 200) {
                            this.dialogFormVisible = false
                            this.$message({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 3000
                            })
                            this.getShopList()
                        } else {
                            this.$notify({
                                title: '警告',
                                message: response.data.data.msg,
                                type: 'warning',
                                duration: 3000
                            })
                        }
                    })
                }
            })
        },

        handleDetail(row) {
            this.shop = row

            this.dialogStatus = 'detail'
            this.dialogFormVisible = true
        },
        handleDelete: function (row) {
            this.shop = row

            this.dialogStatus = 'delete'
            this.dialogFormVisible = true
            var fileInput = document.getElementById('uploadImg')
            if (fileInput != null) {
                fileInput.value = ''
            }

            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },

        updateData: function () {
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    updateShop(this.shop).then(response => {
                        if (response.data.code === 200) {
                            this.dialogFormVisible = false
                            this.$message({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 3000
                            })
                            this.getShopList()
                        } else {
                            this.$notify({
                                title: '警告',
                                message: response.data.data.msg,
                                type: 'warning',
                                duration: 3000
                            })
                        }
                    })
                }
            })
        },

        deleteData: function () {
            deleteShop(this.shop.id).then(response => {
                if (response.data.code === 200) {
                    this.dialogFormVisible = false
                    this.$message({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 3000
                    })
                    this.getShopList()
                } else {
                    this.$notify({
                        title: '警告',
                        message: response.data.data.msg,
                        type: 'warning',
                        duration: 3000
                    })
                }
            })
        },
        handleCurrentChange(val) {
            this.page.pageNo = val
            this.getShopList()
        },

        // 省份选择
        provinceChange(val) {
            this.shop.city = ''
            this.shop.county = ''
            this.countyOptions = []
            const arr = this.provinceOptions
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === val) {
                    this.cityOptions = arr[i].childs
                    return
                }
            }
        },
        // 城市选择
        cityChange(val) {
            this.shop.county = ''
            const arr = this.cityOptions
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === val) {
                    this.countyOptions = arr[i].childs
                    return
                }
            }
        },
        // 生成省市区下拉数组
        areaOptions(item) {
            const Parr = this.provinceOptions
            for (let i = 0; i < Parr.length; i++) {
                if (Parr[i].id === item.province) {
                    this.cityOptions = Parr[i].childs
                    const Carr = this.cityOptions
                    for (let i = 0; i < Carr.length; i++) {
                        if (Carr[i].id === item.city) {
                            this.countyOptions = Carr[i].childs
                            return
                        }
                    }
                }
            }
        },

    },
    watch: {
        radioValue(newValue, oldValue) {
            this.getShopList()
            this.page.pageNo = 1
        }
    },

    mounted() {
        this.getShopList()
        const this_ = this
        // 获取省市区信息
        axios.get('/static/area/area_cn.json').then(function (data) {
            this_.provinceOptions = data.data
        })
    },
    computed: {
        // 计算属性的 getter
        editable: function () {
            // `this` 指向 vm 实例
            return !!((this.dialogStatus == 'update' || this.dialogStatus == 'create'))
        }
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
</style>
