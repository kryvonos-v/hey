<template>
  <a
    role="button"
    :class="{
      'menu-burger': true,
      'menu-burger--active': opened
    }"
    :aria-expanded="opened"
    v-on="$listeners"
  >
    <span class="menu-burger__stick"></span>
    <span class="menu-burger__stick"></span>
    <span class="menu-burger__stick"></span>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    opened: {
      type: Boolean,
      default: false
    }
  }
})
</script>


<style lang="scss">
.menu-burger {
  position: relative;
  width: 3.25rem;
  height: 3.25rem;
  cursor: pointer;

  &__stick {
    $stick-width: 22px;
    $stick-height: 2px;

    display: block;
    position: absolute;
    left: calc(50% - #{$stick-width / 2});
    right: auto;
    width: $stick-width;
    height: $stick-height;
    opacity: 1;
    background: #fff;
    transition: all .3s ease-in-out;

    &:first-child {
      top: calc(50% - 6px);
      bottom: auto;
      animation-name: move-and-rotate-top-stick-in;
      animation-duration: 300ms;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;

      @at-root .menu-burger--active & {
        animation-name: move-and-rotate-top-stick-out;
      }
    }

    &:nth-child(2) {
      top: 50%;
      margin-top: -1px;
      transition: opacity 200ms ease-in-out;

      @at-root .menu-burger--active & {
        opacity: 0;
      }
    }

    &:last-child {
      top: calc(50% + 4px);
      animation-name: move-and-rotate-bottom-stick-in;
      animation-duration: 300ms;
      animation-timing-function: ease-in-out;
      animation-fill-mode: forwards;

      @at-root .menu-burger--active & {
        animation-name: move-and-rotate-bottom-stick-out;
      }
    }
  }
}

@keyframes move-and-rotate-bottom-stick-in {
  0% {
    transform: translateY(-5px) rotate(-45deg);
  }

  40% {
    transform: translateY(-5px);
  }

  60% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes move-and-rotate-bottom-stick-out {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  40% {
    transform: translateY(-5px);
  }

  60% {
    transform: translateY(-5px);
  }

  100% {
    transform: translateY(-5px) rotate(-45deg);
  }
}

@keyframes move-and-rotate-top-stick-in {
  0% {
    transform: translateY(5px) rotate(45deg);
  }

  40% {
    transform: translateY(5px);
  }

  60% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(0) rotate(0deg);
  }
}

@keyframes move-and-rotate-top-stick-out {
  0% {
    transform: translateY(0) rotate(0deg);
  }

  40% {
    transform: translateY(5px);
  }

  60% {
    transform: translateY(5px);
  }

  100% {
    transform: translateY(5px) rotate(45deg);
  }
}
</style>
