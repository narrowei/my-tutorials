<template>
    <div class="wrapper">
        <el-row class="inline">
            <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleClick">
                    <el-tab-pane label="Login" name="first">
                        <el-col >
                            <h1>Login Form</h1>
                            <el-form ref="loginForm" :model="loginForm" :labelPosition="labelPosition" :rules="rules" label-width="150px">
                                <el-form-item label="Username" prop="name">
                                    <el-input v-model.trim="loginForm.name"></el-input>
                                </el-form-item>
                                <el-form-item label="Password" prop="password">
                                    <el-input type="password" v-model.trim="loginForm.password"></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-button type="primary" @click="submitForm('loginForm')">Log in</el-button>
                                    <el-button @click="resetForm('loginForm')">Reset</el-button>
                                </el-form-item>
                            </el-form>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="Sign Up" name="second">
                        <SignUp></SignUp>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as types from '../store/types'
    import api from '../axios'
    import SignUp from '@/views/SignUp.vue'

    export default {
        name: "Login",
        data() {
            return {
                labelPosition: 'left',
                activeName: this.$store.state.activeName,
                loginForm: {
                    name: '',
                    password: '',
                },
                // form validation rules
                rules: {
                    name: [
                        { required: true, message: 'Please input username.', trigger: 'blur'},
                        { min: 3, max: 12, message: 'Username length must be 3-12 characters.', trigger: 'blur'},
                    ],
                    password: [
                        { required: true, message: 'Please input password.', trigger: 'blur'},
                    ],
                }
            }
        },
        components: {
            SignUp,
        },
        methods: {
            // handle panel tab click
            handleClick(tab, event) {},

            // reset form
            resetForm(formName){
                this.$refs[formName].resetFields();
            },

            submitForm(formName) {
                // before submission, validate form
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        let userInfo = {
                            name: this.loginForm.name,
                            password: this.loginForm.password
                        };
                        api.UserLogin(userInfo).then(({data}) => {
                            if (data.success==="success") {
                                this.$message({
                                    type: 'success',
                                    message: 'Login successfully.'
                                });

                                this.$store.dispatch('UserName', data.email);
                                this.$store.dispatch('UserLogin', data.token);
                                let redirect = decodeURIComponent(this.$route.query.redirect || '/');
                                // when login successfully, redirect to home page
                                this.$router.push({
                                    path: redirect
                                })
                            } else {
                                this.$message({
                                    type: 'info',
                                    message: 'Username or password incorrect.'
                                })
                            }
                        })
                    } else {
                        console.log('Error Submit!!');
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
