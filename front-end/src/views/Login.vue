<template>
    <div>
        <h1>Login Form</h1>
        <el-form ref="form" :model="form" :labelPosition="labelPosition" :rules="rules" label-width="150px">
            <el-form-item label="Username" prop="name" required>
                <el-input v-model.trim="form.name"></el-input>
            </el-form-item>
            <el-form-item label="Password" prop="password" required>
                <el-input type="password" v-model.trim="form.password"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitForm(form)">Log in</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    export default {
        name: "Login",
        data() {

            var validatePass = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('Please input the password'));
                } else {
                    callback();
                }
            };

            return {
                labelPosition: 'left',
                form: {
                    name: '',
                    password: '',
                },
                rules: {
                    name: [
                        { required: true, message: 'Please input username.', trigger: 'blur'},
                        { min: 3, max: 12, message: 'Username length must be 3-12 characters.', trigger: 'blur'},
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' }
                    ],
                }
            }
        },
        methods: {
            onSubmit() {
                console.log('submit!');
            }
        }
    }
</script>

<style scoped>

</style>