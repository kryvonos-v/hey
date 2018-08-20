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
    font-weight: 900;
    font-size: 20px;
    line-height: $letter-size; 
    text-align: center;
    color: #fff;
    background-color: #963D5A;

    & + & {
      margin-left: -6px;
    }
  }
}
</style>
