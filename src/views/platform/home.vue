<template>
  <div class="layout-main">
    <!--banner轮播-->
    <div>
      <el-carousel height="400px">
        <el-carousel-item>
          <router-link :to="{path:'/buy/search',query: {bigTypeId: 6,keyword:'扶贫产品'}}">
            <img src="http://47.105.95.162:81/M00/00/00/rB-mAFvWZbmAYno4AAPHqIYj6qs805.png"/>
          </router-link>
        </el-carousel-item>
        <el-carousel-item>
          <a href="https://xueyuan.maijia.com/m/search/37"  target="_blank">
            <img src="http://47.105.95.162:81/M00/00/00/rB-mAFvWZeOAECVQAAZtwVf3CqI955.png" />
          </a>
        </el-carousel-item>
        <el-carousel-item>
          <router-link :to="{path:'/index/information/detail', query:{id: 17}}">
            <img src="http://47.105.95.162:81/M00/00/00/rB-mAFvWZf-AIU8dAAJ30hiiYxQ743.png" />
          </router-link>
        </el-carousel-item>
      </el-carousel>
    </div>
    <!--内容-->
    <div class="index-center-content layout-content img-box">
      <div class="news-box">
        <div class="layout-box" style="height:40px;background:#f5f5f5;"></div>
        <div class="layout-box layout-module">
          <router-link to="/buy">
            <div class="module-item">
              <img src="/static/images/index/mall.png"/>
              <span>商城</span>
            </div>
          </router-link>
          <router-link to="/index/homestay">
            <div class="module-item">
              <img src="/static/images/index/homestay.png"/>
              <span>民宿</span>
            </div>
          </router-link>
          <a href="https://xueyuan.maijia.com/m/search/37" target="_blank">
            <div class="module-item">
              <img src="/static/images/index/train.png"/>
              <span>培训</span>
            </div>
          </a>
          <router-link to="/index/cooperation">
            <div class="module-item" style="margin-right:0;">
              <img src="/static/images/index/cooperation.png"/>
              <span>招商</span>
            </div>
          </router-link>
        </div>
        <div class="layout-box layout-news">
          <div class="information">
            <div class="information-title">
              <div class="information-title-item" v-for="(item, index) in news" :key="item.index"
              :class="{active:newsIndex === index}"
              @click="newsIndexChange(index)">{{item.title}}</div>
            </div>
            <div class="information-list">
              <template v-if="newsIndex === 0">
                <template v-if="informationList.length > 0">
                  <ul class="infor-list-item">
                    <li v-for="item in informationList" :key="item.index">
                      <span class="text-ellipsis inline-block" style="width: 400px;float:left;" :title="item.title">
                        <router-link :to="{path:'/index/information/detail', query:{id: item.id}}" class="link-underline">
                          {{item.title}}
                        </router-link>
                      </span>
                      <span class="float-right">{{getName_date(item.createTime)}}</span>
                    </li>
                  </ul>
                  <div class="information-img">
                    <router-link :to="{path:'/index/information/detail', query:{id: informationList[0].id}}">
                      <img :src="informationList[0].headerPicture">
                    </router-link>
                  </div>
                </template>
                <template v-else>
                  <div class="no-data">暂无数据</div>
                </template>
              </template>
              <template v-else-if="newsIndex === 1">
                <template v-if="newsList.length > 0">
                  <ul class="infor-list-item">
                    <li v-for="item in newsList" :key="item.index">
                      <span class="text-ellipsis inline-block" style="width: 400px;float:left;" :title="item.title">
                        <router-link :to="{path:'/index/information/detail', query:{id: item.id}}" class="link-underline">
                          {{item.title}}
                        </router-link>
                      </span>
                      <span class="float-right">{{getName_date(item.createTime)}}</span>
                    </li>
                  </ul>
                  <div class="information-img">
                    <router-link :to="{path:'/index/information/detail', query:{id: newsList[0].id}}">
                      <img :src="newsList[0].headerPicture">
                    </router-link>
                  </div>
                </template>
                <template v-else>
                  <div class="no-data">暂无数据</div>
                </template>
              </template>
            </div>
          </div>
          <div class="service">
            <div class="module-title">
              <span class="module-title-item">电商服务</span>
            </div>
            <div class="service-img">
              <div class="img-item" style="margin-right: 2px;">
                <a href='http://www.ekey365.com/index.php?c=article&a=type&tid=38&from=groupmessage&isappinstalled=0'>
                  <img src="/static/images/index/enterprise.png">
                  <p class="img-title">企业孵化</p>
                </a>
              </div>
              <div class="img-item">
                <a href="https://xueyuan.maijia.com/m/search/37">
                  <img src="/static/images/index/online_retailers.png">
                  <p class="img-title">电商培训</p>
                </a>
              </div>
            </div>
          </div>
          <div class="notice">
            <div class="module-title">
              <span class="module-title-item">公告</span>
              <div class="float-right">
                <router-link :to="{path:'/index/information', query:{index:3}}">
                  <span class="text-more">查看更多 ></span>
                </router-link>
              </div>
            </div>
            <div class="information-list">
              <template v-if="noticeList.length > 0">
                <ul class="notice-list-item">
                  <li v-for="item in noticeList" :key="item.index">
                    <span class="text-ellipsis inline-block" style="width:300px;float:left;" :title="item.title">
                      <router-link :to="{path:'/index/information/detail', query:{id: item.id}}" class="link-underline">
                        {{item.title}}
                      </router-link>
                    </span>
                    <span class="float-right">{{getName_date(item.createTime)}}</span>
                  </li>
                </ul>
              </template>
              <template v-else>
                <div class="no-data">暂无数据</div>
              </template>
            </div>
          </div>
        </div>
      </div>
      <div class="mien-box layout-box bg-white">
        <div class="mien-title">
          <span class="mien-title-text">中心风采</span>
        </div>
        <el-carousel indicator-position="outside" height="180px">
          <el-carousel-item v-for="item in centerImg" :key="item.index">
            <div class="mien-img-item" v-for="child in item" :key="child.index">
              <img :src="child.url"/>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="mien-box layout-box bg-white">
        <div class="mien-title">
          <span class="mien-title-text">地方特色</span>
          <div class="mien-sub-title">
            <span class="sub-text" :class="{active:subIndex === index}"
             v-for="(item, index) in subTitle" :key="item.index" @click="subTitleChange(index)">{{item.title}}</span>
          </div>
        </div>
        <template v-if="subIndex === 0">
          <el-carousel indicator-position="outside" height="180px">
            <el-carousel-item v-for="item in farmProduceList" :key="item.index">
              <div class="mien-img-item" v-for="child in item" :key="child.index">
                <img :src="child.url"/>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
        <template v-else-if="subIndex === 1">
          <el-carousel indicator-position="outside" height="180px">
            <el-carousel-item v-for="item in homestayList" :key="item.index">
              <div class="mien-img-item" v-for="child in item" :key="child.index">
                <img :src="child.url"/>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
      </div>
    </div>
    <!--底部盒子，起到间距作用-->
    <div class="index-center-content" style="height:70px;background:#f5f5f5;"></div>
  </div>
