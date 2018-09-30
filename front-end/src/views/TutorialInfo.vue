<template>
  <div class="wrapper">
    <el-container class="info">
      <el-aside width="40%" style="margin-right: 5%;">
        <img :src=tutorial.attachment class="image"/>
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
              <td>{{tutorial.tutorID}}</td>
            </tr>
            <tr>
              <td>Description:</td>
              <td>{{tutorial.description}}</td>
            </tr>
            <tr>
              <td>Total Price:</td>
              <td>{{tutorial.price}} AUD</td>
            </tr>
            <tr>
              <td>Already Enrolled/<br/>Max Student Number:</td>
              <td>0/{{tutorial.maxNumberStudent}}</td>
            </tr>
          </table>
          <el-button style="float:left; margin-top:20px; padding: 10px 25px; font-size: 20px" type="primary" @click="submitForm(id)">Enroll</el-button>
        </el-main>
      </el-container>
    </el-container>
    <hr>
    <review
            v-for="review in reviews"
            v-bind:id="review.ID"
            v-bind:reviewer="review.userID"
            v-bind:description="review.description"
            v-bind:rating="review.rating"
    ></review>
  </div>
</template>

<script>
    import api from '../axios'
    import Review from '@/components/review.vue'

    export default{
        name: 'tutorialInfo',
        data(){
            return {
                tutorial: [],
                reviews: []
            }
        },
        components: {
            Review,
        },
        mounted(){
          this.fetchData();
        },

        methods:{
          fetchData(){
              let tutorialID = this.$route.query.id;
              console.log(tutorialID);
              setTimeout(() => {
                  api.viewTutorial(tutorialID).then(({data}) => {
                      this.tutorial = data;
                  }),
                  api.getReview(tutorialID).then(({data}) => {
                      this.reviews = data;
                  })
              }, 100)
          },
          submitForm(data){
              console.log(data);
              api.enrollTutorial({id:data}).then(({data})=>{
                  if (data.success==="success") {
                      this.$message({
                          type: 'success',
                          message: 'enroll successfully.'
                      });
                  }else{
                      this.$message({
                          type: 'fail',
                          message: 'already enrolled'
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
</style>
