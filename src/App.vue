<script setup>
    import {onMounted, computed} from 'vue'
    import {useStore} from 'vuex'
    import AppLayout from '@/layouts/AppLayout.vue'
    import AppName from '@/components/AppName.vue'
    import MenuOptions from '@/components/menuOptions/MenuOptions.vue'
    import {onAuthStateChanged} from 'firebase/auth'
    import {auth} from '@/firebase/config.js'

    const store = useStore()

    const appFirstRender = computed(() => store.getters['utils/isAppFirstRender'])

    onMounted(() => {
        onAuthStateChanged(auth, (user) => {
            store.commit('auth/setData', user)
            store.commit('auth/setToReady', true)

            user !== null ? store.dispatch('user/load', user.uid) : null
        })
        
        store.dispatch('albums/fetch')
        store.dispatch('photos/fetch')
        
        setTimeout(() => {
            store.commit('utils/setAppFirstRenderOff')
        }, 2000)
        
    })
</script>

<template>
    <AppLayout>
        <template v-slot:sidebar-header>
            <AppName name="photo displayer"/>
        </template>
        
        <template v-slot:sidebar-body>
            <MenuOptions />
        </template>

        <template v-slot:right-content>
            <router-view />
        </template>
    </AppLayout>
</template>
