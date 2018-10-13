<template>
    <div name="menu">
    <el-menu
            :default-active="activeIndex2"
            class="el-menu-demo"
            mode="horizontal"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
        <el-menu-item index="1"><router-link to="/"><i class="el-icon-menu"></i>Home</router-link></el-menu-item>
        <el-submenu index="2">
            <template slot="title"><i class="el-icon-question"></i>About</template>
            <el-menu-item index="2-1"><router-link to="/about"><i class="el-icon-info"></i>About the Site</router-link></el-menu-item>
            <el-menu-item index="2-2"><router-link to="/contact"><i class="el-icon-service"></i>Contact Us</router-link></el-menu-item>
        </el-submenu>
        <el-menu-item index="3" v-if="this.$store.state.username === null || this.$store.state.username === 'undefined' "><router-link to="/log-in">Log In / Sign Up</router-link></el-menu-item>
        <el-submenu index="4" v-else>
            <template slot="title"> Hi, {{$store.state.username}}</template>
            <el-menu-item index="4-1"><router-link to="/myInfo"><i class="el-icon-info"></i>My Info</router-link></el-menu-item>
            <el-menu-item index="4-2" ><router-link to="/createTutorial"><i class="el-icon-edit-outline"></i>Create Tutorial</router-link></el-menu-item>
            <el-menu-item index="4-3"><i class="el-icon-close"></i>Logout</el-menu-item>
        </el-submenu>

    </el-menu>
    </div>
</template>

<script>
    import axios from 'axios';
    export default {
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1',
                name: this.$store.state.username,
            };
        },
        methods: {
            // handle menu item selection, direct to different router link
            handleSelect(key, keyPath) {
                if(keyPath[1]==='4-3'){
                    this.$store.dispatch('UserLogout');
                    // check token
                    if (!this.$store.state.token) {
                        this.$message({
                            type: 'success',
                            message: 'Logout success'
                        });
                        this.$router.push('/');
                    } else {
                        this.$message({
                            type: 'info',
                            message: 'Logout fail'
                        })
                    }
                }
            }
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
        color: white;
    }
    .router-link-active {
        text-decoration: none;
        color: white;
    }
</style>
