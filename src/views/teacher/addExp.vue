<template>
    <el-form ref="form" :model="form" label-width="80px" class="box">
        <el-form-item label="实验名称*">
            <el-input v-model="form.title" placeholder="实验名称"></el-input>
        </el-form-item>
        <el-form-item label="实验描述*">
            <el-input type="textarea" :rows="3" placeholder="实验描述" v-model="form.discribe"></el-input>
        </el-form-item>
        <el-form-item label="实验内容*">
            <el-input type="textarea" :rows="10" placeholder="实验内容" v-model="form.content"></el-input>
        </el-form-item>
        <el-form-item label="实验附件">
            <el-upload class="upload-demo long" action="http://localhost:8080/cmn/fileupload" :on-success="upfile" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip ">可上传.xls,.xlsx,.doc,.txt,.pdf,.jpg,.png,.jpeg,.zip...文件，且不超过500kb</div>
            </el-upload>
        </el-form-item>
        <el-form-item label="教师意见">
            <el-input type="textarea" :rows="5" placeholder="教师意见" v-model="form.view"></el-input>
        </el-form-item>
        <el-form-item label="课后作业">
            <el-input type="textarea" :rows="5" placeholder="课后作业" v-model="form.homework"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="submit">立即创建</el-button>
            <!-- <el-button type="info" @click="upset">重置</el-button> -->
            <i>*为必填项</i>
        </el-form-item>
    </el-form>
</template>

<script>
    import {
        testAdd,
        userTInfo,
        fileUpdate
    } from '../../api/api'
    export default {
        data() {
            return {
                userId: 0,
                testId: 0,
                fileId: 0,
                form: {
                    title: '',
                    discribe: '',
                    content: '',
                    view: '',
                    homework: '',
                },
                fileList: [],
            }
        },
        created() {
            this.getUserInfo()
        },
        methods: {
            // upset: function(){
            //     this.
            // }
            getUserInfo: function() {
                userTInfo().then(res => {
                    console.log(res);
                    this.userId = res.data.teacher_id;
                })
            },
            upfile: function(res, file, fileList) {
                if (res.err_code == 0) {
                    this.fileId = res.id;
                }
            },
            submit: function() {
                let _this = this;
                if (_this.form.title == "") {
                    this.$message({
                        message: '请填写实验名称',
                        type: 'warning'
                    })
                }
                if (_this.form.discribe == "") {
                    this.$message({
                        message: '请填写实验描述',
                        type: 'warning'
                    })
                }
                if (_this.form.content == "") {
                    this.$message({
                        message: '请填写实验内容',
                        type: 'warning'
                    })
                }
                // let dbconent =  this.form.content.replace(/\n|\r\n/g,"<br>"); 
                let params = {
                    user_id: this.userId,
                    title: this.form.title,
                    discribe: this.form.discribe.replace(/\n|\r\n/g, "<br>"),
                    content: this.form.content.replace(/\n|\r\n/g, "<br>"),
                    view: this.form.view.replace(/\n|\r\n/g, "<br>"),
                    homework: this.form.homework.replace(/\n|\r\n/g, "<br>")
                }
                testAdd(params).then(res => {
                    if (res.err_code == 0) {
                        this.$message({
                            message: '添加成功',
                            type: 'success'
                        })
                        this.testId = res.test_id;
                        if (this.fileId != 0) {
                            fileUpdate({
                                id: this.fileId,
                                parent_id: this.testId,
                                user_id: this.userId
                            }).then(res => {
                                console.log(res)
                            })
                        }
                    } else {
                        this.$message({
                            message: '添加失败',
                            type: 'warning'
                        })
                    }
                })
            },
            handleRemove(file, fileList) {
                console.log(file, fileList);
            },
            handlePreview(file) {
                console.log(file.response);
            },
            handleExceed(files, fileList) {
                this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
            },
            beforeRemove(file, fileList) {
                return this.$confirm(`确定移除 ${ file.name }？`);
            }
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


