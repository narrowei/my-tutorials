<template>
    <el-form ref="form" :model="form" label-width="100px">
        <el-form-item label="Tutorial Name">
            <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="Location">
            <el-select v-model="form.region" placeholder="Please select a location">
                <el-option label="Sydney" value="Sydney"></el-option>
                <el-option label="UTS" value="UTS"></el-option>
            </el-select>
        </el-form-item>
        <el-form-item label="Date">
            <el-col :span="11">
                <el-date-picker type="date" placeholder="Please select date" v-model="form.date1" style="width: 100%;"></el-date-picker>
            </el-col>
            <el-col class="line" :span="2">-</el-col>
            <el-col :span="11">
                <el-time-picker type="fixed-time" placeholder="Please select time" v-model="form.date2" style="width: 100%;"></el-time-picker>
            </el-col>
        </el-form-item>
        <el-form-item label="Free">
            <el-switch v-model="form.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="Type">
            <el-checkbox-group v-model="form.type">
                <el-checkbox label="Tutorial" name="type"></el-checkbox>
                <el-checkbox label="Work shop" name="type"></el-checkbox>
                <el-checkbox label="Lecture" name="type"></el-checkbox>
            </el-checkbox-group>
        </el-form-item>
        <el-form-item label="Detail">
            <el-input type="textarea" v-model="form.description"></el-input>
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">Create</el-button>
            <el-button>Cancel</el-button>
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
                    description: ''
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