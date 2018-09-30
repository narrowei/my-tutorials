<template>
    <div class="wrapper">
        <el-row class="inline">
            <el-col :span="24">
                <el-tabs v-model="activeName" >
                    <el-tab-pane label="Enrolled Tutorials" name="first">
                        <div v-if="enrolled.success !=='null'" >
                            <el-table
                                    :data="enrolled"
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
                        <div v-else>
                            <h1>You haven't enrolled any tutorials.</h1>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="Finished Tutorials" name="second">
                        <div v-if="finished.success !== 'null'">
                            <el-table
                                    :data="finished"
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
                                        <el-button v-if="scope.row.isFeedback === 0" @click="openFeedbackForm(scope.row.ID)" type="info" size="small">feedback</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else>
                            <h1>You haven't finished any tutorials.</h1>
                        </div>
                    </el-tab-pane>
                    <el-tab-pane label="My Created Tutorials" name="third">
                        <div v-if="created.success !== 'null'">
                            <el-table
                                    :data="created"
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
                                        <el-button @click="viewTutorial(scope.row)" type="info"
                                                   size="small">View
                                        </el-button>
                                        <el-button @click="delTutorial(scope.row)" type="danger" size="small">Delete</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                        <div v-else>
                            <h1>You haven't created any tutorials.</h1>
                        </div>
                    </el-tab-pane>

                </el-tabs>
            </el-col>
        </el-row>
        <el-dialog title="feedback" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="rating" :label-width="formLabelWidth">
                    <rate :length="5" v-model="form.rate"></rate>
                </el-form-item>
                <el-form-item label="description" :label-width="formLabelWidth">
                    <el-input v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendFeedback()">确 定</el-button>
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
                enrolled: [],
                finished: [],
                created: [],
                viewTutorial: null,
                isHidden: true,
                form:{
                    id:'',
                    rate:'',
                    description:''
                },
                formLabelWidth: '120px',
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
                    console.log(data);
                    this.enrolled = data;
                    console.log(this.enrolled);
                }),
                    api.getFinishedTutorial().then(({data}) => {
                        console.log(data);
                        this.finished = data
                    }),
                    api.getCreatedTutorial().then(({data}) => {
                        console.log(data);
                        this.created = data
                    })
            },


        viewTutorial(row) {
            console.log(row);
            let tutorial = row;
            api.viewTutorial(tutorial).then(({data}) => {
                this.viewTutorial = data
            })
        },

        finishTutorial(row) {
            console.log(row);
            let tutorial = {'id': row.ID};
            api.finishTutorial(tutorial).then(({data}) => {
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
                        message: 'error'
                    });
                }
            })
        },

        delTutorial(row) {
            console.log(row);
            let tutorial = row;
            api.delTutorial(tutorial).then(({data}) => {
                if (data.success === "success") {
                    this.$message({
                        type: 'success',
                        message: 'Tutorial delete successfully.'
                    });
                }
            })
        },
            openFeedbackForm(id){
                this.form.id = id;
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
    }
    .inline {
        width: 60%;
        display: inline-block;
    }
</style>
