<template>
  <div class="table-loader">
    <div v-for="index in rows" :key="index">
      <p v-for="colIndex in cols" :key="colIndex"></p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Loader',
  data () {
    return {
      cols: 2,
      rows: 10
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/themes.scss';

  .table-loader {
    > div {
      background: $white;
      padding: 10px;
      justify-content: space-between;
      display: grid;
      grid-template-columns: repeat(2, 200px);
      grid-gap: 10px;

      p {
        background: linear-gradient(to right, $grey-light 20%, $grey-outline 40%, $grey-light 80%);
        background-size: 500px 100px;
        animation: moving-gradient 1s infinite linear;
        height: 15px;
      }
    }
  }


  @keyframes moving-gradient {
    0% {
      background-position: -250px 0;
    }
    100% {
      background-position: 250px 0;
    }
  }
</style>
