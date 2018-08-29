<template>
    <div>
        <h1>Sign Up Form</h1>
        <el-form :model="signUpForm" ref="signUpForm" :rules="rules"
                 :label-position="labelPosition" label-width="150px">
            <el-form-item label="Username" prop="name">
                <el-input v-model.trim="signUpForm.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email">
                <el-input v-model.trim="signUpForm.email"></el-input>
            </el-form-item>
            <el-form-item label="Mobile" prop="mobile">
                <el-input v-model.trim="signUpForm.mobile"></el-input>
            </el-form-item>
            <el-form-item label="Gender" prop="gender">
                <el-radio-group v-model.trim="signUpForm.gender">
                    <el-radio label="Male"></el-radio>
                    <el-radio label="Female"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Password" prop="password">
                <el-input type="password" v-model.trim="signUpForm.password"></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="confirm">
                <el-input type="password" v-model.trim="signUpForm.confirm"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm('signUpForm')">Sign Up</el-button>
                <el-button @click="resetForm('signUpForm')">Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import * as types from '../store/types'
    import api from '../axios'
    export default {
        name: "login",
        data() {

            var validatePass = (rule, value, callback) => {

                // at least one lowercase, one uppercase, one digital
                let reg = /(?!^[0-9]+$)(?!^[A-z]+$)(?!^[^A-z0-9]+$)^[^\s\u4e00-\u9fa5]{6,16}$/;
                if (!reg.test(value)) {
                    callback(new Error('Password must contain at least 2 types of characters(number, letter, special characters)' +
                        ', 6-16 in length, no space allowed.'));
                } else {
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.signUpForm.password) {
                    callback(new Error('Password doesn\'t match!'));
                } else {
                    callback();
                }
            };

            return {
                labelPosition: 'left',
                signUpForm: {
                    name: '',
                    email: '',
                    mobile: '',
                    gender: '',
                    password: '',
                    confirm: '',
                },
                rules: {
                    name: [
                        { required: true, message: 'Please input username.', trigger: 'blur'},
                        { min: 3, max: 12, message: 'Username length must be 3-12 characters.', trigger: 'blur'},
                        ],
                    email: [
                        { required: true, message: 'Please input email.', trigger: 'blur'},
                        { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']},
                    ],
                    mobile: [
                        { required: true, message: 'Please input mobile.', trigger: 'blur'},
                        { type: 'number', message: 'Mobile must be all digital'},
                        { min: 9, max: 10, message: 'Mobile length must be 9-10 digital.', trigger: 'blur'},
                    ],
                    gender: [
                        { required: true, message: 'Please input gender.', trigger: 'change'},
                    ],
                    password: [
                        { required: true, message: 'Please input password.', trigger: 'blur'},
                        { validator: validatePass, trigger: 'blur' },
                        ],
                    confirm: [
                        { required: true, message: 'Please input password.', trigger: 'blur'},
                        { validator: validatePass2, trigger: 'blur'},
                    ],

                }
            }
        },
        methods: {
            resetForm(formName){
                this.$refs[formName].resetFields();
            },

            submitForm(formName) {

                /*let newUser = {
                    name : this.form.username,
                    gender : this.form.gender,
                    email: this.form.email,
                    phoneNumber: this.form.mobile,
                    type: this.form.student? 1 : 0,
                    password: this.form.password,
                }
                axios
                    .post('http://localhost:3000/user',newUser)
                    .then(response => (this.classes = response.data))
                    .catch(error => console.log(error))*/


                this.$refs[formName].validate((valid) => {
                    if (valid) {

                        let opt = this.signUpForm;

                        api.userRegister(opt).then(({data}) => {
                            if (data.success) {
                                this.$message({
                                    type: 'success',
                                    message: `Sign up successfully! Please log in.`
                                })
                                //  go to login page
                                this.$router.go(0)
                                this.$router.push('/login')
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: 'User exists.'
                                })
                            }
                        }).catch((err) => {
                            console.log(err);
                        })

                        // const url = 'http://localhost:3000/user';
                        // var params = new URLSearchParams();
                        // params.append('name', this.form.username);
                        // params.append('gender', this.form.gender);
                        // params.append('email', this.form.email);
                        // params.append('phoneNumber', this.form.mobile);
                        // params.append('password', this.form.password);
                        //
                        // this.$axios({
                        //     method: 'post',
                        //     url: url,
                        //     data: params,
                        // }).then((res)=>{
                        //     console.log(res);
                        // }).catch(error => console.log(error));

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });


            }
        }

    }
</script>

<style scoped>

</style>
