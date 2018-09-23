<template>
    <div id="CreateTutorial-Form" class="wrapper">
        <el-form ref="form" :label-position="labelPosition" :model="form" label-width="150px" class="inline">
            <el-form-item label="Tutorial Name">
                <el-input placeholder="Tutorial Name" v-model="form.name"></el-input>
            </el-form-item>

            <el-form-item label="Date">
                <el-date-picker
                        v-model="form.date"
                        type="datetimerange"
                        range-separator="--"
                        start-placeholder="Start Date"
                        end-placeholder="End Date"
                        style="width: 100%;">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Price">
                <el-input placeholder="Price"   v-model="form.price"></el-input>
            </el-form-item>
            <el-form-item label="Number of Student">
                <el-input-number v-model="form.maxNumberStudent"
                                 controls-position="both" :min="1"
                                 style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="Description">
                <el-input type="textarea" v-model="form.description" :autosize="{ minRows: 2, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item label="Video Link">
                <el-input placeholder="video link" v-model="form.video_link"></el-input>
            </el-form-item>
            <el-form-item label="Picture Link">
                <el-input placeholder="picture link" v-model="form.attachment"></el-input>
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
                    date: [],
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

<style scoped>
    .wrapper {
        text-align: center;
    }
    .inline {
        width: 50%;
        display: inline-block;
    }
</style>
