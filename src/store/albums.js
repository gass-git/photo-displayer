import axios from 'axios'

const API_URL = 'https://jsonplaceholder.typicode.com/albums'

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
            axios.get(API_URL).then((resp) => {
                context.commit('updateData', resp.data)
            })
        },
        changeId(context, id){
            context.commit('updateCurrentId', id)
        }
    },
    getters: {
        selected(state){
            return state.data.find((album) => album.id === state.currentId)
        }
    }
}

export default albums