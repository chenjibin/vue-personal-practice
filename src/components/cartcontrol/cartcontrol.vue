<template>
  <div class="cart-control">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart"></div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click="addCart"></div>
  </div>

</template>
<style lang="stylus">
  .cart-control
    font-size 0
    .move-enter-active, .move-leave-active
      transition all .4s linear
      transform translate3D(0, 0, 0) rotate(0)
    .move-enter, .move-leave-active
      transform translate3D(24px, 0, 0) rotate(180deg)
      opacity 0
    .cart-count
      display inline-block
      vertical-align top
      font-size 10px
      width 12px
      padding-top 6px
      line-height 24px
      color rgb(147, 153, 159)
      text-align center
    .cart-add, .cart-decrease
      display inline-block
      padding 6px
      font-size 24px
      line-height 24px
      color rgb(0, 160, 220)
</style>
<script type="text/ecmascript-6">
  import Vue from 'vue'
  export default{
    props: {
      food: {
        type: Object
      }
    },
    data() {
      return {}
    },
    created() {
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return
        }
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1)
        } else {
          this.food.count++
        }
        this.$store.dispatch('drop', event.target)
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return
        }
        if (this.food.count) {
          this.food.count--
        }
      }
    },
    components: {}
  }
</script>
