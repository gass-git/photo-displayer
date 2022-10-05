<script setup>
    import { onMounted, computed } from '@vue/runtime-core'
    import AppLayout from './AppLayout.vue'
    import {useStore} from 'vuex'
    import AlbumBtn from './components/AlbumBtn.vue'

    const store = useStore()
    const albumsData = computed(() => store.state.albums.data) 
    const photos = computed(() => store.state.photos.data)

    onMounted(() => {
        store.dispatch('albums/fetch')    
    })
</script>

<template>
    <AppLayout>
        <template v-slot:header>
            <h2>App Name</h2>
        </template>    
        <template v-slot:sidebar>
            <div v-for="album in albumsData" :key="album.id">
                <AlbumBtn 
                    :albumId="album.id"
                    :albumTitle="album.title" 
                />
            </div>
        </template>
        <template v-slot:content>
            <div id="content" >
                <img 
                    v-for="photo in photos" 
                    :key="photo.id" 
                    :src="photo.url" 
                />
            </div>
        </template>
    </AppLayout>
</template>

<style>
*{
  box-sizing: border-box;
}
body{
  margin:0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
#content{
    width: calc(100vw - 300px);
    display:flex;
    justify-content: flex-start;
    flex-flow:row wrap;
}
#content > img{
    height:150px;
    width:150px;
    padding:10px;
    border-radius: 15px;
}
</style>
