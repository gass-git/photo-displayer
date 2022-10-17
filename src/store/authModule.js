import { auth } from '@/firebase/config.js'
import { 
    createUserWithEmailAndPassword, 
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from 'firebase/auth'
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
        init(){
            onAuthStateChanged(auth, (user) => {
                if (user) {
                  // User is signed in, see docs for a list of available properties
                  // https://firebase.google.com/docs/reference/js/firebase.User
                    console.log('user with email: ' + user.email + ' has signed in')
                  // const uid = user.uid
                } else {
                  // User is signed out
                    console.log('user has signed out')
                }
              })
        },
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
                context.commit('updateUserData', user)
                console.log(user)
            })
            .catch((error) => {
                console.log(error.message)
            })
        },
        logoutUser(){
            signOut(auth).then(() => {
                // Sign-out successful.
              }).catch((error) => {
                // An error happened.
                console.log(error)
              });
        }
    }
}

export default authModule