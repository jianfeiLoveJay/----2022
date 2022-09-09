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
      <el-button  type="primary" size="mini" @click="doEdit(scope.row.orderId,scope.row.ordernum, scope.row.orderstate, scope.row.ordertype, scope.row.ordertime,
          scope.row.usernum, scope.row.passengername,scope.row.passengernum, scope.row.passengerphonenum,scope.row.trainbeginplace, scope.row.trainendplace,scope.row.trainNum,
         )">改签</el-button>
        <el-popconfirm title="确定退票吗？" @confirm="doDelete(scope.row.orderId,scope.row.trainbeginday,scope.row.trainbegintime)" @cancel="cancelEvent">
        <template #reference>
          <el-button type="primary" :icon="Delete" size="mini" >退票</el-button>
        </template>
        </el-popconfirm>
      </template>
      </el-table-column>
    </el-table>
    </el-scrollbar>
  </div>

  <el-dialog title="改签" v-model="changeVisible" width="80%">
    <el-table  class="table-content"
    v-loading="loading" :data="changedataList"
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
            label="操作"
            alignment="center"
            color="black"
           
        >
        <template v-slot="scope">
            <el-button type="primary" size="mini" @click="doselect(scope.row.trainNum, scope.row.trainName, scope.row.traintype,
             scope.row.trainbeginplace, scope.row.trainendplace,scope.row.trainbeginday, scope.row.trainendday, scope.row.trainbegintime,
              scope.row.trainendtime,scope.row.trainroom )">订票</el-button>
        </template>
        </el-table-column>
      </el-table>
  </el-dialog>

  <el-dialog title="订票" v-model="orderVisible" width="25%">
    <el-form ref="form" :model="form" label-width="125px" class="form-div">
      <el-form-item label="车厢号">
        <el-input  v-model="form.trainroomnum" type="number" placeholder="请输入车厢号" ></el-input>
      </el-form-item>
      <el-form-item width="100%">
        <el-button class="editButton" type="primary" size="mini" width="35%" @click="seatleftQuery">余票查询</el-button>
        <el-button class="editButton" size="mini" width="25%" @click="orderVisible = false;">取 消</el-button>
        <el-button class="editButton" type="primary" size="mini" width="25%" @click="selectseat">选座</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog title="余票查询" v-model="seatleftVisible" width="30%">
    <el-scrollbar height="400px">
    <el-table  class="table-content"
        :data="seatleftdataList"
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
      label="火车车厢号"
      alignment="center"
      color="black"
      sortable
      prop="trainroomnum" />

      <el-table-column
      label="特等座余票"
      alignment="center"
      color="black"
      sortable
      prop="seatnumT" />

      <el-table-column
      label="一等座余票"
      alignment="center"
      color="black"
      sortable
      prop="seatnumY" />

      <el-table-column
      label="二等座余票"
      alignment="center"
      color="black"
      sortable
      prop="seatnumE" />

      <el-table-column
      label="三等座余票"
      alignment="center"
      color="black"
      sortable
      prop="seatnumS" />
    </el-table>
    </el-scrollbar>
  </el-dialog>

  <el-dialog title="选座" v-model="seatselectVisible" width="30%">
    <el-scrollbar height="600px">
    <el-table  class="table-content"
        :data="seatselectdataList"
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
      label="座位类型"
      alignment="center"
      color="black"
      sortable
      prop="seattype" />

       <el-table-column
      label="座位票价"
      alignment="center"
      color="black"
      sortable
      prop="seatprice" />

       <el-table-column
      label="座位状态"
      alignment="center"
      color="black"
      sortable
      prop="seatstate" />


      <el-table-column
          label="操作"
          alignment="center"
          color="black"
      >
      <template v-slot="scope">
          <el-popconfirm title="确定要改签吗？" @confirm="change(scope.row.seatId,scope.row.seatnum,scope.row.seattype,scope.row.seatprice,scope.row.seatstate)" @cancel="cancelEvent">
          <template #reference>
          <el-button type="primary" size="mini">改签</el-button>
          </template>
          </el-popconfirm>
      </template>
      </el-table-column>
    </el-table>
    </el-scrollbar>
  </el-dialog>
</template>

