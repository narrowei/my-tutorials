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
      <el-pagination
              background
              layout="prev, pager, next"
              :total= maxSize
              :page-size="size"
              @current-change="handleCurrentChange"
      >
      </el-pagination>
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
            maxSize: null,
            size: 6,
        }
    },
    components: {
        Tutorial
    },
    mounted () {
        this.get_TutorialAmount();
        this.get_Tutorial();
    },
    methods: {
        // get all tutorial for display
        get_Tutorial() {
            setTimeout(() => {
                api.getTutorialsByPageId(1).then(({data}) => {
                        this.tutorials = data
                })
            }, 100)
        },
        get_TutorialAmount(){
            // get the amount of tutorials
            api.getTutorialAmount().then(({data})=>{
                this.maxSize = data.size;
            })
        },
        handleCurrentChange(val) {
            // handle pagination
            api.getTutorialsByPageId(val).then(({data}) => {
                this.tutorials = data
            })
        },

    },
    computed: {
        gridStyle() {
            // compute for grid style
            return {
                gridTemplateColumns: `repeat(${this.numberOfColumn}, minmax(360px, 360px))`
            }
        },
        filteredTutorial() {
            // handle select by keywords
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
