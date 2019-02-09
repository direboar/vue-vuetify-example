import Vue from 'vue'
import Router from 'vue-router'
import InitiativeBoard from '@/components/InitiativeBoard'
import ClassSearchCard from '@/components/ClassSearchCard'
import AbilityEditor from '@/components/AbilityEditor'
import SpellSerachTable from '@/components/SpellSerachTable'
import IndexPage from '@/components/IndexPage'
import EquipmentSeletorTester from '@/components/embriomachine/EquipmentSeletorTester'
import MachineConstructPanel from '@/components/embriomachine/MachineConstructPanel'
import MachineList from '@/components/embriomachine/MachineList'
import Scroll from '@/components/Scroll'
import EncounterList from '@/components/EncounterList'
import FirebaseLogin from '@/components/FirebaseLogin'
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
      path: '/embrioMachine/EquipmentSelector',
      name: 'EquipmentSeletorTester',
      component: EquipmentSeletorTester
    },
    {
      path: '/embrioMachine/MachineConstructPanel',
      name: 'MachineConstructPanel',
      component: MachineConstructPanel
    },
    {
      path: '/embrioMachine/MachineList',
      name: 'MachineList',
      component: MachineList
    },
    {
      path: '/Scroll',
      name: 'Scroll',
      component: Scroll
    },
    {
      path: '/FirebaseLogin',
      name: 'FirebaseLogin',
      component: FirebaseLogin
    },
    {
      path: '/EncounterList',
      name: 'EncounterList',
      component: EncounterList
    }
  ]
})
