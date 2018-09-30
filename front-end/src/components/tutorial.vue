<template>
    <div>
        <el-card class="box-card" style="margin-bottom: 20px" shadow="always">
            <div class="img">
                <img :src=attachment class="image" alt="tutorial image not found">
            </div>
            <div slot="header" style="text-align: center;">
                <span>{{name}}</span>
                <el-button style="float: right; padding: 5px 5px; margin-left: 10px;" type="primary">
                    <router-link :to="{path:'/tutorialInfo', query:{id: id}}">View</router-link></el-button>
                <el-button style="float: right; padding: 5px 5px" type="primary" @click="submitForm(id)">Enroll</el-button>
            </div>
            <div style="text-align: center;">
                <p class="card-text">Tutor: {{tutor}}</p>
                <p class="card-text">Description: {{description}}</p>
                <time class="time">Time: {{time}}</time>
                <p class="card-text">Price: ${{price}}</p>
            </div>
        </el-card>
    </div>
</template>

<script>
    import api from '../axios'

    export default {
        name: "tutorial",
        data(){
            return{

            }
        },
        props:['id','name','description','tutor','time','attachment','price'],
        methods:{
            submitForm(data){
                console.log(data);
                api.enrollTutorial({id:data}).then(({data})=>{
                    if (data.success==="success") {
                        this.$message({
                            type: 'success',
                            message: 'Enroll successfully.'
                        });
                    }else if(data.success==="max number reached"){
                        this.$message({
                            type: 'fail',
                            message: 'Max number of student reached.'
                        });
                    }else if(data.success==="already enrolled"){
                        this.$message({
                            type: 'fail',
                            message: 'Already enrolled.'
                        });
                    }else{
                        this.$message({
                            type: 'fail',
                            message: 'Error.'
                        });
                    }
                })
            }
        }
    }
</script>

<style scoped>
    .box-card {
        width: 360px;
    }
    .image {
        width: 100%;
        height: 220px;
    }
    a {
        text-decoration: none;
        color: white;
    }
    .router-link-active {
        text-decoration: none;
    }
</style>
