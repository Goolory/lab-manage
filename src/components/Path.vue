<template>
  <div class="container">
    <ul>
       <!-- <li><a href="/login">学生登录</a></li>  -->
      <!-- <li><a href="/">教师登录</a></li>
      <li><a href="/">管理员登录</a></li>  -->
      <li><router-link to="/S/login">学生登录</router-link></li>
      <li><router-link to="/T/login">教师登录</router-link></li>
      <li><router-link to="/M/login">管理员登录</router-link></li>
      <li><a target="_blank" href="http://localhost:5001/doc/#!index.md">接口文档</a></li>
      
      
    </ul>
  </div>
</template>

<script>

export default {
  data () {
    return {}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.container{
  text-align: center;
  margin: 100px;
}
ul li {
  list-style: none;
  line-height: 40px;
}
</style>
