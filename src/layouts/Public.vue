<template>
  <div class="public-layout">
    <div class="img">
    </div>

    <div class="inputs">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  name: 'PublicLayout'
}
</script>

<style scoped lang="scss">
  .public-layout {
    height: 100vh;
    display: flex;
    background-image: linear-gradient(90deg, #360654 40%, #d84040 70%);

    .img {
      background-image: url('../assets/images/logo2.png');
    }

    .inputs {
      padding: 5%;
      align-self: center;
    }
  }

  .desktop {
    .public-layout {
      .img {
        flex: 1.5;
        background-size: cover;
      }
      .inputs {
        flex: 1;
      }
    }
  }

  .tablet, .mobile {
    .public-layout {
      flex-direction: column;
      align-items: center;
      justify-content: center;

      .img {
        height: 100px;
        width: 100px;
        background-size: contain;
        background-repeat: no-repeat;
      }
    }
  }
</style>
