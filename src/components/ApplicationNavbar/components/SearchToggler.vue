<template>
  <a>
    <transition mode="out-in" name="fade">
      <search-icon
        v-if="!active"
        width="20"
        @click="$emit('toggled', true)"
      />
      <cross-icon
        v-else
        width="20"
        @click="$emit('toggled', false)"
      />
    </transition>
  </a>
</template>

<script lang="ts">
import Vue from 'vue'
import SearchIcon from '@/base-components/icons/SearchIcon.vue'
import CrossIcon from '@/base-components/icons/CrossIcon.vue'

export default Vue.extend({
  components: {
    SearchIcon,
    CrossIcon
  },
  model: {
    prop: 'active',
    event: 'toggled'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  }
})
</script>


<style lang="scss">
</style>
