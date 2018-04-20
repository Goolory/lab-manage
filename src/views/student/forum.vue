<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-button type="primary" @click="handleAdd">添加问题</el-button>
        </el-col>
        <!-- 添加问题页面 -->
        <el-dialog title="新增" :visible.sync="addFormVisible" :close-on-click-modal="false">
            <el-form ref="form" :model="form">
                <el-form-item label="提出问题">
                    <el-input></el-input>
                </el-form-item>
                <el-form-item label="问题描述">
                    <el-input type="textarea" ></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click.native="addFormVisible = false">取消</el-button>
                <el-button type="primary" :loading="addLoading">提交</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                addFormVisible: false, //新增页面是否显示
                addLoading: false,
            }
        },
        methods: {
            handleAdd: function() {
                this.addFormVisible = true;
            }
        }
    }
</script>

<style scoped>
    .toolbar {
        background: #f2f2f2;
        padding: 10px;
        margin: 10px 0px;
    }
</style>
