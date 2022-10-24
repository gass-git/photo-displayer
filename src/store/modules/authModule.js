import { auth } from '@/firebase/config.js'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from 'firebase/auth'

const authModule = {
    namespaced: true,
    state(){
        return {
            userData:null,
            authIsReady: false
        }
    },
    mutations:{
        updateUserData(state, data){
            state.userData = data
        },
        setAuthIsReady(state, payload){
            state.authIsReady = payload
        },
        setDisplayName(state, newDisplayName){
            state.userData.displayName = newDisplayName
        },
        setPhotoURL(state, newPhotoURL){
            state.userData.photoURL = newPhotoURL
        }
    },
    actions:{
        async registerUser(context, {email, password}){
            try{
                const res = await createUserWithEmailAndPassword(auth, email, password)
                const userData = res.user 
                context.commit('updateUserData', userData) 
            }
            catch (error){
                console.log(error)
            }
        },
        async loginUser(context, {email, password}){
            try{
                const res = await signInWithEmailAndPassword(auth, email, password)
                const userData = res.user
                context.commit('updateUserData', userData) 
            }
            catch (error){
                console.log(error.message)
            }
        },
        async logoutUser(context){
            try{
                await signOut(auth)
                context.commit('updateUserData', null)
            }
            catch (error){
                console.log(error.message)
            }
        },
        // eslint-disable-next-line
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
            if(state.userData) return true
            else return false
        }
    }
}

export default authModule