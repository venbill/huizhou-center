<template>
  <div class="address-main">
    <div class="address-item pointer" :class="{activeAddress: activeAddress === index}"
     v-for="(item, index) in addressData" :key="item.index"
     @click="addressChoose(index, item)"
     @mouseenter="chengeIndex(index, item)" @mouseleave="chengeIndex(-1)">
      <div class="address-title">
        <span class="name">{{item.acceptName}}</span>
        <el-tag class="float-right" style="margin-right:20px" type="success" v-if="item.isDefault">默认收货地址</el-tag>
      </div>
      <div class="address-info">
        <p class="text-black">{{item.acceptPhone}}</p>
        <p>{{item.provinceName}} {{item.cityName}} {{item.countyName}}</p>
        <p>{{item.detailAddress}}</p>
      </div>
      <!--弹出层-->
      <div class="mask-box" v-if="addressIndex === index && !is_check">
        <div class="mask-title">
          <!-- <el-tag type="success" v-if="index === 0">默认收货地址</el-tag> -->
          <i class="iconfont" title="设为默认收货地址" v-if="!item.isDefault" @click="defaultAddress(item.id)">&#xe636;</i>
          <i class="iconfont" title="修改" @click="editAddress(item)">&#xe7c9;</i>
          <i class="iconfont" title="删除" @click="confirmDelete(item.id)">&#xe624;</i>
        </div>
      </div>
    </div>
    <div class="address-item pointer new-address" @click="newAddress">
      <div style="margin-top:40px;text-align:center;">
        <i class="iconfont" style="font-size:34px">&#xe662;</i>
        <p>使用新地址</p>
      </div>
    </div>
    <!--新增、编辑弹窗-->
    <el-dialog :title="popTitle" :visible.sync="popStatus" @close="resetForm('popForm')" width="500px">
      <el-form :model="popData" :rules="popRules" ref="popForm" label-width="110px">
        <el-form-item label="地址信息：">
          <el-row>
            <el-col :span="7" style="margin-right:20px">
              <el-form-item label="" prop="province">
                <el-select v-model="popData.province" placeholder="省份" @change="provinceChange">
                  <el-option
                    v-for="item in provinceOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7" style="margin-right:20px">
              <el-form-item label="" prop="city">
                <el-select v-model="popData.city" placeholder="城市" @change="cityChange">
                  <el-option
                    v-for="item in cityOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="7">
              <el-form-item label="" prop="county">
                <el-select v-model="popData.county" placeholder="区县">
                  <el-option
                    v-for="item in countyOptions"
                    :key="item.id"
                    :label="item.name"
                    :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form-item>
        <!-- <el-form-item label="地址信息：" prop="address">
          <el-input v-model="popData.address" auto-complete="off"></el-input>
        </el-form-item> -->
        <el-form-item label="详细地址：" prop="detailAddress">
          <el-input v-model="popData.detailAddress" auto-complete="off"></el-input>
        </el-form-item>
        <!-- <el-form-item label="邮政编码：" prop="zipCode">
          <el-input v-model.number="popData.zipCode"></el-input>
        </el-form-item> -->
        <el-form-item label="收货人姓名：" prop="acceptName">
          <el-input v-model="popData.acceptName"></el-input>
        </el-form-item>
        <el-form-item label="手机号码：" prop="acceptPhone">
          <el-input placeholder="请输入手机号" v-model.number="popData.acceptPhone">
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="isDefault">
          <el-checkbox v-model="popData.isDefault">设置为默认收货地址</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('popForm')">提交</el-button>
          <el-button @click="resetForm('popForm')">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import util from '@/utils/util'
