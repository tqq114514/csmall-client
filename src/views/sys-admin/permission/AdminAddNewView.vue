<template>
    <div>
        <el-breadcrumb separator-class="el-icon-arrow-right" style="font-size: 16px">
            <el-breadcrumb-item :to="{ path: '/' }">
                <i class="el-icon-s-promotion"></i>后台管理
            </el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/sys-admin/permission/admin' }">
                管理员管理
            </el-breadcrumb-item>
            <el-breadcrumb-item>添加管理员</el-breadcrumb-item>
        </el-breadcrumb>
        <el-divider></el-divider>

        <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
            <el-form-item label="用户名" prop="username">
                <el-input v-model="ruleForm.username"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="password">
                <el-input v-model="ruleForm.password"></el-input>
            </el-form-item>
            <el-form-item label="昵称" prop="nickname">
                <el-input v-model="ruleForm.nickname"></el-input>
            </el-form-item>
            <el-form-item label="头像" prop="avatar">
                <el-input v-model="ruleForm.avatar"></el-input>
            </el-form-item>
            <el-form-item label="手机号码" prop="phone">
                <el-input v-model="ruleForm.phone"></el-input>
            </el-form-item>
            <el-form-item label="电子邮箱" prop="email">
                <el-input v-model="ruleForm.email"></el-input>
            </el-form-item>
            <el-form-item label="简介" prop="description">
                <el-input v-model="ruleForm.description"></el-input>
            </el-form-item>

            <el-form-item label="是否启用" prop="enable">
                <el-switch
                    v-model="ruleForm.enable"
                    :active-value="1"
                    :inactive-value="0"
                    active-color="#13ce66"
                    inactive-color="#ccc">
                </el-switch>
            </el-form-item>

<!--key不配置也可以，唯一值就可以，相当于遍历里i的作用-->
            <el-form-item label="角色" prop="roleIds">
                <el-select v-model="ruleForm.roleIds" multiple placeholder="请选择">
                    <el-option
                        v-for="item in roleListOptions"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                    </el-option>
                </el-select>
            </el-form-item>

            <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                <el-button type="info" @click="resetForm('ruleForm')">重置</el-button>
                <el-button type="warning" @click="$router.push('/sys-admin/product/album-list/')">返回列表</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            roleListOptions: [],
            ruleForm: {
                username: 'aws',
                password: '123456',
                nickname: '测试管理员001',
                avatar: 'https://img2.baidu.com/it/u=4244269751,4000533845&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=500',
                phone: '13700137001',
                email: '13700137001@163.com',
                description: '测试管理员001的简介',
                enable: 1,
                roleIds: []
            },
            rules: {
                username: [
                    {required: true, message: '请输入用户名', trigger: 'blur'},
                    {min: 3, max: 15, message: '长度在 3 到 15 个字符', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '请输入密码', trigger: 'blur'},
                    {min: 4, max: 15, message: '长度在 4 到 15 个字符', trigger: 'blur'}
                ],
                nickname: [],
                avatar: [],
                phone: [],
                email: [],
                description: [],
                enable: [],
                roleIds: []
            }
        };
    },
    methods: {
        submitForm(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    let url = "http://localhost:8081/admin/add-new";
                    /*提交一个Json对象，后端需要在封装的对象前加@RequestBody,但在doc文档中，参数会以Json格式显示*/
                    let formData = this.qs.stringify(this.ruleForm);
                    console.log('formData = ' + formData);

                    this.axios.post(url, formData).then((response) => {
                        let jsonResult = response.data;
                        if (jsonResult.state == 20000) {
                            this.$message({
                                message: '添加管理员成功！',
                                type: 'success'
                            });
                            this.resetForm(formName);
                        } else {
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
        },
        loadRoleList() {
            let url = 'http://localhost:8081/role/list';
            console.log('url = ' + url);

            this.axios.get(url).then((response) => {
                let jsonResult = response.data;
                if (jsonResult.state == 20000) {
                    this.roleListOptions = jsonResult.data;
                } else {
                    this.$alert(jsonResult.message, '错误', {
                        confirmButtonText: '确定',
                        callback: action => {
                        }
                    });
                }
            });
        },
    },
    created() {
        /*比如new好了对象*/
    },
    mounted() {
        /*比如new好了对象，同时数据也准备好了*/
        this.loadRoleList();
    }
}
</script>