<template>
  <div id="app">
    <application-navbar />
    <router-view :key="$route.fullPath"></router-view>
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
$primary: #963D5A;
$link: whitesmoke;
$link-hover: #959595;

@import "~bulma/sass/utilities/all";

// Overriding of Bulma variables.
$body-family: 'Poppins', sans-serif;
$family-sans-serif: 'Arial', sans-serif;
$title-color: whitesmoke;
$link: whitesmoke;

$section-padding: 2rem 1rem;
$fullhd: 1490px + (2 * $gap);

$tag-radius: 100px;

$navbar-item-hover-background-color: #4c4b4b;
$navbar-item-color: whitesmoke;
$navbar-dropdown-background-color: rgb(90, 90, 90);
$navbar-divider-background-color: #808080;

$button-border-radius: 7px;
$pagination-disabled-color: whitesmoke;
$pagination-disabled-background-color: #4d4d4d;

$dropdown-content-background-color: rgb(90, 90, 90);
$dropdown-item-color: whitesmoke;
$dropdown-item-hover-color: inherit;
$dropdown-item-hover-background-color: #4c4b4b;
$dropdown-content-radius: 6px;
$dropdown-content-shadow: 0 8px 8px rgba(10, 10, 10, 0.1);
$dropdown-divider-background-color: #808080;

@import "~bulma";
@import "~buefy/src/scss/buefy";

.dropdown-divider {
  height: 2px;
}

.divider {
  background-color: #808080;
  border: none;
  display: block;
  height: 2px;
  width: 100%;
}

.title-underline {
  display: inline-block;
  border-bottom: 4px solid #963D5A;
}

.button {
  border-radius: $button-border-radius;
}

.tag[class] {
  padding-left: 1em;
  padding-right: 1em;
}

.link {
  transition: color 150ms ease-in-out;
  color: whitesmoke;

  &:hover {
    color: #cacaca;
  }
}

.pagination-next,
.pagination-previous,
.pagination-link {
  border: 0;
  color: whitesmoke;
  background-color: #5a5a5a;
}

.pagination {
  .pagination-next,
  .pagination-previous {
    padding-left: $button-padding-horizontal;
    padding-right: $button-padding-horizontal;
    border-radius: $button-border-radius;
    
    &:hover {
      color: whitesmoke;
      background-color: darken(#5a5a5a, 5%);  
    }
  }
}

html, body {
  margin: 0;
  padding: 0;
  background-color: #363636 !important;
}
</style>
