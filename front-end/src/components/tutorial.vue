<template>
    <div>
        <el-card class="box-card" style="margin-bottom: 20px" shadow="always">
            <div class="img">
                <img v-if="attachment !== ''" :src=attachment class="image" alt="Cover image can not be found">
                <img v-else src="http://www.kanchipuram.company/business-directory/k2o/uploadimages/company/08-2017/20171123111345tutorial.png" class="image">
            </div>
            <div slot="header" style="text-align: center;">
                <span>{{name}}</span>
                <el-button style="float: right; padding: 5px 5px; margin-left: 10px;" type="primary">
                    <router-link :to="{path:'/tutorialInfo', query:{id: id}}">View</router-link></el-button>
                <el-button style="float: right; padding: 5px 5px" type="primary" @click="submitForm(id)">Enroll</el-button>
            </div>
            <div style="text-align: left;">
                <table class="infoTable">
                    <tr>
                        <td>Tutor:</td>
                        <td class="tableContent">{{tutor}}</td>
                    </tr>
                    <tr>
                        <td>Time:</td>
                        <td class="tableContent">{{time}}</td>
                    </tr>
                    <tr>
                        <td>Price:</td>
                        <td class="tableContent">{{price}} AUD</td>
                    </tr>
                </table>
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
    .infoTable{
        padding: 10px 50px;
    }
    .infoTable td{
        text-align: left;
        height: 20px;
        width: 100px;
    }
    .infoTable .tableContent{
        width: 200px;
    }
</style>
