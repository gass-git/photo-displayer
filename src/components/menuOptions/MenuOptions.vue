<script setup>
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    import AlbumButton from '@/components/menuOptions/children/AlbumButton.vue'
    import FavoritesOption from './children/FavoritesOption.vue'

    const store = useStore()

    const 
        userIsLogged = computed(() => store.getters['auth/userIsLogged']),
        maxAlbums = computed(() => store.state.albums.maxToShow),
        allAlbums = computed(() => store.state.albums.data),
        albumsToShow = computed(() => allAlbums.value.slice(0, maxAlbums.value));
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