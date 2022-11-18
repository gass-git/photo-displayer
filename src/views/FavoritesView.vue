<script setup lang="ts">
    import {computed, watchEffect, ref} from 'vue'
    import {useStore} from 'vuex'
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import Photo from '@/types/photo'

    const 
        store = useStore(),
        favoritePhotos = ref<Photo[]>([]);

    const
        photos = computed<Photo[]>(() => store.state.photos.data),
        idsOfFavorites = computed<number[]>(() => store.state.user.favoritePhotos.ids),
        authIsReady = computed<boolean>(() => store.state.auth.isReady);

    watchEffect(() => {
        favoritePhotos.value = photos.value.filter((photo:Photo) => {
            return idsOfFavorites.value.includes(photo.id)
        })
    })
</script>

<template>
    <ViewLayout v-if="authIsReady">
        <template v-slot:header-content>
            favorites
        </template>

        <template v-slot:main-content>
            <section v-if="favoritePhotos.length > 0" class="photos-flex-wrapper">
                <div 
                    v-for="photo in favoritePhotos" 
                    :key="photo.id"
                    class="img-container"
                >   
                    <img :src="photo.thumbnailUrl" />
                </div>
            </section>
        </template>
    </ViewLayout>
</template>

<style scoped>
.photos-flex-wrapper{
    display:flex;
    flex-direction:row;
    flex-wrap:wrap;
    width:auto;
    height: auto;
}
.img-container{
    border-radius:5px;
    overflow: hidden;
    width:150px;
    height:150px;
    margin:10px;
    transition:100ms;
}
</style>