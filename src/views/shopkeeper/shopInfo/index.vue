<template>
<div class="app-container">
    <div style="padding-left:3%">
        

        <!--新增編輯彈出框-->
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
                            <img v-if="shop.headerPicture!=''" style="width:150px;height:150px;" v-bind:src="shop.headerPicture" />
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
                            <el-checkbox v-model="shop.openBuy" :onfocus="false?'':'this.blur();'">电商</el-checkbox>
                            <el-checkbox v-model="shop.openHomestay" :onfocus="false?'':'this.blur();'" >民宿</el-checkbox>
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
                    
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button v-if="dialogStatus=='update'" type="primary" @click="updateData">保存</el-button>
            </div>

    </div>
</div>
</template>

<script>
import util from '@/utils/util'
import axios from 'axios'
import {
    updateShop,
    getShopDetail
} from '@/api/shopkeeper/shop'

import {
    uploadFile
} from '@/api/common/common'
export default {
    name: 'shopInfo',
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


            tableKey: 0,

            // 弹框显示
            dialogFormVisible: true,
            innerVisible: true,
            dialogStatus: 'update',
            textMap: {
                update: '修改',
                detail: '详情'
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
        
        }
    },
    methods: {

       




       
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


        getShopDetail:function(){
            getShopDetail().then(resp=>{
                if(resp.data.code==200){
                    this.shop = resp.data.data
                    // var province = this.shop.province
                    // var city = this.shop.city
                    // var county = this.shop.county
                    
                    // const arr = this.provinceOptions
            // for (let i = 0; i < arr.length; i++) {
            //     if (arr[i].id === province) {
            //         this.cityOptions = arr[i].childs
            //         return
            //     }
            // }


this.areaOptions(this.shop)



           

                }
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
                            this.getShopDetail()
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
   

    mounted() {
        this.getShopDetail()
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
