import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import NotFound from '@/components/NotFound'
import BookedSlots from '@/components/BookedSlots'
import CheckBooked from '@/components/CheckBooked'


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
      path: '/schedule',
      name: 'schedule',
      component: BookedSlots
    },   
    {
      path: '/check',
      name: 'check',
      component: CheckBooked
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
