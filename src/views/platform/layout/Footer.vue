<template>
    <div class="foot-main">
        <div class="index-center-content foot-content">
            <div class="list-content">
                <div class="list-item">
                    <p class="list-item-title">热门资讯</p>
                    <ul class="list-item-list list-type-none">
                        <li>
                            <router-link :to="{path:'/index/information', query:{index:0}}">
                                <span>热门资讯</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path:'/index/information', query:{index:1}}">
                                <span>热门新闻</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path:'/index/information', query:{index:2}}">
                                <span>热门企业</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link :to="{path:'/index/information', query:{index:3}}">
                                <span>公告</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
                <div class="list-item">
                    <p class="list-item-title">农特商城</p>
                    <ul class="list-item-list list-type-none">
                        <li v-for="item in navList" :key="item.index">
                            <span>
                                <router-link :to="{path:'/buy/search',query: {bigTypeId: item.id,keyword:item.bigTypeName}}" target="_blank">
                                    {{item.bigTypeName}}
                                </router-link>
                            </span>
                        </li>
                    </ul>
                </div>
                <div class="list-item">
                    <p class="list-item-title">精品民宿</p>
                    <ul class="list-item-list list-type-none">
                        <li><span>西溪南镇</span></li>
                        <li><span>呈坎镇</span></li>
                        <li><span>潜口镇</span></li>
                        <li><span>岩寺镇</span></li>
                        <li><span>杨村乡</span></li>
                        <li><span>富溪乡</span></li>
                        <li><span>洽舍乡</span></li>
                    </ul>
                </div>
                <div class="list-item">
                    <p class="list-item-title">关于我们</p>
                    <ul class="list-item-list list-type-none">
                        <li>
                            <router-link to='/index/us' target="_blank">
                                <span>关于我们</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to="https://xueyuan.maijia.com/m/search/37" target="_blank">
                                <span>电商培训</span>
                            </router-link>
                        </li>
                        <li>
                            <router-link to='/index/cooperation' target="_blank">
                                <span>招商引资</span>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="friendship-link">
                <p class="list-item-title">友情链接</p>
                <ul class="list-item-list list-type-none">
                    <li><span><a href="http://www.langmanhong.cn/" target="_blank">浪漫红文旅</a></span></li>
                    <li><span><a href="http://www.huizhouqu.gov.cn/" target="_blank">徽州区人民政府</a></span></li>
                    <li><span><a href="http://www.xieyudatea.com/" target="_blank">谢裕大茶业</a></span></li>
                    <li><span><a href="https://720yun.com/t/691jvreuuk0?scene_id=18112774" target="_blank">岩寺新四军军部纪念馆</a></span></li>
                    <li><span><a href="http://www.hzqrd.gov.cn/" target="_blank">徽州区人大常委</a></span></li>
                    <li><span><a href="http://www.hzqxfw.gov.cn/XF/index.html" target="_blank">徽州区先锋网</a></span></li>
                    <li><span><a href="https://shop141907998.taobao.com/" target="_blank">花之韵</a></span></li>
                    <li><span><a href="https://youyucy.tmall.com/" target="_blank">有语</a></span></li>
                    <li><span><a href="https://shangyoucy.tmall.com/" target="_blank">赏友</a></span></li>
                    <li><span><a href="https://zhuyixuanjiaju.tmall.com/" target="_blank">竹艺轩</a></span></li>
                    <li><span><a href="https://yuzigui.tmall.com/" target="_blank">裕籽贵</a></span></li>
                    <li><span><a href="https://shop352733966.taobao.com/" target="_blank">黄山徽律</a></span></li>
                </ul>
            </div>
            <div class="foot-copyright">
                <span style="margin-right: 20px">版权所有&copy; 徽州电子商务公共服务中心 All Rights Reserved 2017 jsnx.net</span>
                <span>皖ICP备18011329号-1</span>
            </div>
        </div>
    </div>
</template>

<script>
import { getDetailTypes } from '@/api/buy/buy'
export default {
  data() {
    return {
      navList: []
    }
  },
  methods: {
    init() {
      const this_ = this
      // 获取商品分类详情
      getDetailTypes().then(function(data) {
        if (data.data.code === 200) {
          this_.navList = data.data.data
        }
      })
    }
  },
  mounted() {
    this.init()
  }
}
</script>


<style scoped>
 .foot-main {
    background: #333;
    color: #fff;
 }
 .foot-content {
     padding: 40px 0 30px 150px;
 }
 .list-content {
    display: flex;
    margin-bottom: 40px;
 }
 .list-item {
     flex: 1;
 }
 .list-item-title {
     font-size: 20px;
     color: #e0e0e0;
     margin-bottom: 15px;
 }
 .list-item-list li {
     font-size: 16px;
     line-height: 1.5;
     color: #c6c6c6;
 }
 .list-item-list li span {
     cursor: pointer;
 }
 .list-item-list li span:hover{
     color: #3b6713;
 }
 .friendship-link {
     margin-bottom: 30px;
 }
 .friendship-link .list-item-list {
     width: 100%;
 }
 .friendship-link .list-item-list li {
     display: inline-block;
     margin-right: 50px;
     font-size: 14px;
 }
 .foot-copyright {
     font-size: 12px;
     color: rgba(153, 153, 153, .6)
 }
</style>

