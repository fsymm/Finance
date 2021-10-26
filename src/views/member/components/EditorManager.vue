<template>
  <div>
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑管理员" :visible.sync="EditorVisible" width="30%"
      :before-close="closeEditorManager">
      <el-form :label-position="labelPosition" label-width="80px" ref="addManager">
        <el-form-item label="管理员" prop="userName"
          :rules="[{ required: true, message: '请输入管理员', trigger: 'blur' },]">
          <el-input v-model="editorManager.memberName" placeholder="请输入管理员"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPwd"
          :rules="[{ required: true, message: '请输入密码', trigger: 'blur' }]">
          <el-input v-model="editorManager.memberPass" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item label="权限" prop="role"
          :rules="[{ required: true, message: '请选择权限', trigger: 'blur' }]">
          <el-select v-model="editorManager.role" clearable placeholder="-请选择-">
            <el-option v-for="item in roleList" :key="item.value" :label="item.label" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="closeEditorManager">取 消</el-button>
        <el-button type="primary" @click="EManager">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "EditorManager",
  props: ["EditorVisible", "editorManager"],
  data() {
    return {
      labelPosition: "right",
      roleList: [
        {
          value: 0,
          label: "超级管理员",
        },
        {
          value: 1,
          label: "管理员",
        },
        {
          value: 2,
          label: "预览者",
        },
      ],
    };
  },
  methods: {
      closeEditorManager(){
          this.$parent.EditorVisible = false;
      },
      EManager(){
        // 通过js获取props的值
        console.log(this.$props.editorManager);
        var self = this;
        self.$http.post("/adminUpdate",this.$props.editorManager).then(function(res){
            console.log(res);
            if (res.data.code == 200) {
                self.$message({
                    message: "更新成功",
                    type: "success",
                    duration: 1000,
                    onClose:function(){
                        self.closeEditorManager();
                    }
                });
            }
        });
      }
  },
  
};
</script>

<style scoped>
</style>