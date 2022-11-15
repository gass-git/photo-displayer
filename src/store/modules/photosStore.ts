import Photo from '@/types/photo'

const PHOTOS_API = 'https://jsonplaceholder.typicode.com/photos'

export const photosStore = {
    namespaced: true,
    state(){
        return {
            data:[]
        }
    },
    mutations: {
        setData(state, payload: Photo){
            state.data = payload
        }
    },
    actions: {
        async fetch(context){
            try{
                const resp = await fetch(PHOTOS_API)
                const data = await resp.json()
                context.commit('setData', data)
            }
            catch (error) {
                console.log(error)
            }
        }
    },
    getters: {
        fromSelectedAlbum: (state) => (id:string) => {
            return state.data.filter((photo:Photo) => photo.albumId == id)
        }
    }
}