<template>
  <div class="wrapper">
    <el-container class="info">
      <el-aside width="40%" style="margin-right: 5%;">
        <el-container>
          <el-header class="title"><span>Profile of {{tutor.name}}</span></el-header>
          <el-main>
            <table class="infoTable">
              <tr>
                <td>Gender:</td>
                <td>{{tutor.gender}}</td>
              </tr>
              <tr>
                <td>Mobile:</td>
                <td>{{tutor.mobile}}</td>
              </tr>
              <tr>
                <td>Email:</td>
                <td>{{tutor.email}}</td>
              </tr>
            </table>
          </el-main>
        </el-container>
      </el-aside>
      <el-container>

      </el-container>
    </el-container>
    <hr>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span style="float: left; padding-left:10px; font-size: x-large; font-weight: bold;">The tutor created tutorials</span>
        </template>
        <div v-if="created.success !== 'null'">
          <el-table
                  :data="created"
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
                    width="380">
            </el-table-column>
          </el-table>
        </div>
        <div v-else>
          <h1>The tutor haven't created any tutorial.</h1>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="2">
        <template slot="title">
          <span style="float: left; padding-left:10px; font-size: x-large; font-weight: bold;">Review</span>
        </template>
        <div v-if="reviews.success !== 'null'">
          <review
                  v-for="review in reviews"
                  v-bind:id="review.ID"
                  v-bind:reviewer="review.reviewer"
                  v-bind:description="review.description"
                  v-bind:rating="review.rating"
          ></review>
        </div>
        <div v-else>
          <h1>No reviews</h1>
        </div>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
    import api from '../axios'
    import Review from '@/components/review.vue'
    import Vue from 'vue'

    export default{
        name: 'tutorInfo',
        data(){
            return {
                tutor: [],
                created: [],
                reviews: [],
                activeNames: ['1','2','3'],
            }
        },
        components: {
            Review
        },
        mounted(){
          this.fetchData();
        },

        methods:{
            handleChange(val) {
                console.log(val);
            },
            fetchData(){
                let tutorID = this.$route.query.id;

                setTimeout(() => {
                    api.viewTutor(tutorID).then(({data}) => {
                        this.tutor = data;
                    }),
                    api.getReviewById(tutorID).then(({data}) => {
                        this.reviews = data;
                    }),
                    api.getCreatedTutorialForTutor(tutorID).then(({data}) => {
                        this.created = data;
                    })
                }, 100)
            },
      }
  }
</script>
<style scoped>
  .wrapper{
    padding: 5% 10%;
  }
  .info{
    margin: auto;
  }
  .image{
    display: inline-block;
    width: 100%;
    height: auto;
    alignment: center;
  }
  .title{
    font-size: 30px;
    text-align: left;
    font-weight: bold;
    height: 40px;
  }
  .infoTable td{
    text-align: left;
    height: 30px;
    width: 200px;
    font-size: large;
  }
  .description {
    text-align: left;
    padding-left: 5%;
  }
</style>
