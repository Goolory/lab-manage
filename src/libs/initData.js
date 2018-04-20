export let studentMenu = [
    { path: '/S/list', name: '实验列表', iconCls: 'el-icon-tickets' },
    { path: '/page2', name: '课程作业', iconCls: 'el-icon-time' },
    { path: '/page5', name: '在线测试', iconCls: 'el-icon-edit' },
    { path: '', name: '答疑讨论', iconCls: 'el-icon-service',leaf: true, children: [
        { path: '/S/forum', name: '讨论区' },
        { path: '/page6', name: '留言板' },
    ] },
]