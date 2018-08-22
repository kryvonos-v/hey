<template>
  <b-dropdown
    ref="dropdown"
    class="navbar-item"
    position="is-bottom-left"
    @active-change="$emit('active-change', $event)"
  >
    <a class="navbar-user-avatar" slot="trigger">VK</a>

    <b-dropdown-item>Favorite movies</b-dropdown-item>
    <span class="dropdown-divider" />
    <b-dropdown-item>Settings</b-dropdown-item>
    <b-dropdown-item>Sign out</b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'active',
    event: 'active-change'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    }
  },
  watch: {
    active (newActive) {
      if (!newActive) {
        let dropdown = <any>this.$refs.dropdown
        dropdown.isActive = false
      }
    }
  }
})
</script>

