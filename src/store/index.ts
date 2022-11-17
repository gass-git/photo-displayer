import {createStore, storeKey} from 'vuex'
import {albumsStore} from './modules/albumsStore'
import {photosStore} from './modules/photosStore'
import {authStore} from './modules/authStore'
import {userStore} from './modules/userStore'
import {utilsStore} from './modules/utilsStore'
import UtilsState from '@/types/utilsState'
import UserState from '@/types/userState'
import AlbumsState from '@/types/albumsState'
import AuthState from '@/types/authState'

export interface State{
  utils:UtilsState,
  photos:any,
  albums:AlbumsState,
  auth:AuthState,
  user:UserState
}

export default createStore({
  modules: {
    utils: utilsStore,
    photos: photosStore,
    albums: albumsStore,
    auth: authStore,
    user: userStore
  }
})

