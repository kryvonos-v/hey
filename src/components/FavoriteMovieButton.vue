<template>
  <heart-icon
    class="favorite-movie-btn"
    :active="active"
    :title="active
      ? 'Add to favorites'
      : 'Remove from favorites'
    "
    @click="toggleActive"
  />
</template>

<script lang="ts">
import Vue from 'vue'
import HeartIcon from '@/base-components/icons/HeartIcon.vue'

export default Vue.extend({
  components: {
    HeartIcon
  },
  props: {
    movieId: {
      type: Number,
      required: true
    }
  },
  computed: {
    active (): boolean {
      return this.$store.getters['movies/isMovieFavorite'](this.movieId)
    }
  },
  methods: {
    toggleActive () {
      this.$store.dispatch('selectFavoriteMovie', { movieId: this.movieId, favorite: !this.active })
    }
  }
})
</script>

<style lang="scss">
.favorite-movie-btn {
  cursor: pointer;
}
</style>
