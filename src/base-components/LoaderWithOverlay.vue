<template>
  <transition name="fade">
    <div
      :class="{
        'loader-overlay': true,
        ['loader-overlay--type-' + type]: true
      }"
    >
      <div class="loader loader-overlay__loader"></div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    type: {
      type: String,
      default: 'none',
      validator (value: string) {
        return ['cards', 'none'].includes(value)
      }
    }
  }
})
</script>

<style lang="scss">
[data-loader-target] {
  position: relative;
}

.loader-overlay {
  $cards-offset: 0.75rem;

  display: flex;
  justify-content: center;
  position: absolute;
  z-index: 100;
  background-color: rgba(54, 54, 54, 0.65);

  &--type-none {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }

  &--type-cards {
    top: $cards-offset;
    left: $cards-offset;
    right: $cards-offset;
    bottom: $cards-offset;
    border-radius: 10px;
  }

  &__loader {
    margin-top: 11rem;
    width: 3rem;
    height: 3rem;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 200ms ease-in-out;
}

.fade-enter, .fade-leave-to {
  opacity: 0;
}
</style>
