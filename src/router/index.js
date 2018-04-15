import Router from 'vue-router'
import layout from '../components/layout.vue'
import Path from '../components/Path'

// const studentLogin = resolve => require(['../views/student/studentLogin.vue'], resolve)
import studentLogin from '../views/student/studentLogin'
const studentHome = resolve => require(['../views/student/home.vue'], resolve)
const expList = resolve => require(['../views/student/expList.vue'], resolve)
const expDetail = resolve => require(['../views/student/expDetail.vue'], resolve)
const test = resolve => require(['@/components/Footer.vue'], resolve)
const test2 = resolve => require(['@/components/Path.vue'], resolve)
// import test from '@/components/Footer.vue'



export default new Router({
  routes: [
    
    {
      path: '/login',
      component: studentLogin,
      name: 'login',
    },

    {
      path: '/',
      component: Path,
      name:'/',
    },
    {
      path: '/',
      component: studentHome,
      name: '学生实验室',
      children:[
        { path: '/S/list', component: expList, name: '实验列表'},
        { path: '/S/detail', component: expDetail, name: '实验详情'},
        { path: '/page2', component: test2, name: '课程作业'}
      ]
    }

]
})
