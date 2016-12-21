<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menu">
      <ul>
        <li v-for="(item, index) in goods" class="menu-item" :class="{'current': currentIndex === index }" @click="selectMenu(index,$event)">
          <span class="text border-1px">
            <v-icon v-if="item.type>0" :size="24" :iconStyle="3" :itemType="item.type"></v-icon>{{item.name}}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foods">
      <ul>
        <li v-for="item in goods" class="food-list food-list-hook">
          <h1 class="title">{{item.name}}</h1>
          <ul>
            <li v-for="food in item.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon" width="57" height="57"/>
              </div>
              <div class="content">
                <h2 class="name">{{food.name}}</h2>
                <p class="desc">{{food.description}}</p>
                <div class="extra">
                  <span class="count">月售{{food.sellCount}}</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">¥{{food.price}}</span><span v-show="food.oldPrice"
                                                                class="old">¥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <v-shopcart></v-shopcart>
  </div>
</template>
<style lang="stylus">
  @import "../../common/stylus/mixin"
  .goods
    display flex
    position absolute
    top 174px
    bottom 46px
    width 100%
    overflow hidden
    .menu-wrapper
      flex 0 0 80px
      width 80px
      background-color #f3f5f7
      .menu-item
        display table
        height 54px
        width 56px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          z-index 10
          background-color #fff
          font-weight 700
          margin-top -1px
          .text
            border-none()
        .text
          display table-cell
          width 56px
          vertical-align middle
          border-1px(rgba(7, 17, 27, 0.1))
          font-size 12px
          .icon
            margin-right 2px
        &:last-child
          .text
            border-none()
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        line-height 26px
        border-left 2px solid #d9dde1
        font-size 12px
        color rgb(147, 153, 159)
        background-color #f3f5f7
      .food-item
        display flex
        margin 0 18px
        padding 18px 0
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 18px
        .icon
          flex 0 0 57px
          width 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            font-size 10px
            line-height 10px
            color rgb(147, 153, 159)
          .desc
            line-height 12px
            margin-bottom 8px
          .extra
            .count
              margin-right 12px
          .price
            font-size 700
            line-height 24px
            .now
              margin-right 8px
              color rgb(240, 20, 20)
              font-size 14px
            .old
              font-size 10px
              color rgb(147, 153, 159)
              text-decoration line-through
</style>
<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import SmallIcon from 'components/SmallIcon/SmallIcon'
  import shopcart from 'components/shopcart/shopcart'
  const ERR_OK = 0
  export default{
    data() {
      return {
        goods: {},
        listHeight: [],
        scrollY: 0
      }
    },
    computed: {
      currentIndex: function () {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i]
          let height2 = this.listHeight[i + 1]
          if (!height2 || (this.scrollY >= height1 && this.scrollY < height2)) {
            return i
          }
        }
        return 0
      }
    },
    mounted() {
      this.$http.get('/api/goods').then(function(response) {
        response = response.body
        if (response.errno === ERR_OK) {
          this.goods = response.data
          this.$nextTick(function () {
            this._initScroll()
            this._calculateHeight()
          })
        }
      }
    )
    },
    methods: {
      selectMenu(index, e) {
        if (!e._constructed) {
          return
        }
        let foodList = this.$refs.foods.getElementsByClassName('food-list-hook')
        let el = foodList[index]
        this.foodsScroll.scrollToElement(el, 300)
      },
      _initScroll: function () {
        this.meunScroll = new BScroll(this.$refs.menu, {
          click: true
        })
        this.foodsScroll = new BScroll(this.$refs.foods, {
          probeType: 3
        })
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y))
      })
      },
      _calculateHeight: function () {
        let foodlist = this.$refs.foods.getElementsByClassName('food-list-hook')
        let height = 0
        this.listHeight.push(height)
        for (let i = 0; i < foodlist.length; i++) {
          let item = foodlist[i]
          height += item.clientHeight
          this.listHeight.push(height)
        }
      }
    },
    components: {
      'v-icon': SmallIcon,
      'v-shopcart': shopcart
    }
  }
</script>
