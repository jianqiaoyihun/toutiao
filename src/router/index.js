import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home'
// import Comment from '../views/comment'
// import Publish from '../views/publish'
// import Articles from '../views/articles'
// import Material from '../views/material'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/home'
  }, {
    path: '/home',
    component: Home,
    children: [
      { path: '',
        component: Home2
      }, {
        path: 'comment',
        component: () => import('../views/comment')// 按需加载
      }, {
        path: 'publish',
        component: () => import('../views/publish')
      }, {
        path: 'publish/:articleId',
        component: () => import('../views/publish')
      }, {
        path: 'articles',
        component: () => import('../views/articles')
      }, {
        path: 'material',
        component: () => import('../views/material')// 按需加载，挂载路由
      }, {
        path: 'account',
        component: () => import('../views/account')// 按需加载，挂载路由
      }, {
        path: 'fansinfo',
        component: () => import('../views/fansinfo')// 按需加载，挂载路由
      }, {
        path: 'fanslist',
        component: () => import('../views/fanslist')// 按需加载，挂载路由
      }, {
        path: 'fanslife',
        component: () => import('../views/fanslife')// 按需加载，挂载路由
      }, {
        path: 'picture',
        component: () => import('../views/picture')// 按需加载，挂载路由
      }
    ]
  }, {
    path: '/login',
    component: Login
  }
  // {
  //   path: '/login',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
