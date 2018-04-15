<template>
  <div>
      <!-- <v-header></v-header> -->
      <router-view></router-view>
      <v-footer></v-footer>
      <el-input v-model="input" placeholder="请输入内容"></el-input>
  </div>
  
</template>

<script>
import footer from './Footer.vue'
export default {
    data() {
    return {
      input: ''
    }
  },
  components:{
      "v-footer": footer,
  }
}
</script>

<style>

</style>


