<template>
    <div class="selectdown">
      <el-form :inline="true" :model="form" class="form-inline-query">
      <el-form-item label="订单状态" >
        <el-select v-model="form.orderstate" placeholder="订单状态">
          <el-option
            v-for="item in orderstateoptions"
            :key="item.orderstate"
            :label="item.label"
            :value="item.orderstate"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="下单用户身份证号码">
        <el-input v-model="form.usernum" placeholder="请输入下单用户身份证号码"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="commButton" type="primary" size="mini" @click="doQuery()">查询</el-button>
      </el-form-item>
    </el-form>    

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
        prop="orderstate" />

        <el-table-column
        label="下单时间"
        alignment="center"
        color="black"
        prop="ordertime" />

        <el-table-column
        label="下单用户"
        alignment="center"
        color="black"
        prop="usernum" />
  
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
        label="座次类型"
        alignment="center"
        color="black"
        sortable
        prop="seattype" />
  
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
        <el-button  type="primary" size="mini" @click="doEdit(scope.row.orderId)">修改</el-button>
          <el-popconfirm title="确定删除该订单吗？" @confirm="doDelete(scope.row.orderId,scope.row.seatId)" @cancel="cancelEvent">
          <template #reference>
            <el-button type="primary" size="mini" >删除</el-button>
          </template>
          </el-popconfirm>
        </template>
        </el-table-column>
      </el-table>
      </el-scrollbar>
    </div>
  
    <el-dialog title="修改" v-model="ordereditVisible" width="25%">
    <el-scrollbar height="500px" >
    <el-form ref="orderform" :model="orderform" label-width="125px" class="form-div">
      <el-form-item label="订单状态">
        <el-select v-model="orderform.orderstate" placeholder="订单状态" style="width:120px">
          <el-option
            v-for="item in orderstateoptions"
            :key="item.orderstate"
            :label="item.label"
            :value="item.orderstate"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="订单类型">
        <el-input  v-model="orderform.ordertype" placeholder="请输入订单类型" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="下单用户">
        <el-input  v-model="orderform.usernum" placeholder="请输入下单用户" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="乘坐人姓名">
        <el-input  v-model="orderform.passengername" placeholder="请输入乘坐人姓名" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="乘坐人身份证号码">
        <el-input  v-model="orderform.passengernum" placeholder="请输入乘坐人身份证号码" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="乘坐人手机号码">
        <el-input  v-model="orderform.passengerphonenum" placeholder="请输入乘坐人手机号码" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="火车编号">
        <el-input v-model="orderform.trainNum" placeholder="请输入火车编号" style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="火车名称">
        <el-input  v-model="orderform.trainName" placeholder="请输入火车名称" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="火车类型">
        <el-select v-model="orderform.traintype" placeholder="火车类型" style="width:120px">
          <el-option
            v-for="item in traintypeoptions"
            :key="item.traintype"
            :label="item.label"
            :value="item.traintype"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="火车车厢号">
        <el-input  v-model="orderform.trainroomnum" type="number" placeholder="请输入火车车厢号"  style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="车厢座号">
        <el-input  v-model="orderform.seatnum"  placeholder="请输入车厢座号" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="座次类型">
        <el-select v-model="orderform.seattype" placeholder="座次类型" style="width:120px">
          <el-option
            v-for="item in seattypeoptions"
            :key="item.seattype"
            :label="item.label"
            :value="item.seattype"
          >
          </el-option>
        </el-select>
      </el-form-item>  
      <el-form-item label="座次票价">
        <el-input v-model="orderform.seatprice" type="number" placeholder="请输入座次票价" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="座次状态">
        <el-select v-model="orderform.seatstate" placeholder="座次状态" style="width:120px">
          <el-option
            v-for="item in seatstateoptions"
            :key="item.seatstate"
            :label="item.label"
            :value="item.seatstate"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="火车出发地">
        <el-input  v-model="orderform.trainbeginplace" placeholder="请输入火车出发地"  style="width:220px"></el-input>
      </el-form-item>
      <el-form-item label="火车目的地">
        <el-input  v-model="orderform.trainendplace" placeholder="请输入火车目的地" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="火车出发日期">
        <el-date-picker value-format="YYYY-MM-DD" v-model="orderform.trainbeginday" type="date" placeholder="火车到达日期" style="width:220px"></el-date-picker>
      </el-form-item>
      <el-form-item label="火车出发时间">
        <el-time-picker value-format="HH:mm:ss" v-model="orderform.trainbegintime" type="time" placeholder="火车出发时间" style="width:220px"></el-time-picker>
      </el-form-item>
      <el-form-item label="火车到达日期">
        <el-date-picker value-format="YYYY-MM-DD"  v-model="orderform.trainendday" type="date" placeholder="火车到达日期" style="width:220px"></el-date-picker>
      </el-form-item>
      <el-form-item label="火车到达时间">
        <el-time-picker value-format="HH:mm:ss" v-model="orderform.trainendtime" type="time" placeholder="火车到达时间" style="width:220px"></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="editButton" size="mini" type="primary"  style="width: 25%" @click="ordersubmit">修改</el-button>
        <el-button  class="editButton" size="mini" style="width: 25%" @click="ordereditVisible = false;">取消</el-button>
      </el-form-item>
    </el-form>
    </el-scrollbar>
    </el-dialog>
  </template>
  
  <script>
  import { ref} from 'vue'
  import { ElMessage } from 'element-plus'
  import {getorderList,orderDelete,ordermanageSubmit,getorderInfo} from '@/service/genServ.js'
  export default {
    name: 'order_form',
    data() {
      return {
        seatstateoptions: ref([
        {
          seatstate: '未预定',
          label: '未预定',
        },
        {
          seatstate: '已预订',
          label: '已预订',
        },
      ]),
        orderstateoptions: ref([  
        {
          orderstate: '未支付',
          label: '未支付',
        },
        {
          orderstate: '支付超时',
          label: '支付超时',
        },
        {
          orderstate: '改签',
          label: '改签',
        },
        {
          orderstate: '退票',
          label: '退票',
        },
        {
          orderstate: '未使用',
          label: '未使用',
        },
        {
          orderstate: '已完成',
          label: '已完成',
        },
        {
          orderstate: '用户删除',
          label: '用户删除',
        },
      ]),
        traintypeoptions: ref([
        {
          traintype: '高速动车',
          label: '高速动车',
        },
        {
          traintype: '城际动车',
          label: '城际动车',
        },
        {
          traintype: '普通动车',
          label: '普通动车',
        },
        {
          traintype: '直达特快',
          label: '直达特快',
        },
        {
          traintype: '特快列车',
          label: '特快列车',
        },
        {
          traintype: '快速列车',
          label: '快速列车',
        },
        {
          traintype: '普通快车',
          label: '普通快车',
        },
      ]),
      seattypeoptions: ref([
        {
          seattype: '硬座',
          label: '硬座',
        },
        {
          seattype: '软座',
          label: '软座',
        },
        {
          seattype: '硬卧',
          label: '硬卧',
        },
        {
          seattype: '软卧',
          label: '软卧',
        },
      ]),
        form: {
          orderstate:'',
          usernum:'',
      },
        usernum:localStorage.getItem('usernum'),
        dataList:[],
        dataList1:[],
        orderform: {
          orderId:null,
          ordernum:"",
          orderstate:"",
          ordertype:"",
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
        },
        ordereditVisible:false,
      }
    },
    created() {
      this.doQuery();
    },
    methods: {
      doQuery() {
        getorderList({'usernum':this.form.usernum,'orderstate':this.form.orderstate}).then(res => {
          this.dataList = res.data;
          console.log(res);
        })
        this.form.orderstate="";
      },
    
  
      doDelete(orderId,seatId) {
         orderDelete({'orderId':orderId,'seatId':seatId}).then(res => {
          console.log(res)
          ElMessage({
            message: '删除成功！',
            type: 'success',
          })
          this.doQuery();
        })
      },

      doEdit(orderId) {
      this.orderform.orderId=orderId;
      this.ordereditVisible=true;
      getorderInfo({ 'orderId':orderId }).then(
        (res) => {
          this.orderform = res.data;
        }
      );
    },

    ordersubmit() {
      // var d1 = new Date();
      // var d2 = new Date(this.orderform.trainbeginday);
      // var d3 = new Date(this.orderform.trainbegintime);
      // if ((this.orderform.trainbeginday>this.orderform.trainendday)||(this.orderform.trainbeginday==this.orderform.trainendday&&this.orderform.trainbegintime>this.orderform.trainendtime)){
      //   ElMessage({
      //     message: '出发时间应早于到达时间',
      //     type: 'error',
      //   })
      // }
      // else if ((d1.getDate()>d2.getDate())||(d1.getDate()==d2.getDate()&&d1.getTime()>d3.getTime())) {
      //   ElMessage({
      //     message: '列车出发时间早于当前时间',
      //     type: 'error',
      //   })
      // } 
        console.log(this.orderform)
      ordermanageSubmit({
        form: this.orderform,
      }).then((res) => {
         ElMessage({
          message: '提交成功！',
          type: 'success',
        })
        this.orderform.orderId = res.data;
        this.ordereditVisible=false;
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
  