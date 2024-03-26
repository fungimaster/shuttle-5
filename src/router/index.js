import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NotFound from '@/components/NotFound'



Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Hello
    },   
   
    {
      // will match everything
      path: '/*',
      component: NotFound
    }
  ],
  scrollBehavior(to, from, savedPosition) {

    //https://router.vuejs.org/guide/advanced/scroll-behavior.html
    if (to.hash && to.name === "Faq") {
      return { selector: to.hash }
    }
    if (to.name === "viewer" || from.name === "viewer"){
      return savedPosition;
   }
    else if (savedPosition) {
      return savedPosition;
    }
    else {
      return { x: 0, y: 0 }
    }
  }
})
