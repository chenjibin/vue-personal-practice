<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo">
            <i class="icon-shopping_cart"></i>
          </div>
        </div>
        <div class="price"></div>
        <div class="desc"></div>
      </div>
      <div class="content-right"></div>
    </div>
  </div>
</template>
<style lang="stylus">
  .shopcart
    position fixed
    bottom 0
    left 0
    z-index 50
    width 100%
    height 48px
    .content
      display flex
      background-color #141d27
      font-size 0
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          vertical-align top
          border-radius 50%
          background-color #000
          .logo
            width 100%
            height 100%
            border-radius 50%
            background-color #2b343c
            text-align center
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
        .desc
          display inline-block
      .content-right
        flex 0 0 105px
        width 105px

</style>
<script>
  export default{
    data() {
      return {}
    },
    components: {}
  }
</script>
