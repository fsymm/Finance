import Vue from 'vue'
import VueRouter from 'vue-router'
// 解决路由的重复点击报错的问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location){
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: ()=>import("../views/login/Login.vue")   //箭头函数，懒加载
  },
  {
    path: '/home',
    name: 'Home',
    component: ()=>import("../views/home/Home.vue"),
    children:[
      {
        path:"/members",
        name:"Members",
        component:()=>import("../views/member/Member.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
