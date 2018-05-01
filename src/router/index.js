import Router from 'vue-router'
import layout from '../components/layout.vue'
import Path from '../components/Path'

// const studentLogin = resolve => require(['../views/student/studentLogin.vue'], resolve)
import studentLogin from '../views/student/studentLogin'
const studentHome = resolve => require(['../views/student/home.vue'], resolve)
const expList = resolve => require(['../views/student/expList.vue'], resolve)
const expDetail = resolve => require(['../views/student/expDetail.vue'], resolve)
const forum = resolve => require(['../views/student/forum.vue'], resolve)
const test2 = resolve => require(['@/components/Path.vue'], resolve)
const adminLogin = resolve => require(['../views/admin/adminLogin.vue'], resolve)
const adminHome = resolve => require(['../views/admin/home.vue'], resolve)
const studentTable = resolve => require(['../views/admin/studentList.vue'], resolve)
const teacherTable = resolve => require(['../views/admin/teacherList.vue'], resolve)


export default new Router({
  routes: [
    
    {
      path: '/S/login',
      component: studentLogin,
      name: 'login',
    },

    {
      path: '/',
      component: Path,
      name:'/',
    },
    {
      path: '/S',
      component: studentHome,
      name: '学生实验室',
      meta: {requiresAuth: true},
      children:[
        { path: '/list', component: expList, name: '实验列表'},
        { path: '/detail', component: expDetail, name: '实验详情'},
        { path: '/page2', component: test2, name: '课程作业'},
        { path: '', name:'答疑讨论',component:layout, children:[
          { path: '/forum', component: forum, name: '讨论区'}
        ]}
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
        { path: '/M/list',meta: {requiresAuth: true}, component: expList, name: '实验列表'},
        { path: '/M/detail', component: expDetail, name: '实验详情'},
        { path: '/page55', component: test2, name: '课程作业'},
        { path: '', name:'用户管理',component:layout, children:[
          { path: '/M/studentList', component: studentTable, name: '学生管理'},
          { path: '/M/teacherList', component: teacherTable, name: '教师管理'}
        ]}
      ]
    }

]
})
