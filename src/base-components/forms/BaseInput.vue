<template>
  <input
    v-bind="$attrs"
    class="base-input"
    type="text"
    :value="value"
    v-on="listeners"
  />
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    prop: 'value',
    event: 'input-value'
  },
  props: {
    value: {
      type: [String, Number],
      default: ''
    }
  },
  computed: {
    listeners (): object {
      return {
        ...this.$listeners,
        'input': (event: any) => {
          this.$emit('input', event)
          this.$emit('input-value', event.target.value)
        }
      }
    }
  }
})
</script>

<style lang="scss">
@import '~bulma/sass/utilities/all';

.base-input {
  border: 0;
  border-radius: 8px;
  padding: 0.5em 0.8em;
  font-family: 'Poppins', sans-serif;
  line-height: 1.25;
  color: whitesmoke;
  background-color: #808080;
  outline: none;

  @include placeholder {
    color: #b7b7b7;
  }
}
</style>

