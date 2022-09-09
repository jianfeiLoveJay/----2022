<template>
  <div class="selectdown">
    <el-scrollbar height="800px">
    <el-table  class="table-content"
        :data="dataList"
        border:true
        style="width: 100%;"
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
      label="下单时间"
      alignment="center"
      color="black"
      sortable
      prop="ordertime" />

      <el-table-column
      label="火车名称"
      alignment="center"
      color="black"
      prop="trainName" />

      <el-table-column
      label="火车类型"
      alignment="center"
      color="black"
      sortable
      prop="traintype" />

      <el-table-column
      label="火车出发地"
      alignment="center"
      color="black"
      sortable
      prop="trainbeginplace" />

       <el-table-column
      label="火车目的地"
      alignment="center"
      color="black"
      sortable
      prop="trainendplace" />

      <el-table-column
      label="火车出发日期"
      alignment="center"
      color="black"
      sortable
      prop="trainbeginday" />

       <el-table-column
      label="火车到达日期"
      alignment="center"
      color="black"
      sortable
      prop="trainendday" />

      <el-table-column
      label="火车出发时间"
      alignment="center"
      color="black"
      sortable
      prop="trainbegintime" />

       <el-table-column
      label="火车到达时间"
      alignment="center"
      color="black"
      sortable
      prop="trainendtime" />

      <el-table-column
      label="火车车厢号"
      alignment="center"
      color="black"
      sortable
      prop="trainroomnum" />

      <el-table-column
      label="车厢座号"
      alignment="center"
      color="black"
      sortable
      prop="seatnum" />

       <el-table-column
      label="座次票价"
      alignment="center"
      color="black"
      sortable
      prop="seatprice" />

      <el-table-column
      label="乘车人姓名"
      alignment="center"
      color="black"
      sortable
      prop="passengername" />


      <el-table-column
          label="操作"
          alignment="center"
          color="black"
          width="150"
      >
      <template v-slot="scope">
      <el-button  type="primary" size="mini" @click="doEdit(scope.row.orderId,scope.row.trainbeginday,scope.row.trainbegintime)">支付</el-button>
        <el-popconfirm title="确定取消支付订单吗？" @confirm="doDelete(scope.row.orderId,scope.row.trainbeginday,scope.row.trainbegintime)" @cancel="cancelEvent">
        <template #reference>
          <el-button type="primary" :icon="Delete" size="mini" >取消</el-button>
        </template>
        </el-popconfirm>
      </template>
      </el-table-column>
    </el-table>
    </el-scrollbar>
  </div>

  <el-dialog title="支付" v-model="payVisible" width="30%">
    <el-form ref="form" :model="form" label-width="125px" class="form-div">
      <el-form-item>
        <el-image
          class="demo-image__preview"
          :src="require('@/assets/111111.jpg')"
          :fit="fit" >
        </el-image>
      </el-form-item>
      <el-form-item>
        <el-button class="editButton" size="mini" type="primary"  style="width: 20%" @click="pay">支付</el-button>
        <el-button class="editButton" size="mini" type="primary"  @click="payVisible = false;">取消</el-button> 
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import {getorderList,orderstateSubmit,time} from '@/service/genServ.js'
export default {
  name: 'order_form',
  data() {
    return {
      usernum:localStorage.getItem('usernum'),
      payVisible:false,
      dataList:[],
      form: {
          orderId:"",
          ordernum:"",
          orderstate:"未使用",
          ordertype:"网上订票",
          ordertime:"",
          usernum:"",
          passengername:'',
          passengernum:'',
          passengerphonenum:'',
          trainNum:"",
          trainName:"",
          traintype:"",
          trainroomnum:"",
          seatnum:'',
          seattype:'',
          seatprice:'',
          seatstate:'',
          trainbeginplace:"",
          trainendplace:"",
          trainbeginday:"",
          trainendday:"",
          trainbegintime:"",
          trainendtime:"",    
      },
    }
  },
  created() {
    this.doQuery();
  },
  methods: {
    doQuery() {
       getorderList({'usernum':localStorage.getItem('usernum'),'orderstate':'未支付'}).then(res => {
        this.dataList = res.data;
        console.log(this.dataList);
      })
    },
  

    doDelete(orderId) {
      orderstateSubmit({'orderId':orderId,'orderstate':"取消支付"}).then(res => {
        console.log(res)
        ElMessage({
          message: '取消订单成功！',
          type: 'success',
        })
        this.doQuery();
      })
    },

     doEdit(orderId,trainbeginday,trainbegintime) {
      this.payVisible=true;
      this.form.orderId=orderId;
      this.form.trainbeginday=trainbeginday;
      this.form.trainbegintime=trainbegintime;
    },

    pay() {
      var d1 = new Date();
      d1.setHours(d1.getHours() + 8)
      time({'date':d1, 'beginday': this.form.trainbeginday,'begintime':this.form.trainbegintime}).then(res => {
        if(res.msg=="time"){  
        orderstateSubmit({'orderId':this.form.orderId,'orderstate':"支付超时"}).then(res => {
        console.log(res)
        ElMessage({
          message: '支付超时',
          type: 'warning',
        })
        this.payVisible=false;
        this.doQuery();
      })
      } 
      else{
        orderstateSubmit({'orderId':this.form.orderId,'orderstate':"未使用"}).then(res => {
        console.log(res)
        ElMessage({
          message: '支付订单成功！',
          type: 'success',
        })
        this.payVisible=false;
        this.doQuery();
      })
      }
    })
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
.demo-image__preview{
  width: 400px; 
  height: 500px;
  position: relative;
  right:50px; 
}
</style>
