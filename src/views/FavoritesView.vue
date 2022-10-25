<script setup>
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import {useStore} from 'vuex'
    import {computed} from 'vue'

    const store = useStore()

    const photos = computed(() => store.state.photos.data)

    // array of the id of the favorite images 
    const favorites = computed(() => store.state.user.data.favoritePhotos.ids)

    const favoritePhotos = computed(() => {
        return photos.value.filter(photo => favorites.value.includes(photo.id))
    })
</script>

<template>
    <ViewLayout v-if="store.state.auth.isReady">
        <template v-slot:header-content>
            favorites
        </template>
        <template v-slot:main-content>
            <div 
                v-for="photo in favoritePhotos" 
                :key="photo.id"
                class="photo-container"
            >   
                    <img :src="photo.thumbnailUrl" />
            </div>
        </template>
    </ViewLayout>
</template>

<style scoped>
img{
    width:150px;
    margin:0px 0 12px 0;
    cursor:pointer;
    font-size:16px;
    border-radius:5px;
    text-transform: capitalize;
    color:var(--light-gray);
    }
</style>