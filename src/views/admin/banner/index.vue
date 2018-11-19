<template>
<div class="app-container">
    <div >
        <el-container>
            

        </el-container>


        <el-main>
          <el-radio-group v-model="radioValue" size="small">
                <el-radio-button label=1>首页轮播</el-radio-button>
                <el-radio-button label=2>民宿轮播</el-radio-button>
                <el-radio-button label=3>电商轮播</el-radio-button>
            </el-radio-group>
            <el-button style="margin: 5px 50px;" size="small" @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
            <el-table :ey='tableKey'  :data="banners"  border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="10">
                    <template slot-scope="scope">
              
                        <span>{{scope.$index+1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="图片" min-width="50">
                    <template slot-scope="scope">
                        <img style="width:150px;height:100px;" v-bind:src="scope.row.url" />
                    </template>
                </el-table-column>

                <el-table-column align="center" label="创建日期" min-width="40">
                    <template slot-scope="scope">
                        <span>{{getDate(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button title="查看详情" type="primary" size="mini" icon="el-icon-search" @click="handleDetail(scope.row)"></el-button>
                        <el-button title="编辑" type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
                        <el-button title="删除" type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-main>


        <!--新增編輯彈出框-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
            <el-form :rules="rules" ref="dataForm" :model="banner" label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="标题" prop="title">
                            <el-input v-model="banner.title" placeholder="请输入标题" :onfocus="dialogStatus=='detail'?'this.blur();':''"  ></el-input>
                        </el-form-item>
                        <el-form-item label="图片" prop="url">
                               <img v-if="banner.url!=''" style="width:150px;height:100px;" v-bind:src="banner.url" />

                            <input v-if="dialogStatus!='detail'" class="uploadInput"  id="uploadImg" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input :onfocus="dialogStatus=='detail'?'this.blur();':''" v-model="banner.url" placeholder="输入链接地址"></el-input>
                        </el-form-item>
                        <el-form-item label="跳转链接" prop="href">
                            <el-input :onfocus="dialogStatus=='detail'?'this.blur();':''" v-model="banner.href" placeholder="请输入标题"></el-input>
                        </el-form-item>
                        <el-form-item :onfocus="dialogStatus=='detail'?'this.blur();':''" v-if="dialogStatus=='detail'" label="创建时间" prop="创建时间">
                            {{getDate(banner.createTime)}}
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
import { getBanner, addBanner, updateBanner, deleteBanner, getBannerDetail } from '@/api/admin/banner'
import { uploadFile } from '@/api/common/common'
export default {
  name: 'banner',
  data() {
    return {
      radioValue: 1,
      banners: [],

      tableKey: 0,

      // 弹框显示
      dialogFormVisible: false,
      innerVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增',
        detail: '详情'
      },

      rules: {
        url: [{ required: true, message: '图片地址不能为空', trigger: 'change' }]
      },

      banner: {
      }

    }
  },
  methods: {
    getBannerList() {
      var type = this.radioValue
      var _this = this
      getBanner(type).then(function(data) {
        if (data.data.code === 200) {
          _this.banners = data.data.data
        }
      })
    },
    // 日期时间处理
    getDate(date) {
      if (date) {
        return util.formatDate.format(new Date(date), 'yyyy-MM-dd hh:mm')
      }
    },

    initDate() {
      this.banner = {
        title: '',
        url: '',
        href: '',
        type: '',
        createTime: ''
      }
    },

    handleCreate: function() {
      this.initDate()
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

    handleUpdate: function(row) {
      this.banner = row

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
            _this.banner.url = resp.data.data.fileUrl

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

    createData: function() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          this.banner.type = this.radioValue
          addBanner(this.banner).then(response => {
            if (response.data.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 3000
              })
              this.getBannerList()
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
      this.banner = row
      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
    },
    handleDelete: function(row) {
      this.banner = row

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

    updateData: function() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateBanner(this.banner).then(response => {
            if (response.data.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
              this.getBannerList()
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

    deleteData: function() {
      deleteBanner(this.banner.id).then(response => {
        if (response.data.code === 200) {
          this.dialogFormVisible = false
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 3000
          })
          this.getBannerList()
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

  },
  watch: {
    radioValue(newValue, oldValue) {
      this.getBannerList()
    }
  },

  mounted() {
    this.getBannerList()
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

