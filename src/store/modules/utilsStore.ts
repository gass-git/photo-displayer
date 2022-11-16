interface S{
    show:boolean,
    appFirstRender:boolean
}

export const utilsStore = {
    namespaced: true,
    state(){
        return {
            show: true,
            appFirstRender: true
          }
    },
    mutations: {
        setShow(state:S, bool:boolean){
            state.show = bool
        },
        setAppFirstRenderOff(state:S){
            state.appFirstRender = false
        }
    },
    getters: {
        isAppFirstRender(state:S){
            return state.appFirstRender
        },
        show(state:S){
            return state.show
        }
    }
}