import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import PhotosView from '@/views/PhotosView.vue'
import CreateAccView from '@/views/CreateAccView.vue'
import LoginView from '@/views/LoginView.vue'
import ProfileView from '@/views/ProfileView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

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
    },
    {
        path:'/login',
        name:'login',
        component: LoginView
    },
    {
        path: '/profile',
        name: 'profile',
        component: ProfileView
    },
    {
        path:'/favorites',
        name: 'favorites',
        component: FavoritesView
    }
]

const router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
