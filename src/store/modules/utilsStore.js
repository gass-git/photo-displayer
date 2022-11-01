export const utilsStore = {
    namespaced: true,
    state(){
        return {
            show: true,
            appFirstRender: true
          }
    },
    mutations: {
        setShow(state, bool){
            state.show = bool
        },
        setAppFirstRenderOff(state){
            state.appFirstRender = false
        }
    },
    getters: {
        isAppFirstRender(state){
            return state.appFirstRender
        },
        show(state){
            return state.show
        }
    }
}