<template>
<div>
    <div id="top">
        <div>
            <el-row style="padding:0;height:60px;background:#F56960; ">

                <el-col :span=16 :offset=2>
                    <div class="grid-content bg-purple" style=" line-height: 60px;color:#FFF;font-size:25px">徽州电子商务中心</div>
                </el-col>
                <el-col :span=6 style="text-align:center;">
                    <div class="grid-content bg-purple-light" style=" line-height: 60px;color:#FFF;font-size:12px;"><a style="padding:3%; border-style: solid;border-color: #FFF;border-width:1.5px; border-radius:8%;">登录／注册</a></div>
                </el-col>
                <el-col :span=2 style="text-align:center">
                    <div></div>
                </el-col>
            </el-row>

        </div>

        <div>

            <el-row style="padding:0;height:50px;background:#FEFFFE; line-height: 50px;font-size:14px;letter-spacing:4px ">
                <el-col :span=24 :offset=2>
                    <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect" active-text-color="#F56960">
                        <el-menu-item index="1">主页</el-menu-item>
                        <el-submenu index="2">
                            <template slot="title">民宿</template>
                            <el-menu-item index="2-1">选项1</el-menu-item>
                            <el-menu-item index="2-2">选项2</el-menu-item>
                            <el-menu-item index="2-3">选项3</el-menu-item>
                            <el-submenu index="2-4">
                                <template slot="title">选项4</template>
                                <el-menu-item index="2-4-1">选项1</el-menu-item>
                                <el-menu-item index="2-4-2">选项2</el-menu-item>
                                <el-menu-item index="2-4-3">选项3</el-menu-item>
                            </el-submenu>
                        </el-submenu>
                        <el-menu-item index="3">电商</el-menu-item>
                        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">资讯</a></el-menu-item>
                        <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">关于</a></el-menu-item>
                    </el-menu>
                </el-col>
            </el-row>

        </div>

        <div style="margin: 0;height:450px;
    padding: 0;
    border: 0;
    font-size: 100%;
    font-family: inherit;
    vertical-align: baseline;
    zoom: 1;">
            <el-row style="
 padding-top:120px;
 height:100%;
 background-size:  bottom;  
