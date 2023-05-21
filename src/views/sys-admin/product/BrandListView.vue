<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
            <el-breadcrumb-item :to="{ path: '/' }">
                <i class="el-icon-s-promotion"></i>后台管理
                </el-breadcrumb-item>
            <el-breadcrumb-item>品牌管理</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <div style="margin-bottom: 20px;">
            <el-button type="primary" size="medium"
                       @click="$router.push('/sys-admin/product/brand-list/add-new')">添加品牌
            </el-button>
        </div>

        <div>
            <el-table
                :data="tableData" border style="width: 100%">
                <el-table-column prop="id" label="ID" width="60" align="center"></el-table-column>
                <el-table-column label="LOGO" width="70" align="center">
                    <template slot-scope="scope">
                        <el-avatar :size="30" :src="scope.row.logo" fit="contain"></el-avatar>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="名称" width="220" header-align="center"
                show-overflow-tooltip></el-table-column>
                <el-table-column prop="pinyin" label="拼音" width="120" align="center"></el-table-column>
                <el-table-column prop="description" label="简介" width="250" header-align="center"
                show-overflow-tooltip></el-table-column>
                <el-table-column prop="keywords" label="关键词列表" header-align="center"
                                 :show-overflow-tooltip="true"></el-table-column>
                <el-table-column prop="sort" label="排序序号" width="100" align="center"></el-table-column>
                <el-table-column label="是否启用" width="80" align="center">
                    <template slot-scope="scope">
                        <el-switch
                            @change="toggleEnable(scope.row)"
                            v-model="scope.row.enable"
                            :active-value="1"
                            :inactive-value="0"
                            active-color="#13ce66"
                            inactive-color="#cccccc">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" align="center">
                    <template slot-scope="scope">
                        <el-button type="primary" size="mini" icon="el-icon-edit" circle
                        @click="openEditDialog(scope.row)"></el-button>
                        <el-button type="danger"  size="mini" icon="el-icon-delete" circle
                        @click="openDeleteConfirm(scope.row)"></el-button>
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


        <el-dialog title="修改品牌" :visible.sync="dialogFormVisible">
            <el-form :model="editForm" :rules="rules" ref="ruleForm">
                <el-form-item label="LOGO" prop="logo" :label-width="formLabelWidth">
                    <el-input v-model="editForm.logo" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="editForm.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="拼音" prop="pinyin" :label-width="formLabelWidth">
                    <el-input v-model="editForm.pinyin" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="简介" prop="description"  :label-width="formLabelWidth">
                    <el-input v-model="editForm.description" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="关键词列表" prop="keywords"  :label-width="formLabelWidth">
                    <el-input v-model="editForm.keywords" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="排序序号" prop="sort"  :label-width="formLabelWidth">
                    <el-input v-model="editForm.sort" autocomplete="off"></el-input>
                </el-form-item>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitEditForm">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
export default {
    data() {
        return {
            tableData: [],
            total: 0,
            pageSize: 0,
            currentPage:1,
            dialogFormVisible: false, /*修改嵌套表单内容*/
            editForm: {
                id:'',
                logo:'',
                name: '',
                pinyin:'',
                description:'',
                keywords:'',
                sort:'',
                enable:''
            },
            formLabelWidth: '100px',
            rules: {
                name: [
                    {required: true, message: '请输入名称', trigger: 'blur'},
                    {min: 2, max: 25, message: '长度在 2 到 25 个字符', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请输入简介', trigger: 'blur'}
                ],
                sort: [
                    {required: true, message: '请输入排序序号', trigger: 'blur'},
                    {pattern: /^(\d{1}|[1-9]{1}[0-9]?)$/, message: '排序序号必须是 0~99 之间的数字', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submitEditForm(){
            let url = 'http://localhost:8080/brand/update';
            console.log('url = ' + url);

            let formData = this.qs.stringify(this.editForm);
            console.log('formData = ' + formData);

            this.axios.post(url, formData).then((response) => {
                let jsonResult = response.data;
                if (jsonResult.state == 20000) {
                    this.$message({
                        message: '修改相册成功！',
                        type: 'success'
                    });
                    this.dialogFormVisible = false;
                    this.loadBrandList();
                } else if (jsonResult.state == 40400){
                    this.$alert(jsonResult.message, '错误', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.dialogFormVisible = false;
                            this.loadBrandList();
                        }
                    });
                } else {
                    this.$alert(jsonResult.message, '错误', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }
            });
        },
        openEditDialog(brand){
            let url = 'http://localhost:8080/brand/standard?id='+brand.id;
            console.log('url='+url);
            this.axios.get(url).then((response) => {
                let jsonResult = response.data;
                if (jsonResult.state == 20000){
                    this.editForm = jsonResult.data;
                    this.dialogFormVisible = true;
                }else {
                    this.$alert(jsonResult.message, '错误', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.loadBrandList();
                        }
                    });
                }
            })
        },
        openDeleteConfirm(brand) {
            this.$confirm('此操作将永久删除id为：'+brand.id+'，名为：'+brand.name+'的品牌, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.handleDelete(brand);
            }).catch(() => {
            });
        },
        handleDelete(brand){
            let url = 'http://localhost:8080/brand/delete'
            console.log('url='+url);
            let formData = 'id='+brand.id;
            console.log('formData = '+formData);
            this.axios.post(url,formData).then((response) => {
                let jsonResult = response.data;
                if (jsonResult.state == 20000){
                    this.$message({
                        message: '删除相册成功！',
                        type: 'success'
                    });
                    this.loadBrandList();
                }else if (jsonResult.state==40400){
                    this.$alert(jsonResult.message, '错误', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.loadBrandList();
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
            this.loadBrandList();
        },
        loadBrandList(){
            let page = this.$router.currentRoute.query.page;
            if (!page){
                page = 1;
            }

            let url='http://localhost:8080/brand/list?pageNum=' + page;
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
        this.loadBrandList();
    }
}
</script>