import { createRouter, createWebHistory } from 'vue-router'
import PhotosView from '../views/PhotosView.vue'
import HomeView from '../views/HomeView.vue'
import AlbumContent from '../components/AlbumContent.vue'

const routes = [
    {
        path:'/',
        alias: '/home',
        name: 'home',
        component: HomeView
    },
    {
        path:'/photos',
        name: 'photos',
        component: PhotosView,
        children:[
            {
                path:':albumId',
                component: AlbumContent
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
