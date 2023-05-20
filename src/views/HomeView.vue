<!--先考虑上下结构再考虑左右结构-->
<template>
    <div>
        <!-- 整个容器 -->
        <el-container>
            <!-- 上半部分：顶栏 -->
            <el-header class="layout-header">

                <div class="login-user">
                    <span class="welcome">欢迎回来，root!</span>

                    <el-dropdown>
                        <el-avatar src="https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png"
                                   size="small"></el-avatar>
                        <el-dropdown-menu slot="dropdown">
                            <el-dropdown-item icon="el-icon-s-finance">修改资料</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-s-custom">修改头像</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-s-cooperation">修改密码</el-dropdown-item>
                            <el-dropdown-item icon="el-icon-remove" divided>退出登录</el-dropdown-item>
                        </el-dropdown-menu>
                    </el-dropdown>
                </div>

                <h1>酷鲨商城运营管理平台</h1>
            </el-header>
            <!-- 下半部分 -->
            <el-container class="layout-body">
                <!-- 下半部分的左侧：侧边栏 -->
                <el-aside class="layout-aside">
                    <el-menu
                            :router="true"
                            :default-active="activeMenuItemPath"
                            class="el-menu-vertical-demo"
                            background-color="#222"
                            text-color="#fff"
                            active-text-color="#fff">
                        <!-- 首页 -->
                        <el-menu-item index="1">
                            <i class="el-icon-house"></i>
                            <span slot="title">首页</span>
                        </el-menu-item>

                        <el-submenu index="2">
                            <template slot="title">
                                <i class="el-icon-s-goods"></i>
                                <span>商品管理</span>
                            </template>

                            <el-menu-item index="2-1">
                                <i class="el-icon-s-grid"></i>
                                <span slot="title">SPU台账</span>
                            </el-menu-item>
                            <el-menu-item index="2-2">
                                <i class="el-icon-circle-plus"></i>
                                <span slot="title">新增SPU</span>
                            </el-menu-item>
                            <el-menu-item index="/sys-admin/product/album-list">
                                <i class="el-icon-picture"></i>
                                <span slot="title">相册管理</span>
                            </el-menu-item>
                            <el-menu-item index="/sys-admin/product/category-list">
                                <i class="el-icon-s-unfold"></i>
                                <span slot="title">商品类别</span>
                            </el-menu-item>
                            <el-menu-item index="/sys-admin/product/AttributeTemplate-list">
                                <i class="el-icon-s-flag"></i>
                                <span slot="title">属性模板</span>
                            </el-menu-item>
                            <el-menu-item index="2-6">
                                <i class="el-icon-s-ticket"></i>
                                <span slot="title">属性管理</span>
                            </el-menu-item>
                            <el-menu-item index="2-7">
                                <i class="el-icon-s-data"></i>
                                <span slot="title">品牌管理</span>
                            </el-menu-item>

                        </el-submenu>
                        <el-submenu index="3">
                            <template slot="title">
                                <i class="el-icon-s-order"></i>
                                <span slot="title">订单管理</span>
                            </template>
                            <el-menu-item index="3-1" disabled>
                                <i class="el-icon-error"></i>
                                <span slot="title">暂无内容</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="4">
                            <template slot="title">
                                <i class="el-icon-s-management"></i>
                                <span slot="title">营销管理</span>
                            </template>
                            <el-menu-item index="4-1" disabled>
                                <i class="el-icon-error"></i>
                                <span slot="title">暂无内容</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="5">
                            <template slot="title">
                                <i class="el-icon-s-shop"></i>
                                <span slot="title">商家管理</span>
                            </template>
                            <el-menu-item index="5-1" disabled>
                                <i class="el-icon-error"></i>
                                <span slot="title">暂无内容</span>
                            </el-menu-item>
                        </el-submenu>
                        <el-submenu index="6">
                            <template slot="title">
                                <i class="el-icon-s-check"></i>
                                <span slot="title">权限管理</span>
                            </template>
                            <el-menu-item index="/sys-admin/permission/admin">
                                <i class="el-icon-s-custom"></i>
                                <span slot="title">管理员管理</span>
                            </el-menu-item>
                        </el-submenu>
                    </el-menu>
                </el-aside>
                <!-- 下半部分的右侧：主体 -->
                <el-main class="layout-main">
                    <!-- 将由其它视图组件来显示 -->
                    <router-view/>
                </el-main>
            </el-container>
        </el-container>

    </div>
</template>

<style>
.layout-aside i{
    color: #fff !important;
}
.layout-aside .el-menu{
    border: 0;
}
.el-menu-item.is-active{
    background: #2c3e50 !important;
}
.el-menu *{
    overflow: hidden;
}
.layout-header {
    background: orange;
}

.layout-header h1 {
    line-height: 60px;
    color: #fff;

}

.layout-header .login-user {
    margin: 16px;
    display: flex;
    float: right;
}

.layout-header .login-user .welcome {
    line-height: 28px;
    color: white;
    margin: auto 15px;
}

.layout-body {
    position: absolute;
    top: 60px;
    bottom: 0;
    right: 0;
    left: 0;
}

.layout-aside {
    background: #222;
}

.layout-main {
}
</style>

<script>
export default {
    data() {
        return {
                activeMenuItemPath:""
        };
    },
    methods: {
        handleActiveMenuItem(){
            let currentPath = this.$router.currentRoute.fullPath;
            if (currentPath.startsWith("/sys-admin/product/album-list")){
                currentPath = '/sys-admin/product/album-list';
            }
            if (currentPath.startsWith("/sys-admin/product/AttributeTemplate-list")){
                currentPath = '/sys-admin/product/AttributeTemplate-list';
            }
            if (currentPath.startsWith("/sys-admin/permission/admin")){
                currentPath = '/sys-admin/permission/admin';
            }
            this.activeMenuItemPath = currentPath;
        }
    },
    created() {
        /*比如new好了对象*/
    },
    mounted() {
        /*比如new好了对象，同时数据也准备好了*/
        this.handleActiveMenuItem();

    }
}
</script>