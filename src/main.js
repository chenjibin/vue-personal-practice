import Vue from 'vue'
import VueRouter from 'vue-router'
import VueResource from 'vue-resource'
import App from './App'
import store from 'src/vuex/store'
import goods from 'components/goods/goods'
import ratings from 'components/ratings/ratings'
import seller from 'components/seller/seller'
import 'common/stylus/index.styl'
Vue.use(VueRouter)
Vue.use(VueResource)
const routes = [
  {path: '/goods', component: goods, name: 'goods'},
  {path: '/ratings', component: ratings, name: 'ratings'},
  {path: '/seller', component: seller, name: 'seller'}
]
const router = new VueRouter({
  routes,
  linkActiveClass: 'active'
})

new Vue({
  router,
  store,
  ...App
}).$mount('#app')

router.replace({name: 'goods'})
