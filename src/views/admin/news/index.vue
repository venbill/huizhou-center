<template>
<div class="app-container">
    <div>
        <el-container>

        </el-container>

        <el-main>
            <el-radio-group v-model="radioValue" size="small">
                <el-radio-button label=1>本地资讯</el-radio-button>
                <el-radio-button label=2>行业资讯</el-radio-button>
                <el-radio-button label=3>公告</el-radio-button>
            </el-radio-group>
            <el-button style="margin: 5px 50px;" size="small" @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
            <el-table :ey='tableKey' :data="newsList" border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="5">
                    <template slot-scope="scope">

                        <span>{{scope.$index+1+(page.pageNo - 1)*page.pageSize  }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="标题" min-width="30">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="图片" min-width="20">
                    <template slot-scope="scope">
                        <img style="width:150px;height:100px;" v-bind:src="scope.row.headerPicture" />
                    </template>
                </el-table-column>

                <el-table-column align="center" label="创建日期" min-width="12">
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
            <el-form :rules="rules" ref="dataForm" :model="news" label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="标题" prop="title">
                            <el-input v-model="news.title" placeholder="请输入标题" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="图片" prop="headerPicture">
                            <img v-if="news.headerPicture!=''" style="width:150px;height:100px;" v-bind:src="news.headerPicture" />

                            <input  :onfocus="editable?'':'this.blur();'" class="uploadInput"  id="uploadImg" ref="uploadImg" type="file" @change="fileUpload" >
                            <el-input :onfocus="editable?'':'this.blur();'" v-model="news.headerPicture" placeholder="输入图片链接地址"></el-input>
                        </el-form-item>

                        <el-form-item label="作者" prop="author">
                            <el-input :onfocus="editable?'':'this.blur();'" v-model="news.author" placeholder="请输入作者"></el-input>
                        </el-form-item>

                        <el-form-item label="内容" prop="content">
                            <el-input type="textarea" :rows="6" :onfocus="editable?'':'this.blur();'" v-model="news.content" placeholder="请输入内容"></el-input>
                        </el-form-item>

                        <el-form-item label="发布状态" prop="status">
                            <el-radio :disabled="editable?false:true" v-model="news.status" :label=1>未发布</el-radio>
                            <el-radio :disabled="editable?false:true" v-model="news.status" :label=2>已发布</el-radio>

                        </el-form-item>

                        <el-form-item v-if="dialogStatus=='detail'" label="创建时间" prop="创建时间">
                            {{getDate(news.createTime)}}
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
import {
  getNewsList,
  addNews,
  updateNews,
  deleteNews,
  getNewsDetail
} from '@/api/admin/news'
import {
  uploadFile
} from '@/api/common/common'
export default {
  name: 'news',
  data() {
    return {
      radioValue: 1,
      newsList: [],

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

      news: {},
      total: null,
      page: {
        pageNo: 1,
        pageSize: 10
      }

    }
  },
  methods: {
    getNewsList() {
      var type = this.radioValue
      var _this = this
      var params = {
        type: type,
        pageNo: _this.page.pageNo,
        pageSize: _this.page.pageSize
      }
      getNewsList(params).then(function(data) {
        if (data.data.code === 200) {
          _this.newsList = data.data.data.results
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

    initDate() {
      this.news = {
        title: '',
        headerPicture: '',
        author: '',
        content: '',
        type: '',
        status: 1

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
      this.news = row

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
            _this.news.headerPicture = resp.data.data.fileUrl

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
          this.news.type = this.radioValue
          addNews(this.news).then(response => {
            if (response.data.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 3000
              })
              this.getNewsList()
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
      this.news = row

      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
    },
    handleDelete: function(row) {
      this.news = row

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
          updateNews(this.news).then(response => {
            if (response.data.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
              this.getNewsList()
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
      deleteNews(this.news.id).then(response => {
        if (response.data.code === 200) {
          this.dialogFormVisible = false
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 3000
          })
          this.getNewsList()
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
      this.getNewsList()
    }

  },
  watch: {
    radioValue(newValue, oldValue) {
      this.getNewsList()
      this.page.pageNo = 1
    }
  },

  mounted() {
    this.getNewsList()
  },
  computed: {
    // 计算属性的 getter
    editable: function() {
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
