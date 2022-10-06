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
                <br>
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
            <section id="content-header">
                <section id="left">
                    <div>Current album − id #{{store.state.albums.currentId}}
                    </div>
                    <div>
                        {{ store.getters['albums/title'] }} 
                    </div>
                </section>
                <section id="right">
                    <router-link to="/">
                        Go Home
                    </router-link>
                </section>
            </section>
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
    display: flex;
    height:75px;
    margin-left:10px;
    justify-content: space-between;
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
#content-header #right{
    display: grid;
    place-items: center;
    width:100px;
    
    /*border:1px solid black;*/
}
#content-header #right a{
    text-decoration: none;
}
#content-header #right a:hover{
    text-decoration: underline;
}
#content{
    width: calc(100vw - var(--sidebar-width) - var(--sidebar-right-margin));
    display:flex;
    justify-content: flex-start;
    flex-flow:row wrap;
}
</style>
