<template>
  <a role="button" class="menu-burger" aria-expanded="false">
    <span class="menu-burger__stick"></span>
    <span class="menu-burger__stick"></span>
    <span class="menu-burger__stick"></span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
    
})
</script>


<style lang="scss">
.menu-burger {
  position: relative;
  width: 22px;
  height: 12px;
  cursor: pointer;

  &__stick {
    display: block;
    position: absolute;
    right: 0px;
    width: 100%;
    height: 2px;
    opacity: 1;
    background: #fff;
    transition: all .3s ease-in-out;

    &:first-child {
      top: 0;
      bottom: auto;
      transform-origin: 6px 5px;

      @at-root .menu-burger--active & {
        transform: rotate(45deg);
        top: 0px;
      }
    }

    &:nth-child(2) {
      top: 50%;
      margin-top: -1px;

      @at-root .menu-burger--active & {
        opacity: 0;
      }
    }

    &:last-child {
      top: auto;
      bottom: 0;
      transform-origin: 5px -2px;

      @at-root .menu-burger--active & {
        transform: rotate(-45deg);
        bottom: 0px;
      }
    }
  }
}
</style>
