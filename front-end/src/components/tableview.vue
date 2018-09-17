<template>
    <el-table
            :data="enrolled"
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
</template>

<script>
    export default {
        name: "tableview"
    }
</script>

<style scoped>

</style>
