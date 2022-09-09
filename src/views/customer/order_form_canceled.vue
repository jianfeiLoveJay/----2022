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
      label="订单状态"
      alignment="center"
      color="black"
      sortable
      prop="orderstate" />

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
        <el-popconfirm title="确定删除订单吗？" @confirm="doDelete(scope.row.orderId,scope.row.trainbeginday,scope.row.trainbegintime)" @cancel="cancelEvent">
        <template #reference>
          <el-button type="primary" :icon="Delete" size="mini" >删除订单</el-button>
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
import {getcanceledorderList,orderstateSubmit} from '@/service/genServ.js'
export default {
  name: 'order_form',
  data() {
    return {
      usernum:localStorage.getItem('usernum'),
      dataList:[],
      form: {
          orderId:"",
          ordernum:"",
          orderstate:"",
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
       getcanceledorderList({'usernum':localStorage.getItem('usernum')}).then(res => {
        this.dataList = res.data;
        console.log(this.dataList);
      })
    },
  

    doDelete(orderId) {
        orderstateSubmit({'orderId':orderId,'orderstate':"用户删除"}).then(res => {
        console.log(res)
        ElMessage({
          message: '删除订单成功！',
          type: 'success',
        })
        this.doQuery();
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
</style>
