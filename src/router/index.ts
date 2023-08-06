import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import store from '../store/index'
import Home from '../views/Home.vue'
import memberTree from '../views/memberTree.vue'
// import { miniProgramNavigateTo } from '../utils/Weixin.js'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/:code',
    name: 'Home',
    meta: {
      index: 1
    },
    component: Home
  },
  {
    path: '/:code/memberTree',
    name: 'memberTree',
    meta: {
      index: 2
    },
    component: memberTree
  },
  {
    path: '/search',
    name: 'search',
    meta: {
      index: 3
    },
    component: () => import('../views/search.vue')
  },
  {
    path: '/videoList',
    name: 'videoList',
    meta: {
      index: 2
    },
    component: () => import('../views/videoList.vue')
  },
  {
    path: '/videoDetail',
    name: 'videoDetail',
    meta: {
      index: 3
    },
    component: () => import('../views/videoDetail.vue')
  }

]

const router = createRouter({
  history: createWebHistory('/mobile'),
  routes
})
const setoRouteTransitionName = (to, from) => {
  let transitionName = ''
  if (to.meta.index > from.meta.index) {
    transitionName = 'slide' // 向左滑动
  } else if (to.meta.index < from.meta.index) {
    // 由次级到主级
    transitionName = 'return'
  } else {
    transitionName = 'border' // 同级无过渡效果
  }
  console.log(transitionName)
  store.commit('setTransitionName', transitionName)
}

router.beforeEach((to, from, next) => {
  // const token = window.sessionStorage.getItem('token')
  setoRouteTransitionName(to, from)
  next()
})

export default router
