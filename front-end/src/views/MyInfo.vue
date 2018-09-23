<template>
    <div class="wrapper">
        <el-row class="inline">
            <el-col :span="24">
                <el-tabs v-model="activeName" @tab-click="handleTabClick">
                    <el-tab-pane label="Enrolled Tutorials" name="first">
                        <h1>Enrolled Tutorials</h1>
                        <div v-for="tutorial in enrolled">
                            <el-table
                                    :data="tutorial"
                                    height="300px"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="time"
                                        label="Date"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="Description"
                                        width="120">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button @click="viewTutorial(scope.row); isHidden = !isHidden" type="info" size="small">View</el-button>
                                        <el-button @click="finishTutorial(scope.row)" type="success" size="small">Finish</el-button>
                                        <el-button @click="withdraw(scope.row)" type="danger" size="small">Withdraw</el-button>
                                    </template>
                                    <div v-if="!isHidden">
                                        <span>hhh</span>
                                    </div>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Finished Tutorials" name="second">
                        <h1>Finished Tutorials</h1>
                        <div v-for="tutorial in finished">
                            <el-table
                                    :data="tutorial"
                                    height="300px"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="time"
                                        label="Date"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="Description"
                                        width="120">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button @click="viewTutorial(scope.row)" type="info" size="small">View</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="My Created Tutorials" name="third">
                        <h1>My created Tutorials</h1>
                        <div v-for="tutorial in finished">
                            <el-table
                                    :data="tutorial"
                                    height="300px"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="time"
                                        label="Date"
                                        width="120">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="Description"
                                        width="120">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button @click="viewTutorial(scope.row)" type="info" size="small">View</el-button>
                                        <el-button @click="delTutorial(scope.row)" type="danger" size="small">Delete</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
    </div>
</template>

<script>
    import * as types from '../store/types'
    import api from '../axios'

    export default {
        name: "MyInfo",
        data() {
            return {
                activeName: this.$store.state.activeName,
                enrolled:[],
                finished:[],
                created:[],
                viewTutorial: null,
                isHidden: true,
            }
        },
        mounted () {
            this.getTutorial()
        },
        methods: {
            getTutorial() {
                setTimeout(() => {
                    api.getEnrolledTutorial().then(({data}) => {
                        this.enrolled = data
                    }),
                    api.getFinishedTutorial().then(({data}) => {
                        this.finished = data
                    }),
                    api.getCreatedTutorial().then(({data}) => {
                        this.created = data
                    })
                }, 100)
            },
            handleTabClick(tab, event) {},

            viewTutorial(row) {
                console.log(row);
                let tutorial = row;
                api.viewTutorial(tutorial).then(({data}) => {
                    this.viewTutorial = data
                })
            },

            finishTutorial(row) {
                console.log(row);
                let tutorial = row;
                api.finishTutorial(tutorial).then(({data}) => {
                    if (data.success==="success") {
                        this.$message({
                            type: 'success',
                            message: 'Tutorial finished.'
                        });
                    }
                })
            },

            withdraw(row) {
                console.log(row);
                let tutorial = row;
                api.withdraw(tutorial).then(({data}) => {
                    if (data.success==="success") {
                        this.$message({
                            type: 'success',
                            message: 'Enrollment withdraw successfully.'
                        });
                    }
                })
            },

            delTutorial(row) {
                console.log(row);
                let tutorial = row;
                api.delTutorial(tutorial).then(({data}) => {
                    if (data.success==="success") {
                        this.$message({
                            type: 'success',
                            message: 'Tutorial delete successfully.'
                        });
                    }
                })
            },
        },
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
