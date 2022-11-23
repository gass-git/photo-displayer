<script setup lang="ts">
    import {computed, watchEffect} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import AppAlert from '@/components/AppAlert.vue'
    import AlbumPhotos from '@/components/AlbumPhotos.vue'
        
    const    
        [store, route] = [useStore(), useRoute()],
        showAlert = computed<boolean>(() => store.getters['utils/show']),
        userIsLogged = computed<boolean>(() => store.getters['auth/userIsLogged']),
        albumTitle = computed<string>(() => store.getters['albums/title']);

    watchEffect(() => {
        store.commit('albums/updateSelectedId', route.params.albumId)
        if(userIsLogged.value) store.commit('utils/setShow', false)
    })
</script>

<template>
    <ViewLayout>
        <template v-slot:header-content>
            {{albumTitle}}
        </template>

        <template v-slot:alert>
            <AppAlert v-if="showAlert"/>
        </template>

        <template v-slot:main-content>
            <AlbumPhotos 
                :userIsLogged="userIsLogged"
                :selectedAlbumId="route.params.albumId"
            />
        </template>
    </ViewLayout>
</template>