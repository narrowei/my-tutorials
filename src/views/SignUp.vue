<template>
    <div>
        <h1>Sign Up Form</h1>
        <el-form ref="form" :model="form" label-width="150px">
            <el-form-item label="Username">
                <el-input v-model="form.username"></el-input>
            </el-form-item>
            <el-form-item label="Email">
                <el-input v-model="form.email"></el-input>
            </el-form-item>
            <el-form-item label="Mobile">
                <el-input v-model="form.mobile"></el-input>
            </el-form-item>
            <el-form-item label="Password">
                <el-input type="password" v-model="form.password"></el-input>
            </el-form-item>
            <el-form-item label="Confirm Password">
                <el-input type="password" v-model="form.conpassword"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">Sign Up</el-button>
                <el-button>Cancel</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script>
    export default {
        name: "SignUp",
        data() {
            return {
                form: [{
                    username: '',
                    email: '',
                    mobile: '',
                    password: '',
                    conpassword: '',
                }]
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