import {doc, updateDoc, arrayUnion, onSnapshot, arrayRemove} from 'firebase/firestore'
import {db} from '@/firebase/config'
import UserState from '@/types/userState'
import UserInfo from '@/types/userInfo'

export const userStore = {
    namespaced:true,
    state():UserState{
        return {
            uid:'',
            favoritePhotos: {
                ids:[]
            },
            globalSettings: {
                albumsToShow: 50
            },
            information: {
                about:'',
                username:'',
                website:''
            }
        }
    },
    mutations:{
        setUID(state:UserState, payload: any){
            state.uid = payload
        },
        setFavoritePhotos(state:UserState, payload: any){
            state.favoritePhotos = payload
        },
        setGlobalSettings(state:UserState, payload: any){
            state.globalSettings = payload
        },
        setInfo(state:UserState, payload: any){
            state.information = payload
        },
        resetAll(state:UserState){
            state.uid = ''
            state.favoritePhotos = {ids: []}
            state.globalSettings = {albumsToShow: 50},
            state.information = {about:'',username:'',website:''}
        }
    },
    actions:{
        async load(context:any, uid:string){
            context.commit('setUID', uid)

            try{   
                onSnapshot(doc(db, 'users', context.state.uid), (doc) => {
                    context.commit('setFavoritePhotos', doc.data()?.favoritePhotos)
                    context.commit('setGlobalSettings', doc.data()?.globalSettings)
                    context.commit('setInfo', doc.data()?.information)
                })
            }
            catch (error){
                console.log(error)
            }
        },
        async addFavoritePhoto(context:any, photoId:string){
            try{
                await updateDoc(doc(db, 'users', context.state.uid), {
                    "favoritePhotos.ids": arrayUnion(photoId)
                })
            }
            catch (error){
                console.log(error)
            }
        },
        async removeFavoritePhoto(context:any, photoId:string){
            try{
                await updateDoc(doc(db, 'users', context.state.uid), {
                    "favoritePhotos.ids": arrayRemove(photoId)
                })
            }
            catch (error){
                console.log(error)
            }
        },
        async updateAlbumsToShow(context:any, quantity: 20 | 30 | 50){
            try{
                await updateDoc(doc(db, 'users', context.state.uid), {
                    "globalSettings.albumsToShow": quantity
                })
            }
            catch (error){
                console.log(error)
            }
        },
        async updateInformation(context:any, {username, website, about}:UserInfo){
            try{
                await updateDoc(doc(db, 'users', context.state.uid), { 
                    "information.username": username,
                    "information.website": website,
                    "information.about": about
                })
            }
            catch (error){
                console.log(error)
            }
        }
    },
    getters:{
        albumsToShow(state:UserState){
            return state.globalSettings.albumsToShow
        },
        information(state:UserState){
            return state.information
        }
    }
}