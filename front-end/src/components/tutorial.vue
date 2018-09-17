<template>
    <div>
    <!--<el-card class="box-card" style="margin-bottom: 20px" shadow="always">-->
        <!--<img :src=attachment class="image">-->
        <!--<div slot="header" class="clearfix">-->
            <!--<span>{{name}}</span>-->
            <!--<el-button style="float: right; padding: 5px 5px" type="primary" @click="submitForm(this)">Enroll</el-button>-->
        <!--</div>-->
        <!--<div style="float:left;">-->
            <!--<p class="card-text">Tutor: {{tutor}}</p>-->
            <!--<p class="card-text">Description: {{description}}</p>-->
            <!--<time class="time">Time: {{time}}</time>-->
            <!--<p class="card-text">Max Number of Student: {{maxNumberStudent}}</p>-->
        <!--</div>-->
    <!--</el-card>-->

    <el-row :gutter="20">
        <el-col :span="12" >
            <el-card :body-style="{ padding: '0px' }">
                <img :src=attachment class="image">
                <div style="padding: 14px;">
                    <span>{{name}}</span>
                    <el-button style="float: right; padding: 5px 5px" type="primary" @click="submitForm(this)">Enroll</el-button>
                    <div class="bottom clearfix">
                        <p class="card-text">Tutor: {{tutor}}</p>
                        <p class="card-text">Description: {{description}}</p>
                        <time class="time">Time: {{time}}</time>
                        <p class="card-text">Max Number of Student: {{maxNumberStudent}}</p>
                    </div>
                </div>
            </el-card>
        </el-col>
    </el-row>
    </div>
</template>

<script>
    export default {
        name: "tutorial",
        data(){
            return{

            }
        },
        props:['name','description','tutor','time','maxNumberStudent','attachment']
    }
</script>

<style scoped>

</style>
