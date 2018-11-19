<template>
<div class="app-container">
    <div >
        <el-container>
            

        </el-container>


        <el-main>
            <el-button style="margin: 5px 50px;" size="small" @click="handleCreate" type="primary" icon="el-icon-plus">新增</el-button>
            <el-table :ey='tableKey'  :data="shopTypes"  border fit highlight-current-row style="width:100%;margin-top:8px" :header-cell-style="{background:'oldlace'}">>

                <el-table-column align="center" label="编号" min-width="10">
                    <template slot-scope="scope">
              
                        <span>{{scope.$index+1}}</span>
                    </template>
                </el-table-column>
                <el-table-column align="center" label="分类名称" min-width="50">
                    <template slot-scope="scope">
                       <span>{{scope.row.typeName}}</span>
                    </template>
                </el-table-column>

                <el-table-column align="center" label="操作" class-name="small-padding fixed-width">
                    <template slot-scope="scope">
                        <el-button title="编辑" type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)"></el-button>
                        <el-button title="删除" type="danger" icon="el-icon-delete" size="mini" @click="handleDelete(scope.row)"></el-button>
                    </template>
                </el-table-column>

            </el-table>
        </el-main>


        <!--新增編輯彈出框-->
        <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible" width="50%">
            <el-form :rules="rules" ref="dataForm" :model="shopType" label-position="left" label-width="80px">
                <el-row :gutter="20">
                    <el-col :span="20">

                        <el-form-item label="标题" prop="typeName">
                            <el-input v-model="shopType.typeName" placeholder="请输入分类名称" :onfocus="dialogStatus=='detail'?'this.blur();':''"  ></el-input>
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
import { getShopTypeList, updateShopType, addShopType, deleteShopType} from '@/api/shopkeeper/shopType'
export default {
  name: 'shopType',
  data() {
    return {
      radioValue: 1,
      shopTypes: [],

      tableKey: 0,

      // 弹框显示
      dialogFormVisible: false,
      innerVisible: false,
      dialogStatus: '',
      textMap: {
        update: '修改',
        create: '新增'
      },

      rules: {
        typeName: [{ required: true, message: '分类名称不能为空', trigger: 'change' }]
      },

      shopType: {
      }

    }
  },
  methods: {
    getShopTypeList() {
      var type = this.radioValue
      var _this = this
      getShopTypeList(type).then(function(data) {
        if (data.data.code === 200) {
          _this.shopTypes = data.data.data
        }
      })
    },

    initDate() {
      this.shopType = {
        typeName: ''
      }
    },

    handleCreate: function() {
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.initDate()
      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    handleUpdate: function(row) {
      this.shopType = row

      this.dialogStatus = 'update'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },


    createData: function() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          addShopType(this.shopType).then(response => {
            if (response.data.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 3000
              })
              this.getShopTypeList()
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

 
    handleDelete: function(row) {
      this.shopType = row

      this.dialogStatus = 'delete'
      this.dialogFormVisible = true

      this.$nextTick(() => {
        this.$refs['dataForm'].clearValidate()
      })
    },

    updateData: function() {
      this.$refs['dataForm'].validate(valid => {
        if (valid) {
          updateShopType(this.shopType).then(response => {
            if (response.data.code === 200) {
              this.dialogFormVisible = false
              this.$message({
                title: '成功',
                message: '修改成功',
                type: 'success',
                duration: 3000
              })
              this.getShopTypeList()
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
      deleteShopType(this.shopType.id).then(response => {
        if (response.data.code === 200) {
          this.dialogFormVisible = false
          this.$message({
            title: '成功',
            message: '删除成功',
            type: 'success',
            duration: 3000
          })
          this.getShopTypeList()
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
      this.getShopTypeList()
    }
  },

  mounted() {
    this.getShopTypeList()
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

