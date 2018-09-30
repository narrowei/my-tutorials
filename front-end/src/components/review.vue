<template>
    <el-card class="box-card">
        <div slot="header" class="title">
            <span>{{reviewer}}    </span>
            <star-rating :inline="true" :star-size="20" :read-only="true" :show-rating="false" :rating=rating></star-rating>
        </div>
        <div class="text">
            <span>{{description}}</span>
        </div>
    </el-card>
</template>

<script>
    import starRating from 'vue-star-rating'
    export default {
        name: "review",
        data(){
            return {

            }
        },
        props:['id','reviewer','description','rating'],
        components: {
            starRating
        }
    }
</script>

<style scoped>
    .title, .text{
        text-align: left;
    }
</style>
