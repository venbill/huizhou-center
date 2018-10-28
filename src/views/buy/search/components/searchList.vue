<template>
    <div class="list-content">
      <div class="list-main center-content bg-white border-box">
        <div class="no-data text-silver">
          <template v-if="goodsList.body.length > 0">
            <el-card class="r-card search-list inline-block" style="width:160px" v-for="child in goodsList.body" :key="child.index">
              <router-link :to="{path:'/buy/detail', query:{id:child.id}}" target="_blank">
                <img :src="child.picture" class="block" style="height:140px;width:140px;margin:0 auto;background:silver">
              </router-link>
              <div style="padding: 10px 10px 4px;font-size:12px;">
                <router-link :to="{path:'/buy/detail', query:{id:child.id}}" target="_blank">
                  <span class="r-card-text text-link-normal" :title="child.name">{{child.name}}</span>
                </router-link>
                <span class="r-b-charge block">{{child.minPrice | pieceFormat}}</span>
              </div>
            </el-card>
            <v-pageTable>
              <template slot="pagination" slot-scope="props">
                <el-pagination 
                  background
                  :total="goodsList.pageTotal"
                  :current-page.sync="goodsList.pageNo"
                  :page-size="goodsList.pageSize"
                  @current-change="pageChange"
                  layout="prev, pager, next, jumper"
                  >
                </el-pagination>
              </template>
            </v-pageTable>
          </template>
          <template v-else>
           抱歉，没有找到与<span class="text-red">“{{searchText}}”</span>相关的商品
          </template>
        </div>
        <div class="hotGoods" v-if="hotGoods.length > 0">
          <div class="hotGoods-title">
            <span style="font-size:18px">热卖区</span>
            <span class="text-link float-right" style="font-size:12px" @click="hotChange">换一换</span>
          </div>
          <div class="hotGoods-content">
            <card-link :body="hotGoods" :width="160" :imgHeight="140" :imgWidth="140"></card-link>
            <!-- <el-card class="r-card goods-list inline-block" style="width:160px" v-for="child in hotGoods" :key="child.index">
              <router-link :to="{path:'/buy/detail', query:{id:child.id}}" target="_blank">
                <img :src="child.picture" class="block" style="height:140px;width:140px;margin:0 auto;background:silver">
              </router-link>
              <div style="padding: 4px 10px;font-size:12px;">
                <router-link :to="{path:'/buy/detail', query:{id:child.id}}" target="_blank">
                  <span class="r-card-text text-link-normal block" :title="child.name">{{child.name}}</span>
                </router-link>
                <span class="r-b-charge block">{{child.minPrice | pieceFormat}}</span>
              </div>
            </el-card> -->
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import util from '@/utils/util'
import CardLink from '@/views/buy/components/cardLink'
import { searchGoods } from '@/api/buy/buy'
export default {
  components: { CardLink },
  data() {
    return {
      searchText: '',
      typeId: '',
      typeStatus: false, // true:大分类，false:小分类
      goodsList: {
        pageTotal: 1000,
        pageNo: 1,
        pageSize: 50,
        body: []
      },
      hotPage: 1,
      hotTotal: 0,
      hotGoods: []
    }
  },
  filters: {
    pieceFormat(value) {
      return util.pieceFormat(value)
    }
  },
  methods: {
    init() {
      this.getTable()
      this.getHot(1)
    },

    // 热卖切换
    hotChange() {
      this.hotPage++
      let num = this.hotPage
      if (num > this.hotTotal) {
        num = 1
      }
      this.getHot(num)
    },
    // 热卖查询
    getHot(pageNo) {
      this.hotPage = pageNo
      const this_ = this
      const params = {
        tagId: 1,
        pageNo: pageNo,
        pageSize: 6
      }
      searchGoods(params).then(function(data) {
        if (data.data.code === 200) {
          this_.hotTotal = Math.ceil(data.data.data.total / 6)
          this_.hotGoods = data.data.data.results
        }
      })
    },
    // 分页查询
    getTable(val) {
      const this_ = this
      let params
      if (val) {
        params = {
          content: val,
          pageNo: this.goodsList.pageNo,
          pageSize: this.goodsList.pageSize
        }
      } else {
        if (this.typeId === '') {
          params = {
            content: this.searchText,
            pageNo: this.goodsList.pageNo,
            pageSize: this.goodsList.pageSize
          }
        } else {
          if (this.typeStatus) {
            params = {
              bigTypeId: this.typeId,
              pageNo: this.goodsList.pageNo,
              pageSize: this.goodsList.pageSize
            }
          } else {
            params = {
              smallTypeId: this.typeId,
              pageNo: this.goodsList.pageNo,
              pageSize: this.goodsList.pageSize
            }
          }
        }
      }
      searchGoods(params).then(function(data) {
        if (data.data.code === 200) {
          this_.goodsList.pageTotal = data.data.data.total
          this_.goodsList.body = data.data.data.results
        }
      })
    },

    // 当前页数变化
    pageChange(val) {
      this.goodsList.pageNo = val
      this.getTable()
    }
  },

  mounted() {
    const bigTypeId = this.$route.query.bigTypeId
    const smallTypeId = this.$route.query.smallTypeId
    if (bigTypeId === undefined && smallTypeId === undefined) {
      this.searchText = this.$route.query.keyword
    } else {
      this.searchText = ''
      if (bigTypeId !== undefined) {
        this.typeStatus = true
        this.typeId = bigTypeId
      } else if (smallTypeId !== undefined) {
        this.typeStatus = false
        this.typeId = smallTypeId
      }
    }
    this.init()
  }
}
</script>

<style scoped>
.list-content {
  width: 100%;
}
.list-main {
  padding: 20px;
}
.no-data {
  font-size: 12px;
}
.hotGoods {
  margin-top: 30px;
}
.hotGoods-content {
  border: 1px solid #ddd;
  margin-top: 10px;
  padding: 25px 30px;
}
.search-list {
  margin: 0 33px 20px 0;
}
.goods-list {
  margin-bottom: 20px;
}
.goods-list:not(:last-child) {
  margin-right: 20px;
}
.r-card-text {
  display: inline-block;
  line-height: 1.4;
  height: 34px;
  overflow: hidden;
}
.r-b-charge {
  font-size: 16px;
  font-weight: bold;
  color: red;
}
</style>

<style>
.goods-list .el-card__body {
  padding: 10px 0;
}
.search-list .el-card__body {
  padding: 10px 0;
}
</style>