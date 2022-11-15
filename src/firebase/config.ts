import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'
import {getAuth} from 'firebase/auth'      

const firebaseConfig = {
    apiKey: "AIzaSyA9Rui8iyE7GlmP3Vh7WrRAQN1-Ny4qHGY",
    authDomain: "photo-displayer.firebaseapp.com",
    projectId: "photo-displayer",
    storageBucket: "photo-displayer.appspot.com",
    messagingSenderId: "787536192295",
    appId: "1:787536192295:web:a2ee08e6499fd36196ff02",
    measurementId: "G-X3JW3G2QS9"
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)
const auth = getAuth(app)

export {db, auth}