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

                    case 'favoritePhotos': 
                        state.data.favoritePhotos = payload.data
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
                        const favoritePhotos = doc.data()
                        context.commit('setData', {type: 'favoritePhotos', data: favoritePhotos})        
                    })
    
                    onSnapshot(doc(db, 'users', uid, 'data', 'information'), (doc) => {
                        const information = doc.data()
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
            }
        },
        getters:{}
}