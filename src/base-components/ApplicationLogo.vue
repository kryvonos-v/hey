<template>
  <div class="app-logo">
    <span class="app-logo__letter">H</span>
    <span class="app-logo__letter">E</span>
    <span class="app-logo__letter">Y</span>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">
.app-logo {
  display: flex;
  justify-content: center;
  align-items: baseline;

  &__letter {
    $letter-size: 30px;

    border-radius: 100px;
    width: $letter-size;
    height: $letter-size;
    font-family: 'Poppins', sans-serif;
    font-weight: bold;
    font-size: 20px;
    line-height: $letter-size; 
    color: #fff;

    & + & {
      margin-left: -9px;
    }

    &:first-child {
      background-color: #4183D7;
    }

    &:nth-child(2) {
      background-color: #F64747;
    }

    &:last-child {
      background-color: #3FC380;
    }
  }
}
</style>
