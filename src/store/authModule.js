import { auth } from '@/firebase/config.js'
import { createUserWithEmailAndPassword } from 'firebase/auth'

const authModule = {
    namespaced: true,
    state(){
        return {
            email:'',
            password:''
        }
    },
    mutations:{
        updateCredentials(state, credentials){
            state.email = credentials.email
            state.password = credentials.password
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
                const user = userCredential.user
            })
            .catch((error) => {
                const errorCode = error.code
                const errorMessage = error.message
                console.log(errorMessage)
                console.log(errorCode)
            })
            /* eslint-enable */
        }
    }
}

export default authModule