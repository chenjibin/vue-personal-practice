<template>
  <i v-if="itemType >= 0" :class="[classMap[itemType],iconSize]" class="icon"></i>
</template>
<style lang="stylus">
  @import "../../common/stylus/mixin"
  .icon
    display inline-block
    vertical-align top
    background-repeat no-repeat
    &.icon-24
      width 12px
      height 12px
      background-size 12px 12px
    &.icon-32
      width 16px
      height 16px
      background-size 16px 16px
    &.decrease_1
      bg-image('decrease_1')
    &.discount_1
      bg-image('discount_1')
    &.guarantee_1
      bg-image('guarantee_1')
    &.invoice_1
      bg-image('invoice_1')
    &.special_1
      bg-image('special_1')
    &.decrease_2
      bg-image('decrease_2')
    &.discount_2
      bg-image('discount_2')
    &.guarantee_2
      bg-image('guarantee_2')
    &.invoice_2
      bg-image('invoice_2')
    &.special_2
      bg-image('special_2')
    &.decrease_3
      bg-image('decrease_3')
    &.discount_3
      bg-image('discount_3')
    &.guarantee_3
      bg-image('guarantee_3')
    &.invoice_3
      bg-image('invoice_3')
    &.special_3
      bg-image('special_3')
</style>
<script>
  export default{
    props: {
      size: {
        type: Number
      },
      itemType: {
        type: Number
      },
      iconStyle: {
        type: Number
      }
    },
    data() {
      return {}
    },
    computed: {
      iconSize() {
        return 'icon-' + this.size
      }
    },
    created() {
      this.classMap = ['decrease_' + this.iconStyle, 'discount_' + this.iconStyle, 'special_' + this.iconStyle, 'invoice_' + this.iconStyle, 'guarantee_' + this.iconStyle]
    }
  }
</script>
