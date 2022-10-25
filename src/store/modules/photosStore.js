const PHOTOS_API = 'https://jsonplaceholder.typicode.com/photos'

export const photosStore = {
    namespaced: true,
    state(){
        return {
            data: []
        }
    },
    mutations: {
        setData(state, payload){
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
        fromSelectedAlbum: (state) => (id) => {
            return state.data.filter(photo => photo.albumId == id)
        }
    }
}