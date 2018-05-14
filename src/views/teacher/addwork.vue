<template>
    <el-form ref="form" :model="form" label-width="80px" class="box">
        <el-form-item label="作业名称*">
            <el-input v-model="form.title" placeholder="作业名称"></el-input>
        </el-form-item>
        <el-form-item label="作业内容*">
            <el-input type="textarea" :rows="10" placeholder="实验内容" v-model="form.content"></el-input>
        </el-form-item>
      
        <el-form-item>
            <el-button type="primary" @click="submit">立即创建</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    import {
        questionTAdd
    } from '../../api/api'
    export default {
        data() {
            return {
                form: {
                    title: '',
                    content: '',
                },
                fileList: [],
            }
        },
        created() {
        },
        methods: {
            submit: function() {
                let _this = this;
                if (_this.form.title == "") {
                    this.$message({
                        message: '请填写名称',
                        type: 'warning'
                    })
                }
                if (_this.form.content == "") {
                    this.$message({
                        message: '请填写内容',
                        type: 'warning'
                    })
                }
                let params = {
                    title: this.form.title,
                    content: this.form.content.replace(/\n|\r\n/g, "<br>"),
                }
                questionTAdd(params).then(res => {
                    if (res.err_code == 0) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        });
                        this.title = '';
                        this.content = '';
                        
                    } else {
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        })
                    }
                })
            },
            
        }
    }
</script>

<style scoped>
    .box {
        margin: 40px 50px 0px;
    }
    .long {
        width: 400px;
    }
</style>


