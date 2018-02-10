import Vue from 'vue'
import Router from 'vue-router'
import InitiativeBoard from '@/components/InitiativeBoard'
import ClassSearchCard from '@/components/ClassSearchCard'
import AbilityEditor from '@/components/AbilityEditor'
import Hoge from '@/components/Hoge'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/InitiativeBoard',
      name: 'InitiativeBoard',
      component: InitiativeBoard
    },
    {
      path: '/ClassSearchCard',
      name: 'ClassSearchCard',
      component: ClassSearchCard
    },
    {
      path: '/',
      name: 'AbilityEditor',
      component: AbilityEditor
    },
    {
      path: '/Hoge',
      name: 'Hoge',
      component: Hoge
    }
  ]
})
