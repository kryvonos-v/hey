<template>
  <div class="dropdown" :class="rootClasses">
    <div
      v-if="!inline"
      role="button"
      class="dropdown-trigger"
      v-click-outside="() => isActive = false"
      @click="toggle"
    >
      <slot name="trigger" />
    </div>

    <transition name="fade">
      <div
        v-if="isMobileModal"
        v-show="isActive"
        class="background"
      />
    </transition>

    <transition name="fade">
      <div
        v-show="(!disabled && (isActive || hoverable)) || inline"
        ref="dropdownMenu"
        class="dropdown-menu"
      >
        <div class="dropdown-content">
          <slot/>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  name: 'BDropdown',
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    hoverable: Boolean,
    inline: Boolean,
    position: {
      type: String,
      validator (value: string) {
        return [
          'is-top-right',
          'is-top-left',
          'is-bottom-left'
        ].indexOf(value) > -1
      }
    },
    mobileModal: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
      selected: this.value,
      isActive: false,
      _isDropdown: true // Used internally by DropdownItem
    }
  },
  computed: {
    rootClasses (): any[] {
      return [
        this.position,
        {
          'is-disabled': this.disabled,
          'is-hoverable': this.hoverable,
          'is-inline': this.inline,
          'is-active': this.isActive || this.inline,
          'is-mobile-modal': this.isMobileModal
        }
      ]
    },
    isMobileModal (): boolean {
      return this.mobileModal && !this.inline && !this.hoverable
    }
  },
  watch: {
    /**
     * When v-model is changed set the new selected item.
     */
    value (value) {
      this.selected = value
    },

    /**
     * Emit event when isActive value is changed.
     */
    isActive (value) {
      this.$emit('active-change', value)
    }
  },
  methods: {
    /**
     * Click listener from DropdownItem.
     *   1. Set new selected item.
     *   2. Emit input event to update the user v-model.
     *   3. Close the dropdown.
     */
    selectItem (value) {
      if (this.selected !== value) {
        this.$emit('change', value)
        this.selected = value
      }

      this.$emit('input', value)
      this.isActive = false
    },

    /**
     * Toggle dropdown if it's not disabled.
     */
    toggle () {
      if (this.disabled || this.hoverable) return

      this.isActive = !this.isActive
    }
  }
})
</script>
