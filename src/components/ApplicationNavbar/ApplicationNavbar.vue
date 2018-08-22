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

      <application-search
        class="is-hidden-desktop app-navbar__mobile-search"
        v-model="searchActive"
        v-fit-dropdown-menu-to-document-width
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
        >{{ navbarItem.text }}</a>
      </div>

      <div class="navbar-end">
        <application-search v-model="searchActive" class="is-hidden-touch" />

        <template v-if="!userLoggedIn">
          <a
            v-for="navbarItem in [
              { href: '#', text: 'Login' },
              { href: '#', text: 'Sign up' }
            ]"
            :key="navbarItem.text"
            :href="navbarItem.text"
            class="navbar-item"
          >{{ navbarItem.text }}</a>
        </template>

        <user-menu
          v-else
          ref="userDropdown"
          v-model="showUserMenu"
          class="app-navbar__user-dropdown is-hidden-touch"
          @click.native.capture="searchActive = false"
        />
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import ApplicationLogo from '@/base-components/ApplicationLogo.vue'
import MenuBurger from './components/MenuBurger.vue'
import ApplicationSearch from './components/ApplicationSearch.vue'
import UserMenu from './components/UserMenu.vue'
import fitDropdownMenuToDocumentWidth from './fit-dropdown-menu-to-document-width'

export default Vue.extend({
  components: {
    ApplicationLogo,
    MenuBurger,
    ApplicationSearch,
    UserMenu
  },
  directives: {
    'fit-dropdown-menu-to-document-width': fitDropdownMenuToDocumentWidth
  },
  data () {
    return {
      searchActive: false,
      showMobileMenu: false,
      showUserMenu: false,
      userLoggedIn: true
    }
  },
  watch: {
    searchActive (newValue): void {
      if (newValue) {
        this.showMobileMenu = false
        this.showUserMenu = false
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
  .dropdown-content {
    position: relative;

    @include desktop {
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

  &__search-input {
    width: 100%;

    @include desktop {
      width: 300px;
    }
  }

  &__mobile-search {
    .dropdown-menu {
      @include touch {
        padding-top: 0;
        padding-left: 15px;
        padding-right: 15px;
      }
    }
    
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

.dropdown .background {
  display: none !important;
}
</style>
