import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: ()=>import('@/components/Login')
    },{
      path:'/note',
      component:()=>import('@/components/NoteDetail')
    },{
      path:'/empty',
      component:()=>import('@/components/empty')
    }
  ]
})
