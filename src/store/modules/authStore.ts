import {auth,db} from '@/firebase/config'
import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {createUserWithEmailAndPassword} from 'firebase/auth'
import {setDoc, doc} from 'firebase/firestore'
import {ActionContext} from 'vuex'
import {State} from '../index'
import AuthState from '@/types/authState'

type Ctx = ActionContext<AuthState, State>

interface RegistrationData{
    email: string,
    password: string
}

export const authStore = {
    namespaced: true,
    state():AuthState{
        return {
            data: null,
            isReady: false,
            loginError: null,
            registrationError: null
        }
    },
    mutations:{
        setData(state:AuthState, payload:any):void{
            state.data = payload
        },
        setToReady(state:AuthState, payload:any):void{
            state.isReady = payload
        },
        setLoginError(state:AuthState, payload:any):void{
            state.loginError = payload
        },
        resetLoginError(state:AuthState):void{
            state.loginError = null
        },
        setRegistrationError(state:AuthState, payload:any):void{
            state.registrationError = payload
        },
        resetRegistrationError(state:AuthState):void{
            state.registrationError = null
        }
    },
    actions:{
        async registerUser(context:Ctx, {email, password}: RegistrationData){
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
                context.commit('setRegistrationError', error)
            }
        },
        async loginUser(context:Ctx, {email, password}:RegistrationData){
            context.commit('resetLoginError')

            try{
                const res = await signInWithEmailAndPassword(auth, email, password)
                const userAuthData = res.user
                context.commit('setData', userAuthData) 
                context.dispatch('user/load', res.user.uid, {root: true})
            }
            catch (error){
                context.commit('setLoginError', error)
            }
        },
        async logoutUser(context:Ctx){
            try{
                await signOut(auth)
                context.commit('setData', null)
                context.commit('user/resetAll', null, {root:true})
            }
            catch (error){
                console.log(error)
            }
        }
    },
    getters:{
        userIsLogged(state:AuthState): true | false{
            return state.data ? true : false
        }
    }
}