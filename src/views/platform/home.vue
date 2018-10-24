<template>
  <div class="layout-main">
    <!--banner轮播-->
    <div class="index-center-content">
      <el-carousel height="400px">
        <el-carousel-item>
          <img src="/static/images/index/banner.png"/>
        </el-carousel-item>
        <el-carousel-item>
          <img src="/static/images/index/banner.png" />
        </el-carousel-item>
        <el-carousel-item>
          <img src="/static/images/index/banner.png" />
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
          <router-link to="/index/shop">
            <div class="module-item">
              <img src="/static/images/index/train.png"/>
              <span>培训</span>
            </div>
          </router-link>
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
                <ul class="infor-list-item">
                  <li v-for="item in informationList" :key="item.index">
                    <span>
                      <router-link to="/index/information/detail" target="_blank" class="link-underline">
                        {{item.title}}
                      </router-link>
                    </span>
                    <span class="float-right">{{item.time}}</span>
                  </li>
                </ul>
                <div class="information-img">
                  <router-link to="/index/information/detail" target="_blank">
                    <img :src="informationImg">
                  </router-link>
                </div>
              </template>
              <template v-else-if="newsIndex === 1">
                <ul class="infor-list-item">
                  <li v-for="item in newsList" :key="item.index">
                    <span>
                      <router-link to="/index/information/detail" target="_blank" class="link-underline">
                        {{item.title}}
                      </router-link>
                    </span>
                    <span class="float-right">{{item.time}}</span>
                  </li>
                </ul>
                <div class="information-img">
                  <router-link to="/index/information/detail" target="_blank">
                    <img :src="newsImg">
                  </router-link>
                </div>
              </template>
            </div>
          </div>
          <div class="service">
            <div class="module-title">
              <span class="module-title-item">电商服务</span>
            </div>
            <div class="service-img">
              <router-link to="/index/information/detail">
                <img src="/static/images/index/enterprise.png" style="margin-right:2px">
              </router-link>
              <router-link to="/index/shop">
                <img src="/static/images/index/online_retailers.png">
              </router-link>
            </div>
          </div>
          <div class="notice">
            <div class="module-title">
              <span class="module-title-item">公告</span>
              <div class="float-right">
                <!-- <router-link to="/index/information" target="_blank"> -->
                  <span class="text-more">查看更多 ></span>
                <!-- </router-link> -->
              </div>
            </div>
            <div class="information-list">
              <ul class="notice-list-item">
                <li v-for="item in noticeList" :key="item.index">
                  <span>
                    <router-link to="/index/information/detail" target="_blank" class="link-underline">
                      {{item.title}}
                    </router-link>
                  </span>
                  <span class="float-right">{{item.time}}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="mien-box layout-box bg-white">
        <div class="mien-title">
          <span class="mien-title-text">中心风采</span>
        </div>
        <el-carousel indicator-position="outside" height="180px">
          <el-carousel-item>
            <div class="mien-img-item" v-for="item in mienList" :key="item.index">
              <img :src="item.url"/>
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
            <el-carousel-item>
              <div class="mien-img-item" v-for="item in farmProduceList" :key="item.index">
                <img :src="item.url"/>
              </div>
            </el-carousel-item>
          </el-carousel>
        </template>
        <template v-else-if="subIndex === 1">
          <el-carousel indicator-position="outside" height="180px">
            <el-carousel-item>
              <div class="mien-img-item" v-for="item in homestayList" :key="item.index">
                <img :src="item.url"/>
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
      informationList: [
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-10'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-10'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-10'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-10'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-10'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-10'
        }
      ], // 资讯列表
      informationImg: '', // 资讯缩略图片
      newsList: [
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        }
      ], // 新闻列表
      newsImg: '', // 新闻缩略图片
      noticeList: [
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        },
        {
          title: '徽州区“百名电商能手促百村振兴”人才培养工程',
          time: '07-17'
        }
      ], // 公告列表
      mienList: [
        {
          url: '/static/images/index/1.png'
        },
        {
          url: '/static/images/index/2.png'
        },
        {
          url: '/static/images/index/3.png'
        },
        {
          url: '/static/images/index/4.png'
        }
      ], // 中心风采图片列表
      farmProduceList: [
        {
          url: '/static/images/index/1.png'
        },
        {
          url: '/static/images/index/2.png'
        },
        {
          url: '/static/images/index/3.png'
        },
        {
          url: '/static/images/index/4.png'
        }
      ], // 农产品图片列表
      homestayList: [
        {
          url: '/static/images/index/4.png'
        },
        {
          url: '/static/images/index/3.png'
        },
        {
          url: '/static/images/index/2.png'
        },
        {
          url: '/static/images/index/1.png'
        }
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
    // 新闻、资讯切换
    newsIndexChange(index) {
      this.newsIndex = index
    },
    // 地方特色子标题切换
    subTitleChange(index) {
      this.subIndex = index
    }
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
  }
  .service, .notice {
    width: 482px;
    float: right;
  }
  .service {
    margin-bottom: 30px;
    height: 260px;
  }
  .service-img img {
    width: 240px;
    float: left;
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



