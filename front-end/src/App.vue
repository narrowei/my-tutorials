<template>
  <div id="app">
      <h1>My-Tutorials</h1>
      <div id="nav">
      </div>
      <el-container>
          <el-header>
                <Menu></Menu>
          </el-header>
          <el-container>
              <!-- <el-aside width="200px">Sidebar</el-aside> -->
              <el-main style="alignment: center; padding: 20px">
                    <router-view/>
              </el-main>
          </el-container>
      </el-container>
  </div>
</template>
<script>

    import Menu from '@/components/menu.vue'
    import api from './axios.js'

    export default {
        name: 'home',
        components: {
            Menu
        },
        mounted(){
            this.get_User()
        },
        methods:{
            get_User() {
                    api.GetUser().then(({data}) => {
                        if (data.code === 401) {
                            console.log('token');
                            this.$message({
                                type: 'info',
                                message: 'You need login first!'
                            });
                            this.$router.push({name: 'login'});
                            this.$store.dispatch('UserLogout');
                            console.log(this.$store.state.username);
                        } else {
                            this.$store.dispatch('UserName', localStorage.username);
                            this.$store.dispatch('UserLogin', data.token);
                            console.log('already logged in');
                        }
                    })
                }
            },
    }
</script>

<style>
#app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
</style>
