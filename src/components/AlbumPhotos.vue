<script setup lang="ts">
    import {computed, defineProps} from 'vue'
    import {useStore} from 'vuex'
    import Photo from '@/types/photo'

    const
        store = useStore(),
        props = defineProps({userIsLogged: Boolean, selectedAlbumId: String}),
        favoritePhotos = computed<{ids: number[]}>(() => store.state.user.favoritePhotos);

    const
        albumPhotos = computed<Photo[]>(() => {
            return store.getters['photos/fromSelectedAlbum'](props.selectedAlbumId)
        });
    
    let isFavorite: (photo:Photo) => boolean;
    let handlePhotoClick: (photo:Photo) => void;

    handlePhotoClick = (photo) => {
        let idFound:boolean = favoritePhotos.value.ids.some((id:number) => id === photo.id)
       
        if(idFound) 
            store.dispatch('user/removeFavoritePhoto', photo.id);
        else 
            store.dispatch('user/addFavoritePhoto', photo.id);
    }
    
    isFavorite = (photo) => {
        type R = number | undefined

        let favoriteFound:R = favoritePhotos.value.ids.find((id:number) => id === photo.id)
        return favoriteFound ? true : false
    }
</script>

<template>
    <section v-if="props.userIsLogged" class="photos-flex-wrapper">
        <div
            v-for="photo in albumPhotos" 
            :key="photo.id"
            @click="handlePhotoClick(photo)"
            class="img-container hover-effect"
        > 
            <div class="fav">
                <span v-if="isFavorite(photo)" class="material-symbols-outlined fill-icon">
                    favorite
                </span>
                <span v-else class="material-symbols-outlined">
                    favorite
                </span>
            </div>
            <img :src="photo.thumbnailUrl" />
        </div>
    </section>

    <section v-else class="photos-flex-wrapper">
        <div 
            v-for="photo in albumPhotos" 
            :key="photo.id"
            class="img-container"
        > 
            <img :src="photo.thumbnailUrl" />
        </div>
    </section>
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
.hover-effect:hover{
    cursor:pointer;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
}
.fav{
    position: absolute;
    padding:5px;
    color:white;
    opacity:0.6;
}
</style>