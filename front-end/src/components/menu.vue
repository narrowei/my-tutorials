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
        <el-menu-item index="1"><router-link to="/">Home</router-link></el-menu-item>
        <el-submenu index="2">
            <template slot="title"><router-link to="/about">About</router-link></template>
            <el-menu-item index="2-1">option 1</el-menu-item>
            <el-submenu index="2-2">
                <template slot="title">option 2</template>
                <el-menu-item index="2-2-1">choose 1</el-menu-item>
                <el-menu-item index="2-2-2">choose 2</el-menu-item>
                <el-menu-item index="2-2-3">choose 3</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="3" v-if="this.$store.state.username === null || this.$store.state.username === 'undefined' "><router-link to="/log-in">Log In / Sign Up</router-link></el-menu-item>
        <el-submenu index="4" v-else>
            <template slot="title"> Hi, {{$store.state.username}}</template>
            <el-menu-item index="4-1"><router-link to="/myInfo">My Info</router-link></el-menu-item>
            <el-menu-item index="4-2" ><router-link to="/createTutorial">Create Tutorial</router-link></el-menu-item>
            <el-menu-item index="4-3">Logout</el-menu-item>
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
            handleSelect(key, keyPath) {
                console.log(keyPath);
                if(keyPath[1]==='4-3'){
                    this.$store.dispatch('UserLogout');
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
        },
        mounted () {
            console.log(this.$store.state.username);
        }
    }
</script>

<style scoped>
    a {
        text-decoration: none;
    }
    .router-link-active {
        text-decoration: none;
    }
</style>
