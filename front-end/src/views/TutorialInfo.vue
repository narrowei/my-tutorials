<template>
  <div class="wrapper">
    <el-container class="info">
      <el-aside width="40%" style="margin-right: 5%;">
        <img v-if="tutorial.attachment !== ''" :src=tutorial.attachment class="image" alt="Cover image can not be found">
        <img v-else src="http://www.kanchipuram.company/business-directory/k2o/uploadimages/company/08-2017/20171123111345tutorial.png" class="image">
      </el-aside>
      <el-container>
        <el-header class="title"><span>{{tutorial.name}}</span></el-header>
        <el-main>
          <table class="infoTable">
            <tr>
              <td>Tutorial Date and Time:</td>
              <td>{{tutorial.time}}</td>
            </tr>
            <tr>
              <td>Tutor Name:</td>
              <td><router-link :to="{path:'/tutorInfo', query:{id: tutorial.tutorID}}">{{tutorial.tutorName}}</router-link></td>
            </tr>
            <tr>
              <td>Total Price:</td>
              <td>{{tutorial.price}} AUD</td>
            </tr>
            <tr>
              <td>Already Enrolled/<br/>Max Student Number:</td>
              <td>{{tutorial.enrolledNumber}}/{{tutorial.maxNumberStudent}}</td>
            </tr>
          </table>
          <el-button style="float:left; margin-top:20px; padding: 10px 25px; font-size: 20px" type="primary" @click="submitForm(tutorial.ID)">Enroll</el-button>
        </el-main>
      </el-container>
    </el-container>
    <hr>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="1">
        <template slot="title">
          <span style="float: left; padding-left:10px; font-size: x-large; font-weight: bold;">Description</span>
        </template>
        <div v-if="tutorial.description !== ''" class="description">
          <span v-html="tutorial.description"></span>
        </div>
        <div v-else>
          <h1>No description</h1>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="2">
        <template slot="title">
          <span style="float: left; padding-left:10px; font-size: x-large; font-weight: bold;">Video</span>
        </template>
        <div v-if="videoId !== 0">
          <youtube-media :video-id="videoId"></youtube-media>
        </div>
        <div v-else>
          <h1>No videos</h1>
        </div>
      </el-collapse-item>
    </el-collapse>
    <el-collapse v-model="activeNames" @change="handleChange">
      <el-collapse-item name="3">
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
    import VueYouTubeEmbed from 'vue-youtube-embed'

    Vue.use(VueYouTubeEmbed,{ global: true ,componentId: "youtube-media"});

    export default{
        name: 'tutorialInfo',
        data(){
            return {
                tutorial: [],
                reviews: [],
                activeNames: ['1','2','3'],
                videoId:''
            }
        },
        components: {
            Review
        },
        mounted(){
            // when mounting the contents, fetch the specific tutorial data
          this.fetchData();
        },

        methods:{
            // handle collapse tabs
            handleChange(val) {
            },
            fetchData(){
                let tutorialID = this.$route.query.id;

                setTimeout(() => {
                    api.viewTutorial(tutorialID).then(({data}) => {
                        this.tutorial = data;
                        let reg = /www\.youtube\.com/;
                        if(reg.test(this.tutorial.videoLink)){
                            this.videoId = this.$youtube.getIdFromURL(this.tutorial.videoLink);
                        }else{
                            this.videoId = 0;
                        }
                    }),
                    api.getReview(tutorialID).then(({data}) => {
                        this.reviews = data;
                    })
                }, 100)
            },
            submitForm(data){
                // when submit the form, enroll the tutorial
                api.enrollTutorial({id:data}).then(({data})=>{
                    if (data.success==="success") {
                        this.$message({
                            type: 'success',
                            message: 'Enroll successfully.'
                        });
                    }else if(data.success==="max number reached"){
                        this.$message({
                            type: 'fail',
                            message: 'Max number of student reached.'
                        });
                    }else if(data.success==="already enrolled"){
                        this.$message({
                            type: 'fail',
                            message: 'Already enrolled.'
                        });
                    }else if(data.success==="user is tutor"){
                        this.$message({
                            type: 'fail',
                            message: 'You are the tutor of the tutorial.'
                        });
                    }else if(data.code === 401){
                        this.$message({
                            type: 'fail',
                            message: 'You are not log in.'
                        });
                    }else{
                        this.$message({
                            type: 'fail',
                            message: 'Error.'
                        });
                    }
                })
            }
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
