<template>
  <div class="home">
      <tutorial
          v-for="tutorial in classes"
          v-bind:key="tutorial.ID"
          v-bind:name="tutorial.name"
          v-bind:description="tutorial.description"
      ></tutorial>

  </div>
</template>

<script>
// @ is an alias to /src
import Tutorial from '@/components/tutorial.vue'
import axios from 'axios';
export default {
    name: 'home',
    data() {
        return {
           classes:null,
        }
    },
    components: {
        Tutorial
    },
    mounted () {
        axios
            .get('http://localhost:3000/class')
            .then(response => (this.classes = response.data))
            .catch(error => console.log(error))
    }
}
</script>
