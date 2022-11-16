import {createApp} from 'vue'
import '@/assets/globalStyles.css'
import App from './App.vue'
import store from './store/index'
import router from './router/index'

createApp(App).use(router).use(store).mount('#root')
