<template>
  <div class="address-main">
    <div class="address-item pointer" :class="{activeAddress: activeAddress === index}"
     v-for="(item, index) in 4" :key="item.index"
     @click="addressChoose(index)"
     @mouseenter="chengeIndex(index)" @mouseleave="chengeIndex(-1)">
      <div class="address-title">
        <span class="name">王京</span>
        <!--默认标签-->
        <el-tag class="float-right">公司</el-tag>
        <el-tag class="float-right" style="margin-right:20px" type="success" v-if="index === 0">默认收货地址</el-tag>
      </div>
      <div class="address-info">
        <p class="text-black">15869111464</p>
        <p>浙江省 杭州市 滨江区</p>
        <p>江南大道288号康恩贝大厦B座</p>
      </div>
      <!--弹出层-->
      <div class="mask-box" v-if="addressIndex === index">
        <div class="mask-title">
          <el-tag type="success" v-if="index === 0">默认收货地址</el-tag>
          <i class="iconfont" title="设为默认收货地址" v-if="index !== 0">&#xe636;</i>
          <i class="iconfont" title="修改" @click="editAddress">&#xe7c9;</i>
          <i class="iconfont" title="删除" @click="deletePop = true">&#xe624;</i>
        </div>
      </div>
    </div>
    <div class="address-item pointer new-address" @click="addAddress">
      <div style="margin-top:40px;text-align:center;">
        <i class="iconfont" style="font-size:34px">&#xe662;</i>
        <p>使用新地址</p>
      </div>
    </div>
    <!--删除确认弹窗-->
    <el-dialog :visible.sync="deletePop" width="300px" :show-close="false" center class="text-center">
      <span style="text-align:center">确认删除？</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="deletePop=false">取 消</el-button>
        <el-button type="primary" @click="confirmDelete">确 定</el-button>
      </span>
    </el-dialog>
    <!--新增、编辑弹窗-->
    <el-dialog :title="popTitle" :visible.sync="popStatus" width="500px">
      <el-form :model="popData" :rules="popRules" ref="popForm" label-width="110px">
        <el-form-item label="地址信息：" prop="address">
          <el-input v-model="popData.address" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="详细地址：" prop="addressDetail">
          <el-input v-model="popData.addressDetail" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮政编码：" prop="zipCode">
          <el-input v-model.number="popData.zipCode"></el-input>
        </el-form-item>
        <el-form-item label="收货人姓名：" prop="name">
          <el-input v-model="popData.name"></el-input>
        </el-form-item>
        <el-form-item label="手机号码:" prop="phone">
          <el-input placeholder="请输入手机号" v-model.number="popData.phone" class="input-phone-select">
            <el-select v-model="phoneType" slot="prepend" placeholder="请选择">
              <el-option label="中国大陆 +86" value="1"></el-option>
              <el-option label="香港 +852" value="2"></el-option>
              <el-option label="澳门 +853" value="3"></el-option>
              <el-option label="台湾 +886" value="3"></el-option>
            </el-select>
          </el-input>
        </el-form-item>
        <el-form-item label="" prop="chooose">
          <el-checkbox v-model="popData.chooose">设置为默认收货地址</el-checkbox>
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
export default {
  data() {
    return {
      popRules: {
        address: [
          { required: true, message: '请选择地址', trigger: 'change' }
        ],
        addressDetail: [
          { required: true, message: '请输入详细地址', trigger: 'blur' }
        ],
        name: [
          { required: true, message: '请输入收货人姓名', trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '请输入手机号码', trigger: 'blur' }
        ]
      },
      popData: {
        address: '',
        addressDetail: '',
        zipCode: '',
        name: '',
        phone: '',
        chooose: false
      },
      popTitle: '新增地址',
      addressIndex: -1, // 鼠标移入索引
      activeAddress: -1, // 选中收货地址索引
      deletePop: false,
      popStatus: false,
      phoneType: '1'
    }
  },
  methods: {
    chengeIndex(index) {
      this.addressIndex = index
    },
    // 选择收货地址
    addressChoose(index) {
      this.activeAddress = index
    },
    // 新增
    addAddress() {
      this.popTitle = '新增收货地址'
      this.popStatus = true
    },
    // 编辑
    editAddress() {
      this.popTitle = '修改收货地址'
      this.popStatus = true
    },
    // 删除
    confirmDelete() {

    },
    // 提交表单
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          console.log('验证通过')
        } else {
          return false
        }
      })
    },
    // 重置表单
    resetForm(formName) {
      this.$refs[formName].resetFields()
      this.popData = {
        address: '',
        addressDetail: '',
        zipCode: '',
        name: '',
        phone: '',
        chooose: false
      }
    }
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



