import Vue from 'vue'
import Router from 'vue-router'
import InitiativeBoard from '@/components/InitiativeBoard'
import ClassSearchCard from '@/components/ClassSearchCard'
import AbilityEditor from '@/components/AbilityEditor'
import SpellSerachTable from '@/components/SpellSerachTable'
import IndexPage from '@/components/IndexPage'
import Hoge from '@/components/Hoge'
import Scroll from '@/components/Scroll'

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
    //for temporary.
    {
      path: '/Hoge',
      name: 'Hoge',
      component: Hoge
    },
    {
      path: '/Scroll',
      name: 'Scroll',
      component: Scroll
    }
  ]
})
