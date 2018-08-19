<template>
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="Tutorial Name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="area">
            <el-select v-model="form.region" placeholder="please select type">
                <el-option label="sydney" value="Sydney"></el-option>
                <el-option label="UTS" value="UTS"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="date">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="please select date" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="please select time" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="free">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="type">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="game" name="type"></el-checkbox>
                <el-checkbox label="tutorial" name="type"></el-checkbox>
                <el-checkbox label="work shop" name="type"></el-checkbox>
                <el-checkbox label="lecture" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="detail">
            <el-input type="textarea" v-model="form.desc"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">create</el-button>
            <el-button>cancel</el-button>
        </el-form-item>
    </el-form>
</template>

<script>
    export default {
        name: "CreateTutorial",
        data() {
            return {
                form: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    desc: ''
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