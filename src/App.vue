<template>
  <div id="app" :class="$mq">
    <app-layout v-if="userId" />
    <public-layout v-else />
  </div>
</template>

<script>
import AppLayout from './layouts/App'
import PublicLayout from './layouts/Public'

export default {
  name: 'app',
  components: { AppLayout, PublicLayout },
  data () {
    return {
      userId: null
    }
  },
  created () {
    this.userId = localStorage.getItem('user_id')
    this.$auth.onAuthStateChanged(response => {
      if (response) {
        this.populateData()
      } else {
        localStorage.removeItem('user_id')
        this.userId = null
      }
    })
  },
  methods: {
    populateData () {
      this.userId = localStorage.getItem('user_id')
    }
  }
}
</script>

<style lang="scss">
  #app {
    color: #000;
    font-weight: 400;
    font-family: 'Nunito', sans-serif;
  }
</style>
