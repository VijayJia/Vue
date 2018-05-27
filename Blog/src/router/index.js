import Vue from 'vue'
import VueRouter from 'vue-router'
import BlogDetail from '@/components/BlogDetail'
import BlogList from '@/components/BlogList'
import BlogNew from '@/components/BlogNew'

Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {
      path: '/detail/:id',
      name: 'BlogDetail',
      component: BlogDetail
    },
    {
      path: '/new',
      name: 'BlogNew',
      component: BlogNew
    },
    {
      path: '/edit/:id',
      name: 'BlogEdit',
      component: BlogNew
    },
    {
      path: '/',
      name: 'BlogList',
      component: BlogList
    }
  ]
})
