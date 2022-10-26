import {createStore} from 'vuex'
import {albumsStore} from './modules/albumsStore'
import {photosStore} from './modules/photosStore'
import {authStore} from './modules/authStore'
import {userStore} from './modules/userStore'
import {alertStore} from './modules/alertStore'

export default createStore({
  modules: {
    alert: alertStore,
    photos: photosStore,
    albums: albumsStore,
    auth: authStore,
    user: userStore
  }
})