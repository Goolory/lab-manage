<template>
  <section>
    <el-table :highlight-current-row="true" v-loading="listLoading" :data="tableData" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60" prop="id">
      </el-table-column>
      <el-table-column prop="title" label="实验名称">
      </el-table-column>
      <el-table-column prop="state" label="状态" :formatter="stateFormat" width="80" >
      </el-table-column>
      <el-table-column prop="describe" label="描述">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作" width="250">
        <template scope="scope">
                                      <el-button v-if="scope.row.state == 0" size="mini" @click="handleEdit(scope.$index, scope.row)">完成</el-button>
                                      <el-button size="mini" @click="linkDetail(scope.row.id)">详情</el-button>
                                      <el-button type="danger" size="mini" @click="handleDel(scope.$index, scope.row)">删除</el-button>
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
    testList,
    testDel,
    testUpdate
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
        userId: this.$store.state.teacherId,
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
        let params = {
          user_id: this.userId,
          page: this.page,
          page_size: this.pageSize
        }
        console.log(params)
        testList(params).then(res => {
          console.log(res);
          this.tableData = res.data.tests;
          this.total = res.data.total;
        })
      },
      handleEdit: function(index, row) {
        testUpdate({
          id: row.id
        }).then(res => {
          if (res.err_code == 0) {
            this.$message({
              message: '更新成功',
              type: 'success'
            });
            this.getTestList();
          }
        })
      },
      //删除
      handleDel: function(index, row) {
        this.$confirm('确认删除该记录吗?', '提示', {
          type: 'warning'
        }).then(() => {
          this.listLoading = true;
          let para = {
            ids: [row.id]
          };
          console.log(para)
          testDel(para).then((res) => {
            if (res.err_code == 0) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getTestList();
            } else {
              this.$message.error('删除失败')
            }
            this.listLoading = false;
          });
        }).catch(() => {});
      },
      dateFormat(row, colum) {
        return moment(row.created_at).format("YYYY-MM-DD HH:mm:ss");
      },
      selsChange: function(sels) {
        this.sels = sels;
      },
      stateFormat(row, colum) {
        return row.state === 0 ? "新发布" : "已完成"
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


