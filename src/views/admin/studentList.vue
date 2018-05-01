<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :model="filters" ref="form" label-width="100px">
                <el-form-item label="选择班级：" style="margin-bottom:0px;">
                    <el-select v-model="filters.region" placeholder="请选择活动区域">
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="查询学生：" style="margin-bottom:0px;">
                    <el-col :span="6">
                        <el-input v-model="filters.name" placeholder="姓名"></el-input>
                    </el-col>
                    <el-col :span="4" class="line">
                        <el-button type="primary">查询</el-button>
                    </el-col>
                    <el-col :span="4" class="addS">
                        <el-button type="primary" @click="handleAdd">新增学生</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table  :highlight-current-row="true" v-loading="listLoading" :data="tableData" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="date" label="日期" sortable width="80">
            </el-table-column>
            <el-table-column prop="name" label="姓名" sortable width="80">
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            </el-table-column>
            <el-table-column prop="address" label="地址" :formatter="formatter">
            </el-table-column>
            <el-table-column label="操作" width="150">
                <template scope="scope">
                    <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                    <el-button type="danger" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
                </template>
			</el-table-column>
        </el-table>

        <!--工具条-->
		<el-col :span="24" class="toolbar-foot">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!-- 编辑页面 -->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
            <el-form :model="editForm">
                <el-form-item label="宏大的" :label-width="editFormWidth">
                    <el-input v-model="editForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editFormVisible = false">取消</el-button>
                <el-button type="primary" @click="editFormVisible = false">确定</el-button>
            </div>
        </el-dialog>

        <!-- 添加页面 -->
        <el-dialog title="添加学生" :visible.sync="addFormVisible">
            <el-form :model="addForm">
                <el-form-item label="宏大的" :label-width="addFormWidth">
                    <el-input v-model="addForm.name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addFormVisible = false">取消</el-button>
                <el-button type="primary" @click="addFormVisible = false">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                total:0,
                sels: [], //列表选中列
                listLoading: false,
                filters: {
                    name: ''
                },
                formInline: {
                    user: '',
                    region: ''
                },
                tableData: [{
                    date: '2016-05-02',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1518 弄'
                }, {
                    date: '2016-05-04',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1517 弄'
                }, {
                    date: '2016-05-01',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1519 弄'
                }, {
                    date: '2016-05-03',
                    name: '王小虎',
                    address: '上海市普陀区金沙江路 1516 弄'
                }],
                addFormVisible: false,
                editFormVisible: false, //打开编辑页面
                editFormWidth: '120px',
                addFormWidth: '120px',
                addForm: {
                    name : ''
                },
                editForm: {
                    name: '',
                }
            }
        },
        methods: {
            handleAdd: function() {
                this.addFormVisible = true;
            },
            formatter(row, column) {
                return row.address;
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            //显示编辑界面
            handleEdit: function(index, row) {
                this.editFormVisible = true;
                // this.editForm = Object.assign({}, row);
            },
            //删除
            handleDel: function(index, row) {
                this.$confirm('确认删除该记录吗?', '提示', {
                    type: 'warning'
                }).then(() => {
                    // this.listLoading = true;
                    // //NProgress.start();
                    // let para = { id: row.id };
                    // removeUser(para).then((res) => {
                    // 	this.listLoading = false;
                    // 	//NProgress.done();
                    // 	this.$message({
                    // 		message: '删除成功',
                    // 		type: 'success'
                    // 	});
                    // 	this.getUsers();
                    // });
                }).catch(() => {});
            },
            //批量删除
            batchRemove: function() {
                var ids = this.sels.map(item => item.id).toString();
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    // this.listLoading = true;
                    // //NProgress.start();
                    // let para = { ids: ids };
                    // batchRemoveUser(para).then((res) => {
                    // 	this.listLoading = false;
                    // 	//NProgress.done();
                    // 	this.$message({
                    // 		message: '删除成功',
                    // 		type: 'success'
                    // 	});
                    // 	this.getUsers();
                    // });
                }).catch(() => {});
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getUsers();
            },
        }
    }
</script>

<style scoped>
    .toolbar-foot {
        background: #f2f2f2;
        padding: 10px
    }
    .toolbar {
        background: #f2f2f2;
        padding: 10px 0px;
        margin: 10px 0px;
    }
    .tool-item {
        margin-bottom: 0px !important;
    }
    .addS {
        text-align: right;
    }
    .line {
        margin-left: 10px;
    }
</style>
