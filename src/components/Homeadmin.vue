<template>
  <div class="base">
    <el-container>
    <el-header> <v-headadmin></v-headadmin></el-header>     
       <el-side> <v-menuadmin></v-menuadmin></el-side>
        <el-main>
          <div class="main">          
            <router-view></router-view>
          </div>
        </el-main>
    </el-container>
    </div>
</template>

<script>
import vHeadadmin from '@/components/Headadmin.vue';
import vMenuadmin from '@/components/Menuadmin.vue';
export default {
  name: 'Homeadmin',
  components: {
    vHeadadmin,
    vMenuadmin
  },
}
</script>
