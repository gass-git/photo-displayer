import axios from 'axios'

const albums = {
    namespaced: true,
    state(){
        return {
            data:[],
            currentId: 1,
            fetched: false
        }
    },
    mutations: {
        updateData(state, data){
            state.data = data
        },
        updateCurrentId(state, id){
            state.currentId = id
        }
    },
    actions: {
        fetch(context){
            let API_URL = 'https://jsonplaceholder.typicode.com/albums'

            axios.get(API_URL).then((resp) => {
                context.commit('updateData', resp.data.filter((album) => album.id < 30))
                context.state.fetched = true
            })
        },
        updateId(context, {newId}){
            context.commit('updateCurrentId', newId)
        }
    },
    getters: {
        title(state){
            if(state.data.length > 0){
                let album = state.data.find((album) => album.id == state.currentId)
                return album.title
            }
            else{
                return 'no album selected'
            }
        }
    }
}

export default albums