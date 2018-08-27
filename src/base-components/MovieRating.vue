<template>
  <div class="movie-rating">
    <font-awesome-icon
      :icon="starIcon"
      size="2x"
      class="movie-rating__icon"
    />
    <div class="movie-rating__info-box">
      <span class="movie-rating__rating-box">
        <span class="title is-4 movie-rating__rating">{{ rating }}</span><span>/10</span>
      </span>
      <span class="movie-rating__total-votes">{{ votesCount }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { faStar } from '@fortawesome/free-solid-svg-icons'

export default Vue.extend({
  data () {
    return {
      starIcon: faStar
    }
  },
  props: {
    rating: {
      type: Number,
      required: true
    },
    votesCount: {
      type: Number,
      required: true
    }
  }
})
</script>

<style lang="scss">
.movie-rating {
  display: flex;
  align-items: center;
  
  &__icon {
    margin-right: .5rem;
    color: gold;
  }

  &__info-box {
    display: flex;
    flex-direction: column;
    font-size: 0.8rem;
    color: #b1b0b0;
  }

  &__rating {
    font-weight: 500;
    color: whitesmoke;
  }
}
</style>
