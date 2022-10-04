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
            state.data = data.filter((photo) => photo.id < 10)
        }
    },
    actions: { 
        fetchByAlbum(context, albumId){
            const API_URL = `https://jsonplaceholder.typicode.com/photos?album=${albumId}`

            axios.get(API_URL).then((resp) => {
                context.commit('updateData', resp.data)
                console.log(resp.data)
            })
        }
    },
    getters: {

    }
}

export default photos