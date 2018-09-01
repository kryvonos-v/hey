<template>
  <div class="actor-card">
    <div class="actor-card__img-box">
      <img v-if="actor.profilePath" class="actor-card__img" :alt="actor.name" :src="profileImg" />
      <span v-else class="actor-card__img-fallback">{{ actor.name }}</span>
    </div>
    <h3 class="actor-card__name title is-6">{{ actor.name }}</h3>
    <p class="actor-card__character subtitle" v-if="actor.character">{{ actor.character }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    actor: {
      type: Object,
      required: true
    }
  },
  computed: {
    profileImg (): string {
      return 'https://image.tmdb.org/t/p/w138_and_h175_face/' + this.actor.profilePath
    }
  }
})
</script>

<style lang="scss">
.actor-card {
  width: 130px;

  &__img-box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 165px;
    border-radius: 5px;
    overflow: hidden;
    text-align: center;
    color: #939393;
    background-color: #4d4d4d;
  }

  &__img {
    max-width: 100%;
  }

  &__img-fallback {
    display: block;
    padding: 1rem;
  }

  &__name[class] {
    margin-top: 0.4rem;
    font-weight: 700;
    font-size: 14px;
    line-height: 1.2;
  }

  &__character {
    font-weight: 500;
    font-size: 12px;
    color: #8f8f8f;
  }
}
</style>
