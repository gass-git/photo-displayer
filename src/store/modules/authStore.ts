import {auth,db} from '@/firebase/config.js'
import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'

export const authStore = {
    namespaced: true,
    state(){
        return {
            data: null,
            isReady: false,
            loginError: null,
            registrationError: null
        }
    },
    mutations:{
        setData(state, payload:any){
            state.data = payload
        },
        setToReady(state, payload:any){
            state.isReady = payload
        },
        setLoginError(state, payload:any){
            state.loginError = payload
        },
        resetLoginError(state){
            state.loginError = null
        },
        setRegistrationError(state, payload:any){
            state.registrationError = payload
        },
        resetRegistrationError(state){
            state.registrationError = null
        }
    },
    actions:{
        async registerUser(context, {email, password}){
            context.commit('resetRegistrationError')

            try{
                const 
                    res = await createUserWithEmailAndPassword(auth, email, password),
                    userAuthData = res.user,
                    uid = res.user.uid;

                context.commit('setData', userAuthData) 

                await setDoc(doc(db, 'users', uid), {
                    favoritePhotos:{
                        ids:[]
                    },
                    globalSettings:{
                        albumsToShow:50
                    },
                    information:{
                        about:'',
                        username:'',
                        website:''
                    }
                })
            }
            catch (error){
                context.commit('setRegistrationError', error.code)
            }
        },
        async loginUser(context, {email, password}){
            context.commit('resetLoginError')

            try{
                const res = await signInWithEmailAndPassword(auth, email, password)
                const userAuthData = res.user
                context.commit('setData', userAuthData) 
                context.dispatch('user/load', res.user.uid, {root: true})
            }
            catch (error){
                context.commit('setLoginError', error.code)
            }
        },
        async logoutUser(context){
            try{
                await signOut(auth)
                context.commit('setData', null)
                context.commit('user/resetAll', null, {root:true})
            }
            catch (error){
                console.log(error.message)
            }
        }
    },
    getters:{
        userIsLogged(state){
            return state.data ? true : false
        }
    }
}