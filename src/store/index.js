import {createStore} from 'vuex'
import {albumsStore} from './modules/albumsStore'
import {photosStore} from './modules/photosStore'
import {authStore} from './modules/authStore'
import {userStore} from './modules/userStore'

export default createStore({
  modules: {
    photos: photosStore,
    albums: albumsStore,
    auth: authStore,
    user: userStore
  }
})