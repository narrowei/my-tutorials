<!--<template>-->
  <!--<div id="app">-->
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <!--<router-view/>-->
  <!--</div>-->
<!--</template>-->
<template>
  <div id="app">
<<<<<<< HEAD
    <div id="nav">
      <!-- <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> -->
    </div>
    <!-- <router-view/> -->
=======
    <el-container>
      <el-header>
        <MENU></MENU>
      </el-header>
      <el-main>
        <el-row :gutter="20">

          <el-col :span="12" :offset="6"><router-view/></el-col>

        </el-row>

      </el-main>
    </el-container>
>>>>>>> ed4cc412aa1f99ac5a2535c7bf51b6bba826cc19
  </div>
</template>
<script>
    // @ is an alias to /src
    import MENU from '@/components/menu.vue'

    export default {
        name: 'home',
        components: {
            MENU
        }
    }
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
