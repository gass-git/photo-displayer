import { createStore } from 'vuex'
import albums from './modules/albums'
import photos from './modules/photos'
import authModule from './modules/authModule'
import store from '.'
import {onAuthStateChanged} from 'firebase/auth'
import { auth } from '@/firebase/config.js'

export default createStore({
  modules: {
    photos,
    albums,
    authModule
  }
})

onAuthStateChanged(auth, (user) => {
  store.commit('authModule/setUserAuth', user)
  store.commit('authModule/setAuthIsReady', true)
})
