import {doc, updateDoc, arrayUnion, onSnapshot, arrayRemove} from 'firebase/firestore'
import {db} from '@/firebase/config.js'

export const userStore = {
    namespaced:true,
        state(){
            return {
                data: {
                    uid:'',
                    favoritePhotos: {
                        ids:[]
                    },
                    globalSettings: {},
                    information: {}
                }
            }
        },
        mutations:{
            setData(state, payload){
                switch(payload.type){
                    case 'set user uid': 
                        state.data.uid = payload.data
                        break

                    case 'favorite photos': 
                        state.data.favoritePhotos = payload.data
                        break

                    case 'global settings':
                        state.data.globalSettings = payload.data
                        break

                    case 'information': 
                        state.data.information = payload.data
                        break
                        
                    case 'erase data': 
                        state.data.favoritePhotos.ids = []
                        state.data.information = {}
                        break

                    default: return null
                }
            }
        },
        actions:{
            async load(context, uid){
                context.commit('setData', {type: 'set user uid', data: uid})

                try{   
                    onSnapshot(doc(db, 'users', uid, 'data', 'favorite_photos'), (doc) => {
                        let favoritePhotos = doc.data()
                        context.commit('setData', {type: 'favorite photos', data: favoritePhotos})        
                    })
    
                    onSnapshot(doc(db, 'users', uid, 'data', 'global_settings'), (doc) => {
                        let globalSettings = doc.data()
                        context.commit('setData', {type:'global settings', data: globalSettings})
                    })

                    onSnapshot(doc(db, 'users', uid, 'data', 'information'), (doc) => {
                        let information = doc.data()
                        context.commit('setData', {type: 'information', data: information})        
                    })
                }
                catch (error){
                    console.log(error.message)
                }
            },
            async addFavoritePhoto(context, photoId){
                let docRef = doc(db, 'users', context.state.data.uid, 'data', 'favorite_photos')
    
                try{
                    await updateDoc(docRef, {ids: arrayUnion(photoId)})
                }
                catch (error){
                    console.log(error.message)
                }
            },
            async removeFavoritePhoto(context, photoId){
                let docRef = doc(db, 'users', context.state.data.uid, 'data', 'favorite_photos')
                
                try{
                    await updateDoc(docRef, {ids: arrayRemove(photoId)})
                }
                catch (error){
                    console.log(error.message)
                }
            },
            async updateAlbumsToShow(context, quantity){
                let docRef = doc(db, 'users', context.state.data.uid, 'data', 'global_settings')    
            
                try{
                    await updateDoc(docRef, {albumsToShow: quantity})
                }
                catch (error){
                    console.log(error)
                }
            },
            async updateInformation(context, newInfo){
                let docRef = doc(db, 'users', context.state.data.uid, 'data', 'information') 
                
                try{
                    await updateDoc(docRef, { 
                        username: newInfo.username,
                        website: newInfo.website,
                        about: newInfo.about
                    })
                }
                catch (error){
                    console.log(error)
                }
            }
        },
        getters:{
            albumsToShow(state){
                return state.data.globalSettings.albumsToShow
            }
        }
}