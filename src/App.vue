<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  watch:{
    '$route': function(to, from){
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
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
