import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import MyMatchplay from '@/components/MyMatchplay'
import Faq from '@/components/Faq'
import FaqIndoor from '@/components/FaqIndoor'
import Cookies from '@/components/Cookies'
import Club from '@/components/Club'
import Klubbar from '@/components/Klubbar'
import Business from '@/components/Business'
import Privacy from '@/components/Privacy'
import Competition from '@/components/Competition'
import Competitions from '@/components/Competitions'
import NotFound from '@/components/NotFound'
import CreateGame from '@/components/Creategame'
import CreateGame_free from '@/components/Creategame_free'
import Freeplay from '@/components/Freeplay'
import Scorecard from '@/components/Scorecard'
import Receipt from '@/components/Receipt'
import Game from '@/components/Game'
import Register from '@/components/Register'
import Results from '@/components/Results'
import Images from '@/components/Images'
import Indoor from '@/components/Indoor'

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
      path: '/results',
      name: 'Results',
      component: Results,
      children: [
        {
          path: '/viewer',
          name: 'viewer',
          component: Scorecard,
          props: true,
          meta: {
            modalShow: true
            }
        },
      ]
    },      
    {
      path: '/mymatchplay',
      name: 'MyMatchplay',
      component: MyMatchplay
    },
    {
      path: '/images',
      name: 'Images',
      component: Images
    },
    {
      path: '/creategame',
      name: 'CreateGame',
      component: CreateGame
    },
    {
      path: '/creategame_free',
      name: 'CreateGame_free',
      component: CreateGame_free
    },
    {
      path: '/freeplay',
      name: 'Freeplay',
      component: Freeplay
    },
    {
      path: '/register',
      name: 'Register',
      component: Register,
      props: { igg: true }
    },
    {
      path: '/scorecard',
      name: 'Scorecard',
      component: Scorecard,
    },
    {
      path: '/receipt',
      name: 'Receipt',
      component: Receipt,
      props: true
    },
    {
      path: '/game',
      name: 'Game',
      component: Game
    },

    {
      path: '/club',
      name: 'Club',
      component: Club
    },
    {
      path: '/indoor',
      name: 'Indoor',
      component: Indoor
    },
    {
      path: '/klubbar',
      name: 'klubbar',
      component: Klubbar
    },  
    {
      path: '/business',
      name: 'business',
      component: Business
    }, 
    {
      path: '/foretag',
      name: 'foretag',
      component: Business
    }, 
    {
      path: '/info',
      name: 'Faq',
      component: Faq
    },
    {
      path: '/info_indoor',
      name: 'FaqIndoor',
      component: FaqIndoor
    },
    {
      path: '/cookies',
      name: 'Cookies',
      component: Cookies
    },  
    {
      path: '/privacy-policy',
      name: 'Privacy',
      component: Privacy
    },    
    {
      path: "/tavlingar/",
      name: "Competitions",
      component: Competitions,
      children: [
        {
          path: "/tavlingar/:competition",
          name: "Competition",
          component: Competition,
        },
      ],
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
