// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import VueLazyload from 'vue-lazyload'
import {get, post} from './api/axios'
import './common/js/rem'
import './common/font/iconfont.css'

Vue.config.productionTip = false

// Vue.use(VueLazyload)
Vue.use(VueLazyload, {
  loading: require('./common/img/tv.png'),
  error: require('./common/img/tv.png')
})
Vue.prototype.$get = get
Vue.prototype.$post = post
router.beforeEach((to, from, next) => {
  if (to.meta.isLogin) { // 判断该路由是否需要登录权限
    let getFlag = localStorage.getItem('Flag')
    if (getFlag === 'isLogin') {
      // store存储登录状态
      next()
    } else {
      next({
        path: '/Login'
      })
    }
  } else {
    next()
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
