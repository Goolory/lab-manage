<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :model="filters" ref="form" label-width="100px">
                <el-col :span="4" class="addS">
                    <el-button type="primary" @click="handleAdd">新增班级</el-button>
                </el-col>
            </el-form>
        </el-col>
        <el-table :highlight-current-row="true" v-loading="listLoading" :data="tableData" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60" prop="id">
            </el-table-column>
            <el-table-column prop="class_name" label="班级名称" sortable >
            </el-table-column>
            <el-table-column prop="teacher_name" label="科任老师" sortable>
            </el-table-column>
            <el-table-column prop="created_at" label="添加时间" :formatter="dateFormat " sortable>
            </el-table-column>
            </el-table-column>
            <el-table-column prop="updated_at" label="更新时间" :formatter="dateFormat" sortable>
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
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>
        <!-- 编辑页面 -->
        <el-dialog title="编辑班级" :visible.sync="editFormVisible">
            <el-form ref="editForm" :model="editForm" label-width="80px">
                <el-form-item label="指派教师" :label-width="addFormWidth">
                    <template>
                        <el-select v-model="editValue" filterable placeholder="请选择">
                            <el-option v-for="item in options" :key="item.id" :label="item.teacher_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="班级名称" :label-width="addFormWidth">
                    <el-input v-model="editForm.class_name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取消</el-button>
                <el-button type="primary" @click="editClass">确定</el-button>
            </div>
        </el-dialog>
        <!-- 添加页面 -->
        <el-dialog title="添加班级" :visible.sync="addFormVisible">
            <el-form ref="addForm" :model="addForm" label-width="80px">
                <el-form-item label="指派教师" :label-width="addFormWidth">
                    <template>
                        <el-select v-model="value" filterable placeholder="请选择">
                            <el-option v-for="item in options" :key="item.id" :label="item.teacher_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="班级名称" :label-width="addFormWidth">
                    <el-input v-model="addForm.class_name" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAdd">取消</el-button>
                <el-button type="primary" @click="addClass">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {
        classDel,
        classInfo,
        classUpdate,
        teacherAll,
        classAdd,
        classList,
    } from "../../api/api"
    import moment from 'moment'
    export default {
        data() {
            return {
                options: [],
                value:'',
                total: 0,
                sels: [], //列表选中列
                listLoading: false,
                total: 0,
                page: 1,
                pageSize: 10,
                filters: {
                    name: ''
                },
                formInline: {
                    user: '',
                    region: ''
                },
                tableData: [],
                addFormVisible: false,
                addFormWidth: '120px',
                addForm: {
                    teacher_id: '',
                    class_name: ''
                },
                editFormVisible: false,
                editForm: {
                    id:'',
                    teacher_id: '',
                    class_name: ''
                },
                editValue: '',
            }
        },
        created() {
            this.getClassList();
        },
        methods: {
            closeEdit: function() {
                this.editFormVisible = false;
                this.editValue = '';
                this.editForm.class_name = '';
            },
            editClass: function() {
                let _this = this;
                if (_this.editValue == "") {
                    _this.$message({
                        message: '请指派教师',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.editForm.class_name == "") {
                    _this.$message({
                        message: '请填写班级',
                        type: 'warning'
                    });
                    return false;
                }
                
                let par = {
                    id: this.editForm.id,
                    class_name: this.editForm.class_name,
                    teacher_id: Number(this.editValue),
                }
                classUpdate(par).then((res) => {
                    if (res.err_code == 0) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.closeEdit()
                        this.getClassList()
                    } else {
                        this.$message({
                            message: '编辑失败',
                            type: 'warning'
                        })
                    }
                })
            },
            closeAdd: function() {
                this.addFormVisible = false;
                this.value = '';
                this.addForm.class_name = '';
            },
            addClass: function() {
                let _this = this;
                if (_this.addForm.class_name == "") {
                    _this.$message({
                        message: '请填写班级名称',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.value == "") {
                    _this.$message({
                        message: '请指派教师',
                        type: 'warning'
                    });
                    return false;
                }
                let params = {
                    teacher_id: Number(this.value),
                    class_name: this.addForm.class_name
                }
                console.log(params)
                classAdd(params).then(res => {
                    console.log(res);
                    if (res.err_code == 1002) {
                        this.$message({
                            message: "班级已存在",
                            type: "error"
                        });
                        this.addForm.teacher_no = '';
                        return false;
                    } else if (res.err_code == 0) {
                        this.$message({
                            message: "添加成功",
                            type: "success"
                        });
                        this.closeAdd();
                        this.getClassList();
                    }
                })
            },
            getClassList: function() {
                let params = {
                    page: this.page,
                    page_size: this.pageSize
                }
                console.log(params)
                classList(params).then(res => {
                    console.log(res);
                    this.tableData = res.data.class;
                    this.total = res.data.total;
                })
            },
            handleAdd: function() {
                this.addFormVisible = true;
                teacherAll().then((res) => {
                    if (res.err_code == 0) {
                        this.options = res.data.teachers
                    }
                })
            },
            dateFormat(row, colum) {
                return moment(row.created_at).format("YYYY-MM-DD HH:mm:ss");
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            //显示编辑界面
            handleEdit: function(index, row) {
                this.editFormVisible = true;
                teacherAll().then((res) => {
                    if (res.err_code == 0) {
                        this.options = res.data.teachers
                    }
                });
                classInfo({
                    id: row.id
                }).then((res) => {
                    console.log(res.data)
                    if (res.err_code == 0) {
                        this.editForm = res.data.class
                        this.editValue = res.data.teacher_id
                    }
                })
                console.log(row.id)
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
                    classDel(para).then((res) => {
                        if (res.err_code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getClassList();
                        } else {
                            this.$message.error('删除失败')
                        }
                        this.listLoading = false;
                    });
                }).catch(() => {});
            },
            //批量删除
            batchRemove: function() {
                var ids = this.sels.map(item => item.id);
                console.log(ids)
                this.$confirm('确认删除选中记录吗？', '提示', {
                    type: 'warning'
                }).then(() => {
                    this.listLoading = true;
                    let para = {
                        ids: ids
                    };
                    classDel(para).then((res) => {
                        if (res.err_code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getClassList();
                        } else {
                            this.$message.error('删除失败')
                        }
                        this.listLoading = false;
                    });
                }).catch(() => {});
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getClassList();
            },
        }
    }
</script>

<style scoped>
    .no-mbot {
        margin-bottom: 0px;
    }
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
        margin-left: 20px
    }
    .line {
        margin-left: 10px;
    }
</style>
