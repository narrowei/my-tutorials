<template>
    <el-card class="box-card" style="margin-bottom: 20px">
        <div slot="header" class="clearfix">
            <span>{{name}}</span>
            <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/enroll">enroll</router-link></el-button>
        </div>
        <div>
            <p class="card-text">{{description}}</p>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "tutorial",
        data(){
            return{

            }
        },
        props:['name','description']
    }
</script>

<style scoped>

</style>