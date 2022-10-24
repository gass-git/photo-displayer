import {collection, onSnapshot, deleteDoc, addDoc, doc, orderBy, query} from 'firebase/firestore'
import {db} from '@/firebase/config.js'

const PHOTOS_API = 'https://jsonplaceholder.typicode.com/photos'

const photos = {
    namespaced: true,
    state(){
        return {
            photos: [],
            favorites: []
        }
    },
    mutations: {
        updatePhotos(state, photosArray){
            state.photos = photosArray
        },
        updateFavorites(state, data){
            state.favorites = data
        },
        cleanSessionFavorites(state){
            state.favorites = []
        }
    },
    actions: {
        async fetchFavorites(context){
            // console.log(context.rootState.authModule.userData.uid)
            try{
                onSnapshot(query(collection(db, 'users', context.rootState.authModule.userData.uid, 'favorites'), orderBy('date', 'desc')), (querySnapshot) => {
                        let newIdsArray = []

                        querySnapshot.forEach((doc) => {
                            newIdsArray.push({firestoreDocId: doc.id, photoId: doc.data().photo_id})
                        })
                        context.commit('updateFavorites', newIdsArray)
                })
            }
            catch(error){
                console.log(error)
            }
        },
        async fetchAll(context){
            try{
                const resp = await fetch(PHOTOS_API)
                const photosArray = await resp.json()
                context.commit('updatePhotos', photosArray)
            }
            catch (error) {
                console.log(error)
            }
        },
        async addFavorite(context, photoId){
            let newDate = new Date().getTime()
            
            try{
                await 
                addDoc(collection(db, 'users', context.rootState.authModule.userData.uid, 'favorites'), {
                    photo_id: photoId,
                    date: newDate
                })
            }
            catch (error){
                console.log(error.message)
            }
        },
        async removeFavorite(context, firestoreDocId){
            try{
                await deleteDoc(doc(collection(db, 'users', context.rootState.authModule.userData.uid, 'favorites'), firestoreDocId))
            }
            catch (error){
                console.log(error.message)
            }
        }
    },
    getters: {
        fromSelectedAlbum: (state) => (id) => {
            return state.photos.filter((photo) => photo.albumId == id)
        }
    }
}

export default photos