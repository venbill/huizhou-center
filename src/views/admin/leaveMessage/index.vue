<template>
<div class="app-container">
    <div>
        <el-container>

        </el-container>

        <el-main>
            <el-table :ey='tableKey' :data="leaveMessageList" border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="5">
                    <template slot-scope="scope">

                        <span>{{scope.$index+1+(page.pageNo - 1)*page.pageSize  }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="姓名" min-width="20">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.name}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="公司名称" min-width="20">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.companyName}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="电话" min-width="20">
                  <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="提交时间" min-width="12">
                    <template slot-scope="scope">
                        <span>{{getDate(scope.row.createTime)}}</span>
                    </template>
                </el-table-column>

                <el-table-column min-width="20" align="center" label="操作" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button title="查看详情" type="primary" size="mini" icon="el-icon-search" @click="handleDetail(scope.row)"></el-button>
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
            <el-form ref="dataForm" :model="leaveMessage" label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="姓名" prop="name">
                            <el-input v-model="leaveMessage.name" placeholder="请输入标题" :onfocus="editable?'':'this.blur();'"></el-input>
                        </el-form-item>
                        <el-form-item label="公司名称" prop="companyName">
                           <el-input :onfocus="editable?'':'this.blur();'" v-model="leaveMessage.companyName" ></el-input>
                   
                        </el-form-item>

                        <el-form-item label="电话" prop="author">
                            <el-input :onfocus="editable?'':'this.blur();'" v-model="leaveMessage.phone" ></el-input>
                        </el-form-item>

                        <el-form-item label="内容" prop="content">
                            <el-input type="textarea" :rows="6" :onfocus="editable?'':'this.blur();'" v-model="leaveMessage.content"></el-input>
                        </el-form-item>

                        <el-form-item v-if="dialogStatus=='detail'" label="创建时间" prop="创建时间">
                            {{getDate(leaveMessage.createTime)}}
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取消</el-button>
                <el-button v-if="dialogStatus=='delete'" type="danger" @click="deleteData">删除</el-button>
            </div>
        </el-dialog>

    </div>
</div>
</template>

<script>
import util from '@/utils/util'
import {
  getLeaveMessageList,
  deleteLeaveMessage,
  getLeaveMessageDetail
} from '@/api/admin/leaveMessage'
import {
  uploadFile
} from '@/api/common/common'
export default {
  name: 'leaveMessage',
  data() {
    return {
      radioValue: 1,
      leaveMessageList: [],
      tableKey: 0,
      // 弹框显示
      dialogFormVisible: false,
      innerVisible: false,
      dialogStatus: '',
      textMap: {
        detail: '详情',
        delete: '删除'
      },
      leaveMessage: {},
      total: null,
      page: {
        pageNo: 1,
        pageSize: 10
      }

    }
  },
  methods: {
    getLeaveMessageList() {
   
      var _this = this
      var params = {
      
        pageNo: _this.page.pageNo,
        pageSize: _this.page.pageSize
      }
      getLeaveMessageList(params).then(function(data) {
        if (data.data.code === 200) {
          _this.leaveMessageList = data.data.data.results
          console.log(_this.leaveMessageList)
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

  
  
    handleDetail(row) {
      this.leaveMessage = row

      this.dialogStatus = 'detail'
      this.dialogFormVisible = true
    },
    handleDelete: function(row) {
      this.leaveMessage = row

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


    deleteData: function() {
      deleteLeaveMessage(this.leaveMessage.id).then(response => {
        if (response.data.code === 200) {
          this.dialogFormVisible = false
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 3000
          })
          this.getLeaveMessageList()
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
      this.getLeaveMessageList()
    }

  },
  watch: {
    radioValue(newValue, oldValue) {
      this.getLeaveMessageList()
      this.page.pageNo = 1
    }
  },

  mounted() {
    this.getLeaveMessageList()
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
