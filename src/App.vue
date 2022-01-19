<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <Sidebar id="sidebar"></Sidebar>
    <router-view v-if="isRouterAlive"/>
  </div>
</template>

<script>
import Sidebar from '@/components/Sidebar'
export default {
  name: 'App',
  data(){
    return{
      isRouterAlive:true
    }
  },
  components:{
    Sidebar
  },
  methods:{
    reload(){
      this.isRouterAlive=false
      this.$nextTick(function(){
        this.isRouterAlive=true
      })
    },
    provide(){
      return{
        reload:this.reload
      }
    }
  }
}
</script>

<style>
*{
  margin:0;
  padding:0;
  box-sizing:border-box;
}
.el-button--default:hover{
  background-color: #d4f8e1 !important;
  color: #2dbe60 !important;
  border-color: #53ff8f !important;
}
.el-button--primary{
  background-color: #2dbe60 !important;
  border-color: #2dbe60 !important;
}
.el-button--primary:hover{
  background-color: #23a04f !important;
  border-color: #23a04f !important;
  color: #fff !important;
}
html, body, #app {
  height: 100%;
}
body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;  
  background-color: #eee;
}
a {
  text-decoration: none;
  color: #444;
}
ul, li{
  list-style: none;
}
#app {
  display: flex;
  align-items: stretch;
  position: relative;
}
</style>
