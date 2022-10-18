import { createStore } from 'vuex'
import albums from './albums'
import photos from './photos'
import authModule from './authModule'
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

const unsubscribe = onAuthStateChanged(auth, (user) => {
  store.commit('authModule/setAuthIsReady', true)
  store.commit('authModule/updateUserData', user)
  unsubscribe()
})
