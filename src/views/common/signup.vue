<template>
<body id="poster">
  <div class="signup">
    <el-form class="signup-container" label-position="left" label-width="0px" @submit.prevent="handleSubmit">
      <h3 class="signup_title">用户注册</h3>
      <el-form-item>
        <el-select v-model="signup.usertype" placeholder="账号类型">
          <el-option
            v-for="item in options"
            :key="item.usertype"
            :label="item.label"
            :value="item.usertype"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <!-- <el-form-item>   
            <el-input type="text" v-model="signup.usertype" name="usertype" auto-complete="off" placeholder="账号类型" ></el-input>     
        </el-form-item> -->
        <el-form-item>   
            <el-input type="text" v-model="signup.cusName" name="cusName" auto-complete="off" placeholder="用户名" ></el-input>     
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="signup.cusNum" name="cusNum" auto-complete="off" placeholder="身份证号" ></el-input> 
        </el-form-item>
        <el-form-item>
        <el-select v-model="signup.cussex" placeholder="性别">
          <el-option
            v-for="item in options1"
            :key="item.cussex"
            :label="item.label"
            :value="item.cussex"
          >
          </el-option>
        </el-select>
      </el-form-item>
        <!-- <el-form-item>
            <el-input type="text" v-model="signup.cussex" name="cussex" auto-complete="off" placeholder="性别" ></el-input> 
        </el-form-item> -->
        <el-form-item>
            <el-input type="text" v-model="signup.cusemail" name="cusemail" auto-complete="off" placeholder="邮箱" ></el-input> 
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="signup.cusphone" name="cusphone" auto-complete="off" placeholder="电话" ></el-input> 
        </el-form-item>
        <el-form-item>
            <el-input type="text" v-model="signup.cusaddress" name="cusaddress" auto-complete="off" placeholder="住址" ></el-input> 
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="signup.password" name="password" auto-complete="off" placeholder="密码" ></el-input> 
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="signup.passwordq" name="passwordq" auto-complete="off" placeholder="确认密码" ></el-input> 
        </el-form-item>
        <el-row>
        <el-form-item style="width: 100%">
            <el-button class="btn btn-primary" type="primary" style="width: 30%;background: #505458;border: none" v-on:click="handleSubmit">注册</el-button>
            <el-button class="btn btn-primary" type="primary" style="width: 30%;background: #505458;border: none" v-on:click="cancel">取消</el-button>
        </el-form-item>
        </el-row>
    </el-form>
  </div>
</body>
</template>

<script>
import { ref} from 'vue'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js';
import { usersignupReq } from '@/service/userServ.js'
import { createuser } from '@/service/genServ.js'
export default {
  name: 'signup',
   data () {
        return {
          options: ref([
        {
          usertype: '1',
          label: '管理员',
        },
        {
          usertype: '2',
          label: '用户',
        },
      ]),
      options1: ref([
        {
          cussex: '男',
          label: '男',
        },
        {
          cussex: '女',
          label: '女',
        },
      ]),
          signup:{
            usertype:'',
            cusName: '',
            cusNum: '',
            cussex: '',
            cusemail: '',
            cusphone: '',
            cusaddress: '',
            password: '',
            passwordq: '',
          }
        }
    },
  methods: {
    handleSubmit() {
      const emailReg = /^\w{3,}(\.\w+)*@[A-z0-9]+(\.[A-z]{2,5}){1,2}$/;
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (this.signup.usertype==""||this.signup.cusName==""||this.signup.cusNum==""||this.signup.cussex==""||this.signup.cusemail==""||this.signup.cusphone==""||
      this.signup.cusaddress==""||this.signup.password==""||this.signup.passwordq==""){
        ElMessage({
          message: '请输入完整信息',
          type: 'error',
        })
      }
      else if (!reg.test(this.signup.cusNum)){
        ElMessage({
          message: '请输入合法身份证号码',
          type: 'error',
        })
      }
      else if (!emailReg.test(this.signup.cusemail)) {
        ElMessage({
          message: '请输入合法邮箱',
          type: 'error',
        })
      } 
      else if (this.signup.cusphone.length !==11){
        ElMessage({
          message: '请输入合法手机号',
          type: 'error',
        })
      }    
      else if (this.signup.password !==this.signup.passwordq){
        ElMessage({
          message: '两次输入密码不一致',
          type: 'error',
        })
      }
      
      // this.$message.error(localStorage.getItem('username'));
      else{
        usersignupReq(this.signup.cusName,this.signup.password,this.signup.cusNum,this.signup.usertype).then(res => {
        console.log(res)
        if(res=="用户注册成功!")
        {
        if(this.signup.usertype==1)
        {
          createuser({form:this.signup}).then((res1)=>{
          console.log(res1);
          ElMessage({
          message: '注册成功！',
          type: 'success',
        })
        router.push('/login')
        }
      )
        }
        else{
          createuser({form:this.signup}).then((res1)=>{
          console.log(res1);
          ElMessage({
          message: '注册成功！',
          type: 'success',
        })
        router.push('/login')
        }
      )
        }
      }
      else{
        ElMessage({
          message: res,
          type: 'error',
        })
      }
        
      })  
      }
    },

    cancel() {
     router.push('/login')
    },

  }
}
</script>

<style>
  #poster {
    background-image:url("../../assets/13.webp");
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }
  body{
    margin: 0px;
  }
  .signup-container {
    opacity:0.8;
    border-radius: 10px;
    /* background-clip: padding-box; */
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgb(219, 210, 231);
    border: 1px solid #7a648b;
    box-shadow: 0 0 25px #5e97ad;
    position:absolute;
    top:25%;
    left:50%;
    margin-top:-175px;;
    margin-left:-175px;;
  }
  .signup_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>