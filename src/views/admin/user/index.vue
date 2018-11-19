<template>
<div class="app-container">
    <div>
        <el-container>
            <div class="formSearch">
                <el-form :inline="true">
                    <el-form-item style="padding-left:3%" label="用户角色" class="seat">
                        <el-select v-model="search.roleId" placeholder="请选择">
                            <el-option v-for="item in roles" :key="item.value" :label="item.lable" :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
               
                    <el-form-item style="padding-left:3%" label="昵称">
                        <el-input style="width:200px" v-model="search.nick" placeholder="请输入昵称" clearable></el-input>
                    </el-form-item>
               
                    <el-form-item style="padding-left:3%" label="手机号">
                        <el-input  style="width:200px"  v-model="search.phone" placeholder="请输入手机号" clearable></el-input>
                    </el-form-item>
                    <el-form-item style="padding-left:3%" label="注册日期" class="seat">
                        <div class="block">
                            <el-date-picker style="width:200px" v-model="dateRange" type="daterange" unlink-panels start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd" value-format="yyyy-MM-dd" clearable @change="setDate()">
                            </el-date-picker>
                        </div>
                    </el-form-item>
                
                    <el-form-item style="padding-left:3%">
                        <el-button  class="filter-item" type="primary" icon="el-icon-search" @click="getUserList()">搜索</el-button>
                    </el-form-item>
                </el-form>

            </div>

        </el-container>

        <el-main>
          
            <el-table :ey='tableKey' :data="userList" border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="5">
                    <template slot-scope="scope">

                        <span>{{scope.$index+1+(page.pageNo - 1)*page.pageSize  }}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="昵称" min-width="30">
                    <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.nick}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="电话" min-width="20">
                     <template min-width="50" slot-scope="scope">

                        <span>{{scope.row.phone}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="角色" min-width="20">
                     <template min-width="50" slot-scope="scope">
                        
                        <span v-for="role in scope.row.roles"><el-button  style="margin-right:5px" size="mini" type="primary" plain>{{role.roleCname}}</el-button></span>
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
  getUserList,
  getUserDetail
} from '@/api/admin/user'
import {
  uploadFile
} from '@/api/common/common'
export default {
  name: 'user',
  data() {
    return {
      dateRange: [],
      search: {
        roleId: 0,
        nick: '',
        phone: '',
        createTimeStart: '',
        createTimeEnd: ''
      },
      roles: [{
        lable: '所有角色',
        value: 0
      },
      {
        lable: '管理员',
        value: 1
      },
      {
        lable: '客户',
        value: 2
      },
      {
        lable: '店长',
        value: 3
      }
      ],

      userList: [],

      tableKey: 0,

      // 弹框显示
      dialogFormVisible: false,
      innerVisible: false,
      dialogStatus: '',
     


      user: {},
      total: null,
      page: {
        pageNo: 1,
        pageSize: 10
      }

    }
  },
  methods: {

    getUserList() {
      var _this = this
      var params = {
        roleId: _this.search.roleId,
        nick: _this.search.nick,
        phone: _this.search.phone,
        createTimeStart: _this.search.createTimeStart,
        createTimeEnd: _this.search.createTimeEnd,
        pageNo: _this.page.pageNo,
        pageSize: _this.page.pageSize
      }
      getUserList(params).then(function(data) {
        if (data.data.code === 200) {
          _this.userList = data.data.data.results
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
    setDate(){
      if(this.dateRange.length==2){
        this.search.createTimeStart = this.dateRange[0]
      this.search.createTimeEnd = this.dateRange[1]
      }
    },

  

    
    handleCurrentChange(val) {
      this.page.pageNo = val
      this.getUserList()
    }

  },
  watch: {
    radioValue(newValue, oldValue) {
      this.getUserList()
      this.page.pageNo = 1
    }
  },

  mounted() {
    this.getUserList()
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