</template>

<script>
import util from '@/utils/util'
import { getNews } from '@/api/index/index'
export default {
  data() {
    return {
      news: [
        {
          title: '热门资讯'
        },
        {
          title: '热门新闻'
        }
      ], // 资讯、新闻标题
      newsIndex: 0,
      informationList: [], // 资讯列表
      newsList: [], // 新闻列表
      noticeList: [], // 公告列表
      centerImg: [
        [
          {
            url: '/static/images/center/1.jpg'
          },
          {
            url: '/static/images/center/2.jpg'
          },
          {
            url: '/static/images/center/3.jpg'
          },
          {
            url: '/static/images/center/4.jpg'
          }
        ],
        [
          {
            url: '/static/images/center/5.jpg'
          },
          {
            url: '/static/images/center/6.jpg'
          },
          {
            url: '/static/images/center/7.jpg'
          },
          {
            url: '/static/images/center/8.jpg'
          }
        ],
        [
          {
            url: '/static/images/center/9.jpg'
          },
          {
            url: '/static/images/center/10.jpg'
          },
          {
            url: '/static/images/center/11.jpg'
          },
          {
            url: '/static/images/center/12.jpg'
          }
        ]
      ], // 中心风采图片列表
      farmProduceList: [
        [
          {
            url: '/static/images/farm/1.jpg'
          },
          {
            url: '/static/images/farm/2.jpg'
          },
          {
            url: '/static/images/farm/3.jpg'
          },
          {
            url: '/static/images/farm/4.jpg'
          }
        ],
        [
          {
            url: '/static/images/farm/5.jpg'
          },
          {
            url: '/static/images/farm/6.jpg'
          },
          {
            url: '/static/images/farm/7.jpg'
          },
          {
            url: '/static/images/farm/8.jpg'
          }
        ]
      ], // 农产品图片列表
      homestayList: [
        [
          {
            url: '/static/images/homestay/1.jpg'
          },
          {
            url: '/static/images/homestay/2.jpg'
          },
          {
            url: '/static/images/homestay/3.jpg'
          },
          {
            url: '/static/images/homestay/4.jpg'
          }
        ],
        [
          {
            url: '/static/images/homestay/5.jpg'
          },
          {
            url: '/static/images/homestay/6.jpg'
          },
          {
            url: '/static/images/homestay/7.jpg'
          },
          {
            url: '/static/images/homestay/8.jpg'
          }
        ],
        [
          {
            url: '/static/images/homestay/9.jpg'
          },
          {
            url: '/static/images/homestay/10.jpg'
          },
          {
            url: '/static/images/homestay/11.png'
          },
          {
            url: '/static/images/homestay/12.png'
          }
        ]
      ], // 民宿图片列表
      subIndex: 0, // 地方特色子标题索引
      subTitle: [
        {
          title: '农特产品'
        },
        {
          title: '精品民宿'
        }
      ] // 地方特色子标题
    }
  },
  methods: {
    init() {
      this.getNews(1)
      this.getNews(2)
      this.getNews(3)
    },
    // 资讯获取 1 热门资讯 2 公告 3 热门新闻 4 热门企业 5 讲师资料 6 培训资讯
    getNews(type) {
      const this_ = this
      const params = {
        pageNo: 1,
        pageSize: 10,
        type: type
      }
      getNews(params).then(function(data) {
        if (data.data.code === 200) {
          let arr = []
          if (data.data.data.results.length > 6) {
            arr = data.data.data.results.slice(0, 6)
          } else {
            arr = data.data.data.results
          }
          if (type === 1) {
            this_.informationList = arr
          } else if (type === 2) {
            this_.noticeList = arr
          } else if (type === 3) {
            this_.newsList = arr
          }
        }
      })
    },
    // 日期时间处理
    getName_date(date) {
      if (date) {
        return util.formatDate.format(new Date(date), 'yyyy-MM-dd')
      }
    },
    // 新闻、资讯切换
    newsIndexChange(index) {
      this.newsIndex = index
    },
    // 地方特色子标题切换
    subTitleChange(index) {
      this.subIndex = index
    }
  },
  mounted() {
    this.init()
  }
}
</script>

