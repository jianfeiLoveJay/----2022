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
        <el-submenu >
          <template #title>
            <el-icon><Location /></el-icon>
            <span>个人中心</span>
          </template>
            <el-menu-item index="/changePasswordadmin"><el-icon><Document /></el-icon>修改密码</el-menu-item>
        </el-submenu>

        <el-menu-item index="/train_management">
          <el-icon><icon-menu/></el-icon>
          <span>列车管理</span>
        </el-menu-item>

        <el-menu-item index="/order_management">
          <el-icon><icon-menu/></el-icon>
          <span>订单管理</span>
        </el-menu-item>       

        <el-menu-item index="/user_management">
          <el-icon><icon-menu/></el-icon>
          <span>用户权限管理</span>
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