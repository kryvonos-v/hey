<template>
  <div id="app">
    <application-navbar />
    <!-- <application-search /> -->
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ApplicationNavbar from '@/components/ApplicationNavbar/ApplicationNavbar.vue'
import ApplicationSearch from '@/components/ApplicationSearch/ApplicationSearch.vue'

export default Vue.extend({
  components: {
    ApplicationNavbar,
    ApplicationSearch
  }
})
</script>


<style lang="scss">
@import "~bulma/sass/utilities/all";

// Overriding of Bulma variables.
$navbar-item-hover-background-color: #4c4b4b !default;
$navbar-item-color: whitesmoke !default;
$navbar-dropdown-background-color: rgb(90, 90, 90) !default;
$navbar-divider-background-color: #808080 !default;

$dropdown-content-background-color: rgb(90, 90, 90) !default;
$dropdown-item-color: whitesmoke !default;
$dropdown-item-hover-color: inherit !default;
$dropdown-item-hover-background-color: #4c4b4b !default;
$dropdown-content-radius: 6px !default;
$dropdown-content-shadow: 0 8px 8px rgba(10, 10, 10, 0.1) !default;
$dropdown-divider-background-color: #808080 !default;

@import "~bulma";
@import "~buefy/src/scss/buefy";

.dropdown-divider {
  height: 2px;
}

html, body {
  margin: 0;
  padding: 0;
  background-color: #363636 !important;
}
</style>
