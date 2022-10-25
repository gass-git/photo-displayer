<script setup>
    import ViewLayout from '@/layouts/ViewLayout.vue'
    import {computed, watchEffect} from 'vue'
    import {useRoute} from 'vue-router'
    import {useStore} from 'vuex'

    const route = useRoute()
    const store = useStore()
    
    const selectedAlbumId = computed(() => route.params.albumId)
    const photos = computed(() => store.getters['photos/fromSelectedAlbum'](selectedAlbumId.value))
    const albumTitle = computed(() => store.getters['albums/title'])
    const favoritePhotos = computed(() => store.state.user.data.favoritePhotos)

    watchEffect(() => {
        store.commit('albums/updateSelectedId', selectedAlbumId)
    })

    function handleClick(photo){
        let idFound = favoritePhotos.value.ids.find(id => id == photo.id)
        
        console.log(favoritePhotos.value)

        if(idFound){
            store.dispatch('user/removeFavoritePhoto', photo.id)
        }
        else{
            store.dispatch('user/addFavoritePhoto', photo.id)
        }
    }

    function isFavorite(photo){
        let favoriteFound = favoritePhotos.value.ids.find(id => id === photo.id)

        if(favoriteFound) return true
        else return false
    }
</script>

<template>
    <ViewLayout>
    
        <template v-slot:header-content>
            {{albumTitle}}
        </template>

        <template v-slot:main-content>
            <div class="flex-wrapper">
                <div 
                    v-for="photo in photos" 
                    :key="photo.id"
                    @click="handleClick(photo)"
                    class="photo-container"
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
.photo-container{
    border-radius:5px;
    overflow: hidden;
    width:150px;
    height:150px;
    margin:10px;
    transition:100ms;
}
.photo-container:hover{
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