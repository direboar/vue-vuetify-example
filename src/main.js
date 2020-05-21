// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import {
  Vuetify,
  VDataIterator,
  VApp,
  VAlert,
  VNavigationDrawer,
  VFooter,
  VList,
  VBtn,
  VCheckbox,
  VDivider,
  VIcon,
  VGrid,
  VToolbar,
  VDialog,
  VCard,
  VDataTable,
  VTextField,
  VTooltip,
  VSelect,
  VSubheader,
  VSnackbar,
  VRadioGroup,
  VForm,
  VAvatar,
  VSwitch,
  VTabs,
  VExpansionPanel,
  VPagination,
  VProgressLinear ,
  VCarousel,
  transitions
} from 'vuetify'
import '../node_modules/vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
  components: {
    VApp,
    VDataIterator,
    VAlert,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VCheckbox,
    VDivider,
    VIcon,
    VGrid,
    VToolbar,
    VDialog,
    VCard,
    VDataTable,
    VTextField,
    VTooltip,
    VSelect,
    VSubheader,
    VSnackbar,
    VRadioGroup,
    VForm,
    VAvatar,
    VSwitch,
    VTabs,
    VExpansionPanel,
    VPagination,
    VProgressLinear,
    VCarousel,
    transitions,
  },
  theme: {
    primary: '#ee44aa',
    secondary: '#424242',
    accent: '#82B1FF',
    error: '#FF5252',
    info: '#2196F3',
    success: '#4CAF50',
    warning: '#FFC107'
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
