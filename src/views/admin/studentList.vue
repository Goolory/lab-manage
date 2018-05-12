<template>
    <section>
        <el-col :span="24" class="toolbar">
            <el-form :model="filters" ref="form" label-width="100px">
                <el-form-item label="选择班级：" style="margin-bottom:0px;">
                    <template>
                        <el-select v-model="selectValue" filterable placeholder="请选择" @change="findStudent">
                            <el-option v-for="item in options" :key="item.id" :label="item.class_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="查询学生：" style="margin-bottom:0px;">
                    <el-col :span="6">
                        <el-input v-model="filters.username" placeholder="姓名"></el-input>
                    </el-col>
                    <el-col :span="4" class="line">
                        <el-button type="primary" @click="findStudent">查询</el-button>
                        <el-button type="primary" @click="allStudent">全部</el-button>
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
            <el-table-column type="index" width="60" prop="id">
            </el-table-column>
            <el-table-column prop="student_no" label="学号" >
            </el-table-column>
            <el-table-column prop="username" label="姓名" >
            </el-table-column>
            <el-table-column prop="class_name" label="班级" >
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

        <!--工具条-->
		<el-col :span="24" class="toolbar-foot">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="pageSize" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

        <!-- 编辑页面 -->
        <el-dialog title="编辑" :visible.sync="editFormVisible">
            <el-form :model="editForm">
                <el-form-item label="班级" :label-width="editFormWidth">
                    <template>
                        <el-select v-model="editValue" filterable placeholder="请选择">
                            <el-option v-for="item in options" :key="item.id" :label="item.class_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="学号(账号)" :label-width="editFormWidth">
                    <el-input v-model="editForm.student_no" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="editFormWidth">
                    <el-input v-model="editForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" :label-width="editFormWidth">
                    <el-input type="password" v-model="editForm.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeEdit">取消</el-button>
                <el-button type="primary" @click="editStudent">确定</el-button>
            </div>
        </el-dialog>

        <!-- 添加页面 -->
        <el-dialog title="添加学生" :visible.sync="addFormVisible">
            <el-form :model="addForm" label-width="80px">
                <el-form-item label="班级" :label-width="addFormWidth">
                    <template>
                        <el-select v-model="addValue" filterable placeholder="请选择">
                            <el-option v-for="item in options" :key="item.id" :label="item.class_name" :value="item.id">
                            </el-option>
                        </el-select>
                    </template>
                </el-form-item>
                <el-form-item label="学号(账号)" :label-width="addFormWidth">
                    <el-input v-model="addForm.student_no" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="姓名" :label-width="addFormWidth">
                    <el-input v-model="addForm.username" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="登录密码" :label-width="addFormWidth">
                    <el-input type="password" v-model="addForm.password" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="closeAdd">取消</el-button>
                <el-button type="primary" @click="addStudent">确定</el-button>
            </div>
        </el-dialog>
    </section>
</template>

<script>
import {classAll,studentAdd, studentList, studentInfo, studentUpdate, studentDel} from '../../api/api'
import moment from 'moment'
    export default {
        data() {
            return {
                total: 0,
                page: 1,
                pageSize: 10,
                sels: [], //列表选中列
                options:[],
                selectValue: '',
                listLoading: false,
                filters: {
                    username: ''
                },
                selectValue: '',
                tableData: [],
                addFormVisible: false,
                editFormVisible: false, //打开编辑页面
                editFormWidth: '120px',
                addFormWidth: '120px',
                addForm: {
                    username : '',
                    student_no: '',
                    password: '',
                },
                addValue: '',
                editForm: {
                    id: '',
                    username : '',
                    student_no: '',
                    password: '',
                },
                editValue: '',
            }
        },
        created() {
            this.getClassAll();
            this.getStudentList();
        },
        methods: {
            allStudent: function(){
                this.selectValue = '';
                this.filters.username = '';
                this.getStudentList();
            },
            findStudent: function(){
                this.getStudentList();
            },
            getClassAll: function() {
                classAll().then((res) => {
                    if (res.err_code == 0) {
                        this.options = res.data.class
                    }
                })
            },
            getStudentList: function(){
                let params = {
                    class_id: Number(this.selectValue),
                    username: this.filters.username,
                    page: this.page,
                    page_size: this.pageSize
                }
                console.log(params)
                studentList(params).then(res => {
                    console.log(res);
                    this.tableData = res.data.students;
                    this.total = res.data.total;
                })
            },
            editStudent: function(){
                let _this = this.editForm;
                if (this.editValue == "") {
                    this.$message({
                        message: '请选择班级',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.student_no == "") {
                    this.$message({
                        message: '请填写学号',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.username == "") {
                    this.$message({
                        message: '请填写姓名',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.password == "") {
                    this.$message({
                        message: '请填写密码',
                        type: 'warning'
                    });
                    return false;
                }
                
                let par = {
                    id: this.editForm.id,
                    student_no: this.editForm.student_no,
                    class_id: Number(this.editValue),
                    username: this.editForm.username,
                    password: this.editForm.password
                }
                studentUpdate(par).then((res) => {
                    if (res.err_code == 0) {
                        this.$message({
                            message: '编辑成功',
                            type: 'success'
                        })
                        this.closeEdit()
                        this.getStudentList()
                    } else {
                        this.$message({
                            message: '编辑失败',
                            type: 'warning'
                        })
                    }
                })
            },
            addStudent: function(){
                let _this = this.addForm;
                if (this.addValue == "") {
                    this.$message({
                        message: '请选择班级',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.student_no == "") {
                    this.$message({
                        message: '请填写学号',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.username == "") {
                    this.$message({
                        message: '请填写姓名',
                        type: 'warning'
                    });
                    return false;
                }
                if (_this.password == "") {
                    this.$message({
                        message: '请填写密码',
                        type: 'warning'
                    });
                    return false;
                }
                let params = {
                    class_id : Number(this.addValue),
                    username : this.addForm.username,
                    password : this.addForm.password,
                    student_no :this.addForm.student_no,
                }
                studentAdd(params).then(res => {
                    console.log(res);
                    if (res.err_code == 1002) {
                        this.$message({
                            message: "该学号已存在",
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
                        this.getStudentList();
                    }
                })
            },
            closeAdd: function() {
                this.addFormVisible = false
                this.addValue ="";
                this.addForm.username = "";
                this.addForm.password = "";
                this.addForm.student_no = "";
            },
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
                studentInfo({
                    id: row.id
                }).then((res) => {
                    if (res.err_code == 0) {
                        this.editForm = res.data.students;
                        this.editValue = res.data.class_id;
                    }
                })
            },
            closeEdit: function(){
                this.editFormVisible = false;
                this.editValue = '';
                this.editForm.username = '';
                this.editForm.password = '';
                this.editForm.student_no = '';
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
                    studentDel(para).then((res) => {
                        if (res.err_code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getStudentList();
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
                    studentDel(para).then((res) => {
                        if (res.err_code == 0) {
                            this.$message({
                                message: '删除成功',
                                type: 'success'
                            });
                            this.getStudentList();
                        } else {
                            this.$message.error('删除失败')
                        }
                        this.listLoading = false;
                    });
                }).catch(() => {});
            },
            handleCurrentChange(val) {
                this.page = val;
                this.getStudentList();
            },
            dateFormat(row, colum) {
                return moment(row.created_at).format("YYYY-MM-DD HH:mm:ss");
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
