<template>
    <div class="card-div" v-loading="listLoading">
        <!-- template实验列表 -->
        <el-card class="box-card card-bottom">
            <div slot="header" class="clearfix">
                <span>实验名称：实验一</span>
                <el-tag class="title-tag" type="success">新发布</el-tag>
            </div>
            <span>实验描述：</span>
            <div class="text item">实验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 复哈啊哈速度发实验描述没啊哈忽视的回复哈啊哈速度发徽省豆腐花很多啊就是地方哈坚实的
            </div>
            <el-row>
                <el-col :span="20">
                    <span class="note">发布时间：2018-4-15</span>
                    <span class="note">截止时间：2018-4-15</span>
                    <span class="note">发布人：xxx老师</span>
                </el-col>
                <el-col :span="4">
                    <el-button class="round-btn" type="primary" round @click="$router.push({path: '/S/detail'})">查看详情</el-button>
                </el-col>
            </el-row>
        </el-card>
        <!-- template实验列表 -->
        <el-card class="box-card card-bottom">
            <div slot="header" class="clearfix">
                <span>实验名称：实验二</span>
                <el-tag class="title-tag" type="danger">已完成</el-tag>
            </div>
            <span>实验描述</span>
            <div class="text item">实验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 复哈啊哈速度发实验描述没啊哈忽视的回复哈啊哈速度发徽省豆腐花很多啊就是地方哈坚实的
            </div>
            <el-row>
                <el-col :span="20">
                    <span class="note">发布时间：2018-4-15</span>
                    <span class="note">发布人：xxx老师</span>
                </el-col>
                <el-col :span="4">
                    <el-button class="round-btn" type="primary" round>查看详情</el-button>
                </el-col>
            </el-row>
        </el-card>


        <el-card class="box-card card-bottom">
            <div slot="header" class="clearfix">
                <span>实验名称：实验一</span>
                <el-tag class="title-tag" type="success">新发布</el-tag>
            </div>
            <span>实验描述：</span>
            <div class="text item">实验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 复哈啊哈速度发实验描述没啊哈忽视的回复哈啊哈速度发徽省豆腐花很多啊就是地方哈坚实的
            </div>
            <el-row>
                <el-col :span="20">
                    <span class="note">发布时间：2018-4-15</span>
                    <span class="note">截止时间：2018-4-15</span>
                    <span class="note">发布人：xxx老师</span>
                </el-col>
                <el-col :span="4">
                    <el-button class="round-btn" type="primary" round @click="$router.push({path: '/S/detail'})">查看详情</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card class="box-card card-bottom">
            <div slot="header" class="clearfix">
                <span>实验名称：实验一</span>
                <el-tag class="title-tag" type="success">新发布</el-tag>
            </div>
            <span>实验描述：</span>
            <div class="text item">实验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 复哈啊哈速度发实验描述没啊哈忽视的回复哈啊哈速度发徽省豆腐花很多啊就是地方哈坚实的
            </div>
            <el-row>
                <el-col :span="20">
                    <span class="note">发布时间：2018-4-15</span>
                    <span class="note">截止时间：2018-4-15</span>
                    <span class="note">发布人：xxx老师</span>
                </el-col>
                <el-col :span="4">
                    <el-button class="round-btn" type="primary" round @click="$router.push({path: '/S/detail'})">查看详情</el-button>
                </el-col>
            </el-row>
        </el-card>
        <div class="block pagination">
            <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage1" :page-size="100" layout="total, prev, pager, next" :total="1000">
            </el-pagination>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listLoading: false,
                currentPage1: 1
            }
        },
        methods: {
            handleSizeChange(val) {
                console.log(`每页 ${val} 条`);
            },
            handleCurrentChange(val) {
                console.log(`当前页: ${val}`);
            }
        }
    }
</script>


<style scoped>
    .title-tag {
        float: right;
    }
    .card-div {
        margin-top: 20px;
    }
    .card-bottom {
        margin-bottom: 20px
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
    .note {
        font-size: 12px;
        font: #bfcbd9;
        display: block;
    }
    .pagination {
        text-align: center;
    }
</style>

