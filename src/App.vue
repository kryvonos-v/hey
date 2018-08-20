<template>
  <div id="app">
    <application-navbar></application-navbar>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ApplicationNavbar from '@/components/ApplicationNavbar/ApplicationNavbar.vue'

export default Vue.extend({
  components: {
    ApplicationNavbar
  }
})
</script>


<style lang="scss">
html, body {
  margin: 0;
  padding: 0;
  background-color: #363636 !important;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #fff;
}
#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
