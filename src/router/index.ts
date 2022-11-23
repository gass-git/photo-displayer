import { RouteRecordRaw, createRouter, createWebHistory, Router } from 'vue-router'
import PhotosView from '@/views/PhotosView.vue'
import CreateAccView from '@/views/CreateAccView.vue'
import LoginView from '@/views/LoginView.vue'
import DashboardView from '@/views/DashboardView.vue'
import FavoritesView from '@/views/FavoritesView.vue'

const routes: Readonly<RouteRecordRaw[]> = [
    {
        path:'/',
        redirect: '/photos/1'
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
        path: '/dashboard',
        name: 'dashboard',
        component: DashboardView,
        children:[
            {
                path:':option',
                component: DashboardView
            }
        ]
    },
    {
        path:'/favorites',
        name: 'favorites',
        component: FavoritesView
    }
]

const router: Router = createRouter({
    history: createWebHistory(process.env.BASE_URL),
    routes
})

export default router
