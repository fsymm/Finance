import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {$request} from "./utils/request.js"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false
Vue.prototype.$http=$request
Vue.use(ElementUI);

//全局路由守卫
router.beforeEach(function(to,from,next){
	var manager=JSON.parse(sessionStorage.getItem("manager"))
	if(manager && manager.token){
		if(to.name=="Login" && to.path=="/"){
			next("/home") //只放行 “/home”
		}else{
			next()//放行，访问任何路由地址都可以
			//next(false)
		}
	}else{
		if(to.name!="Login" && to.path!="/"){
			next("/")
		}else{
			next()
		}
	}
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')