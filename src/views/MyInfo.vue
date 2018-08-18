<template>
    <div>
        <h1>Enrolled class</h1>
        <el-table
                :data="enrolled"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="date"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="name"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="type"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="operations"
                    >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">view</el-button>
                    <el-button type="text" size="small">withdraw</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h1>finished class</h1>
        <el-table
                :data="finished"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="date"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="name"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="type"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="operations"
            >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">view</el-button>
                    <el-button type="text" size="small">withdraw</el-button>
                </template>
            </el-table-column>
        </el-table>
        <h1>My created class</h1>
        <el-table
                :data="created"
                stripe
                border
                style="width: 100%">
            <el-table-column
                    prop="date"
                    label="date"
                    width="150">
            </el-table-column>
            <el-table-column
                    prop="name"
                    label="name"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="type"
                    label="type"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="operations"
            >
                <template slot-scope="scope">
                    <el-button @click="handleClick(scope.row)" type="text" size="small">view</el-button>
                    <el-button type="text" size="small">withdraw</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "MyInfo",
        methods: {
            handleClick(row) {
                console.log(row);
            }
        },

        data() {
            return {
                enrolled: [{
                    date: '2020-04-21',
                    name: 'learning ES6',
                    type: 'workshop',
                }, {
                    date: '2020-04-21',
                    name: 'learning VueJS',
                    type: 'lecture',
                }, {
                    date: '2020-04-21',
                    name: 'learning React',
                    type: 'workshop',
                }, {
                    date: '2020-04-21',
                    name: 'learning Angular2',
                    type: 'workshop',
                }],
                finished: [{
                    date: '2018-04-21',
                    name: 'learning ES6',
                    type: 'workshop',
                }, {
                    date: '2018-04-21',
                    name: 'learning VueJS',
                    type: 'lecture',
                }, {
                    date: '2018-04-21',
                    name: 'learning React',
                    type: 'workshop',
                }, {
                    date: '2020-04-21',
                    name: 'learning Angular2',
                    type: 'workshop',
                }],
                created: [{
                    date: '2019-04-21',
                    name: 'learning ES6',
                    type: 'workshop',
                }, {
                    date: '2018-04-21',
                    name: 'learning VueJS',
                    type: 'lecture',
                }, {
                    date: '2017-04-21',
                    name: 'learning React',
                    type: 'workshop',
                }, {
                    date: '2016-04-21',
                    name: 'learning Angular2',
                    type: 'workshop',
                }]
            }
        }
    }
</script>

<style scoped>

</style>