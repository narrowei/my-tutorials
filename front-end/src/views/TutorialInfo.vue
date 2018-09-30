<template>
  <div>
    <h1>{{id}}</h1>
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
          <el-button v-if="scope.row.isFeedback === 0" @click="openFeedbackForm(scope.row.ID)" type="info" size="small">feedback</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    import api from '../axios'

    export default{
        name: 'tutorialInfo',
        data(){
            return {
                tutorial: []
            }
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
                      console.log(this.tutorial);
                  })
              }, 100)
          }
      }
  }
</script>
