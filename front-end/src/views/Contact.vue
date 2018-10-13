<template>
  <div class="about">
      <h1>Contact Us</h1>
      <el-card class="box-card" style="margin-bottom: 20px" shadow="always" v-for="developer in developers">
          <div slot="header" style="text-align: center;">
              <span>{{developer.name}}</span>
          </div>
          <div style="text-align: left;">
              <table class="infoTable">
                  <tr>
                      <td><i class="el-icon-info"></i> Student ID:</td>
                      <td class="tableContent">{{developer.studentID}}</td>
                  </tr>
                  <tr>
                      <td><i class="el-icon-message"></i> Email:</td>
                      <td class="tableContent">{{developer.email}}</td>
                  </tr>
              </table>
          </div>
      </el-card>
  </div>
</template>

<script>

    export default {
        name: 'contact',
        data() {
            return {
                // static data
                developers: [{
                    name: 'Yuheng Wei',
                    studentID: '12640862',
                    email: '12640862@student.uts.edu.au'
                },{
                    name: 'Xiaoping Wang',
                    studentID: '12765501',
                    email: '12765501@student.uts.edu.au'
                },{
                    name: 'Yicheng Ma',
                    studentID: '12488348',
                    email: '12488348@student.uts.edu.au'
                }
                ]
            }
        }
    }

</script>

<style scoped>
    .about {
        width: 60%;
        margin: auto auto;
    }
    h1 {
        font-size: x-large;
        font-family: Verdana;
        font-weight: bold;
    }
    .infoTable{
        margin: auto auto;
    }
    .infoTable td{
        text-align: left;
        height: 20px;
        width: 120px;
    }
    .infoTable .tableContent{
        width: 200px;
    }
</style>

