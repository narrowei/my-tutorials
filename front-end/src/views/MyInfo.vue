<template>
    <div class="wrapper">
        <el-row class="inline">
            <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane label="Enrolled Class" name="first">
                        <el-col >
                            <h1>Enrolled class</h1>
                            <el-table
                                    :data="enrolled"
                                    height="300px"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="date"
                                        label="Date"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="type"
                                        label="Type"
                                        width="120">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button @click="handleClick(scope.row)" type="success" size="small">view</el-button>
                                        <el-button type="danger" size="small">withdraw</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </el-col>
                    </el-tab-pane>
                    <el-tab-pane label="Finished Class" name="second">
                        <h1>Finished class</h1>
                        <el-table
                                :data="finished"
                                height="300px"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="date"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="name"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="type"
                                    label="type"
                                    width="120">
                            </el-table-column>
                            <el-table-column label="Operations">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="success" size="small">view</el-button>
                                    <el-button type="danger" size="small">withdraw</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                    <el-tab-pane label="My Created Class" name="third">
                        <h1>My created class</h1>
                        <el-table
                                :data="created"
                                height="300px"
                                stripe
                                style="width: 100%">
                            <el-table-column
                                    prop="date"
                                    label="date"
                                    width="120">
                            </el-table-column>
                            <el-table-column
                                    prop="name"
                                    label="name"
                                    width="150">
                            </el-table-column>
                            <el-table-column
                                    prop="type"
                                    label="type"
                                    width="120">
                            </el-table-column>
                            <el-table-column label="Operations">
                                <template slot-scope="scope">
                                    <el-button @click="handleClick(scope.row)" type="success" size="small">view</el-button>
                                    <el-button type="danger" size="small">withdraw</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    export default {
        name: "MyInfo",
        methods: {
            handleClick(row) {
                console.log(row);
            },
            handleTabClick(tab, event) {},
        },

        data() {
            return {
                activeName: this.$store.state.activeName,
                enrolled: [{
                    date: '2020-04-21',
                    name: 'learning ES6',
                    type: 'workshop',
                }],
                finished: [{
                    date: '2018-04-21',
                    name: 'learning ES6',
                    type: 'workshop',
                }],
                created: [{
                    date: '2019-04-21',
                    name: 'learning ES6',
                    type: 'workshop',
                }]
            }
        }
    }
</script>

<style scoped>
    .wrapper {
        text-align: center;
    }
    .inline {
        width: 60%;
        display: inline-block;
    }
</style>
