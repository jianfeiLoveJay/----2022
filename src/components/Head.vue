<template>
    <div class="header">
        <div class="logo">用户管理系统</div>
        <div class="header-right">     
            <el-dropdown class="dropdown" trigger="click" @command="handleCommand">
                <el-avatar :size="60" :src="require('@/assets/4.jpg')"></el-avatar>
                <template #dropdown>
                    <el-dropdown-menu>
                        <el-dropdown-item command="logout">退出登录</el-dropdown-item>
                    </el-dropdown-menu>
                </template>
            </el-dropdown>
        </div>
    </div>
</template>

<script>
import router from '@/router/index.js'
export default {
    methods: {
        handleCommand(command) {
            if (command === 'logout') {
                this.$store.commit('logout')
                router.push('/login')
            }
        },
    },
};
</script>

<style scoped>
.header {
    position: absolute;
    top:0px;
    left:0px;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    background-color:#545c70;
}
.logo {
    float: left;
    width: 250px;
    line-height: 70px;
    color:#F8F8FF;
}
.header-right {
    float: right;
    padding-right: 50px;
}
.dropdown {
    margin-left: 10px;
    background-color:#647052 ;
}
</style>