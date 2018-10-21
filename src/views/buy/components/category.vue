<template>
  <div class="category-main">
    <el-collapse class="search-type" v-model="activeName">
      <el-collapse-item :title="title" :name="name">
        <div class="type-item" :class="{ bgColor: routeIndex === index}"
           v-for="(item, index) in data" :key="item.id" @click="routeFocus(item, index)">{{item.typeName}}</div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
export default {
  name: 'category',
  props: {
    title: '', // 标题
    name: {
      type: String,
      default: '0'
    },
    data: {
      tyep: Array,
      default: function() {
        return []
      }
    },
    is_blank: {
      type: Boolean,
      default: true
    } // 是否新窗口打开
  },
  data() {
    return {
      activeName: ['0'],
      routeIndex: -1
    }
  },
  methods: {
    routeFocus(item, index) {
      this.routeIndex = index
      const div = document.getElementsByClassName('type-item')
      const nowIndex = this.$route.query.index
      if (nowIndex !== undefined) {
        div[nowIndex].classList.remove('bgColor')
      }
      // 是否新窗口打开
      if (this.is_blank) {
        // 店铺商品分类
        localStorage.setItem('goodsClass', JSON.stringify(this.data)) // 存入缓存
        const routeData = this.$router.resolve({
          path: '/buy/my_shop',
          query: {
            index: index,
            shopType: item.id,
            shopId: item.shopId
          }
        })
        window.open(routeData.href, '_blank')
      } else {
        this.setIndex(item.id, index)
      }
    },
    // 列表选中
    setIndex(id) {
      this.$emit('setIndex', id)
    },
    // 获取商品分类
    getGoodsClass() {
      const arr = JSON.parse(localStorage.getItem('goodsClass'))
      const item = {
        data: arr,
        title: '商品分类'
      }
      this.$emit('getGoodsClass', item)

      // 列表选中
      setTimeout(() => {
        const div = document.getElementsByClassName('type-item')
        const index = this.$route.query.index
        this.routeIndex = index
        if (index !== undefined) {
          div[index].classList.add('bgColor')
        }
      }, 200)
    }
  },

  mounted() {
    if (this.data.length <= 0) {
      // this.data = JSON.parse(localStorage.getItem('goodsClass'))
      this.getGoodsClass()
    }
  }
}
</script>

<style scoped>
.category-main {
  width: 100%;
}
.search-type {
  width: 100%;
  border: 1px solid #ddd;
  margin: 0 auto;
  padding: 0;
  background: transparent;
}
.search-title {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding: 0 5px;
  background: #f7f7f7;
}
.search-title {
  height: 36px;
  line-height: 36px;
  font-size: 14px;
  border-bottom: 1px solid #ddd;
  padding: 0 5px;
  background: #f7f7f7;
}
.search-type .type-item {
  background: #F5F5F5;
  height: 36px;
  line-height: 36px;
  padding-left: 40px;
  font-size: 12px;
  cursor: pointer;
}
.search-type .type-item:not(:last-child) {
  border-bottom: 1px solid #ddd
}
.bgColor{
  background:#ddd!important;
}
.search-type .el-collapse-item__content .type-item:hover{
  background: #ddd;
}
</style>

<style>
.search-type .el-collapse-item {
  padding: 0;
}
.search-type .el-collapse-item .el-collapse-item__header {
  padding-left: 10px;
}
.search-type .el-collapse-item__content{
  padding-bottom: 0;
}
</style>
