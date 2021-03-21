<template>
  <div class="public-inputs">
    <md-field>
      <label>Restaurant</label>
      <md-input v-model="restaurant" />
    </md-field>

    <md-field>
      <label>Email</label>
      <md-input v-model="email" />
    </md-field>

    <md-field>
      <label>Password</label>
      <md-input v-model="password" :type="'password'" @keyup.enter="signup" />
    </md-field>

    <button class="primary-btn" @click="signup">
      Signup
    </button>
    <u @click="$router.push({name: 'Login'})">
      Already have account?
    </u>
  </div>
</template>

<script>
export default {
  name: 'Signup',
  data () {
    return {
      restaurant: null,
      email: null,
      password: null
    }
  },
  methods: {
    signup () {
      this.$analytics.logEvent('signup', {email: this.email})
      this.$auth.createUserWithEmailAndPassword(this.email, this.password).then(response => {
        this.$db.collection('restaurant').doc(response.user.uid).set({
          info: {
            name: this.restaurant
          }
        })
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
