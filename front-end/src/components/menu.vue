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
        <el-menu-item index="3" ><router-link to="/createTutorial">Create Tutorial</router-link></el-menu-item>
        <el-menu-item index="4"><router-link to="/myInfo">My Info</router-link></el-menu-item>
        <el-menu-item index="5"><router-link to="/sign-up">Sign Up</router-link></el-menu-item>
        <el-menu-item index="6"><router-link to="/log-in">Log In</router-link></el-menu-item>
        <el-menu-item index="7">Hi {{name}}</el-menu-item>
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
                name:null,
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        },
        mounted () {
            axios
                .get('http://localhost:3000/user')
                .then(response => (this.name = response.data[0].name))
                .catch(error => console.log(error))
        }
    }
</script>

<style scoped>

</style>