<template>
    <div>
        <el-menu
        style="height: 100%;width:200px"
        active-text-color="#ffd04b"
        background-color="#545c64"
        text-color="#fff"
        class="el-menu"
        default-active=""
        router
        @open="handleOpen"
        @close="handleClose"
        collapse-transition:true
       >
        <el-submenu index="1" >
          <template #title>
            <el-icon><Location /></el-icon>
            <span>个人中心</span>
          </template>
            <el-menu-item index="/personal_information"><el-icon><Document /></el-icon>个人信息</el-menu-item>
            <el-menu-item index="/changePassword"><el-icon><Document /></el-icon>修改密码</el-menu-item>
        </el-submenu>

        <el-submenu index="2" >
          <template #title>
            <el-icon><Location /></el-icon>
            <span>火车订票</span>
          </template>
            <el-menu-item index="/nonstop_train"><el-icon><Document /></el-icon>直达查询</el-menu-item>
            <el-menu-item index="/transfer_train"><el-icon><Document /></el-icon>连续换乘</el-menu-item>
        </el-submenu>

        <el-submenu index="3" >
          <template #title>
            <el-icon><iconMenu /></el-icon>
            <span>订单</span>
          </template>
            <el-menu-item index="/order_form_nopay"><el-icon><Document /></el-icon>未支付订单</el-menu-item>
            <el-menu-item index="/order_form_nouse"><el-icon><Document /></el-icon>未使用订单</el-menu-item>
            <el-menu-item index="/order_form_canceled"><el-icon><Document /></el-icon>已取消订单</el-menu-item>
            <el-menu-item index="/order_form_completed"><el-icon><Document /></el-icon>已完成订单</el-menu-item>
        </el-submenu>

        <el-menu-item index="/passenger">
          <el-icon><icon-menu/></el-icon>
          <span>乘车人管理</span>
        </el-menu-item> 
        </el-menu>
    </div>
</template>

<script>
import {
  Location,
  Document,
  Menu as IconMenu,
} from '@element-plus/icons'
export default{
  components:{
    Location,
    Document,
    IconMenu,
  },
    setup() {
    const handleOpen = (key, keyPath) => {
      console.log(key, keyPath)
    }
    const handleClose = (key, keyPath) => {
      console.log(key, keyPath)
    }
    return {
      handleOpen,
      handleClose
    }
  },
}
</script>

<style scoped>
.el-menu {
    display: block;
    position: absolute;
    left: 0;
    top: 70px;
    bottom: 0;
    border-right-width: 0;
    
}
</style>