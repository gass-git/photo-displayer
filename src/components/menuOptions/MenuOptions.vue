<script setup>
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    import AlbumButton from '@/components/menuOptions/children/AlbumButton.vue'
    import FavoritesOption from './children/FavoritesOption.vue'

    const store = useStore() 
    const maxAlbums = computed(() => store.state.albums.maxToShow)
    const allAlbums = computed(() => store.state.albums.data)
    const albumsToShow = computed(() => allAlbums.value.slice(0, maxAlbums.value))
</script>

<template>
    <FavoritesOption />
    <div v-for="album in albumsToShow" :key="album.id">
        <AlbumButton
            :albumId="album.id"
            :albumTitle="album.title" 
        />
    </div>
</template>