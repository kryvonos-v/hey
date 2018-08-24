<template>
  <b-dropdown
    ref="dropdown"
    class="navbar-item"
    position="is-bottom-left"
    :active="active"
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
  }
})
</script>

<style lang="scss">
@import '~bulma/sass/utilities/all';

.navbar-user-avatar {
  @include unselectable;
  display: block;
  border-radius: 100px;
  width: 35px;
  height: 35px;
  font-weight: bold;
  line-height: 37px;
  text-align: center;
  color: #d2d2d2;
  background-color: rgb(90, 90, 90);

  &:hover {
    color: inherit;
  }
}
</style>


