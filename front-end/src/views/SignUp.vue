<template>
    <div>
        <h1>Sign Up Form</h1>
        <el-form ref="form" :label-position="labelPosition" :rules="rules"
                  label-width="150px">
            <el-form-item label="Username" prop="name" required>
                <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Email" prop="email" required>
                <el-input v-model.trim="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Mobile" prop="mobile" required>
                <el-input v-model.trim="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="Gender" prop="gender" required>
                <el-radio-group v-model.trim="form.gender">
                    <el-radio label="Male"></el-radio>
                    <el-radio label="Female"></el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="Password" prop="password" required>
                <el-input type="password" v-model.trim="form.password"></el-input>
            </el-form-item>
            <el-form-item label="Confirm" prop="confirm" required>
                <el-input type="password" v-model.trim="form.confirm"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(form)">Sign Up</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "SignUp",
        data() {

            let validateGender = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please select gender'));
                }else{
                    callback();
                }
            };

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else {
                    if (this.form.confirm !== '') {
                        this.$refs.form.validateField('confirm');
                    }
                    callback();
                }
            };
            var validatePass2 = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password again'));
                } else if (value !== this.form.password) {
                    callback(new Error('Password doesn\'t match!'));
                } else {
                    callback();
                }
            };

            return {
                labelPosition: 'left',
                form: {
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
                        { required: true,  validator: validateGender, trigger: 'change'},
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                        ],
                    confirm: [
                        { validator: validatePass2, trigger: 'blur'}
                    ],

                }
            }
        },
        methods: {
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
                        alert('submit!');

                        const url = 'http://localhost:3000/user';
                        var params = new URLSearchParams();
                        params.append('name', this.form.username);
                        params.append('gender', this.form.gender);
                        params.append('email', this.form.email);
                        params.append('phoneNumber', this.form.mobile);
                        params.append('password', this.form.password);

                        this.$axios({
                            method: 'post',
                            url: url,
                            data: params,
                        }).then((res)=>{
                            console.log(res);
                        }).catch(error => console.log(error));

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
