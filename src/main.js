import Vue from 'vue'
import App from './App.vue'
import router from './router'
import BootstrapVue from 'bootstrap-vue'
import PortalVue from 'portal-vue'
import firebase from 'firebase'
import store from './store'
import Vuelidate from 'vuelidate'


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { faUser } from '@fortawesome/free-solid-svg-icons'
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(Vuelidate)

Vue.use(PortalVue)
Vue.use(BootstrapVue)

library.add(faTrash, faPlus, faUser, faEdit)
Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


const config = {
    apiKey: "AIzaSyASCZ7sA4eLizIHC-H-PCyy9sMLucxKvTQ",
    authDomain: "crystal-snow-events.firebaseapp.com",
    databaseURL: "https://crystal-snow-events.firebaseio.com",
    projectId: "crystal-snow-events",
    storageBucket: "",
    messagingSenderId: "531063318523",
    appId: "1:531063318523:web:efc0304f3edcb6af1d4d5e",
    measurementId: "G-JBKQ429PQ6",
    storageBucket: "gs://crystal-snow-events.appspot.com/"
}

firebase.initializeApp(config)

export const db = firebase.firestore()
export const dbs = firebase.storage()

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
