/* eslint-disable */
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
                <el-button @click="resetForm('signUpForm')">Reset</el-button>
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
                        ', no space allowed.'));
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
            var validateMobile = (rule, value, callback) => {

                let reg = /^\d{9,10}$/;
                if (!reg.test(value)) {
                    callback(new Error('Mobile number must be 9-10 digits'));
                } else {
                    callback();
                }
            };
            var validateUsername = (rule, value, callback) => {

                let reg = /^[a-zA-Z0-9_-]{3,15}$/;
                if (value !== '' && !reg.test(value)) {
                    callback(new Error('Username can only consist of underscore, hyphen and alphanumeric characters.'));
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
                        { min: 3, max: 15, message: 'Username length must be 3-15 characters.', trigger: 'blur'},
                        { validator: validateUsername, trigger: 'blur'},
                        ],
                    email: [
                        { required: true, message: 'Please input email.', trigger: 'blur'},
                        { type: 'email', message: 'Please input correct email address', trigger: ['blur', 'change']},
                    ],
                    mobile: [
                        { required: true, message: 'Please input mobile.', trigger: 'blur'},
                        { validator: validateMobile, trigger: 'blur' },
                    ],
                    gender: [
                        { required: true, message: 'Please input gender.', trigger: 'change'},
                    ],
                    password: [
                        { required: true, message: 'Please input password.', trigger: 'blur'},
                        { min: 6, max: 16, message: 'Password must be 6-16 characters.', trigger: 'blur'},
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

                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let newUser = {
                                name : this.signUpForm.name,
                                gender : this.signUpForm.gender,
                                email: this.signUpForm.email,
                                mobile: this.signUpForm.mobile,
                                password: this.signUpForm.password,
                            };
                        api.userRegister(newUser).then(({data}) => {
                            if (data.success==="success") {
                                this.$message({
                                    type: 'success',
                                    message: `Sign up successfully! Please log in.`
                                })
                                //  go to login page
                                this.$router.go(0)
                                this.$router.push('/login')
                            } else if(data.success==="Already exists"){
                                this.$message({
                                    type: 'info',
                                    message: `User already exists.`
                                })
                            } else {
                                this.$message({
                                    type: 'fail',
                                    message: 'Error!'
                                })
                            }
                        }).catch((err) => {
                            console.log(err);
                        })
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
