<template>
  <div>
    <el-table :highlight-current-row="true" :data="tableData" style="width: 100%;">
      <el-table-column type="index" width="60" prop="id">
      </el-table-column>
      <el-table-column prop="title" label="作业名称">
      </el-table-column>
      <el-table-column prop="content" label="内容">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" :formatter="dateFormat">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
                                <el-button size="small" @click="handleList(scope.$index, scope.row.id)">作业列表</el-button>
</template>
			</el-table-column>
        </el-table>  

         <!--工具条-->
		<el-col :span="24" class="toolbar-foot">
			<el-pagination layout="prev, pager, next"@current-change="handleCurrentChange"  :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

    <!-- 作业列表页面 -->
        <el-dialog title="作业列表" :visible.sync="workTableView">
            <el-table :highlight-current-row="true" :data="workTable" style="width: 100%;">
      <el-table-column type="index" width="60" prop="id">
      </el-table-column>
      <el-table-column prop="username" label="学生姓名">
      </el-table-column>
      <el-table-column prop="content" label="学生答案">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="created_at" label="提交时间" :formatter="dateFormat">
      </el-table-column>
       
        </el-table>  
        <el-col :span="24" class="toolbar-foot">
			<el-pagination layout="prev, pager, next"@current-change="handleCurrentChange1"  :page-size="pageSize1" :total="total1" style="float:right;">
			</el-pagination>
		</el-col>
            <div slot="footer" class="dialog-footer">
                <el-button @click="close">关闭</el-button>
            </div>
        </el-dialog>
  </div>  
</template>

<script>
  import {
    quesionTList,
    answerTList
  } from '../../api/api';
  import moment from 'moment'
  export default {
    data() {
      return {
        tableData: [],
        total: 0,
        page: 1,
        pageSize: 10,
        workTableView: false,
        workTable: [],
        total1: 0,
        page1: 1,
        pageSize1: 10,
      }
    },
    created() {
      this.getQuestion();
    },
    methods: {
      close() {
        this.workTableView = false;
      },
      getQuestion() {
        quesionTList({
          page: this.page,
          page_size: this.pageSize
        }).then(res => {
          if (res.err_code == 0) {
            this.tableData = res.data.question
            this.total = res.data.total
          }
        })
      },
      getAnswerList(id){
        let params = {
          question_id : id,
          page: this.page1,
          page_size: this.pageSize1

        }
        answerTList(params).then(res=>{
          if (res.err_code == 0) {
            this.workTable = res.data.answer
            this.total1 = res.data.total
          }
        })
      },
      handleCurrentChange(val) {
        this.page = val;
        this.getQuestion();
      },
      handleCurrentChange1(val) {
        this.page = val;
        // this.getQuestion();
      },
      dateFormat(row, colum) {
        return moment(row.created_at).format("YYYY-MM-DD HH:mm:ss");
      },
      handleList(index, id) {
        this.workTableView = true;
        this.getAnswerList(id);
      }
    },
  }
</script>

<style scoped>
  .toolbar-foot {
    background: #f2f2f2;
    padding: 10px
  }
</style>


