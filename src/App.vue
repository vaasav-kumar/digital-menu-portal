<template>
  <div id="app" :class="$mq">
    <div class="toast-msg" v-if="getterToastMsg">
      <p>
        {{getterToastMsg}}
      </p>
      <i @click="resetToast">&times;</i>
    </div>

    <app-layout v-if="userId" />
    <public-layout v-else />
  </div>
</template>

<script>
import AppLayout from './layouts/App'
import PublicLayout from './layouts/Public'

import { mapGetters, mapMutations } from 'vuex'

export default {
  name: 'app',
  components: { AppLayout, PublicLayout },
  data () {
    return {
      userId: null
    }
  },
  computed: {
    ...mapGetters(['getterToastMsg'])
  },
  watch: {
    getterToastMsg () {
      setTimeout(() => {
        this.resetToast()
      }, 5000)
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
    ...mapMutations(['SET_TOAST_MSG']),
    populateData () {
      this.userId = localStorage.getItem('user_id')
    },
    resetToast () {
      this.SET_TOAST_MSG(null)
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

<style scoped lang="scss">
  .toast-msg {
    border-radius: 5px;
    background: #fff;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: absolute;
    bottom: 15px;
    left: 15px;
    max-width: 450px;

    p {
      font-size: 16px;
    }

    i {
      font-size: 20px;
      color: #6b6c6d;
      cursor: pointer;
    }
  }

  .desktop {
    .toast-msg {
      padding: 15px;
      min-width: 400px;
    }
  }

  .mobile, .tablet {
    .toast-msg {
      padding: 10px;
      right: 15px;
      min-width: 300px;
    }
  }
</style>
