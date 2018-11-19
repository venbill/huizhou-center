<template>
<div class="app-container">
    <div>
        <el-container>
            <div class="formSearch">
                <el-form :inline="true">

                    <el-form-item style="padding-left:3%" label="商品名称">
                        <el-input style="width:200px" v-model="search.goodsName" placeholder="请输入商品名称" clearable></el-input>
                    </el-form-item>

                    <el-form-item style="padding-left:3%">
                        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getGoodsList()">搜索</el-button>
                    </el-form-item>
                </el-form>

            </div>

        </el-container>

        <el-main>

            <el-button style="margin: 5px 50px;" size="small" @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
            <el-table :ey='tableKey' :data="goodsList" border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="5">
                    <template slot-scope="scope">

                        <span>{{scope.$index+1+(page.pageNo - 1)*page.pageSize  }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="商品名称" min-width="20">
                    <template min-width="50" slot-scope="scope">
                        <span>{{scope.row.goodsName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="图标" min-width="20">
                    <template slot-scope="scope">
                        <img style="width:70px;height:70px;" v-bind:src="scope.row.picture" />
                    </template>
                </el-table-column>
                <el-table-column align="center" label="价格" min-width="10">
                    <template min-width="50" slot-scope="scope">
                        <span>{{scope.row.price}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="是否有快递" min-width="10">
                    <template min-width="50" slot-scope="scope">
                        <el-button v-if="scope.row.haveExpress" style="margin-right:5px" size="mini" type="primary" plain>有快递</el-button>
                        <el-button v-if="!scope.row.haveExpress" style="margin-right:5px" size="mini" type="primary" plain>没有快递</el-button>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="邮费" min-width="10">
                    <template min-width="50" slot-scope="scope">
                        <span v-if="scope.row.haveExpress">{{scope.row.expressMoney}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="创建日期" min-width="20">
                    <template slot-scope="scope">
                        <span>{{getDate(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>

                <el-table-column min-width="20" align="center" label="操作" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button title="查看详情" type="primary" size="mini" icon="el-icon-search" @click="handleDetail(scope.row)"></el-button>
                        <el-button title="编辑" type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
                        <el-button title="删除" type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)"></el-button>
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
            <el-form :rules="rules" ref="dataForm" :model="goods" label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="商品名称" prop="goodsName">
                            <el-input v-model="goods.goodsName" placeholder="请输入商品名称" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                        <el-form-item label="商品描述" prop="description">
                            <el-input type="textarea" :rows="6" :onfocus="editable?'':'this.blur();'" v-model="goods.description" placeholder="请输入商品描述"></el-input>
                        </el-form-item>

                        <el-form-item label="所属分类" prop="description">
                            <el-row>
                                <el-col :span="7" style="margin-right:20px">
                                    <el-form-item label="" prop="bigType">
                                        <el-select  v-model="goods.bigType" placeholder="大分类" @change="typeChange">
                                            <el-option v-for="item in typeOptions" :key="item.id" :label="item.bigTypeName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" style="margin-right:20px">
                                    <el-form-item label="" prop="smallType">
                                        <el-select  v-model="goods.smallType" placeholder="小分类">
                                            <el-option v-for="item in smallTypes" :key="item.id" :label="item.smallTypeName" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>

                        </el-form-item>

                        <el-form-item label="店铺分类" prop="description">
                            <el-row>
                                <el-form-item label="" prop="shopType">
                                    <el-select  v-model="goods.shopType" placeholder="店铺分类">
                                        <el-option v-for="item in shopTypeList" :key="item.id" :label="item.typeName" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                        </el-form-item>

                        <el-form-item label="商品大图" prop="picture">
                            <img v-if="goods.picture!=''" style="width:150px;height:100px;" v-bind:src="goods.picture" />
                            <input v-if="editable" class="uploadInput"  id="img_0" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="goods.picture" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="商品图片1" prop="picture1">
                            <img v-if="goods.picture1!=''" style="width:150px;height:100px;" v-bind:src="goods.picture1" />
                            <input  v-if="editable" class="uploadInput"  id="img_1" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="goods.picture1" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="商品图片2" prop="picture2">
                            <img v-if="goods.picture2!=''" style="width:150px;height:100px;" v-bind:src="goods.picture2" />
                            <input  v-if="editable" class="uploadInput"  id="img_2" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="goods.picture2" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="商品图片3" prop="picture3">
                            <img v-if="goods.picture3!=''" style="width:150px;height:100px;" v-bind:src="goods.picture3" />
                            <input v-if="editable" class="uploadInput"  id="img_3" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="goods.picture3" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="商品图片4" prop="picture4">
                            <img v-if="goods.picture4!=''" style="width:150px;height:100px;" v-bind:src="goods.picture4" />
                            <input  v-if="editable" class="uploadInput"  id="img_4" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="goods.picture4" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="商品详情图" prop="detailPictures">
                            <el-row class="line" style="padding-top:20px" v-for="(item,index) in detailPictureList" :key="index">
                                <el-col :span="18">
                                    <img v-if="item!=''" style="width:150px;height:100px;"  v-bind:src="item"  />
                                    <input  v-if="editable" class="uploadInput"  :id="index" ref="uploadImg" type="file" @change="fileUpload" >
                                    <el-input  v-if="editable"  :onfocus="editable?'':'this.blur();'" v-model="detailPictureList[index]" placeholder="输入图片链接地址"></el-input>
                                </el-col>
                                <el-col :span="4" :offset="2">
                                    <el-button  v-if="editable"  title="删除" type="danger" icon="el-icon-delete" size="mini" @click="deletePicture(index)"></el-button>
                                </el-col>

                            </el-row>
                            <div style="text-align:center">
                                <el-button  v-if="editable"  title="添加" type="primary" icon="el-icon-plus" size="mini" @click="addPicture()"></el-button>
                            </div>

                        </el-form-item>

                        <el-form-item label="商品价格" prop="address">
                            <el-input v-model="goods.price" placeholder="请输入店商品价格" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                        <el-form-item label="是否有快递" prop="haveExpress">
                            <el-checkbox v-model="goods.haveExpress" :onfocus="editable?'':'this.blur();'">快递</el-checkbox>
                        </el-form-item>
                        <el-form-item label="是否免邮费" prop="expressFree">
                            <el-checkbox v-model="goods.expressFree" :onfocus="editable?'':'this.blur();'">免邮费</el-checkbox>
                        </el-form-item>
                        <el-form-item label="邮费价格" prop="expressMoney">
                            <el-input v-model="goods.expressMoney" placeholder="请输入店邮费价格" :onfocus="editable?'':'this.blur();'"></el-input>

                        </el-form-item>

                        <el-form-item label="库存量" prop="storeNo">
                            <el-input v-model="goods.storeNo" placeholder="请输入库存量" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                        <el-form-item v-if="dialogStatus=='detail'" label="销售量" prop="销售量">
                            {{goods.saleNo}}
                        </el-form-item>

                        <el-form-item v-if="dialogStatus=='detail'" label="平均评分" prop="平均评分">
                            {{goods.averageScore}}
                        </el-form-item>

                        <el-form-item v-if="dialogStatus=='detail'" label="创建时间" prop="创建时间">
                            {{getDate(goods.createTime)}}
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
    getGoodsList,
    addGoods,
    updateGoods,
    deleteGoods,
    getGoodsDetail,
    getGoodsTypes,
    getShopTypeList
} from '@/api/shopkeeper/goods'

import {
    uploadFile
} from '@/api/common/common'
export default {
    name: 'goodsManage',
    data() {
        return {
            typeOptions: [],
            shopTypeList: [],

            smallTypes: [],
            provinceOptions: [], // 省份
            cityOptions: [], // 城市
            countyOptions: [], // 区县

            detailPictureList: [],

            loading: false,
            userList: [],
            goodsKeeper: [],

            search: {
                goodsName: ''

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

            goodsList: [],

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
                goodsName: [{
                    required: true,
                    message: '商品名称不能为空',
                    trigger: 'change'
                }],
                description: [{
                    required: true,
                    message: '商品描述不能为空',
                    trigger: 'change'
                }],
                bigType: [{
                    required: true,
                    message: '商品大分类不能为空',
                    trigger: 'change'
                }],
                smallType: [{
                    required: true,
                    message: '商品小分类不能为空',
                    trigger: 'change'
                }],
                picture: [{
                    required: true,
                    message: '商品大图不能为空',
                    trigger: 'change'
                }],
                picture1: [{
                    required: true,
                    message: '商品图片1不能为空',
                    trigger: 'change'
                }],
                picture2: [{
                    required: true,
                    message: '商品图片2不能为空',
                    trigger: 'change'
                }],
                picture3: [{
                    required: true,
                    message: '商品图片3不能为空',
                    trigger: 'change'
                }],
                picture4: [{
                    required: true,
                    message: '商品图片4不能为空',
                    trigger: 'change'
                }],
                price: [{
                    required: true,
                    message: '商品价格不能为空',
                    trigger: 'change'
                }],
                storeNo: [{
                    required: true,
                    message: '商品库存不能为空',
                    trigger: 'change'
                }]

            },

            goods: {},
            total: null,
            page: {
                pageNo: 1,
                pageSize: 10
            }

        }
    },
    methods: {

        deletePicture(index) {
            this.detailPictureList.splice(index, 1)
        },
        addPicture() {
            this.detailPictureList.push('')
        },

        getGoodsList() {

            var _this = this
            var params = {
                goodsName: _this.search.goodsName,
                pageNo: _this.page.pageNo,
                pageSize: _this.page.pageSize
            }
            getGoodsList(params).then(function (data) {
                if (data.data.code === 200) {
                    _this.goodsList = data.data.data.results
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
            this.goods = {
                goodsName: "",

                description: "",

                bigType: "",

                smallType: "",

                shopType: "",

                picture: "",

                picture1: "",

                picture2: "",

                picture3: "",

                picture4: "",

                price: "",

                haveExpress: true,

                expressFree: true,

                expressMoney: 0,

                detailPictures: ""

            }
        },

        handleCreate: function () {
            this.detailPictureList = []
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
            this.goods = row
             this.initTypeOptions(this.goods.bigType) 
            this.detailPictureList = this.goods.detailPictures.split(',')
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            var fileInput = document.getElementById('uploadImg')
            if (fileInput != null) {
                fileInput.value = ''
            }


            this.$nextTick(() => {
                this.$refs['dataForm'].clearValidate()
            })
        },

        // 上传的按钮
        fileUpload(e) {
            console.log(e)
            var id = e.srcElement.id

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
                        var fileUrl = resp.data.data.fileUrl
                        if(id.indexOf("img")>=0){
                            if(id=="img_0"){
                              _this.goods.picture=fileUrl
                            }else if(id=='img_1'){
                              _this.goods.picture1=fileUrl
                              
                              }else if(id=='img_2'){
                              _this.goods.picture2=fileUrl
                                
                                }else if(id=='img_3'){
                              _this.goods.picture3=fileUrl
                                  
                                  }else if(id=='img_4'){
                                  _this.goods.picture4=fileUrl

                            }
                        }else{
                          console.log(parseInt(id))
                          console.log(_this.detailPictureList)
                          // _this.detailPictureList[parseInt(id)]=fileUrl
                          console.log(_this.detailPictureList)
                          Vue.set(_this.detailPictureList, parseInt(id),fileUrl) 
                        }

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
                    this.goods.detailPictures = this.detailPictureList.join(',')

                    // this.goods.goodsKeeper = this.goodsKeeper[0]
                    addGoods(this.goods).then(response => {
                        if (response.data.code === 200) {
                            this.dialogFormVisible = false
                            this.$message({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 3000
                            })
                            this.getGoodsList()
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
            this.goods = row

            this.dialogStatus = 'detail'
            this.initTypeOptions(this.goods.bigType) 
         
            this.detailPictureList = this.goods.detailPictures.split(',')
            this.dialogFormVisible = true
        },
        handleDelete: function (row) {
            this.goods = row

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
                  this.goods.detailPictures = this.detailPictureList.join(',')

                    updateGoods(this.goods).then(response => {
                        if (response.data.code === 200) {
                            this.dialogFormVisible = false
                            this.$message({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 3000
                            })
                            this.getGoodsList()
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
            deleteGoods(this.goods.id).then(response => {
                if (response.data.code === 200) {
                    this.dialogFormVisible = false
                    this.$message({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 3000
                    })
                    this.getGoodsList()
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
            this.getGoodsList()
        },
        //大类型选择

        typeChange(val) {
            this.goods.smallType = ''
            this.smallTypes = []
            const arr = this.typeOptions
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === val) {
                    this.smallTypes = arr[i].smallTypes
                    return
                }
            }
        },
        initTypeOptions(val) {
            const arr = this.typeOptions
            for (let i = 0; i < arr.length; i++) {
                if (arr[i].id === val) {
                    this.smallTypes = arr[i].smallTypes
                    return
                }
            }
        },

        // 省份选择
        provinceChange(val) {
            this.goods.city = ''
            this.goods.county = ''
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
            this.goods.county = ''
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

    mounted() {
        this.getGoodsList()
        const this_ = this
        // 获取省市区信息
        axios.get('/static/area/area_cn.json').then(function (data) {
            this_.provinceOptions = data.data
        })

        //获取商品大小分类
        getGoodsTypes().then(resp => {
            console.log(resp)
            this_.typeOptions = resp.data.data
        })

        getShopTypeList().then(resp => {
            this_.shopTypeList = resp.data.data
        })

    },
    computed: {
        // 计算属性的 getter
        editable: function () {
            // `this` 指向 vm 实例
            return ((this.dialogStatus == 'update' || this.dialogStatus == 'create'))
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

.line {

    line-height: 0.01px;
    border-style: solid;
    border-width: 0.5px 0.5px 0.5px 0.5px;
    margin-bottom: 10px;
    padding-left: 5px;
    padding-bottom: 10px;

}
</style>
