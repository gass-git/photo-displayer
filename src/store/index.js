import { createStore } from 'vuex'
import albums from './albums'
import photos from './photos'
import authModule from './authModule'

export default createStore({
  modules: {
    photos,
    albums,
    authModule
  }
})
