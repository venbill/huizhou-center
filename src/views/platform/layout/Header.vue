<template>

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
    </div>
</template>
