<template>
  <div >

    <el-card shadow="hover" style="height:570px;width:430px" class="card" >
      <div  class="clearfix">
          <span style="font-size: 20px;font-weight: bold; margin-left: 24px;">个人信息</span>
          <el-button type="text"  icon="el-icon-edit" style='float: right' @click="handleEdit()">编辑</el-button>
      </div>
      <el-row>
        <div class="infoText">身份证号:<span  style='margin-left: 30px'>{{myInfo.cusNum}}</span></div>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <div class="infoText">姓名:<span style='margin-left: 30px'>{{myInfo.cusName}}</span></div>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <div class="infoText">性别:<span style='margin-left: 30px'>{{myInfo.cussex}}</span></div>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <div class="infoText">邮箱:<span style='margin-left: 30px'>{{myInfo.cusemail}}</span></div>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <div class="infoText">电话:<span style='margin-left: 30px'>{{myInfo.cusphone}}</span></div>
      </el-row>
      <el-divider></el-divider>
      <el-row>
        <div class="infoText">住址:<span style='margin-left: 30px'>{{myInfo.cusaddress}}</span></div>
      </el-row>
    </el-card>

    <el-dialog title="编辑" v-model="editVisible" width="22%">
      <el-form  label-width="70px">
        <el-form-item label="身份证号">
            <el-input type='text' v-model="edit.cusNum" :disabled="true" ></el-input>
        </el-form-item>
        <el-form-item label="姓名">
            <el-input type='text' v-model="edit.cusName"></el-input>
        </el-form-item>
        <el-form-item label="性别">
          <el-select v-model="edit.cussex" placeholder="性别">
          <el-option
            v-for="item in options"
            :key="item.cussex"
            :label="item.label"
            :value="item.cussex"
          >
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item label="邮箱">
            <el-input type='text' v-model="edit.cusemail" ></el-input>
        </el-form-item>
        <el-form-item label="电话">
            <el-input type='text' v-model="edit.cusphone"></el-input>
        </el-form-item>
        <el-form-item label="地址">
        <el-input type='text' v-model="edit.cusaddress"></el-input>
        </el-form-item>
      </el-form>
      <span  class="dialog-footer">
        <el-button @click="editVisible = false;this.doQuery();">取消</el-button>
        <el-button type="primary" @click="saveEdit()">修改</el-button>
      </span>
    </el-dialog>
  </div>

  <div class="demo-image__preview">
    <el-carousel height="600px" >
    <el-image
      style="width: 1000px; height: 600px"
      :src="require('@/assets/3.jpg')"
    >
    </el-image>

    </el-carousel>
  </div>
</template>

<script>
import { ref} from 'vue'
import  '@/views/common/login'
import { ElMessage } from 'element-plus'
import { getcustomerInfo,customerSubmit } from '@/service/genServ.js'
export default {
  name: "personal_information",
  data() {
    return {
      options: ref([
        {
          cussex: '男',
          label: '男',
        },
        {
          cussex: '女',
          label: '女',
        },
      ]),
      sid:localStorage.getItem('sid'),
      myInfo: {
        cusNum:'',
        cusName:'',  
        cussex:'',  
        cusemail:'',
        cusphone:'',
        cusaddress:'',
    },
    edit: {
        cusNum:'',
        cusName:'',  
        cussex:'',  
        cusemail:'',
        cusphone:'',
        cusaddress:'',
    },
    editVisible: false,
    passwordForm:{
        oldPassword:"",
        newPassword:'',
        confirmPwd:'',
    },
    passwordVisible:false,
    };
  },
  created() {
    this.doQuery();
  },
  methods: {
    doQuery() {
         getcustomerInfo({'userId':this.sid}).then((res) => {
          this.myInfo = res.data;
        }
      );

    },

    handleEdit() {
      this.edit = this.myInfo;
      this.editVisible = true;
    },

    saveEdit() {
      const emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
      if (!emailReg.test(this.edit.cusemail)) {
        ElMessage({
          message: '请输入合法邮箱',
          type: 'error',
        })
      } 
      else if (this.edit.cusphone.length !==11){
        ElMessage({
          message: '请输入合法手机号',
          type: 'error',
        })
      }
      // else if (this.edit.stuNum.length !==18){
      //   ElMessage({
      //     message: '请输入合法身份证号',
      //     type: 'error',
      //   })
      // }
      else{
        this.editVisible = false;
        customerSubmit({form:this.edit}).then((res)=>{
          console.log(res);
          ElMessage({
          message: '个人信息修改成功！',
          type: 'success',
        })
          this.doQuery();
        }
      )}
    },   
   
  },
}
</script>

<style scoped>
.card{
  position: absolute;
  left: 250px;
}
.infoText {
    font-size: 20px;
    font-weight: bold;
    margin-left: 24px;
    margin-top: 14px;
    color: #1f2f3d;
}
.demo-image__preview{
  position: absolute;
  left: 750px;
}
</style>
