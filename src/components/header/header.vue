<template>
  <div class="header">
    <img :src="seller.avatar" width="100%" height="100%" class="bg-avatar">
    <div class="spec-button" v-if="seller.supports" @click="showDetail">
      <span class="count">{{seller.supports.length}}个</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <div class="content-wrapper">
      <div class="avatar">
        <img width="64" height="64" :src="seller.avatar">
      </div>
      <div class="content">
        <div class="title">
          <i class="brand"></i>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}} / {{seller.deliveryTime}} 分钟送达
        </div>
        <div v-if="seller.supports" class="support">
          <v-icon :size="24" :iconStyle="1" :itemType="seller.supports[0].type"></v-icon>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="showDetail">
      <i class="bulletin"></i><span class="content">{{seller.bulletin}}</span>
      <i class="icon-keyboard_arrow_right"></i>
    </div>
    <transition name="fade">
      <div class="details" v-show="detailShow" @scroll="canScroll">
        <div class="detail-wrapper clearfix">
          <div class="detail-main">
            <h1 class="name">{{seller.name}}</h1>
            <v-star :size="48" :score="seller.score"></v-star>
            <div class="title-wrapper">
              <div class="line"></div>
              <h2 class="title">优惠信息</h2>
              <div class="line"></div>
            </div>
            <ul class="support-wrapper" v-if="seller.supports">
              <li class="support-item" v-for="item in seller.supports">
                <v-icon :size="32" :iconStyle="2" :itemType="item.type"></v-icon>
                <span class="content">{{item.description}}</span>
              </li>
            </ul>
            <div class="title-wrapper">
              <div class="line"></div>
              <h2 class="title">商家公告</h2>
              <div class="line"></div>
            </div>
            <div class="bulletin-new">
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
              <p class="content">{{seller.bulletin}}</p>
            </div>
          </div>
        </div>
        <div class="detail-close" @click="detailHide">
          <i class="icon-close"></i>
        </div>
      </div>
    </transition>
  </div>
</template>
<script>
  import Star from 'components/star/star'
  import SmallIcon from 'components/SmallIcon/SmallIcon'
  export default{
    data() {
      return {
        detailShow: false
      }
    },
    methods: {
      showDetail() {
        this.detailShow = true
      },
      detailHide() {
        this.detailShow = false
      },
      canScroll() {
        console.log('aaa')
      }
    },
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      'v-star': Star,
      'v-icon': SmallIcon
    }
  }
</script>
<style lang="stylus">
  @import "../../common/stylus/mixin"
  .fade-enter-active, .fade-leave-active
    transition opacity 0.3s

  .fade-enter, .fade-leave-active
    opacity 0

  .header
    position relative
    color #fff
    overflow hidden
    background-color rgba(7, 17, 27, 0.5)
    .spec-button
      position absolute
      height 24px
      right 12px
      bottom 46px
      padding 0 8px
      color rgb(255, 255, 255)
      font-weight 200
      line-height 24px
      background-color rgba(0, 0, 0, 0.2)
      border-radius 14px
      font-size 0
      text-align center
      .count
        vertical-align top
        font-size 10px
      .icon-keyboard_arrow_right
        margin-left 2px
        font-size 10px
        line-height 24px
    .bg-avatar
      position absolute
      left 0
      top 0
      z-index -10
      filter blur(10px)
      object-fit cover
    .content-wrapper
      font-size 0
      padding 24px 12px 18px 24px
      .avatar
        display inline-block
        border-radius 2px
        overflow hidden
      .content
        display inline-block
        vertical-align top
        margin-left 16px
        font-size 14px
        color rgb(255, 255, 255)
        .title
          margin 2px 0 8px 0
          .brand
            display inline-block
            vertical-align top
            width 30px
            height 18px
            bg-image('brand')
            background-size 30px 18px
            background-repeat no-repeat
            border-radius 2px
          .name
            margin-left 6px
            font-size 16px
            font-weight bold
            line-height 18px
        .description
          margin-bottom 10px
          font-size 12px
          font-weight 200
          line-height 12px
        .support
          font-size 0
          .text
            margin-left 4px
            line-height 12px
            font-weight 200
            font-size 10px
    .bulletin-wrapper
      position relative
      height 28px
      padding 0 22px 0 12px
      background-color rgba(7, 17, 27, 0.2)
      white-space nowrap
      overflow hidden
      text-overflow ellipsis
      .bulletin
        display inline-block
        vertical-align top
        width 22px
        height 12px
        bg-image('bulletin')
        background-repeat no-repeat
        background-size 22px 12px
        margin-top 8px
      .content
        height 100%
        margin 0 4px
        font-size 10px
        line-height 28px
        font-weight 200
        color rgb(255, 255, 255)
      .icon-keyboard_arrow_right
        font-size 10px
        position absolute
        right 12px
        top 8px
    .details
      position fixed
      left 0
      top 0
      z-index 100
      width 100%
      height 100%
      overflow auto
      background-color rgba(7, 17, 27, 0.8)
      -webkit-overflow-scrolling: touch;
      .detail-wrapper
        width 100%
        min-height 100%
        .detail-main
          margin-top 64px
          padding-bottom 64px
          .name
            line-height 16px
            text-align center
            font-size 16px
            font-weight 700
          .star
            text-align center
            margin 16px 0 28px 0
          .title-wrapper
            padding 0 36px
            height 14px
            display flex
            .line
              flex 1
              height 1px
              background-color rgba(255, 255, 255, 0.2)
              margin-top 7px
            .title
              font-size 14px
              font-weight 700
              color rgb(255, 255, 255)
              line-height 14px
              margin 0 14px
          .support-wrapper
            padding 24px 48px 28px 48px
            .support-item
              margin-bottom 12px
              height 16px
              line-height 16px
              &:last-child
                margin-bottom 0
              .content
                font-size 12px
                font-weight 200
                line-height 12px
                margin-left 6px
                color rgb(255, 255, 255)
          .bulletin-new
            padding 24px 48px 24px 48px
            .content
              font-size 12px
              font-weight 200
              line-height 24px
              color rga(255, 255, 255)
      .detail-close
        position relative
        width 32px
        height 32px
        margin -64px auto 0 auto
        clear both
        font-size 32px
        color rgba(255, 255, 255, 0.5)
</style>
