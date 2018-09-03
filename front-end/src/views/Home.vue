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
