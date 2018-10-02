<template>
    <div id="CreateTutorial-Form" class="wrapper">
        <el-form ref="form" :model="form" :rules="rules"
                 :label-position="labelPosition" label-width="150px" class="inline">
            <el-form-item label="Tutorial Name">
                <el-input placeholder="Tutorial Name" v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Date">
                <el-date-picker
                        v-model.trim="form.date"
                        type="datetimerange"
                        range-separator="--"
                        start-placeholder="Start Date"
                        end-placeholder="End Date"
                        style="width: 100%;"
                        format="yyyy-MM-dd HH:mm"
                        value-format="yyyy-MM-dd HH:mm"
                        @change="datetimeFormat">
                </el-date-picker>
            </el-form-item>
            <el-form-item label="Price">
                <el-input-number placeholder="Price" v-model.trim="form.price" :min="1" style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="Number of Student">
                <el-input-number v-model.trim="form.maxNumberStudent"
                                 controls-position="both" :min="1"
                                 style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="Description">
                <editor api-key="h0tmzl02gfh1w6xrqdo1ncg28nlbkeog70oklgynd9m9l27m" :init="{
                plugins: ['advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste imagetools wordcount'],
                toolbar: 'insertfile undo redo  | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'}"
                        v-model="form.description"></editor>
            </el-form-item>
            <el-form-item label="Video Link">
                <el-input placeholder="video link" v-model.trim="form.video_link"></el-input>
            </el-form-item>
            <el-form-item label="Picture Link">
                <el-input placeholder="picture link" v-model.trim="form.attachment"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Create</el-button>
                <el-button type="danger" native-type="reset">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import api from '../axios'
    import Editor from '@tinymce/tinymce-vue';
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
                    attachment:'',
                },
                rules: {
                    name: [
                        { required: true, message: 'Please input tutorial name.', trigger: 'blur'}
                    ],
                    date: [
                        { required: true, message: 'Please input date.', trigger: 'blur'}
                    ],
                    maxNumberStudent: [
                        { required: true, message: 'Please input max number of students.', trigger: 'blur'}
                    ],
                    description: [
                        { required: true, message: 'Please input description.', trigger: 'blur'}
                    ],
                    price: [
                        { required: true, message: 'Please input price.', trigger: 'blur'}
                    ]
                }
            }
        },
        components: {
            'editor': Editor
        },
        methods: {
            datetimeFormat(val) {
                this.form.date = val;
                console.log(val);
            },
            onSubmit() {
                console.log(this.form);
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
                            message: 'Error!'
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
