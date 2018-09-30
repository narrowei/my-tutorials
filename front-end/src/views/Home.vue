<template>
  <div class="home">
      <el-input
          placeholder="search"
          prefix-icon="el-icon-search"
          v-model="search">
      </el-input>

      <ul :style="gridStyle" class="card-list">
          <li v-for="tutorial in filteredTutorial" :key="tutorial.ID" class="card-item">
              <tutorial
                  v-bind:id="tutorial.ID"
                  v-bind:name="tutorial.name"
                  v-bind:tutor="tutorial.tutorName"
                  v-bind:description="tutorial.description"
                  v-bind:time="tutorial.time"
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
            tutorials:[],
            numberOfColumn: 3,
            search: '',
        }
    },
    components: {
        Tutorial
    },
    mounted () {
        this.get_Tutorial();
        console.log(this.$route.query.search);
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
        filteredTutorial() {
            return this.tutorials.filter(tutorial => {
                return tutorial.name.toLowerCase().includes(this.search.toLowerCase())
            })
        }
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
