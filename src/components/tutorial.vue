<template>
    <el-card class="box-card" style="margin-bottom: 20px">
        <div slot="header" class="clearfix">
            <span>toturial name</span>
            <el-button style="float: right; padding: 3px 0" type="text"><router-link to="/enroll">enroll</router-link></el-button>
        </div>
        <div>
            <p class="card-text">Some quick example text to build on the tutorial title and make up the bulk of the card's content.</p>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "tutorial"
    }
</script>

<style scoped>

</style>