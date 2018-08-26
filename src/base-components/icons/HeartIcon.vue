<template>
  <font-awesome-icon
    :icon="icon"
    :class="{
      'heart-icon': true,
      'heart-icon--active': active
    }"
    v-bind="$attrs"
    v-on="$listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

export default Vue.extend({
  props: {
    active: {
      type: Boolean,
      default: false
    },
    icon: {
      type: Object,
      default: () => faHeart
    }
  }
})
</script>

<style lang="scss">
.heart-icon {
  font-size: 1.7rem;
  color: #363636;
  transition: color 250ms ease-in-out;

  &--active {
    color: #FE5F55;
  }
}
</style>