<script>
import { ElMessage } from 'element-plus'
import {getchangetrainList,getorderList,orderstateSubmit,orderSubmit,getseatleftList,getseatList,time} from '@/service/genServ.js'
export default {
  name: 'order_form',
  data() {
    return {
      usernum:localStorage.getItem('usernum'),
      orderVisible:false,
      seatleftVisible:false,
      seatselectVisible:false,
      dataList:[],
      changedataList:[],
      seatselectdataList:[],
      seatleftdataList:[],
      seatleftform:{
        trainNum:"",
        trainroom:"",
      },
      form: {
          orderId:null,
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
          seatId:null,
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
          trainroom:"",   
      },
      changeVisible:false,
    }
  },
  created() {
    this.doQuery();
  },
  methods: {
    doQuery() {
       getorderList({'usernum':localStorage.getItem('usernum'),'orderstate':'未使用'}).then(res => {
        this.dataList = res.data;
        console.log(this.dataList);
      })
    },
  

    doDelete(orderId,trainbegintime) {
      var d1 = new Date();
      var d2 = new Date(trainbegintime);
      if (d1.getTime()>d2.getTime()) {
        ElMessage({
          message: '列车已发出，无法退票',
          type: 'warnning',
        })
      } else{
        orderstateSubmit({'orderId':orderId,'orderstate':"退票"}).then(res => {
        console.log(res)
        ElMessage({
          message: '退票成功！',
          type: 'success',
        })
        this.doQuery();
      })
      }
    },

    doEdit(orderId,ordernum,orderstate,ordertype,ordertime,usernum,passengername,passengernum,passengerphonenum,trainbeginplace,trainendplace,trainNum) {
      this.changeVisible=true;
      this.form.orderId=orderId;
      this.form.ordernum=ordernum;
      this.form.orderstate="未使用";
      this.form.ordertype=ordertype;
      this.form.ordertime=ordertime;
      this.form.usernum=usernum;
      this.form.passengername=passengername;
      this.form.passengernum=passengernum;
      this.form.passengerphonenum=passengerphonenum;
      getchangetrainList({'begin':trainbeginplace,'end':trainendplace,'trainNum':trainNum}).then(res => {
        this.changedataList = res.data;
        console.log(this.dataList);
      })
    },

    doselect(trainNum,trainName,traintype,trainbeginplace,trainendplace,trainbeginday,trainendday,trainbegintime,trainendtime,trainroom) {
      var d1 = new Date();
      d1.setHours(d1.getHours() + 8)
    time({'date':d1, 'beginday':trainbeginday,'begintime':trainbegintime}).then(res => {
      if(res.msg=="time"){
      ElMessage({
          message:"列车已发出，购票时间已过",
          type: 'warning',
        })
      }
      else{
       this.orderVisible=true
       this.form.ordertime=d1;
       this.form.trainNum=trainNum;
       this.form.trainName=trainName;
       this.form.traintype=traintype;
       this.form.trainbeginplace=trainbeginplace;
       this.form.trainendplace=trainendplace;
       this.form.trainbeginday=trainbeginday;
       this.form.trainendday=trainendday;
       this.form.trainbegintime=trainbegintime;
       this.form.trainendtime=trainendtime;
       this.seatleftform.trainNum=trainNum;
       this.seatleftform.trainroom=trainroom;
       this.form.trainroom=trainroom;
      }
    })
    },

    seatleftQuery() {
      this.seatleftVisible=true,
       getseatleftList({'trainNum':this.seatleftform.trainNum,'trainroom':this.seatleftform.trainroom}).then(res => {
        this.seatleftdataList = res.data;
      })
    },

    selectseat() {
      var pattern = /^[1-9][0-9]*$/ // 正整数的正则表达式
      if (!this.form.trainroomnum){
        ElMessage({
          message: '请输入车厢号',
          type: 'warning',
        })
      }
      else if (this.form.trainroomnum>this.form.trainroom){
        ElMessage({
          message: '该车厢共有'+this.form.trainroom+'节车厢，请输入正确车厢号',
          type: 'warning',
        })
      }
      else if (!pattern.test(this.form.trainroomnum)){
        this.form.trainroomnum="";
        ElMessage({
          message: '请输入合法正整数',
          type: 'error',
        })
      }
      else{
       this.seatselectVisible=true;
       this.seatQuery();
      }
    },

    seatQuery() {
       getseatList({'trainNum':this.form.trainNum,'trainroomnum':this.form.trainroomnum}).then(res => {
        this.seatselectdataList = res.data;
      })
    },

    change(seatId,seatnum,seattype,seatprice,seatstate) {
      orderstateSubmit({'orderId':this.form.orderId,'orderstate':"改签"}).then(res => {
        console.log(res)
      })

      this.form.seatId=seatId;
      this.form.seatnum=seatnum;
      this.form.seattype=seattype;
      this.form.seatprice=seatprice;
      this.form.seatstate=seatstate;
      orderSubmit({form:this.form}).then(res => {
        console.log(res)
         ElMessage({
          message: '提交成功！',
          type: 'success',
        })
        // this.form1.trainId = res.data;
        this.seatselectVisible=false;
        this.orderVisible=false;
        this.changeVisible=false;
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
