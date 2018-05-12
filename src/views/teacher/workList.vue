<template>
  <div>
    <el-table :highlight-current-row="true" v-loading="listLoading" :data="tableData" @selection-change="selsChange" style="width: 100%;">
      <el-table-column type="selection" width="55">
      </el-table-column>
      <el-table-column type="index" width="60" prop="id">
      </el-table-column>
      <el-table-column prop="student_no" label="学号">
      </el-table-column>
      <el-table-column prop="username" label="姓名">
      </el-table-column>
      <el-table-column prop="class_name" label="班级">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="created_at" label="创建时间" :formatter="dateFormat">
      </el-table-column>
      </el-table-column>
      <el-table-column prop="updated_at" label="更新时间" :formatter="dateFormat">
      </el-table-column>
      <el-table-column label="操作" width="150">
        <template scope="scope">
                      <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                      <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
</template>
			</el-table-column>
        </el-table>  
  </div>  
</template>

<script>
  export default {
    data(){
      return {
        tableData: []
      }
    }
  }
</script>

<style scoped>
   
</style>


