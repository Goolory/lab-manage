<template>
  <section>
    <el-table :highlight-current-row="true" v-loading="listLoading" :data="tableData" style="width: 100%;">
      <el-table-column type="index" width="60" prop="id">
      </el-table-column>
      <el-table-column prop="title" label="实验名称">
      </el-table-column>
      <el-table-column prop="student_name" label="学生姓名">
      </el-table-column>
      <el-table-column prop="class_name" label="班级">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作" width="250">
          
        <template scope="scope">
			<i class="el-icon-document"></i><a :href="scope.row.file_path" target="_blank" class="file-a">下载</a>
              
</template>
			</el-table-column>
        </el-table>  

        <!--工具条-->
		<el-col :span="24" class="toolbar-foot">
			<el-pagination layout="prev, pager, next"@current-change="handleCurrentChange"  :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

  </section>  
</template>

<script>
  import moment from 'moment'
  import {
    homeworkTList,
  } from '../../api/api'
  export default {
    data() {
      return {
        total: 0,
        page: 1,
        pageSize: 10,
        tableData: [],
        listLoading: false,
      }
    },
    created() {
      this.getTestList()
    },
    methods: {
      
    
      getTestList: function() {
        let params = {
          page: this.page,
          page_size: this.pageSize
        }
        console.log(params)
        homeworkTList(params).then(res => {
          console.log(res);
          this.tableData = res.data;
          this.total = res.count;
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


