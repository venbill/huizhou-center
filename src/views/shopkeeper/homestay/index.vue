<template>
<div class="app-container">
    <div>
        <el-container>
            <div class="formSearch">
                <el-form :inline="true">

                    <el-form-item style="padding-left:3%" label="民宿名称">
                        <el-input style="width:200px" v-model="search.homestayName" placeholder="请输入民宿名称" clearable></el-input>
                    </el-form-item>

                    <el-form-item style="padding-left:3%">
                        <el-button class="filter-item" type="primary" icon="el-icon-search" @click="getHomestayList()">搜索</el-button>
                    </el-form-item>
                </el-form>

            </div>

        </el-container>

        <el-main>

            <el-button style="margin: 5px 50px;" size="small" @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
            <el-table :ey='tableKey' :data="homestayList" border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="5">
                    <template slot-scope="scope">

                        <span>{{scope.$index+1+(page.pageNo - 1)*page.pageSize  }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="民宿名称" min-width="20">
                    <template min-width="50" slot-scope="scope">
                        <span>{{scope.row.name}}</span>
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

                <el-table-column align="center" label="销售量" min-width="10">
                    <template min-width="50" slot-scope="scope">
                        <span >{{scope.row.saleNum}}</span>
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
            <el-form :rules="rules" ref="dataForm" :model="homestay" label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="民宿名称" prop="name">
                            <el-input v-model="homestay.name" placeholder="请输入民宿名称" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                        <el-form-item label="民宿描述" prop="description">
                            <el-input type="textarea" :rows="6" :onfocus="editable?'':'this.blur();'" v-model="homestay.description" placeholder="请输入民宿描述"></el-input>
                        </el-form-item>
                        <el-form-item label="是否独立房源" prop="expressFree">
                            <el-checkbox v-model="homestay.wholeHouse" :onfocus="editable?'':'this.blur();'">独立房源</el-checkbox>
                        </el-form-item>

                        <el-form-item label="房间数量" prop="roomNum">
                            <el-input v-model="homestay.roomNum" placeholder="请输入房间数量" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="床铺数量" prop="bedNum">
                            <el-input v-model="homestay.bedNum" placeholder="请输入床铺数量" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="厕所数量" prop="toiletNum">
                            <el-input v-model="homestay.toiletNum" placeholder="请输入厕所数量" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="最大入住人数" prop="maxPersonNum">
                            <el-input v-model="homestay.maxPersonNum" placeholder="请输入最大入住人数" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="房间每日存量" prop="storeNum">
                            <el-input v-model="homestay.storeNum" placeholder="请输入房间每日存量" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="每日价格" prop="price">
                            <el-input v-model="homestay.price" placeholder="请输入房间每日存量" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                        <el-form-item label="省市区：">
                            <el-row>
                                <el-col :span="7" style="margin-right:20px">
                                    <el-form-item label="" prop="province">
                                        <el-select v-model="homestay.province" placeholder="省份" @change="provinceChange">
                                            <el-option v-for="item in provinceOptions" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7" style="margin-right:20px">
                                    <el-form-item label="" prop="city">
                                        <el-select v-model="homestay.city" placeholder="城市" @change="cityChange">
                                            <el-option v-for="item in cityOptions" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                                <el-col :span="7">
                                    <el-form-item label="" prop="county">
                                        <el-select v-model="homestay.county" placeholder="区县">
                                            <el-option v-for="item in countyOptions" :key="item.id" :label="item.name" :value="item.id">
                                            </el-option>
                                        </el-select>
                                    </el-form-item>
                                </el-col>
                            </el-row>
                        </el-form-item>


                        <el-form-item label="详细地址" prop="name">
                            <el-input v-model="homestay.deailAddress" placeholder="请输入民宿详细地址" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>

                         <el-form-item label="地址纬度" prop="locationX">
                            <el-input v-model="homestay.locationX" placeholder="请输入地址纬度" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="地址经度" prop="locationY">
                            <el-input v-model="homestay.locationY" placeholder="请输入地址纬度" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="配置详情" >
                            <div v-for="item in configurationList">

                            <el-checkbox v-model="item.select" :onfocus="editable?'':'this.blur();'">{{item.name}}</el-checkbox>
                            </div>
                        </el-form-item>

                        <el-form-item label="所在景区" prop="description">
                            <el-row>
                                <el-form-item label="" prop="shopType">
                                    <el-select v-model="homestay.areaId" placeholder="所在景区">
                                        <el-option v-for="item in areaList" :key="item.id" :label="item.areaName" :value="item.id">
                                        </el-option>
                                    </el-select>
                                </el-form-item>
                            </el-row>
                        </el-form-item>

                        <el-form-item label="民宿大图" prop="picture">
                            <img v-if="homestay.picture!=''" style="width:150px;height:100px;" v-bind:src="homestay.picture" />
                            <input v-if="editable" class="uploadInput"  id="img_0" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="homestay.picture" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="民宿图片1" prop="picture1">
                            <img v-if="homestay.picture1!=''" style="width:150px;height:100px;" v-bind:src="homestay.picture1" />
                            <input  v-if="editable" class="uploadInput"  id="img_1" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="homestay.picture1" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="民宿图片2" prop="picture2">
                            <img v-if="homestay.picture2!=''" style="width:150px;height:100px;" v-bind:src="homestay.picture2" />
                            <input  v-if="editable" class="uploadInput"  id="img_2" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="homestay.picture2" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="民宿图片3" prop="picture3">
                            <img v-if="homestay.picture3!=''" style="width:150px;height:100px;" v-bind:src="homestay.picture3" />
                            <input v-if="editable" class="uploadInput"  id="img_3" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="homestay.picture3" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="民宿图片4" prop="picture4">
                            <img v-if="homestay.picture4!=''" style="width:150px;height:100px;" v-bind:src="homestay.picture4" />
                            <input  v-if="editable" class="uploadInput"  id="img_4" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input v-if="editable" v-model="homestay.picture4" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>
                        

                        <el-form-item v-if="dialogStatus=='detail'" label="销售量" prop="销售量">
                            {{homestay.saleNum}}
                        </el-form-item>

                        <el-form-item v-if="dialogStatus=='detail'" label="平均评分" prop="平均评分">
                            {{homestay.score}}
                        </el-form-item>

                        <el-form-item v-if="dialogStatus=='detail'" label="创建时间" prop="创建时间">
                            {{getDate(homestay.createTime)}}
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
    getHomestayList,
    addHomestay,
    updateHomestay,
    deleteHomestay,
    getHomestayDetail,
    getAreaList
} from '@/api/shopkeeper/homestay'

