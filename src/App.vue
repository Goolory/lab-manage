<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
  import {
    getToken
  } from "./api/api"
  export default {
    watch: {
      '$route': function(to, from) {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
        // token验证功能
        
        if (to.matched.some(record => record.meta.requiresAuth)) {
          console.log(getToken())
          if (!getToken()) {
            this.$message("登录过期，请重新登录");
            this.$router.push({path: "/"});
          }
        }
      }
    },
  }
</script>

<style>
  html {
    height: 100%;
  }
  body {
    margin: 0px;
    padding: 0px;
  }
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }
</style>
