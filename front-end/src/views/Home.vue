<template>
  <div class="home">
      <tutorial
          v-for="tutorial in tutorials"
          v-bind:key="tutorial.ID"
          v-bind:name="tutorial.name"
          v-bind:description="tutorial.description"
      ></tutorial>

  </div>
</template>

<script>

import Tutorial from '@/components/tutorial.vue'
import * as types from '../store/types'
import api from '../axios'

export default {
    name: 'home',
    data() {
        return {
           tutorials:null,
        }
    },
    components: {
        Tutorial
    },
    mounted () {
        this.get_Tutorial()
        //this.username = localStorage.getItem('username')

        // axios
        //     .get('http://localhost:3000/class')
        //     .then(response => (this.classes = response.data))
        //     .catch(error => console.log(error))
    },
    methods: {
        get_Tutorial() {
            setTimeout(() => {
                api.getAllTutorial().then(({data}) => {
                        this.tutorials = data
                })
            }, 100)
        }
    }
}
</script>
