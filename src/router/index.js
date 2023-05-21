import Vue from 'vue'
import VueRouter from 'vue-router'
import HomeView from '../views/HomeView.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: HomeView,
    children:[
      {
        path: '/sys-admin/product/album-list/add-new',
        component: () => import('../views/sys-admin/product/AlbumAddNewView.vue')
      },
      {
        path: '/sys-admin/product/album-list',
        component: () => import('../views/sys-admin/product/AlbumListView.vue')
      },
      {
        path: '/sys-admin/product/AttributeTemplate-list',
        component: () => import('../views/sys-admin/product/AttributeTemplateListView.vue')
      },
      {
        path: '/sys-admin/product/AttributeTemplate-list/add-new',
        component: () => import('../views/sys-admin/product/AttributeTemplateAddNewView.vue')
      },
      {
        path: '/sys-admin/product/brand-list',
        component: () => import('../views/sys-admin/product/BrandListView.vue')
      },
      {
        path: '/sys-admin/product/brand-list/add-new',
        component: () => import('../views/sys-admin/product/BrandAddNewView.vue')
      },
        /*权限管理相关*/
      {
        path: '/sys-admin/permission/admin/add-new',
        component: () => import('../views/sys-admin/permission/AdminAddNewView.vue')
      },
      {
        path: '/sys-admin/permission/admin',
        component: () => import('../views/sys-admin/permission/AdminListView.vue')
      },
    ]
  },
  {
    path: '/about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/LoginView.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
