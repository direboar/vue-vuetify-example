import Vue from 'vue'
import Router from 'vue-router'
import InitiativeBoard from '@/components/InitiativeBoard'
import AxiosTest from '@/components/AxiosTest'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'InitiativeBoard',
      component: InitiativeBoard
    },
    {
      path: '/axiostest',
      name: 'AxiosTest',
      component: AxiosTest
    }
  ]
})
