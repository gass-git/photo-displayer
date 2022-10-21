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

// eslint-disable-next-line
const unsubscribe = onAuthStateChanged(auth, (user) => {
  store.commit('authModule/updateUserData', user)
  store.commit('authModule/setAuthIsReady', true)

  if(user !== null){
    // store.dispatch('photos/setUserId')
    store.dispatch('photos/fetchFavorites')
  }
  else{
    store.commit('photos/cleanSessionFavorites')
  }
})
