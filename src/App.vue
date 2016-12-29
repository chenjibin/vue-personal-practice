<template>
  <div id="myapp">
    <v-header :seller="seller"></v-header>
    <div class="tab border-1px">
      <div class="tab-item">
        <router-link :to="{name:'goods'}">商品</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'ratings'}">评价</router-link>
      </div>
      <div class="tab-item">
        <router-link :to="{name:'seller'}">商家</router-link>
      </div>
    </div>
    <router-view :seller="seller"></router-view>
  </div>
</template>

<script type="text/ecmascript-6">
  import Header from 'components/header/header'
  const ERR_OK = 0
  export default {
    data() {
      return {
        seller: {}
      }
    },
    mounted() {
      this.$http.get('/api/seller').then((response) => {
        response = response.body
      if (response.errno === ERR_OK) {
          this.seller = response.data
      }
    })
    },
    components: {
      'v-header': Header
    }
  }
</script>

<style lang="stylus">
  @import "./common/stylus/mixin"
  #myapp
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      border-1px(rgba(7, 17, 27, 0.1))
      .tab-item
        flex 1
        text-align center
        & > a
          font-size 14px
          color rgb(77, 85, 93)
          line-height 14px
          &.active
            color rgb(240, 20, 20)
</style>
