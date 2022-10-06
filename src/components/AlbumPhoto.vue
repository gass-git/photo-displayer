<script setup>
    import {computed, watchEffect} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'

    const route = useRoute()
    const store = useStore()
    const photos = computed(() => store.state.photos.data)

    watchEffect(() => {
        // new id retrieved from router
        let newId = route.params.albumId

        // dispatch actions to mutate the state with the new id
        store.dispatch('photos/showByAlbum', {albumId: newId})
        store.dispatch('albums/updateId', {newId: newId})
    })
</script>

<template>
    <img 
        v-for="photo in photos" 
        v-bind:key="photo.id" 
        v-bind:src="photo.thumbnailUrl" 
    />
</template>

<style scoped>
    img{
        height:150px;
        width:150px;
        padding:10px;
        border-radius: 15px;
    }
</style>