<template>
  <div>
    <h1 id="logo">Finance财务系统</h1>
    <el-row>
      <el-col :span="24">
        <el-menu default-active="statistice">
          <el-menu-item index="statistice" @click="jump('statistice')">
            <i class="el-icon-menu"></i>
            <span slot="title">数据统计</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="members" @click="jump('members')">
            <i class="el-icon-menu"></i>
            <span slot="title">管理员</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="product" @click="jump('product')">
            <i class="el-icon-menu"></i>
            <span slot="title">产品管理</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="classify" @click="jump('classify')">
            <i class="el-icon-menu"></i>
            <span slot="title">分类管理</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
          <el-menu-item index="orders" @click="jump('orders')">
            <i class="el-icon-menu"></i>
            <span slot="title">订单管理</span>
            <i class="el-submenu__icon-arrow el-icon-arrow-right"></i>
          </el-menu-item>
        </el-menu>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name:"navMenu",
  data(){
    return{}
  },
  methods:{
    jump(params){
      //console.log(params)
      this.$router.push({path:'/' + params})
    }
  }
};
</script>

<style scoped>
#logo {
  height: 60px;
  line-height: 60px;
  text-align: center;
  color: red;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>