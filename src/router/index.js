import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PhotosView from '@/views/PhotosView.vue'
import CreateAccView from '@/views/CreateAccView.vue'

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
                component: PhotosView
            }
        ]
    },
    {
        path:'/create-account',
        name:'create account',
        component: CreateAccView
    }    
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
