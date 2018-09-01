<template>
  <div class="movie-info-line">
    <div class="movie-info-line__category">{{ category }}</div>
    <div class="movie-info-line__info tags">
      <template v-if="info && tags.length">
        <span
          v-for="tag in tags"
          :key="tag"
          :class="tagCssClass"
        >{{ tag }}</span>
      </template>
      <slot v-else-if="$slots.default" />
      <span v-else :class="tagCssClass">{{ noInfoText }}</span>
    </div>
  </div>
</template>

<script>
import Vue from 'vue'
import { Location } from 'vue-router'
import { tagCssClass } from './movie-info-line-shared'
import * as Text from '@/shared/enums/text'

export default Vue.extend({
  props: {
    category: {
      type: String,
      required: true
    },
    info: {
      type: [String, Array],
      required: false
    }
  },
  data () {
    return {
      tagCssClass,
      noInfoText: Text.NO_INFO
    }
  },
  computed: {
    tags () {
      return !Array.isArray(this.info)
        ? [this.info]
        : this.info
    }
  }
})
</script>

<style lang="scss">
.movie-info-line {
  display: flex;
  align-items: center;
  padding: .4rem 0;
  font-weight: 500;
  color: whitesmoke;
  border-bottom: 1px solid rgba(90, 90, 90, 0.18);

  &__category {
    width: 180px;
    font-size: 14px;
    font-weight: 500;
  }
}
</style>
