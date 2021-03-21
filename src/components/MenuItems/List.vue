<template>
  <div class="menu-list">
    <div v-for="(menu, index) in menus" :key="index">
      <div class="category" v-if="menu.category">
        <h5>{{menu.category}}</h5>
      </div>

      <list-items v-if="menu.category" :menus="menu.items" />
      <div v-else class="items">
        <span>{{menu.name}}</span>
        <span>{{amountFormat(menu.price)}}</span>
        <md-checkbox v-model="menu.available" :disabled="edit" />
        <i v-if="menu.available">Available</i>
        <i v-else>Not Available</i>
      </div>
    </div>
  </div>
</template>

<script>
import { amountFormat } from '@/utils/helpers'

export default {
  name: 'ListItems',
  props: {
    menus: Array,
    edit: Boolean
  },
  methods: {
    amountFormat
  }
}
</script>

<style scoped lang="scss">
  @import '../../assets/scss/menuItems.scss';

  .menu-list {
    counter-reset: sno;

    .items {
      *:nth-child(1) {
        &::before {
          counter-increment: sno;
          content: counter(sno) '. ';
        }
      }

      *:nth-child(2) {
        text-align: right;
      }

      i {
        font-weight: 200;
      }
    }
  }
</style>