background-image:url(https://static.zzkcdn.com/o_1cjv6uma41nbl1jkcg761op11hvpm.jpg);  
background-repeat:no-repeat;  
background-position:center; ">

                <el-col :offset=4 :span=12>

                    <el-autocomplete style="width:100%;" v-model="state4" size="medium" allowCreate=true :fetch-suggestions="querySearchAsync" placeholder="请输入景区、地名、民宿名称或店铺名称" @select="handleSelect"></el-autocomplete>

                </el-col>

                <el-col :span=3>
                    <el-button style="width:100%;" type="danger">搜索</el-button>

                </el-col>

            </el-row>
        </div>

    </div>
      
    <div id="main" style="padding:0 6%;">
        <div style="width:100%">
            <div class="title">热门旅游景区</div>
            <!-- 七大乡镇 -->
            <div style="padding-top:5%">
                <el-row :gutter=30>
                    <el-col :span=12>
                        <el-row>
                            <img class="city-pic" style="padding:0; width:100%;height:180px;position: relative; " src="https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=3458997372,3027303078&fm=26&gp=0.jpg" />
                            <div class="city-title">岩寺镇</div>
                        </el-row>
                        <el-row style="padding-top:20px;" :gutter=20>
                            <el-col :span=12>
                                <img style="padding:0; width:100%;height:320px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536990875860&di=689ea005143810e0827b2592e1235f3b&imgtype=0&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimage%2Fc0%253Dpixel_huitu%252C0%252C0%252C294%252C40%2Fsign%3D00c470ddb81c8701c2bbbaa64e07fb43%2F503d269759ee3d6d7b4c49f248166d224f4ade05.jpg" />
                                <div class="city-title">西溪南镇</div>
                            </el-col>
                            <el-col :span=12>
                                <img style="padding:0; width:100%;height:320px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536990788898&di=1bb920c75884ded44e4f33d942edc03c&imgtype=0&src=http%3A%2F%2Fpic33.photophoto.cn%2F20141014%2F0033033928525746_b.jpg" />
                                <div class="city-title">潜口镇</div>
                            </el-col>
                        </el-row>
                    </el-col>

                    <el-col :span=12>
                        <el-row :gutter=20>
                            <el-col :span=12>
                                <img style="padding:0; width:100%;height:250px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536992119600&di=a39b643193df66cfa619dcfb42386fcc&imgtype=0&src=http%3A%2F%2Fpic.baike.soso.com%2Fp%2F20140508%2F20140508095858-142540531.jpg" />
                                <div class="city-title">呈坎镇</div>
                            </el-col>
                            <el-col :span=12>
                                <img style="padding:0; width:100%;height:250px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537586867&di=bb53ef181ff36646527383f2a88ca9c8&imgtype=jpg&er=1&src=http%3A%2F%2Fimg1.qunarzz.com%2Fp%2Ftts9%2F1507%2F7e%2F62f02f20065c60.jpg" />
                                <div class="city-title">杨村乡</div>
                            </el-col>
                        </el-row>
                        <el-row style="padding-top:20px;" :gutter=20>
                            <el-col :span=12>
                                <img style="padding:0; width:100%;height:250px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536992257584&di=63ae472d3f5b6a2ee8da8ac471c7c454&imgtype=0&src=http%3A%2F%2Fimage.lxw365.com%2Fimg%2Fba%2F54%2Fba54d7f73e3233451626cf7bf1d76756.jpg" />
                                <div class="city-title">富溪乡</div>
                            </el-col>
                            <el-col :span=12>
                                <img style="padding:0; width:100%;height:250px" src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537586931&di=068366232707404cfe381fc36b6e6bfd&imgtype=jpg&er=1&src=http%3A%2F%2Fimgsrc.baidu.com%2Fimgad%2Fpic%2Fitem%2Fd53f8794a4c27d1ec963a35911d5ad6edcc438e1.jpg" />
                                <div class="city-title">洽舍乡</div>
                            </el-col>
                        </el-row>

                    </el-col>
                </el-row>
            </div>

        </div>

        <div id="main" style="padding:0 6%;">
            <div style="width:100%">
                <!-- <div class="title">热门旅游景区</div> -->
                <!-- 七大乡镇 -->
                <div style="padding-top:5%;    text-align:center;   ">
                    <el-row :gutter=2>
                        <el-col :span=8 >
                        <img style="width:80px;height:80px" src="../../assets/custom-theme/images/tel-service.png">
                            <div class="desc">
                                在线客服:12783921321
                            </div>

                        </el-col>
                        <el-col :span=8>
                            <img  style="width:80px;height:80px" src="../../assets/custom-theme/images/wechat-pay.png" >
                            <div class="desc">
                                微信安全支付
                            </div>

                        </el-col>
                        <el-col :span=8>
                            <img   style="width:80px;height:80px" src="../../assets/custom-theme/images/auth-user.png" >

                            <div class="desc">
                                平台实名认证房东房客信息
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>

        <!-- 热门民宿 -->
        <div id="hot">
            <div style="width:100%">
                <div class="title">精品推荐</div>
                <div style="padding-top:5%">

                    <el-row>
                        <el-col :class="{'card-padding':index%4>0}" :span="6" v-for="(item,index) in hotHomestays" :key="item.id" :offset="index%4 > 0 ? 0 : 0">
                            <p v-show="index>3">
                            </p>
                            <el-card style="height:362px;" :body-style="{ padding: '0px ' }">
                                <img style=" width: 100%;height:250px;
    display: block;" :src="item.picture" class="image">

                                <div style="padding: 14px;">
                                    <div style="font-size:16px;">{{item.name}}</div>
                                    <p style="color:grey;">{{ item.price }}元/每间</p>

                                    <div>
                                        <el-rate style="float:left" v-model=item.value disabled show-score text-color="#ff9900" score-template="{value}">
                                        </el-rate>
                                        <span style="color:grey;float:right">{{item.orderNum}}人已订</span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>

                </div>
            </div>
            <div style="padding-top:20px">
                <a href="#" style="padding-top:20px;font-weight:600;font-size:16px;color:#f56960">显示全部 > </a>
            </div>

        </div>

        <!-- 特惠超值 -->
        <div id="hot">
            <div style="width:100%">
                <div class="title">特惠超值</div>

                <div style="padding-top:5%">

                    <el-row>
                        <el-col :class="{'card-padding':index%4>0}" :span="6" v-for="(item,index) in cheapHomestays" :key="item.id" :offset="index%4 > 0 ? 0 : 0">
                            <p v-show="index>3">
                            </p>
                            <el-card style="height:362px;" :body-style="{ padding: '0px ' }">
                                <img style=" width: 100%;height:250px;
    display: block;" :src="item.picture" class="image">
                                <div style="padding: 14px;">
                                    <div style="font-size:16px;">{{item.name}}</div>
                                    <p style="color:grey;">{{ item.price }}元/每间</p>

                                    <div>
                                        <el-rate style="float:left" v-model=item.value disabled show-score text-color="#ff9900" score-template="{value}">
                                        </el-rate>
                                        <span style="color:grey;float:right">{{item.orderNum}}人已订</span>
                                    </div>
                                </div>
                            </el-card>
                        </el-col>
                    </el-row>

                </div>
            </div>
            <div style="padding-top:20px">
                <a href="#" style="padding-top:20px;font-weight:600;font-size:16px;color:#f56960">显示全部 > </a>
            </div>

        </div>

    </div>

    <div id="bottom">

        <div style="margin-top:50px;padding-top:50px;background:#333333;color:#FFF">
            <el-row>
                <el-col :offset=2 :span=4>

                    <h2>关于我们</h2>
                    <a class="grey">徽州电子商务中心</a>
                    </br>
                    </br>
                    <a class="grey">黄山超新星互联网科技公司</a>
                    </br>
                    </br>
                    <a class="grey">人才招聘</a>
                    </br>
                    </br>
                    <a class="grey">隐私与法律申明</a>

                </el-col>
                <el-col :offset=2 :span=4>
                    <h2>产品介绍</h2>
                    <a class="grey"> 民宿系统</a>
                    </br>
                    </br>
                    <a class="grey">电商系统</a>
                    </br>
                    </br>
                    <a class="grey">广告活动</a>
                    </br>
                    </br>
                    <a class="grey">供应链</a>
                </el-col>

                <el-col :offset=2 :span=4>
                    <h2>商务合作</h2>
                    <a class="grey">投资理财</a>
                    </br>
                    </br>
                    <a class="grey">企业入驻</a>
                    </br>
                    </br>
                    <a class="grey">消费者建议</a>

                </el-col>
                <el-col :offset=2 :span=4>
                    <h2>服务咨询</h2>
                    <a class="grey">咨询电话：<span style="font-size:30px;font-weight:700;color:#FFF">9081212</span></a>

                </el-col>
            </el-row>
            <el-row style="text-align:center;padding:40px">
                <a class="grey">版权所有 © 2018 黄山超新星互联万技术有限公司 皖ICP备17007362号-1</a>
            </el-row>
        </div>

    </div>

</div>
</template>

<style scoped>
a.hover:hover {
    color: #f56960;
}

a.grey {
    color: #aaa;
}

.title {
    text-align: center;
    padding-top: 50px;
    font-size: 25px;
    color: #f56960;
    font-weight: 350;
}

.desc {
    font-size: 17px;
    font-weight: 400;
    padding-top: 20px;
}

.city-pic {
    position: relative;
    display: inline-block;
}

.city-title {
    font-size: 30px;
    padding-left: 10%;
    position: absolute;
    bottom: 50%;
    color: #ffffff;
    opacity: 0.6;
}

.card-padding {
    padding-left: 20px;
}
</style>
 

<script>
export default {
  data() {
    return {
      activeIndex: '2-1',

      restaurants: [],
      state4: '',
      timeout: null,

      hotHomestays: [{
        id: 1,
        name: '黄山脚下超级民宿中诺厄我认为哦期望和期望',
        price: 91,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 2,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 3,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 4,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 5,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 6,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 7,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 8,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      },
      {
        id: 8,
        name: '江边海景房',
        price: 101,
        value: 3.5,
        orderNum: 1099,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1536993397857&di=f7b0a04ea792f1c7191928ec59a4d6eb&imgtype=0&src=http%3A%2F%2Fimage.qmango.com%2Fhotelimg%2Fc3%2F520608%2Fd4c46fbf-ba05-9bdd-2992-2f15bababdcb_big.jpg'
      }
      ],

      cheapHomestays: [{
        id: 1,
        name: '黄山脚下超级民宿中诺厄我认为哦期望和期望',
        price: 91,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      },
      {
        id: 2,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      },
      {
        id: 3,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      },
      {
        id: 4,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      },
      {
        id: 5,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      },
      {
        id: 6,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      },
      {
        id: 7,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      },
      {
        id: 8,
        name: '江边海景房',
        price: 101,
        value: 4.5,
        orderNum: 1090,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      },
      {
        id: 8,
        name: '江边海景房',
        price: 101,
        value: 3.5,
        orderNum: 1099,
        picture: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1537593752&di=6d76f5010e56bf988c0db6a0d804513e&imgtype=jpg&er=1&src=http%3A%2F%2Fassets.muniao.com%2FUploadFiles%2Fimage%2F20170806%2Fb27c750fa154484b847db9f4886b7a9320170806134243953.jpg'
      }
      ]
    }
  },
  methods: {
    loadAll() {
      return [{
        value: '三全鲜食（北新泾店）',
        address: '黄山'
      },
      {
        value: 'Hot honey 首尔炸鸡（仙霞路）',
        address: '西递'
      },
      {
        value: '新旺角茶餐厅',
        address: '宏村'
      },
      {
        value: '泷千家(天山西路店)',
        address: '唐模景区'
      },
      {
        value: '胖仙女纸杯蛋糕（上海凌空店）',
        address: '黄山市古徽州文化旅游区'
      },
      {
        value: '贡茶',
        address: '棠樾石牌坊群'
      },
      {
        value: '豪大大香鸡排超级奶爸',
        address: '呈坎景区'
      },
      {
        value: '茶芝兰（奶茶，手抓饼）',
        address: '潜口民宅'
      },
      {
        value: '十二泷町',
        address: '鲍家花园'
      },
      {
        value: '星移浓缩咖啡',
        address: '徽州古城'
      },
      {
        value: '阿姨奶茶/豪大大',
        address: '嘉定区曹安路1611号'
      },
      {
        value: '新麦甜四季甜品炸鸡',
        address: '嘉定区曹安公路2383弄55号'
      },
      {
        value: 'Monica摩托主题咖啡店',
        address: '嘉定区江桥镇曹安公路2409号1F，2383弄62号1F'
      },
      {
        value: '浮生若茶（凌空soho店）',
        address: '上海长宁区金钟路968号9号楼地下一层'
      },
      {
        value: 'NONO JUICE  鲜榨果汁',
        address: '上海市长宁区天山西路119号'
      },
      {
        value: 'CoCo都可(北新泾店）',
        address: '上海市长宁区仙霞西路'
      },
      {
        value: '快乐柠檬（神州智慧店）',
        address: '上海市长宁区天山西路567号1层R117号店铺'
      },
      {
        value: 'Merci Paul cafe',
        address: '上海市普陀区光复西路丹巴路28弄6号楼819'
      },
      {
        value: '猫山王（西郊百联店）',
        address: '上海市长宁区仙霞西路88号第一层G05-F01-1-306'
      },
      {
        value: '枪会山',
        address: '上海市普陀区棕榈路'
      },
      {
        value: '纵食',
        address: '元丰天山花园(东门) 双流路267号'
      },
      {
        value: '钱记',
        address: '上海市长宁区天山西路'
      },
      {
        value: '壹杯加',
        address: '上海市长宁区通协路'
      },
      {
        value: '唦哇嘀咖',
        address: '上海市长宁区新泾镇金钟路999号2幢（B幢）第01层第1-02A单元'
      },
      {
        value: '爱茜茜里(西郊百联)',
        address: '长宁区仙霞西路88号1305室'
      },
      {
        value: '爱茜茜里(近铁广场)',
        address: '上海市普陀区真北路818号近铁城市广场北区地下二楼N-B2-O2-C商铺'
      },
      {
        value: '鲜果榨汁（金沙江路和美广店）',
        address: '普陀区金沙江路2239号金沙和美广场B1-10-6'
      },
      {
        value: '开心丽果（缤谷店）',
        address: '上海市长宁区威宁路天山路341号'
      },
      {
        value: '超级鸡车（丰庄路店）',
        address: '上海市嘉定区丰庄路240号'
      },
      {
        value: '妙生活果园（北新泾店）',
        address: '长宁区新渔路144号'
      },
      {
        value: '香宜度麻辣香锅',
        address: '长宁区淞虹路148号'
      },
      {
        value: '凡仔汉堡（老真北路店）',
        address: '上海市普陀区老真北路160号'
      },
      {
        value: '港式小铺',
        address: '上海市长宁区金钟路968号15楼15-105室'
      },
      {
        value: '蜀香源麻辣香锅（剑河路店）',
        address: '剑河路443-1'
      },
      {
        value: '北京饺子馆',
        address: '长宁区北新泾街道天山西路490-1号'
      },
      {
        value: '饭典*新简餐（凌空SOHO店）',
        address: '上海市长宁区金钟路968号9号楼地下一层9-83室'
      },
      {
        value: '焦耳·川式快餐（金钟路店）',
        address: '上海市金钟路633号地下一层甲部'
      },
      {
        value: '动力鸡车',
        address: '长宁区仙霞西路299弄3号101B'
      },
      {
        value: '浏阳蒸菜',
        address: '天山西路430号'
      },
      {
        value: '四海游龙（天山西路店）',
        address: '上海市长宁区天山西路'
      },
      {
        value: '樱花食堂（凌空店）',
        address: '上海市长宁区金钟路968号15楼15-105室'
      },
      {
        value: '壹分米客家传统调制米粉(天山店)',
        address: '天山西路428号'
      },
      {
        value: '福荣祥烧腊（平溪路店）',
        address: '上海市长宁区协和路福泉路255弄57-73号'
      },
      {
        value: '速记黄焖鸡米饭',
        address: '上海市长宁区北新泾街道金钟路180号1层01号摊位'
      },
      {
        value: '红辣椒麻辣烫',
        address: '上海市长宁区天山西路492号'
      },
      {
        value: '(小杨生煎)西郊百联餐厅',
        address: '长宁区仙霞西路88号百联2楼'
      },
      {
        value: '阳阳麻辣烫',
        address: '天山西路389号'
      },
      {
        value: '南拳妈妈龙虾盖浇饭',
        address: '普陀区金沙江路1699号鑫乐惠美食广场A13'
      }
      ]
    },
    querySearchAsync(queryString, cb) {
      var restaurants = this.restaurants
      var results = queryString
        ? restaurants.filter(this.createStateFilter(queryString))
        : restaurants

      clearTimeout(this.timeout)
      this.timeout = setTimeout(() => {
        cb(results)
      }, 1000 * Math.random())
    },
    createStateFilter(queryString) {
      return state => {
        return (
          state.address.toLowerCase().indexOf(queryString.toLowerCase()) >= 0
        )
      }
    },
    handleSelect(item) {
      console.log(item)
    }
  },

  mounted() {
    this.restaurants = this.loadAll()
  }
}
</script>
