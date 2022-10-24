import {auth} from '@/firebase/config.js'
import {doc, onSnapshot} from 'firebase/firestore'
import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {createUserWithEmailAndPassword, updateProfile} from 'firebase/auth'
import {db} from '@/firebase/config.js'

const authModule = {
    namespaced: true,
    state(){
        return {
            userAuth: null,
            userData: {
                favoritePhotos: {},
                information: {}
            },
            authIsReady: false
        }
    },
    mutations:{
        setUserAuth(state, payload){
            state.userAuth = payload
        },
        setUserData(state, payload){
            switch(payload.type){
                case 'favoritePhotos': state.userData.favoritePhotos = payload.data
                    break
                case 'information': state.userData.information = payload.data
                    break
                default: 
                    return null
            }
        },
        setAuthIsReady(state, payload){
            state.authIsReady = payload
        },
        setDisplayName(state, newDisplayName){
            state.userAuth.displayName = newDisplayName
        }
    },
    actions:{
        async fetchUserData(context, uid){
            try{
                const favoritePhotosDocRef = doc(db, 'users', uid, 'data', 'favorite_photos')
                const informationDocRef = doc(db, 'users', uid, 'data', 'information')

                onSnapshot(favoritePhotosDocRef, (doc) => {
                    const favoritePhotos = doc.data()
                    context.commit('setUserData', {type: 'favoritePhotos', data: favoritePhotos })        
                })

                onSnapshot(informationDocRef, (doc) => {
                    const information = doc.data()
                    context.commit('setUserData', {type: 'information', data: information })        
                })
            }
            catch (error){
                console.log(error.message)
            }
        },
        async registerUser(context, {email, password}){
            try{
                const res = await createUserWithEmailAndPassword(auth, email, password)
                const userAuthData = res.user 
                context.commit('setUserAuth', userAuthData) 
            }
            catch (error){
                console.log(error)
            }
        },
        async loginUser(context, {email, password}){
            try{
                const res = await signInWithEmailAndPassword(auth, email, password)
                const userAuthData = res.user
                context.commit('setUserAuth', userAuthData) 
                context.dispatch('fetchUserData', res.user.uid)
            }
            catch (error){
                console.log(error.message)
            }
        },
        async logoutUser(context){
            try{
                await signOut(auth)
                context.commit('setUserAuth', null)
                context.commit('setUserData', null)
            }
            catch (error){
                console.log(error.message)
            }
        },
        async updateFirebaseUserProfile(context){
            try{
                await updateProfile(
                    auth.currentUser, 
                    {
                        displayName: context.state.userData.displayName, 
                        photoURL: context.state.userData.photoURL
                    }
                )
            }
            catch (error){
                console.log(error.message)
            }
        }
    },
    getters:{
        userIsLogged(state){
            return state.userAuth ? true : false
        }
    }
}

export default authModule