import {createStore} from 'vuex'
import {albumsStore} from './modules/albumsStore'
import {photosStore} from './modules/photosStore'
import {authStore} from './modules/authStore'
import {userStore} from './modules/userStore'
import {utilsStore} from './modules/utilsStore'

export default createStore({
  modules: {
    utils: utilsStore,
    photos: photosStore,
    albums: albumsStore,
    auth: authStore,
    user: userStore
  }
})