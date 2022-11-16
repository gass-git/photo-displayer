import Photo from '@/types/photo'

const PHOTOS_API = 'https://jsonplaceholder.typicode.com/photos'

interface S{
    data:object[]
}

export const photosStore = {
    namespaced: true,
    state(){
        return {
            data:[]
        }
    },
    mutations: {
        setData(state:S, payload: Photo[]){
            state.data = payload
        }
    },
    actions: {
        async fetch(context:any){
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
        fromSelectedAlbum: (state:S) => (id:string) => {
            return state.data.filter((photo:any) => photo.albumId == id)
        }
    }
}