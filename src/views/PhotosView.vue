<script setup>
    import { onMounted, computed } from '@vue/runtime-core'
    import AppLayout from '../AppLayout.vue'
    import {useStore} from 'vuex'
    import AlbumButton from '@/components/AlbumButton.vue'

    const store = useStore()
    const albumsData = computed(() => store.state.albums.data) 

    onMounted(() => {
        store.dispatch('albums/fetch')    
    })
</script>

<template>
    <AppLayout>

        <!-- sidebar -->
        <template v-slot:sidebar-header>
            <div id="sidebar-header">
                📸 <span>Photo Displayer</span>
            </div>
        </template>    
        <template v-slot:sidebar-content>
            <div v-for="album in albumsData" :key="album.id">
                <AlbumButton
                    v-bind:albumId="album.id"
                    v-bind:albumTitle="album.title" 
                    v-bind:selected="true"
                />
            </div>
        </template>

        <!-- content -->
        <template v-slot:content-header>
            <div id="content-header">
                <div>Current album</div>
                <div>{{ store.getters['albums/title'] }}</div>     
            </div>
        </template>
        <template v-slot:content>
            <div id="content" >
                <router-view/>
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
#sidebar-header{
    height:100px;
    padding:20px 0 0 10px;
    font-size:24px;
}
#sidebar-header span{
    margin-left:7px;
}
#content-header{
    height:75px;
    margin-left:10px;
}
#content-header div:nth-child(1){
    margin:25px 0 0 0;
    font-size:16px;
    font-weight: bold;
    text-transform: uppercase;
}
#content-header div:nth-child(2){
    font-size:16px;
    font-style: italic;
    text-transform: capitalize;
}
#content{
    width: calc(100vw - var(--sidebar-width) - var(--sidebar-right-margin));
    display:flex;
    justify-content: flex-start;
    flex-flow:row wrap;
}
</style>
