<template>
  <div>
    <el-container>
      <el-aside width="180px">
        <NavMenu></NavMenu>
      </el-aside>
      <el-container>
        <el-header>
          <LoginOut></LoginOut>
        </el-header>
        <el-main>
          <router-view/>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import NavMenu from "./components/NavMenu.vue"
import LoginOut from "./components/LoginOut.vue"
export default {
  name: "Home",
  components:{NavMenu,LoginOut},
  data() {
    return {};
  },
  methods: {},
};
</script>

<style scoped>
.el-container {
  width: 100%;
  height: 100vh;
}

.el-header {
  background-color: #ffffff;
  color: #333;
  text-align: center;
  line-height: 60px;
  display: flex;
  justify-content: flex-end;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  /* text-align: center; */
}
</style>
