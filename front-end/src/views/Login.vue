<template>
    <div>
        <h1>Login Form</h1>
        <el-form ref="form" :model="form" :labelPosition="labelPosition" label-width="150px">
            <el-form-item label="Username">
                <el-input v-model.trim="form.username"
                          @input="$v.form.username.$touch()"></el-input>
                <span class="error" v-if="!$v.form.username.required">
                    Username can not be null.</span>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model.trim="form.password"
                          @input="$v.form.password.$touch()"></el-input>
                <span class="error" v-if="!$v.form.password.required">
                    Password can not be null.</span>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Log in</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>

    import { required } from 'vuelidate/lib/validators'
    export default {
        name: "Login",
        data() {
            return {
                labelPosition: 'left',
                form: [{
                    username: '',
                    password: '',
                }]
            }
        },
        validations: {
            form: {
                username: {
                    required,
                },
                password: {
                    required,
                }
            },
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