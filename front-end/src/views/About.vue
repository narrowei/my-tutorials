<template>
  <div class="about">
      <h1> About the Site </h1>
        <p>My-Tutorials is a platform where students could seek for tutorials as well as tutors could register tutorials. The website is lightweight, interactive, RESTful,could support reasonable size Database. The front-end and back-end are powered by Vue.JS and Node.JS respectively.
        </p>
      <hr>
      <h1> Features </h1>
        <ul>
            <li>Users sign-up and log-in/log-out</li>
            <li>Users browse through tutorials</li>
            <li>Users browse through tutor profiles</li>
            <li>Users register new tutorials</li>
            <li>Users enroll in selected tutorials</li>
            <li>Users view tutorial enrollment history</li>
            <li>Users view tutorial creation history</li>
            <li>Users provide feedback upon finish tutorials</li>
            <li>Users view their feedback and received feedback</li>
        </ul>
      <hr>
      <h1> Technologies  </h1>
        <p>My-Tutorials uses a number of open source projects to work properly:</p>
        <ul>
            <li><a href="https://vuejs.org/index.html">Vue.js</a> - The Progressive JavaScript Framework</li>
            <li><a href="https://nodejs.org/en/">Node.js</a> - Asynchronous event driven JavaScript runtime for the back-end</li>
            <li><a href="http://expressjs.com/">Express</a> - Fast Node.js web application framework</li>
            <li><a href="https://webpack.js.org/">Webpack</a> - A static module bundler for modern JavaScript applications</li>
            <li><a href="https://babeljs.io/">Babel</a> - A JavaScript compiler</li>
            <li><a href="https://element.eleme.io/#/">Element UI</a> - Vue 2.0 based component library</li>
            <li><a href="https://gulpjs.com/">Gulp</a> - Automation toolkit for front-end development</li>
        </ul>
  </div>
</template>

<script>

    export default {
        name: 'about'
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
    p, ul li {
        font-family: Verdana;
        font-size: medium;
        text-align: left;
        padding: 10px 20px;
    }
</style>

