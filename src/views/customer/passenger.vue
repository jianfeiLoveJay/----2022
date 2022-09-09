<template>
    <div class="selectdown" >
      <el-form :inline="true" :model="form" class="form-inline-query" style="width: 10%;">
      <el-form-item >
        <el-button class="commButton" type="primary" size="mini" @click="doAdd()" >添加</el-button>
      </el-form-item>
    </el-form>    

      <el-scrollbar height="800px">
      <el-table  class="table-content"
          :data="passengerdataList"
          border:true
          style="width: 55%;"
      >
        <el-table-column
        label="序号"
        fixed="left"
        width="50"          
        alignment="center"
        color="black"
        >
        <template v-slot="scope">
            {{ scope.$index+1 }}
        </template>
        </el-table-column>

        <el-table-column
        label="乘车人姓名"
        alignment="center"
        color="black"
        prop="passengername" />

        <el-table-column
        label="乘车人身份证号码"
        alignment="center"
        color="black"
        prop="passengernum" />

        <el-table-column
        label="乘车人手机号"
        alignment="center"
        color="black"
        prop="passengerphonenum" />
  
        <el-table-column
            label="操作"
            alignment="center"
            color="black"
            width="150"   
        >
        <template v-slot="scope">
        <el-button  type="primary" size="mini" @click="doEdit(scope.row.passengerId)">修改</el-button>
          <el-popconfirm title="确定删除该乘车人吗？" @confirm="doDelete(scope.row.passengerId)" @cancel="cancelEvent">
          <template #reference>
            <el-button type="primary" size="mini" >删除</el-button>
          </template>
          </el-popconfirm>
        </template>
        </el-table-column>
      </el-table>
      </el-scrollbar>
    </div>
  
    <el-dialog title="乘车人" v-model="editVisible" width="23%" >
    <el-scrollbar height="240px" >
    <el-form ref="editform" :model="editform" label-width="125px" class="form-div">
      
      <el-form-item label="乘坐人姓名">
        <el-input  v-model="editform.passengername" placeholder="请输入乘坐人姓名" style="width:160px" ></el-input>
      </el-form-item>
      <el-form-item label="乘坐人身份证号码">
        <el-input  v-model="editform.passengernum" placeholder="请输入乘坐人身份证号码" style="width:200px" ></el-input>
      </el-form-item>
      <el-form-item label="乘坐人手机号码">
        <el-input  v-model="editform.passengerphonenum" placeholder="请输入乘坐人手机号码" style="width:180px" ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="editButton" size="mini" type="primary"  style="width: 25%" @click="submit()">提交</el-button>
        <el-button  class="editButton" size="mini" style="width: 25%" @click="editVisible = false;">取消</el-button>
      </el-form-item>
    </el-form>
    </el-scrollbar>
    </el-dialog>
  </template>
  
  <script>
  import { ElMessage } from 'element-plus'
  import {getpassengerList,passengerDelete,getpassengerInfo,passengerSubmit} from '@/service/genServ.js'
  export default {
    name: 'order_form',
    data() {
      return {
        passengerdataList:[],
        form: {
        usernum:localStorage.getItem('usernum'),
        passengerId:null,
          passengername:'',
          passengernum:'',
          passengerphonenum:'',   
        },
        editform: {
        usernum:localStorage.getItem('usernum'),
        passengerId:null,
          passengername:'',
          passengernum:'',
          passengerphonenum:'',   
        },
        editVisible:false,
      }
    },
    created() {
      this.doQuery();
    },
    methods: {
      doQuery() {
        getpassengerList({'usernum':this.form.usernum}).then(res => {
          this.passengerdataList = res.data;
          console.log(res);
        })
      },

     doAdd() {
    this.editform.passengerId=null;
      this.editform.passengername="";
      this.editform.passengernum="";
      this.editform.passengerphonenum="";
      this.editVisible=true;

    },
    
      doDelete(passengerId) {
        passengerDelete({'passengerId':passengerId}).then(res => {
          console.log(res)
          ElMessage({
            message: '删除成功！',
            type: 'success',
          })
          this.doQuery();
        })
      },

      doEdit(passengerId) {
      this.editform.passengerId=passengerId;
      this.editVisible=true;
      getpassengerInfo({ 'passengerId':passengerId }).then(
        (res) => {
          this.editform = res.data;
        }
      );
    },

    submit() {
      const reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      if (!reg.test(this.editform.passengernum)){
        ElMessage({
          message: '请输入合法身份证号码',
          type: 'error',
        })
      }
      else if (this.editform.passengerphonenum.length !==11){
        ElMessage({
          message: '请输入合法手机号',
          type: 'error',
        })
      } 
      else{
      passengerSubmit({
        form: this.editform,
      }).then((res) => {
         ElMessage({
          message: '提交成功！',
          type: 'success',
        })
        this.editform.passengerId = res.data;
        this.editVisible=false;
        this.doQuery();
      });
    }
    },  
  
  
    }
  }
  </script>
  
  <style scoped>
  .selectdown{
    width: 1650px;
    position:absolute;
    top:100px;
    left:225px;
  }
  </style>
  