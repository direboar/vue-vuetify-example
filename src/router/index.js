import Vue from 'vue'
import Router from 'vue-router'
import InitiativeBoard from '@/components/InitiativeBoard'
import ClassSearchCard from '@/components/ClassSearchCard'
import AbilityEditor from '@/components/AbilityEditor'
import SpellSerachTable from '@/components/SpellSerachTable'
import IndexPage from '@/components/IndexPage'
import EncounterList from '@/components/EncounterList'
import TagList from '@/components/TagList'
import Udonarium from '@/components/udonarium/Udonarium'

//ie11対応
//see https://www.d-wood.com/blog/2016/04/12_7917.html
//see https://qiita.com/terrierscript/items/d2a9d5d4daedaacff924
import 'babel-polyfill'

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
      path: '/AbilityEditor',
      name: 'AbilityEditor',
      component: AbilityEditor
    },
    {
      path: '/SpellSerach',
      name: 'SpellSerachTable',
      component: SpellSerachTable
    },
    {
      path: '/',
      name: 'IndexPage',
      component: IndexPage
    },
    {
      path: '/EncounterList',
      name: 'EncounterList',
      component: EncounterList
    },
    {
      path: '/TagList',
      name: 'TagList',
      component: TagList
    },
    {
      path: '/Udonarium',
      name: 'Udonarium',
      component: Udonarium
    },
  ]
})
