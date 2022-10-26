<script setup>
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import {computed, watchEffect} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'

    const
        store = useStore(),
        route = useRoute();
        
    const    
        userIsLogged = computed(() => store.getters['auth/userIsLogged']),
        selectedAlbumId = computed(() => route.params.albumId);

    const    
        albumPhotos = computed(() => store.getters['photos/fromSelectedAlbum'](selectedAlbumId.value)),
        albumTitle = computed(() => store.getters['albums/title']),
        favoritePhotos = computed(() => store.state.user.data.favoritePhotos);

    watchEffect(() => {
        store.commit('albums/updateSelectedId', selectedAlbumId)
    })

    function handleClick(photo){
        let idFound = favoritePhotos.value.ids.find(id => id == photo.id)

        if(idFound) 
            store.dispatch('user/removeFavoritePhoto', photo.id);
        else 
            store.dispatch('user/addFavoritePhoto', photo.id);
    }

    function isFavorite(photo){
        let favoriteFound = favoritePhotos.value.ids.find(id => id === photo.id)

        return favoriteFound ? true : false
    }
</script>

<template>
    <ViewLayout>
    
        <template v-slot:header-content>
            {{albumTitle}}
        </template>

        <template v-slot:main-content>
            
            <div v-if="userIsLogged" class="flex-wrapper">
                <div 
                    v-for="photo in albumPhotos" 
                    :key="photo.id"
                    @click="handleClick(photo)"
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
            </div>

            <div v-else class="flex-wrapper">
                <div 
                    v-for="photo in albumPhotos" 
                    :key="photo.id"
                    class="img-container"
                > 
                    <img :src="photo.thumbnailUrl" />
                </div>
            </div>

        </template>

    </ViewLayout>
</template>

<style scoped>
.flex-wrapper{
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