<template>
    <div>
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
                    <el-button @click="handleClick(scope.row)" type="success" size="small">view</el-button>
                    <el-button type="danger" size="small">withdraw</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    export default {
        name: "tableview",
        data(){
            return{
            }
        },
        props:['time', 'name','description'],
    }
</script>

<style scoped>

</style>
