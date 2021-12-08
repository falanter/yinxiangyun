<template>
<div id="test">
  
  <div>test</div>
  <el-button>默认按钮</el-button>
  <el-button type="primary">主要按钮</el-button>
  <el-button type="primary" @click="a">change</el-button>
  <div v-html="previewContent"></div>
  <div class="flexbox">
    <div class="a">a</div>
    <div class="b">b</div>
  </div>
  
</div>
<!-- <div>
  <div v-show="toTest">show</div>
  <div v-show="!toTest">notShow</div>
</div> -->
</template>
<script>
//没有用api封装前,笔记本
// import request from '@/helpers/request'
// request('/auth').then(data=>{console.log(data)})
// request('/auth/login','POST',{username:'999',password:'123456'}).then(data=>{console.log(data)})
//用api封装后，笔记本
// import Auth from "@/apis/auth";
// Auth.getInfo().then((data) => {
//   console.log(data);
// });
// Auth.login({
//   username: "999",
//   password: "123456",
// }).then((data) => {
//   console.log(data);
// });
//api封装，笔记
// import Notes from '@/apis/notes'
// window.Notes=Notes
import { mapState, mapActions, mapGetters } from 'vuex'
import MarkdownIt from 'markdown-it'
let md=new MarkdownIt()
export default {
  data() {
    return {
      login: {
        username: "999",
        password: "123456",
      },
      isShowPreveiw:false,
      content:'# sdll'
    };
  },
  computed:{
    ...mapGetters([
          'toTest'
        ]),
      previewContent(){
		    return md.render(this.content||'')
      }
  },
  methods:{
    ...mapActions(['add','arr']),
    a(){
      //Vuex
      console.log(this.$store.state.poi)
      console.log(this.$store.getters.poi)
      console.log(this.$store.state.a)
      console.log(this.toTest)
      this.$store.commit("setCount",1)
      this.$store.dispatch("add",3)
      this.add(9)
    }
  }
};
</script>

<style lang="less" scoped>
body {
  div {
    color: green;
    
  }
}
#test{
  .flexbox{
    display: flex;
    width: 50px;
    height: 50px;
    background-color: #fff;
    .a{
      width: 25px;
    }
  }
}
</style>