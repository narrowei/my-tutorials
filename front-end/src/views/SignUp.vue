<template>
    <div>
        <h1>Sign Up Form</h1>
        <el-form ref="form" :label-position="labelPosition"
                 :model="form" label-width="150px">
            <el-form-item label="* Username">
                <el-input v-model.trim="form.username"
                          @input="$v.form.username.$touch()"></el-input>
                <span class="error" v-if="!$v.form.username.required">
                    Username can not be null.</span>
                <span class="error" v-if="!$v.form.username.minLength || !$v.form.username.maxLength">
                    Username length must be 2-16 characters.</span>
            </el-form-item>
            <el-form-item label="* Email">
                <el-input v-model.trim="form.email"
                          @input="$v.form.email.$touch()"></el-input>
                <span class="error" v-if="!$v.form.email.required">
                    Username can not be null.</span>
                <span class="error" v-if="!$v.form.email.email">
                    Username length must be 2-16 characters.</span>
            </el-form-item>
            <el-form-item label="* Mobile">
                <el-input v-model.trim="form.mobile"
                          @input="$v.form.mobile.$touch()"></el-input>
                <span class="error" v-if="!$v.form.mobile.required">
                    Mobile number can not be null</span>
                <span class="error" v-if="!$v.form.mobile.minLength || !$v.form.mobile.maxLength || !$v.form.mobile.numeric">
                    Mobile number must be 10 digital </span>
            </el-form-item>
            <el-form-item label="  Sign up as a Student">
                <el-switch v-model="form.student" style="float: left"></el-switch>
            </el-form-item>
            <el-form-item label="  Gender">
                <el-input v-model.trim="form.gender"></el-input>
            </el-form-item>
            <el-form-item label="*  Password">
                <el-input type="password" v-model.trim="form.password"></el-input>
                <span class="error" v-if="!$v.form.password.required">
                    Password can not be null</span>
                <span class="error" v-if="!$v.form.password.minLength || !$v.form.password.maxLength || !$v.form.password.alphaNum">
                    Password must be 2-16 alphanumeric. </span>
            </el-form-item>
            <el-form-item label="*  Confirm Password">
                <el-input type="password" v-model.trim="form.conpassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Sign Up</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    import { required, email, minLength, maxLength, numeric, alphaNum } from 'vuelidate/lib/validators'
    export default {
        name: "SignUp",
        data() {
            return {
                labelPosition: 'left',
                form: [{
                    username: '',
                    email: '',
                    mobile: '',
                    student:false,
                    gender: '',
                    password: '',
                    conpassword: '',
                }],
            }
        },
        validations: {
            form: {
                username: {
                    required,
                    minLength: minLength(2),
                    maxLength: maxLength(16),
                },
                email: {
                    required, email
                },
                mobile: {
                    required,
                    numeric,
                    minLength: minLength(10),
                    maxLength: maxLength(10),
                },
                password: {
                    required,
                    alphaNum,
                    minLength: minLength(2),
                    maxLength: maxLength(16),

                }
            },
        },
        methods: {
            onSubmit() {
                if(this.$v.$invalid === true){
                    return;
                }

                const user = {
                    name : this.form.username,
                    gender : this.form.gender,
                    email: this.form.email,
                    phoneNumber: this.form.mobile,
                    type: this.form.student? 1 : 0,
                    password: this.form.password,
                }
                console.log('submit!');
            }
        }

    }
</script>

<style scoped>

</style>