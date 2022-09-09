<template>
  <div class="selectdown" >

    <el-scrollbar height="800px">
    <el-table  class="table-content"
        :data="dataList"
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
      label="用户ID"
      alignment="center"
      color="black"
      prop="userId" />

      <el-table-column
      label="用户名"
      alignment="center"
      color="black"
      prop="username" />

      <el-table-column
      label="用户身份证号码"
      alignment="center"
      color="black"
      prop="usernum" />

      <el-table-column
      label="用户类型"
      alignment="center"
      color="black"
      prop="usertype.name" />

      <el-table-column
          label="操作"
          alignment="center"
          color="black"
          width="150"   
      >
      <template v-slot="scope">
        <el-popconfirm title="确定禁用该用户吗？" @confirm="dochange(scope.row.userId,scope.row.usertype.id)" @cancel="cancelEvent">
        <template #reference>
          <el-button type="primary" size="mini"  :disabled="scope.row.usertype.id == '2'  ?  false : true" >禁用</el-button>
        </template>
        </el-popconfirm>
        <el-popconfirm title="确定启用该用户吗？" @confirm="dochange(scope.row.userId,scope.row.usertype.id)" @cancel="cancelEvent">
        <template #reference>
          <el-button type="primary" size="mini"  :disabled="scope.row.usertype.id == '3'  ?  false : true" >启用</el-button>
        </template>
        </el-popconfirm>
      </template>
      </el-table-column>
    </el-table>
    </el-scrollbar>
  </div>
</template>

<script>
import { ElMessage } from 'element-plus'
import {getuserList,usertypechange} from '@/service/genServ.js'
export default {
  name: 'user_management',
  data() {
    return {
      dataList:[],
      form: {
      userId:null,
      username:'',
      usernum:'',
      usertype:'',   
      },
    }
  },
  created() {
    this.doQuery();
  },
  methods: {
    doQuery() {
      getuserList().then(res => {
        this.dataList = res.data;
        console.log(res)
      })
    },

  dochange(userId,usertype){
    usertypechange({
      "userId":userId,"usertype":usertype
    }).then((res) => {
      this.doQuery();
      location. reload();
       ElMessage({
        message: '用户权限变更成功！',
        type: 'success',
      })
      console.log(res);
      this.doQuery();
    });
    
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
