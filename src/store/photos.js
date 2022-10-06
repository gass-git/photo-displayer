import axios from 'axios'

const photos = {
    namespaced: true,
    state(){
        return {
            data: [],
            cache: {}
        }
    },
    mutations: {
        updateData(state, {data, albumId}){
            state.data = data

            // add data to cache only if it has not been added before
            if(!(albumId in state.cache)) state.cache[albumId] = data;
        }
    },
    actions: { 
        showByAlbum(context, {albumId}){
            
            // dont fetch if the photos are in cache
            if(albumId in context.state.cache){
                context.commit(
                    'updateData', 
                    {
                        data: context.state.cache[albumId], 
                        albumId
                    }
                )
            }
            else{
                let API_URL = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`

                axios.get(API_URL).then((resp) => {
                    context.commit('updateData', {data: resp.data, albumId})
                })
            }
        }
    },
    getters: {

    }
}

export default photos