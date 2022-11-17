import {ActionContext} from 'vuex'
import {State} from '../index'
import Photo from '@/types/photo'

type Ctx = ActionContext<{data:object[]}, State>

const PHOTOS_API = 'https://jsonplaceholder.typicode.com/photos'

export const photosStore = {
    namespaced: true,
    state():{data:object[]}{
        return {
            data:[]
        }
    },
    mutations: {
        setData(state:{data:object[]}, payload: Photo[]){
            state.data = payload
        }
    },
    actions: {
        async fetch(context:Ctx){
            try{
                const 
                    resp = await fetch(PHOTOS_API),
                    data = await resp.json();
                context.commit('setData', data)
            }
            catch (error) {
                console.log(error)
            }
        }
    },
    getters: {
        fromSelectedAlbum: (state:{data:object[]}) => (id:string) => {
            return state.data.filter((photo:any) => photo.albumId == id)
        }
    }
}