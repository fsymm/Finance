<template>
  <div id="login" v-loading="loading" element-loading-text="正在登陆中...">
    <main>
      <h2>Finance 财务管理系统</h2>
      <input type="text" v-model="userName" placeholder="请输入用户名" />
      <input type="password" v-model="userPwd" placeholder="请输入密码" />
      <!-- <button @click="login">登录</button> -->
      <el-button type="primary" @click="login">登 录</el-button>
    </main>
  </div>
</template>

<script>
export default {
  name: "Login",
  data() {
    return {
      userName: "",
      userPwd: "",
      loading: false,
    };
  },
  beforeCreate(){
    // vue实例还没创建之前
  },
  created(){
    // vue实例创建完成之后
    // 拦截登录状态 有没有更好的方式？ 1、路由守卫 2、axios拦截器
    // var manager = JSON.parse(sessionStorage.getItem("manager"))
    // if (manager.memberName) {
    //   this.$router.push({path:"/home"})
    // }
  },
  methods: {
    login() {
      var self = this;
      this.loading = true;
      if (self.userName === "" || self.userPwd === "") {
        self.$message({
          duration: 1000,
          message: "用户名或密码不能为空",
          type: "error",
          onClose: function () {
            self.loading = false;
          },
        });
      } else {
        // console.log(self)
        self.$http
          .post("/api/v1/login", {
            memberName: self.userName, //用户名
            memberPass: self.userPwd, //密码
          })
          .then(
            function (res) {
              console.log(res);
              if (res.data.code === 201) {
                self.$message({
                  duration: 1000,
                  message: res.data.info,
                  type: "error",
                  onClose: function () {
                    self.loading = false;
                  },
                });
              } else {
                self.$message({
                  duration: 1000,
                  message: res.data.info,
                  type: "success",
                  onClose: function () {
                    self.loading = false;
                    // 跳转之前，把用户信息存储起来
                    sessionStorage.setItem("manager",JSON.stringify(res.data.data))
                    self.$router.push({ path: "/home" });
                  },
                });
              }
            },
            function (error) {
              // console.log(error)
            }
          );
      }
      // setTimeout(function () {
      //   self.loading = true;
      //   self.$router.push({path:"/home"});
      // }, 2000);
    },
  },
};
</script>

<style scoped>
#login {
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: url(../../assets/images/bg.png) no-repeat 0 0;
  background-size: 100% 100%;
}
#login main {
  width: 500px;
  margin: 0 auto;
  padding: 20px;
  box-sizing: border-box;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 5px;
}
#login input {
  width: 100%;
  height: 48px;
  border: 1px solid #ddd;
  border-radius: 5px;
  margin: 10px 0;
  padding: 0 10px;
  box-sizing: border-box;
}
#login h2 {
  text-align: center;
  margin-bottom: 20px;
  color: red;
}
#login input {
  height: 38px;
  border: 1px solid #ddd;
  padding: 0 10px;
  box-sizing: border-box;
  border-radius: 5px;
  margin-bottom: 20px;
}
#login button {
  width: 100%;
}
</style>