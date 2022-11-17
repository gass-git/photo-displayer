interface S{
    data: Object[],
    selectedId: number
}

export const albumsStore = {
    namespaced: true,
    state():S{
        return {
            data:[],
            selectedId:1
          }
    },
    mutations: {
        setData(state:S, data:object[]):void{
            state.data = data
        },
        updateSelectedId(state:S, id:number):void{
            state.selectedId = id
        }
    },
    actions: {
        async fetch(context: any){
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
        }
    },
    getters: {
        title(state:S):string{
            if(state.data.length > 0){
                const album:any = state.data.find((album:any) => album.id == state.selectedId)
                return album.title
            }
            else{
                return 'no album selected'
            }
        }
    }
}