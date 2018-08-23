<template>
  <div
    class="dropdown"
    :class="rootClasses"
    v-click-outside="() => {
      if (closeWhenClickOutside) {
        mutableActive = false
      }
    }"
  >
    <div
      v-if="!inline"
      role="button"
      class="dropdown-trigger"
      @click="toggle"
    >
      <slot name="trigger" />
    </div>

    <transition name="fade">
      <div
        v-if="isMobileModal"
        v-show="mutableActive"
        class="background"
      />
    </transition>

    <transition name="fade">
      <div
        v-show="(!disabled && (mutableActive || hoverable)) || inline"
        ref="dropdownMenu"
        class="dropdown-menu"
      >
        <div class="dropdown-content">
          <slot />
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

let counter: number = -1

export default Vue.extend({
  name: 'BDropdown',
  model: {
    prop: 'value',
    event: 'change'
  },
  props: {
    value: {
      type: [String, Number, Boolean, Object, Array, Symbol, Function],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    active: {
      type: Boolean,
      default: false
    },
    // When we use two times times the same component containing dropdown
    // then we need to pass false for closeWhenClickOutside prop, otherwise
    // we will see weird behaviour. When we toggle first component with
    // dropdown then click-outside directive fires on another component.
    // This lead to case when we cannot close dropdown.
    closeWhenClickOutside: {
      type: Boolean,
      default: true
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
      mutableActive: this.active,
      counter: ++counter,
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
          'is-active': this.mutableActive || this.inline,
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

    active (value) {
      this.mutableActive = value
    },

    /**
     * Emit event when mutableActive value is changed.
     */
    mutableActive (value) {
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
      }

      this.mutableActive = false
    },

    /**
     * Toggle dropdown if it's not disabled.
     */
    toggle () {
      if (this.disabled || this.hoverable) return

      this.mutableActive = !this.mutableActive
    }
  }
})
</script>
