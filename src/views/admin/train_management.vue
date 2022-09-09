<template>
  <div class="app-container">
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
        <el-button class="commButton" type="primary" size="mini" @click="trainQuery()">查询</el-button>
      </el-form-item>
      <el-form-item>
        <el-button class="commButton" type="primary" size="mini" @click="trainAdd()">添加</el-button>
      </el-form-item>
    </el-form>    

    <el-scrollbar height="800px">
    <el-table  class="table-content"
        :data="traindataList"
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
      label="火车编号"
      alignment="center"
      width="100" 
      color="black"
      sortable
      prop="trainNum" />

      <el-table-column
      label="火车名称"
      alignment="center"
      width="100" 
      color="black"
      prop="trainName" />

      <el-table-column
      label="火车类型"
      alignment="center"
      width="120" 
      color="black"
      sortable
      prop="traintype" />

      <el-table-column
      label="火车车厢数"
      alignment="center"
      width="120" 
      color="black"
      sortable
      prop="trainroom" />

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
          width="250" 
          color="black"
      >
      <template v-slot="scope">
          <el-button type="text" size="mini" @click="trainEdit(scope.row.trainId)"><el-icon><Edit /></el-icon>列车修改</el-button>
          <el-button type="text" size="mini" @click="seatmanagement(scope.row.trainNum,scope.row.trainroom)"><el-icon><Edit /></el-icon>座次管理</el-button>
          <el-popconfirm title="确定要删除该列车吗？" @confirm="trainDelete(scope.row.trainId)" @cancel="cancelEvent">
          <template #reference>
          <el-button type="text" size="mini"><el-icon><Delete /></el-icon>删除</el-button>
          </template>
          </el-popconfirm>
      </template>
      </el-table-column>
    </el-table>
    </el-scrollbar>
  </div>

  <el-dialog title="列车添加" v-model="trainaddVisible" width="23%">
    <el-scrollbar height="500px">
    <el-form  ref="trainaddform" :model="trainaddform" label-width="125px" class="form-div">
      <el-form-item label="火车编号">
        <el-input v-model="trainaddform.trainNum" placeholder="请输入火车编号" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="火车名称">
        <el-input  v-model="trainaddform.trainName" placeholder="请输入火车名称" style="width:220px"  ></el-input>
      </el-form-item>
      <el-form-item label="火车类型">
        <el-select v-model="trainaddform.traintype" placeholder="火车类型" style="width:120px">
          <el-option
            v-for="item in traintypeoptions"
            :key="item.traintype"
            :label="item.label"
            :value="item.traintype"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="火车车厢数">
        <el-input  v-model="trainaddform.trainroom" type="number" placeholder="请输入火车车厢数" style="width:220px"  ></el-input>
      </el-form-item>
      <el-form-item label="初始化三等座个数">
        <el-input  v-model="trainaddform.trainroomsize"  type="number" placeholder="请输入初始化三等座个数" style="width:220px"  ></el-input>
      </el-form-item>
      <el-form-item label="火车出发地">
        <el-input  v-model="trainaddform.trainbeginplace" placeholder="请输入火车出发地" style="width:220px"  ></el-input>
      </el-form-item>
      <el-form-item label="火车目的地">
        <el-input  v-model="trainaddform.trainendplace" placeholder="请输入火车目的地" style="width:220px"  ></el-input>
      </el-form-item>
      <el-form-item label="火车出发日期">
        <el-date-picker value-format="YYYY-MM-DD" v-model="trainaddform.trainbeginday" type="date" placeholder="火车出发日期" style="width:220px"></el-date-picker>
      </el-form-item>
      <el-form-item label="火车出发时间">
        <el-time-picker value-format="HH:mm:ss" v-model="trainaddform.trainbegintime" type="time" placeholder="火车出发时间" style="width:220px"></el-time-picker>
      </el-form-item>
      <el-form-item label="火车到达日期">
        <el-date-picker value-format="YYYY-MM-DD"  v-model="trainaddform.trainendday" type="date" placeholder="火车到达日期" style="width:220px"></el-date-picker>
      </el-form-item>
      <el-form-item label="火车到达时间">
        <el-time-picker value-format="HH:mm:ss" v-model="trainaddform.trainendtime" type="time" placeholder="火车到达时间" style="width:220px"></el-time-picker>
      </el-form-item>
      <el-form-item style="width: 100%">
        <el-button class="editButton" size="mini" type="primary"  style="width: 25%" @click="trainadd">添加</el-button>
        <el-button  class="editButton" size="mini" style="width: 25%" @click="trainaddVisible = false;">取消</el-button>
      </el-form-item>
    </el-form>
  </el-scrollbar>
  </el-dialog>

  <el-dialog title="列车修改" v-model="traineditVisible" width="23%">
    <el-scrollbar height="600px">
    <el-form  ref="traineditform" :model="traineditform" label-width="125px" class="form-div">
      <el-form-item label="火车编号">
        <el-input v-model="traineditform.trainNum" placeholder="请输入火车编号" style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="火车名称">
        <el-input  v-model="traineditform.trainName" placeholder="请输入火车名称" style="width:220px"  ></el-input>
      </el-form-item>
      <el-form-item label="火车类型">
        <el-select v-model="traineditform.traintype" placeholder="火车类型" style="width:120px">
          <el-option
            v-for="item in traintypeoptions"
            :key="item.traintype"
            :label="item.label"
            :value="item.traintype"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="火车出发地">
        <el-input  v-model="traineditform.trainbeginplace" placeholder="请输入火车出发地"  style="width:220px" ></el-input>
      </el-form-item>
      <el-form-item label="火车目的地">
        <el-input  v-model="traineditform.trainendplace" placeholder="请输入火车目的地" style="width:220px"  ></el-input>
      </el-form-item>
      <el-form-item label="火车出发日期">
        <el-date-picker value-format="YYYY-MM-DD" :picker-options="pickerOptions1" v-model="traineditform.trainbeginday" type="date" placeholder="火车到达日期" style="width:220px"></el-date-picker>
      </el-form-item>
      <el-form-item label="火车出发时间">
        <el-time-picker value-format="HH:mm:ss" v-model="traineditform.trainbegintime" type="time" placeholder="火车出发时间" style="width:220px"></el-time-picker>
      </el-form-item>
      <el-form-item label="火车到达日期">
        <el-date-picker value-format="YYYY-MM-DD"  v-model="traineditform.trainendday" type="date" placeholder="火车到达日期" style="width:220px"></el-date-picker>
      </el-form-item>
      <el-form-item label="火车到达时间">
        <el-time-picker value-format="HH:mm:ss" v-model="traineditform.trainendtime" type="time" placeholder="火车到达时间" style="width:220px"></el-time-picker>
      </el-form-item>
      <el-form-item>
        <el-button class="editButton" size="mini" type="primary"  style="width: 25%" @click="trainedit">修改</el-button>
        <el-button  class="editButton" size="mini" style="width: 25%" @click="traineditVisible = false;">取消</el-button>
      </el-form-item>
    </el-form>
  </el-scrollbar>
  </el-dialog>

  <el-dialog title="座次管理" v-model="seatmanageVisible" width="40%">
    <el-form :inline="true" ref="seatform" :model="seatform" label-width="125px" class="form-div">
      <el-form-item label="火车车厢号">
        <el-input  v-model="seatform.trainroomnum" type="number" placeholder=""  ></el-input>
      </el-form-item>
      <el-form-item >
      <el-row>
        <div >车厢座位总数:<span style='margin-left: 30px'>{{seatform.trainroomseatleft}}</span></div>
      </el-row>
    </el-form-item>
      <el-form-item>
        <el-button class="editButton" size="mini" type="primary"  style="width: 60%" @click="seatQuery">车厢座位查询</el-button>
        <el-button class="editButton" size="mini" type="primary"  style="width: 32%" @click="seatAdd">添加</el-button>
      </el-form-item>
    </el-form>

    <el-scrollbar height="400px">
    <el-table  class="table-content"
        :data="seatdataList"
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
      label="车厢号"
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
          <el-button type="text" size="mini"  @click="seatEdit(scope.row.seatId)"><el-icon><Edit /></el-icon>座位修改</el-button>
          <el-popconfirm title="确定要删除该座位吗？" @confirm="seatDelete(scope.row.seatId,scope.row.seatstate)" @cancel="cancelEvent">
          <template #reference>
          <el-button type="text" size="mini"><el-icon><Delete /></el-icon>删除</el-button>
          </template>
          </el-popconfirm>
      </template>
      </el-table-column>
    </el-table>
    </el-scrollbar>
  </el-dialog>

  <el-dialog title="座次添加" v-model="seataddVisible" width="20%">
    <el-form ref="seataddform" :model="seataddform" label-width="100px" class="form-div">
      <el-form-item label="座次类型">
        <el-select v-model="seataddform.seattype" placeholder="座次类型" style="width:120px">
          <el-option
            v-for="item in seattypeoptions"
            :key="item.seattype"
            :label="item.label"
            :value="item.seattype"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="座次位置">
        <el-input  v-model="seataddform.seatposition" placeholder="请输入座次位置" maxlength="1" style="width:180px"  ></el-input>
      </el-form-item>
      <el-form-item label="座次票价">
        <el-input  v-model="seataddform.seatprice" type="number" placeholder="请输入座次票价" style="width:180px"  ></el-input>
      </el-form-item>
      <el-form-item label="座次状态">
        <el-select v-model="seataddform.seatstate" placeholder="座次状态" style="width:120px">
          <el-option
            v-for="item in seatstateoptions"
            :key="item.seatstate"
            :label="item.label"
            :value="item.seatstate"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="添加个数">
        <el-input  v-model="seataddform.seatquantity" type="number" placeholder="请输入座次添加个数" style="width:180px"  ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="editButton" size="mini" type="primary"  style="width: 30%" @click="seatadd">添加</el-button>
        <el-button class="editButton" size="mini"  style="width: 30%" @click="seataddVisible = false;">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>

  <el-dialog title="座次修改" v-model="seateditVisible" width="20%">
    <el-form ref="seateditform" :model="seateditform" label-width="125px" class="form-div">
      <el-form-item label="座号">
        <el-input v-model="seateditform.seatnum" placeholder="请输入座号" style="width:180px" ></el-input>
      </el-form-item>
      <el-form-item label="座次类型">
        <el-select v-model="seateditform.seattype" placeholder="座次类型" style="width:120px">
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
        <el-input  v-model="seateditform.seatprice" type="number" placeholder="请输入座次票价" style="width:180px"  ></el-input>
      </el-form-item>
      <el-form-item label="座次状态">
        <el-select v-model="seateditform.seatstate" placeholder="座次状态" style="width:120px">
          <el-option
            v-for="item in seatstateoptions"
            :key="item.seatstate"
            :label="item.label"
            :value="item.seatstate"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button class="editButton" size="mini" type="primary"  style="width: 30%" @click="seatedit">修改</el-button>
        <el-button class="editButton" size="mini"   style="width: 30%" @click="seateditVisible = false;">取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import { ref} from 'vue'
