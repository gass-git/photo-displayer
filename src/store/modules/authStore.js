import {auth} from '@/firebase/config.js'
import {signInWithEmailAndPassword, signOut} from 'firebase/auth'
import {createUserWithEmailAndPassword} from 'firebase/auth'

export const authStore = {
    namespaced: true,
    state(){
        return {
            data: null,
            authIsReady: false
        }
    },
    mutations:{
        setData(state, payload){
            state.data = payload
        },
        setAuthIsReady(state, payload){
            state.authIsReady = payload
        }
    },
    actions:{
        async registerUser(context, {email, password}){
            try{
                const res = await createUserWithEmailAndPassword(auth, email, password)
                const userAuthData = res.user 
                context.commit('setData', userAuthData) 
            }
            catch (error){
                console.log(error)
            }
        },
        async loginUser(context, {email, password}){
            try{
                const res = await signInWithEmailAndPassword(auth, email, password)
                const userAuthData = res.user
                context.commit('setData', userAuthData) 
                context.dispatch('user/fetch', res.user.uid, {root: true})
            }
            catch (error){
                console.log(error.message)
            }
        },
        async logoutUser(context){
            try{
                await signOut(auth)
                context.commit('setData', null)
                context.commit('user/setData', {type: 'erase data'}, {root:true})
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