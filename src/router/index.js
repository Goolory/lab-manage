import Router from 'vue-router'
import layout from '../components/layout.vue'
import Path from '../components/Path'

// const studentLogin = resolve => require(['../views/student/studentLogin.vue'], resolve)
import studentLogin from '../views/student/studentLogin'
const studentHome = resolve => require(['../views/student/home.vue'], resolve)
const expList = resolve => require(['../views/student/expList.vue'], resolve)
const expDetail = resolve => require(['../views/student/expDetail.vue'], resolve)
const forum = resolve => require(['../views/student/forum.vue'], resolve)
const studentMessageBoard = resolve => require(['../views/student/messageBoard.vue'], resolve)
const studentHomework = resolve => require(['../views/student/homework.vue'], resolve)
const studentAnswer = resolve => require(['../views/student/answer.vue'], resolve)

const test2 = resolve => require(['@/components/Path.vue'], resolve)
const adminLogin = resolve => require(['../views/admin/adminLogin.vue'], resolve)
const adminHome = resolve => require(['../views/admin/home.vue'], resolve)
const studentTable = resolve => require(['../views/admin/studentList.vue'], resolve)
const teacherTable = resolve => require(['../views/admin/teacherList.vue'], resolve)
const classTable = resolve => require(['../views/admin/class.vue'], resolve)
const adminIndex = resolve => require(['../views/admin/index.vue'], resolve)
const adminMessage = resolve => require(['../views/admin/messageBoard.vue'], resolve)

const teacherLogin = resolve => require(['../views/teacher/teacherLogin.vue'], resolve)
const teacherHome = resolve => require(['../views/teacher/home.vue'], resolve)
const tIndex = resolve => require(['../views/teacher/tIndex.vue'], resolve)
const addExp = resolve => require(['../views/teacher/addExp.vue'], resolve)
const listExp = resolve => require(['../views/teacher/listExp.vue'], resolve)
const addWork = resolve => require(['../views/teacher/addWork.vue'], resolve)
const workList = resolve => require(['../views/teacher/workList.vue'], resolve)
const testDetail = resolve => require(['../views/teacher/testDetail.vue'], resolve)
const teacherMessageBoard = resolve => require(['../views/teacher/messageBoard.vue'], resolve)
const teacherHomework = resolve => require(['../views/teacher/homework.vue'], resolve)


export default new Router({
  routes: [
    
    {
      path: '/',
      component: Path,
      name:'/',
    },
    {
      path: '/S/login',
      component: studentLogin,
      name: 'login',
    },

    {
      path: '/S',
      component: studentHome,
      name: '学生实验室',
      meta: {requiresAuthS: true},
      children:[
        { path: '/S/home', component: expList, name: '实验列表'},
        { path: '/S/detail', component: expDetail, name: '实验详情'},
        { path: '/S/homework', component: studentHomework, name: '课程作业'},
        { path: '/S/answer', component: studentAnswer, name: '在线测试'},
        { path: '/S/messageBoard', name:'留言板',component:studentMessageBoard}
      ]
    },
    {
      path:'/T/login',
      component:teacherLogin,
      name: '教师登录',
    },
    {
      path: '/T',
      component: teacherHome,
      name: '教师管理',
      meta: {requiresAuthT: true},
      children: [
        { path: '/T/home', component: tIndex, name: '实验列表'},
        { path: '/T/detail', component: testDetail, name: '实验详情'},
        { path: '', component: layout, name: '实验管理', children:[
          { path: '/T/addExp', component: addExp, name: '创建实验'},
          { path: '/T/list', component: listExp, name: "全部实验"},
          { path: '/T/homework', component: teacherHomework, name: "作业列表"}
        ]},
        { path: '', component: layout, name: '在线练习', children:[
          { path: '/T/addWork', component: addWork, name: '布置任务'},
          { path: '/T/workList', component: workList, name: "任务列表"}
        ]},
        { path: '/T/messageBoard', name: '留言板', component:teacherMessageBoard }
      ]
    },
    {
      path: '/M/login',
      component: adminLogin,
      name: '管理员登录',
    },
    {
      path: '/M',
      component: adminHome,
      name: '管理员系统',
      meta: {requiresAuth: true},
      children: [
        { path: '/M/list',meta: {requiresAuth: true}, component: adminIndex, name: '欢迎登录'},
        { path: '/M/detail', component: expDetail, name: '实验详情'},
        { path: '/M/class', component: classTable, name: '班级管理'},
        { path: '', name:'用户管理',component:layout, children:[
          { path: '/M/studentList', component: studentTable, name: '学生管理'},
          { path: '/M/teacherList', component: teacherTable, name: '教师管理'}
        ]},
        { path: '/M/messageBoard', component: adminMessage, name: '留言板管理'},
      ]
    }

]
})
