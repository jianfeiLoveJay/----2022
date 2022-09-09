<template>
<body id="poster" >
  <div class="login">
    <el-form class="login-container" label-position="left" label-width="0px" @submit.prevent="handleSubmit">
      <h3 class="login_title">火车票售票系统</h3>
        <el-form-item>   
            <el-input type="text" v-model="username" name="username" auto-complete="off" placeholder="账号" ></el-input>     
        </el-form-item>
        <el-form-item>
            <el-input type="password" v-model="password" name="password" auto-complete="off" placeholder="密码" ></el-input> 
        </el-form-item>
        <el-row>
        <el-form-item style="width: 100%">
            <el-button class="btn btn-primary" type="primary" style="width: 30%;background: #505458;border: none" v-on:click="handleSubmit">登录</el-button>
            <el-button class="btn btn-primary" type="primary" style="width: 30%;background: #505458;border: none" v-on:click="signup">注册</el-button>
        </el-form-item>
        </el-row>
    </el-form>
  </div>
</body>
</template>

<script>
import { ElMessage } from 'element-plus'
import router from '@/router/index.js';
export default {
  name: 'login',
   data () {
        return {
            username: '',
            password: '',
        }
    },
  methods: {
    handleSubmit() {
      // this.$message.error(localStorage.getItem('username'));
      if (!this.username && !this.password){
        ElMessage({
          message: '请输入账号和密码',
          type: 'warning',
        })
      }
      if (!this.username && this.password){
        ElMessage({
          message: '请输入账号',
          type: 'warning',
        })
      }
      if (this.username && !this.password){
         ElMessage({
          message: '请输入密码',
          type: 'warning',
        })
      }
      if (this.username && this.password) {
        this.$store.dispatch("login", {
          username: this.username,
          password: this.password,       
        }).catch(() => {
             ElMessage({
          message: '账号或密码错误',
          type: 'error',
        })
        });
      }
    },

    signup() {
     router.push('/signup')
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
  .login-container {
    opacity:0.8;
    border-radius: 10px;
    /* background-clip: padding-box; */
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: rgb(219, 210, 231);
    border: 1px solid #7a648b;
    box-shadow: 0 0 25px #5e97ad;
    position:absolute;
    top:50%;
    left:50%;
    margin-top:-175px;;
    margin-left:-175px;;
  }
  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }
</style>