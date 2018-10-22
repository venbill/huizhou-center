<template>
    <div class="car-content">
      <template v-if="goodsInfo.goodsList.length > 0">
        <!-- <div class="center-content goods-type">
          <el-button class="btn-hover-red">全部商品</el-button>
          <el-button class="btn-hover-red">限时优惠</el-button>
          <el-button class="btn-hover-red">库存紧张</el-button>
        </div> -->
        <div class="center-content border-box bg-white table-title">
          <div class="item" style="width:50px">
            <el-checkbox v-model="allCheck" style="margin-left:-8px" @change="isAll"></el-checkbox>
            全选
          </div>
          <div class="item" style="width:350px">
            商品
          </div>
          <div class="item" style="width:160px">
            商品信息
          </div>
          <div class="item" style="width:160px">
            单价
          </div>
          <div class="item" style="width:160px">
            数量
          </div>
          <div class="item" style="width:160px">
            小计
          </div>
          <div class="item" style="width:140px">
            操作
          </div>
        </div>
        <div class="center-content table-shop" v-for="(item, index) in goodsInfo.goodsList" :key="item.index">
          <div class="table-shopName">
            <!-- <el-checkbox></el-checkbox> -->
            {{item.shopName}}
            <span class="inline-block text-link" style="margin-left:40px">
              联系客服
            </span>
          </div>
          <div class="table-goods">
            <div class="item flex-middle" style="width:50px;">
              <el-checkbox v-model="checkGoods[index]" @change="singleChange"></el-checkbox>
            </div>
            <div class="item" style="width:350px">
              <img :src="item.picture" style="height:100px;width:100px;border:1px solid #ddd;float:left;margin-right:20px">
              <div class="text-link">{{item.goodsName}}</div>
            </div>
            <div class="item flex-middle" style="width:160px;overflow:hidden">
              <p>{{item.goodsAttributesValuesContent}}</p>
            </div>
            <div class="item flex-middle" style="width:160px;">
              <p>{{item.price}}</p>
            </div>
            <div class="item flex-middle flex-center" style="width:160px;">
              <el-input-number size="mini" v-model="item.buyNo" :min="1" @change="numChange(item)"></el-input-number>
            </div>
            <div class="item flex-middle" style="width:160px;">
              <p>{{priceCount(item.price, item.buyNo)}}</p>
            </div>
            <div class="item flex-middle flex-center" style="width:140px;">
              <el-button type="text" @click="confirmDelete('single', item.buyCarId)">删除</el-button>
            </div>
          </div>
        </div>
        <div class="center-content table-foot bg-white border-box">
          <el-checkbox v-model="allCheck" @change="isAll"></el-checkbox>
          全选
          <el-button type="text" style="margin-left: 40px" @click="confirmDelete('all')">删除</el-button>
          
          <el-button class="btn-red" @click="toPayConfirm"
           style="float:right;height:100%;width:200px;margin-left:20px;font-size:18px">去付款</el-button>
          <span style="float:right">
            共有
            <span class="text-red" style="font-size:18px">{{goodsNum}}</span>
            款产品，总计（不含运费）
            <span class="text-red" style="font-size:22px;margin-left:20px">{{totalCount | pieceFormat}}</span>
          </span>
        </div>
      </template>
      <template>
        <div class="content-box" style="padding:20px; color:#333">
          暂无商品
        </div>
      </template>
    </div>
</template>

