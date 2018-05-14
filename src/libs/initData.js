export let studentMenu = [
    { path: '/S/home', name: '实验列表', iconCls: 'el-icon-tickets' },
    { path: '/S/homework', name: '课程作业', iconCls: 'el-icon-time' },
    { path: '/S/answer', name: '在线测试', iconCls: 'el-icon-edit' },
    { path: '/S/messageBoard', name: '留言板', iconCls: 'el-icon-edit'},
]

export let adminMenu = [
    { path: '', name: '用户管理', iconCls: 'el-icon-tickets',leaf: true, children: [
        { path: '/M/studentList', name: '学生列表' },
        { path: '/M/teacherList', name: '教师列表' },
    ] },
    { path: '/M/class', name: '班级管理', iconCls: 'el-icon-time' },
    { path: '/M/messageBoard', name: '留言板管理', iconCls: 'el-icon-edit' },
]

export let teacherMenu = [
    { path: '/T/home', name: '首页', iconCls: 'el-icon-location-outline' },
    { path: '', name: '实验管理', iconCls: 'el-icon-tickets',leaf: true, children: [
        { path: '/T/addExp', name: '创建实验' },
        { path: '/T/list', name: '全部实验' },
        { path: '/T/homework', name: '作业列表' },
        
    ] },
    { path: '', name: '在线练习', iconCls: 'el-icon-date',leaf: true, children: [
        { path: '/T/addWork', name: '布置任务' },
        { path: '/T/worklist', name: '任务列表' },
    ] },
    { path: '/T/messageBoard', name: '留言板', iconCls: 'el-icon-edit' },
]