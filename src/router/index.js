import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Tickets from '@/components/Tickets'
import Lineup from '@/components/Lineup'
import Sessions from '@/components/Sessions'
import Search from '@/components/Search'
import MyMatchplay from '@/components/MyMatchplay'
import Faq from '@/components/Faq'
import Cookies from '@/components/Cookies'
import Committee from '@/components/Committee'
import Club from '@/components/Club'
import Partnership from '@/components/Partnership'
import Privacy from '@/components/Privacy'
import ConvinceBoss from '@/components/ConvinceBoss'
import SpeakerInfo from '@/components/SpeakerInfo'
import PartnerInfo from '@/components/PartnerInfo'
import Archive from '@/components/Archive'
import NotFound from '@/components/NotFound'
import CreateGame from '@/components/Creategame'
import Scorecard from '@/components/Scorecard'
import Receipt from '@/components/Receipt'
import Game from '@/components/Game'
import Register from '@/components/Register'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Start',
      component: Hello,
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
      path: '/tickets',
      name: 'Tickets',
      component: Tickets
    },
    {
      path: '/line-up',
      name: 'Lineup',
      component: Lineup
    },
    {
      path: '/line-up/:name',
      name: 'Lineup-single',
      component: Lineup
    },
    {
      path: '/sessions',
      name: 'Sessions',
      component: Sessions
    },
    {
      path: '/sessions/:name',
      name: 'session-single',
      component: Sessions
    },
    {
      path: '/search/:query',
      name: 'Search',
      component: Search
    },
    {
      path: '/mymatchplay',
      name: 'MyMatchplay',
      component: MyMatchplay
    },
    {
      path: '/creategame',
      name: 'CreateGame',
      component: CreateGame
    },
    {
      path: '/register',
      name: 'Register',
      component: Register
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
    /*
    {
      path: '/my-schedule',
      name: 'MySchedule',
      component: MySchedule
    },    
    {
      path: '/my-schedule/:id',
      name: 'MySchedule-id',
      component: MySchedule
    },
    */
    {
      path: '/info',
      name: 'Faq',
      component: Faq
    },
    {
      path: '/cookies',
      name: 'Cookies',
      component: Cookies
    },
    {
      path: '/committee',
      name: 'Committee',
      component: Committee
    },    
    {
      path: '/partnership',
      name: 'Partnership',
      component: Partnership
    },
    {
      path: '/privacy-policy',
      name: 'Privacy',
      component: Privacy
    },
    {
      path: '/convince-your-boss',
      name: 'ConvinceBoss',
      component: ConvinceBoss
    },
    {
      path: '/speaker-info',
      name: 'SpeakerInfo',
      component: SpeakerInfo
    },
    {
      path: '/partner-info',
      name: 'PartnerInfo',
      component: PartnerInfo
    },
    {
      path: '/archive',
      name: 'Archive',
      component: Archive
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
