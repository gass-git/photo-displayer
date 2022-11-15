import {doc, updateDoc, arrayUnion, onSnapshot, arrayRemove} from 'firebase/firestore'
import {db} from '@/firebase/config.js'

export const userStore = {
    namespaced:true,
    state(){
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
        setUID(state, payload: any){
            state.uid = payload
        },
        setFavoritePhotos(state, payload: any){
            state.favoritePhotos = payload
        },
        setGlobalSettings(state, payload: any){
            state.globalSettings = payload
        },
        setInfo(state, payload: any){
            state.information = payload
        },
        resetAll(state){
            state.uid = ''
            state.favoritePhotos = {ids: []}
            state.globalSettings = {albumsToShow: 50},
            state.information = {about:'',username:'',website:''}
        }
    },
    actions:{
        async load(context, uid:string){
            context.commit('setUID', uid)

            try{   
                onSnapshot(doc(db, 'users', context.state.uid), (doc) => {
                    context.commit('setFavoritePhotos', doc.data().favoritePhotos)
                    context.commit('setGlobalSettings', doc.data().globalSettings)
                    context.commit('setInfo', doc.data().information)
                })
            }
            catch (error){
                console.log(error.message)
            }
        },
        async addFavoritePhoto(context, photoId:string){
            try{
                await updateDoc(doc(db, 'users', context.state.uid), {
                    "favoritePhotos.ids": arrayUnion(photoId)
                })
            }
            catch (error){
                console.log(error.message)
            }
        },
        async removeFavoritePhoto(context, photoId:string){
            try{
                await updateDoc(doc(db, 'users', context.state.uid), {
                    "favoritePhotos.ids": arrayRemove(photoId)
                })
            }
            catch (error){
                console.log(error.message)
            }
        },
        async updateAlbumsToShow(context, quantity:number){
            try{
                await updateDoc(doc(db, 'users', context.state.uid), {
                    "globalSettings.albumsToShow": quantity
                })
            }
            catch (error){
                console.log(error)
            }
        },
        async updateInformation(context, {username, website, about}){
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
        albumsToShow(state){
            return state.globalSettings.albumsToShow
        },
        information(state){
            return state.information
        }
    }
}