import {gettrainList,gettrainInfo,trainadd,trainedit,trainDelete,getallseatList,getroomseatleft,getseatInfo,seatadd,seatedit,seatDelete,time} from '@/service/genServ.js'
import { ElMessage } from 'element-plus'
import {
  Delete,Edit
} from '@element-plus/icons'
export default {
  name: 'train_management',
  components:{
    Delete,Edit
  },
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
          seattype: '特等座',
          label: '特等座',
        },
        {
          seattype: '一等座',
          label: '一等座',
        },
        {
          seattype: '二等座',
          label: '二等座',
        },
        {
          seattype: '三等座',
          label: '三等座',
        },
      ]),
      form: {
        begin:'',
        end:'',
        time:'',
      },
      trainaddform: {
        trainId: null,
        trainNum: "",
        trainName: "",
        traintype:"",
        trainroom:null,
        trainroomsize:null,
        trainbeginplace:"",
        trainendplace:"",
        trainbeginday:"",
        trainendday:"",
        trainbegintime:"",
        trainendtime:"",
      }, 
      traineditform: {
        trainId: null,
        trainNum: "",
        trainName: "",
        traintype:"",
        trainbeginplace:"",
        trainendplace:"",
        trainbeginday:"",
        trainendday:"",
        trainbegintime:"",
        trainendtime:"",
      }, 
      seatform: {
        trainroomseatleft:'',
        trainNum:'',
        trainroom:'',
        trainroomnum:"",
      },
      seataddform: {
        trainNum:'',
        trainroomnum:"",
        seattype:'',
        seatprice:'',
        seatstate:'',
        seatquantity:'',
        seatposition:"",
      },
      seateditform: {
        trainNum:'',
        trainroomnum:"",
        seatId:null,
        seatnum:"",
        seattype:'',
        seatprice:'',
        seatstate:'',
      },
      trainaddVisible : false,
      traineditVisible : false,
      seatmanageVisible : false,
      seataddVisible : false,
      seateditVisible : false,
      traindataList:[],
      seatdataList:[],
    }
  },
  created() {
    this.trainQuery();
  },
  methods: {
    trainQuery() {
       gettrainList({'begin':this.form.begin, 'end':this.form.end,'time':this.form.time}).then(res => {
        this.traindataList = res.data;
      })
      this.form.time="";
    },

    trainAdd() {
      this.trainaddVisible=true;
      this.trainaddform.trainId=null;
      this.trainaddform.trainNum="";
      this.trainaddform.trainName="";
      this.trainaddform.traintype="";
      this.trainaddform.trainroom="";
      this.trainaddform.trainroomsize="";
      this.trainaddform.trainbeginplace="";
      this.trainaddform.trainendplace="";
      this.trainaddform.trainbeginday="";
      this.trainaddform.trainendday="";
      this.trainaddform.trainbegintime="";
      this.trainaddform.trainendtime="";
    },

    trainadd() {
      var pattern = /^[1-9][0-9]*$/ // 正整数的正则表达式
      var d1 = new Date();
      d1.setHours(d1.getHours() + 8)
      if (this.trainaddform.trainNum==""||this.trainaddform.trainName==""||this.trainaddform.traintype==""||this.trainaddform.trainroom==""||this.trainaddform.trainroomsize==""||
      this.trainaddform.trainbeginplace==""||this.trainaddform.trainendplace==""||this.trainaddform.trainbeginday==""||this.trainaddform.trainendday==""||
      this.trainaddform.trainbegintime==""||this.trainaddform.trainendtime==""){
        ElMessage({
          message: '请输入完整信息',
          type: 'error',
        })
      }
      else{
      time({'date':d1, 'beginday': this.trainaddform.trainbeginday,'begintime':this.trainaddform.trainbegintime}).then(res => {
        
      if(res.msg=="time"){
          ElMessage({
          message: '列车出发时间早于当前时间',
          type: 'error',
        }) }
      
      else if (!pattern.test(this.trainaddform.trainroom)){
        this.trainaddform.trainroom="";
        ElMessage({
          message: '请输入合法正整数',
          type: 'error',
        })
      }
      else if ((this.trainaddform.trainbeginday>this.trainaddform.trainendday)||(this.trainaddform.trainbeginday==this.trainaddform.trainendday&&this.trainaddform.trainbegintime>this.trainaddform.trainendtime)){
        ElMessage({
          message: '出发时间应早于到达时间',
          type: 'error',
        })
      }
      
      // else if ((d1.getDate()>d2.getDate())||(d1.getDate()==d2.getDate()&&d1.getTime()>d3.getTime())) {
      //   ElMessage({
      //     message: '列车出发时间早于当前时间',
      //     type: 'error',
      //   })
      // } 
      else{
      trainadd({
        form: this.trainaddform,
      }).then((res) => {
         ElMessage({
          message: '列车添加成功！',
          type: 'success',
        })
        this.trainaddform.trainId = res.data;
        this.trainaddVisible=false;
        this.trainQuery();
      });
      }
      })
    }
      
    },

    trainEdit(trainId) {
      this.traineditVisible=true;
      gettrainInfo({ 'trainId':trainId }).then(
        (res) => {
          this.traineditform = res.data;
        }
      );

    },

    trainedit() {
      var d1 = new Date();
      d1.setHours(d1.getHours() + 8)
      time({'date':d1, 'beginday': this.traineditform.trainbeginday,'begintime':this.traineditform.trainbegintime}).then(res => {
        if(res.msg=="time"){
          ElMessage({
          message: '列车出发时间早于当前时间',
          type: 'error',
        }) }
        else if ((this.traineditform.trainbeginday>this.traineditform.trainendday)||(this.traineditform.trainbeginday==this.traineditform.trainendday&&this.traineditform.trainbegintime>this.traineditform.trainendtime)){
        ElMessage({
          message: '出发时间应早于到达时间',
          type: 'error',
        })
      }  
      else{
      trainedit({
        form: this.traineditform,
      }).then((res) => {
         ElMessage({
          message: '列车修改成功！',
          type: 'success',
        })
        this.traineditform.trainId = res.data;
        this.traineditVisible=false;
        this.trainQuery();
      });
    } 
  })
      
    },  

    trainDelete(trainId) {
      trainDelete({'trainId':trainId}).then(res => {
        console.log(res)
        if(res.msg=="列车已有订单，无法删除!"){
          ElMessage({
          message: '列车已有订单，无法删除!',
          type: 'error',
        })
        }
        else{
        ElMessage({
          message: '列车删除成功',
          type: 'success',
        })
        this.trainQuery();
      }
    })   
    },
    
    seatmanagement(trainNum,trainroom) {
      this.seatmanageVisible=true;
      this.seatform.trainNum=trainNum;
      this.seatform.trainroom=trainroom;
      this.seataddform.trainNum=trainNum;
      this.seateditform.trainNum=trainNum;  
    },

    seatQuery() {
      var pattern = /^[1-9][0-9]*$/ // 正整数的正则表达式
      if(this.seatform.trainroomnum==""){
        ElMessage({
          message: '请输入车厢号',
          type: 'warning',
        })
      }
      else if(this.seatform.trainroomnum> this.seatform.trainroom){
        ElMessage({
          message: '该车厢共有'+this.seatform.trainroom+'节车厢，请输入正确车厢号',
          type: 'error',
        })
      }
      else if (!pattern.test(this.seatform.trainroomnum)){
        this.seatform.trainroomnum="";
        ElMessage({
          message: '请输入合法正整数',
          type: 'error',
        })
      }
      else{
      getroomseatleft({'trainNum':this.seatform.trainNum,'trainroomnum':this.seatform.trainroomnum}).then(res => {
        this.seatform.trainroomseatleft = res.data.trainroomseatleft;
      })
       getallseatList({'trainNum':this.seatform.trainNum,'trainroomnum':this.seatform.trainroomnum}).then(res => {
        this.seatdataList = res.data;
      })
    }
    },

    seatAdd() {
      if(this.seatform.trainroomnum==""){
        ElMessage({
          message: '请输入车厢号',
          type: 'warning',
        })
      }
      else{
      this.seataddVisible=true;
      this.seataddform.trainroomnum=this.seatform.trainroomnum;
      this.seataddform.seattype="";
      this.seataddform.seatprice="";
      this.seataddform.seatstate="";
      this.seataddform.seatquantity="";
      this.seataddform.seatposition="";
    }
    },

    seatadd() {
      var pattern = /^[1-9][0-9]*$/ // 正整数的正则表达式
      if (this.seataddform.trainroomnum==""||this.seataddform.seattype==""||this.seataddform.seatprice==""||this.seataddform.seatstate==""||
      this.seataddform.seatquantity==""||this.seataddform.seatposition==""){
        ElMessage({
          message: '请输入完整信息',
          type: 'error',
        })
      }
      else if (!pattern.test(this.seataddform.seatprice)){
        this.seataddform.seatprice="";
        ElMessage({
          message: '请输入合法正整数',
          type: 'error',
        })
      }
      else if (!pattern.test(this.seataddform.seatquantity)){
        this.seataddform.seatquantity="";
        ElMessage({
          message: '请输入合法正整数',
          type: 'error',
        })
      }
      else{
      seatadd({
        form: this.seataddform,
      }).then((res) => {
         ElMessage({
          message: '座位添加成功！',
          type: 'success',
        })
        this.seataddform.seatId = res.data;
        this.seataddVisible=false;
        this.seatQuery();
      });
    }
    },

    seatEdit(seatId) {
      this.seateditVisible=true;
      this.seateditform.trainroomnum=this.seatform.trainroomnum;
      getseatInfo({seatId:seatId  }).then(
        (res) => {
          this.seateditform= res.data;
        }
      );
    },

    seatedit() {
      var pattern = /^[1-9][0-9]*$/ // 正整数的正则表达式
      if (!pattern.test(this.seateditform.seatprice)){
        this.seateditform.seatprice="";
        ElMessage({
          message: '请输入合法正整数',
          type: 'error',
        })
      }
      else{
      seatedit({
        form: this.seateditform,
      }).then((res) => {
         ElMessage({
          message: '座位修改成功！',
          type: 'success',
        })
        this.seateditform.seatId = res.data;
        this.seateditVisible=false;
        this.seatQuery();
      });
    }
    },  

    seatDelete(seatId,seatstate) {
      if(seatstate=="已预订"){
          ElMessage({
          message: '该座已有订单，无法删除!',
          type: 'error',
        })
        }
        else{
      seatDelete({'seatId':seatId}).then(res => {
        console.log(res)

        ElMessage({
          message: '座位删除成功',
          type: 'success',
        })
        this.seatQuery();
    })
    }
    },

  
  }
}
</script>

<style scoped>
.app-container{
  width: 1650px;
  position:absolute;
  top:100px;
  left:225px;
}
</style>