import {
    uploadFile
} from '@/api/common/common'
export default {
    name: 'homestay',
    data() {
        return {
            areaList: [],
            smallTypes: [],
            provinceOptions: [], // 省份
            cityOptions: [], // 城市
            countyOptions: [], // 区县
            detailPictureList: [],
            loading: false,
            userList: [],
            search: {
                homestayName: ''
            },

            configurationList:[
                {id:1,name:'无线网络',select:false},
                {id:2,name:'电视',select:false},
                {id:3,name:'空调',select:false},
                {id:4,name:'沙发',select:false},
                {id:5,name:'电脑',select:false}
            ],
            
            homestayList: [],

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
                homestayName: [{
                    required: true,
                    message: '民宿名称不能为空',
                    trigger: 'change'
                }],
                description: [{
                    required: true,
                    message: '民宿描述不能为空',
                    trigger: 'change'
                }],
                bigType: [{
                    required: true,
                    message: '民宿大分类不能为空',
                    trigger: 'change'
                }],
                smallType: [{
                    required: true,
                    message: '民宿小分类不能为空',
                    trigger: 'change'
                }],
                picture: [{
                    required: true,
                    message: '民宿大图不能为空',
                    trigger: 'change'
                }],
                picture1: [{
                    required: true,
                    message: '民宿图片1不能为空',
                    trigger: 'change'
                }],
                picture2: [{
                    required: true,
                    message: '民宿图片2不能为空',
                    trigger: 'change'
                }],
                picture3: [{
                    required: true,
                    message: '民宿图片3不能为空',
                    trigger: 'change'
                }],
                picture4: [{
                    required: true,
                    message: '民宿图片4不能为空',
                    trigger: 'change'
                }],
                price: [{
                    required: true,
                    message: '民宿价格不能为空',
                    trigger: 'change'
                }],
                storeNo: [{
                    required: true,
                    message: '民宿库存不能为空',
                    trigger: 'change'
                }]

            },

            homestay: {},
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

        getHomestayList() {

            var _this = this
            var params = {
                homestayName: _this.search.homestayName,
                pageNo: _this.page.pageNo,
                pageSize: _this.page.pageSize
            }
            getHomestayList(params).then(function (data) {
                if (data.data.code === 200) {
                    _this.homestayList = data.data.data.results
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
            this.configurationList=[
                {id:1,name:'无线网络',select:false},
                {id:2,name:'电视',select:false},
                {id:3,name:'空调',select:false},
                {id:4,name:'沙发',select:false},
                {id:5,name:'电脑',select:false}
            ],
            this.homestay = {
                name: "",

                description: "",

                wholeHouse: true,

                roomNum: 1,

                bedNum: 1,

                toiletNum: 1,

                maxPersonNum: 2,


                province: "",

                city: "",

                county: "",

                deailAddress: "",

                locationX: "",

                locationY: "",

                configurations: "",

                score: "",

                price: "",

                areaId: "",

                storeNum: "",

                shopId: "",

                recommend: "",

                picture: "",

                picture1: "",

                picture2: "",

                picture3: "",

                picture4: "",

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
            this.homestay = row
            console.log(this.homestay)
            this.initConfigurations(this.homestay.configurations)
            this.dialogStatus = 'update'
            this.dialogFormVisible = true
            this.areaOptions(this.homestay)
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
                        if (id.indexOf("img") >= 0) {
                            if (id == "img_0") {
                                _this.homestay.picture = fileUrl
                            } else if (id == 'img_1') {
                                _this.homestay.picture1 = fileUrl

                            } else if (id == 'img_2') {
                                _this.homestay.picture2 = fileUrl

                            } else if (id == 'img_3') {
                                _this.homestay.picture3 = fileUrl

                            } else if (id == 'img_4') {
                                _this.homestay.picture4 = fileUrl

                            }
                        } else {
                            console.log(parseInt(id))
                            console.log(_this.detailPictureList)
                            // _this.detailPictureList[parseInt(id)]=fileUrl
                            console.log(_this.detailPictureList)
                            Vue.set(_this.detailPictureList, parseInt(id), fileUrl)
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
            var _this = this
            this.$refs['dataForm'].validate(valid => {
                if (valid) {
                    console.log(this.configurationList)
                    _this.configurationList.forEach(c => {
                        if(c.select){
                            _this.homestay.configurations = _this.homestay.configurations==''?c.id:(_this.homestay.configurations+','+c.id)
                        }
                    });

                    // this.homestay.homestayKeeper = this.homestayKeeper[0]
                    addHomestay(this.homestay).then(response => {
                        if (response.data.code === 200) {
                            this.dialogFormVisible = false
                            this.$message({
                                title: '成功',
                                message: '创建成功',
                                type: 'success',
                                duration: 3000
                            })
                            this.getHomestayList()
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
            this.homestay = row

            this.dialogStatus = 'detail'
            this.areaOptions(this.homestay)
            //处理配置
            this.initConfigurations(this.homestay.configurations)

            this.dialogFormVisible = true
        },

        initConfigurations(configurations){
            this.configurationList=[
                {id:1,name:'无线网络',select:false},
                {id:2,name:'电视',select:false},
                {id:3,name:'空调',select:false},
                {id:4,name:'沙发',select:false},
                {id:5,name:'电脑',select:false}
            ]
            var arr= configurations.split(',')
            arr.forEach(cId => {
                this.configurationList[parseInt(cId)-1].select=true
            });
        },
        handleDelete: function (row) {
            this.homestay = row

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
                    this.homestay.detailPictures = this.detailPictureList.join(',')

                    updateHomestay(this.homestay).then(response => {
                        if (response.data.code === 200) {
                            this.dialogFormVisible = false
                            this.$message({
                                title: '成功',
                                message: '修改成功',
                                type: 'success',
                                duration: 3000
                            })
                            this.getHomestayList()
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
            deleteHomestay(this.homestay.id).then(response => {
                if (response.data.code === 200) {
                    this.dialogFormVisible = false
                    this.$message({
                        title: '成功',
                        message: '删除成功',
                        type: 'success',
                        duration: 3000
                    })
                    this.getHomestayList()
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
            this.getHomestayList()
        },

        // 省份选择
        provinceChange(val) {
            this.homestay.city = ''
            this.homestay.county = ''
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
            this.homestay.county = ''
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
        this.getHomestayList()
        const this_ = this
        // 获取省市区信息
        axios.get('/static/area/area_cn.json').then(function (data) {
            this_.provinceOptions = data.data
        })

        getAreaList().then(resp => {
            this_.areaList = resp.data.data
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
