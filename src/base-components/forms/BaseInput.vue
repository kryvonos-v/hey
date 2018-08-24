<template>
  <input
    class="base-input"
    type="text"
    v-on="$listeners"
  />  
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
})
</script>

<style lang="scss">
@import '~bulma/sass/utilities/all';

.base-input {
  border: 0;
  border-radius: 8px;
  padding: 0.5em 0.8em;
  font-family: 'Poppins', sans-serif;
  line-height: 1.25;
  color: whitesmoke;
  background-color: #808080;
  outline: none;

  @include placeholder {
    color: #b7b7b7;
  }
}
</style>

