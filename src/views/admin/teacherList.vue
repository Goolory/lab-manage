<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :model="filters" ref="form" label-width="100px">
                <el-form-item label="查询教师：" class="no-mbot">
                    <el-col :span="6">
                        <el-input v-model="filters.name" placeholder="姓名"></el-input>
                    </el-col>
                    <el-col :span="4" class="line">
                        <el-button type="primary" @click="findTeacher">查询</el-button>
                        <el-button type="primary" @click="allTeacher">全部</el-button>
                    </el-col>
                    <el-col :span="4" class="addS">
                        <el-button type="primary" @click="handleAdd">新增教师</el-button>
                    </el-col>
                </el-form-item>
            </el-form>
        </el-col>
        <el-table :highlight-current-row="true" v-loading="listLoading" :data="tableData" @selection-change="selsChange" style="width: 100%;">
            <el-table-column type="selection" width="55">
            </el-table-column>
            <el-table-column type="index" width="60">
            </el-table-column>
            <el-table-column prop="teacher_no" label="教工号" sortable width="120">
            </el-table-column>
            <el-table-column prop="teacher_name" label="教师姓名" sortable width="120">
            </el-table-column>
            <el-table-column prop="type" label="教师职称" :formatter="typeFormatter" width="120">
            </el-table-column>
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
<!-- 添加教授 -->
        <el-dialog title="添加教师" :visible.sync="addFormVisible">
            <el-form ref="addForm" :model="addForm" label-width="80px">
                <el-form-item label="教师编号(账号)" :label-width="addFormWidth">
                    <el-input v-model="addForm.teacher_no" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item  label="登录密码" :label-width="addFormWidth">
                    <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="教师姓名" :label-width="addFormWidth">
                    <el-input v-model="addForm.teacher_name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="教授职称"  :label-width="addFormWidth">
                    <el-radio-group v-model="addForm.type">
                    <el-radio label="1">教授</el-radio>
                    <el-radio label="2">讲师</el-radio>
                    </el-radio-group>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAdd">取消</el-button>
                <el-button type="primary" @click="addTeacher">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
    import {
        teacherList,
        teacherAdd,
        teacherDel
    } from "../../api/api"
    import moment from 'moment'
    export default {
        data() {
            return {
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
                    teacher_no: '',
                    teacher_name: '',
                    password: '',
                    type: '1'
                },
            }
        },
        created() {
            this.getTeacherList();
        },
        methods: {
            allTeacher: function() {
                this.filters.name = "";
                this.getTeacherList();
            },
            findTeacher: function() {
                this.getTeacherList();
            },
            closeAdd: function() {
                this.addFormVisible = false;
                this.addForm.teacher_no = '';
                this.addForm.teacher_name = '';
                this.addForm.password = '';
                this.addForm.type = '1'
            },
            addTeacher: function() {
                let _this = this;
                if (_this.addForm.teacher_no == "") {
                    _this.$message({
                        message: '请填写教师编号',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.addForm.password == "") {
                    _this.$message({
                        message: '请填写登录密码',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.addForm.teacher_name == "") {
                    _this.$message({
                        message: '请填写教师姓名',
                        type: 'warning'
                    });
                    return false;
                }
                console.log(this.addForm);
                let params = {
                    teacher_no: this.addForm.teacher_no,
                    teacher_name: this.addForm.teacher_name,
                    password: this.addForm.password,
                    type: Number(this.addForm.type)
                }
                teacherAdd(params).then(res => {
                    console.log(res);
                    if (res.err_code == 1002) {
                        this.$message({
                            message: "用户已存在",
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
                        this.getTeacherList();
                    }
                })
            },
            getTeacherList: function() {
                let params = {
                    teacher_name: this.filters.name,
                    page: this.page,
                    page_size: this.pageSize
                }
                console.log(params)
                teacherList(params).then(res => {
                    console.log(res);
                    this.tableData = res.data.teachers;
                    this.total = res.data.total;
                })
            },
            handleAdd: function() {
                this.addFormVisible = true;
            },
            dateFormat(row, colum) {
                return moment(row.created_at).format("YYYY-MM-DD HH:mm:ss");
            },
            typeFormatter(row, column) {
                if (row.type == 1) {
                    return "教授";
                } else if (row.type == 2) {
                    return "讲师";
                } else {
                    return ""
                }
            },
            selsChange: function(sels) {
                this.sels = sels;
            },
            //显示编辑界面
            handleEdit: function(index, row) {
                // this.editFormVisible = true;
                // this.editForm = Object.assign({}, row);
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
                    teacherDel(para).then((res) => {
                        if (res.err_code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getTeacherList();
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
                    teacherDel(para).then((res) => {
                        if (res.err_code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getTeacherList();
                        } else {
                            this.$message.error('删除失败')
                        }
                        this.listLoading = false;
                    });
                }).catch(() => {});
            },
            handleCurrentChange(val) {
                this.page = val;
                console.log(val)
                this.getTeacherList();
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
        text-align: right;
    }
    .line {
        margin-left: 10px;
    }
</style>
