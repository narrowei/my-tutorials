<template>
    <el-card class="box-card">
        <div slot="header" class="title">
            <span>Student Name: {{reviewer}}</span>
            <span>Rating: {{rating}}</span>
        </div>
        <div class="text">
            <span>{{description}}</span>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "review",
        data(){
            return {

            }
        },
        props:['id','reviewer','description','rating'],
    }
</script>

<style scoped>
    .title, .text{
        text-align: left;
    }
</style>
