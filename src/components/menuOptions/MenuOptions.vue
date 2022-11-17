<script setup lang="ts">
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    import AlbumButton from '@/components/menuOptions/children/AlbumButton.vue'
    import FavoritesOption from './children/FavoritesOption.vue'
    import Album from '@/types/album'

    const 
        store = useStore(),
        userIsLogged = computed<boolean>(() => store.getters['auth/userIsLogged']);
    
    const 
        albumsToShow = computed<Album[]>(() => {
            return store.state.albums.data.slice(0, store.getters['user/albumsToShow'])
        })
</script>

<template>
    <FavoritesOption v-if="userIsLogged" />
    <AlbumButton
        v-for="album in albumsToShow" 
        :key="album.id"
        :albumId="album.id"
        :albumTitle="album.title" 
    />
</template>