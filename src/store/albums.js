import axios from 'axios'

const albums = {
    namespaced: true,
    state(){
        return {
            data:[],
            currentId: 1
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
            })
        },
        updateId(context, {newId}){
            context.commit('updateCurrentId', newId)
        }
    },
    getters: {
        selected(state){
            return state.data.find((album) => album.id === state.currentId)
        },
        title(state){
            if(state.data.length > 0){
                return state.data[state.currentId].title
            }
            else{
                return 'no album selected'
            }
        }
    }
}

export default albums