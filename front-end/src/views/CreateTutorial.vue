<template>
    <div id="CreateTutorial-Form">
    <el-form ref="form" :label-position="labelPosition" :model="form" label-width="100px">
        <el-form-item label="Tutorial Name">
            <el-input placeholder="Tutorial Name" v-model="form.name"></el-input>
        </el-form-item>

        <el-form-item label="Date">
            <el-date-picker
                    v-model="form.date1"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="start date"
                    end-placeholder="end date">
            </el-date-picker>
        </el-form-item>
        <el-form-item label="price">
            <el-input placeholder="price"   v-model="form.price"></el-input>
        </el-form-item>
        <el-form-item label="Total Enrollment">
            <el-input-number v-model="form.maxNumberStudent" controls-position="right" :min="1" ></el-input-number>
        </el-form-item>
        <el-form-item label="Detail">
            <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
        </el-form-item>
        <el-form-item label="Video Link">
            <el-input placeholder="video link" v-model="form.video_link"></el-input>
        </el-form-item>
        <el-form-item label="Picture Link">
            <el-input placeholder="video link" v-model="form.attachment"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
        </el-form-item>
    </el-form>
    </div>
</template>

<script>
    import api from '../axios'


    export default {
        name: "CreateTutorial",
        data() {
            return {
                labelPosition: 'left',
                form: {
                    name: '',
                    date1: [],
                    maxNumberStudent: '',
                    description: '',
                    video_link:'',
                    price:'',
                    attachment:''
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
                api.createTutorial(this.form).then(({data})=>{
                    if (data.success==="success") {
                        this.$message({
                            type: 'success',
                            message: 'Tutorial created!'
                        });

                        this.$router.push('/')
                    }else{
                        this.$message({
                            type: 'failed',
                            message: 'error'
                        })
                    }
                })
            }
        }
    }
</script>

<style>

</style>