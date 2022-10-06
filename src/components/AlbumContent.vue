<script setup>
    import {computed, watchEffect} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'

    const route = useRoute()
    const store = useStore()
    const photos = computed(() => store.state.photos.data)

    watchEffect(() => {
        let currentId = route.params.albumId
        store.dispatch('photos/showByAlbum', {albumId: currentId})
    })
</script>

<template>
    <img 
        v-for="photo in photos" 
        :key="photo.id" 
        :src="photo.url" 
    />
</template>