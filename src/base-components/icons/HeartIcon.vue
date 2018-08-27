<template>
  <font-awesome-icon
    :icon="icon"
    :class="{
      'heart-icon': true,
      [`heart-icon--size-${size}`]: size,
      [`heart-icon--color-${color}`]: color
    }"
    :data-active="active"
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
    },
    size: {
      type: String,
      default: 'medium',
      validator (size: string) {
        return [
          'medium',
          'large'
        ].includes(size)
      }
    },
    color: {
      type: String,
      default: 'dark',
      validator (color: string) {
        return [
          'dark',
          'light'
        ].includes(color)
      }
    }
  }
})
</script>

<style lang="scss">
.heart-icon {
  font-size: 1.7rem;
  transition: color 250ms ease-in-out;

  &--size-medium {
    font-size: 1.7rem
  }

  &--size-large {
    font-size: 2rem;
  }

  &--color-dark {
    color: #363636;
  }
  
  &--color-light {
    color: #b1b0b0;
  }

  &[data-active] {
    color: #FE5F55;
  }
}
</style>


