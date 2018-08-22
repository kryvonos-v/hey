<template>
  <b-dropdown
    ref="dropdown"
    class="navbar-item app-search"
    position="is-bottom-left"
    :mobile-modal="false"
    v-click-outside="() => $emit('toggled', false)"
  >
    <search-toggler
      slot="trigger"
      :active="active"
      class="app-search__toggler"
      @click.native="focusSearchInput"
      @toggled="$emit('toggled', $event)"
    />

    <b-dropdown-item custom>
      <base-input ref="searchInput" class="app-navbar__search-input" />
    </b-dropdown-item>
    <span class="dropdown-divider" />
    <b-dropdown-item>The Avengers</b-dropdown-item>
    <b-dropdown-item>Avengers: Age of Ultron</b-dropdown-item>
    <b-dropdown-item>Avengers: Infinity War</b-dropdown-item>
  </b-dropdown>
</template>

<script lang="ts">
import Vue from 'vue'
import BaseInput from '@/base-components/forms/BaseInput.vue'
import SearchToggler from './SearchToggler.vue'

export default Vue.extend({
  components: {
    BaseInput,
    SearchToggler
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
  },
  watch: {
    active (newActive) {
      if (!newActive) {
        let dropdownEl = <any>this.$refs.dropdown
        
        dropdownEl.isActive = newActive
      }
    }
  },
  methods: {
    focusSearchInput (event: MouseEvent): void {
      let searchInput = <any>this.$refs.searchInput

      setTimeout(() => {
        searchInput.$el.focus()
      }, 1)
    },
  }
})
</script>

<style lang="scss">
.app-search {
  &__toggler {
    color: whitesmoke;
    display: flex;
    align-items: center;

    &:hover {
      color: inherit;
    }
  }
}
</style>


