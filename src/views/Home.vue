<template>
  <div class="home">
    <Tutorial></Tutorial>
    <Tutorial></Tutorial>
    <Tutorial></Tutorial>
    <Tutorial></Tutorial>
    <Tutorial></Tutorial>
  </div>
</template>

<script>
// @ is an alias to /src
import Tutorial from '@/components/tutorial.vue'

export default {
  name: 'home',
  components: {
    Tutorial
  }
}
</script>
