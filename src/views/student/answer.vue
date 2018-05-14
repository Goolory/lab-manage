<template>
    <section>
        <el-table :highlight-current-row="true" v-loading="listLoading" :data="tableData" style="width: 100%;">
            <el-table-column type="index" width="60" prop="id">
            </el-table-column>
            <el-table-column prop="title" label="测试名称">
            </el-table-column>
            <el-table-column prop="content" label="测试内容">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="created_at" label="创建时间" :formatter="dateFormat">
            </el-table-column>
            <el-table-column label="操作" width="250">
                <template scope="scope">
                      <el-button  size="mini" @click="uploadAnswer(scope.row.id)">答题</el-button>
</template>
			</el-table-column>
        </el-table>  

        <!--工具条-->
		<el-col :span="24" class="toolbar-foot">
			<el-pagination layout="prev, pager, next"@current-change="handleCurrentChange"  :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

 <el-dialog title="答题" :visible.sync="addFormVisible">
            <el-form ref="addForm" label-width="80px" :model="form">
            <el-input type="textarea" :rows="10" placeholder="内容" v-model="form.content"></el-input>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAdd">取消</el-button>
                <el-button type="primary" @click="add">确定</el-button>
            </div>
        </el-dialog>

  </section>  
</template>

<script>
    import moment from 'moment'
    import {
        answerAdd,
        quesionSList,
        homeworkAdd
    } from '../../api/api'
    export default {
        data() {
            return {
                total: 0,
                page: 1,
                pageSize: 10,
                tableData: [],
                listLoading: false,
                addFormVisible: false,
                form: {
                    content: ''
                },
                question_id: 0,
            }
        },
        created() {
            this.getQuestionList()
        },
        methods: {
            closeAdd() {
                this.form.content = '';
                this.question_id = 0;
                this.addFormVisible = false;
            },
            add() {
                let params = {
                    question_id: this.question_id,
                    content: this.form.content
                }
                console.log(params)
                answerAdd(params).then(res => {
                    if (res.err_code == 0) {
                        this.$message({
                            message: '上传成功',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: '上传失败',
                            type: 'warning'
                        });
                    }
                    this.closeAdd()
                })
            },
            uploadAnswer(id) {
                this.addFormVisible = true;
                this.question_id = id;
            },
           
            getQuestionList: function() {
                let params = {
                    page: this.page,
                    page_size: this.pageSize
                }
                console.log(params)
                quesionSList(params).then(res => {
                    console.log(res);
                    this.tableData = res.data.question;
                    this.total = res.data.total;
                })
            },
            dateFormat(row, colum) {
                return moment(row.created_at).format("YYYY-MM-DD HH:mm:ss");
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getTestList();
            },
        }
    }
</script>

<style scoped>
    .toolbar-foot {
        background: #f2f2f2;
        padding: 10px
    }
</style>