<script>
import util from '@/utils/util'
import { getGoodsList, singleDelete, someDelete, numChenge } from '@/api/buy/buy'
export default {
  data() {
    return {
      shoppingCart: {
        table: [
          {
            goods: '商品',
            goodsInfo: '商品信息',
            unitPrice: '单价',
            number: '数量',
            subtotal: '小计'
          }
        ]
      },
      goodsInfo: {
        pageNo: 1,
        pageSize: 100,
        paginationTotal: 0,
        goodsList: []
      }, // 购物车商品列表
      totalCount: '', // 所有选中商品总价
      goodsNum: 0, // 选中商品数量
      shoppingCartNum: '', // 购物车数量
      checkGoods: [], // 所有商品是否选中的状态列表
      deleteGoods: [], // 要删除的商品数组
      allCheck: false,
      num1: 1
    }
  },
  filters: {
    pieceFormat(value) {
      return util.pieceFormat(value)
    }
  },
  methods: {
    // 表头回调函数
    headerBg: function(row) {
      return { 'background': '#f5f7fa', 'color': '#1F2D3D' }
    },
    getGoodsList() {
      const this_ = this
      const params = {
        pageNo: this.goodsInfo.pageNo,
        pageSize: this.goodsInfo.pageSize
      }
      getGoodsList(params).then(function(data) {
        if (data.data.code === 200) {
          this_.goodsInfo.goodsList = data.data.data.results
          this_.goodsInfo.paginationTotal = data.data.total
          this_.goodsInfo.goodsList.forEach(function() {
            this_.checkGoods.push(false)
          })
        }
      })
    },
    // 计算单个商品总价
    priceCount(price, num) {
      const one = price * 100
      const totalPrice = (one * num) / 100
      return totalPrice
    },
    // 计算所有选中商品总价
    priceTotal() {
      const this_ = this
      this.$nextTick(function() {
        let totalPrice = 0
        this_.goodsInfo.goodsList.forEach(function(e) {
          this_.deleteGoods.forEach(function(m) {
            if (e.buyCarId === m.buyCarId) {
              const price = e.price * 100 * e.buyNo
              totalPrice = totalPrice + price
            }
          })
        })
        this_.totalCount = totalPrice / 100
      })
    },
    // 数量改变
    numChange(item) {
      // const this_ = this
      this.$nextTick(function() {
        numChenge(item.buyCarId, item.buyNo)
      })
    },
    // 是否全选
    isAll(val) {
      for (let i = 0; i < this.checkGoods.length; i++) {
        this.checkGoods[i] = val
      }
      this.setDeleteGoods()
    },
    // 单个勾选
    singleChange() {
      // 把选中的数据存入提交数组中
      this.setDeleteGoods()
      // 勾选数组处理
      for (let i = 0; i < this.checkGoods.length; i++) {
        if (this.checkGoods[i]) {
          this.allCheck = true
        } else {
          this.allCheck = false
          return
        }
      }
    },
    // 把选中的数据存入提交数组中
    setDeleteGoods() {
      this.deleteGoods = []
      for (let i = 0; i < this.checkGoods.length; i++) {
        if (this.checkGoods[i]) {
          this.deleteGoods.push(this.goodsInfo.goodsList[i])
        }
      }
      this.goodsNum = this.deleteGoods.length
      this.priceTotal()
    },
    // 删除确认
    confirmDelete(string, id) {
      let message
      if (string === 'single') {
        message = '确认删除当前商品？'
      } else if (string === 'all') {
        if (this.deleteGoods.length <= 0) {
          this.$message.info('请先选中商品')
          return
        } else {
          message = '确认删除所有选中的商品？'
        }
      }
      this.$confirm(message, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        if (string === 'single') {
          this.singleDelete(id)
        } else if (string === 'all') {
          this.someDelete()
        }
      }).catch(() => {

      })
    },
    // 单个删除
    singleDelete(id) {
      const this_ = this
      singleDelete(id).then(function(data) {
        if (data.data.code === 200) {
          this_.getGoodsList()
          this_.goodsNumber()
          this_.$message.success('删除成功')
        }
      })
    },
    // 多个删除
    someDelete() {
      const this_ = this
      const deleteArr = []
      this.deleteGoods.forEach(function(e) {
        deleteArr.push(e.buyCarId)
      })
      const params = {
        buyCarIdList: deleteArr
      }
      someDelete(params).then(function(data) {
        if (data.data.code === 200) {
          this_.getGoodsList()
          this_.goodsNumber()
          this_.$message.success('删除成功')
        }
      })
    },
    // 重新获取购物车数量
    goodsNumber() {
      this.$emit('goodsNumber')
    },
    // 跳转支付确认
    toPayConfirm() {
      if (this.deleteGoods.length > 0) {
        // 选中商品添加到缓存
        localStorage.setItem('shopInfo', JSON.stringify(this.deleteGoods)) // 存入缓存
        // 跳转路由
        this.$router.push(
          {
            path: '/buy/pay/pay_confirm',
            query: {
              type: 2
            }
          }
        )
      } else {
        this.$message.info('请先勾选商品')
      }
    }
  },

  mounted() {
    this.getGoodsList()
  }
}
</script>

<style scoped>
.car-content {
  width: 100%;
  margin-top: 20px;
}
.goods-type {
  padding: 20px 0;
}
.table-title {
  padding: 10px 10px;
}
.table-title .item {
  float: left;
  font-size: 12px;
  text-align: center;
}
.table-shop {
  width: 1200px;
  margin: 0 auto;
}
.table-shopName {
  padding: 15px 10px;
  font-size: 12px;
  background: #eee;
}
.table-goods {
  padding: 15px 10px;
  height: 100px;
  clear: both;
  font-size: 12px;
  border-bottom: 1px solid #ddd;
  background: #fff;
}
.table-goods .item {
  float: left;
  height: 100%;
}
.table-goods .item p {
  width: 100%;
  text-align: center;
}
.table-foot {
  height: 54px;
  line-height: 50px;
  font-size: 12px;
  margin: 40px auto;
  padding: 0 0 0 10px;
}
</style>