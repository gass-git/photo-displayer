import axios from 'axios'
import {collection} from 'firebase/firestore'
import {onSnapshot} from 'firebase/firestore'
import {deleteDoc} from 'firebase/firestore'
import {addDoc, doc} from 'firebase/firestore'
import {orderBy} from 'firebase/firestore'
import {query} from 'firebase/firestore'
import {db} from '@/firebase/config.js'

const favoritesCollectionRef = collection(db, 'users', 'NFjIEe2YiMMAHIeRSdsHP3fd8N12', 'favorites')
const favoritesCollectionQuery = query(favoritesCollectionRef, orderBy('date', 'desc'))

const photos = {
    namespaced: true,
    state(){
        return {
            data: [],
            cache: {},
            favorites: []
        }
    },
    mutations: {
        updateData(state, {data, albumId}){
            state.data = data

            // add data to cache only if it has not been added before
            if(!(albumId in state.cache)) state.cache[albumId] = data;
        },
        updateFavorites(state, data){
            state.favorites = data
        }
    },
    actions: { 
        showByAlbum(context, {albumId}){
            
            // dont fetch if the photos are in cache
            if(albumId in context.state.cache){
                context.commit(
                    'updateData', 
                    {
                        data: context.state.cache[albumId], 
                        albumId
                    }
                )
            }
            else{
                let API_URL = `https://jsonplaceholder.typicode.com/photos?albumId=${albumId}`

                axios.get(API_URL).then((resp) => {
                    context.commit('updateData', {data: resp.data, albumId})
                })
            }
        },
        async fetchFavorites(context){
            try{
                onSnapshot(favoritesCollectionQuery, (querySnapshot) => {
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
        async addFavorite(context, photoId){
            let newDate = new Date().getTime()
            
            try{
                await 
                addDoc(favoritesCollectionRef, {
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
                await deleteDoc(doc(favoritesCollectionRef, firestoreDocId))
            }
            catch (error){
                console.log(error.message)
            }
       }
    },
    getters: {
               
    }
}

export default photos