import {auth,db} from '@/firebase/config.js'
import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'

interface S{
    data: object | null,
    isReady: boolean,
    loginError: boolean | null,
    registrationError: boolean | null
}

interface registrationData{
    email: string,
    password: string
}

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
        setData(state:S, payload:any){
            state.data = payload
        },
        setToReady(state:S, payload:any){
            state.isReady = payload
        },
        setLoginError(state:S, payload:any){
            state.loginError = payload
        },
        resetLoginError(state:S){
            state.loginError = null
        },
        setRegistrationError(state:S, payload:any){
            state.registrationError = payload
        },
        resetRegistrationError(state:S){
            state.registrationError = null
        }
    },
    actions:{
        async registerUser(context:any, {email, password}: registrationData){
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
            catch (error:any){
                context.commit('setRegistrationError', error.code)
            }
        },
        async loginUser(context:any, {email, password}: registrationData){
            context.commit('resetLoginError')

            try{
                const res = await signInWithEmailAndPassword(auth, email, password)
                const userAuthData = res.user
                context.commit('setData', userAuthData) 
                context.dispatch('user/load', res.user.uid, {root: true})
            }
            catch (error:any){
                context.commit('setLoginError', error.code)
            }
        },
        async logoutUser(context:any){
            try{
                await signOut(auth)
                context.commit('setData', null)
                context.commit('user/resetAll', null, {root:true})
            }
            catch (error:any){
                console.log(error.message)
            }
        }
    },
    getters:{
        userIsLogged(state:S){
            return state.data ? true : false
        }
    }
}