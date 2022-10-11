<script setup>
    import {computed} from 'vue'
    import {useStore} from 'vuex'
    import AlbumButton from '@/components/AlbumButton.vue'

    const store = useStore()  
    const albums = computed(() => store.state.albums.data)
</script>

<template>
    <div v-for="album in albums" :key="album.id">
        <AlbumButton
            :albumId="album.id"
            :albumTitle="album.title" 
        />
    </div>
</template>