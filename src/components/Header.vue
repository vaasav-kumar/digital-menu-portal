<template>
  <div class="header">
    <popup v-if="showQR" @closePopup="showQR = false"
        :title="'Show QR'">
      <qr-code :value="showQR" :size="200" level="M"
          class="qr-code" />
    </popup>

    <ul>
      <img src="@/assets/images/logo2.png" />
      <p>{{restaurant}}</p>
    </ul>

    <ul>
      <li v-for="(menu, index) in menuOptions" :key="index"
          @click="menu.action">
        {{menu.title}}
      </li>
    </ul>
  </div>
</template>

<script>
import Popup from '@/components/Popup'
import QrCode from 'qrcode.vue'

export default {
  name: 'Header',
  components: { Popup, QrCode },
  data () {
    return {
      options: [],
      showQR: false,
      uid: null,
      restaurant: null
    }
  },
  watch: {
    '$route': {
      handler: 'populateData',
      immediate: true
    }
  },
  computed: {
    menuOptions () {
      return this.options.filter(e => e.show)
    }
  },
  mounted () {
    this.uid = localStorage.getItem('user_id')
    this.$db.collection('restaurant').doc(this.uid).get().then(response => {
      this.restaurant = response.data().info.name
    })
    this.$analytics.setUserProperties({id: this.uid})
  },
  methods: {
    populateData () {
      const routeName = this.$route.name
      this.options = [
        {
          title: 'Manage Items',
          show: routeName !== 'Manage',
          action: () => {
            this.$router.push({name: 'Manage'})
          }
        },
        {
          title: 'Home',
          show: routeName !== 'Home',
          action: () => {
            this.$router.push({name: 'Home'})
          }
        },
        {
          title: 'Share QR',
          show: true,
          action: () => {
            this.showQR = `https://restaurant-items.web.app?q=${this.uid}`
          }
        },
        {
          title: 'Logout',
          show: true,
          action: this.logout
        }
      ]
    },
    logout () {
      this.$auth.signOut().then(response => {
        this.$analytics.setUserProperties({id: 'anonymous'})
        localStorage.removeItem('user_id')
        this.$router.push({name: 'Login'})
      })
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../assets/scss/themes.scss';

  .header {
    width: 100%;
    height: 60px;
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0px 15px 10px -15px #dddbde;

    ul {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      list-style-type: none;
      margin: 0;
      padding: 0;

      p {
        font-weight: 700;
        color: $primary;
        background: -webkit-linear-gradient(45deg, $primary, $secondary);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-transform: uppercase;
        word-break: break-all;
      }

      li {
        cursor: pointer;
        padding: 0 15px;
        font-size: 15px;
        font-weight: 700;

        &:nth-child(n+2) {
          border-left: 2px solid $grey-light;
        }
      }
    }
  }

  .qr-code {
    text-align: center;
  }

  .desktop {
    .header {
      padding: 20px 18%;

      ul {
        p {
          margin: 0 15px;
          font-size: 16px;
          letter-spacing: 2px;
        }
      }

      img {
        height: 62px;
      }
    }
  }

  .mobile, .tablet {
    .header {
      padding: 20px;

      img {
        height: 55px;
      }

      ul {
        p {
          margin: 0 5px;
        }

        li {
          font-size: 14px;
          padding: 0 8px;
        }
      }
    }
  }
</style>
