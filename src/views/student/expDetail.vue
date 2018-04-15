<template>
    <div class="card card-div" v-loading="listLoading">
        <el-card class="box-card card-bottom">
            <div class="text item">
                <p class="title">实验一</p>
            </div>
        </el-card>
        <el-card class="box-card card-bottom">
            <div class="card-title">一、实验描述：</div>
            <el-card shadow="never" class="text item content-card">
                验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回
            </el-card>
            <div class="card-title">二、实验内容：</div>
            <el-card shadow="never" class="text item content-card">
                验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回
            </el-card>
            <div class="card-title">三、实验附件：</div>
            <el-card shadow="never" class="text item content-card">
                验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回
            </el-card>
            <div class="card-title">四、教师意见：</div>
            <el-card shadow="never" class="text item content-card">
                验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回 验描述没啊哈忽视的回复哈啊哈速度发货安实验描述没啊哈忽视的回复哈啊哈速度发实验描述没啊哈忽视的回
            </el-card>
        </el-card>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                listLoading: false
            }
        }
    }
</script>

<style scoped>
    .content-card {
        margin: 0 50px
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