<style scoped>
  .layout-main {
    height: auto;
  }
  img {
    height: 100%;
    width: 100%;
  }
  .layout-content {
    background: #f5f5f5;
  }
  .no-data {
    padding: 200px;
    text-align: center;
  }
  .news-box {
    margin-bottom: 30px;
  }
  .layout-box {
    margin: 0 auto;
    background: #f5f5f5;
    width: 1180px;
  }
  .layout-module {
    height: 260px;
    background: url('/static/images/index/module_bg.png') no-repeat 100%;
  }
  .module-item {
    height: 200px;
    width: 150px;
    text-align: center;
    display: inline-block;
  }
  .module-item img{
    display: block;
    width: 150px;
    height: 150px;
    margin-bottom: 30px;
  }
  .module-item span {
    font-size: 22px;
    color: #333;
  }
  .module-item{
    margin: 0 70px;
  }
  .layout-news {
    height: 634px;
    box-sizing: content-box;
  }
  .information, .service, .notice {
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
  }
  .information {
    height: 634px;
    float: left;
    width: 666px;
  }
  .information-title, .module-title {
    font-size: 24px;
    color: #333;
    border-bottom: 2px solid #f5f5f5;
    height: 70px;
    line-height: 70px;
    clear: both;
  }
  .module-title {
    padding: 0 30px;
  }
  .module-title-item {
    border-left: 6px solid #3b6713;
    padding-left: 10px;
    line-height: 70px;
  }
  .information-title.active {
    color: #3b6713;
  }
  .information-title-item {
    float: left;
    width:50%;
    height: 70px;
    line-height: 70px;
    text-align: center;
    cursor: pointer;
  }
  .information-title-item.active {
    border-bottom: 4px solid #3b6713;
  }
  .information-list {
    font-size: 14px;
  }
  .infor-list-item {
    padding: 40px 40px 10px 55px;
    font-size: 14px;
    color: #666;
  }
  .infor-list-item li {
    padding: 0;
    margin-bottom: 25px;
  }
  .information-img {
    height: 250px;
    width: 624px;
    margin: 0 auto;
    overflow: hidden;
  }
  .information-img img {
    width: 100%;
    height: auto;
  }
  .service, .notice {
    width: 482px;
    float: right;
  }
  .service {
    margin-bottom: 30px;
    height: 260px;
  }
  .service-img .img-item {
    width: 240px;
    height: 190px;
    float: left;
    position: relative;
  }
  .service-img .img-item .img-title {
    position: absolute;
    bottom: 25px;
    width: 240px;
    text-align: center;
    z-index: 10;
    color: #fff;
    font-size: 24px;
  }
  .service-img a {
    display: block;
    width: 240px;
    height: 190px;
  }
  .service-img img {
    width: 240px;
  }
  .notice {
    height: 342px;
  }
  .notice-list-item {
    padding: 30px 40px 10px 55px;
  }
  .notice-list-item li {
    padding: 0;
    margin-bottom: 22px;
  }
  .mien-box {
    height: 400px;
    padding-top: 40px;
    background: #fff;
    text-align: center;
  }
  .mien-box:not(:last-child) {
    margin-bottom: 40px;
  }
  .mien-title {
    height: 50px;
    margin-bottom: 50px;
  }
  .mien-title-text {
    display: block;
    width: 508px;
    height: 50px;
    line-height: 50px;
    margin: 0 auto;
    text-align: center;
    font-size: 18px;
    color: #217d33;
    background: url('/static/images/index/mien_bg.png') no-repeat;
  }
  .mien-img-item {
    display: inline-block;
    height: 180px;
    width: 275px;
    margin-right: 10px;
  }
  .mien-sub-title {
    margin-top: 20px;
    font-size: 14px;
    color: #333;
    text-align: center;
  }
  .mien-sub-title .sub-text {
    margin: 40px;
    cursor: pointer;
  }
  .mien-sub-title .sub-text.active {
    color: #3b6713;
  }
</style>



