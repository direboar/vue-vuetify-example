import Vue from 'vue'
import Router from 'vue-router'
import InitiativeBoard from '@/components/InitiativeBoard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InitiativeBoard',
      component: InitiativeBoard
    }
  ]
})
