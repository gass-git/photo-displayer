export const alertStore = {
    namespaced: true,
    state(){
        return {
            closed: false
        }
    },
    mutations: {
        setClosed(state){
            state.closed = true
        }
    },
    getters: {}
}