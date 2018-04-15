<template>
  <div class="container">
    <ul>
       <!-- <li><a href="/login">学生登录</a></li>  -->
      <!-- <li><a href="/">教师登录</a></li>
      <li><a href="/">管理员登录</a></li>  -->

      <router-link to="/login">学生登录</router-link>
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

ul li {
  list-style: none
}
</style>
