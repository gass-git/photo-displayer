import {ActionContext} from 'vuex'
import {State} from '../index'
import AlbumsState from '@/types/albumsState'

type Ctx = ActionContext<AlbumsState, State>

export const albumsStore = {
    namespaced: true,
    state():AlbumsState{
        return {
            data:[],
            selectedId:1
          }
    },
    mutations: {
        setData(state:AlbumsState, data:object[]):void{
            state.data = data
        },
        updateSelectedId(state:AlbumsState, id:number):void{
            state.selectedId = id
        }
    },
    actions: {
        async fetch(context:Ctx){
            const API_URL = 'https://jsonplaceholder.typicode.com/albums'

            try{
                const response = await fetch(API_URL)
                const data = await response.json()

                context.commit('setData', data)
            }
            catch (error){
                console.log(error)
            }
        }
    },
    getters: {
        title(state:AlbumsState):string{
            if(state.data.length > 0){
                const album:any = state.data.find((album:any) => album.id == state.selectedId)
                return album.title
            }
            else{
                return 'no album selected'
            }
        }
    }
}