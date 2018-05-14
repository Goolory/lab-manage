<template>
    <div>
        <div class="card card-div" v-loading="listLoading">
            <el-card class="box-card card-bottom">
                <div class="card-title comment-title">留言板：</div>
                <div class="text">
                    <el-container class="comment" v-for="(item, index) in commentList">
                        <el-aside width="60px"><img src="@/assets/mo.png" width="50px" height="50px" class="img-round"></el-aside>
                        <el-container>
                            <el-header style="height:20px">
                                <div style="float:left">{{item.publisher}}</div>
                                <div style="float:right">{{item.created_at | dateFormat}}</div>
                            </el-header>
                            <el-main style="padding-top:5px; padding-bottom:20px">{{item.content}}</el-main>
                        </el-container>
                    </el-container>
                </div>
                <!-- 分页 -->
                <div class="block pagination">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
                    </el-pagination>
                </div>
                <div class="card-title">留言：</div>
                <el-form ref="form" :model="form" label-width="80px">
                    <el-form-item>
                        <el-input type="textarea" :rows="5" placeholder="添加回复" v-model="form.content"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submit">提交</el-button>
                    </el-form-item>
                </el-form>
            </el-card>
        </div>
    </div>
</template>
<script>
import {
        filesList,
        commentTAdd,
        commentTList
    } from '../../api/api'
    import moment from 'moment'
export default {
   data() {
            return {
                listLoading: false,
                id: 0,
                data: {},
                files: [],
                commentList: [],
                total: 0,
                page: 1,
                pageSize: 10,
                form: {
                    content: ''
                }
            }
        },
         created() {
            this.getCommentList();
        },
         methods: {
              getCommentList: function() {
                commentTList({
                    page: this.page,
                    page_size: this.pageSize
                }).then(res => {
                    if (res.err_code == 0) {
                        this.commentList = res.data.comments;
                        this.total = res.data.total;
                    }
                })
            },
             submit: function() {
                if (this.form.content == "") {
                    this.$message({
                        message: '请填写内容',
                        type: 'warning'
                    })
                    return false
                }
                let param = {
                    content: this.form.content
                }
                commentTAdd(param).then(res => {
                    if (res.err_code == 0) {
                        this.$message({
                            message: '提交成功',
                            type: 'success'
                        });
                        this.form.content = ""
                        this.getCommentList();
                    }
                })
            }, 
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getTestList();
            },
         },
        filters: {
            dateFormat(value) {
                return moment(value).format("YYYY-MM-DD HH:mm:ss");
            },
        }
}
</script>

<style scoped>
.comment-title {
        border-bottom: 1px solid #f4f4f4;
        padding-bottom: 30px;
    }
    .comment {
        border-bottom: 1px solid #f4f4f4;
        margin-top: 15px
    }
    .img-round {
        border-radius: 50%;
        border: 1px solid #c1c1c1
    }
    i {
        margin-right: 5px;
    }
    li {
        list-style: none
    }
    .file-a {
        margin-right: 10px
    }
    .content-card {
        margin: 0 50px;
    }
    .title {
        text-align: center;
        font-size: 18px;
        font-weight: bold;
    }
    .card-title {
        font-weight: bold;
        color: #475669;
        margin-bottom: 20px;
    }
    .title-tag {
        float: right;
    }
    .card-div {
        margin-top: 20px;
    }
    .card-bottom {
        margin-bottom: 20px;
        margin-left: 20px;
        padding: 0px 100px;
    }
    .text {
        font-size: 14px;
    }
    .item {
        margin-bottom: 18px;
        text-indent: 20px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both;
    }
   
    .pagination {
        text-align: center;
    }
</style>

