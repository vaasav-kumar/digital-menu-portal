<template>
  <transition name="fade">
    <div class="popup">
      <div class="popup-box">
        <div class="heading">
          <h5 class="title">{{title}}</h5>
          <span class="close-button" @click="closePopup">
            &times;
          </span>
        </div>

        <div class="body">
          <slot />
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    title: String
  },
  beforeDestroy () {
    document.removeEventListener('keydown', this.escPressed)
  },
  created () {
    document.addEventListener('keydown', this.escPressed)
  },
  methods: {
    escPressed () {
      if (event.keyCode === 27) {
        this.closePopup()
      }
    },
    closePopup () {
      this.$emit('closePopup')
    }
  }
}
</script>

<style scoped lang="scss">
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100vh;
    background: rgba(0,0,0,0.6);
    z-index: 500;

    .popup-box {
      background: #fff;
      border-radius: 10px;
      padding: 10px;

      .title {
        font-size: 20px;
      }
      .heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 20px;
        width: 100%;
        border-bottom: 1px solid #e4e7e7;
      }
      .close-button {
        font-size: 24px;
        font-weight: 500;
        cursor: pointer;
      }

      .body {
        padding: 20px;
        max-height: 70vh;
        overflow: auto;
      }
    }
  }

  @media screen and (min-width: 500px) {
    .popup-box {
      width: 35%;
      position: fixed;
      top: 5%;
      left: 50%;
      transform: translateX(-50%);

      .body {
        max-height: 75vh !important;
      }
    }
  }

  // .mobile, .tablet {
  //   .popup {
  //     @include custom-flex();
  //   }

  //   .popup-box {
  //     width: 90%;

  //     .title {
  //       font-size: 16px;
  //       font-weight: 500;
  //     }
  //   }
  // }

  .fade-enter-active, .fade-leave-active {
    transition: .5s;
  }
  .fade-enter, .fade-leave-to {
    opacity: 0;
  }
</style>
