<script setup>
    import {computed, watchEffect, ref} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'
    import ViewLayout from '@/layouts/ViewLayout.vue'

    const
        store = useStore(),
        route = useRoute(),
        showAlert = ref(true);
        
    const    
        alertClosed = computed(() => store.getters['utils/isAlertClosed']),
        userIsLogged = computed(() => store.getters['auth/userIsLogged']),
        selectedAlbumId = computed(() => route.params.albumId);

    const    
        albumPhotos = computed(() => store.getters['photos/fromSelectedAlbum'](selectedAlbumId.value)),
        albumTitle = computed(() => store.getters['albums/title']),
        favoritePhotos = computed(() => store.state.user.data.favoritePhotos);

    watchEffect(() => {
        store.commit('albums/updateSelectedId', selectedAlbumId)

        if(userIsLogged.value || alertClosed.value){
            showAlert.value = false
        }
    })

    function handlePhotoClick(photo){
        let idFound = favoritePhotos.value.ids.find(id => id == photo.id)

        if(idFound) 
            store.dispatch('user/removeFavoritePhoto', photo.id);
        else 
            store.dispatch('user/addFavoritePhoto', photo.id);
    }

    function handleCloseAlert(){
        showAlert.value = false
        store.commit('utils/setAlertClosed')
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

        <template v-if="showAlert" v-slot:alert>
            <div id="alert">
                <div class="alert-text-wrapper">
                    Welcome to photo displayer! 
                    <router-link to="/create-account">create an account</router-link> 
                    or   
                    <router-link to="/login">login</router-link>
                           to start saving images 
                    as favorites. Also! have access to other settings that will improve your experience!
                </div>
                <div class="alert-close-icon-wrapper">
                    <span
                        @click="handleCloseAlert"
                        class="material-symbols-outlined"
                    >
                        close
                    </span>
                </div>
            </div>
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
a{
    text-decoration: none;
    color:blue;
}
a:hover{
    text-decoration: underline;
}
#alert{
    display: flex;
    word-spacing: 2px;;
    padding:0 0 0 35px;
    align-items: center;
    height: 90px;
    font-size:18px;
    background:#81acfa;
    color:white;
}
.alert-text-wrapper{
    width:auto;
    margin:0 30px 0 0;
    line-height: 25px;
}
.alert-close-icon-wrapper{
    margin:0 20px 0 0;
    display:grid;
    place-items: center;
    width:150px;
}
.alert-close-icon-wrapper span{
    background:rgb(255, 255, 255,0.2);
    display:grid;
    place-items: center;
    width:40px;
    height:40px;
    border-radius: 100%;
    color:rgb(255, 255, 255);
    cursor:pointer;
}
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