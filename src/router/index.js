import Router from 'vue-router'
import layout from '../components/layout.vue'
import Path from '../components/Path'

// const studentLogin = resolve => require(['../views/student/studentLogin.vue'], resolve)
import studentLogin from '../views/student/studentLogin'
const studentHome = resolve => require(['../views/student/home.vue'], resolve)
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
      path: '/S',
      component: studentHome,
      name: 's',
      children:[
        { path: '/page1', component: test, name: 'page1'},
        { path: '/page2', component: test2, name: 'page2'}
      ]
    }

]
})
