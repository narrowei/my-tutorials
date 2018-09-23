<template>
    <div>
        <el-card class="box-card" style="margin-bottom: 20px" shadow="always">
            <div class="img">
                <img :src=attachment class="image" alt="tutorial image not found">
            </div>
            <div slot="header" style="text-align: center;">
                <span>{{name}}</span><span>{{id}}</span>
                <el-button style="float: right; padding: 5px 5px" type="primary" @click="submitForm(this)">Enroll</el-button>
            </div>
            <div style="text-align: center;">
                <p class="card-text">Tutor: {{tutor}}</p>
                <p class="card-text">Description: {{description}}</p>
                <time class="time">Time: {{time}}</time>
                <p class="card-text">Max Number of Student: {{maxNumberStudent}}</p>
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
        props:['id','name','description','tutor','time','maxNumberStudent','attachment','price'],
        methods:{
            submitForm(data){
                console.log(data);
                api.enrollTutorial({id:data}).then(({data})=>{
                    if (data.success==="success") {
                        this.$message({
                            type: 'success',
                            message: 'enroll successfully.'
                        });
                    }else{
                        this.$message({
                            type: 'fail',
                            message: 'already enrolled'
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
</style>
