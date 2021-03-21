<template>
  <div>
    <header-view />
    <div class="section">
      <router-view />
    </div>
  </div>
</template>

<script>
import HeaderView from '../components/Header'

export default {
  name: 'AppLayout',
  components: { HeaderView }
}
</script>

<style scoped lang="scss">
  .section {
    height: calc(100vh - 60px);
    overflow: auto;
    padding: 20px;
  }
</style>
