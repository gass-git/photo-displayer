import UtilsState from '@/types/utilsState'

export const utilsStore = {
    namespaced: true,
    state():UtilsState{
        return {
            show: true,
            appFirstRender: true
          }
    },
    mutations: {
        setShow(state:UtilsState, bool:boolean):void{
            state.show = bool
        },
        setAppFirstRenderOff(state:UtilsState):void{
            state.appFirstRender = false
        }
    },
    getters: {
        isAppFirstRender(state:UtilsState):boolean{
            return state.appFirstRender
        },
        show(state:UtilsState):boolean{
            return state.show
        }
    }
}