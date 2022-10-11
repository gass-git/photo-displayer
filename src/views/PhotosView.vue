<script setup>
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import {computed, watchEffect} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'

    const route = useRoute()
    const store = useStore()
    const photos = computed(() => store.state.photos.data)
    const albumTitle = computed(() => store.getters['albums/title'])

    watchEffect(() => {
        let newId = route.params.albumId

        store.dispatch('photos/showByAlbum', {albumId: newId})
        store.dispatch('albums/updateId', {newId: newId})
    })
</script>

<template>
    <ViewLayout>
    
        <template v-slot:header-content>
            {{albumTitle}}
        </template>

        <template v-slot:main-content>
            <img 
                v-for="photo in photos" 
                :key="photo.id" 
                :src="photo.thumbnailUrl" 
            />
        </template>

    </ViewLayout>
</template>

<style scoped>
    img{
        height:150px;
        width:150px;
        padding:10px;
        border-radius: 15px;
    }
</style>