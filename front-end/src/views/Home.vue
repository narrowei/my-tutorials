<template>
  <div class="home">
      <ul :style="gridStyle" class="card-list">
          <li v-for="(tutorial, index) in tutorials" class="card-item">
              <tutorial

                  v-bind:key="tutorial.ID"
                  v-bind:id="tutorial.ID"
                  v-bind:name="tutorial.name"
                  v-bind:tutor="tutorial.tutorID"
                  v-bind:description="tutorial.description"
                  v-bind:time="tutorial.time"
                  v-bind:maxNumberStudent="tutorial.maxNumberStudent"
                  v-bind:attachment="tutorial.attachment"
                  v-bind:price="tutorial.price"
              ></tutorial>
          </li>
      </ul>
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
            numberOfColumn: 3,
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
        },

    },
    computed: {
        gridStyle() {
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumn}, minmax(360px, 360px))`
            }
        },
    }
}
</script>

<style scoped>
    .card-list {
        display: grid;
        grid-gap: 1em;
    }
    ul {
        list-style-type: none;
    }
</style>
