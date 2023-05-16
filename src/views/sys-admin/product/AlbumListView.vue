<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
            <el-breadcrumb-item :to="{ path: '/' }">
                <i class="el-icon-s-promotion"></i>后台管理
                </el-breadcrumb-item>
            <el-breadcrumb-item>相册管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <div>
            <el-button type="primary" size="medium" @click="$router.push('/sys-admin/product/album-list/add-new')">
                添加相册
            </el-button>
        </div>
    </div>
</template>
