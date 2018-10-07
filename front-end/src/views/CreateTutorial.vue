<template>
    <div id="CreateTutorial-Form" class="wrapper">
        <el-form ref="form" :model="form" :rules="rules"
                 :label-position="labelPosition" label-width="150px" class="inline">
            <el-form-item label="Tutorial Name" prop="name">
                <el-input placeholder="Tutorial Name" v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Date" prop="date">
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
            <el-form-item label="Price" prop="price">
                <el-input-number placeholder="Price" v-model.trim="form.price" :min="1" style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="Number of Student" prop="maxNumberStudent">
                <el-input-number v-model.trim="form.maxNumberStudent"
                                 controls-position="both" :min="1"
                                 style="width: 100%;"></el-input-number>
            </el-form-item>
            <el-form-item label="Cover Picture Link" prop="attachment">
                <el-input placeholder="Cover Picture Link" v-model.trim="form.attachment"></el-input>
            </el-form-item>
            <el-form-item label="Video Link" prop="video_link">
                <el-input placeholder="Video Link" v-model.trim="form.video_link"></el-input>
            </el-form-item>
            <el-form-item label="Description" prop="description">
                <editor api-key="h0tmzl02gfh1w6xrqdo1ncg28nlbkeog70oklgynd9m9l27m" :init="{
                plugins: ['advlist autolink lists link image charmap print preview anchor',
                'searchreplace visualblocks code fullscreen',
                'insertdatetime media table contextmenu paste imagetools wordcount'],
                toolbar: 'insertfile undo redo  | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image'}"
                        v-model="form.description"></editor>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('form')">Create</el-button>
                <el-button type="danger" native-type="reset">Reset</el-button>
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
            var validateTutorialName = (rule, value, callback) => {

                let reg = /^[a-zA-Z0-9-_:\ \.]{3,50}$/;
                if (value !== '' && !reg.test(value)) {
                    callback(new Error('Only underscore, hyphen, comma, dot, space, and alphanumeric characters allowed.'));
                } else {
                    callback();
                }
            };
            var validateImageUrl = (rule, value, callback) => {

                let reg = /https?:\/\/.+\.(gif|jpg|jpeg|tiff|png)$/;
                if (value !== '' && !reg.test(value)) {
                    callback(new Error('Image Url is not valid'));
                } else {
                    callback();
                }
            };
            var validateVideoUrl = (rule, value, callback) => {

                let reg = /https:\/\/www\.youtube\.com\/watch\?v=.+$/;
                if (value !== '' && !reg.test(value)) {
                    callback(new Error('Video Url is not valid. Hint: Must start with "https://www.youtube.com/watch?v=".'));
                } else {
                    callback();
                }
            };

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
                        { required: true, message: 'Please input tutorial name.', trigger: 'blur'},
                        { min: 3, max: 50, message: 'Tutorial name length must be 3-50 characters.', trigger: 'blur'},
                        { validator: validateTutorialName, trigger: 'blur'},
                    ],
                    date: [
                        { required: true, message: 'Please input date.', trigger: 'blur'}
                    ],
                    maxNumberStudent: [
                        { required: true, message: 'Please input max number of students.', trigger: 'blur'}
                    ],
                    price: [
                        { required: true, message: 'Please input price.', trigger: 'blur'}
                    ],
                    attachment: [
                        { validator: validateImageUrl, trigger: 'blur'},
                    ],
                    video_link: [
                        { validator: validateVideoUrl, trigger: 'blur'},
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
            onSubmit(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        api.createTutorial(this.form).then(({data})=>{
                            if (data.success==="success") {
                                this.$message({
                                    type: 'success',
                                    message: 'Tutorial created!'
                                });
                                this.$router.push('/myInfo')
                            }else if(data.code === 401){
                                this.$message({
                                    type: 'fail',
                                    message: 'You are not log in.'
                                });
                            }else{
                                this.$message({
                                    type: 'failed',
                                    message: 'Error!'
                                })
                            }
                        })
                    }else {
                        console.log('error submit!!');
                        return false;
                    }
                });
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
