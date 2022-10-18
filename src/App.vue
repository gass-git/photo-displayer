<script setup>
    import {onMounted} from 'vue'
    import {useStore} from 'vuex'
    import AppLayout from '@/layouts/AppLayout.vue'
    import AppName from '@/components/AppName.vue'
    import MenuOptions from '@/components/menuOptions/MenuOptions.vue'

    const store = useStore()

    onMounted(() => {
        store.dispatch('albums/fetch')
        store.dispatch('photos/fetchFavorites')
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
