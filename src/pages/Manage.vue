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

    <manage-items :menus="menus" :edit="edit" />

    <loader v-if="loader && menus.length === 0" />
    <div v-else-if="menus.length === 0">
      <md-field>
        <label>Category</label>
        <md-input v-model="newCategory" />
      </md-field>
      <button @click="addItem" class="primary-btn">
        Add
      </button>
    </div>
  </div>
</template>

<script>
import ManageItems from '@/components/MenuItems/Manage'
import Loader from '@/components/Loader'

export default {
  name: 'Manage',
  components: { ManageItems, Loader },
  data () {
    return {
      uid: null,
      menus: [],
      edit: false,
      newCategory: null,
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
      this.$db.collection('restaurant').doc(this.uid).get().then(response => {
        this.menus = response.data().items || []
        this.loader = false
      })
    },
    toggle () {
      this.edit = !this.edit
    },
    save () {
      const convert = (list) => {
        return list.map(elem => {
          const newItem = elem.new
          if (newItem) {
            if (newItem.element === 'category') {
              elem = {
                category: newItem.category,
                items: []
              }
            } else {
              elem = {
                name: newItem.name,
                price: newItem.price,
                available: true
              }
            }
          }
          if (elem.items) {
            elem.items = convert(elem.items)
          }
          return elem
        })
      }
      this.menus = convert(this.menus)

      this.loader = true
      this.$db.collection('restaurant').doc(this.uid).set({
        items: this.menus
      }, {merge: true}).then(response => {
        this.toggle()
        this.loader = false
      })
    },
    addItem () {
      this.menus.push({
        category: this.newCategory,
        items: []
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  @import '../assets/scss/menuPage.scss';
</style>
