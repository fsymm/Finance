<template>
  <div>
    <!-- 添加按钮 -->
    <div class="menu">
      <el-button type="primary" @click="openAddMember">添加</el-button>
    </div>
    <!-- 管理员展示 -->
    <el-table :data="managerList" style="width: 100%" v-loading="loading">
      <el-table-column prop="id" label="ID" width="180"> </el-table-column>
      <el-table-column prop="memberName" label="用户名" width="180">
      </el-table-column>
      <el-table-column prop="role" label="权限">
        <template v-slot="scope">
          <!-- <p>{{ scope.row.role == 0 ? "超级管理员" : "管理员" }}</p> -->
          <p v-if="scope.row.role == 0">超级管理员</p>
          <p v-else-if="scope.row.role == 1">管理员</p>
          <p v-else-if="scope.row.role == 2">预览者</p>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="180">
        <template v-slot="scope">
          <el-button type="primary" size="mini">编辑</el-button>&nbsp;&nbsp;
          <el-popconfirm title="你确定要删除此用户吗？" @confirm="deleteManager(scope.row.id)">
            <el-button slot="reference" type="danger" size="mini">删除</el-button>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      background
      layout="prev, pager, next" :page-size="5" @current-change="getManagerList"
      :total="managerCount"></el-pagination>
    <AddManager :addVisible="addVisible"></AddManager>
  </div>
</template>

<script>
import AddManager from "./components/AddManager.vue"
export default {
  name: "Member",
  components:{AddManager},
  data() {
    return {
      addVisible: false,
      managerCount:0,
      loading:false,
      managerList: [],
    };
  },
  mounted() {
    // 第一次DOM渲染完成之后
    this.getManagerList(1)
  },
  methods: {
    openAddMember() {
      this.addVisible = true;
    },
    getManagerList(page){
      var self = this;
      self.loading = true;
      sessionStorage.setItem("memberPage",page);
      var manager = JSON.parse(sessionStorage.getItem("manager"));
      self.$http
      .get("/api/v1/adminList", {
        headers: {
          token: manager.token,
        },
        params: {
          page: page,
          pageSize: 5,
        },
      })
      .then(
        function (res) {
          //console.log(res);
          if (res.data.code == 200) {
            self.managerCount = res.data.data.count;
            self.managerList = res.data.data.list;
            self.loading = false;
          }
        },
        function (error) {
          console.log(error);
          self.loading = false;
        }
      );
    },
    deleteManager(getId){
      //console.log(getId);
      var self = this;
      self.$http.delete("/api/v1/adminDel",{
        headers:{
          token:JSON.parse(sessionStorage.getItem("manager")).token
        },
        params:{"id":getId}
      }).then(function(res){
        //console.log(res);
        if (res.data.code == 200) {
          self.$message({
            duration:1000,
            message: res.data.info,
            type:"error",
            onClose:function(){
              // 在低级页删除，就必须停留在第几页（vuex状态管理）
              self.getManagerList(Number(sessionStorage.getItem("memberPage")));
            }
          });
        }
      });
    }
  },
};
</script>

<style scoped>
.menu {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  background-color: #ffffff;
  border-radius: 8px 8px 0 0;
  border-bottom: 1px solid #ddd;
}
</style>