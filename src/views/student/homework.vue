<template>
  <section>
    <el-table :highlight-current-row="true" v-loading="listLoading" :data="tableData" style="width: 100%;">
      <el-table-column type="index" width="60" prop="id">
      </el-table-column>
      <el-table-column prop="title" label="实验名称">
      </el-table-column>
      <el-table-column prop="homework" label="作业内容">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template scope="scope">
              <el-button  size="mini" @click="uploadFile(scope.row.id)">上传作业</el-button>
</template>
			</el-table-column>
        </el-table>  

        <!--工具条-->
		<el-col :span="24" class="toolbar-foot">
			<el-pagination layout="prev, pager, next"@current-change="handleCurrentChange"  :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

 <el-dialog title="上传作业" :visible.sync="addFormVisible">
            <el-form ref="addForm" label-width="80px">
                <el-form-item label="作业">
            <el-upload class="upload-demo long" action="http://localhost:8080/cmn/fileupload" :on-success="upfile" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" multiple :limit="1" :on-exceed="handleExceed" :file-list="fileList">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip ">可上传.xls,.xlsx,.doc,.txt,.pdf,.jpg,.png,.jpeg,.zip...文件</div>
            </el-upload>
        </el-form-item>
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
    testSList,
    homeworkAdd
  } from '../../api/api'
  export default {
    data() {
      return {
        total: 0,
        page: 1,
        pageSize: 10,
        sels: [], //列表选中列
        tableData: [],
        listLoading: false,
        addFormVisible: false,
        fileList: [],
        upload_id: 0,
        file_path: ''
      }
    },
    created() {
      this.getTestList()
    },
    methods: {
      closeAdd() {
        this.upload_id = 0;
        this.file_path=  '';
        this.addFormVisible = false;
      },
      add() {
        let params = {
          parent_id: this.upload_id,
          file_path: this.file_path
        }
        console.log(params)
        homeworkAdd(params).then(res => {
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
      uploadFile(id) {
        this.addFormVisible = true;
        this.upload_id = id;
      },
      upfile: function(res, file, fileList) {
        if (res.err_code == 0) {
          this.file_path = res.data;
          console.log(res)
        }
      },
      getTestList: function() {
        let params = {
          page: this.page,
          page_size: this.pageSize
        }
        console.log(params)
        testSList(params).then(res => {
          console.log(res);
          this.tableData = res.data.tests;
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
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePreview(file) {
        console.log(file.response);
      },
      handleExceed(files, fileList) {
        this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${ file.name }？`);
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


