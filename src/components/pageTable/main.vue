<template>
    <div class="page-table">
        <slot></slot>
        <div class="page-table-pagination">
            <template v-if="pagination">
                <el-pagination 
                    background
                    :layout="pageLayout"
                    :total="paginationTotal"
                    :current-page.sync="currentPage"
                    :page-sizes="pageSizes"
                    :page-size="pageSize"
                    @size-change="sizeChange"
                    @current-change="pageChange"
                    :class="align"
                   >
                </el-pagination>
                <div class="text">
                  <span class="text-title">{{title}}</span><span class="text-content">{{text}}</span>
                </div>
            </template>
            <template v-else>
                <slot name="pagination"></slot>
            </template>
        </div>
    </div>
</template>

<script>

export default {
  name: 'vPageTable',
  data() {
    return {

    }
  },
  props: {
    pagination: Boolean,
    paginationAlign: String,
    pageSize: {
      type: Number,
      default: function() {
        return 10
      }
    },
    pageSizes: {
      default: function() {
        return [10, 15, 30, 60, 100]
      }
    },
    paginationTotal: {
      type: Number,
      default: function() {
        return null
      }
    },
    sizeChange: {
      type: Function,
      default: function() {
        return null
      }
    },
    pageChange: {
      type: Function,
      default: function() {
        return null
      }
    },
    pageLayout: {
      default: function() {
        return 'prev, pager, next, jumper'
      }
    },
    title: {
      type: String,
      default: function() {
        return ''
      }
    },
    text: {
      type: String,
      default: function() {
        return ''
      }
    }
  },
  computed: {
    align() {
      let res
      switch (this.paginationAlign) {
        case 'right':
          res = 'textR'
          break
        case 'center':
          res = 'textC'
          break
        default:
          res = ''
      }
      return res
    },
    currentPage: {
      get: function() {
        return this.$store.state.currentPage
      },
      set: function() {
        return this.$store.state.currentPage
      }
    }
  }
}
</script>

<style lang="scss" scoped>
    .page-table{
      padding:0 0 10px 0;
      background:#fff;
    }
    .page-table-pagination{
        position:relative;
        margin-top: 10px;
        text-align: right;
        .text{
            position:absolute;
            left:10px;
            bottom:8px;
            color:red;
            font-size:16px;
            font-weight:bold;
            text-align:left;
            // .text-title{
            //     font-weight:normal;
            // }
        }
    }
</style>