import axios from 'axios'
import { getAddress, deleteAddress, editAddress, addAddress, defaultAddress } from '@/api/buy/buy'
export default {
  props: {
    is_check: {
      type: Boolean,
      default: false
    }
  },
  data() {
    var phoneCheck = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('请输入手机号码'))
      } else {
        const re = /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/
        if (re.test(value)) {
          callback()
        } else {
          callback(new Error('手机号码不正确'))
        }
      }
    }
    return {
      popRules: {
        province: [
          { required: true, message: '请选择省份', trigger: 'change' }
        ],
        city: [
          { required: true, message: '请选择城市', trigger: 'change' }
        ],
        county: [
          { required: true, message: '请选择区县', trigger: 'change' }
        ],
        detailAddress: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        acceptName: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        acceptPhone: [
          { required: true, validator: phoneCheck, trigger: 'blur' }
        ]
      },
      popData: {
        id: '',
        county: '',
        province: '',
        city: '',
        detailAddress: '',
        // zipCode: '',
        acceptName: '',
        acceptPhone: '',
        isDefault: false
      },
      addressData: [], // 地址列表
      provinceOptions: [], // 省份
      cityOptions: [], // 城市
      countyOptions: [], // 区县
      popTitle: '新增地址',
      isAdd: true,
      addressIndex: -1, // 鼠标移入索引
      activeAddress: -1, // 选中收货地址索引
      popStatus: false,
      phoneType: '1',
      loading: false
    }
  },
  methods: {
    init() {
      const this_ = this
      // 获取省市区信息
      axios.get('/static/area/area_cn.json').then(function(data) {
        this_.provinceOptions = data.data
      })
      // 获取收货地址
      this.getAddress()
    },
    // 获取收货地址
    getAddress() {
      const this_ = this
      getAddress().then(function(data) {
        if (data.data.code === 200) {
          this_.addressData = data.data.data
        }
      })
    },
    // 省份选择
    provinceChange(val) {
      this.popData.city = ''
      this.popData.county = ''
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
      this.popData.county = ''
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
    // 收货地址鼠标移入
    chengeIndex(index) {
      this.addressIndex = index
    },
    // 选择收货地址
    addressChoose(index, item) {
      if (this.is_check) {
        this.activeAddress = index
        this.$emit('addressChoose', item)
      }
    },
    // 设为默认地址
    defaultAddress(id) {
      const this_ = this
      defaultAddress(id).then(function(data) {
        if (data.data.code === 200) {
          this_.getAddress()
          this_.$message.success('设置成功')
        }
      })
    },
    // 新增
    newAddress() {
      this.popTitle = '新增收货地址'
      this.isAdd = true
      this.popStatus = true
      this.popData = {
        id: '',
        county: '',
        province: '',
        city: '',
        detailAddress: '',
        // zipCode: '',
        acceptName: '',
        acceptPhone: '',
        isDefault: false,
        userId: ''
      }
    },
    // 编辑
    editAddress(item) {
      this.popTitle = '修改收货地址'
      this.isAdd = false
      this.popStatus = true
      this.popData = util.arrDeepCopy(item)
      this.$nextTick(function() {
        this.areaOptions(this.popData)
      })
    },
    // 删除
    confirmDelete(id) {
      const this_ = this
      this.$confirm('确认删除当前地址？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteAddress(id).then(function(data) {
          if (data.data.code === 200) {
            this_.getAddress()
            this_.resetForm('popForm')
          }
        })
      }).catch(() => {

      })
    },
    deleteAddress(id) {
      const this_ = this
      deleteAddress(id).then(function(data) {
        if (data.data.code === 200) {
          this_.getAddress()
          this_.$message.success('删除成功')
        }
      })
    },
    // 提交表单
    submitForm(formName) {
      const this_ = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          if (this.isAdd) {
            const params = this.popData
            delete params.id
            addAddress(params).then(function(data) {
              this_.getAddress()
              this_.resetForm('popForm')
              this_.$message.success('新增成功')
            })
          } else {
            const params = this.popData
            delete params.provinceName
            delete params.cityName
            delete params.countyName
            editAddress(params).then(function(data) {
              this_.getAddress()
              this_.resetForm('popForm')
              this_.$message.success('修改成功')
            })
          }
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.popStatus = false
      this.$refs[formName].resetFields()
      this.popData = {
        id: '',
        county: '',
        province: '',
        city: '',
        detailAddress: '',
        // zipCode: '',
        acceptName: '',
        acceptPhone: '',
        isDefault: false,
        userId: ''
      }
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
  .address-item {
    position: relative;
    display: inline-block;
    height: 160px;
    width: 300px;
    padding: 15px 20px;
    background: #fafafa;
    border: 1px solid #dfdfdf;
    margin: 0 20px 10px 0;
    overflow: hidden;
    font-size: 14px;
  }
  .address-item:hover {
    background: #f0f0f0;
  }
  .address-item .mask-box {
    height: 101%;
    width: 101%;
    background: rgba(0, 0, 0, 0);
    position: absolute;
    top: 0;
    left: 0;
  }
  .mask-title {
    height: 50px;
    line-height: 50px;
    padding: 0 10px;
    text-align: right;
    background: rgba(0, 0, 0, .5);
  }
  .mask-title i {
    color:#fff;
    font-size: 24px;
    margin:0 10px;
  }
  .mask-title i:hover {
    color: #38C546;
  }
  .address-title {
    height: 34px;
    line-height: 34px;
    border-bottom: 1px solid #ddd;
  }
  .address-info p {
    margin: 6px 0;
  }
  .new-address {
    margin-left: -4px;
  }
  .activeAddress {
    box-shadow: 0 0 0 3px #ee4644;
  }
</style>

<style>
.mask-title .el-tag {
  position: relative;
  top: -5px;
  left: -6px;
}
.input-phone-select .el-input-group__prepend {
    width: 150px;
    background-color: #fff;
  }
</style>



