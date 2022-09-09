<template>
<div  class="form-div">
    <el-card shadow="hover" style="height:320px;width:400px" class="card">
      <div  class="clearfix">
          <span>修改密码</span>
      </div>
      <el-form>
        <br/>
        <el-row>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="10">
            <el-form-item label="旧密码" prop="oldPas" label-width=80px>
              <el-input v-model="oldPassword" :type="passw" style="width: 200px;background-color: #f4f4f5"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="10">
            <el-form-item label="新密码" prop="oldPas" label-width=80px>
              <el-input v-model="newPassword" :type="passw"  style="width: 200px;background-color: #f4f4f5"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="2">
            &nbsp;
          </el-col>
          <el-col :span="10">
            <el-form-item label="确认密码" prop="oldPas" label-width=80px>
              <el-input v-model="newPassword1" :type="passw"  style="width: 200px;background-color: #f4f4f5"/>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row >
          <el-col :span="4">
          &nbsp;
          </el-col>
          <el-col :span="10">
            <el-form-item alignment="center" style="width: 100%">
              <el-popconfirm title="确定要修改密码吗？" @confirm="submit" @cancel="cancelEvent">
              <template #reference>
              <el-button type="primary" style="position:relative;left:50px" >提交</el-button>
              </template>
              </el-popconfirm>  
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      </el-card>
   </div>
   <div class="demo-image__preview">
    <el-image
      style="width: 1000px; height: 600px"
      :src="require('@/assets/2.jpg')"
    >
    </el-image>
  </div>
</template>

<script>
import {changePassword} from '@/service/genServ.js'
import { ElMessage } from 'element-plus'
export default {
  name: 'changePassword',
  data() {
    return {
      passw: 'password',
      oldPassword: '',
      newPassword: '',
      newPassword1: '',
    }
  },
  methods: {
    submit() {
      if (this.newPassword !== this.newPassword1) {
        ElMessage({
          message: '两次输入密码不一致',
          type: 'warning',
        })
      } 
      else {
        changePassword({ 'oldPassword': this.oldPassword, 'newPassword': this.newPassword }).then(response => {
         console.log(response)
         if (response.msg == '修改成功') {
          ElMessage({
          message: '修改成功',
          type: 'success',
        })
         this.oldPassword= '',
      this.newPassword='',
      this.newPassword1= ''
        } 
        else if (response.msg == '原密码错误') {
          ElMessage({
          message: '原密码错误',
          type: 'error',
        })
        } 
          else {
          ElMessage({
          message: response.msg,
          type: 'error',
        })
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.form-div{
  position:absolute;
  top:150px;
  left:280px;
}
.demo-image__preview{
  position: absolute;
  left: 800px;
}
</style>