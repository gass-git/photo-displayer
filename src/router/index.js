import { createRouter, createWebHistory } from 'vue-router'
import AlbumPhoto from '../components/AlbumPhoto.vue'
import HomeView from '@/views/HomeView.vue'
import PhotosView from '@/views/PhotosView.vue'

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
                component: AlbumPhoto
            }
        ]
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
