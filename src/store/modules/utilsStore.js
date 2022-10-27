export const utilsStore = {
    namespaced: true,
    state(){
        return {
            alertClosed: false,
            appRendersCount: 0,
            appFirstRender: true
        }
    },
    mutations: {
        setAlertClosed(state){
            state.alertClosed = true
        },
        incrementAppRendersCount(state){
            state.appRendersCount += 1
        },
        setAppFirstRenderOff(state){
            state.appFirstRender = false
        }
    },
    getters: {
        isAppFirstRender(state){
            return state.appFirstRender
        },
        isAlertClosed(state){
            return state.alertClosed
        }
    }
}