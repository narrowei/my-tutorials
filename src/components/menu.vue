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
        <h3>My-Tutorials</h3>
        <el-menu-item index="1">Menu</el-menu-item>
        <el-submenu index="2">
            <template slot="title">my tutorial</template>
            <el-menu-item index="2-1">option 1</el-menu-item>
            <el-submenu index="2-4">
                <template slot="title">option 4</template>
                <el-menu-item index="2-4-1">choose 1</el-menu-item>
                <el-menu-item index="2-4-2">choose 2</el-menu-item>
                <el-menu-item index="2-4-3">choose 3</el-menu-item>
            </el-submenu>
        </el-submenu>
        <el-menu-item index="3" disabled>notification</el-menu-item>
        <el-menu-item index="4"><a href="https://www.ele.me" target="_blank">my info</a></el-menu-item>
    </el-menu>
    </div>


    
</template>

<script>
    export default {
        name: 'Menu',
        data() {
            return {
                activeIndex: '1',
                activeIndex2: '1'
            };
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log(key, keyPath);
            }
        }
    }
</script>

<style scoped>

</style>