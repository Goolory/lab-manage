export let studentMenu = [
    { path: '/S/list', name: '实验列表', iconCls: 'el-icon-tickets' },
    { path: '/page2', name: '课程作业', iconCls: 'el-icon-time' },
    { path: '/page5', name: '在线测试', iconCls: 'el-icon-edit' },
    { path: '', name: '答疑讨论', iconCls: 'el-icon-service',leaf: true, children: [
        { path: '/S/forum', name: '讨论区' },
        { path: '/page6', name: '留言板' },
    ] },
]

export let adminMenu = [
    { path: '', name: '用户管理', iconCls: 'el-icon-tickets',leaf: true, children: [
        { path: '/M/studentList', name: '学生列表' },
        { path: '/M/teacherList', name: '教师列表' },
    ] },
    { path: '/M/list', name: '实验管理', iconCls: 'el-icon-setting' },
    { path: '/page2', name: '班级管理', iconCls: 'el-icon-time' },
    { path: '/page5', name: '留言板管理', iconCls: 'el-icon-edit' },
]