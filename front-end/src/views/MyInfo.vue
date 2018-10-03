<template>
    <div class="wrapper">
        <el-row class="inline">
            <el-col :span="24">
                <el-tabs v-model="activeName" >
                    <el-tab-pane label="Enrolled Tutorials" name="first">
                        <div v-if="enrolled.success !=='null'" >
                            <el-table
                                    :data="enrolled"
                                    stripe
                                    style="width: 100%; text-align: left;">
                                <el-table-column
                                        prop="time"
                                        label="Date"
                                        width="280">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                        width="200">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button type="info" size="small">
                                            <router-link :to="{path:'/tutorialInfo', query:{id: scope.row.ID}}">View</router-link></el-button>
                                        <el-button @click="finishTutorial(scope.row)" type="success" size="small">Finish</el-button>
                                        <el-button @click="withdraw(scope.row)" type="danger" size="small">Withdraw</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else>
                            <h1>You haven't enrolled any tutorial.</h1>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Finished Tutorials" name="second">
                        <div v-if="finished.success !== 'null'">
                            <el-table
                                    :data="finished"
                                    stripe
                                    style="width: 100%; text-align: left;">
                                <el-table-column
                                        prop="time"
                                        label="Date"
                                        width="280">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                        width="200">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button type="info" size="small">
                                            <router-link :to="{path:'/tutorialInfo', query:{id: scope.row.ID}}">View</router-link></el-button>
                                        <el-button v-if="scope.row.isFeedback === 0" @click="openFeedbackForm(scope.row.classID)" type="primary" size="small">Feedback</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else>
                            <h1>You haven't finished any tutorial.</h1>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="My Created Tutorials" name="third">
                        <div v-if="created.success !== 'null'">
                            <el-table
                                    :data="created"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="time"
                                        label="Date"
                                        width="280">
                                </el-table-column>
                                <el-table-column
                                        prop="name"
                                        label="Name"
                                        width="200">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button type="info" size="small">
                                            <router-link :to="{path:'/tutorialInfo', query:{id: scope.row.ID}}">View</router-link></el-button>
                                        <el-button @click="delTutorial(scope.row)" type="danger" size="small">Delete</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else>
                            <h1>You haven't created any tutorial.</h1>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="My Comments" name="fourth">
                        <div v-if="myComments.success !== 'null'">
                            <el-table
                                    :data="myComments"
                                    stripe
                                    style="width: 100%; text-align: left;">
                                <el-table-column
                                        prop="tutorialName"
                                        label="Tutorial Name"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="tutorName"
                                        label="Tutor Name"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="rating"
                                        label="Rating"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="Comment"
                                        width="200">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button type="info" size="small">
                                            <router-link :to="{path:'/tutorialInfo', query:{id: scope.row.classID}}">View Tutorial</router-link>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else>
                            <h1>You haven't left any comment.</h1>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Received Comments" name="fifth">
                        <div v-if="receivedComments.success !== 'null'">
                            <el-table
                                    :data="receivedComments"
                                    stripe
                                    style="width: 100%">
                                <el-table-column
                                        prop="tutorialName"
                                        label="Tutorial Name"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="reviewer"
                                        label="Reviewer"
                                        width="150">
                                </el-table-column>
                                <el-table-column
                                        prop="rating"
                                        label="Rating"
                                        width="100">
                                </el-table-column>
                                <el-table-column
                                        prop="description"
                                        label="Comment"
                                        width="200">
                                </el-table-column>
                                <el-table-column label="Operations">
                                    <template slot-scope="scope">
                                        <el-button type="info" size="small">
                                            <router-link :to="{path:'/tutorialInfo', query:{id: scope.row.classID}}">View Tutorial</router-link>
                                        </el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else>
                            <h1>You haven't received any comment.</h1>
                        </div>
                    </el-tab-pane>
                </el-tabs>
            </el-col>
        </el-row>
        <el-dialog title="Feedback" :visible.sync="dialogFormVisible">
            <el-form :model="form" :label-position="labelPosition">
                <el-form-item label="Rating" :label-width="formLabelWidth" style="text-align: left;">
                    <rate :length="5" v-model="form.rate"></rate>
                </el-form-item>
                <el-form-item label="Description" :label-width="formLabelWidth">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="sendFeedback()">Submit</el-button>
            </div>
        </el-dialog>
    </div>

</template>

<script>
    import * as types from '../store/types';
    import api from '../axios';
    import Rate from '@/components/Rate.vue';

    export default {
        name: "MyInfo",
        data() {
            return {
                activeName: this.$store.state.activeName,
                labelPosition: 'left',
                enrolled: [],
                finished: [],
                created: [],
                myComments:[],
                receivedComments: [],
                viewTutorial: null,
                form:{
                    tutorialId:'',
                    rate:'',
                    description:''
                },
                formLabelWidth: '100px',
                dialogFormVisible: false,
            }
        },
        mounted() {
            this.getTutorial()
        },
        components: {
            Rate
        },
        methods: {
            getTutorial() {
                api.getEnrolledTutorial().then(({data}) => {
                    this.enrolled = data;
                }),
                api.getFinishedTutorial().then(({data}) => {
                    this.finished = data
                }),
                api.getCreatedTutorial().then(({data}) => {
                    this.created = data
                }),
                api.getMyReview().then(({data}) => {
                    this.myComments = data
                }),
                api.getMyReceivedReview().then(({data}) => {
                    this.receivedComments = data
                })
            },

            finishTutorial(row) {
                let tutorialID = row.ID;
                console.log(tutorialID);
                api.finishTutorial(tutorialID).then(({data}) => {
                    if (data.success === "success") {
                        this.$message({
                            type: 'success',
                            message: 'Tutorial finished.'
                        });
                    }
                    this.getTutorial();
                })
            },

            withdraw(row) {
                console.log(row);
                let tutorial = {'id' : row.ID};
                api.withdraw(tutorial).then(({data}) => {
                    if (data.success === "success") {
                        this.$message({
                            type: 'success',
                            message: 'Enrollment withdraw successfully.'
                        });
                        this.getTutorial();
                    }else{
                        this.$message({
                            type: 'fail',
                            message: 'Error'
                        });
                    }
                })
            },

            delTutorial(row) {
                console.log(row);
                let tutorialID = row.ID;
                api.delTutorial(tutorialID).then(({data}) => {
                    if (data.success === "success") {
                        this.$message({
                            type: 'success',
                            message: 'Tutorial delete successfully.'
                        });
                        this.getTutorial();
                    }else{
                        this.$message({
                            type: 'fail',
                            message: 'Error.'
                        });
                    }
                })
            },

            openFeedbackForm(id){
                this.form.tutorialId = id;
                this.dialogFormVisible = true;
            },

            sendFeedback(){
                this.dialogFormVisible = false;
                api.sendFeedback(this.form).then(({data}) => {
                    if (data.success === "success") {
                        this.$message({
                            type: 'success',
                            message: 'Thank you for your feedback'
                        });
                        this.form.description='';
                        this.form.rate=0;
                        this.getTutorial();
                    }
                })
            }
        },
    }
</script>

<style scoped>
    .wrapper {
        text-align: center;
        overflow-y: auto;
    }
    .inline {
        width: 60%;
        display: inline-block;
    }
    a {
        text-decoration: none;
        color: white;
    }
    .router-link-active {
        text-decoration: none;
    }
</style>
