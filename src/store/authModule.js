import { auth } from '@/firebase/config.js'
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import router from '@/router/index.js'

const authModule = {
    namespaced: true,
    state(){
        return {
            userData:{}    
        }
    },
    mutations:{
        updateUserData(state, data){
            state.userData = data
        }
    },
    actions:{
        registerUser(context, credentials){
            /* eslint-disable */
            createUserWithEmailAndPassword(
                auth, 
                credentials.email, 
                credentials.password
            )
            .then((userCredential) => {
                const userData = userCredential.user
                context.commit('updateUserData', userData)
                router.push('/home')
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage)
                console.log(errorCode)
            })
            /* eslint-enable */
        },
        loginUser(context, credentials){
            signInWithEmailAndPassword(auth, credentials.email, credentials.password)
            .then((userCredential) => {
                const user = userCredential.user
                console.log(user)
            })
            .catch((error) => {
                console.log(error.message)
            })
        }
    }
}

export default authModule