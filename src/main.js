import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from "axios"
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
Vue.prototype.$http = axios
Vue.config.productionTip = false

// 路由守卫（拦截登录状态）
router.beforeEach(function(to,from,next){
  //console.log(to,from);
  var manager = JSON.parse(sessionStorage.getItem("manager"));
  //console.log(manager)
  if (manager && manager.token) {
    if(to.name == "Login" && to.path == "/"){
      next("/home");
    } else{
      next();
    }
  } else{
    if (to.name != "Login" && to.path != "/") {
      next("/");
    } else{
      next();
    }
  }
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
