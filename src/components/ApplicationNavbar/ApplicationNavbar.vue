<template>
  <nav class="navbar is-dark is-transparent app-navbar container">
    <div class="navbar-brand app-navbar__brand">
      <menu-burger
        class="app-navbar__burger is-hidden-desktop"
        :opened="showMobileMenu"
        @click="toggleMobileMenu"
      />

      <a class="navbar-item" href="/">
        <application-logo />
      </a>

      <search-toggler
        v-model="searchActive"
        class="navbar-item is-hidden-desktop app-navbar__search-box"
      />
    </div>

    <div
      :class="{
        'app-navbar__menu': true,
        'navbar-menu': true,
        'is-hidden-touch': !showMobileMenu
      }"
    >
      <div class="navbar-start">
        <a
          v-for="navbarItem in [
            { href: '#', text: 'Home' },
            { href: '#', text: 'Shows' },
            { href: '#', text: 'Movies' }
          ]"
          :key="navbarItem.text"
          :href="navbarItem.href"
          class="navbar-item"
        >
          {{ navbarItem.text }}
        </a>
      </div>

      <div class="navbar-end">
        <b-dropdown
          ref="searchDropdown"
          class="navbar-item app-navbar__search-dropdown"
          position="is-bottom-left"
          v-click-outside="closeSearch"
          @click.native.capture="closeUserDropdown"
        >
          <search-toggler
            slot="trigger"
            v-model="searchActive"
            class="is-hidden-touch app-navbar__search app-navbar__search--desktop"
            @click.native="focusSearchInput"
          />

          <b-dropdown-item custom @click.native="keepSearchDropdownOpen">
            <base-input ref="searchInput" class="app-navbar__search-input" />
          </b-dropdown-item>
          <span class="dropdown-divider" />
          <b-dropdown-item>The Avengers</b-dropdown-item>
          <b-dropdown-item>Avengers: Age of Ultron</b-dropdown-item>
          <b-dropdown-item>Avengers: Infinity War</b-dropdown-item>
        </b-dropdown>

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

        <b-dropdown
          v-else
          ref="userDropdown"
          class="navbar-item app-navbar__user-dropdown"
          position="is-bottom-left"
        >
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
import BaseInput from '@/base-components/forms/BaseInput.vue'
import CrossIcon from '@/base-components/icons/CrossIcon.vue'
import SearchIcon from '@/base-components/icons/SearchIcon.vue'
import MenuBurger from './components/MenuBurger.vue'
import SearchToggler from './components/SearchToggler.vue'

export default Vue.extend({
  components: {
    SearchIcon,
    BaseInput,
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
    },
    keepSearchDropdownOpen (event: MouseEvent): void {
      let dropdown = <any>this.$refs.searchDropdown
      dropdown.isActive = true
    },
    focusSearchInput (event: MouseEvent): void {
      let searchInput = <any>this.$refs.searchInput

      setTimeout(() => {
        searchInput.$el.focus()
      }, 1)
    },
    closeSearch (): void {
      let userDropdown = <any>this.$refs.searchDropdown
      userDropdown.isActive = false
      this.searchActive = false
    },
    closeUserDropdown (): void {
      let userDropdown = <any>this.$refs.userDropdown
      userDropdown.isActive = false
    }
  }
})
</script>


<style lang="scss">
@import "~bulma/sass/utilities/all";

.app-navbar {
  .dropdown-content {
    position: relative;

    &:before {
      content: '';
      display: block;
      position: absolute;
      bottom: 100%;
      right: 8px;
      border: 8px solid transparent;
      border-bottom-color: rgb(90, 90, 90);
    }
  }

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

  &__search {
    color: whitesmoke;

    &:hover {
      color: inherit;
    }

    &--desktop {
      display: flex;
      align-items: center;
    }
  }

  &__search-input {
    width: 300px;
  }

  &__search-dropdown {
    .dropdown-content {
      &:before {
        right: 14px;
      }
    }
  }

  &__user-dropdown {
    .dropdown-content {
      &:before {
        right: 22px;
      }
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
