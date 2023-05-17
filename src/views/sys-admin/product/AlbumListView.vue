<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
            <el-breadcrumb-item :to="{ path: '/' }">
                <i class="el-icon-s-promotion"></i>后台管理
                </el-breadcrumb-item>
            <el-breadcrumb-item>相册管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <div style="margin-bottom: 20px;">
            <el-button type="primary" size="medium"
                       @click="$router.push('/sys-admin/product/album-list/add-new')">添加相册
            </el-button>
        </div>

        <div>
            <el-table
                :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
                <el-table-column prop="name" label="相册名称" width="220" header-align="center"
                show-overflow-tooltip></el-table-column>
                <el-table-column prop="description" label="相册简介" width="550" header-align="center"
                show-overflow-tooltip></el-table-column>
                <el-table-column prop="sort" label="排序序号" width="100" align="center"></el-table-column>
                <el-table-column label="查看图片" width="100" align="center">
                    <el-button size="mini">查看</el-button>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" circle></el-button>
                        <el-button type="danger"  size="mini" icon="el-icon-delete" circle @click="openDeleteConfirm(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <div style="text-align: right; margin: 10px auto;">
            <el-pagination
                @current-change="changePage"
                layout="total, prev, pager, next"
                :total="total"
                :current-page = "currentPage"
                :page-size="pageSize">
            </el-pagination>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            total: 0,
            pageSize: 0,
            currentPage:1
        }
    },
    methods: {
        openDeleteConfirm(album) {
            this.$confirm('此操作将永久删除id为：'+album.id+'，名为：'+album.name+'的相册, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.handleDelete(album);
            }).catch(() => {
            });
        },
        handleDelete(album){
            let url = 'http://localhost:8080/album/delete'
            console.log('url='+url);
            let formData = 'id='+album.id;
            console.log('formData = '+formData);
            this.axios.post(url,formData).then((response) => {
                let jsonResult = response.data;
                if (jsonResult.state == 20000){
                    this.$message({
                        message: '删除相册成功！',
                        type: 'success'
                    });
                    this.loadAlbumList();
                }else if (jsonResult.state==40400){
                    this.$alert(jsonResult.message, '错误', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.loadAlbumList();
                        }
                    });
                }else if (jsonResult.state==40900){
                    this.$alert(jsonResult.message, '错误', {
                        confirmButtonText: '确定',
                        callback: action => {

                        }
                    });
                }
            })
        },
        changePage(value){
            this.$router.replace('?page='+value);
            this.loadAlbumList();
        },
        loadAlbumList(){
            let page = this.$router.currentRoute.query.page;
            if (!page){
                page = 1;
            }

            let url='http://localhost:8080/album/list?pageNum=' + page;
            console.log('url = ' + url);

            this.axios.get(url).then((response) => {
                let jsonResult = response.data;
                if (jsonResult.state == 20000){
                    this.tableData = jsonResult.data.list;
                    this.total = jsonResult.data.total;
                    this.pageSize = jsonResult.data.pageSize;
                    this.currentPage = jsonResult.data.currentPage;
                }else {
                    this.$notify({
                        title: '错误',
                        message: '读取列表错误',
                        duration: 0
                    });
                }
            })
        },
    },
    created() {
        /*比如new好了对象*/
    },
    mounted() {
        /*比如new好了对象，同时数据也准备好了*/
        this.loadAlbumList();
    }
}
</script>