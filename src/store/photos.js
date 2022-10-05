import axios from 'axios'

const photos = {
    namespaced: true,
    state(){
        return {
            data: []
        }
    },
    mutations: {
        updateData(state, data){
            state.data = data
        }
    },
    actions: { 
        fetchByAlbum(context, {albumId}){
            let API_URL = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`

            axios.get(API_URL).then((resp) => {
                context.commit('updateData', resp.data)
            })
        }
    },
    getters: {

    }
}

export default photos