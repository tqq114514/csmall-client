<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
            <el-breadcrumb-item :to="{ path: '/' }">
                <i class="el-icon-s-promotion"></i>后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/sys-admin/product/brand-list'}">
                品牌管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加品牌</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="拼音" prop="pinyin">
                <el-input v-model="ruleForm.pinyin"></el-input>
            </el-form-item>

            <el-form-item label="LOGO" prop="logo">
                <el-input v-model="ruleForm.logo"></el-input>
            </el-form-item>

            <el-form-item label="简介" prop="description">
                <el-input v-model="ruleForm.description"></el-input>
            </el-form-item>

            <el-form-item label="关键词列表" prop="keywords">
                <el-input v-model="ruleForm.keywords"></el-input>
            </el-form-item>

            <el-form-item label="排序序号" prop="sort">
                <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>

            <el-form-item label="是否启用" prop="enable">
                <el-switch
                    v-model="ruleForm.enable"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#cccccc">
                </el-switch>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="warning" @click="$router.push('/sys-admin/product/brand-list')">返回列表</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name: '测试品牌001',
                pinyin: 'ceshipinpai001',
                description: '测试品牌的简介001',
                logo: 'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png',
                enable: 1,
                keywords: '测试关键词1,测试关键词2,测试关键词3',
                sort: 99
            },
            rules: {
                name: [
                    {required: true, message: '请输入品牌名称', trigger: 'blur'},
                    {min: 2, max: 15, message: '长度在 2 到 15 个字符', trigger: 'blur'}
                ],
                pinyin: [
                    {required: true, message: '请输入品牌拼音', trigger: 'blur'},
                    {min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur'}
                ],
                logo: [
                    {required: true, message: '请输入品牌LOGO的URL', trigger: 'blur'},
                    {min: 10, max: 255, message: '长度在 10 到 255 个字符', trigger: 'blur'}
                ],
                description: [
                    {required: true, message: '请输入品牌简介', trigger: 'blur'},
                    {min: 2, max: 30, message: '长度在 2 到 30 个字符', trigger: 'blur'}
                ],
                keywords: [
                    {required: true, message: '请输入品牌关键词列表', trigger: 'blur'},
                    {min: 3, max: 30, message: '长度在 3 到 30 个字符', trigger: 'blur'}
                ],
                sort: [
                    {required: true, message: '请输入品牌排序序号', trigger: 'blur'},
                    {pattern: /^(\d{1}|[1-9]{1}[0-9]?)$/, message: '排序序号必须是0~99之间的数字', trigger: 'blur'}
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = "http://localhost:8080/brand/add-new";
                    /*提交一个Json对象，后端需要在封装的对象前加@RequestBody,但在doc文档中，参数会以Json格式显示*/
                    this.axios.post(url,this.ruleForm).then((response) =>{
                        let jsonResult = response.data;
                        if (jsonResult.state==20000){
                            this.$message({
                                showClose: true,
                                message: '恭喜你，添加成功',
                                type: 'success'
                            });
                            this.resetForm(formName);
                        }else {
                            this.$alert(jsonResult.message, '错误', {
                                confirmButtonText: '确定',
                                callback: action => {
                                }
                            });
                        }
                    });
                    /*let formData = 'name=' + this.ruleForm.name
                        + '&description=' + this.ruleForm.description
                        + '&sort=' + this.ruleForm.sort;*/
                    /*上面的语句可以替换为let formData = this.qs.stringify(this.ruleForm)*/
                   /* console.log('formData = ' + formData);
                    this.axios.post(url, formData);*/
                } else {
                    console.log('error submit!!');
                    return false;
                }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    },
    created() {
        /*比如new好了对象*/
    },
    mounted() {
        /*比如new好了对象，同时数据也准备好了*/
    }
}
</script>