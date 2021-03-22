<template>
  <div class="menu-items">
    <div class="head">
      <h6>Menu Items</h6>
      <div class="actions" v-if="menus.length">
        <button class="primary-btn" @click="save" v-if="edit">
          <i class="fa fa-save" />
          Save
        </button>
        <button class="secondary-btn" @click="toggle" v-else>
          <i class="fa fa-pencil" />
          Edit
        </button>
      </div>
    </div>

    <list-items :menus="menus" :edit="edit" />
    <loader v-if="loader && menus.length === 0" />
    <div class="empty" v-else-if="menus.length === 0">
      <p>No menu items found</p>
    </div>
  </div>
</template>

<script>
import Loader from '@/components/Loader'
import ListItems from '@/components/MenuItems/List'

export default {
  name: 'Home',
  components: { ListItems, Loader },
  data () {
    return {
      uid: null,
      menus: [],
      edit: false,
      loader: false
    }
  },
  created () {
    this.uid = localStorage.getItem('user_id')
    this.populateData()
  },
  methods: {
    populateData () {
      this.loader = true
      this.$db.collection('restaurant').doc(this.uid).get()
        .then(response => {
          const data = response.data()
          if (data) {
            this.menus = response.data().items || []
          }
          this.loader = false
        })
    },
    toggle () {
      this.edit = !this.edit
    },
    save () {
      this.loader = true
      this.$db.collection('restaurant').doc(this.uid).set({
        items: this.menus
      }, {merge: true}).then(response => {
        this.edit = !this.edit
        this.loader = false
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/menuPage.scss';
</style>
