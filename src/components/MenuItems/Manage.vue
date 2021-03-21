<template>
  <div class="menu-list">
    <div v-for="(menu, index) in menus" :key="index">
      <div class="category" v-if="menu.category">
        <h5>{{menu.category}}</h5>
        <div v-if="edit">
          <button @click="addItem(index)" class="btn1">
            Add
          </button>
          <button @click="removeItem(index)" class="btn2">
            Delete
          </button>
        </div>
      </div>

      <manage-items v-if="menu.category" :menus="menu.items"
            :edit="edit" />

      <div v-else-if="menu.new">
        <div>
          <md-radio v-model="menu.new.element" :value="'item'">Item</md-radio>
          <md-radio v-model="menu.new.element" value="category">Sub-category</md-radio>
        </div>

        <md-field class="field" v-if="menu.new.element === 'category'">
          <label>Category</label>
          <md-input v-model="menu.new.category" />
        </md-field>

        <div class="items" v-else>
          <md-field class="field">
            <label>Name</label>
            <md-input v-model="menu.new.name" />
          </md-field>
          <md-field class="field">
            <label>Price</label>
            <md-input v-model="menu.new.price" />
          </md-field>
        </div>
      </div>

      <div v-else-if="edit" class="items">
        <md-field v-if="edit" class="field">
          <md-input v-model="menu.name" />
        </md-field>
        <md-field v-if="edit" class="field">
          <md-input v-model="menu.price" />
        </md-field>
        <button v-if="edit" @click="removeItem(index)" class="btn2">
          Delete
        </button>
      </div>

      <div v-else class="items">
        <span>{{menu.name}}</span>
        <span>{{amountFormat(menu.price)}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { amountFormat } from '@/utils/helpers'

export default {
  name: 'ManageItems',
  props: {
    menus: Array,
    edit: Boolean
  },
  methods: {
    amountFormat,
    addItem (index) {
      this.menus[index]['items'] = [...this.menus[index].items,
        {
          new: {
            checked: true,
            element: 'item'
          }
        }
      ]
    },
    removeItem (index) {
      this.menus.splice(index, 1)
    }
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/scss/menuItems.scss';

  $btn-width: 80px;
  .btn {
    cursor: pointer;
    border-radius: 5px;
    color: $white;
    padding: 4px 8px;
    font-weight: 600;
    width: $btn-width;
  }

  .btn1 {
    @extend .btn;
    background: $primary;
  }
  .btn2 {
    @extend .btn;
    background: $secondary;
  }

  .items {
    grid-template-columns: auto 200px $btn-width !important;
  }

  .field {
    max-width: 200px;
    margin: 2px 0 !important;
  }
</style>
