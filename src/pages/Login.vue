<template>
  <div class="public-inputs">
    <md-field>
      <label>Email</label>
      <md-input v-model="email" />
    </md-field>

    <md-field>
      <label>Password</label>
      <md-input v-model="password" :type="'password'" @keyup.enter="login" />
    </md-field>

    <button class="primary-btn" @click="login">
      Login
    </button>
    <u @click="$router.push({name: 'Signup'})">
      Need to signup?
    </u>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      email: null,
      password: null
    }
  },
  methods: {
    login () {
      this.$analytics.logEvent('login', {email: this.email})
      this.$auth.signInWithEmailAndPassword(this.email, this.password).then(response => {
        localStorage.setItem('user_id', response.user.uid)
        this.$router.push({name: 'Home'})
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/publicPage.scss';
</style>
