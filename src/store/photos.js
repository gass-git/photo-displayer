import axios from 'axios'

const url = 'https://jsonplaceholder.typicode.com/albums'

const photos = {
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
            axios.get(url).then((resp) => {
                context.commit('updateData', resp.data)
            })
        },
        changeId(context, id){
            context.commit('updateCurrentId', id)
        }
    },
    getters: {
        selected(state){
            return state.data.find((photo) => photo.id === state.currentId)
        }
    }
}

export default photos