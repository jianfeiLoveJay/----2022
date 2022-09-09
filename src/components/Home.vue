<template>
  <div class="base">
    <el-container>
    <el-header> <v-head></v-head></el-header>     
       <el-side> <v-menu></v-menu></el-side>
        <el-main>
          <div class="main">         
            <router-view></router-view>
          </div>
        </el-main>
    </el-container>
    </div>
</template>

<script>
import vHead from '@/components/Head.vue';
import vMenu from '@/components/Menu.vue';
export default {
  name: 'Home',
  components: {
    vHead,
    vMenu
  },
}
</script>
