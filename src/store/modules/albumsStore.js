export const albumsStore = {
    namespaced: true,
    state(){
        return {
            data:[],
            selectedId: 1,
            fetched: false,
            maxToShow: 20
        }
    },
    mutations: {
        setData(state, data){
            state.data = data
        },
        updateSelectedId(state, id){
            state.slectedId = id
        },
        updateMaxToShow(state, n){
            state.maxToShow = n
        }
    },
    actions: {
        async fetch(context){
            const API_URL = 'https://jsonplaceholder.typicode.com/albums'

            try{
                const response = await fetch(API_URL)
                const data = await response.json()

                context.commit('setData', data)
                context.state.fetched = true
            }
            catch (error){
                console.log(error)
            }
        },
        updateCurrentMax(context, n){
            context.commit('updateMaxToShow', n)
        }
    },
    getters: {
        title(state){
            if(state.data.length > 0){
                let album = state.data.find(album => album.id == state.selectedId)
                return album.title
            }
            else{
                return 'no album selected'
            }
        },
        maxToShow(state){
            return state.maxToShow
        }
    }
}