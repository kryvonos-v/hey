<template>
  <div
    :class="{
      'movie-rating': true,
      'movie-rating--no-info': !ratingExist
    }"
  >
    <font-awesome-icon
      :icon="starIcon"
      size="2x"
      class="movie-rating__icon"
    />
    <div class="movie-rating__info-box">
      <span class="movie-rating__rating-box">
        <span
          class="title movie-rating__rating"
          :class="ratingExist
            ? 'is-4'
            : 'is-6' 
          "
        >{{ rating || 'No rating' }}</span>
        <span v-if="ratingExist">/10</span>
      </span>
      <span class="movie-rating__total-votes" v-if="ratingExist">
        {{ votesCount | number({ decimals: 3, divider: ' ' }) }}
      </span>
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
  },
  computed: {
    ratingExist (): boolean {
      return !!this.rating
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

    @at-root .movie-rating--no-info & {
      color: #b1b0b0;
    }
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
