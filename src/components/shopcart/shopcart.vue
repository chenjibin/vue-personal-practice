<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{'highlight':totalCount > 0 }">
            <i class="icon-shopping_cart"></i>
          </div>
          <div class="num" v-show="totalCount > 0">
            {{totalCount}}
          </div>
        </div>
        <div class="price">¥{{totalPrice}}</div>
        <div class="desc">另需配送费¥{{deliveryPrice}}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="payClass">
          {{payDesc}}
        </div>
      </div>
    </div>
    <div class="ball-container">
      <transition-group  tag="div" name="drop" v-on:before-enter="dropBeforeEnter" v-on:enter="dropEnter"  v-on:after-enter="dropAfterEnter" :css="false">
        <div v-for="ball in balls" v-if="ball.show" class="ball" :key="ball">
          <div class="inner inner-hook"></div>
        </div>
      </transition-group>
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
      color rgba(255, 255, 255, 0.4)
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
            &.highlight
              background-color rgb(0, 160, 220)
              .icon-shopping_cart
                color #fff
            .icon-shopping_cart
              line-height 44px
              font-size 24px
              color #80858a
          .num
            position absolute
            top 0
            right 0
            width 24px
            height 16px
            line-height 16px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 700
            color #fff
            background-color rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          margin-top 12px
          line-height 24px
          padding-right 12px
          box-sizing border-box
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
        .desc
          display inline-block
          vertical-align top
          line-height 24px
          margin 12px 0 0 12px
          font-size 10px
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          height 48px
          line-height 48px
          text-align center
          font-weight 700
          background-color #2b333b
          font-size 12px
          &.not-enough
            background-color #2b333b
          &.enough
            color #fff
            background-color #00b43c
    .ball-container
      .ball
        position fixed
        left 32px
        bottom 22px
        z-index 200
        transition all 0.4s cubic-bezier(0.49,-0.29,0.75,0.41)
        .inner
          width 16px
          height 16px
          border-radius 50%
          background-color rgb(0,160,220)
          transition all 0.4s linear
</style>
<script type="text/ecmascript-6">
  export default{
    props: {
      selectFoods: {
        type: Array,
        default() {
          return []
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    data() {
      return {
        payClass: '',
        balls: [],
        dropBalls: []
      }
    },
    computed: {
      totalPrice() {
        let total = 0
        this.selectFoods.forEach((food) => {
          total += food.price * food.count
        })
        return total
      },
      totalCount() {
        let count = 0
        this.selectFoods.forEach((food) => {
          count += food.count
        })
        return count
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `¥${this.minPrice}元起送`
        } else if (this.totalPrice < this.minPrice) {
          this.payClass = 'not-enough'
          return `还差¥${this.minPrice - this.totalPrice}元起送`
        } else {
          this.payClass = 'enough'
          return '去结算'
        }
      }
    },
    watch: {
//      balls(val, oldval) {
//        console.log(val)
//        console.log(oldval)
//      },
//      dropBalls(val) {
//        console.log(val)
//      }
    },
    methods: {
      drop(el) {
        let ball = {}
        ball.show = true
        ball.el = el
        this.balls.push(ball)
      },
      dropBeforeEnter(el) {
        let count = this.balls.length
        while (count--) {
          let ball = this.balls[count]
          if (ball.show) {
            let rect = ball.el.getBoundingClientRect()
            let x = rect.left - 32
            let y = -(window.innerHeight - rect.top - 42)
            let innerDom = el.querySelector('.inner-hook')
            el.style.webkitTransform = `translate3d(0,${y}px,0)`
            el.style.transform = `translate3d(0,${y}px,0)`
            innerDom.style.webkitTransform = `translate3d(${x}px,0,0)`
            innerDom.style.transform = `translate3d(${x}px,0,0)`
          }
        }
      },
      dropEnter(el, done) {
        let rf = el.offsetHeight
        let innerDom = el.querySelector('.inner-hook')
        this.$nextTick(() => {
          el.style.webkitTransform = 'translate3d(0,0,0)'
          el.style.transform = 'translate3d(0,0,0)'
          innerDom.style.webkitTransform = 'translate3d(0,0,0)'
          innerDom.style.transform = 'translate3d(0,0,0)'
        })
        setTimeout(function () {
          done()
        }, 400)
      },
      dropAfterEnter(el) {
        let ball = this.balls.shift()
      }
    },
    components: {}
  }
</script>
