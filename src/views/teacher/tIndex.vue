<template>
    <div class="card-div" v-loading="listLoading">
        <!-- template实验列表 -->
        <el-card class="box-card card-bottom" v-for="(item, index) in listData">
            <div slot="header" class="clearfix">
                <span>{{item.title}}</span>
                <el-tag v-if="item.state == 0" class="title-tag" type="success">新发布</el-tag>
                <el-tag v-else="item.state == 1" class="title-tag" type="success">已完成</el-tag>
            </div>
            <div class="describe-card">
            <span>实验描述：</span>
            <div class="text item" v-html="item.describe">
            </div>
            <el-row>
                <el-col :span="20">
                    <span class="note">发布时间：{{item.created_at | dateFormat}}</span>
                    <span class="note">发布人：{{item.teacher_name}}</span>
                </el-col>
                <el-col :span="4">
                    <el-button class="round-btn" type="primary" size="mini" round @click="linkDetail(item.id)">查看详情</el-button>
                </el-col>
            </el-row>
            </div>
        </el-card>
        <!-- template实验列表 -->
        <div class="block pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page" :page-size="pageSize" layout="total, prev, pager, next" :total="total">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    import {
        testList
    } from '../../api/api'
    import moment from 'moment'
    export default {
        data() {
            return {
                listLoading: false,
                listData: [],
                total: 0,
                page: 1,
                pageSize: 10,
                userId: 0
            }
        },
        created() {
            this.getTestList()
        },
        methods: {
            
            linkDetail: function(id) {
                console.log(id)
                this.$router.push({
                    path: '/T/detail?id=' + id,
                })
            },
            getTestList: function() {
                let userId = this.$store.state.teacherId;
                let params = {
                    user_id: userId,
                    page: this.page,
                    page_size: this.pageSize
                }
                console.log(params)
                testList(params).then(res => {
                    console.log(res);
                    this.listData = res.data.tests;
                    this.total = res.data.total;
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
.describe-card{
    margin: 0 50px
}
    .title-tag {
        float: right;
    }
    .card-div {
        margin-top: 20px;
    }
    .card-bottom {
        /* margin-bottom: 20px; */
        margin: 0 80px 20px;

    }
    .text {
        font-size: 14px;
    }
    .item {
        margin-bottom: 18px;
        margin-left: 40px;
    }
    .clearfix:before,
    .clearfix:after {
        display: table;
        content: "";
    }
    .clearfix:after {
        clear: both;
    }
    .note {
        font-size: 12px;
        font: #bfcbd9;
        display: block;
    }
    .pagination {
        text-align: center;
    }
</style>

