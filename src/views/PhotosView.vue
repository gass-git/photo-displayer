<script setup>
    import {computed, watchEffect} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import AppAlert from '@/components/AppAlert.vue'

    const [store, route] = [useStore(), useRoute()]
        
    const    
        showAlert = computed(() => store.getters['utils/show']),
        userIsLogged = computed(() => store.getters['auth/userIsLogged']),
        albumPhotos = computed(() => store.getters['photos/fromSelectedAlbum'](selectedAlbumId.value)),
        albumTitle = computed(() => store.getters['albums/title']);
        
    const 
        selectedAlbumId = computed(() => route.params.albumId), 
        favoritePhotos = computed(() => store.state.user.favoritePhotos);

    watchEffect(() => {
        store.commit('albums/updateSelectedId', selectedAlbumId)

        if(userIsLogged.value) store.commit('utils/setShow', false)
    })

    function handlePhotoClick(photo){
        let idFound = favoritePhotos.value.ids.some(id => id == photo.id)
       
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

        <template v-slot:alert>
            <AppAlert v-if="showAlert"/>
        </template>

        <template v-slot:main-content>
            
          <section v-if="userIsLogged" class="photos-flex-wrapper">
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

    </ViewLayout>
</template>

<style scoped>
.alert-close-icon-wrapper span:hover{
    background:rgb(255, 255, 255,0.5);
    color:blue;
}
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