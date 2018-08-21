<template>
  <nav class="navbar is-dark is-transparent app-navbar container">
    <div class="navbar-brand app-navbar__brand">
      <menu-burger
        class="app-navbar__burger is-hidden-desktop"
        :opened="showMobileMenu"
        @click="toggleMobileMenu"
      />

      <a class="navbar-item" href="https://bulma.io">
        <application-logo />
      </a>

      <search-toggler v-model="searchActive" class="navbar-item is-hidden-desktop app-navbar__search-box" />
    </div>

    <div
      :class="{
        'app-navbar__menu': true,
        'navbar-menu': true,
        'is-hidden-touch': !showMobileMenu
      }"
    >
      <div class="navbar-start">
        <a class="navbar-item" href="https://bulma.io/">Home</a>
        <a class="navbar-item" href="https://bulma.io/">Shows</a>
        <a class="navbar-item" href="https://bulma.io/">Movies</a>
      </div>
      <div class="navbar-end">
        <search-toggler v-model="searchActive" class="navbar-item is-hidden-touch" />
        <template v-if="!userLoggedIn">
          <a
            v-for="navbarItem in [
              { href: '#', text: 'Login' },
              { href: '#', text: 'Sign up' }
            ]"
            :key="navbarItem.text"
            :href="navbarItem.text"
            class="navbar-item"
          >
            {{ navbarItem.text }}
          </a>
        </template>

        <b-dropdown v-else class="navbar-item" position="is-bottom-left">
          <a class="navbar-user-avatar" slot="trigger">VK</a>

          <b-dropdown-item>Favorite movies</b-dropdown-item>
          <span class="dropdown-divider" />
          <b-dropdown-item>Settings</b-dropdown-item>
          <b-dropdown-item>Sign out</b-dropdown-item>
        </b-dropdown>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import ApplicationLogo from '@/base-components/ApplicationLogo.vue'
import CrossIcon from '@/base-components/icons/CrossIcon.vue'
import SearchIcon from '@/base-components/icons/SearchIcon.vue'
import MenuBurger from './components/MenuBurger.vue'
import SearchToggler from './components/SearchToggler.vue'

export default Vue.extend({
  components: {
    SearchIcon,
    CrossIcon,
    ApplicationLogo,
    MenuBurger,
    SearchToggler
  },
  data () {
    return {
      searchActive: false,
      showMobileMenu: false,
      userLoggedIn: true
    }
  },
  watch: {
    searchActive (newValue): void {
      if (newValue) {
        this.showMobileMenu = false
      }
    },
    showMobileMenu (newValue): void {
      if (newValue) {
        this.searchActive = false
      }
    }
  },
  methods: {
    toggleMobileMenu (): void {
      this.showMobileMenu = !this.showMobileMenu
    }
  }
})
</script>


<style lang="scss">
@import "~bulma/sass/utilities/all";

.app-navbar {
  .navbar-item {
    font-weight: bold;
  }

  &__brand {
    justify-content: space-between;
  }

  &__burger {
    margin: 0 !important;
  }

  &__search-box {
    background-color: transparent !important;
  }

  &__user-avatar {
    border-radius: 100px;
    width: 35px;
    height: 35px;
    font-weight: bold;
    line-height: 37px;
    color: #d2d2d2;
    background-color: rgb(90, 90, 90);

    &:hover {
      color: inherit;
    }
  }

  .navbar-menu {
    @include touch {
      display: block;
      margin-left: 15px;
      margin-right: 15px;
      border-radius: 6px;
      text-align: center;
      background-color: rgb(90, 90, 90) !important;
    }
  }

  .navbar-item {
    color: whitesmoke !important;
  }

  &__user-dropdown {
    // margin-top: 5px;
    // border-radius: 6px;

    // &:before {
    //   content: '';
    //   display: block;
    //   position: absolute;
    //   bottom: 100%;
    //   right: 22px;
    //   border: 8px solid transparent;
    //   border-bottom-color: rgb(90, 90, 90);
    // }
  }
}

.navbar-user-avatar {
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
