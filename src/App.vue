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
@import "~bulma/sass/utilities/all";

// Overriding of Bulma variables.
$navbar-item-hover-background-color: #4c4b4b !default;
$navbar-item-color: whitesmoke !default;

@import "~bulma";
@import "~buefy/src/scss/buefy";

html, body {
  margin: 0;
  padding: 0;
  background-color: #363636 !important;
}
</style>
