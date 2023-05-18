<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
            <el-breadcrumb-item :to="{ path: '/' }">
                <i class="el-icon-s-promotion"></i>后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/sys-admin/product/album-list' }">
                属性模板管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加属性模板</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="名称" prop="name">
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>

            <el-form-item label="拼音" prop="pinyin">
                <el-input v-model="ruleForm.pinyin"></el-input>
            </el-form-item>

            <el-form-item label="关键词" prop="keywords">
                <el-input v-model="ruleForm.keywords"></el-input>
            </el-form-item>

            <el-form-item label="排序序号" prop="sort">
                <el-input v-model="ruleForm.sort"></el-input>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="warning" @click="$router.push('/sys-admin/product/AttributeTemplate-list')">返回列表</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            ruleForm: {
                name:'测试分类模板1',
                pinyin:'测试分类模板1的pinyin',
                keywords:'关键词1,关键词2，关键词3',
                sort:'66'
            },
            rules: {
                name: [
                    { required: true, message: '请输入分类模板名称', trigger: 'blur' },
                    { min: 4, max: 25, message: '长度在 4 到 25 个字符', trigger: 'blur' }
                ],
                pinyin: [
                    { required: true, message: '请输入分类模板拼音', trigger: 'blur' }
                ],
                keywords: [
                    { required: true, message: '请输入关键词', trigger: 'blur'}
                ],
                sort: [
                    { required: true, message: '请输入排序序号', trigger: 'blur' },
                    {pattern:/^(\d{1}|[1-9]{1}[0-9]{1})$/,message: "排序序号必须为1-99的数字",trigger: "blur"}
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = "http://localhost:8080/attribute-template/add-new";
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