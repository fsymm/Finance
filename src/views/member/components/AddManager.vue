<template>
  <div>
    <!-- 添加的弹框 -->
    <el-dialog title="添加管理员" :visible.sync="addVisible" width="30%" :before-close="closeAddManager">
      <el-form :label-position="labelPosition" label-width="80px" :model="manager" ref="addManager">
        <el-form-item label="管理员" prop="member"
          :rules="[{ required: true, message: '请输入管理员', trigger: 'blur' },]">
          <el-input v-model="manager.member" placeholder="请输入管理员"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input v-model="manager.password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="role"
          :rules="[{ required: true, message: '请选择权限', trigger: 'blur' }]">
          <el-select v-model="manager.role" clearable placeholder="-请选择-">
            <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeAddManager">取 消</el-button>
        <el-button type="primary" @click="addMember('addManager')">添 加</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "AddManager",
  props: ["addVisible"],
  data() {
    return {
      labelPosition: "right",
      manager: {
        member: "",
        password: "",
        role: "",
      },
      roleList: [{
          value: '0',
          label: '超级管理员'
        }, {
          value: '1',
          label: '管理员'
        }, {
          value: '2',
          label: '预览者'
        },
      ]
    };
  },
  methods: {
    closeAddManager() {
      //console.log(this)
      this.$parent.addVisible = false;
    },
    addMember(params) {
      var self = this;
      this.$refs[params].validate((valid) => {
        if (valid) {
          console.log(self.manager);
          //var manager = JSON.parse(sessionStorage.getItem("manager"));
          self.$http({
              url: "/adminAdd",
              method: "post",
              data: {
                "memberName": self.manager.member, //用户名
                "memberPass": self.manager.password, //密码
                "role": self.manager.role, //权限
              },
            })
            .then(function (res) {
              console.log(res);
              // 201 判断用户名已存在
              if (res.data.code == 201) {
                self.$message({
                  message: res.data.info,
                  type: "error",
                });
              }
              // 200 添加成功
              if (res.data.code == 200) {
                self.$message({
                  message: res.data.info,
                  type: "success",
                  // 关闭弹框
                  onClose: function () {
                    self.closeAddManager();
                    self.$parent.getManagerList(1);
                  },
                });
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style scoped>
</style>