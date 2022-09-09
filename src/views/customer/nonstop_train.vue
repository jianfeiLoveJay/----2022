<template> 
  <div class="selectcourse">
          
    <el-form :inline="true" :model="form" class="form-inline-query">
      <el-form-item label="出发地" >
        <el-input v-model="form.begin" placeholder="请输入出发地" />
      </el-form-item>
      <el-form-item label="目的地">
        <el-input v-model="form.end" placeholder="请输入目的地"></el-input>
      </el-form-item>
      <el-form-item label="出发日期">
        <el-date-picker value-format="YYYY-MM-DD" v-model="form.time" type="date" placeholder="火车出发日期"></el-date-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="commButton" size="mini" @click="doQuery()" type="primary">查询</el-button>
      </el-form-item>
    </el-form> 
<el-scrollbar height="800px">
    <el-table  class="table-content"
    v-loading="loading" :data="dataList"
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
      label="火车出发时间"
      alignment="center"
      color="black"
      sortable
      prop="trainbegintime" />

       <el-table-column
      label="火车到达日期"
      alignment="center"
      color="black"
      sortable
      prop="trainendday" /> 

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
      </el-scrollbar>
    </div>

    <el-dialog title="订票" v-model="orderVisible" width="20%">
    <el-form ref="orderform" :model="orderform" label-width="54px" class="form-div">
      <el-form-item width="100%">
        <el-scrollbar height="200px">
      <el-table  class="table-content"
          :data="passengerdataList"
          border:true
          style="width: 100%;"
      >
        <el-table-column
        label="序号"
        fixed="left"
        width="55"          
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
        width="115"   
        prop="passengername" />
 
        <el-table-column
            label="操作"
            alignment="center"
            color="black"
            width="90"   
        >
        <template v-slot="scope">
          <el-popconfirm title="确定选择该乘车人吗？" @confirm="passengerselect(scope.row.passengername,scope.row.passengernum,scope.row.passengerphonenum)" @cancel="cancelEvent">
          <template #reference>
            <el-button type="primary" size="mini" >选择</el-button>
          </template>
          </el-popconfirm>
        </template>
        </el-table-column>
      </el-table>
      </el-scrollbar>

      </el-form-item>
      <el-form-item label="车厢号">
        <el-input  v-model="orderform.trainroomnum" type="number" placeholder="请输入车厢号" style="width:180px" ></el-input>
      </el-form-item>
      <el-form-item width="100%">
        <el-button class="editButton" type="primary" size="mini" width="35%" @click="seatleftQuery">余票查询</el-button>
        <el-button class="editButton" size="mini" width="25%" @click="orderVisible = false;">取 消</el-button>
        <el-button class="editButton" type="primary" size="mini" width="25%" @click="selectseat">选座</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <!-- <el-dialog title="订票" v-model="orderVisible" width="25%">
    <el-form ref="orderform" :model="orderform" label-width="125px" class="form-div">
      <el-form-item label="乘车人姓名">
        <el-input  v-model="orderform.passengername" placeholder="请输入乘车人姓名"  ></el-input>
      </el-form-item>
      <el-form-item label="乘车人身份证号码">
        <el-input  v-model="orderform.passengernum" placeholder="请输入乘车人身份证号码" ></el-input>
      </el-form-item>
      <el-form-item label="乘车人手机号码">
        <el-input  v-model="orderform.passengerphonenum" placeholder="请输入乘车人手机号码" ></el-input>
      </el-form-item>
      <el-form-item label="车厢号">
        <el-input  v-model="orderform.trainroomnum" type="number" placeholder="请输入车厢号" ></el-input>
      </el-form-item>
      <el-form-item width="100%">
        <el-button class="editButton" type="primary" size="mini" width="35%" @click="seatleftQuery">余票查询</el-button>
        <el-button class="editButton" size="mini" width="25%" @click="orderVisible = false;">取 消</el-button>
        <el-button class="editButton" type="primary" size="mini" width="25%" @click="selectseat">选座</el-button>
      </el-form-item>
    </el-form>
  </el-dialog> -->

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
          <el-popconfirm title="确定要预定该座位吗？" @confirm="submit(scope.row.seatId,scope.row.seatnum,scope.row.seattype,scope.row.seatprice,scope.row.seatstate)" @cancel="cancelEvent">
          <template #reference>
          <el-button type="primary" size="mini">预定</el-button>
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
import {gettrainList,orderSubmit,getseatleftList,getseatList,time,getpassengerList} from '@/service/genServ.js'
export default {
  name: 'nonstop_train',
  data() {
    return {
        sid:localStorage.getItem('sid'),
        usernum:localStorage.getItem('usernum'),
        username:localStorage.getItem('username'),
      form: {
        begin:'',
        end:'',
        time:'',
      },
      seatleftform:{
        trainNum:"",
        trainroom:"",
      },
      orderform: {
          orderId:null,
          ordernum:"",
          orderstate:"未支付",
          ordertype:"网上订票",
          ordertime:"",
          usernum:localStorage.getItem('usernum'),
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
      orderVisible:false,
      seatleftVisible:false,
      seatselectVisible:false,
      dataList:[],
      seatselectdataList:[],
      seatleftdataList:[],
      passengerdataList:[],
    }
  },
  created() {
      this.sid=localStorage.getItem('sid'),
      this.usernum=localStorage.getItem('usernum'),
      this.username=localStorage.getItem('username'),
      this.doQuery();
  },
  methods: {
    doQuery() {
       gettrainList({'begin':this.form.begin, 'end':this.form.end,'time':this.form.time}).then(res => {
        this.dataList = res.data;
      }),
      this.form.time="";
      getpassengerList({'usernum':this.usernum}).then(res => {
          this.passengerdataList = res.data;
          console.log(res);
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
       this.orderform.ordertime=d1;
       this.orderform.trainNum=trainNum;
       this.orderform.trainName=trainName;
       this.orderform.traintype=traintype;
       this.orderform.trainbeginplace=trainbeginplace;
       this.orderform.trainendplace=trainendplace;
       this.orderform.trainbeginday=trainbeginday;
       this.orderform.trainendday=trainendday;
       this.orderform.trainbegintime=trainbegintime;
       this.orderform.trainendtime=trainendtime;
       this.seatleftform.trainNum=trainNum;
       this.seatleftform.trainroom=trainroom;
       this.orderform.trainroom=trainroom;
      }
    })
    },

    passengerselect(passengername,passengernum,passengerphonenum) {
      if(this.orderform.passengername==""){
      ElMessage({
          message: '乘车人添加成功！',
          type: 'success',
        })
      }
      if(this.orderform.passengername!=""){
      ElMessage({
          message: "乘车人修改成功！",
          type: 'success',
        })
      }
      this.orderform.passengername=passengername;
      this.orderform.passengernum=passengernum;
      this.orderform.passengerphonenum=passengerphonenum;
    },  

    seatleftQuery() {
      this.seatleftVisible=true,
       getseatleftList({'trainNum':this.seatleftform.trainNum,'trainroom':this.seatleftform.trainroom}).then(res => {
        this.seatleftdataList = res.data;
      })
    },

    selectseat() {
      var pattern = /^[1-9][0-9]*$/ // 正整数的正则表达式
      if (this.orderform.passengername=="" || this.orderform.passengernum=="" ||this.orderform.passengerphonenum==""){
        ElMessage({
          message: '请选择乘车人',
          type: 'warning',
        })
      }
      else if (this.orderform.trainroomnum==""){
        ElMessage({
          message: '请输入车厢号',
          type: 'warning',
        })
      }
      else if (this.orderform.trainroomnum>this.orderform.trainroom){
        ElMessage({
          message: '该车厢共有'+this.orderform.trainroom+'节车厢，请输入正确车厢号',
          type: 'warning',
        })
      }
      else if (!pattern.test(this.orderform.trainroomnum)){
        this.orderform.trainroomnum="";
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
       getseatList({'trainNum':this.orderform.trainNum,'trainroomnum':this.orderform.trainroomnum}).then(res => {
        this.seatselectdataList = res.data;
      })
    },

    submit(seatId,seatnum,seattype,seatprice,seatstate) {
      this.orderform.seatId=seatId;
      this.orderform.seatnum=seatnum;
      this.orderform.seattype=seattype;
      this.orderform.seatprice=seatprice;
      this.orderform.seatstate=seatstate;
      orderSubmit({form:this.orderform}).then(res => {
        console.log(res)
         ElMessage({
          message: '提交成功！',
          type: 'success',
        })
        // this.form1.trainId = res.data;
        this.seatselectVisible=false;
        this.orderVisible=false;
        this.doQuery();
      });
    },  

  }
}
</script>

<style scoped>
.selectcourse{
  width: 1650px;
  position:absolute;
  top:100px;
  left:225px;
}
</style>
